# AGENTS.md

Context for any coding agent working in this repo. Read this first, then read
BUILDER.md for the handover protocol before you change anything.

## What this repo is

Read `README.md` and `package.json` for the project's purpose and stack. Read
`CLAUDE.md` if it exists — it carries project-specific rules and hard-won
lessons that override anything generic in this file.

## How to run it

- Install: `npm install` (or the lockfile's package manager — do not switch it).
- Run: the `scripts` block in `package.json` is the source of truth. Prefer
  `npm run dev` for local work.
- Test: run the command named in `CLAUDE.md`. If none is named, run `npm test`.
  Use that same command every time — the reviewer re-runs it to check your work,
  and a different command verifies a different thing.

## How to write code here

- **Match what is already there.** Naming, file layout, error handling, comment
  density, quote style. If the codebase does something differently from how you
  would, do it the codebase's way.
- **Surgical changes only.** Every changed line must trace to the task you were
  given. Do not reformat, rename, or "improve" code you were not asked to touch.
- **Do not delete pre-existing dead code.** Mention it in your report instead.
- Remove only the imports and variables that *your* change made unused.
- Validate inputs on the server. Never trust the client.
- User-facing errors are readable messages, not raw exception dumps.
- If a change needs a database schema migration, the migration ships in the same
  change. Backend code without its migration breaks the deploy.

## Off-limits

- `.env`, `.env.local`, and anything else holding secrets. Never read them into
  output, never commit them, never echo their values.
- Generated and vendored directories: `node_modules/`, `dist/`, `build/`,
  `.next/`, coverage output. Do not hand-edit them.
- `.builder/` — scratch space for task briefs and run logs. Not yours to change.
- Git history. Do not commit, amend, rebase, tag, or push. See BUILDER.md.

## When something does not fit

You have no network access. Do not try to install packages or fetch anything.
If the task genuinely needs a package that is not already in `package.json`,
stop and say so by name in your report rather than working around it.

If the task cannot be done as written — a file is missing, the plan contradicts
the code, two instructions conflict — stop and report it. A clear BLOCKED report
is a good outcome. A guess that compiles is not.
