import Anthropic from "@anthropic-ai/sdk";
import type { ChatMessage } from "./chatStore.js";

// Every Anthropic call for the chat lives here. The prompt, the HTTP handling
// and the email notification used to be tangled together in
// server/routes/chat.ts; separating them is what keeps the new operator
// endpoints readable.

const client = new Anthropic();
const MODEL = "claude-haiku-4-5-20251001";
const MAX_HISTORY = 30;

export const SYSTEM_PROMPT = `You are the helpful assistant for DSPOps — a SaaS platform for Amazon DSP (Delivery Service Partner) operators in the UK.

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
- All plans (Starter, Professional, Enterprise) include Same-Day Delivery support and hassle-free driver onboarding (CSV import, auto-generated driver portal logins) — these are never tier-gated, always mention them regardless of which plan is being discussed.
- Starter: £99/month — up to 30 drivers. Includes smart scheduling, driver management, fleet tracking, basic compliance, weekly payroll, driver portal, email support.
- Professional: £249/month — up to 100 drivers. Everything in Starter plus AI van damage detection, performance scorecards, advanced compliance, reports & analytics, capacity planning, Amazon Cortex integration, priority support.
- Enterprise: Unlimited drivers AND unlimited stations — built for large or multi-station DSP operations. If a DSP runs more than one station, they can add as many stations as they like on Enterprise (this is an Enterprise-only capability — Starter and Professional are single-station). Priced PER ACTIVE DRIVER per month — not a flat fee — at a rate agreed with each client. Each month they pay for whichever is HIGHER: their actual active driver count, or their agreed minimum (never fewer than 100 drivers). So a DSP running 140 drivers pays for 140, not 100 — the 100 is only a floor for months they run fewer. Everything in Professional plus unlimited stations, API access, dedicated CSM, custom SLAs and white-glove setup. There is no published per-driver rate, so never quote a figure — direct them to email rashid@dspops.app for a quote.

Never say DSPOps has "no per-driver fees" as a blanket statement. Starter and Professional are flat monthly fees with no per-driver charge; Enterprise is charged per driver. "Unlimited drivers/stations" describes the CAP (no upper limit) — it is not free. Enterprise is still billed per active driver above the 100 minimum; never imply otherwise.

RESPONSE RULES — follow these strictly:
- Keep replies very short. Max 3-4 lines or 3 bullet points. Never long paragraphs.
- Use **bold** (double asterisks) for key terms, prices, and feature names — e.g. **£99/month**, **Smart Scheduling**, **Professional plan**.
- For lists, start each item with "- " on its own line.
- Put a blank line between separate points or sections so it breathes.
- Pricing example format:
  **Starter** — £99/month, up to 30 drivers

  **Professional** — £249/month, up to 100 drivers

  **Enterprise** — Unlimited drivers & stations, priced per active driver (minimum 100 billed/month), email rashid@dspops.app

  All plans include Same-Day Delivery support and hassle-free driver onboarding.
- Tone: friendly, direct. If unsure, suggest they email rashid@dspops.app.`;

/**
 * Map stored messages onto the Anthropic message list.
 *
 * - `system` rows are ours, not the model's, so they are dropped entirely.
 * - `admin` replies are assistant turns: from the model's point of view the
 *   assistant said them, and it needs them for context if it ever resumes.
 * - The API requires the first message to be a user turn, so leading assistant
 *   messages (the opening greeting) are trimmed.
 */
export function toApiMessages(
  history: ChatMessage[]
): Array<{ role: "user" | "assistant"; content: string }> {
  const mapped = history
    .slice(-MAX_HISTORY)
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "visitor" ? ("user" as const) : ("assistant" as const),
      content: m.content,
    }));

  let first = 0;
  while (first < mapped.length && mapped[first].role === "assistant") first++;
  return mapped.slice(first);
}

// Phrases that always hand over, whatever the model decided. Someone explicitly
// asking for a person must never be swallowed by a model judgement call.
export const HARD_ESCALATION_PHRASES = [
  "speak to someone",
  "speak to a human",
  "speak to a person",
  "talk to someone",
  "talk to a human",
  "talk to a person",
  "real person",
  "real human",
  "call me",
  "ring me",
  "phone me",
  "is anyone there",
  "is there anyone there",
  "customer service",
  "sales team",
  "contact sales",
];

export function matchesEscalationPhrase(text: string): boolean {
  if (typeof text !== "string" || !text.trim()) return false;
  const haystack = text.toLowerCase();
  return HARD_ESCALATION_PHRASES.some((phrase) => haystack.includes(phrase));
}

const RESPOND_TOOL = {
  name: "respond",
  description:
    "Reply to the visitor, and flag whether a human should take over the conversation.",
  input_schema: {
    type: "object" as const,
    properties: {
      reply: {
        type: "string",
        description:
          "The reply to show the visitor. Must follow the RESPONSE RULES in the system prompt.",
      },
      escalate: {
        type: "boolean",
        description:
          "True when this visitor should be handed to a human: they asked to speak to a person, asked for a demo or a callback, asked for Enterprise or custom pricing or a quote, raised a complaint or a billing problem, said they are ready to buy or to switch from another system, or asked something you could not answer confidently. False for ordinary product questions and for standard Starter or Professional pricing you have already answered well.",
      },
      reason: {
        type: "string",
        description:
          "A short reason for handing over, e.g. 'asked for a demo'. Empty string when escalate is false.",
      },
    },
    required: ["reply", "escalate", "reason"],
  },
};

export interface BotReply {
  reply: string;
  escalate: boolean;
  reason: string | null;
}

/**
 * One call returns both the reply and the escalation decision — the model is
 * already reading the message, so the flag costs nothing extra. A forced tool
 * call is used rather than asking for JSON in the text, because free-form JSON
 * from Haiku is not reliable enough to branch on.
 */
export async function generateBotReply(history: ChatMessage[]): Promise<BotReply> {
  const messages = toApiMessages(history);
  if (messages.length === 0) return { reply: "", escalate: false, reason: null };

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 400,
    system: SYSTEM_PROMPT,
    tools: [RESPOND_TOOL],
    tool_choice: { type: "tool", name: "respond" },
    messages,
  });

  const toolUse = response.content.find((block) => block.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    // Never throw into the request path — the caller handles an empty reply.
    return { reply: "", escalate: false, reason: null };
  }

  const input = toolUse.input as { reply?: string; escalate?: boolean; reason?: string };
  return {
    reply: typeof input.reply === "string" ? input.reply : "",
    escalate: input.escalate === true,
    reason: input.reason?.trim() ? input.reason.trim() : null,
  };
}

const OPERATOR_VOICE = `You are drafting a reply that Rashid, the founder of DSPOps, will send himself in a live chat.

- Write in the first person as Rashid. Never refer to him in the third person.
- One or two short sentences. This is a chat message, not an email.
- Warm and direct. UK English.
- Never invent a price, a date, a discount or a commitment. Where a specific figure or time is needed, phrase it so Rashid can drop it in.
- Never quote a per-driver Enterprise rate — there is no published figure.
- Output only the message text. No preamble, no sign-off, no surrounding quotation marks.`;

/** Drafts a reply for the operator. Never sends and never stores anything. */
export async function suggestOperatorReply(
  history: ChatMessage[],
  visitorName: string | null
): Promise<string> {
  const messages = toApiMessages(history);
  if (messages.length === 0) return "";

  const who = visitorName ? `The visitor's name is ${visitorName}.` : "";
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 300,
    system: `${SYSTEM_PROMPT}\n\n---\n\n${OPERATOR_VOICE}\n${who}`,
    messages,
  });

  const block = response.content.find((b) => b.type === "text");
  return block && block.type === "text" ? block.text.trim() : "";
}

const REFINE_SYSTEM = `You rewrite short chat messages for Rashid, the founder of DSPOps, so they read well before he sends them.

Rewrite the message you are given:
- Fix spelling, grammar and punctuation.
- Make the tone warm, professional and direct.
- Keep it the same length or shorter. Never pad it out.
- UK English.
- Preserve every fact, figure, date, name and commitment EXACTLY as written. Never add a price, a promise, a deadline or a detail that is not already in the message.
- Output only the rewritten message. No preamble, no explanation, no quotation marks.`;

/**
 * Polishes whatever the operator has typed. Deliberately conservative: it may
 * change how something reads, but it must never add a fact, and above all never
 * a price. Rashid presses this on his own words and has to be able to trust
 * that his meaning survives.
 */
export async function refineDraft(draft: string, history: ChatMessage[]): Promise<string> {
  const text = typeof draft === "string" ? draft.trim() : "";
  if (!text) throw new Error("Nothing to refine");

  const context = toApiMessages(history)
    .slice(-6)
    .map((m) => `${m.role === "user" ? "Visitor" : "Rashid"}: ${m.content}`)
    .join("\n");

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 300,
    system: REFINE_SYSTEM,
    messages: [
      {
        role: "user",
        content: context
          ? `Recent conversation, for tone only:\n${context}\n\nRewrite this message:\n${text}`
          : `Rewrite this message:\n${text}`,
      },
    ],
  });

  const block = response.content.find((b) => b.type === "text");
  return block && block.type === "text" ? block.text.trim() : text;
}
