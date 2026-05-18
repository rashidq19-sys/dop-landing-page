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
`npm run build` runs:
1. `vite build` — bundles the React app to `dist/public/`
2. `esbuild server/index.ts` — bundles the Express server to `dist/index.js`
3. `node scripts/prerender.mjs` — spins up `vite preview`, walks the public route list with Puppeteer, writes prerendered HTML to `dist/public/<route>/index.html`

For deploys where Puppeteer/Chromium can't be installed, use `npm run build:no-prerender` and document the limitation (sub-pages will ship as the SPA shell only).

## Lessons Learned

### Frontend
- `[IMPORTANT]` This is a SPA. Per-page meta tags are set via the `usePageMeta` hook (`client/src/hooks/usePageMeta.ts`) which writes `<title>`, `<meta name="description">`, OG/Twitter tags, canonical, optional `noindex`, and JSON-LD blocks at runtime. For crawlers that don't run JS (LinkedIn, Slack, WhatsApp, many AI indexers), the **build-time prerenderer** (`scripts/prerender.mjs`) captures the post-effect DOM into per-route HTML — so each public URL ships with full SEO content.
- `usePageMeta` accepts `jsonLd` (object or array) and clears its own entries on unmount via a `data-page-jsonld` attribute. Helpers `faqJsonLd()` and `breadcrumbJsonLd()` build common shapes.
- FAQs for the homepage live in `shared/faqs.ts`, imported by `FAQSection.tsx`. The same 7 FAQs are duplicated as `FAQPage` JSON-LD in `client/index.html` — when FAQs change, update both. (Per-SEO-page FAQs are inlined in those pages and registered via `usePageMeta`'s `jsonLd`.)
- All non-home routes in `App.tsx` are `React.lazy()`-loaded. This keeps the initial JS bundle around 540 KB / 165 KB gzipped (vs 618 KB without code-splitting).
- Navbar uses a `Features` dropdown listing all six SEO pages; all anchor links to homepage sections use absolute paths (`/#features`, `/#pricing`, `/#book-demo`) so they work from any sub-page.

### SEO
- `[IMPORTANT]` Static SEO files (`robots.txt`, `sitemap.xml`, `og-image.png`) live in `client/public/`. Vite bundles them into `dist/public/` on build, and Express serves them via `express.static(staticPath)` BEFORE the SPA catch-all — so `https://dspops.app/sitemap.xml` returns the XML, not `index.html`.
- `express.static` is configured with `index: false` AND `redirect: false`. Without `redirect: false`, Express would auto-301 every prerendered route like `/dsp-rota-management` to `/dsp-rota-management/` (because the directory exists), creating an extra hop on every request. The catch-all serves the prerendered `<route>/index.html` directly.
- The catch-all checks the `PUBLIC_ROUTE_PATTERNS` allowlist in `server/index.ts`. Known routes return 200 + their prerendered HTML (or SPA shell as fallback). Unknown routes return **real 404 status** + SPA shell so React renders the NotFound page (which sets `noindex`). This fixes the soft-404 problem Google was reporting — including legacy garbage URLs like `/$` / `/%24`.
- When adding new public routes: add to `App.tsx`, `client/public/sitemap.xml`, `PUBLIC_ROUTE_PATTERNS` in `server/index.ts`, and the `ROUTES` array in `scripts/prerender.mjs`.
- Old `/features/*` URLs 301-redirect to the new `/dsp-*` URLs via the `PERMANENT_REDIRECTS` map in `server/index.ts` — consolidates SEO signal onto the single canonical URL per topic.
- Compression: Express uses the `compression` middleware (added 2026-05-18). Gzip is applied to all responses above ~1 KB.
- OG image: regenerate by writing styled HTML at 1200×630 and screenshotting with Chrome headless (`chrome --headless --window-size=1200,630 --screenshot=output.png file://...`), or have the user supply a 1200×630 brand asset.
- Google Search Console is a **manual setup step** the user must do: verify dspops.app, submit `https://dspops.app/sitemap.xml`, monitor coverage and impressions.

### Backend / Database
- `[IMPORTANT]` Database uses raw `pg` queries, not Drizzle or any ORM. The only table is `waitlist`.
- SSL config for Neon pooler: uses `rejectUnauthorized: false` when `sslmode=require` is in the connection string.

### Deployment
- `[IMPORTANT]` pnpm 10+ blocks lifecycle scripts by default. Puppeteer's postinstall (which downloads Chromium) is explicitly allowlisted via `pnpm.onlyBuiltDependencies` in `package.json`. If you add another dep that needs a postinstall, add it there too.
- On Railway: the default Node buildpack should run `pnpm install` and let puppeteer install its Chromium. If prerendering fails on Railway, run `npx puppeteer browsers install chrome` as part of the build, or switch the build script to `build:no-prerender` and accept the SPA-only SEO trade-off.
