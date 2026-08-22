import { Router } from "express";
import pool from "../db.js";
import { sendEmail } from "../email.js";
import { chatLinkUrl } from "../lib/chatLinks.js";
import { generateBotReply, matchesEscalationPhrase } from "../lib/chatAi.js";
import {
  addMessage,
  countMessages,
  createConversation,
  getConversationByPublicId,
  getMessages,
  getRecentMessages,
  escalateToAwaitingHuman,
  setStatus,
  type ChatMessage,
  type Conversation,
} from "../lib/chatStore.js";

const router = Router();

// Visitor-facing chat. The operator side lives in routes/adminChat.ts.
//
// Conversations are persisted (see server/lib/chatStore.ts) so a human can join
// one. The bot keeps answering right up until a human actually joins — being
// escalated is not the same as being abandoned.

const GREETING = "Hi! Ask me anything about DSPOps — features, pricing, or how it works.";
const MAX_MESSAGE_CHARS = 2000;
const MAX_MESSAGES_PER_CONVERSATION = 100;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ESCALATION_NOTICE =
  "A member of the team has been notified — they'll be with you shortly. Carry on asking me anything in the meantime.";

/** Shape sent to the browser. The numeric conversation id never leaves the server. */
function publicMessage(m: ChatMessage) {
  return { id: m.id, role: m.role, content: m.content, createdAt: m.createdAt };
}

/**
 * Hand the conversation to a human: flip the status, tell the visitor, and email
 * Rashid a link straight into this chat. Idempotent — a conversation that has
 * already been escalated never re-notifies, however many triggers fire.
 */
async function escalate(
  conversation: Conversation,
  reason: string | null
): Promise<ChatMessage | null> {
  // Guarded in SQL, not here: the caller may be holding a snapshot read before
  // a slow AI call, during which Rashid could have joined. Returns null if the
  // conversation is no longer in the bot state, which also makes repeated
  // escalation triggers naturally idempotent.
  const escalated = await escalateToAwaitingHuman(
    conversation.publicId,
    reason ?? "visitor asked for a person"
  );
  if (!escalated) return null;

  const notice = await addMessage(conversation.id, "system", ESCALATION_NOTICE);

  const recent = await getRecentMessages(conversation.id, 8);
  const transcript = recent
    .map((m) => `${m.role === "visitor" ? "Them" : m.role === "bot" ? "Bot" : "—"}: ${m.content}`)
    .join("\n");

  let link = "(link unavailable — CHAT_LINK_SECRET is not set)";
  try {
    link = chatLinkUrl(conversation.publicId);
  } catch (err) {
    console.error("Chat link could not be signed:", err);
  }

  sendEmail(
    `${conversation.visitorName || "Someone"} wants to talk to you on DSPOps`,
    `${conversation.visitorName || "A visitor"} is chatting on the site right now and should be handed to a human.\n\n` +
      `Name:   ${conversation.visitorName || "—"}\n` +
      `Email:  ${conversation.visitorEmail || "—"}\n` +
      `Reason: ${reason ?? "asked for a person"}\n\n` +
      `Open the chat and reply:\n${link}\n\n` +
      `Recent messages:\n${transcript}\n\n` +
      `The bot is still helping them until you join.`
  ).catch((err) => console.error("Escalation email failed:", err));

  return notice;
}

// POST /api/chat/start — begin a conversation
router.post("/start", async (req, res) => {
  const { name, email } = req.body as { name?: string; email?: string };

  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!trimmedName || !trimmedEmail) {
    return res.status(400).json({ error: "name and email are required" });
  }
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({ error: "invalid email" });
  }

  try {
    const conversation = await createConversation(trimmedName, trimmedEmail);
    const greeting = await addMessage(conversation.id, "bot", GREETING);

    // The chatbot is the only place on the site that asks a visitor for their
    // name, so this upsert is the only way that name reaches the lead list.
    // An email we already know keeps its original source (first-touch
    // attribution) and simply gains the name.
    pool
      .query(
        `INSERT INTO waitlist (email, name, source) VALUES ($1, $2, $3)
         ON CONFLICT (email) DO UPDATE
           SET name = COALESCE(EXCLUDED.name, waitlist.name), updated_at = NOW()`,
        [trimmedEmail, trimmedName.slice(0, 255), "Chatbot"]
      )
      .catch((err) => console.error("Chat lead insert error:", err));

    // The link matters as much as the name. Without it the only door into a new
    // chat was the escalation email, which only arrives if the bot decides to
    // escalate — so an ordinary lead could be sitting there with no way in.
    // Signing is wrapped for the same reason it is in escalate(): a missing
    // secret must degrade this email, not 500 the chat for every visitor.
    let link = "(link unavailable — CHAT_LINK_SECRET is not set)";
    try {
      link = chatLinkUrl(conversation.publicId);
    } catch (err) {
      console.error("Chat link could not be signed:", err);
    }

    sendEmail(
      "New lead started chatting on DSPOps",
      `Name:  ${trimmedName}\n` +
        `Email: ${trimmedEmail}\n` +
        `Time:  ${new Date().toISOString()}\n\n` +
        `Open the chat and reply:\n${link}\n\n` +
        `The bot is handling it until you join.`
    ).catch((err) => console.error("Lead notification email failed:", err));

    return res.json({
      conversationId: conversation.publicId,
      greeting: greeting.content,
      greetingId: greeting.id,
      status: conversation.status,
    });
  } catch (err) {
    console.error("Chat start error:", err);
    return res.status(500).json({ error: "Could not start the chat" });
  }
});

// POST /api/chat/:publicId/message — visitor says something
router.post("/:publicId/message", async (req, res) => {
  const { content } = req.body as { content?: string };
  const text = typeof content === "string" ? content.trim() : "";

  if (!text) return res.status(400).json({ error: "content is required" });
  if (text.length > MAX_MESSAGE_CHARS) {
    return res.status(400).json({ error: `messages are limited to ${MAX_MESSAGE_CHARS} characters` });
  }

  try {
    const conversation = await getConversationByPublicId(req.params.publicId);
    if (!conversation) return res.status(404).json({ error: "conversation not found" });
    if (conversation.status === "closed") {
      return res.status(409).json({ error: "this conversation has ended" });
    }
    if ((await countMessages(conversation.id)) >= MAX_MESSAGES_PER_CONVERSATION) {
      return res.status(429).json({ error: "this conversation has reached its limit" });
    }

    const visitorMessage = await addMessage(conversation.id, "visitor", text);
    const produced: ChatMessage[] = [];

    // A human has the floor. Store what the visitor said and stay quiet — this
    // is the guarantee that the bot never talks over Rashid.
    if (conversation.status === "human") {
      return res.json({
        messages: [visitorMessage].map(publicMessage),
        status: conversation.status,
      });
    }

    const history = await getRecentMessages(conversation.id, 30);
    const bot = await generateBotReply(history);

    // Generating that reply took a second or two. Rashid may have pressed Join
    // in the meantime, so re-read before storing — a snapshot from before the
    // AI call is not safe to act on.
    const current = await getConversationByPublicId(conversation.publicId);
    if (!current || current.status === "human" || current.status === "closed") {
      return res.json({
        messages: [visitorMessage].map(publicMessage),
        status: current?.status ?? conversation.status,
      });
    }

    if (bot.reply.trim()) {
      produced.push(await addMessage(conversation.id, "bot", bot.reply.trim()));
    }

    let status = conversation.status;
    if (bot.escalate || matchesEscalationPhrase(text)) {
      const notice = await escalate(
        conversation,
        bot.reason ?? (matchesEscalationPhrase(text) ? "asked to speak to a person" : null)
      );
      if (notice) {
        produced.push(notice);
        status = "awaiting_human";
      }
    }

    return res.json({
      messages: [visitorMessage, ...produced].map(publicMessage),
      status,
    });
  } catch (err) {
    console.error("Chat message error:", err);
    return res.status(500).json({ error: "Failed to get response from AI" });
  }
});

// POST /api/chat/:publicId/request-human — the "Talk to a person" button
router.post("/:publicId/request-human", async (req, res) => {
  try {
    const conversation = await getConversationByPublicId(req.params.publicId);
    if (!conversation) return res.status(404).json({ error: "conversation not found" });
    if (conversation.status === "closed") {
      return res.status(409).json({ error: "this conversation has ended" });
    }

    const notice = await escalate(conversation, "pressed 'Talk to a person'");
    return res.json({
      messages: notice ? [publicMessage(notice)] : [],
      status: notice ? "awaiting_human" : conversation.status,
    });
  } catch (err) {
    console.error("Chat request-human error:", err);
    return res.status(500).json({ error: "Could not reach the team" });
  }
});

// GET /api/chat/:publicId/messages?since= — the visitor's poll
router.get("/:publicId/messages", async (req, res) => {
  try {
    const conversation = await getConversationByPublicId(req.params.publicId);
    if (!conversation) return res.status(404).json({ error: "conversation not found" });

    const since = Number(req.query.since);
    const messages = await getMessages(
      conversation.id,
      Number.isFinite(since) && since > 0 ? since : 0
    );

    return res.json({ messages: messages.map(publicMessage), status: conversation.status });
  } catch (err) {
    console.error("Chat poll error:", err);
    return res.status(500).json({ error: "Could not load messages" });
  }
});

// POST /api/chat/:publicId/close — visitor closed the widget
router.post("/:publicId/close", async (req, res) => {
  try {
    const conversation = await getConversationByPublicId(req.params.publicId);
    if (!conversation) return res.status(404).json({ error: "conversation not found" });

      await setStatus(conversation.publicId, "closed");

    const messages = await getMessages(conversation.id);
    if (messages.filter((m) => m.role === "visitor").length > 0) {
      const transcript = messages
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n");
      sendEmail(
        `DSPOps chat transcript — ${conversation.visitorName || "visitor"}`,
        `Name:  ${conversation.visitorName || "—"}\nEmail: ${conversation.visitorEmail || "—"}\n\n${transcript}`
      ).catch((err) => console.error("Transcript email failed:", err));
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("Chat close error:", err);
    return res.status(500).json({ error: "Could not close the chat" });
  }
});

// ---------------------------------------------------------------------------
// Legacy endpoints. Kept for one release so a visitor holding a cached bundle
// from before this change is not left with a dead widget.
// ---------------------------------------------------------------------------

// POST /api/chat — the old stateless message endpoint
router.post("/", async (req, res) => {
  const { messages } = req.body as { messages?: Array<{ role: string; content: string }> };
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages must be a non-empty array" });
  }

  try {
    const history: ChatMessage[] = messages.map((m, i) => ({
      id: i + 1,
      role: m.role === "user" ? "visitor" : "bot",
      content: m.content,
      createdAt: new Date(),
    }));
    const bot = await generateBotReply(history);
    return res.json({ reply: bot.reply });
  } catch (err) {
    console.error("Chat API error (legacy):", err);
    return res.status(500).json({ error: "Failed to get response from AI" });
  }
});

// POST /api/chat/lead — the old lead capture, now also opening a conversation
router.post("/lead", async (req, res) => {
  const { name, email } = req.body as { name?: string; email?: string };
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!trimmedName || !trimmedEmail) {
    return res.status(400).json({ error: "name and email are required" });
  }
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({ error: "invalid email" });
  }

  let stored = false;
  try {
    await pool.query(
      `INSERT INTO waitlist (email, name, source) VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE
         SET name = COALESCE(EXCLUDED.name, waitlist.name), updated_at = NOW()`,
      [trimmedEmail, trimmedName.slice(0, 255), "Chatbot"]
    );
    stored = true;
  } catch (err) {
    console.error("Chat lead insert error:", err);
  }

  sendEmail(
    "New lead started chatting on DSPOps",
    `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nTime: ${new Date().toISOString()}` +
      (stored ? "" : "\n\nWARNING: this lead could NOT be saved to the database — keep this email.")
  ).catch((err) => console.error("Lead notification email failed:", err));

  return res.json({ ok: true, stored });
});

// POST /api/chat/end — the old transcript-on-close endpoint
router.post("/end", async (req, res) => {
  const { messages } = req.body as { messages?: Array<{ role: string; content: string }> };
  if (Array.isArray(messages) && messages.length > 0) {
    const transcript = messages
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");
    sendEmail("DSPOps chat transcript", transcript).catch((err) =>
      console.error("Transcript email failed:", err)
    );
  }
  return res.json({ ok: true });
});

export default router;
