# Architecture Decisions

## 1. Single-repo landing page (not part of main app repo)
The marketing site lives in its own repo, separate from the DSPOps application. Keeps marketing iteration independent from app development.

## 2. React + Vite (not Next.js)
Client-side rendered SPA. No SSR/SSG needed — this is a single landing page, not a content-heavy site. Vite gives fast dev experience with minimal config.

## 3. Raw pg queries instead of ORM
The backend only stores waitlist signups (one table). An ORM would be overkill. Raw SQL keeps it simple.

## 4. All content inline in components
No CMS, no JSON content files. Copy lives directly in the React components. Fast to iterate on for a single-page site. Trade-off: non-developers can't edit content without touching code.

## 5. Railway for deployment
Nixpacks builder handles the build. Single service serves both the static frontend and the Express API.

## 6. TailwindCSS v4 + shadcn/ui
Consistent with the main DSPOps app's design system. shadcn/ui provides accessible primitives without heavy dependencies.

## 7. Waitlist with source tracking
Email captures track which CTA section (`source` field) the signup came from, enabling conversion analysis per section.

---

*Entries 1–7 were generated at project init (undated). Entries below are backfilled on 2026-07-05 from git history and CLAUDE.md; new decisions get dated entries going forward.*

## 8. (2026-05, backfilled) Prerendering runs locally; dist/public is committed — Railway never builds the frontend
Puppeteer on Railway failed three separate ways (no `unzip` for the Chrome archive, missing Chrome shared libraries, then a ~1 GB image with 25–30 min pushes). Decision: Railway skips Chrome entirely (`PUPPETEER_SKIP_DOWNLOAD=true`), runs only `npm run build:server`, and serves the pre-built `dist/public/` committed in git. Deploys dropped to 1–2 min. Consequence: the "build locally, commit dist/public" workflow rule in CLAUDE.md is load-bearing — forgetting it ships stale HTML.

## 9. (2026-05-29) Weekly blog agent commits directly to main
A scheduled cloud agent writes one blog post a week and pushes to main; Railway auto-deploys it. Chosen for hands-off content cadence. Consequence: the repo has parallel writers — see "Parallel Writers" in CLAUDE.md (fetch + pull-rebase at session start and before every push).

## 10. (2026-06-23) First-party anonymous visitor counter instead of third-party analytics
Site traffic is tracked in our own `page_views` table (anonymous visitor id, no IP/PII, no cookies) and surfaced in the admin dashboard (commits 43768c3, 12663cf). Chosen over another third-party script: keeps data first-party, avoids a cookie banner, and the admin page is where Rashid already looks.

## 11. (2026-07-30) Layerform System Limited is the named operating entity; "DSPOps Ltd" removed from the site
The ICO registration certificate (reference **ZC124917**, registered 15 Apr 2026) names **LAYERFORM SYSTEM LIMITED** as the data controller, with **DSPOps** recorded against it as a trading name. Companies House confirms Layerform System Limited (company no. **16171454**, incorporated 8 Jan 2025) and returns **no company called "DSPOps Ltd"** — so the site's previous claim that "DSPOps Ltd is registered with the Information Commissioner's Office" (compliance page ×2, footer, and the `FAQPage` structured data Google reads) was unverifiable. The privacy policy separately showed `00013790820`, which is the ICO *application* reference, not the registration number.

Decision: the site names Layerform System Limited as the operator trading as DSPOps, with the company number and ICO reference on `/privacy` and the entity named wherever the ICO claim appears. Two deliberate omissions:
- **Registered address** (1 Caroline Close, West Drayton) — reads as residential, and is already public on both the ICO register and Companies House for anyone who needs it. Company number + place of registration carry the identification requirement.
- **Registration expiry** (14 Apr 2027) — a published expiry silently reads as lapsed the moment it passes; the reference alone lets anyone check live status on the ICO register.

Consequences: `[IMPORTANT]` any new copy asserting who is registered, incorporated, or liable must say Layerform System Limited (trading as DSPOps), never "DSPOps Ltd". Off-repo, the LinkedIn company page is still at `linkedin.com/company/dspopsltd` — inconsistent with this, not yet addressed. Renewal falls due **14 April 2027** (Tier 1).
