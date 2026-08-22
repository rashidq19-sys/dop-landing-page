import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";
import pool from "../db.js";
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
- Enterprise: 100+ drivers, for large or multi-DSP operations. Priced PER ACTIVE DRIVER per month — not a flat fee — at a rate agreed with each client. Each month they pay for whichever is HIGHER: their actual active driver count, or their agreed minimum (never fewer than 100 drivers). So a DSP running 140 drivers pays for 140, not 100 — the 100 is only a floor for months they run fewer. Everything in Professional plus multi-station support, API access, dedicated CSM, custom SLAs and white-glove setup. There is no published per-driver rate, so never quote a figure — direct them to email rashid@dspops.app for a quote.

Never say DSPOps has "no per-driver fees" as a blanket statement. Starter and Professional are flat monthly fees with no per-driver charge; Enterprise is charged per driver.

RESPONSE RULES — follow these strictly:
- Keep replies very short. Max 3-4 lines or 3 bullet points. Never long paragraphs.
- Use **bold** (double asterisks) for key terms, prices, and feature names — e.g. **£99/month**, **Smart Scheduling**, **Professional plan**.
- For lists, start each item with "- " on its own line.
- Put a blank line between separate points or sections so it breathes.
- Pricing example format:
  **Starter** — £99/month, up to 30 drivers

  **Professional** — £249/month, up to 100 drivers

  **Enterprise** — 100+ drivers, priced per active driver (minimum 100 billed/month), email rashid@dspops.app
- Tone: friendly, direct. If unsure, suggest they email rashid@dspops.app.`;

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
      max_tokens: 300,
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

// POST /api/chat/lead
router.post("/lead", async (req, res) => {
  const { name, email } = req.body as { name?: string; email?: string };

  const trimmedName = typeof name === "string" ? name.trim() : "";
  // Lowercased to match the waitlist route — waitlist.email is UNIQUE, so mixed
  // case would create a second row for the same person.
  const trimmedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!trimmedName || !trimmedEmail) {
    return res.status(400).json({ error: "name and email are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ error: "invalid email" });
  }

  // waitlist.name is VARCHAR(255) — truncate rather than lose the whole lead to
  // a failed insert.
  const storedName = trimmedName.slice(0, 255);

  // Persist the lead. The chatbot is the only place on the site that asks a
  // visitor for their name, so without this the name lived nowhere but their own
  // browser. An email we already know keeps its original source (first-touch
  // attribution) and simply gains the name.
  let stored = false;
  try {
    await pool.query(
      `INSERT INTO waitlist (email, name, source) VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE
         SET name = COALESCE(EXCLUDED.name, waitlist.name), updated_at = NOW()`,
      [trimmedEmail, storedName, "Chatbot"]
    );
    stored = true;
  } catch (err) {
    console.error("Chat lead insert error:", err);
  }

  // Sent whatever happened above — if the database write failed, this email is
  // the only surviving copy of the lead.
  sendEmail(
    "New lead started chatting on DSPOps",
    `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nTime: ${new Date().toISOString()}` +
      (stored
        ? ""
        : "\n\nWARNING: this lead could NOT be saved to the database — keep this email.")
  ).catch((err) => console.error("Lead notification email failed:", err));

  return res.json({ ok: true, stored });
});

export default router;
