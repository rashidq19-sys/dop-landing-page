# STATUS — dop-marketing-landing-page

> Session handoff file. Read at session start (with DECISIONS.md); update at session end. The rule lives in global CLAUDE.md → Memory System.

**Last updated:** 2026-07-30 (ICO registration + legal entity correction)

## Where things stand
- main @ cde19b2, clean tree, **pushed and deployed** (2026-07-30). This push also carried `a5b7b1d` and `bccd484` — two docs commits stranded locally since the 2026-07-05 session — so origin and local are finally in sync.
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
- Reddit marketing posts drafted 2026-06-18 were never posted (Reddit hard-blocked the browser tool) — post manually or drop the idea.
- Deploy rule reminder: UI changes need a local `npm run build` + commit of `dist/public`, or Railway serves stale HTML.
- LinkedIn company page is `linkedin.com/company/dspopsltd` and presumably still says "DSPOps Ltd" — inconsistent with the entity naming now on the site. Decide whether to update it.
- Pre-existing typecheck failure: `npm run check` reports TS2802 in `client/src/components/FeaturesSection.tsx:61` (`Set` iteration needs a higher `target`). Unrelated to any current work; the Vite build is unaffected. Worth fixing, one line in tsconfig.
