# Live Chat Takeover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let Rashid step into a live visitor chat from a one-click email link, talk to the visitor in real time, and have the AI draft and polish his replies.

**Architecture:** Conversations and messages move out of browser memory into two new Postgres tables. The visitor widget and the operator screen both poll a shared message endpoint every 2 seconds. A forced Anthropic tool call returns the bot's reply *and* an escalation flag in one round trip. The operator screen is reached by an HMAC-signed link scoped to a single conversation, so it survives server restarts that destroy the in-memory admin token.

**Tech Stack:** Express + raw `pg` (no ORM), React 19 + TypeScript + Tailwind v4, wouter routing, `@anthropic-ai/sdk` with `claude-haiku-4-5-20251001`, `nanoid`, `express-rate-limit` (new dependency).

**Spec:** `docs/superpowers/specs/2026-08-22-live-chat-takeover-design.md`

## Global Constraints

- **Scope: Phases 1 and 2 only.** Phase 3 (abandonment timer + email to the visitor) is NOT built — it needs Rashid's sign-off on emailing members of the public. Do not add a `to` parameter to `sendEmail`.
- **No test framework exists.** Verification is throwaway Node scripts under the scratchpad plus browser checks. Never claim a test suite. Delete verification scripts after use; never commit them.
- **Raw `pg` only** — no Drizzle, no ORM. Follow the existing `pool.query` patterns in `server/routes/waitlist.ts`.
- **UK English** in every piece of user-facing copy (optimise, colour, licence, organise).
- **Design system:** DM Sans, off-white `#FAFAF8`, navy `#0F1B2D`, brand blue `#2563EB`. Match surrounding components; do not introduce new patterns.
- **Model:** `claude-haiku-4-5-20251001` for every AI call.
- **Never quote a per-driver Enterprise price.** The existing system prompt forbids it; the operator-draft and refine prompts must forbid it too.
- **Deploy rule:** any task touching `client/` requires a full local `npm run build` and a commit of `dist/public`, not just `build:server`. Skipping it serves stale HTML.
- **Test data hygiene:** verification writes to the live Neon database. Use `@dspops-test.invalid` addresses and delete every row you create.
- **Commit files by name.** Never `git add .` — another session's uncommitted work may be in the tree.

---

## File Structure

| File | Responsibility |
|---|---|
| `server/db.ts` | Modify — add `chat_conversations` + `chat_messages` to `initDb()` |
| `server/lib/chatStore.ts` | **New** — every conversation/message query. No HTTP, no AI. |
| `server/lib/chatLinks.ts` | **New** — sign and verify one-conversation link tokens |
| `server/lib/chatAi.ts` | **New** — system prompt, bot reply + escalation, operator draft, refine |
| `server/routes/chat.ts` | Rewrite — visitor endpoints only, thin over `chatStore`/`chatAi` |
| `server/routes/adminChat.ts` | **New** — operator endpoints, dual auth |
| `server/index.ts` | Modify — mount router, rate limiters, trust proxy, route pattern |
| `client/src/components/ChatbotWidget.tsx` | Modify — conversation id, polling, status banner, Talk to a person |
| `client/src/pages/AdminChat.tsx` | **New** — operator quick-reply screen |
| `client/src/pages/Admin.tsx` | Modify — Live chats panel |
| `client/src/App.tsx` | Modify — lazy route `/admin/chat/:publicId` |

`chatStore` and `chatAi` are separated deliberately: the store is pure database access and is trivially verifiable without an API key, while `chatAi` is the only module that talks to Anthropic. `server/routes/chat.ts` today mixes prompt, HTTP, AI and email in one file — this split is what keeps the new endpoints readable.

---

## Task 1: Database tables and the conversation store

**Files:**
- Modify: `server/db.ts` (inside `initDb()`, after the `page_views` block)
- Create: `server/lib/chatStore.ts`
- Verify: `<scratchpad>/verify-task1.mjs` (throwaway)

**Interfaces:**
- Consumes: `pool` from `server/db.js`
- Produces:
  - `type ChatRole = "visitor" | "bot" | "admin" | "system"`
  - `type ChatStatus = "bot" | "awaiting_human" | "human" | "closed"`
  - `interface Conversation { id: number; publicId: string; visitorName: string | null; visitorEmail: string | null; status: ChatStatus; escalationReason: string | null; escalatedAt: Date | null; adminJoinedAt: Date | null; createdAt: Date; updatedAt: Date }`
  - `interface ChatMessage { id: number; role: ChatRole; content: string; createdAt: Date }`
  - `createConversation(name: string, email: string): Promise<Conversation>`
  - `getConversationByPublicId(publicId: string): Promise<Conversation | null>`
  - `addMessage(conversationId: number, role: ChatRole, content: string): Promise<ChatMessage>`
  - `getMessages(conversationId: number, sinceId?: number): Promise<ChatMessage[]>`
  - `getRecentMessages(conversationId: number, limit: number): Promise<ChatMessage[]>`
  - `setStatus(publicId: string, status: ChatStatus, extra?: { escalationReason?: string }): Promise<Conversation | null>`
  - `listConversations(limit: number): Promise<Array<Conversation & { messageCount: number; lastMessageAt: Date | null }>>`
  - `countMessages(conversationId: number): Promise<number>`

- [ ] **Step 1: Write the failing verification script**

Create `<scratchpad>/verify-task1.mjs`:

```js
import { createConversation, getConversationByPublicId, addMessage,
         getMessages, setStatus, countMessages } from "../server/lib/chatStore.js";

const c = await createConversation("Task1 Test", "task1@dspops-test.invalid");
console.assert(c.publicId?.length >= 12, "publicId should be a nanoid");
console.assert(c.status === "bot", "new conversation starts in bot status");

const m1 = await addMessage(c.id, "visitor", "how much is it");
const m2 = await addMessage(c.id, "bot", "**Starter** is £99/month");
console.assert(m2.id > m1.id, "message ids increase");

const since = await getMessages(c.id, m1.id);
console.assert(since.length === 1 && since[0].role === "bot", "since cursor excludes m1");

const esc = await setStatus(c.publicId, "awaiting_human", { escalationReason: "asked about pricing" });
console.assert(esc.status === "awaiting_human" && esc.escalatedAt, "escalatedAt stamped");

const joined = await setStatus(c.publicId, "human");
console.assert(joined.adminJoinedAt, "adminJoinedAt stamped on join");

console.assert(await countMessages(c.id) === 2, "countMessages");
console.assert(await getConversationByPublicId("nope-does-not-exist") === null, "missing returns null");
console.log("TASK 1 OK");
```

- [ ] **Step 2: Run it and confirm it fails**

Run with `npx tsx <scratchpad>/verify-task1.mjs` from the repo root.
Expected: `ERR_MODULE_NOT_FOUND` for `server/lib/chatStore.js`.

- [ ] **Step 3: Add the tables to `initDb()`**

In `server/db.ts`, after the `page_views` index, before the `console.log`:

```ts
  // Live chat. Conversations were previously held only in the visitor's browser,
  // so a transcript could not be re-opened and a human could not join one.
  // public_id is the only identifier that reaches a URL — the numeric id never
  // leaves the server, so conversations cannot be enumerated.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chat_conversations (
      id                      BIGSERIAL PRIMARY KEY,
      public_id               VARCHAR(32) UNIQUE NOT NULL,
      visitor_name            VARCHAR(255),
      visitor_email           VARCHAR(255),
      status                  VARCHAR(20) NOT NULL DEFAULT 'bot',
      escalation_reason       TEXT,
      escalated_at            TIMESTAMPTZ,
      admin_joined_at         TIMESTAMPTZ,
      closed_at               TIMESTAMPTZ,
      last_visitor_message_at TIMESTAMPTZ,
      last_admin_message_at   TIMESTAMPTZ,
      created_at              TIMESTAMPTZ DEFAULT NOW(),
      updated_at              TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id              BIGSERIAL PRIMARY KEY,
      conversation_id BIGINT NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
      role            VARCHAR(16) NOT NULL,
      content         TEXT NOT NULL,
      created_at      TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_chat_messages_conv ON chat_messages (conversation_id, id)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_chat_conversations_status ON chat_conversations (status, updated_at DESC)`);
```

Update the final log line to `"Database initialized — waitlist + page_views + chat tables ready"`.

- [ ] **Step 4: Write `server/lib/chatStore.ts`**

Implement every function in the Interfaces block. Rules the implementer must follow:

- `createConversation` generates `public_id` with `nanoid(21)` (already a dependency, imported in `server/routes/admin.ts`).
- Trim and lowercase the email; truncate name and email to 255 chars.
- `setStatus` stamps `escalated_at = NOW()` on the first move to `awaiting_human`, `admin_joined_at = NOW()` on the first move to `human`, and `closed_at = NOW()` on `closed` — each guarded with `COALESCE(existing, NOW())` so a repeat call does not reset the original timestamp. Always sets `updated_at = NOW()`. Returns `null` if no row matched.
- `addMessage` also updates the conversation's `last_visitor_message_at` (role `visitor`) or `last_admin_message_at` (role `admin`) and `updated_at`, in the same transaction via `pool.query` calls wrapped in a client checkout.
- `getMessages(id, sinceId)` returns rows with `id > sinceId` ordered by `id ASC`; with no `sinceId`, all rows.
- `getRecentMessages(id, limit)` returns the LAST `limit` rows in chronological order (subquery with `ORDER BY id DESC LIMIT n`, re-sorted ascending).
- `listConversations(limit)` joins a message count and last message time, ordered by `updated_at DESC`.
- Map every snake_case column to the camelCase interface fields — no raw rows leak out of this module.

- [ ] **Step 5: Run the verification script and confirm it passes**

Expected: `TASK 1 OK` with no assertion output.

- [ ] **Step 6: Clean up the test rows**

```bash
node -e "import('pg').then(async({default:pg})=>{const fs=await import('fs');const u=fs.readFileSync('.env','utf8').split(/\r?\n/).find(l=>l.startsWith('DATABASE_URL=')).slice(13).trim();const p=new pg.Pool({connectionString:u,ssl:{rejectUnauthorized:false}});const r=await p.query(\"DELETE FROM chat_conversations WHERE visitor_email LIKE '%@dspops-test.invalid'\");console.log('deleted',r.rowCount);await p.end();})"
```

`chat_messages` rows go with them via `ON DELETE CASCADE`.

- [ ] **Step 7: Commit**

```bash
git add server/db.ts server/lib/chatStore.ts
git commit -m "feat(chat): persist conversations and messages"
```

---

## Task 2: Signed one-conversation link tokens

**Files:**
- Create: `server/lib/chatLinks.ts`
- Modify: `.env` (add `CHAT_LINK_SECRET`, never committed — `.env` is gitignored)
- Verify: `<scratchpad>/verify-task2.mjs` (throwaway)

**Interfaces:**
- Produces:
  - `signChatLink(publicId: string, ttlMs?: number): string` — default TTL 24h
  - `verifyChatLink(publicId: string, token: string): boolean`
  - `chatLinkUrl(publicId: string): string` — full `https://dspops.app/admin/chat/<id>?k=<token>`, base from `PUBLIC_BASE_URL` env with a `https://dspops.app` default

- [ ] **Step 1: Write the failing verification script**

Create `<scratchpad>/verify-task2.mjs`:

```js
import { signChatLink, verifyChatLink, chatLinkUrl } from "../server/lib/chatLinks.js";

const id = "conv_abc123";
const good = signChatLink(id);
console.assert(verifyChatLink(id, good) === true, "valid token verifies");
console.assert(verifyChatLink("conv_other", good) === false, "token is scoped to one conversation");
console.assert(verifyChatLink(id, good.slice(0, -1) + "x") === false, "tampered token rejected");
console.assert(verifyChatLink(id, "garbage") === false, "garbage rejected");
console.assert(verifyChatLink(id, "") === false, "empty rejected");

const expired = signChatLink(id, -1000);
console.assert(verifyChatLink(id, expired) === false, "expired token rejected");

console.assert(chatLinkUrl(id).includes(`/admin/chat/${id}?k=`), "url shape");
console.log("TASK 2 OK");
```

- [ ] **Step 2: Run it and confirm it fails**

Expected: `ERR_MODULE_NOT_FOUND` for `server/lib/chatLinks.js`.

- [ ] **Step 3: Add the secret**

Append to `.env` (gitignored):

```
CHAT_LINK_SECRET=<output of: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
```

Also set it on the Railway `dop-landing-page` service before shipping. If the variable is missing, `signChatLink` must throw at call time with a clear message rather than silently signing with an empty key.

- [ ] **Step 4: Write `server/lib/chatLinks.ts`**

```ts
import { createHmac, timingSafeEqual } from "crypto";

// The admin bearer token lives in an in-memory Set and dies on every server
// restart, so a link mailed to Rashid would frequently be dead before he
// clicked it. This token is stateless, and is scoped to ONE conversation so a
// forwarded email cannot reach the lead list or anything else in admin.
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;

function secret(): string {
  const s = process.env.CHAT_LINK_SECRET;
  if (!s) throw new Error("CHAT_LINK_SECRET is not set — chat links cannot be signed");
  return s;
}

function sign(publicId: string, expiry: number): string {
  return createHmac("sha256", secret())
    .update(`${publicId}.${expiry}`)
    .digest("base64url");
}

export function signChatLink(publicId: string, ttlMs: number = DEFAULT_TTL_MS): string {
  const expiry = Date.now() + ttlMs;
  return `${expiry}.${sign(publicId, expiry)}`;
}

export function verifyChatLink(publicId: string, token: string): boolean {
  if (typeof token !== "string" || !token.includes(".")) return false;
  const [expiryRaw, signature] = token.split(".", 2);
  const expiry = Number(expiryRaw);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;

  const expected = Buffer.from(sign(publicId, expiry));
  const given = Buffer.from(signature ?? "");
  if (expected.length !== given.length) return false;
  return timingSafeEqual(expected, given);
}

export function chatLinkUrl(publicId: string): string {
  const base = process.env.PUBLIC_BASE_URL || "https://dspops.app";
  return `${base}/admin/chat/${publicId}?k=${signChatLink(publicId)}`;
}
```

- [ ] **Step 5: Run the verification script and confirm it passes**

Expected: `TASK 2 OK`.

- [ ] **Step 6: Commit**

```bash
git add server/lib/chatLinks.ts
git commit -m "feat(chat): signed single-conversation admin links"
```

---

## Task 3: AI module — bot reply with escalation, operator draft, refine

**Files:**
- Create: `server/lib/chatAi.ts`
- Verify: `<scratchpad>/verify-task3.mjs` (throwaway, makes real API calls)

**Interfaces:**
- Consumes: `ChatMessage`, `ChatRole` from `server/lib/chatStore.js`
- Produces:
  - `SYSTEM_PROMPT: string` — moved verbatim from `server/routes/chat.ts`
  - `generateBotReply(history: ChatMessage[]): Promise<{ reply: string; escalate: boolean; reason: string | null }>`
  - `suggestOperatorReply(history: ChatMessage[], visitorName: string | null): Promise<string>`
  - `refineDraft(draft: string, history: ChatMessage[]): Promise<string>`
  - `HARD_ESCALATION_PHRASES: string[]`
  - `matchesEscalationPhrase(text: string): boolean`

- [ ] **Step 1: Write the failing verification script**

Create `<scratchpad>/verify-task3.mjs`:

```js
import { generateBotReply, suggestOperatorReply, refineDraft,
         matchesEscalationPhrase } from "../server/lib/chatAi.js";

console.assert(matchesEscalationPhrase("can I speak to someone please") === true, "phrase hit");
console.assert(matchesEscalationPhrase("what is DCR") === false, "no false positive");

const priced = await generateBotReply([
  { id: 1, role: "visitor", content: "what does it cost for 40 drivers?", createdAt: new Date() },
]);
console.assert(priced.reply.length > 0, "bot replies");
console.assert(typeof priced.escalate === "boolean", "escalate is a boolean");
console.log("  escalate on pricing question:", priced.escalate, "|", priced.reason);

const draft = await suggestOperatorReply([
  { id: 1, role: "visitor", content: "can you do a demo this week?", createdAt: new Date() },
], "Priya");
console.assert(draft.length > 0 && draft.length < 600, "draft is short");
console.log("  draft:", draft);

const refined = await refineDraft("yeah sure we can do thursday, ill send a link", []);
console.assert(refined.length > 0, "refine returns text");
console.log("  refined:", refined);
console.log("TASK 3 OK");
```

- [ ] **Step 2: Run it and confirm it fails**

Expected: `ERR_MODULE_NOT_FOUND` for `server/lib/chatAi.js`.

- [ ] **Step 3: Write `server/lib/chatAi.ts`**

Move `SYSTEM_PROMPT` verbatim out of `server/routes/chat.ts` — do not reword it; it encodes current pricing rules that were corrected in commits `bb2e786` and `3d9ec5c`.

`generateBotReply` uses a **forced tool call** rather than asking for JSON, because free-form JSON from Haiku is not reliable enough to branch on:

```ts
const RESPOND_TOOL = {
  name: "respond",
  description: "Reply to the visitor and flag whether a human should take over.",
  input_schema: {
    type: "object" as const,
    properties: {
      reply: { type: "string", description: "The reply to show the visitor, following the response rules." },
      escalate: {
        type: "boolean",
        description:
          "True if this visitor should be handed to a human: they asked for a person, asked about a demo, asked for a quote or Enterprise pricing, raised a complaint, or asked something you could not answer.",
      },
      reason: { type: "string", description: "Short reason for escalating, or an empty string." },
    },
    required: ["reply", "escalate", "reason"],
  },
};
```

Call with `tools: [RESPOND_TOOL]`, `tool_choice: { type: "tool", name: "respond" }`, `max_tokens: 400`.
Map store roles to the API: `visitor` → `user`; `bot` and `admin` → `assistant`; **drop `system` rows entirely**. Drop any leading assistant message (the Anthropic API requires the first message to be `user`) — the existing route already does this and the same rule applies here. Cap history at the last 30 messages.

If the model returns no tool call, fall back to `{ reply: "", escalate: false, reason: null }` and let the caller handle an empty reply — never throw into the request path.

`suggestOperatorReply` uses `SYSTEM_PROMPT` plus an operator preamble:

> You are drafting a reply that Rashid, the founder of DSPOps, will send himself. Write in the first person as Rashid. Keep it to one or two short sentences. Be warm and direct. Use UK English. Never invent a price, a date, or a commitment — if a specific figure or time is needed, write it so Rashid can fill it in. Never quote a per-driver Enterprise rate. Output only the message text, with no preamble and no quotation marks.

`refineDraft` takes the operator's raw text:

> Rewrite the following message so it reads well: fix spelling, grammar and punctuation, and make the tone warm, professional and direct. Keep it the same length or shorter. Use UK English. Preserve every fact, figure, date and commitment exactly as written — never add a price, a promise or a detail that is not already there. Output only the rewritten message.

`max_tokens: 300` for both.

- [ ] **Step 4: Run the verification script and confirm it passes**

Expected: `TASK 3 OK`, and the logged escalation on a pricing question should be `true`. If it is `false`, tighten the `escalate` description and re-run — this flag is the whole feature's trigger.

- [ ] **Step 5: Commit**

```bash
git add server/lib/chatAi.ts
git commit -m "feat(chat): AI module with escalation flag, operator drafts and refine"
```

---

## Task 4: Visitor endpoints

**Files:**
- Rewrite: `server/routes/chat.ts`
- Verify: `<scratchpad>/verify-task4.sh` (throwaway curl script)

**Interfaces:**
- Consumes: everything from `chatStore`, `chatAi`, `chatLinks`; `sendEmail` from `server/email.js`
- Produces: the visitor endpoints listed below, mounted at `/api/chat`

- [ ] **Step 1: Write the failing verification script**

Create `<scratchpad>/verify-task4.sh`:

```bash
set -e
B=http://localhost:3001/api/chat
ID=$(curl -s -X POST $B/start -H "Content-Type: application/json" \
  -d '{"name":"Task4 Test","email":"task4@dspops-test.invalid"}' | node -pe "JSON.parse(require('fs').readFileSync(0)).conversationId")
echo "conversation: $ID"
curl -s -X POST $B/$ID/message -H "Content-Type: application/json" -d '{"content":"what is DCR?"}'; echo
echo "--- ask for a human ---"
curl -s -X POST $B/$ID/message -H "Content-Type: application/json" -d '{"content":"can I speak to someone"}'; echo
echo "--- poll ---"
curl -s "$B/$ID/messages?since=0"; echo
echo "--- oversized message must 400 ---"
curl -s -o /dev/null -w "%{http_code}\n" -X POST $B/$ID/message -H "Content-Type: application/json" \
  -d "{\"content\":\"$(head -c 3000 /dev/zero | tr '\0' 'a')\"}"
```

- [ ] **Step 2: Run it against the dev server and confirm it fails**

Start the server with `npx tsx server/index.ts`, then run the script.
Expected: 404s — the new endpoints do not exist yet.

- [ ] **Step 3: Rewrite `server/routes/chat.ts`**

Endpoints, all thin over the library modules:

**`POST /start`** — `{name, email}`. Validate exactly as the current `/lead` handler does (non-empty name, email regex, lowercase, 255-char truncation). Creates the conversation, keeps the existing `waitlist` upsert with `source = 'Chatbot'` **unchanged** (this is commit `927172d` and must not regress), stores the greeting as a `bot` message, and returns `{conversationId, greeting}`.

> **Naming:** `conversationId` in every client-facing payload and URL is the **`public_id` nanoid**, never the numeric `id`. The numeric id never leaves the server. Every `:publicId` route parameter in this plan receives that same nanoid.

Still sends the "New lead started chatting" email.

**`POST /:publicId/message`** — `{content}`.
1. Reject content that is empty or over 2,000 characters with 400.
2. Load the conversation; 404 if missing, 409 if `closed`.
3. Reject with 429 if `countMessages` is already ≥ 100.
4. Store the visitor message.
5. If status is `human`, return `{messages: []}` immediately — **no Anthropic call**. This is the bot-silence guarantee.
6. Otherwise call `generateBotReply`, store the reply as a `bot` message.
7. Escalate if `escalate` is true **or** `matchesEscalationPhrase(content)` is true, and the conversation is currently `bot`: set `awaiting_human`, store the system message *"A member of the team has been notified — they'll be with you shortly."*, and fire the escalation email (below). Escalation is idempotent — a conversation already `awaiting_human` or beyond never re-notifies.
8. Return the new messages plus the current status.

**`POST /:publicId/request-human`** — the Talk to a person button. Same escalation branch as step 7, no AI call.

**`GET /:publicId/messages?since=`** — returns `{messages, status}`. Public, but returns only that conversation.

**`POST /:publicId/close`** — sets `closed`, emails Rashid the transcript (reusing the existing transcript email shape).

**Escalation email** — subject `Someone wants to talk to you on DSPOps`, body carrying visitor name, email, the escalation reason, the last few messages, and `chatLinkUrl(publicId)` on its own line. Fire-and-forget with `.catch`, exactly like the existing notification calls.

**Legacy shims** — keep `POST /` and `POST /lead` responding sensibly for one release so a visitor holding a cached bundle is not broken. `POST /` may keep its current stateless behaviour; `POST /lead` should create a conversation and return `{ok: true, stored: true}`.

- [ ] **Step 4: Run the verification script and confirm it passes**

Expected: a conversation id, a real bot reply to the DCR question, escalation triggered on "can I speak to someone" with the system message present in the poll output, and `400` for the oversized message.

- [ ] **Step 5: Confirm the escalation email arrived** with a working link, and that the lead still appears in `waitlist` with `source = 'Chatbot'`.

- [ ] **Step 6: Delete the test conversation and waitlist row.**

- [ ] **Step 7: Commit**

```bash
git add server/routes/chat.ts
git commit -m "feat(chat): conversation-backed visitor endpoints with escalation"
```

---

## Task 5: Rate limiting

**Files:**
- Modify: `package.json` (add `express-rate-limit`)
- Modify: `server/index.ts`
- Verify: `<scratchpad>/verify-task5.sh` (throwaway)

**Interfaces:**
- Produces: two limiters applied before the chat router

- [ ] **Step 1: Write the failing verification script**

```bash
for i in $(seq 1 8); do
  curl -s -o /dev/null -w "start #$i -> %{http_code}\n" -X POST http://localhost:3001/api/chat/start \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"RL $i\",\"email\":\"rl$i@dspops-test.invalid\"}"
done
```

- [ ] **Step 2: Run it and confirm it fails**

Expected: eight `200`s. There is no limit yet.

- [ ] **Step 3: Install the dependency**

```bash
npm install express-rate-limit
```

- [ ] **Step 4: Wire it up in `server/index.ts`**

Add `app.set("trust proxy", 1)` **before** the limiters — without it every visitor arrives as Railway's proxy IP and one abusive caller would rate-limit the entire site.

```ts
import rateLimit from "express-rate-limit";

const chatStartLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many chats started from this address. Please try again later." },
});

const chatMessageLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "You're sending messages too quickly. Please slow down." },
});

app.use("/api/chat/start", chatStartLimiter);
app.use("/api/chat", chatMessageLimiter);
```

Also tighten the body limit: `app.use(express.json({ limit: "64kb" }))`.

- [ ] **Step 5: Run the verification script and confirm it passes**

Expected: five `200`s then `429`s.

- [ ] **Step 6: Delete the test rows, then commit**

```bash
git add package.json package-lock.json server/index.ts
git commit -m "feat(chat): rate limit the public chat endpoints"
```

---

## Task 6: Operator endpoints

**Files:**
- Create: `server/routes/adminChat.ts`
- Modify: `server/index.ts` (mount at `/api/admin/chats`)
- Verify: `<scratchpad>/verify-task6.sh` (throwaway)

**Interfaces:**
- Consumes: `chatStore`, `chatAi`, `verifyChatLink`
- Produces: `GET /`, `GET /:publicId`, `GET /:publicId/messages`, `POST /:publicId/join`, `POST /:publicId/message`, `POST /:publicId/suggest`, `POST /:publicId/refine`, `POST /:publicId/handback`, `POST /:publicId/close`

- [ ] **Step 1: Write the failing verification script**

Create `<scratchpad>/verify-task6.mjs`:

```js
import { chatLinkUrl, signChatLink } from "../server/lib/chatLinks.js";

const B = "http://localhost:3001";
const j = async (r) => ({ status: r.status, body: await r.json().catch(() => ({})) });
const post = (p, body, q = "") =>
  fetch(`${B}${p}${q}`, { method: "POST", headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(body ?? {}) }).then(j);

// A conversation to work against
const started = await post("/api/chat/start",
  { name: "Task6 Test", email: "task6@dspops-test.invalid" });
const id = started.body.conversationId;
const k = `?k=${signChatLink(id)}`;

console.assert((await j(await fetch(`${B}/api/admin/chats/${id}`))).status === 401,
  "no auth must 401");
console.assert((await j(await fetch(`${B}/api/admin/chats/${id}?k=${signChatLink("someone-elses-chat")}`))).status === 401,
  "a token for another conversation must 401");
console.assert((await j(await fetch(`${B}/api/admin/chats/${id}${k}`))).status === 200,
  "valid link token opens this conversation");
console.assert((await j(await fetch(`${B}/api/admin/chats${k}`))).status === 401,
  "link token must not list all conversations");

console.assert((await post(`/api/admin/chats/${id}/join`, null, k)).status === 200, "join");
console.assert((await j(await fetch(`${B}/api/admin/chats/${id}${k}`))).body.status === "human",
  "status is human after join");

// THE critical assertion: the bot must be silent once a human has joined.
const after = await post(`/api/chat/${id}/message`, { content: "are you still there?" });
const botReplies = (after.body.messages ?? []).filter((m) => m.role === "bot");
console.assert(botReplies.length === 0, "BOT MUST NOT REPLY WHILE STATUS IS human");

const sug = await post(`/api/admin/chats/${id}/suggest`, null, k);
console.assert(typeof sug.body.draft === "string" && sug.body.draft.length > 0, "suggest returns a draft");
console.log("  draft:", sug.body.draft);

const ref = await post(`/api/admin/chats/${id}/refine`, { draft: "yeah we can do thurs, ill ping u a link" }, k);
console.assert(typeof ref.body.refined === "string" && ref.body.refined.length > 0, "refine returns text");
console.log("  refined:", ref.body.refined);

console.assert((await post(`/api/admin/chats/${id}/refine`, { draft: "" }, k)).status === 400, "empty draft 400s");
console.log("TASK 6 OK — conversation", id);
```

- [ ] **Step 2: Run it and confirm it fails** — 404, router not mounted.

- [ ] **Step 3: Write the dual-auth middleware**

```ts
// Two ways in: the normal admin bearer token, or a signed link from the
// escalation email. The link is scoped to the conversation in the URL, so it
// grants nothing beyond this one chat.
function requireChatAccess(req: Request, res: Response, next: NextFunction) {
  const { publicId } = req.params;
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ") && isValidAdminToken(auth.slice(7))) return next();

  const k = typeof req.query.k === "string" ? req.query.k : "";
  if (publicId && k && verifyChatLink(publicId, k)) return next();

  return res.status(401).json({ error: "Unauthorized" });
}
```

`isValidAdminToken` must be exported from `server/routes/admin.ts` (the `validTokens` Set is currently module-private — export a checker function, not the Set itself).

`GET /` (the conversation list) is bearer-only — a link token must never list other people's chats.

- [ ] **Step 4: Implement the endpoints**

- `join` → `setStatus(publicId, "human")` + system message *"Rashid has joined the chat."*
- `message` → validate ≤ 2,000 chars, store as role `admin`
- `suggest` → `suggestOperatorReply(getRecentMessages(id, 30), visitorName)`; returns `{draft}`; never stores or sends
- `refine` → `{draft}` in, `{refined}` out; 400 on empty; never stores or sends
- `handback` → `setStatus(publicId, "bot")` + system message *"You're back with the assistant."*
- `close` → `setStatus(publicId, "closed")`

Never log `req.query.k`.

- [ ] **Step 5: Run the verification script and confirm it passes.** The bot-silence check is the one that matters most — if a bot reply appears while status is `human`, stop and fix Task 4 step 5 before continuing.

- [ ] **Step 6: Delete test rows, then commit**

```bash
git add server/routes/adminChat.ts server/routes/admin.ts server/index.ts
git commit -m "feat(chat): operator endpoints with link-scoped auth"
```

---

## Task 7: Visitor widget

**Files:**
- Modify: `client/src/components/ChatbotWidget.tsx`

**Interfaces:**
- Consumes: the visitor endpoints from Task 4

- [ ] **Step 1: Rework the lead gate to call `/api/chat/start`**

Store the returned `conversationId` in React state and in `localStorage` alongside the existing `dspops_chat_lead` entry, so a refresh rejoins the same conversation rather than starting a new one.

- [ ] **Step 2: Send messages through `/:publicId/message`** and append whatever comes back.

- [ ] **Step 3: Add polling**

Poll `GET /:publicId/messages?since=<highestSeenId>` every 2,000ms, but **only** while status is `awaiting_human` or `human`. Pause when `document.visibilityState === "hidden"`, resume on focus. Clear the interval on unmount and when the conversation closes.

- [ ] **Step 4: Render system messages as centred grey italic lines**, visually distinct from both visitor and bot bubbles. Render `admin` messages as bot-side bubbles labelled **Rashid**.

- [ ] **Step 5: Add the "Talk to a person" button** in the widget header, calling `/request-human`. Hide it once status is `awaiting_human` or beyond.

- [ ] **Step 6: Verify in the browser**

Start both servers, open the widget, chat, ask for a human, confirm the system line appears, the button disappears, and that a reply sent from the operator endpoint by curl appears in the widget within ~2 seconds.

- [ ] **Step 7: Commit** (source only — `dist/public` is rebuilt once in Task 10)

```bash
git add client/src/components/ChatbotWidget.tsx
git commit -m "feat(chat): widget joins persisted conversations and polls for replies"
```

---

## Task 8: Operator quick-reply screen

**Files:**
- Create: `client/src/pages/AdminChat.tsx`
- Modify: `client/src/App.tsx` (lazy route `/admin/chat/:publicId`)
- Modify: `server/index.ts` (add `/admin/chat/...` to `PUBLIC_ROUTE_PATTERNS`)

Do **not** add this route to `client/public/sitemap.xml` or to `ROUTES` in `scripts/prerender.mjs` — it is a private page and must never be prerendered or indexed.

- [ ] **Step 1: Build the page shell**

Read `?k=` from the query string on mount; hold it in state and send it on every request. Fall back to the existing admin password form (as `Admin.tsx` does) if there is no `k` or the first request 401s. Set `noindex` via `usePageMeta`.

- [ ] **Step 2: Render the transcript** with roles styled distinctly, newest at the bottom, auto-scrolled.

- [ ] **Step 3: Add the status chip and Join button** — *Bot is handling this* / *Waiting for you* / *You are live*. Join calls `/join`.

- [ ] **Step 4: Add the compose box with the AI draft**

Fetch `/suggest` on load and after each new visitor message; pre-fill the box. Show a small **AI draft** tag while the text is untouched; clear the tag on the first keystroke. Never auto-send.

- [ ] **Step 5: Add the Refine button**

Sends the current box contents to `/refine` and replaces them with the result. Keep the pre-refine text in state so one press of an **Undo** control restores it. Bind `Cmd/Ctrl+K` on desktop.

- [ ] **Step 6: Add polling and alerts** — same 2s cadence and visibility rules as the widget. On a new `visitor` message play a short sound and flash `document.title`; stop flashing on focus.

- [ ] **Step 7: Make it genuinely responsive**

Single column below `md` with the composer pinned above the keyboard; two columns at `md` and up with visitor details in the right rail. `Enter` sends and `Shift+Enter` newlines on desktop only — on touch, `Enter` must insert a newline and sending requires the button.

- [ ] **Step 8: Verify in the browser at 375px and 1280px**, driving a real conversation from a second window. Screenshot both.

- [ ] **Step 9: Commit**

```bash
git add client/src/pages/AdminChat.tsx client/src/App.tsx server/index.ts
git commit -m "feat(chat): operator quick-reply screen with AI drafts and refine"
```

---

## Task 9: Live chats panel in admin

**Files:**
- Modify: `client/src/pages/Admin.tsx`

- [ ] **Step 1: Add a "Live chats" section** above the existing waitlist table, fetching `GET /api/admin/chats` with the bearer token.

- [ ] **Step 2: Render each row** as visitor name, email, status chip, message count and last activity, linking to `/admin/chat/<publicId>` (no `k` needed — the bearer token authenticates).

- [ ] **Step 3: Sort so anything `awaiting_human` pins to the top**, since those are the ones waiting on a human.

- [ ] **Step 4: Verify in the browser** — a conversation started in another window appears, and clicking through opens it.

- [ ] **Step 5: Commit**

```bash
git add client/src/pages/Admin.tsx
git commit -m "feat(chat): live chats panel in the admin dashboard"
```

---

## Task 10: End-to-end, build, and ship preparation

**Files:**
- Modify: `dist/public/**` (rebuilt), `STATUS.md`, `CLAUDE.md`

- [ ] **Step 1: Full two-window run-through**

Visitor in one window, operator in another. Walk the whole flow: chat → escalate → email link → open → Join → bot goes silent → talk both ways → suggest → refine → hand back. Confirm each step.

- [ ] **Step 2: Confirm the database agrees** — conversation status transitions in order, message roles correct, the `waitlist` lead still created with `source = 'Chatbot'`.

- [ ] **Step 3: Delete every test row.**

- [ ] **Step 4: Typecheck**

```bash
npx tsc --noEmit
```

One pre-existing failure is expected: TS2802 in `client/src/components/FeaturesSection.tsx:61`. Any *other* error is yours — fix it.

- [ ] **Step 5: Full build**

```bash
npm run build
```

- [ ] **Step 6: Verify the prerender did not silently break**

`scripts/prerender.mjs` catches all errors and exits 0 by design, so a green build can hide a broken prerender. Open `dist/public/dsp-rota-management/index.html` and confirm the `<title>` and `<link rel="canonical">` are page-specific, not the homepage's.

- [ ] **Step 7: Update the docs**

`STATUS.md` — what shipped, the new env var, the two decisions still outstanding.
`CLAUDE.md` — a Lessons Learned entry covering the chat tables, the link-token pattern, and the rate limiters.

- [ ] **Step 8: Commit the build and docs**

```bash
git add dist/public STATUS.md CLAUDE.md
git commit -m "chore(build): rebuild dist for live chat takeover"
```

- [ ] **Step 9: Stop before deploying.** `CHAT_LINK_SECRET` must be set on the Railway `dop-landing-page` service first, and the privacy policy question about transcript retention is still open. Hand back to Rashid rather than shipping.

---

## Deferred

**Phase 3 — abandonment safety net.** The timeout sweep, the "nobody was free" system message, and the follow-up email to the visitor are not built here. The email half sends mail to members of the public and needs Rashid's explicit sign-off plus a monitored from-address.

**Privacy.** Storing transcripts is new processing of personal data. `/privacy` does not mention chat transcripts and no retention period has been set. Both must be resolved before this reaches production.
