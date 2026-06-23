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
- Design system: "Clean Logistics Blueprint" — DM Sans font, off-white bg (#FAFAF8), navy text (#0F1B2D), blue brand accents (#2563EB)
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

## Lessons Learned

### Frontend
- `[IMPORTANT]` This is a SPA. Per-page meta tags are set via the `usePageMeta` hook (`client/src/hooks/usePageMeta.ts`) which writes `<title>`, `<meta name="description">`, OG/Twitter tags, canonical, optional `noindex`, and JSON-LD blocks at runtime. For crawlers that don't run JS (LinkedIn, Slack, WhatsApp, many AI indexers), the **build-time prerenderer** (`scripts/prerender.mjs`) captures the post-effect DOM into per-route HTML — so each public URL ships with full SEO content.
- `usePageMeta` accepts `jsonLd` (object or array) and clears its own entries on unmount via a `data-page-jsonld` attribute. Helpers `faqJsonLd()` and `breadcrumbJsonLd()` build common shapes.
- FAQs for the homepage live in `shared/faqs.ts`, imported by `FAQSection.tsx`. The same 7 FAQs are duplicated as `FAQPage` JSON-LD in `client/index.html` — when FAQs change, update both. (Per-SEO-page FAQs are inlined in those pages and registered via `usePageMeta`'s `jsonLd`.)
- All non-home routes in `App.tsx` are `React.lazy()`-loaded. This keeps the initial JS bundle around 540 KB / 165 KB gzipped (vs 618 KB without code-splitting).
- Navbar uses a `Features` dropdown listing all six SEO pages; all anchor links to homepage sections use absolute paths (`/#features`, `/#pricing`, `/#book-demo`) so they work from any sub-page.
- Visit tracking: `usePageViewTracking` in `App.tsx` calls `trackPageView` (`client/src/lib/tracking.ts`) on first load and every wouter route change. It stores a random anonymous ID in `localStorage` and POSTs `{path, visitorId}` to `/api/track` via `fetch` + `keepalive` — **not** `navigator.sendBeacon`, which sends `text/plain` and would bypass `express.json()`, dropping the body. `/admin` is never tracked. See the Backend/Database notes for the server side.

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

### Backend / Database
- `[IMPORTANT]` Database uses raw `pg` queries, not Drizzle or any ORM. Two tables: `waitlist` and `page_views` (both created in `server/db.ts` `initDb()` with `CREATE TABLE IF NOT EXISTS`).
- SSL config for Neon pooler: uses `rejectUnauthorized: false` when `sslmode=require` is in the connection string.
- **Site traffic counter:** `page_views` (anonymous `visitor_id` + `path` + `created_at timestamptz`, no IP/PII) backs the admin "Site Traffic" section. Public `POST /api/track` (`server/routes/track.ts`) records one anonymous view per page load — filters bot UAs, ignores `/admin` + `/api` paths. Auth-protected `GET /api/admin/stats` (in `server/routes/admin.ts`) returns unique-visitor + page-view counts (today / 7d / 30d / all-time), a 30-day daily breakdown, and a per-page breakdown. Day buckets use `created_at AT TIME ZONE 'Europe/London'` so "today" matches UK time; each window's "unique visitors" is `COUNT(DISTINCT visitor_id)` over the whole window (daily uniques intentionally don't sum to it).

### Deployment
- `[CRITICAL]` **Puppeteer no longer runs on Railway.** The previous setup (prerender on Railway) failed repeatedly: (a) `npm install` couldn't extract the Chrome archive because `unzip` wasn't on PATH, (b) once that was fixed Chrome wouldn't launch because Chrome's shared libraries (`libglib2.0-0`, `libnss3`, etc.) weren't installed, and (c) once those were added, the resulting ~1 GB image took 25–30 min to push and frequently stalled. Now Railway is told to skip the Chrome download via `PUPPETEER_SKIP_DOWNLOAD=true` in `nixpacks.toml`'s `[variables]` block, runs only `npm run build:server` (esbuild bundle of Express, ~14 KB), and ships the pre-committed `dist/public/`. Image is ~200 MB, deploys take 1–2 min.
- `[CRITICAL]` `scripts/prerender.mjs` catches all errors and exits 0 by design (so a flaky prerender doesn't block deploys). This means a "build successful" log can hide a totally broken prerender — every sub-page would silently ship as the SPA shell with the home canonical. **Always verify after a build:** open `dist/public/<route>/index.html` for any SEO page and confirm the `<title>` and `<link rel="canonical">` are page-specific, not home's.
- `[IMPORTANT]` `dist/public/` is committed to git (see `.gitignore` exception `!dist/public/`). `dist/index.js` (the bundled Express server) stays gitignored and is rebuilt on Railway via `npm run build:server`. The asset filenames in `dist/public/assets/` are content-hashed, so every local `npm run build` changes ~20 filenames — that's normal, just commit them.
- `[IMPORTANT]` pnpm 10+ blocks lifecycle scripts by default. Puppeteer's postinstall (which downloads Chromium) is explicitly allowlisted via `pnpm.onlyBuiltDependencies` in `package.json` — kept for local use, not for Railway. If you add another dep that needs a postinstall, add it there too.
- Railway build config splits across two files: `nixpacks.toml` (Nix packages, env vars, build/start commands) and `railway.json` (which overrides `buildCommand`). When changing either, make sure the other doesn't conflict. The build command Railway actually runs is `railway.json`'s `buildCommand` field.
- `[IMPORTANT]` Railway deployments can show **ACTIVE** even when the new build's container hasn't taken over — the chip flips green as soon as the new container's healthcheck passes, but if the new container fails to start at all, the chip stays on the previous successful deployment. To verify the actually-serving build, check `Deploy Logs` for the latest `Server running on …` timestamp, and curl a per-route HTML file (e.g. `https://dspops.app/amazon-dsp-management-software/index.html` should return 200 if the new build is live, 404 if it's still the old SPA-shell build).
