# DSPOps Marketing Landing Page

## What This Is
Marketing/landing page for DSPOps — a SaaS platform for Amazon DSP (Delivery Service Partner) operators. This repo is the public-facing site, not the app itself.

## Tech Stack
- **Frontend:** React 19 + TypeScript, Vite, TailwindCSS v4, shadcn/ui (Radix primitives), Framer Motion for animations, wouter for routing
- **Backend:** Express (Node.js), PostgreSQL via `pg` (raw queries, no ORM) — only used for waitlist email capture
- **Deployment:** Railway (Nixpacks builder), pnpm package manager
- **Dev:** Vite dev server on port 3000, Express on port 3001, Vite proxies `/api` to Express

## Project Structure
- `client/src/pages/Home.tsx` — main page, assembles all sections
- `client/src/components/` — one component per landing page section
- `client/src/pages/<Page>.tsx` — public SEO landing pages (lazy-loaded in App.tsx)
- `client/src/content/blog/` — blog post body components, registered in `client/src/data/blogPosts.ts`
- `server/` — Express server with waitlist + admin API routes
- `server/db.ts` — PostgreSQL pool + waitlist table init
- `shared/` — shared constants and FAQ data
- `scripts/prerender.mjs` — build-time SEO prerenderer (puppeteer)

## Key Patterns
- Each landing page section is its own component in `client/src/components/`
- All copy/content is inline in the components (no CMS)
- Design system: DM Sans for body, **Archivo for display headings**, off-white bg (#FAFAF8), near-black text (#111113), brand blue #006AE1 and deep navy #0A1235 — both sampled from the logo artwork (see Frontend lessons below)
- Scroll animations via Framer Motion
- Email capture forms post to `/api/waitlist` with a `source` field tracking which CTA section the signup came from
- **UK English** in all user-facing copy (optimise, colour, behaviour, organise, licence)

## Public SEO Routes
| Route | Purpose |
|---|---|
| `/` | Homepage — primary keyword "Amazon DSP Management Software UK" |
| `/amazon-dsp-management-software` | Pillar/category page, links to all feature pages |
| `/driver-performance-tracking` | Cortex scorecard tracking |
| `/van-inspection-app` | Daily van check app |
| `/dsp-rota-management` | Rota / driver scheduling |
| `/dsp-invoicing-payroll` | Payroll calculated from Cortex |
| `/dsp-compliance-tools` | Right-to-Work, licence expiry, GDPR |
| `/blog`, `/blog/:slug` | Blog index + posts |
| `/privacy` | Privacy Policy |

Old `/features/rota`, `/features/payroll`, `/features/scorecard` URLs **301 redirect** to the new keyword-targeted equivalents via Express (see `server/index.ts`).

## Build Pipeline
**Local** `npm run build` runs three steps:
1. `vite build` — bundles the React app to `dist/public/` (HTML, hashed JS/CSS, static assets)
2. `esbuild server/index.ts` — bundles the Express server to `dist/index.js`
3. `node scripts/prerender.mjs` — spins up `vite preview`, walks the public route list with Puppeteer, writes prerendered HTML to `dist/public/<route>/index.html`

**Railway** runs only `npm run build:server` (esbuild only). It does NOT rebuild the frontend or re-prerender. Instead, the entire `dist/public/` directory is **committed to git** and shipped as-is from your last local build.

### Critical workflow rule
Before pushing **any** change that touches the homepage, an SEO page, a blog post, or any visible UI, run:
```
npm run build
git add dist/public
git commit -m "your change"
git push
```
If you forget step 2, Railway will serve stale HTML for the changed routes. The asset hashes in `dist/public/assets/` shift on every build, so commits will routinely touch ~20 files in there — that's expected.

### Other build scripts
- `npm run build:no-prerender` — skips Puppeteer, useful if local Puppeteer is broken (sub-pages ship as SPA shell only)
- `npm run build:server` — esbuild only, what Railway uses; **never run this alone unless dist/public is already current**

## Parallel Writers (multi-agent repo)

This repo has more than one committer: Claude Code sessions, a **scheduled weekly blog agent** that commits straight to main (Railway auto-deploys it), and occasionally other AI tools. Consequences:

- `[IMPORTANT]` Start every session, and precede every push, with `git fetch origin` + `git pull --rebase origin main`. The local checkout is routinely stale.
- A rejected push ("fetch first") means a parallel writer landed commits — pull-rebase and retry once; never force-push.
- Before building on top of recently-touched files, check `git log --oneline -5` for commits you didn't make.

## Lessons Learned

### `[CRITICAL]` A source-only change never reaches production — `dist/public` is committed and served
Railway runs only `npm run build:server` for this service (`nixpacks.toml`, `railway.json`). Vite
never runs in the cloud, so nothing copies `client/public` and nothing rebuilds the React bundle.
`dist/public/` is committed to git and served verbatim. Two consequences, both hit on 2026-08-27:
- A static file added only to `client/public` **404s in production** while working perfectly on a
  local dev server. It must be written to `dist/public` as well.
- A change to any `.tsx` requires a full local `npm run build` (vite + esbuild + prerender) and a
  commit of the regenerated `dist/`, or the deploy ships the old bundle and it looks like the edit
  silently did nothing. Expect ~25 changed files from asset-hash churn; that is normal.
A green Railway deploy proves neither. Verify by fetching the live URL and grepping the served
bytes for a string unique to the change.

### The Umami analytics tag never worked — site traffic is first-party
`client/index.html` carried a Umami script pointing at `VITE_ANALYTICS_ENDPOINT` and
`VITE_ANALYTICS_WEBSITE_ID`. Neither was ever defined, so Vite left the placeholders literal and
every visitor fired a 502 at `/%VITE_ANALYTICS_ENDPOINT%/umami`. Broken since `60fa97f` and it
collected nothing the whole time; removed 2026-08-27. Real numbers come from the first-party
counter: `client/src/lib/tracking` posts to `/api/track`, `page_views` stores it (table created in
`server/db.ts`), and `/admin` renders visitors, page views and a per-page breakdown. If Umami is
ever wanted, both vars must be set **before `npm run build`**, not on Railway — the build is local.
**Note the gap:** that beacon lives in the React app, so the standalone brochures at `/sbl.html`
and `/brochure.html` are **not** counted. Nobody's opens of those are recorded anywhere.

### Sales brochures live in `brochures/` — edit the template, never the built HTML
See `brochures/README.md`. Two self-contained pages built by `node brochures/src/build.mjs` from a
body-only template plus `src/assets.json` (screenshots as WebP data URIs). The built files are ~1MB
of base64 and are hand-editable only in theory. Screenshots are cropped so the app's left
navigation is never visible — deliberate, so the page shows what the product does without handing a
competitor a blueprint of the interface. Both pages are `noindex` and disallowed in `robots.txt`;
they are sales links for named prospects, not public marketing pages.


### Frontend

- `[IMPORTANT]` **Brand colours come from the artwork in `brand-drop/`, not from taste.** Blue is `#006ae1` (the "Ops" wordmark), light blue `#3189fe` (the icon's truck outline), navy `#0a1235` (the icon's ground). A first pass sampled `client/public/logo.png` instead and got `#1879f1` / `#121835` — that file was an **older** logo, navy "DSP" and rounded letterforms, and the site shipped the wrong mark for a couple of hours because of it. If a colour needs to "look like DSPOps", sample `brand-drop/Logo Light.png`, and confirm the file is the current artwork before trusting it.
- `[IMPORTANT]` **The supplied lockup filenames read backwards.** `brand-drop/Logo Dark.png` is the lockup *for* dark backgrounds — its own "DSP" is white. `Logo Light.png` is for light backgrounds, black "DSP". The header uses the light one (`/logo.png`), the footer the dark one (`/images/logo-on-dark.png`). Open the file to tell them apart; the names will mislead you.
- `[CRITICAL]` **Replacing a file in `public/` does not reach anyone who has already loaded it.** `express.static` in `server/index.ts` used to set `Cache-Control: public, max-age=31536000, immutable` on every js/css/png/jpg/webp/svg/ico. That is correct for Vite's output under `/assets/`, where the filename carries a content hash — but `public/` files keep a stable name while their contents change, and `immutable` tells the browser not to revalidate *at all*. When the logo was replaced on 2026-08-24 the server was serving the right bytes within minutes while every returning visitor, Rashid included, still saw the old mark; a hard refresh does not clear an `immutable` entry. Two-part fix, and you need both: the header rule is now scoped to `/assets/` (everything else gets `max-age=3600, must-revalidate`), **and** the brand images are referenced through `client/src/lib/brandAssets.ts`, which appends `?v=N`. Only a changed URL rescues a cache that has already pinned a copy. **Bump `BRAND_ASSET_VERSION` whenever you replace artwork in place** — and when someone reports "the site still shows the old image", check `curl -I` for the cache header before assuming the deploy failed.
- `[IMPORTANT]` **Don't reintroduce a CDN URL for the logo.** The header and footer used to load it from `d2xsxph8kpxj0f.cloudfront.net`, which began returning **403** — so the logo was silently broken on production in both places. It is now `/images/logo-mark.png`, served from `client/public/`. Any asset the site can host itself, it should.
- Product screenshots for the homepage live in `client/public/images/product/` as webp, exported from the app running the **Aurora Logistics demo client** — fabricated drivers, safe to publish. Two rules if you add more: check the shot for real client names before it ships (the site is indexed, unlike `/sbl.html` which is `noindex`), and never publish a screen showing driver email addresses or phone numbers, which is why the imported-roster screen was dropped from the redesign.
- `[IMPORTANT]` This is a SPA. Per-page meta tags are set via the `usePageMeta` hook (`client/src/hooks/usePageMeta.ts`) which writes `<title>`, `<meta name="description">`, OG/Twitter tags, canonical, optional `noindex`, and JSON-LD blocks at runtime. For crawlers that don't run JS (LinkedIn, Slack, WhatsApp, many AI indexers), the **build-time prerenderer** (`scripts/prerender.mjs`) captures the post-effect DOM into per-route HTML — so each public URL ships with full SEO content.
- `usePageMeta` accepts `jsonLd` (object or array) and clears its own entries on unmount via a `data-page-jsonld` attribute. Helpers `faqJsonLd()` and `breadcrumbJsonLd()` build common shapes.
- FAQs for the homepage live in `shared/faqs.ts`, imported by `FAQSection.tsx` **and** by `Home.tsx`, which passes them through `faqJsonLd()` so the `FAQPage` structured data is generated from the same array at runtime. `shared/faqs.ts` is therefore the single source of truth — editing it updates both the visible accordion and the JSON-LD. (An earlier note here claimed the FAQs were also hand-duplicated inside `client/index.html`; checked 2026-08-24, they are not. `index.html` carries only the `WebSite`, `SoftwareApplication` and `Organization` blocks.) Per-SEO-page FAQs are inlined in those pages and registered via `usePageMeta`'s `jsonLd`.
- All non-home routes in `App.tsx` are `React.lazy()`-loaded. This keeps the initial JS bundle around 540 KB / 165 KB gzipped (vs 618 KB without code-splitting).
- Navbar uses a `Features` dropdown listing all six SEO pages; all anchor links to homepage sections use absolute paths (`/#features`, `/#pricing`, `/#book-demo`) so they work from any sub-page.
- Visit tracking: `usePageViewTracking` in `App.tsx` calls `trackPageView` (`client/src/lib/tracking.ts`) on first load and every wouter route change. It stores a random anonymous ID in `localStorage` and POSTs `{path, visitorId}` to `/api/track` via `fetch` + `keepalive` — **not** `navigator.sendBeacon`, which sends `text/plain` and would bypass `express.json()`, dropping the body. `/admin` is never tracked. See the Backend/Database notes for the server side.
- `[CRITICAL]` **The unlayered `@media (max-width: 639px)` block at the bottom of `client/src/index.css` is load-bearing — do not tidy it away.** It forces every `input`/`textarea`/`select` to 16px on phones. iOS Safari zooms the whole layout viewport whenever a focused control is under 16px, and a zoomed layout viewport makes `position: fixed` elements (the chat panel) drift about while someone is typing. It sits **outside** any `@layer` deliberately: unlayered CSS beats Tailwind v4's layered `text-sm` utility without needing `!important`. The `input:not([type="checkbox"]):not([type="radio"])` selector is belt-and-braces for the same reason. Desktop keeps 14px.
- `[CRITICAL]` **The mobile chat sheet listens to BOTH `visualViewport.resize` AND `window.resize` — neither is redundant.** iOS does not shrink the layout viewport when the software keyboard opens; it shrinks the *visual* viewport and scrolls the page underneath, so a fixed panel ends up behind the keyboard while Safari drags the page about trying to reveal the focused input. `useVisualViewportRect` (in `client/src/hooks/useVisualViewportPanel.ts`) pins the overlay to `window.visualViewport` instead. But **Android Chrome resizes the layout viewport and only fires `window.resize`** — drop that listener and the sheet stays stuck at its pre-keyboard height on Android. Companion hooks in the same file: `useIsPhoneViewport` (`matchMedia` on width, so the keyboard can't retrigger it — **not** the same as `useIsMobile()` in `useMobile.tsx`, which is shadcn's 768px sidebar breakpoint) and `useBodyScrollLock` (`position: fixed` on body — the only lock iOS respects — restoring the exact scroll position on close). **Both fixed overlays use these hooks: the chat widget and `SignInModal`.** Any new fixed overlay containing an input needs them too, or its submit button will sit behind the keyboard. Below 640px the chat is a full-height sheet and the modal centres inside the visible area; at 640px and above both are unchanged.
- A centred flex item inside an `overflow-y-auto` parent gets its **top clipped with no way to scroll back to it** when it is taller than the container. `SignInModal` uses `justify-center` on the overlay plus `m-auto` on the card rather than `items-center`; auto margins centre it and keep every edge reachable. This matters on a short viewport — a small phone with the keyboard up.

### SEO
- `[IMPORTANT]` Static SEO files (`robots.txt`, `sitemap.xml`, `og-image.png`) live in `client/public/`. Vite bundles them into `dist/public/` on build, and Express serves them via `express.static(staticPath)` BEFORE the SPA catch-all — so `https://dspops.app/sitemap.xml` returns the XML, not `index.html`.
- `express.static` is configured with `index: false` AND `redirect: false`. Without `redirect: false`, Express would auto-301 every prerendered route like `/dsp-rota-management` to `/dsp-rota-management/` (because the directory exists), creating an extra hop on every request. The catch-all serves the prerendered `<route>/index.html` directly.
- The catch-all checks the `PUBLIC_ROUTE_PATTERNS` allowlist in `server/index.ts`. Known routes return 200 + their prerendered HTML (or SPA shell as fallback). Unknown routes return **real 404 status** + SPA shell so React renders the NotFound page (which sets `noindex`). This fixes the soft-404 problem Google was reporting — including legacy garbage URLs like `/$` / `/%24`.
- When adding new public routes: add to `App.tsx`, `client/public/sitemap.xml`, `PUBLIC_ROUTE_PATTERNS` in `server/index.ts`, and the `ROUTES` array in `scripts/prerender.mjs`. Then **run `npm run build` and commit the new `dist/public/<route>/` directory** — otherwise the new page won't have prerendered HTML in production.
- `[CRITICAL]` Home (`/`) and the pillar `/amazon-dsp-management-software` MUST have different `<title>` and `<meta description>`. They previously shared the same keyword-led title, which triggered Google's "Duplicate, Google chose different canonical" treatment in URL Inspection — the pillar page got demoted as a soft 404. Home now uses a brand-led title ("DSPOps — Amazon DSP Management Platform…") while the pillar keeps the exact-match keyword title.
- Old `/features/*` URLs 301-redirect to the new `/dsp-*` URLs via the `PERMANENT_REDIRECTS` map in `server/index.ts` — consolidates SEO signal onto the single canonical URL per topic.
- Compression: Express uses the `compression` middleware (added 2026-05-18). Gzip is applied to all responses above ~1 KB.
- OG image: regenerate by writing styled HTML at 1200×630 and screenshotting with Chrome headless (`chrome --headless --window-size=1200,630 --screenshot=output.png file://...`), or have the user supply a 1200×630 brand asset.
- Google Search Console: domain property `dspops.app` is already verified via Cloudflare DNS OAuth (Google added its own TXT record after the user authorised). Sitemap `https://dspops.app/sitemap.xml` is submitted. URL Inspection + Request Indexing has been done for the homepage; remaining 9 URLs are queued. Full manual checklist lives in `SEO_GOOGLE_SUBMISSION_CHECKLIST.md`.
- `[IMPORTANT]` GSC's URL Inspection rejects pages with **"Soft 404"** if the live HTML declares a different canonical than the URL being inspected. Symptom on this project: a sub-page like `/amazon-dsp-management-software` returning the home shell HTML (with `canonical = /`) gets rejected. Always verify the live URL serves the right canonical BEFORE requesting indexing in GSC — otherwise you waste rate-limit budget and create negative signal.

### Live chat
- `[CRITICAL]` **Never act on a conversation snapshot read before an AI call.** Generating a bot reply takes a second or two, and Rashid can press Join in that window. Re-read the conversation after the call and drop the reply if the status is now `human`. The escalation transition is additionally guarded in SQL (`AND status = 'bot'` in `escalateToAwaitingHuman`) so a forgotten re-read cannot resurrect a chat he has already taken over — the guard belongs in the WHERE clause, not in JavaScript.
- `[IMPORTANT]` **An Anthropic call whose last message is an assistant turn will try to CONTINUE that message**, and usually returns nothing. The operator-draft transcript normally ends on a bot reply, so `suggestOperatorReply` appends a closing user instruction to force a user-final turn. Any new prompt built from stored transcripts needs the same treatment.
- Four chat states: `bot` → `awaiting_human` → `human` → `closed`. **The bot keeps answering during `awaiting_human`** — being escalated is not being abandoned. It only goes silent at `human`.
- `chat_conversations.public_id` (a nanoid) is the only id that reaches a URL; the numeric `id` never leaves the server, so conversations cannot be enumerated.
- Operator links are HMAC-signed (`server/lib/chatLinks.ts`, needs `CHAT_LINK_SECRET`) and scoped to one conversation for 24h. They exist because the admin bearer token lives in memory and dies on every restart — a mailed link using it would be dead on arrival. The conversation *list* is bearer-only; a link token must never enumerate other visitors' chats.
- `[IMPORTANT]` **`AdminChat.tsx` has two ways in and must present whichever one it arrived with** — the signed `?k=` from an escalation email, or the ordinary admin session in `sessionStorage`. `requireChatAccess` accepts either, but `Admin.tsx` links to `/admin/chat/<id>` with **no `?k=`**, so the dashboard route depends entirely on the bearer. It originally sent neither, so every dashboard click 401'd and showed *"this link has expired or isn't valid — open the chat from the admin dashboard instead"*, pointing back at the one route that could not work. Every operator call now goes through the `authFetch` wrapper, and new ones must too: **fixing only the load path renders the transcript and then 401s on Join, Send, Suggest, Refine and Handback**, which reads as success until one is pressed. Because admin tokens are in-memory, a deploy signs him out — the 401 copy distinguishes that from a stale link.
- `/admin/chat/:publicId` is private: `noindex`, in `PUBLIC_ROUTE_PATTERNS` but deliberately **not** in `sitemap.xml` and **not** in the prerender `ROUTES` list. The `noindex` is set at runtime by `usePageMeta`, not in the shipped HTML, because the route is deliberately absent from the prerenderer — so `curl`ing the live URL for a robots meta tag finds nothing. That is correct, not a regression.

### Backend / Database
- `[IMPORTANT]` Database uses raw `pg` queries, not Drizzle or any ORM. Four tables: `waitlist`, `page_views`, `chat_conversations` and `chat_messages` (all created in `server/db.ts` `initDb()` with `CREATE TABLE IF NOT EXISTS`).
- `[IMPORTANT]` When a `$n` placeholder is both assigned to a `varchar` column and compared as text in the same statement, Postgres throws `inconsistent types deduced for parameter` (42P08). Cast it explicitly (`$2::text`).
- SSL config for Neon pooler: uses `rejectUnauthorized: false` when `sslmode=require` is in the connection string.
- **Site traffic counter:** `page_views` (anonymous `visitor_id` + `path` + `created_at timestamptz`, no IP/PII) backs the admin "Site Traffic" section. Public `POST /api/track` (`server/routes/track.ts`) records one anonymous view per page load — filters bot UAs, ignores `/admin` + `/api` paths. Auth-protected `GET /api/admin/stats` (in `server/routes/admin.ts`) returns unique-visitor + page-view counts (today / 7d / 30d / all-time), a 30-day daily breakdown, and a per-page breakdown. Day buckets use `created_at AT TIME ZONE 'Europe/London'` so "today" matches UK time; each window's "unique visitors" is `COUNT(DISTINCT visitor_id)` over the whole window (daily uniques intentionally don't sum to it).

### Deployment
- `[CRITICAL]` **Puppeteer no longer runs on Railway.** The previous setup (prerender on Railway) failed repeatedly: (a) `npm install` couldn't extract the Chrome archive because `unzip` wasn't on PATH, (b) once that was fixed Chrome wouldn't launch because Chrome's shared libraries (`libglib2.0-0`, `libnss3`, etc.) weren't installed, and (c) once those were added, the resulting ~1 GB image took 25–30 min to push and frequently stalled. Now Railway is told to skip the Chrome download via `PUPPETEER_SKIP_DOWNLOAD=true` in `nixpacks.toml`'s `[variables]` block, runs only `npm run build:server` (esbuild bundle of Express, ~14 KB), and ships the pre-committed `dist/public/`. Image is ~200 MB, deploys take 1–2 min.
- `[CRITICAL]` `scripts/prerender.mjs` catches all errors and exits 0 by design (so a flaky prerender doesn't block deploys). This means a "build successful" log can hide a totally broken prerender — every sub-page would silently ship as the SPA shell with the home canonical. **Always verify after a build:** open `dist/public/<route>/index.html` for any SEO page and confirm the `<title>` and `<link rel="canonical">` are page-specific, not home's.
- `[IMPORTANT]` `dist/public/` is committed to git (see `.gitignore` exception `!dist/public/`). `dist/index.js` (the bundled Express server) stays gitignored and is rebuilt on Railway via `npm run build:server`. The asset filenames in `dist/public/assets/` are content-hashed, so every local `npm run build` changes ~20 filenames — that's normal, just commit them.
- `[IMPORTANT]` pnpm 10+ blocks lifecycle scripts by default. Puppeteer's postinstall (which downloads Chromium) is explicitly allowlisted via `pnpm.onlyBuiltDependencies` in `package.json` — kept for local use, not for Railway. If you add another dep that needs a postinstall, add it there too.
- Railway build config splits across two files: `nixpacks.toml` (Nix packages, env vars, build/start commands) and `railway.json` (which overrides `buildCommand`). When changing either, make sure the other doesn't conflict. The build command Railway actually runs is `railway.json`'s `buildCommand` field.
- `[IMPORTANT]` Railway deployments can show **ACTIVE** even when the new build's container hasn't taken over — the chip flips green as soon as the new container's healthcheck passes, but if the new container fails to start at all, the chip stays on the previous successful deployment. To verify the actually-serving build, check `Deploy Logs` for the latest `Server running on …` timestamp, and curl a per-route HTML file (e.g. `https://dspops.app/amazon-dsp-management-software/index.html` should return 200 if the new build is live, 404 if it's still the old SPA-shell build).
