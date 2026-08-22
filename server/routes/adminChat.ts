import { Router, type Request, type Response, type NextFunction } from "express";
import { verifyChatLink } from "../lib/chatLinks.js";
import { hasValidBearer } from "../lib/adminTokens.js";
import { refineDraft, suggestOperatorReply } from "../lib/chatAi.js";
import {
  addMessage,
  getConversationByPublicId,
  getMessages,
  getRecentMessages,
  listConversations,
  setStatus,
  type ChatMessage,
} from "../lib/chatStore.js";

const router = Router();

// Operator side of the live chat — the screen Rashid reaches from the link in
// the escalation email.
//
// Auth is either a normal admin session (Bearer) or a signed link scoped to a
// single conversation. The conversation LIST is bearer-only — a link token must
// never be able to enumerate other visitors chats.

const MAX_MESSAGE_CHARS = 2000;

function publicMessage(m: ChatMessage) {
  return { id: m.id, role: m.role, content: m.content, createdAt: m.createdAt };
}

/**
 * Two ways in: a normal admin session, or a signed link from the escalation
 * email. The link authorises exactly the conversation named in the URL —
 * reading publicId from req.params is what makes that true, so a token minted
 * for one chat can never open another.
 */
function requireChatAccess(req: Request, res: Response, next: NextFunction) {
  if (hasValidBearer(req.headers.authorization)) return next();

  const { publicId } = req.params;
  const k = typeof req.query.k === "string" ? req.query.k : "";
  if (publicId && k && verifyChatLink(publicId, k)) return next();

  return res.status(401).json({ error: "Unauthorized" });
}

/** Bearer only — a link token is scoped to one chat and must never list others. */
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (hasValidBearer(req.headers.authorization)) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

// GET /api/admin/chats — every conversation, for the dashboard panel
router.get("/", requireAdmin, async (_req, res) => {
  try {
    const conversations = await listConversations(50);
    // Anyone actually waiting on a human comes first — that is the whole point
    // of the panel. Everything else falls back to most recently active.
    const rank = (s: string) => (s === "awaiting_human" ? 0 : s === "human" ? 1 : 2);
    conversations.sort(
      (a, b) =>
        rank(a.status) - rank(b.status) ||
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    return res.json({
      conversations: conversations.map((c) => ({
        conversationId: c.publicId,
        visitorName: c.visitorName,
        visitorEmail: c.visitorEmail,
        status: c.status,
        escalationReason: c.escalationReason,
        messageCount: c.messageCount,
        lastMessageAt: c.lastMessageAt,
        createdAt: c.createdAt,
      })),
      total: conversations.length,
    });
  } catch (err) {
    console.error("Admin chat list error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /api/admin/chats/:publicId — transcript and details
router.get("/:publicId", requireChatAccess, async (req, res) => {
  try {
    const conversation = await getConversationByPublicId(req.params.publicId);
    if (!conversation) return res.status(404).json({ error: "conversation not found" });

    const messages = await getMessages(conversation.id);
    return res.json({
      conversationId: conversation.publicId,
      visitorName: conversation.visitorName,
      visitorEmail: conversation.visitorEmail,
      status: conversation.status,
      escalationReason: conversation.escalationReason,
      escalatedAt: conversation.escalatedAt,
      adminJoinedAt: conversation.adminJoinedAt,
      createdAt: conversation.createdAt,
      messages: messages.map(publicMessage),
    });
  } catch (err) {
    console.error("Admin chat fetch error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /api/admin/chats/:publicId/messages?since= — the operator's poll
router.get("/:publicId/messages", requireChatAccess, async (req, res) => {
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
    console.error("Admin chat poll error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /api/admin/chats/:publicId/join — take over from the bot
router.post("/:publicId/join", requireChatAccess, async (req, res) => {
  try {
    const conversation = await getConversationByPublicId(req.params.publicId);
    if (!conversation) return res.status(404).json({ error: "conversation not found" });
    if (conversation.status === "closed") {
      return res.status(409).json({ error: "this conversation has ended" });
    }
    if (conversation.status === "human") {
      return res.json({ status: "human", messages: [] });
    }

    await setStatus(conversation.publicId, "human");
    const notice = await addMessage(conversation.id, "system", "Rashid has joined the chat.");
    return res.json({ status: "human", messages: [publicMessage(notice)] });
  } catch (err) {
    console.error("Admin chat join error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /api/admin/chats/:publicId/message — Rashid replies
router.post("/:publicId/message", requireChatAccess, async (req, res) => {
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

    // Replying implies taking over. Without this, a reply sent straight from the
    // email link would sit alongside a bot that is still answering.
    if (conversation.status !== "human") {
      await setStatus(conversation.publicId, "human");
    }

    const message = await addMessage(conversation.id, "admin", text);
    return res.json({ message: publicMessage(message), status: "human" });
  } catch (err) {
    console.error("Admin chat reply error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /api/admin/chats/:publicId/suggest — draft a reply. Never sends.
router.post("/:publicId/suggest", requireChatAccess, async (req, res) => {
  try {
    const conversation = await getConversationByPublicId(req.params.publicId);
    if (!conversation) return res.status(404).json({ error: "conversation not found" });

    const history = await getRecentMessages(conversation.id, 30);
    const draft = await suggestOperatorReply(history, conversation.visitorName);
    return res.json({ draft });
  } catch (err) {
    console.error("Admin chat suggest error:", err);
    return res.status(500).json({ error: "Could not draft a reply" });
  }
});

// POST /api/admin/chats/:publicId/refine — polish what he typed. Never sends.
router.post("/:publicId/refine", requireChatAccess, async (req, res) => {
  const { draft } = req.body as { draft?: string };
  if (typeof draft !== "string" || !draft.trim()) {
    return res.status(400).json({ error: "draft is required" });
  }

  try {
    const conversation = await getConversationByPublicId(req.params.publicId);
    if (!conversation) return res.status(404).json({ error: "conversation not found" });

    const history = await getRecentMessages(conversation.id, 30);
    const refined = await refineDraft(draft, history);
    return res.json({ refined });
  } catch (err) {
    console.error("Admin chat refine error:", err);
    return res.status(500).json({ error: "Could not refine that" });
  }
});

// POST /api/admin/chats/:publicId/handback — give the conversation back to the bot
router.post("/:publicId/handback", requireChatAccess, async (req, res) => {
  try {
    const conversation = await getConversationByPublicId(req.params.publicId);
    if (!conversation) return res.status(404).json({ error: "conversation not found" });

    await setStatus(conversation.publicId, "bot");
    const notice = await addMessage(
      conversation.id,
      "system",
      "You're back with the assistant."
    );
    return res.json({ status: "bot", messages: [publicMessage(notice)] });
  } catch (err) {
    console.error("Admin chat handback error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /api/admin/chats/:publicId/close
router.post("/:publicId/close", requireChatAccess, async (req, res) => {
  try {
    const conversation = await getConversationByPublicId(req.params.publicId);
    if (!conversation) return res.status(404).json({ error: "conversation not found" });

    await setStatus(conversation.publicId, "closed");
    return res.json({ status: "closed" });
  } catch (err) {
    console.error("Admin chat close error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
