# Live Chat Takeover — Human Handover for the Site Chatbot

**Date:** 2026-08-22
**Status:** Awaiting review

---

## Overview

Today the site chatbot is a closed loop: a visitor talks to Claude Haiku, the transcript
lives only in that visitor's browser, and Rashid finds out what was said from a
notification email after the fact. There is no way to join a conversation, and no way to
re-open one.

This adds a human takeover path. The bot escalates when it sees a buying signal, Rashid
gets a one-click link, and he can step in and talk to the visitor directly — with the AI
drafting his replies for him and polishing them on demand.

Three things follow from that and are treated as part of this work, not extras:

1. **Conversations must be stored.** Nothing else here is possible while a transcript
   exists only in browser memory.
2. **The email link needs its own signing key.** The existing admin token lives in an
   in-memory `Set` (`server/routes/admin.ts`) and is destroyed on every server restart, so
   a link mailed out would frequently be dead before it was clicked.
3. **`/api/chat` needs rate limiting.** It is public, unauthenticated, uncapped, and now
   costs money per call — already flagged in STATUS.md. Persisting every message to
   Postgres makes an abusive caller more expensive, not less.

---

## The flow

### What the visitor sees

1. Opens the widget, gives name + email (unchanged from today).
2. Chats to the bot normally.
3. The bot detects a buying signal — or they ask for a person, or press **Talk to a
   person** — and the widget shows a system line:
   > *A member of the team has been notified — they'll be with you shortly.*
   **The bot keeps answering during this window.** It does not go silent waiting.
4. When Rashid joins, a second system line appears:
   > *Rashid has joined the chat.*
   From here every reply is a human one; the bot is silent.
5. If nobody joins in time, or the visitor leaves:
   > *Nobody was free to join just now — we'll email you at <their address> shortly.*

### What Rashid sees

1. Email arrives the moment a chat escalates: visitor name, email, what they asked, and a
   **Open this chat** link.
2. Tapping it opens `/admin/chat/:id` — the transcript, live.
3. Pressing **Join** stops the bot and announces him to the visitor.
4. The compose box is **already filled in** with an AI-drafted reply to the visitor's last
   message. Send it as-is, or edit it.
5. **Refine** rewrites whatever is currently in the box in his voice — the button works on
   the AI's draft and on anything he typed himself.
6. New visitor messages arrive within ~2 seconds, with a sound and a flashing tab title.

---

## Status machine

A conversation is always in exactly one state:

| Status | Bot answering? | Meaning |
|---|---|---|
| `bot` | yes | Normal automated conversation |
| `awaiting_human` | **yes** | Escalated, Rashid notified, still being helped by the bot |
| `human` | no | Rashid has joined and is replying personally |
| `closed` | no | Visitor left, Rashid closed it, or it timed out |

`awaiting_human → human` happens when Rashid presses Join.
`human → bot` is available via **Hand back to bot** if he wants to step out.
Closing the browser tab does **not** silently resume the bot mid-conversation — the
abandonment timer handles that case instead.

---

## Data model

Two new tables, created in `initDb()` in `server/db.ts` alongside `waitlist` and
`page_views`, following the same `CREATE TABLE IF NOT EXISTS` pattern (raw `pg`, no ORM).

```sql
CREATE TABLE IF NOT EXISTS chat_conversations (
  id                      BIGSERIAL PRIMARY KEY,
  public_id               VARCHAR(32) UNIQUE NOT NULL,   -- nanoid; used in URLs and by the widget
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
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id              BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role            VARCHAR(16) NOT NULL,   -- visitor | bot | admin | system
  content         TEXT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_conv
  ON chat_messages (conversation_id, id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_status
  ON chat_conversations (status, updated_at DESC);
```

**`public_id` vs `id`.** The numeric `id` never leaves the server. URLs and the widget use
the unguessable nanoid, so a visitor cannot walk the ID space and read other people's
conversations.

**`chat_messages.id` is the polling cursor.** Clients poll with `?since=<id>` and receive
everything above it. Known simplification: under heavy concurrent inserts a `BIGSERIAL` can
commit out of order and a poller could skip a row. With two participants per conversation
this cannot realistically occur; if the assumption ever breaks, switch the cursor to a
per-conversation sequence column.

**Lead capture is unchanged.** `chat_conversations` records who is talking; the `waitlist`
upsert added on 2026-08-22 (commit `927172d`) still runs, so chat leads keep appearing in
the admin lead list exactly as they do now.

---

## Transport: polling

Both sides poll `GET .../messages?since=<id>` every **2 seconds** while a conversation is
`awaiting_human` or `human`. In plain `bot` mode the visitor does not poll at all — the
bot's reply comes back in the response to their own POST.

Chosen over server-sent events because it survives Railway restarts with no reconnect
logic, holds no long-lived connections, and behaves correctly if the service is ever run
with more than one replica. At this volume a 2-second delay is not perceptible in a typed
conversation. Swapping in SSE later touches only the transport layer.

Polling stops when the tab is hidden (`document.visibilityState`) and resumes on focus, so
a forgotten tab does not poll all day.

---

## API surface

### Visitor (public, rate-limited)

| Endpoint | Purpose |
|---|---|
| `POST /api/chat/start` | `{name, email}` → creates the conversation, upserts the waitlist lead, returns `{conversationId, greeting}` |
| `POST /api/chat/:publicId/message` | Stores the visitor message. If status is `bot` or `awaiting_human`, generates and stores a bot reply and returns it |
| `GET /api/chat/:publicId/messages?since=` | Poll for new messages + current status |
| `POST /api/chat/:publicId/request-human` | The **Talk to a person** button |
| `POST /api/chat/:publicId/close` | Visitor closed the widget |

The existing `POST /api/chat` and `POST /api/chat/lead` are kept as thin shims for one
release so that a visitor holding a stale cached bundle does not hit a dead endpoint.

### Operator

Authenticated by **either** the existing admin bearer token **or** a signed link token.

| Endpoint | Purpose |
|---|---|
| `GET /api/admin/chats` | Live and recent conversations, newest first |
| `GET /api/admin/chats/:publicId` | Transcript, status, visitor details |
| `GET /api/admin/chats/:publicId/messages?since=` | Poll |
| `POST /api/admin/chats/:publicId/join` | Status → `human`, posts the "Rashid has joined" system message |
| `POST /api/admin/chats/:publicId/message` | Send a reply |
| `POST /api/admin/chats/:publicId/suggest` | Returns an AI-drafted reply (never sends) |
| `POST /api/admin/chats/:publicId/refine` | `{draft}` → polished version (never sends) |
| `POST /api/admin/chats/:publicId/handback` | Status → `bot` |
| `POST /api/admin/chats/:publicId/close` | Status → `closed` |

---

## Escalation detection

Three independent triggers, because each one alone has a blind spot.

1. **Model judgement.** The existing Haiku call gains a forced tool call returning
   `{reply, escalate, reason}` instead of plain text. Same call, same cost — the model is
   already reading the message. A tool definition is used rather than "reply in JSON"
   because forced tool use is reliable where free-form JSON is not.
2. **Hard phrase list.** "speak to someone", "talk to a human", "call me", "is anyone
   there", "real person" and similar always escalate, whatever the model returned.
3. **The visitor's own button.** A **Talk to a person** control in the widget.

Escalation is idempotent — once a conversation is `awaiting_human` or beyond, further
triggers do not re-notify.

---

## The email link

```
https://dspops.app/admin/chat/<publicId>?k=<token>
```

`token` = `<expiry>.<HMAC-SHA256(publicId + "." + expiry, CHAT_LINK_SECRET)>`, base64url
encoded, verified with `timingSafeEqual`.

- **Stateless** — unlike the current in-memory admin token, it survives server restarts.
- **Scoped to one conversation.** If the email is forwarded or leaked, the holder can read
  and reply to that single chat. It grants nothing else — not the lead list, not traffic
  stats, not other conversations.
- **Expires after 24 hours.** Expired or invalid tokens fall through to the normal admin
  password screen, after which the page loads via the standard bearer token.
- Requires a new `CHAT_LINK_SECRET` env var in `.env` and on the Railway
  `dop-landing-page` service. Generated once, never committed.
- The `k` query parameter must be stripped from any request logging.

**Accepted trade-off:** this is a credential in a URL, which can leak via referrer headers
or shared screenshots. It is accepted because the blast radius is one conversation for 24
hours, and because the alternative — typing an admin password on a phone before answering
a waiting prospect — is the reason one-click links exist.

---

## Admin quick-reply screen

New page `client/src/pages/AdminChat.tsx`, lazy-loaded route `/admin/chat/:publicId` in
`App.tsx`, `noindex` via `usePageMeta`, added to `PUBLIC_ROUTE_PATTERNS` in
`server/index.ts` but **not** to `sitemap.xml` and **not** to the prerender `ROUTES` list.

Genuinely responsive, per the answer to the device question:

- **Mobile:** single column. Transcript scrolls; the compose box, suggested-reply chip and
  **Refine** button are pinned above the keyboard. Large tap targets. Visitor details
  collapse into a header you can expand.
- **Desktop:** two columns — transcript left, visitor details and status right. `Enter`
  sends, `Shift+Enter` newlines, `Cmd/Ctrl+K` refines.

Other behaviour:

- Status chip reading *Bot is handling this* / *Waiting for you* / *You are live*.
- New visitor message → short sound + `document.title` flash. On-page only; no per-message
  emails.
- The compose box shows an **AI draft** tag while it holds untouched generated text; the
  tag clears the moment he types.
- **Refine** keeps one level of undo so a rewrite he dislikes can be reverted.
- A **Live chats** panel is added to the existing `Admin.tsx` so conversations can be
  opened without an email.

---

## AI drafting and Refine

Both live in a new `server/lib/chatAi.ts` alongside the shared system prompt, so
`server/routes/chat.ts` stops being the only place that knows how to talk to Anthropic.

**Suggested reply** is generated when the operator opens the page and after each new
visitor message. It receives the transcript (capped at the last 30 messages) and the
existing DSPOps product/pricing prompt, but is instructed to write **as Rashid** — first
person, short, UK English, no invented pricing. It is only ever pre-filled, never sent.

**Refine** takes the current box contents plus conversation context and returns a polished
version. It must preserve his meaning and any facts or figures he typed, fix tone and
grammar, keep it short, and never introduce a claim he did not make — particularly a price.

Both use `claude-haiku-4-5-20251001`, consistent with the existing widget.

---

## Abandonment

Evaluated lazily on each poll and message, plus a light in-process sweep every 60 seconds.

If a conversation sits in `awaiting_human` for longer than `CHAT_HANDOVER_TIMEOUT_MINUTES`
(default 10), or the visitor closes the widget while escalated:

1. A system message is posted to the visitor promising an email follow-up.
2. Rashid receives the full transcript plus a link, so it becomes a lead to chase.
3. **(Phase 3)** The visitor receives a confirmation email.

Step 3 requires `sendEmail` in `server/email.ts` to accept a `to` address — today it always
sends to `NOTIFY_EMAIL`. **This is the one part of this design that sends mail to a member
of the public rather than to Rashid**, so it needs explicit sign-off before it is built,
and the `from`/`reply-to` should be a monitored address rather than
`notifications@dspops.app`.

The 60-second sweep assumes a single Railway instance. With multiple replicas each would
run its own sweep; the timeout check must therefore be written to be idempotent (guarded by
a status transition), so a double-fire cannot double-send.

---

## Rate limiting and abuse

- `express-rate-limit` on `/api/chat/*`: 5 conversation starts per hour per IP, 30 messages
  per 10 minutes per conversation. **This is a new dependency** — the repo does not have it
  today. It also needs `app.set("trust proxy", 1)` so the limiter sees the visitor's real
  IP through Railway's proxy rather than rate-limiting every visitor as one shared address.
- Message content capped at 2,000 characters; conversations capped at 100 messages.
- Model context capped at the last 30 messages regardless of transcript length.
- An explicit body-size limit on `express.json()`.

This closes the gap recorded in STATUS.md: `/api/chat` is public, uncapped, and billable.

---

## Files touched

| File | Change |
|---|---|
| `server/db.ts` | Two new tables and indexes in `initDb()` |
| `server/routes/chat.ts` | Restructured around persisted conversations; lead upsert retained |
| `server/routes/adminChat.ts` | **New** — operator endpoints |
| `server/lib/chatAi.ts` | **New** — shared prompt, bot reply, suggest, refine |
| `server/lib/chatLinks.ts` | **New** — sign and verify link tokens |
| `server/email.ts` | Optional `to` parameter (Phase 3) |
| `server/index.ts` | Mount router, rate limiter, add route pattern |
| `client/src/components/ChatbotWidget.tsx` | Conversation ID, polling, status banner, Talk to a person |
| `client/src/pages/AdminChat.tsx` | **New** |
| `client/src/pages/Admin.tsx` | Live chats panel |
| `client/src/App.tsx` | New lazy route |

**Deploy note.** This touches client files, so shipping it requires a full local
`npm run build` and a commit of `dist/public` — not just `build:server`. Skipping that
serves stale HTML for every changed route.

---

## Testing

No test framework exists in this repo, so verification is scripted and manual, matching how
the lead-capture fix was proven:

1. **Two browsers.** Visitor in a normal window, operator in incognito. Confirm escalation
   fires, the emailed link opens the right chat, Join silences the bot, and messages cross
   in both directions within ~2 seconds.
2. **Database assertions** via a throwaway `pg` script: conversation status transitions,
   message rows and roles, waitlist lead still created.
3. **Link token:** valid token opens; tampered token rejected; expired token falls back to
   the password screen; a token for conversation A cannot open conversation B.
4. **Bot silence:** while `human`, a visitor message produces no bot reply and no Anthropic
   call.
5. **Abandonment:** with the timeout set to 1 minute, confirm the system message and the
   transcript email.
6. **Rate limits:** confirm the caps reject rather than hang.
7. **Responsive:** the operator screen driven at 375px and 1280px.

---

## Phasing

Each phase is independently shippable.

- **Phase 1 — Handover.** Tables, conversation lifecycle, escalation, email link, operator
  screen, two-way polling, bot pause, rate limiting. This alone delivers live chat.
- **Phase 2 — Assist.** Suggested replies and Refine.
- **Phase 3 — Safety net.** Abandonment timer and the follow-up email to the visitor
  (pending the sign-off noted above).

---

## Out of scope

- More than one operator, and any concept of assignment between them.
- Typing indicators, read receipts, file sharing.
- Continuing a conversation by email reply after the visitor has gone.
- Searching chat history.

## Open items

- **Retention and privacy.** Storing transcripts is new processing of personal data —
  names, email addresses, and whatever a visitor types. DSPOps is ICO-registered
  (ZC124917) and has a privacy policy at `/privacy`, which currently does not mention chat
  transcripts. A retention period must be chosen and the policy updated before this ships.
- **Phase 3 sign-off** on sending email to visitors, and which address it comes from.

## Risks

| Risk | Mitigation |
|---|---|
| ~2s latency feels slow in practice | Transport is isolated; SSE is a contained swap |
| Single-instance assumptions (sweep, no pub/sub) | Documented; timeout transitions written to be idempotent |
| Link token leaks via referrer or screenshot | Single-conversation scope, 24h expiry, no wider admin access |
| AI draft states something untrue | Never auto-sent; a human reads every message before it goes |
| Added Anthropic spend from suggest/refine | Haiku, capped context, and only on operator interaction |
