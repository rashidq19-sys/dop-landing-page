# Plan — Automatic welcome email to website signups

**Status:** approved by Rashid, not yet built.
**Repo:** `F:\Github-DOP\dop-marketing-landing-page` (the marketing site — NOT dop-app).
**Start the next conversation in that repo.**

---

## The problem

The signup form on dspops.app is a two-step waitlist:

- **Step 1** — `POST /api/waitlist` captures the email (and sometimes a DSP name).
- **Step 2** — `PATCH /api/waitlist/:id` captures name / DSP name / phone.

Both steps email **Rashid**. The visitor receives **nothing, ever**.

Plenty of people never reach step 2 — they close the tab after step 1 — and everyone who
signs up from the Pricing section only ever hits step 1, because that entry point has no
step 2 at all. Those leads sit in the table as a bare email address with no follow-up.

## What we're building

The visitor gets an email of their own, in the DSPOps house style, with different wording
depending on whether we got their phone number.

| Situation | What they get |
|---|---|
| They complete step 2 (phone given) | Immediately — a welcome saying someone will be in touch shortly, plus the questions below. |
| Email only, still no phone after **5 minutes** | A welcome saying we'd like to speak to them, asking them to **reply to the email with their phone number**, plus the questions below. |
| They complete step 2 *after* the nudge went out | They still get the "got your number, you'll hear from us" confirmation. Not a contradiction, and never a repeat of the same email. |

### Decisions Rashid already made — do not re-ask

1. **Wait 5 minutes** before the no-phone nudge.
2. **Reply-to-the-email** is how they hand over the number. No resume link, no token, no new page.
3. **The questions to ask:** which station(s) they operate out of, and how many drivers they run.

### One open point — confirm before writing the copy

Rashid originally asked for a third question, *"which programme — 1.0 or 2.0?"*. It was
written up as *"Do your drivers use your own fleet of vans, or their own vehicles?"* and he
rejected that wording outright.

**Ask him, in one line, before writing the email body:** does he want the question asked in
his own words (*"Which programme are you on — 1.0 or 2.0?"*), or dropped entirely?
Do not invent a third phrasing. Build everything else while waiting for the answer — only
the body copy depends on it.

---

## Build steps

### 1. Two markers on the `waitlist` table

In `server/db.ts` → `initDb()`, following the existing `ALTER TABLE ... ADD COLUMN IF NOT
EXISTS` idiom already used there for `source` and `dsp_name`:

```
welcome_email_sent_at  TIMESTAMPTZ
phone_nudge_sent_at    TIMESTAMPTZ
```

Two separate columns, not one. They mean different things and a record can legitimately
get both: nudged at 5 minutes, then confirmed when they finally fill the form in.

**Verify:** restart the server, confirm both columns exist and a second restart is a no-op.

### 2. The DSPOps email shell — new file `server/emailShell.ts`

The two repos cannot share code, so this is a deliberate copy. The source of truth is
`F:\Github-DOP\dop-app\server\services\agreementEmails.ts` — function
`buildAgreementEmailHtml` at line 56. **Put a comment at the top of the new file naming
that path**, so a future theme change is findable from either side.

Keep exactly: `BRAND_BLUE = "#2f6feb"`, `INK = "#111827"`, the `DSP`/`Ops` wordmark, the
blue banner strip, the blue CTA button style, the "Best regards, / Rashid / Director,
Layerform System Ltd" sign-off, and the footer with dspops.app + support@dspops.app.

Bring `escapeHtml` and `paragraphsToHtml` across too — the body is built from plain
paragraphs and the visitor's own name goes into it, so nothing may go in unescaped.

**One deliberate change:** the app's footer reads *"This email contains important
information about your DSPOps subscription."* A waitlist visitor has no subscription.
Replace that line for these emails — something like *"You're receiving this because you
signed up for DSPOps at dspops.app."*

**Verify:** render both variants to `.html` files, open them in the browser pane, screenshot
both. Do this **before** any real send — if the theme is off you'll see it without burning
a send.

### 3. A visitor-facing send function

`server/email.ts` currently exports one function, `sendEmail(subject, body)`, whose entire
contract is "plain-text notify Rashid". It has **seven call sites** — five in
`server/routes/chat.ts`, two in `server/routes/waitlist.ts`.

**Do not widen it.** Add a second export alongside it:

```ts
sendVisitorEmail({ to, subject, html, replyTo })
```

Keeping them separate means a bug in the new path can never misroute an internal
notification, and vice versa.

- **From:** `DSPOps <notifications@dspops.app>` — the only sender address proven to work on
  this Resend account (the existing log line proves it). Do **not** assume
  `support@dspops.app` is verified here; that address comes from dop-app's mailer, which is
  a completely different sending path.
- **Reply-to:** `rashid@dspops.app`, overridable via env. This matters — the whole no-phone
  variant depends on the reply landing somewhere Rashid reads.
- Same failure behaviour as the existing function: log the error, never throw, never block
  the HTTP response.

**Verify (blocking):** one real test send to Rashid's own address, confirming Resend accepts
the from/reply-to pair and that hitting Reply in Gmail addresses `rashid@dspops.app`.
**Do not ship until this send has actually landed.**

### 4. Send the welcome when they complete step 2

In the `PATCH /api/waitlist/:id` handler in `server/routes/waitlist.ts`, after the existing
update succeeds. Fire-and-forget with `.catch()`, matching the internal-notification call
already sitting right below it.

Claim the row before sending, never after:

```sql
UPDATE waitlist SET welcome_email_sent_at = now()
WHERE id = $1 AND welcome_email_sent_at IS NULL
RETURNING email, name, dsp_name
```

Send only if a row comes back. A double-submitted form then cannot produce two emails.

### 5. The 5-minute sweeper for the no-phone nudge

A `setInterval` in `server/index.ts`, running **every 2 minutes** (the interval has to be
well under the 5-minute threshold or the nudge drifts late).

```sql
SELECT id, email, name, dsp_name FROM waitlist
WHERE phone IS NULL
  AND phone_nudge_sent_at IS NULL
  AND welcome_email_sent_at IS NULL
  AND created_at < now() - interval '5 minutes'
```

Then claim each row the same way before sending:

```sql
UPDATE waitlist SET phone_nudge_sent_at = now()
WHERE id = $1 AND phone_nudge_sent_at IS NULL AND phone IS NULL
RETURNING email, name, dsp_name
```

Re-checking `phone IS NULL` inside the claim is what stops the sweeper racing a PATCH that
lands at minute 4:59. Wrap each row's send in try/catch so one bad address doesn't kill the
loop for everyone behind it.

Because the state lives in the database rather than in a `setTimeout`, this self-heals
across Railway redeploys — a process restart mid-wait loses nothing.

### 6. Greeting fallback

`name` is only captured by one of the entry points (`EmailCaptureInline`); `CTASection`
captures `dsp_name` instead and never asks for a person's name. So the greeting must degrade
cleanly: first name if we have one, otherwise `Hi there,`. Never print an empty name, and
never put the DSP name where a person's name belongs.

---

## Known limitation to state plainly, not fix

`POST /api/waitlist` does `ON CONFLICT (email) DO UPDATE`, so a repeat signup lands on the
**same row**. Since the markers live on that row, somebody signing up again months later
will not get a second email. That is the correct behaviour for the duplicate-send problem
and the wrong behaviour for a genuine returning lead. Leave it as is for v1 and tell Rashid
it works this way.

---

## Verification and shipping

An email can't be browser-verified the usual way, so the proof is:

1. `npm run check` (`tsc --noEmit`) — this repo is a **clean** typecheck gate, unlike dop-app
   which carries ~150 pre-existing errors. It must pass.
2. Both variants rendered to HTML, opened in the browser pane, **screenshotted for Rashid**.
3. The real test send from step 3, landed and replied to.
4. Locally: create a waitlist row, watch the sweeper fire once; complete a step 2, watch the
   welcome fire once.

Then commit **in the marketing repo** and say so explicitly — this is a different Railway
service from the app, so the `/ship` skill's usual assumptions about dop-app do not apply.
Deploy the marketing service and confirm the live site is serving the new build before
reporting done.
