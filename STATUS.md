# STATUS — dop-marketing-landing-page

> Session handoff file. Read at session start (with DECISIONS.md); update at session end. The rule lives in global CLAUDE.md → Memory System.

**Last updated:** 2026-08-30 (waitlist welcome-email plan written and approved — not built yet)

## 2026-08-30 — Waitlist welcome emails: PLANNED, nothing built

Rashid asked for an automatic welcome email to website signups, with different wording
depending on whether the visitor left a phone number. **The plan is written and approved;
no code was written.** It lives in `WAITLIST-WELCOME-EMAIL-PLAN.md` in this repo — start
there, it is self-contained.

- **The gap it fixes:** the waitlist is two-step (`POST /api/waitlist` = email,
  `PATCH /api/waitlist/:id` = name/DSP/phone). Both steps email **Rashid**. The visitor gets
  **nothing, ever**. Anyone who drops off after step 1 — and everyone from the Pricing
  section, which has no step 2 at all — is a bare email address with no follow-up.
- **Rashid's answers, already decided:** wait **5 minutes** before the no-phone nudge; they
  hand over the number by **replying to the email** (no resume link, no token, no new page);
  ask which station(s) and how many drivers.
- `[IMPORTANT]` **One open question blocks the email copy only.** He originally wanted a
  third question, "which programme — 1.0 or 2.0?", then rejected the plain-English rendering
  of it ("do your drivers use your vans or their own?"). Ask him whether to use his own
  wording or drop it. **Do not invent a third phrasing.** Everything else can be built while
  waiting.
- **Two traps recorded in the plan:** `sendEmail()` in `server/email.ts` has seven call sites
  and means "notify Rashid" — add a separate `sendVisitorEmail`, do not widen it. And
  `notifications@dspops.app` is the only sender proven to work on this Resend account;
  `support@dspops.app` comes from dop-app's mailer, a different path entirely.

### Open / next
- [ ] Build the plan. Nothing is started — no columns, no shell file, no sweeper.
- [ ] The DSPOps email shell has to be **copied** from
      `F:\Github-DOP\dop-app\server\services\agreementEmails.ts` (`buildAgreementEmailHtml`,
      line 56) because the repos cannot share code. Leave a comment naming that path or the
      next theme change will silently diverge between the two.

## 2026-08-27 — Sales brochures, micromobility badge, dead analytics tag removed (all live)

- **Two brochures live and verified**: `/sbl.html` (written for SBL Couriers) and `/brochure.html`
  (generic, for approaching any DSP). Self-contained single files, `noindex` + disallowed in
  robots.txt. Source and build script now in `brochures/` — see its README.
- `[CRITICAL]` **Caught the committed-`dist` trap the hard way**: the first brochure commit put the
  file only in `client/public` and it 404'd in production. Railway runs only `build:server` here.
  Written up in CLAUDE.md; the brochure build script now writes both locations.
- **Micromobility is presented as shipped**, not coming soon: a green hero badge on the homepage and
  both brochures. The live check-in map and arrival ETA are deliberately kept as "in development"
  because they are genuinely not built — do not let those get folded into the "added" claim.
- **Removed a dead Umami tag** that 502'd on every homepage visit and had never collected anything
  (see CLAUDE.md). First-party analytics at `/admin` is the real source and is unaffected.
- **Enterprise pricing is now public on the brochures**: £2.75 per driver per month. Note it reads
  as dearer per head than Professional (£249 / 100 drivers = £2.49); justified on multi-station and
  white-glove setup, but expect the question.
- **Contact is WhatsApp-first** on both brochures, pointing at Rashid's work number. The number is
  deliberately **not printed** on the page — buttons only. His personal number appears nowhere; that
  was checked explicitly.

### Open / next
- [ ] **Brochure opens are not tracked.** Rashid asked twice how to tell whether a prospect opened
      the link. The first-party beacon is in the React app, so the standalone brochures are not
      counted. Agreed approach when he wants it: add the `/api/track` beacon to both pages plus a
      per-recipient `?ref=` tag (e.g. `?ref=redline`), and one line in the privacy policy. He was
      told plainly that covert IP/location tracking of a named prospect is not something to build.
- [ ] Aurora demo data was reshaped for the screenshots (check-in times, a 2.4 mi distance flag,
      3 stations, multi-station enabled). Fine to leave, but it is not pristine demo state.

## 2026-08-24 — Homepage redesign, SHIPPED and verified live (`f2a42a7`)
- **Live and confirmed**: dspops.app serves `assets/index-MUZIoH0p.js`, the new copy is in the prerendered HTML, and every new image returns 200. Verified against production, not just a green Railway chip.
- **What changed**: the homepage was rebuilt around real product screenshots, following the structure of the SBL proposal at `/sbl.html`. Removed: `ReplacesSection` (the scroll-driven artefact animation), `FeaturesSection` (nine modules behind a wheel-jacking tab carousel — it intercepted the page scroll and hid eight of the nine), and `WhatYouGetSection` (folded into the tiles and pricing). The new sections live in `client/src/components/home/`.
- `[IMPORTANT]` **Brand colours are now sampled from `client/public/logo.png`**, not chosen: blue `#1879f1`, navy `#121835`. The site had been running `oklch(0.55 0.2 255)`, visibly more indigo than the logo sitting beside it. Small text on white must use `--color-brand-dark`; the logo blue alone measures 4.2:1 against white and misses the 4.5:1 floor.
- `[IMPORTANT]` **The header and footer logo was broken on production** — it loaded from a CloudFront URL that now returns 403. It is now `/images/logo-mark.png`, served from `client/public/`.
- **Three places still claimed "no app store, no download"**, which stopped being true when the app shipped to the App Store and Google Play. Corrected in `shared/faqs.ts`, `SEOOverviewSection`, `DspRotaManagement` and `VanInspectionApp`.
- **Still to do — the six SEO feature pages.** They inherit the new tokens, the rewritten `CTASection` and the corrected copy, so they are consistent and not broken, but their *layouts* have not been reworked to match the homepage. That was the agreed scope and is the natural next commit. Their titles, descriptions, canonicals and H1s must survive any restyle untouched.
- Screenshots come from the **Aurora Logistics demo client** (fabricated drivers). The imported-roster screen was deliberately dropped: it shows driver email addresses and phone numbers, and unlike `/sbl.html` this page is indexed.
- `CostCalculatorSection.tsx` and `Lightbox.tsx` are both dead code now — the latter became orphaned when the rebuilt hero dropped the "Watch 2-min tour" button that `8a862d9` had already hidden. Left in place, flagged only.

### Same day — logo, brand colours and the cache trap (`4462c03`, `e854206`, `91ab28a`)
- **Confirmed correct by Rashid on the live site**: logo and icon both right.
- The lockup that shipped with the redesign was an **older** logo already in the repo. Current artwork now lives in `brand-drop/` (git-ignored) and is installed as `client/public/logo.png` (light bg), `images/logo-on-dark.png` (dark bg), `images/logo-mark.png`, plus a regenerated `og-image.png`.
- `[CRITICAL]` **The replacement did not reach anyone until the cache rule was fixed.** `express.static` marked every stable-named asset `immutable` for a year. See the Frontend lesson in CLAUDE.md — the header rule is now scoped to `/assets/`, and brand images carry `?v=N` via `client/src/lib/brandAssets.ts`. **Bump `BRAND_ASSET_VERSION` on every artwork swap.**
- Brand tokens re-sampled from the real artwork: brand `#006ae1`, brand-light `#3189fe`, deep `#0a1235`. The earlier `#1879f1` / `#121835` came from the old file.
- **`dop-app` needed almost nothing** — all icons (web, iOS, Android) were already current, and every server-rendered logo is the client's own uploaded branding. Only `manifest.json` (off-brand purple → brand navy) and a dark-background lockup were added, in `4fdb7363`.

## Where things stand
- `[IMPORTANT]` **Sign-in modal now survives the keyboard too** (`56aceef`). Auditing the rest of the site's inputs after the chat fix turned up the same defect in `SignInModal`: a fixed, centred overlay sized to the layout viewport. Measured at 375x812 with a 332px keyboard, both fields stayed reachable but the "Sign in" button sat at 486-533px, below the 480px visible line — you could fill the form in and have nothing to press. It now pins to the visual viewport on phones (button lands at 367px). Two details worth keeping: the card uses `m-auto` rather than the parent's `items-center`, because a centred flex item inside `overflow-y-auto` has its top clipped and cannot be scrolled back to (verified by squeezing the visible area to 260px against a 317px card); and the close button gained padding, not a bigger icon, taking its tap area from 20px to 36px.
- `[IMPORTANT]` **The three viewport hooks now live in `client/src/hooks/useVisualViewportPanel.ts`** — `useIsPhoneViewport`, `useVisualViewportRect`, `useBodyScrollLock` — shared by `ChatbotWidget` and `SignInModal`. They were duplicated nowhere and must stay that way: the iOS/Android listener pairing is exactly the kind of "redundant" line that gets tidied out of one copy and not the other. **Any new fixed overlay containing an input needs these hooks**, or its submit button will sit behind the keyboard.
- **Full mobile input audit done (2026-08-22), all clear apart from the above.** All 10 fields across the site are 16px with 45-52px tap heights, no page scrolls sideways, and the four page-flow forms are `position: static` so the keyboard scrolls them into view normally. Remaining nits, none fixed: mobile menu button 38px and menu links 36px (under Apple's 44px guidance), footer links 17px with 11px gaps. **`CostCalculatorSection.tsx` is dead code — imported nowhere**; left in place, flagged only.
- `[CRITICAL]` **`f0821ca` (rebuilt `dist/public`) is committed locally and NOT PUSHED.** Everything else on main is pushed and live. Until it is pushed, production serves the old frontend bundle and the dashboard→chat fix below is not live. Push it, or rebuild if main has moved.
- `[IMPORTANT]` **Rashid could not join a chat from the admin dashboard — two independent causes, both fixed (`aa6e20b`).** He reported the lead email carrying only name + email, and the admin route showing *"Can't open this chat — this link has expired or isn't valid."*
  1. **The dashboard's chat links had never worked.** `Admin.tsx` links to `/admin/chat/<id>` with **no `?k=`**, and `AdminChat.tsx` read that token from the URL only — it never sent the admin session sitting in `sessionStorage`. `requireChatAccess` saw no bearer and an empty `k` and returned 401, and the error copy then told him to *"open the chat from the admin dashboard instead"* — the one route that could not work. All seven operator calls now go through an `authFetch` wrapper that attaches the bearer. **Route new calls through it too:** fixing only the load path renders the transcript and then 401s on Join/Send/Suggest, which reads as success. The 401 copy now separates a dead admin session (tokens are in-memory, so every deploy signs him out) from a stale email link.
  2. **The "New lead started chatting" email had no link at all.** `chatLinkUrl` was only called inside `escalate()`, so unless the bot chose to escalate there was no door into the conversation. The lead email now carries the same signed link, with the signing call wrapped exactly as `escalate()` wraps it — a missing `CHAT_LINK_SECRET` must degrade the email, not 500 `/api/chat/start` for every visitor. **This half is LIVE** (deploy `f0158793`, commit `42aad57`).
- `[IMPORTANT]` **The `?k=` email-link route was never broken** — it worked before this fix and still does. Only the dashboard route was dead, which is why escalation emails appeared to work while the dashboard did not.
- `[IMPORTANT]` **Building while another session is mid-flight will ship the wrong bundle.** This session built `dist` from a detached worktree at its own commit; main advanced twice during the build (a parallel session committed the mobile fix, then a STATUS doc commit), leaving that `dist` stale before it was even staged. Rebuild from the real `HEAD` and re-check what the bundle contains — `grep` the built asset for a marker of each fix that is supposed to be in it.
- `[IMPORTANT]` **Mobile chat/viewport fix is LIVE** (`2e82a3f`). Rashid reported the widget "floating up and down" while typing on an iPhone, with a photo showing the whole page zoomed in. Two independent causes, both fixed:
  1. **Every input on the site was 14px.** iOS Safari zooms the layout viewport whenever a focused control is under 16px, and once the layout viewport is zoomed, `position: fixed` elements drift instead of staying put. A single **unlayered** rule at the bottom of `client/src/index.css` sets all controls to 16px below 640px — unlayered deliberately, so it beats Tailwind v4's layered `text-sm` utility without `!important`. Desktop keeps 14px. This also fixed the email capture and demo forms, which zoomed identically.
  2. **iOS does not shrink the *layout* viewport when the keyboard opens** — it shrinks the *visual* viewport and scrolls the page underneath. The panel, anchored `bottom-20`, therefore sat behind the keyboard while Safari dragged the page about trying to reveal the composer. Below 640px the chat is now a full-height sheet pinned to `window.visualViewport` (`useVisualViewportSheet` in `ChatbotWidget.tsx`), with the page behind scroll-locked (`useBodyScrollLock` — `position: fixed` on body, exact scroll position restored on close), the floating button hidden behind the sheet, autofocus skipped on phones, and the thread re-anchored to the newest message on every sheet resize. **Desktop is unchanged** — verified 400×500, 80px above the bottom, 14px inputs, autofocus intact, no inline style applied.
- `[CRITICAL]` **`window.visualViewport` alone is not enough.** iOS reports the keyboard through `visualViewport.resize`; **Android Chrome resizes the layout viewport and only fires `window.resize`.** The hook listens to both. The first version listened only to `visualViewport` + `orientationchange` and the sheet stayed stuck at the pre-keyboard height — caught by testing, not by reading. Do not drop either listener.
- `[IMPORTANT]` **Testing note — the in-app browser tool lies about resize.** `resize_window` changes the viewport via CDP but **dispatches no resize events to the page** (measured: `window.resize` and `visualViewport.resize` both fired 0 times). The pane also frequently will not composite, so screenshots time out and anything using `behavior: "smooth"` silently no-ops (rAF is throttled while `document.visibilityState === "hidden"`). Fire `new Event('resize')` by hand and assert on measured geometry. **A "the handler never fired" result from that tool is a harness artifact until proven otherwise** — this cost a false bug report once already.
- `[IMPORTANT]` **Live chat takeover is LIVE on dspops.app.** Deploy `c4e8aa63` (`ac8e516`) SUCCESS, verified in production by signing a link locally and opening a real chat with it — which only works because Railway holds the same `CHAT_LINK_SECRET`, so the links in escalation emails genuinely work. Forged tokens and tokens for another conversation were both refused. Phases 1 and 2 of `docs/superpowers/specs/2026-08-22-live-chat-takeover-design.md`, executed via `docs/superpowers/plans/2026-08-22-live-chat-takeover.md`. A visitor chats to the bot; the bot escalates on a buying signal (its own judgement via a forced tool call, a hard phrase list, or the Talk to a person button), tells them a person has been notified, **and keeps answering**; Rashid gets an email with a one-click signed link; opening it and pressing Join silences the bot; he replies with an AI-drafted message he can edit or Refine. `dist/public` **has** been rebuilt and committed against this work — prerender spot-checked, titles and canonicals page-specific.
- **Both pre-ship gates are closed.** (1) `CHAT_LINK_SECRET` is set on the Railway `dop-landing-page` service (2026-08-22, via the Railway CLI so the value never entered a transcript). (2) ~~privacy policy~~ — DONE: `/privacy` now covers website chat in all four places (what is collected, how it is used, that Anthropic processes it, and a 90-day retention period from the last message). Phase 3 (abandonment timer + follow-up email **to the visitor**) was deliberately NOT built — it emails members of the public and needs Rashid's explicit sign-off plus a monitored from-address.
- New server modules: `lib/chatStore.ts` (all conversation SQL), `lib/chatLinks.ts` (HMAC links), `lib/chatAi.ts` (prompt + escalation + draft + refine), `lib/adminTokens.ts` (admin token store, moved out of `routes/admin.ts` so the chat routes can see it), `routes/adminChat.ts` (operator API). New page `client/src/pages/AdminChat.tsx` at `/admin/chat/:publicId` — private, `noindex`, deliberately absent from `sitemap.xml` and the prerender `ROUTES` list.
- `[CRITICAL]` **Two bugs found by testing, both fixed — do not reintroduce them.** (a) The message handler read the conversation once and reused that snapshot across the ~2s Anthropic call; pressing Join in that window made the bot reply anyway *and* dropped the status from `human` back to `awaiting_human`. Fixed with a re-read after the AI call plus `AND status = 'bot'` in the escalation UPDATE, so the guard is in SQL rather than JavaScript (`7b962d7`). (b) The AI draft returned empty whenever the transcript ended on a bot or admin turn — the normal case — because the API call was left on an assistant turn and the model tried to continue it instead of writing a new message. A closing user instruction now guarantees the call ends on a user turn.
- Rate limiting finally landed on `/api/chat` (5 starts/hour/IP, 30 messages/10min, 64kb bodies) with `trust proxy` set first, closing the gap this file has been flagging.
- This session added two small, unrelated fixes on top of that: the chatbot greeting no longer uses the lead's first word as a name (was showing "Hi Mr!" for a lead entered as "Mr R Qanooni" — commit `9f91a07`), and admin can now delete waitlist rows — auth-protected `DELETE /api/admin/waitlist/:id` + a per-row trash button with an email-confirm dialog, permanent delete not soft-hide (commit `e224f41`). Both verified end-to-end in a local dev browser: greeting text confirmed, delete tested against the live `1@1.com` junk row (confirmed gone via direct DB query), 404/400/401 all correct.
- `dist/public` is rebuilt and committed on every UI change this session; origin and local are in sync and everything below is live.
- Previous state (now superseded by the above): main @ 927172d, **pushed and verified live** (2026-08-22). Railway deploy `a13d1139` SUCCESS at 12:41 UK.
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
- `redesign/linear` — **deleted 2026-08-22** on Rashid's instruction. It was a single June commit (`08392ff`, ~700 lines) restyling the landing and download pages in a dark Linear aesthetic; a design direction he did not take, and it would have conflicted heavily with everything shipped since. Recoverable from reflog only, and not for long.
- `claude/dspops-landing-audit-b7df3c` — **deleted 2026-08-22** on Rashid's instruction, after he was shown what it contained. Worktree removed first. Tip was **`61165e821d1f4061f17f6e484fd12070da041571`** (parent `6ae1613`), 24 source files, ~1,300 lines.
  - What went with it: draft `Security.tsx` and `Status.tsx` pages, `SocialProofSection.tsx`, `shared/socialProof.ts`, `useCountUp.ts` and their route/prerender wiring. **None of it was finished** — every customer-specific value was a `[[REPLACE: ...]]` token (10 in Security, 7 in Status, all of socialProof), so merging it would have published *"private beta with [[REPLACE: N]] UK DSPs"* on the homepage. It also set Enterprise to "From £499/mo", which would have undone `bb2e786` / `3d9ec5c` / `26be449`.
  - The one shippable piece was rescued before deletion: the `prefers-reduced-motion` fix in `useScrollAnimation.ts` (`ce2df16`, live).
  - Recoverable for now with `git cherry-pick 61165e8` or `git branch <name> 61165e8` — until git garbage-collects the unreachable objects. After that it is gone.
  - Worth knowing: if those pages are ever wanted, they need real DSP and station counts, real attributable testimonials, and a real uptime figure. That data is the blocker, not the code.

## Parallel writers (why your checkout goes stale)
- A weekly scheduled blog agent commits straight to main (Railway auto-deploys it); other AI tools have pushed here before.
- Rule: `git fetch` + `git pull --rebase origin main` at session start and before every push (see CLAUDE.md → Parallel Writers).
- Origin has branches `seo-report/2026-06-29`, `2026-07-13`, `2026-07-20`, `2026-07-27` created by scheduled runs — review their contents, then merge or delete.

## Open loose ends
- ~~One chat lead lost before the fix~~ — closed 2026-08-22: Rashid confirmed it was his own test lead, not a real prospect. No recovery needed.
- ~~`ChatbotWidget.tsx` writes the lead to `localStorage` before the request resolves~~ — fixed in the chat takeover work: the lead is stored only after the server confirms the conversation, so a failed request no longer leaves the visitor marked as known while nothing was captured.
- Reddit marketing posts drafted 2026-06-18 were never posted (Reddit hard-blocked the browser tool) — post manually or drop the idea.
- Deploy rule reminder: UI changes need a local `npm run build` + commit of `dist/public`, or Railway serves stale HTML.
- LinkedIn company page is `linkedin.com/company/dspopsltd` and presumably still says "DSPOps Ltd" — inconsistent with the entity naming now on the site. Decide whether to update it.
- `[IMPORTANT]` **`/api/chat` has no rate limiting and no cap on the incoming `messages` array.** It is public and now costs money on every call. Model is Haiku with `max_tokens: 300` so replies are cheap, but input is unbounded and nothing throttles a caller. Worth an express-rate-limit + a hard cap on message count/length.
- `CostCalculatorSection.tsx` (`getTier`, lines 3-5) caps at 100 drivers and falls through to "Contact sales" above that. Consistent only while no Enterprise rate is published — if a public "from £X per driver" figure is ever added, this must compute it.
- The Frontend lesson in CLAUDE.md claiming the 7 homepage FAQs are duplicated as JSON-LD in `client/index.html` is **stale** — `Home.tsx` derives them from `shared/faqs.ts` via `faqJsonLd(faqs)`. One file, not two.
- Pre-existing typecheck failure: `npm run check` reports TS2802 in `client/src/components/FeaturesSection.tsx:61` (`Set` iteration needs a higher `target`). Unrelated to any current work; the Vite build is unaffected. Worth fixing, one line in tsconfig.
