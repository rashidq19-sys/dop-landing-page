# STATUS — dop-marketing-landing-page

> Session handoff file. Read at session start (with DECISIONS.md); update at session end. The rule lives in global CLAUDE.md → Memory System.

**Last updated:** 2026-07-05 (setup-audit implementation session — no app code touched)

## Where things stand
- main @ 9e520e2, clean tree — docs/rules commit rebased on top of the blog agent's latest post (db2f893, right-to-work checks, landed while this session ran — the parallel-writers rule proved itself immediately).
- Search Console: domain verified, sitemap submitted, homepage indexed; remaining URLs queued (manual checklist: SEO_GOOGLE_SUBMISSION_CHECKLIST.md). Indexing latency is normal — a monthly scheduled SEO report now delivers ranking movement instead of manual googling.

## Work NOT on main
- `redesign/linear` — unmerged redesign experiment from 2026-06-23. Decide: merge, cherry-pick the good parts, or delete.

## Parallel writers (why your checkout goes stale)
- A weekly scheduled blog agent commits straight to main (Railway auto-deploys it); other AI tools have pushed here before.
- Rule: `git fetch` + `git pull --rebase origin main` at session start and before every push (see CLAUDE.md → Parallel Writers).
- Origin has a branch `seo-report/2026-06-29` created by a scheduled run — review its contents, then merge or delete.

## Open loose ends
- Reddit marketing posts drafted 2026-06-18 were never posted (Reddit hard-blocked the browser tool) — post manually or drop the idea.
- Deploy rule reminder: UI changes need a local `npm run build` + commit of `dist/public`, or Railway serves stale HTML.
