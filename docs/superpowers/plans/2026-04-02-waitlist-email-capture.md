# Waitlist Email Capture — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a two-step waitlist signup form (email → name+phone) with Neon PostgreSQL storage and a password-protected admin dashboard.

**Architecture:** Express server gets a Postgres connection pool, two new route files (waitlist + admin), and JSON body parsing. The existing `EmailCaptureInline` component is refactored into a two-step form. `CTASection` reuses it. A new `/admin` page with wouter routing shows all signups behind a password gate.

**Tech Stack:** pg (node-postgres), Express, React, wouter, Tailwind CSS, nanoid (already installed — used for admin tokens)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `server/db.ts` | Create | DB pool + table auto-creation |
| `server/routes/waitlist.ts` | Create | POST /api/waitlist, PATCH /api/waitlist/:id |
| `server/routes/admin.ts` | Create | POST /api/admin/login, GET /api/admin/waitlist |
| `server/index.ts` | Modify | Add JSON parsing, register route files before catch-all |
| `client/src/components/EmailCaptureInline.tsx` | Modify | Two-step form with API calls and inline messages |
| `client/src/components/CTASection.tsx` | Modify | Replace inline form with EmailCaptureInline component |
| `client/src/pages/Admin.tsx` | Create | Password gate + signups table |
| `client/src/App.tsx` | Modify | Add wouter Router with `/admin` route |
| `.env` | Create | DATABASE_URL and ADMIN_PASSWORD (gitignored) |

---

### Task 1: Install `pg` and create `.env`

**Files:**
- Modify: `package.json`
- Create: `.env`

- [ ] **Step 1: Install pg and @types/pg**

```bash
cd f:/Github-DOP/dop-marketing-landing-page && npm install pg && npm install -D @types/pg
```

- [ ] **Step 2: Create `.env` file**

Create `.env` at project root with:

```
DATABASE_URL=postgresql://neondb_owner:npg_zT0chHyQ5pdV@ep-flat-base-abmqd2nu-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
ADMIN_PASSWORD=Rustam@123
```

This file is already in `.gitignore` — it will not be committed.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add pg dependency for Neon PostgreSQL"
```

Note: Do NOT commit `.env`.

---

### Task 2: Database connection and table creation (`server/db.ts`)

**Files:**
- Create: `server/db.ts`

- [ ] **Step 1: Create `server/db.ts`**

```typescript
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      phone VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log("Database initialized — waitlist table ready");
}

export default pool;
```

- [ ] **Step 2: Commit**

```bash
git add server/db.ts
git commit -m "feat: add database connection pool and waitlist table init"
```

---

### Task 3: Waitlist API routes (`server/routes/waitlist.ts`)

**Files:**
- Create: `server/routes/waitlist.ts`

- [ ] **Step 1: Create `server/routes/waitlist.ts`**

```typescript
import { Router } from "express";
import pool from "../db.js";

const router = Router();

// POST /api/waitlist — Step 1: capture email
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO waitlist (email) VALUES ($1)
       ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
       RETURNING id`,
      [email.toLowerCase().trim()]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error("Waitlist insert error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /api/waitlist/:id — Step 2: add name + phone
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return res.status(400).json({ error: "Phone is required" });
  }

  try {
    const result = await pool.query(
      `UPDATE waitlist SET name = $1, phone = $2, updated_at = NOW() WHERE id = $3 RETURNING id`,
      [name.trim(), phone.trim(), id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Waitlist update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
```

- [ ] **Step 2: Commit**

```bash
git add server/routes/waitlist.ts
git commit -m "feat: add waitlist API routes (POST email, PATCH name+phone)"
```

---

### Task 4: Admin API routes (`server/routes/admin.ts`)

**Files:**
- Create: `server/routes/admin.ts`

- [ ] **Step 1: Create `server/routes/admin.ts`**

```typescript
import { Router } from "express";
import { nanoid } from "nanoid";
import pool from "../db.js";

const router = Router();

// In-memory token store (simple, resets on server restart)
const validTokens = new Set<string>();

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: "Admin password not configured" });
  }

  if (password !== adminPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = nanoid(32);
  validTokens.add(token);
  res.json({ success: true, token });
});

// Middleware: verify admin token
function requireAuth(req: any, res: any, next: any) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = auth.slice(7);
  if (!validTokens.has(token)) {
    return res.status(401).json({ error: "Invalid token" });
  }
  next();
}

// GET /api/admin/waitlist
router.get("/waitlist", requireAuth, async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, name, phone, created_at FROM waitlist ORDER BY created_at DESC`
    );
    res.json({ entries: result.rows, total: result.rowCount });
  } catch (err) {
    console.error("Admin waitlist fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
```

- [ ] **Step 2: Commit**

```bash
git add server/routes/admin.ts
git commit -m "feat: add admin API routes (login + waitlist data)"
```

---

### Task 5: Wire routes into Express server (`server/index.ts`)

**Files:**
- Modify: `server/index.ts`

- [ ] **Step 1: Update `server/index.ts`**

Replace the full content of `server/index.ts` with:

```typescript
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { initDb } from "./db.js";
import waitlistRoutes from "./routes/waitlist.js";
import adminRoutes from "./routes/admin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON request bodies
  app.use(express.json());

  // Initialize database
  await initDb();

  // API routes (must come before static/catch-all)
  app.use("/api/waitlist", waitlistRoutes);
  app.use("/api/admin", adminRoutes);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
```

- [ ] **Step 2: Commit**

```bash
git add server/index.ts
git commit -m "feat: register waitlist and admin API routes in Express server"
```

---

### Task 6: Refactor `EmailCaptureInline` to two-step form

**Files:**
- Modify: `client/src/components/EmailCaptureInline.tsx`

- [ ] **Step 1: Rewrite `EmailCaptureInline.tsx`**

Replace the full content with:

```tsx
import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

interface EmailCaptureInlineProps {
  variant?: "light" | "dark";
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

type FormStep = "email" | "details" | "done";

export default function EmailCaptureInline({
  variant = "light",
  buttonText = "Get Early Access",
  placeholder = "Enter your email",
  className = "",
}: EmailCaptureInlineProps) {
  const [step, setStep] = useState<FormStep>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [recordId, setRecordId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const isDark = variant === "dark";

  const inputClass = `w-full px-5 py-3.5 rounded-lg border transition-colors focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand ${
    isDark
      ? "bg-white/10 border-white/20 text-white placeholder:text-white/40"
      : "bg-white border-border text-navy placeholder:text-muted-foreground"
  }`;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setRecordId(data.id);
      setStep("details");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/waitlist/${recordId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSubmittedName(name);
      setStep("done");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Final success
  if (step === "done") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div
          className={`flex items-center gap-2 px-5 py-3.5 rounded-lg ${
            isDark ? "bg-green-500/20 text-green-300" : "bg-green-50 text-green-700"
          }`}
        >
          <Check size={20} />
          <span className="font-semibold">
            Thanks, {submittedName}! We'll be in touch.
          </span>
        </div>
      </div>
    );
  }

  // Step 2: Name + Phone
  if (step === "details") {
    return (
      <div className={className}>
        <div
          className={`flex items-center gap-2 mb-4 px-4 py-2.5 rounded-lg ${
            isDark ? "bg-green-500/20 text-green-300" : "bg-green-50 text-green-700"
          }`}
        >
          <Check size={18} />
          <span className="font-semibold text-sm">You're on the list! Complete your profile below.</span>
        </div>
        <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className={`flex-1 ${inputClass}`}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              required
              className={`flex-1 ${inputClass}`}
            />
          </div>
          {error && (
            <p className={`text-sm ${isDark ? "text-red-300" : "text-red-600"}`}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_4px_14px_0_rgba(59,130,246,0.35)] hover:shadow-[0_6px_20px_0_rgba(59,130,246,0.45)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Complete Profile"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    );
  }

  // Step 1: Email
  return (
    <form
      onSubmit={handleEmailSubmit}
      className={`flex flex-col sm:flex-row items-center gap-3 ${className}`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className={`flex-1 sm:w-auto ${inputClass}`}
      />
      {error && (
        <p className={`text-sm w-full ${isDark ? "text-red-300" : "text-red-600"}`}>{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_4px_14px_0_rgba(59,130,246,0.35)] hover:shadow-[0_6px_20px_0_rgba(59,130,246,0.45)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : buttonText}
        {!loading && <ArrowRight size={18} />}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/EmailCaptureInline.tsx
git commit -m "feat: refactor EmailCaptureInline to two-step form with API integration"
```

---

### Task 7: Refactor `CTASection` to use `EmailCaptureInline`

**Files:**
- Modify: `client/src/components/CTASection.tsx`

- [ ] **Step 1: Update `CTASection.tsx`**

Replace the full content with:

```tsx
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar } from "lucide-react";
import EmailCaptureInline from "@/components/EmailCaptureInline";

export default function CTASection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="book-demo"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/cta-bg-iTRQFNjxE444sjVTvXHPEt.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-navy/92" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Stop firefighting.<br className="hidden sm:block" /> Start running your DSP.
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
            Join DSP owners who are taking back control of their operations.
            Get early access — no credit card required.
          </p>

          {/* Inline email capture — reuses shared component */}
          <EmailCaptureInline
            variant="dark"
            className="mt-8 max-w-lg mx-auto"
          />

          {/* Or Book Demo */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-sm text-white/40">or</span>
            <a
              href="#book-demo"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 text-sm"
            >
              <Calendar size={16} />
              Book a 15-Min Demo
            </a>
          </div>

          {/* Founder quote */}
          <p className="mt-10 text-base italic text-white/50 max-w-xl mx-auto">
            "Built by an OSM who got tired of the spreadsheets. DSPOps is the tool I wish I had."
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/CTASection.tsx
git commit -m "refactor: CTASection uses EmailCaptureInline instead of duplicate form"
```

---

### Task 8: Create Admin page (`client/src/pages/Admin.tsx`)

**Files:**
- Create: `client/src/pages/Admin.tsx`

- [ ] **Step 1: Create `client/src/pages/Admin.tsx`**

```tsx
import { useState, useEffect } from "react";
import { Lock, LogOut, Users } from "lucide-react";

interface WaitlistEntry {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  created_at: string;
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token") || "");
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLoggedIn = !!token;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      sessionStorage.setItem("admin_token", data.token);
      setToken(data.token);
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken("");
    setEntries([]);
    setTotal(0);
  };

  useEffect(() => {
    if (!token) return;

    async function fetchEntries() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/waitlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          handleLogout();
          setError("Session expired. Please log in again.");
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch");
        setEntries(data.entries);
        setTotal(data.total);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, [token]);

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                <Lock size={24} className="text-brand" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-slate-900 text-center mb-6">
              Admin Access
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-brand" />
            <h1 className="text-xl font-bold text-slate-900">Waitlist Signups</h1>
            <span className="ml-2 px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-sm font-semibold">
              {total}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No signups yet. Share your landing page to start collecting leads!
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Signed Up
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {entries.map((entry, index) => (
                    <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {entry.name || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {entry.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {entry.phone || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(entry.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add client/src/pages/Admin.tsx
git commit -m "feat: add password-protected admin page for viewing waitlist signups"
```

---

### Task 9: Add routing to `App.tsx`

**Files:**
- Modify: `client/src/App.tsx`

- [ ] **Step 1: Update `App.tsx` to add wouter routing**

Replace the full content with:

```tsx
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Home} />
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/App.tsx
git commit -m "feat: add /admin route with wouter"
```

---

### Task 10: Vite proxy config for dev mode

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Check current vite.config.ts and add proxy**

Read `vite.config.ts` first. Add a `server.proxy` entry so that `/api` requests are forwarded to the Express server during development:

```typescript
server: {
  proxy: {
    "/api": "http://localhost:3000",
  },
},
```

This is needed because in dev mode, Vite serves the frontend on its own port and the Express server runs separately on port 3000.

- [ ] **Step 2: Commit**

```bash
git add vite.config.ts
git commit -m "chore: add Vite dev proxy for /api routes"
```

---

### Task 11: Manual smoke test

- [ ] **Step 1: Start the Express server**

```bash
cd f:/Github-DOP/dop-marketing-landing-page
npx tsx server/index.ts
```

Expected: "Database initialized — waitlist table ready" and "Server running on http://localhost:3000/"

- [ ] **Step 2: In a separate terminal, start Vite dev server**

```bash
cd f:/Github-DOP/dop-marketing-landing-page
npm run dev
```

- [ ] **Step 3: Test the waitlist form**

Open the site in browser. Scroll to hero section. Enter an email and submit. Verify:
- Form transitions to show Name + Phone fields
- "You're on the list!" message appears
- Fill in name and phone, submit
- "Thanks, [name]!" message appears

- [ ] **Step 4: Test the admin page**

Navigate to `/admin`. Enter password. Verify:
- Login succeeds
- Table shows the signup you just created
- Name, email, phone, date all display correctly

- [ ] **Step 5: Test duplicate protection**

Open the site in another tab. Submit the same email. Verify:
- No error shown — form transitions to step 2 normally
- Admin page still shows only one entry for that email

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete waitlist email capture with admin dashboard"
```

Only needed if any files were missed in prior commits.
