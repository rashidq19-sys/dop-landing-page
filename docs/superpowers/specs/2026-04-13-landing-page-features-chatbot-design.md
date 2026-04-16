# Landing Page: New Features Section + Driver Rating + Chatbot

**Date:** 2026-04-13  
**Status:** Approved

---

## Overview

Three additions to the DSPOps marketing landing page:

1. **NewFeaturesSection** — a 2×2 card grid highlighting 4 new app features
2. **FeaturesSection update** — add Driver Rating & Leaderboard as the 8th feature; re-add the section to the page
3. **ChatbotWidget** — floating AI chat widget powered by Claude, with email notifications to the DSP owner

---

## Part 1 — New Features Section

### Component
- New file: `client/src/components/NewFeaturesSection.tsx`
- Placed in `Home.tsx` after `DriverPortalSection` and before `HowItWorksSection`

### Layout
Section header + 2×2 card grid. Each card has:
- A Lucide icon
- A "New" badge
- Feature name as heading
- 2–3 lines of copy explaining the benefit

### The 4 Cards

| Feature | Icon | Copy |
|---|---|---|
| **Live Tracking** | `Activity` | Delivery progress is pulled directly from Amazon Cortex and fed into each driver's portal throughout the day. Drivers know if they're on track or falling behind — without the OSM making a single call. |
| **Same Day Delivery** | `PackagePlus` | SDD drivers are managed in a clearly separate roster. Schedule, assign, and track same day delivery drivers alongside your regular fleet — full clarity, no confusion. |
| **Arriving** | `ClipboardCheck` | During dispatch, the OSM marks each driver as arrived in one tap. See who's in, who's missing, and which keys to hand over — all tracked live before the morning rush. |
| **Automatic Data Backup** | `ShieldCheck` | All your data is continuously and automatically backed up. Driver records, payroll history, compliance documents — nothing is ever lost. |

### Visual style
- Matches the existing design system: off-white background, navy text, blue brand accents, DM Sans font
- Scroll animation (same `useScrollAnimation` hook used throughout the page)
- Screenshot placeholder images per card (user will supply real screenshots later)
- No lightbox needed at this stage (placeholders only)

---

## Part 2 — Driver Rating & Leaderboard (FeaturesSection)

### Changes to `client/src/components/FeaturesSection.tsx`
Add an 8th entry to the `features` array:

```
{
  icon: Trophy,
  label: "Driver Leaderboard",
  title: "Rate Your Drivers Automatically — Even Without Amazon's Scorecard",
  description: "Amazon stopped publishing individual driver scorecards. DSPOps fills that gap — pulling your Amazon performance metrics and automatically calculating each driver's rating. OSMs can adjust the metric weighting to match what matters to your operation. See your full leaderboard at a glance and know exactly who your top performers are.",
  stat: "No more guesswork on driver performance",
  image: LEADERBOARD_IMG,  // placeholder URL until screenshot supplied
  imageAlt: "DSPOps Driver Rating Leaderboard",
}
```

Update the section header copy from "Eight powerful modules" (already says 8, currently only shows 7 — this corrects it).

### Changes to `client/src/pages/Home.tsx`
Re-add `FeaturesSection` import and render it. Placement: after `NewFeaturesSection`, before `HowItWorksSection`.

---

## Part 3 — Chatbot Widget

### Frontend: `client/src/components/ChatbotWidget.tsx`

**UI elements:**
- Floating action button, fixed bottom-right (e.g. `bottom-6 right-6`), navy background, chat bubble icon
- Click opens a chat panel (fixed position, ~400px wide, ~500px tall on desktop; full-width on mobile)
- Panel header: "Ask about DSPOps" + X close button
- Scrollable message thread
- Text input + Send button (also submits on Enter)
- Opening bot message: "Hi! Ask me anything about DSPOps — features, pricing, or how it works."

**State:**
- Conversation history stored in component state (`useState`) — lives in browser memory only, not persisted
- `isOpen` toggle for the panel
- `isLoading` flag while waiting for API response

**API calls:**
- Each message sends `POST /api/chat` with `{ messages: [{role, content}] }`
- On panel close, sends `POST /api/chat/end` with `{ messages: [...full history] }`

**Placement:** Added to `Home.tsx` alongside `<Footer />`, outside `<main>`

---

### Backend: Express routes in `server/routes/`

#### `POST /api/chat`

Request body:
```json
{ "messages": [{ "role": "user" | "assistant", "content": "string" }] }
```

Behaviour:
1. Call Claude API (`claude-haiku-4-5-20251001`) with system prompt (see below) + conversation history
2. Return `{ reply: "string" }` to frontend
3. If `messages.length === 1` (first message in conversation): send notification email to `rashid@dspops.app`
   - Subject: `New visitor chatting on DSPOps`
   - Body: visitor's opening question

#### `POST /api/chat/end`

Request body:
```json
{ "messages": [{ "role": "user" | "assistant", "content": "string" }] }
```

Called by the frontend when the user closes the chat panel (clicks X).

Behaviour:
1. Send transcript email to `rashid@dspops.app`
   - Subject: `DSPOps chat transcript`
   - Body: full conversation formatted as a readable thread

#### Chatbot System Prompt

```
You are the helpful assistant for DSPOps — a SaaS platform for Amazon DSP (Delivery Service Partner) operators in the UK.

DSPOps replaces spreadsheets, WhatsApp chaos, and third-party tools with one platform. Key features:
- Smart scheduling / route assignment
- AI van damage detection (replaces tools like £200-300/month third-party apps)
- Weekly payroll automation (upload Cortex report, system calculates everything)
- Amazon Cortex integration (one-click sync of scorecards and route data)
- Compliance management (driver licences, passports, van MOT/insurance)
- Driver management (full lifecycle from onboarding to offboarding)
- Capacity planning (always know if you have enough drivers)
- Driver portal app (drivers see shifts, pay, performance, damage — stop calling the OSM)
- Live Tracking (delivery progress synced from Amazon Cortex to driver portal automatically)
- Same Day Delivery management (separate SDD driver roster and scheduling)
- Arriving / dispatch attendance (OSM marks arrivals live during dispatch)
- Automatic data backup (all data continuously backed up, nothing lost)
- Driver Rating & Leaderboard (automatic ratings from Amazon metrics, OSM-adjustable weighting)

Pricing:
- Starter: £99/month — up to 30 drivers. Includes smart scheduling, driver management, fleet tracking, basic compliance, weekly payroll, driver portal, email support.
- Professional: £249/month — up to 100 drivers. Everything in Starter plus AI van damage detection, performance scorecards, advanced compliance, reports & analytics, capacity planning, Amazon Cortex integration, priority support.
- Enterprise: Custom pricing. For large or multi-DSP operations. To discuss Enterprise, direct them to contact rashid@dspops.app.

Tone: friendly, direct, concise. No jargon. If you don't know something specific, say so honestly and suggest they reach out to rashid@dspops.app.
```

---

### Email (nodemailer)

New file: `server/email.ts`  
Uses nodemailer with SMTP credentials from environment variables.

New environment variables required:
```
ANTHROPIC_API_KEY=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
NOTIFY_EMAIL=rashid@dspops.app
```

---

## Page Order After Changes

1. Hero
2. Problems
3. For DSP Owners
4. For OSMs
5. Driver Portal
6. **New Features** ← new
7. **Features** (re-added, now 8 features incl. Driver Leaderboard) ← updated
8. How It Works
9. Before & After
10. Pricing
11. FAQ
12. CTA
13. **Chatbot Widget** (floating, outside main) ← new

---

## Out of Scope

- Persisting chat history to the database
- Live "jump in" functionality for the DSP owner
- Chatbot analytics
- Real screenshots for the new features (user will supply later)
