import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { sendEmail } from "../email.js";

const router = Router();

const client = new Anthropic();

const SYSTEM_PROMPT = `You are the helpful assistant for DSPOps — a SaaS platform for Amazon DSP (Delivery Service Partner) operators in the UK.

DSPOps replaces spreadsheets, WhatsApp chaos, and third-party tools with one platform. Key features:
- Smart scheduling / route assignment
- AI van damage detection (replaces tools like £200-300/month third-party apps)
- Weekly payroll automation (upload Cortex report, system calculates everything)
- Amazon Cortex integration (one-click sync of scorecards and route data)
- Compliance management (driver licences, passports, van MOT/insurance)
- Driver management (full lifecycle from onboarding to offboarding)
- Capacity planning (always know if you have enough drivers)
- Driver portal app (drivers see shifts, pay, performance, damage — stop calling the OSM)
- Live Tracking (delivery progress synced from Amazon Cortex to driver portal automatically)
- Same Day Delivery management (separate SDD driver roster and scheduling)
- Arriving / dispatch attendance (OSM marks arrivals live during dispatch)
- Automatic data backup (all data continuously backed up, nothing lost)
- Driver Rating & Leaderboard (automatic ratings from Amazon metrics, OSM-adjustable weighting)

Pricing:
- Starter: £99/month — up to 30 drivers. Includes smart scheduling, driver management, fleet tracking, basic compliance, weekly payroll, driver portal, email support.
- Professional: £249/month — up to 100 drivers. Everything in Starter plus AI van damage detection, performance scorecards, advanced compliance, reports & analytics, capacity planning, Amazon Cortex integration, priority support.
- Enterprise: Custom pricing. For large or multi-DSP operations. To discuss Enterprise, direct them to contact rashid@dspops.app.

Tone: friendly, direct, concise. No jargon. If you don't know something specific, say so honestly and suggest they reach out to rashid@dspops.app.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

// POST /api/chat
router.post("/", async (req, res) => {
  const { messages } = req.body as { messages: Message[] };

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages must be a non-empty array" });
  }

  try {
    // Anthropic API requires the first message to have role "user".
    // Drop any leading assistant messages (the initial greeting lives in frontend state only).
    const apiMessages = messages.filter(
      (m, i) => !(i === 0 && m.role === "assistant")
    );

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: apiMessages.map((m) => ({ role: m.role, content: m.content })),
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Fire-and-forget notification email on the user's first message
    const userMessageCount = messages.filter((m) => m.role === "user").length;
    if (userMessageCount === 1) {
      const visitorQuestion = messages.find((m) => m.role === "user")?.content ?? "";
      sendEmail(
        "New visitor chatting on DSPOps",
        visitorQuestion
      ).catch((err) => console.error("Notification email failed:", err));
    }

    return res.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return res.status(500).json({ error: "Failed to get response from AI" });
  }
});

// POST /api/chat/end
router.post("/end", async (req, res) => {
  const { messages } = req.body as { messages: Message[] };

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
