# DSPOps Marketing Landing Page

## What This Is
Marketing/landing page for DSPOps — a SaaS platform for Amazon DSP (Delivery Service Partner) operators. This repo is the public-facing site, not the app itself.

## Tech Stack
- **Frontend:** React 19 + TypeScript, Vite, TailwindCSS v4, shadcn/ui (Radix primitives), Framer Motion for animations, wouter for routing
- **Backend:** Express (Node.js), PostgreSQL via `pg` (raw queries, no ORM) — only used for waitlist email capture
- **Deployment:** Railway (Nixpacks builder)
- **Dev:** Vite dev server on port 3000, Express on port 3001, Vite proxies `/api` to Express

## Project Structure
- `client/src/pages/Home.tsx` — main page, assembles all sections
- `client/src/components/` — one component per landing page section (HeroSection, ProblemsSection, BeforeAfterSection, PricingSection, etc.)
- `server/` — Express server with waitlist + admin API routes
- `server/db.ts` — PostgreSQL pool + waitlist table init
- `shared/` — shared constants

## Key Patterns
- Each landing page section is its own component in `client/src/components/`
- All copy/content is inline in the components (no CMS, no content files)
- Design system: "Clean Logistics Blueprint" — DM Sans font, off-white bg (#FAFAF8), navy text (#0F1B2D), blue brand accents (#2563EB)
- Scroll animations via Framer Motion
- Email capture forms post to `/api/waitlist` with a `source` field tracking which CTA section the signup came from

## Lessons Learned
### Frontend
- *(Add lessons here as discovered)*

### Backend / Database
- `[IMPORTANT]` Database uses raw `pg` queries, not Drizzle or any ORM. The only table is `waitlist`.
- SSL config for Neon pooler: uses `rejectUnauthorized: false` when `sslmode=require` is in the connection string.

### Deployment
- *(Add lessons here as discovered)*
