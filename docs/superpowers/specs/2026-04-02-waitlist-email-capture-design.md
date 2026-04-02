# Waitlist Email Capture — Design Spec

**Date:** 2026-04-02
**Status:** Approved

## Overview

Add a two-step waitlist signup form to the DSPOps marketing landing page. Captures email first (most valuable data), then optionally asks for name and phone. Stored in Neon PostgreSQL with duplicate protection by email.

## Database

### `waitlist` table (Neon PostgreSQL)

| Column     | Type         | Constraints              |
|------------|--------------|--------------------------|
| id         | SERIAL       | Primary key              |
| email      | VARCHAR(255) | UNIQUE, NOT NULL         |
| name       | VARCHAR(255) | Nullable                 |
| phone      | VARCHAR(50)  | Nullable                 |
| created_at | TIMESTAMP    | DEFAULT NOW()            |
| updated_at | TIMESTAMP    | DEFAULT NOW(), on update  |

- **Duplicate protection:** UNIQUE constraint on `email`. On conflict, return the existing record (no error to user).
- **Connection:** Via `DATABASE_URL` environment variable. Uses `pg` package directly (no ORM needed for one table).

## API Endpoints

### POST `/api/waitlist` — Step 1 (email capture)

- **Body:** `{ "email": "string" }`
- **Validation:** Valid email format (server-side)
- **Behavior:**
  - Insert new row with email
  - On duplicate email (`ON CONFLICT`): return existing record's ID
  - Response: `{ "success": true, "id": number }`
- **Errors:** 400 for invalid email, 500 for DB errors

### PATCH `/api/waitlist/:id` — Step 2 (name + phone)

- **Body:** `{ "name": "string", "phone": "string" }`
- **Validation:** Name is non-empty string, phone is non-empty string
- **Behavior:**
  - Update existing record with name and phone
  - Set `updated_at` to current timestamp
  - Response: `{ "success": true }`
- **Errors:** 404 if ID not found, 400 for invalid input, 500 for DB errors

## Frontend

### Two-step inline form flow

Both `EmailCaptureInline` and `CTASection` share this behavior:

**Step 1 — Email (initial state):**
- Email input + "Get Early Access" button (same layout as current)
- On submit: POST to `/api/waitlist`
- On success: smooth transition to step 2

**Step 2 — Name + Phone (expanded):**
- Inline success message: "You're on the list!"
- Name input + Phone input + "Complete Profile" button
- On submit: PATCH to `/api/waitlist/:id`
- On success: final message "Thanks, [name]! We'll be in touch."

**If user skips step 2:** No problem — email is already captured.

### Component changes

- **`EmailCaptureInline`:** Refactored to support the two-step flow with state management for step transitions and inline messages.
- **`CTASection`:** Refactored to use `EmailCaptureInline` component instead of duplicating form logic.

### Visual behavior

- Step transitions use smooth CSS transitions (opacity + height)
- Success messages styled to match the section variant (light/dark)
- Form fields match existing Tailwind styling patterns
- Error states shown inline below the relevant field

## Server Setup

### New dependencies
- `pg` — PostgreSQL client for Node.js

### Database initialization
- Auto-create `waitlist` table on server startup if it doesn't exist (`CREATE TABLE IF NOT EXISTS`)
- Connection uses `DATABASE_URL` environment variable

### File structure
- `server/db.ts` — Database connection pool + table init
- `server/routes/waitlist.ts` — Waitlist API route handlers
- `server/routes/admin.ts` — Admin API route handlers (login + data)
- `server/index.ts` — Register new routes before the catch-all
- `client/src/pages/Admin.tsx` — Admin dashboard page

## Admin Page

### Purpose
Password-protected page at `/admin` where the project owner can view all waitlist signups.

### Authentication
- Simple password gate — not a full user/auth system
- Password stored as `ADMIN_PASSWORD` environment variable (not hardcoded)
- **Flow:** User visits `/admin` → sees a password input → enters password → POST to `/api/admin/login` → server compares against env var → returns a session token (simple JWT or random token stored in memory)
- Token stored in `sessionStorage` (cleared when browser tab closes)
- All admin API calls include the token in the Authorization header

### API Endpoints

**POST `/api/admin/login`**
- Body: `{ "password": "string" }`
- Returns: `{ "success": true, "token": "string" }` or 401

**GET `/api/admin/waitlist`**
- Header: `Authorization: Bearer <token>`
- Returns: `{ "entries": [...], "total": number }`
- Sorted by `created_at` descending (newest first)

### Admin Page UI
- Clean table showing: Name, Email, Phone, Signed Up (date)
- Total count at the top
- Empty name/phone cells show "—" (user only completed step 1)
- Simple, functional design — no need for heavy styling

### File structure
- `client/src/pages/Admin.tsx` — Admin page component
- `server/routes/admin.ts` — Admin API route handlers
- Route added to wouter in `App.tsx`

## Environment Variables

| Variable       | Description                      | Required |
|----------------|----------------------------------|----------|
| DATABASE_URL   | Neon PostgreSQL connection string | Yes     |
| ADMIN_PASSWORD | Password for admin page access   | Yes     |

Must be set in Railway (deployment) and locally in `.env` (gitignored).

## Security Considerations

- Server-side email validation (never trust client)
- Parameterized SQL queries (prevent SQL injection)
- Admin password stored in environment variable, never in code
- Admin token validated on every request
- Rate limiting not included in v1 (can add later if spam becomes an issue)
- `.env` file gitignored — credentials never committed
