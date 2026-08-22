# STATUS — dop-marketing-landing-page

> Session handoff file. Read at session start (with DECISIONS.md); update at session end. The rule lives in global CLAUDE.md → Memory System.

**Last updated:** 2026-08-22 (chatbot leads now saved to the database)

## Where things stand
- main @ 927172d, clean tree, **pushed and verified live** (2026-08-22). Railway deploy `a13d1139` SUCCESS at 12:41 UK.
- `[CRITICAL]` **Chatbot leads were never written to the database.** The widget gates the chat behind a name + email form, but `POST /api/chat/lead` only fired a notification email and returned `ok` — no `pool.query` anywhere in the handler. Every visitor's name existed solely in that email and in their own `localStorage`; the `waitlist` table had zero rows with a name and zero sourced from the chatbot. The handler now upserts into `waitlist` with `source = 'Chatbot'`: email lowercased (the column is UNIQUE, so mixed case would have split one person across two rows), `ON CONFLICT` fills the name and leaves `source` alone so first-touch attribution survives, name truncated to the column's 255 chars, and the notification email is sent whether or not the insert succeeded — carrying a warning when it did not, since it is then the only copy of the lead. Verified live in production: a real submission through the widget at 12:42 landed as row 22 with its name intact.
- Note this was the *second* half of a broken chatbot. The first (missing `ANTHROPIC_API_KEY`, below) killed the bot's replies; this one silently dropped the leads. Both are now fixed.
- **Pricing copy now matches the product.** Enterprise is billed per active driver at a per-client rate, floor `max(committed, 100)` (`ENTERPRISE_MIN_DRIVERS` in the dop-app repo's `shared/subscription-logic.ts`). Five surfaces carried the old flat-fee promise and were corrected: `PricingSection.tsx` (headline, subhead, Enterprise card), `WhatYouGetSection.tsx`, `shared/faqs.ts` (which also feeds the FAQPage JSON-LD), and the sales bot's prompt in `server/routes/chat.ts`. Starter/Professional are unchanged — still flat, no per-driver charge.
- `[CRITICAL]` **The site chatbot had never worked in production** — `ANTHROPIC_API_KEY` was missing from the Railway `dop-landing-page` service, so every visitor question returned a 500 ("Failed to get response from AI"). It worked locally because the key is in `.env`, which is why it looked healthy. Key added to Railway 2026-08-22; verified live answering correctly. If the bot dies again, check that variable first.
- No per-driver rate is published anywhere; Enterprise reads "rate agreed with you" and the bot is instructed never to quote a figure.
- Previous session: main @ cde19b2, **pushed and deployed** (2026-07-30). This push also carried `a5b7b1d` and `bccd484` — two docs commits stranded locally since the 2026-07-05 session — so origin and local are finally in sync.
- ICO registration is now live on the site: Layerform System Limited (company no. 16171454) trading as DSPOps, reference **ZC124917**. See DECISIONS.md #11 for what was wrong and what was deliberately left off. **Renewal due 14 April 2027.**
- `[IMPORTANT]` No copy anywhere should say "DSPOps Ltd" — that company does not exist at Companies House. Use "Layerform System Limited (trading as DSPOps)".
- main was rebased onto origin at session start; origin had advanced by three blog posts (f4bd468 and earlier) plus three new `seo-report/*` branches from scheduled runs.
- Search Console: domain verified, sitemap submitted, homepage indexed; remaining URLs queued (manual checklist: SEO_GOOGLE_SUBMISSION_CHECKLIST.md). Indexing latency is normal — a monthly scheduled SEO report now delivers ranking movement instead of manual googling.

## Work NOT on main
- `redesign/linear` — unmerged redesign experiment from 2026-06-23. Decide: merge, cherry-pick the good parts, or delete.

## Parallel writers (why your checkout goes stale)
- A weekly scheduled blog agent commits straight to main (Railway auto-deploys it); other AI tools have pushed here before.
- Rule: `git fetch` + `git pull --rebase origin main` at session start and before every push (see CLAUDE.md → Parallel Writers).
- Origin has branches `seo-report/2026-06-29`, `2026-07-13`, `2026-07-20`, `2026-07-27` created by scheduled runs — review their contents, then merge or delete.

## Open loose ends
- `[IMPORTANT]` **One chat lead from before the fix is unrecoverable from here.** A visitor gave their name and email while the bug was live; that data only exists in a "New lead started chatting on DSPOps" email in the `rashid@dspops.app` inbox, which is neither of the mailboxes connected to Claude (searched both `rashidq19@googlemail.com` and the Yahoo account — nothing from `notifications@dspops.app`). Paste the name and email into a session and it can be inserted with `source = 'Chatbot'`.
- `ChatbotWidget.tsx` writes the lead to `localStorage` *before* the `POST /api/chat/lead` resolves and ignores the result (`.catch(() => {})`). If that request fails, the visitor is never asked again and the lead is lost to the database — the notification email remains the only copy. Worth `keepalive: true` plus a single retry. Deliberately not done in the fix above to keep it server-side only (no `dist/public` rebuild needed).
- Reddit marketing posts drafted 2026-06-18 were never posted (Reddit hard-blocked the browser tool) — post manually or drop the idea.
- Deploy rule reminder: UI changes need a local `npm run build` + commit of `dist/public`, or Railway serves stale HTML.
- LinkedIn company page is `linkedin.com/company/dspopsltd` and presumably still says "DSPOps Ltd" — inconsistent with the entity naming now on the site. Decide whether to update it.
- `[IMPORTANT]` **`/api/chat` has no rate limiting and no cap on the incoming `messages` array.** It is public and now costs money on every call. Model is Haiku with `max_tokens: 300` so replies are cheap, but input is unbounded and nothing throttles a caller. Worth an express-rate-limit + a hard cap on message count/length.
- `CostCalculatorSection.tsx` (`getTier`, lines 3-5) caps at 100 drivers and falls through to "Contact sales" above that. Consistent only while no Enterprise rate is published — if a public "from £X per driver" figure is ever added, this must compute it.
- The Frontend lesson in CLAUDE.md claiming the 7 homepage FAQs are duplicated as JSON-LD in `client/index.html` is **stale** — `Home.tsx` derives them from `shared/faqs.ts` via `faqJsonLd(faqs)`. One file, not two.
- Pre-existing typecheck failure: `npm run check` reports TS2802 in `client/src/components/FeaturesSection.tsx:61` (`Set` iteration needs a higher `target`). Unrelated to any current work; the Vite build is unaffected. Worth fixing, one line in tsconfig.
