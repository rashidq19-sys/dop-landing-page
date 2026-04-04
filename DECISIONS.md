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
