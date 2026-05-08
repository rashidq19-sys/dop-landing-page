# DSPOps Landing Page v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete overhaul of `client/src/pages/Home.tsx` and all section components to match the v2 Claude Design prototype — 11 sections with faithful scroll animations, DM Sans font, and driver-tier pricing.

**Architecture:** Create 3 new components (ReplacesSection, AudiencesSection, WhatYouGetSection), rewrite 9 existing components, delete 8 obsolete components. The ReplacesSection scroll animation uses Framer Motion `useScroll` + `useTransform`. AudiencesSection uses shadcn/ui Tabs. All inline `style` tokens from the v2 prototype map to Tailwind v4 utility classes — see the token table in Task 1.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Framer Motion 12+, shadcn/ui (Tabs), DM Sans (already configured as `font-sans`), wouter routing.

**Design source:** `dspops-landing-page/project/v2/` files extracted from the Claude Design bundle. The prototype uses inline React styles with a `T` token object — this plan translates every token to Tailwind classes. Font stays DM Sans (not Inter from prototype). Hero stat cards keep current animated counters (not prototype's fake company metrics).

---

## Token Reference (v2 prototype → Tailwind)

| v2 Token | Value | Tailwind equivalent |
|---|---|---|
| `T.bg` | `#F7F7F5` | `bg-background` |
| `T.bgAlt` | `#FFFFFF` | `bg-white` |
| `T.bgDeep` | `#0E0F12` | `bg-[#0E0F12]` |
| `T.ink` | `#111113` | `text-[#111113]` |
| `T.ink2` | `#353538` | `text-[#353538]` |
| `T.mute` | `#6C6C72` | `text-[#6C6C72]` |
| `T.line` | `#E6E6E3` | `border-border` |
| `T.line2` | `#EFEFEB` | `border-[#EFEFEB]` |
| `T.blue` | `#2563EB` | `bg-brand text-brand` |
| `T.blueS` | `#EEF2FF` | `bg-brand/10` |
| `T.blueD` | `#1E40AF` | `text-brand-dark` |
| `T.blueLt` | `#93C5FD` | `text-brand-light` |
| `T.emer` | `#059669` | `text-emerald-600` |
| `T.emerS` | `#D1FAE5` | `bg-emerald-100` |
| `T.amber` | `#B45309` | `text-amber-700` |
| `T.amberS` | `#FEF3C7` | `bg-amber-100` |
| `T.rose` | `#DC2626` | `text-red-600` |
| `T.roseS` | `#FEE2E2` | `bg-red-100` |

---

## File Map

**Create:**
- `client/src/components/ReplacesSection.tsx`
- `client/src/components/AudiencesSection.tsx`
- `client/src/components/WhatYouGetSection.tsx`

**Rewrite:**
- `client/src/components/Navbar.tsx`
- `client/src/components/HeroSection.tsx`
- `client/src/components/FeaturesSection.tsx`
- `client/src/components/DriverPortalSection.tsx`
- `client/src/components/CostCalculatorSection.tsx`
- `client/src/components/PricingSection.tsx`
- `client/src/components/FAQSection.tsx`
- `client/src/components/CTASection.tsx`
- `client/src/components/Footer.tsx`
- `client/src/pages/Home.tsx`

**Delete:**
- `client/src/components/ProblemsSection.tsx`
- `client/src/components/OwnerSection.tsx`
- `client/src/components/OSMSection.tsx`
- `client/src/components/NewFeaturesSection.tsx`
- `client/src/components/BeforeAfterSection.tsx`
- `client/src/components/MorningStoryboardSection.tsx`
- `client/src/components/VideoSection.tsx`
- `client/src/components/HowItWorksSection.tsx`
- `client/src/components/TestimonialsSection.tsx`

---

## Task 1: Navbar

**Files:**
- Modify: `client/src/components/Navbar.tsx`

- [ ] **Step 1: Replace Navbar.tsx**

```tsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dop-logo_ba62af1c.png";

const navLinks = [
  { label: "Platform", href: "#features" },
  { label: "For owners", href: "#audiences" },
  { label: "For operations", href: "#audiences" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/90 backdrop-blur-[12px] border-b border-border" : "bg-transparent"
    }`}>
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="DSPOps" className="w-9 h-9 rounded-lg" />
            <span className="text-[#111113] font-bold text-lg tracking-tight">
              DSP<span className="text-brand">Ops</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-[30px] text-sm font-medium text-[#353538]">
            {navLinks.map(l => <a key={l.href} href={l.href} className="hover:text-[#111113] transition-colors">{l.label}</a>)}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a href="#" className="text-sm font-medium text-[#353538] hover:text-[#111113] transition-colors px-2">Sign in</a>
            <a href="#book-demo" className="px-4 py-[9px] bg-[#111113] text-white rounded-lg text-sm font-semibold hover:bg-[#353538] transition-colors">
              Book demo →
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-[#111113]">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border px-4 py-4 space-y-1">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-[#353538] hover:text-[#111113] hover:bg-background rounded-lg transition-colors">
              {l.label}
            </a>
          ))}
          <div className="pt-3 border-t border-border">
            <a href="#book-demo" onClick={() => setMobileOpen(false)}
              className="block w-full text-center text-sm font-semibold text-white bg-[#111113] px-5 py-2.5 rounded-lg">
              Book demo →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd F:/Github-DOP/dop-marketing-landing-page && pnpm exec tsc --noEmit 2>&1 | head -20
```

Expected: no errors for Navbar.tsx

- [ ] **Step 3: Commit**

```bash
git add client/src/components/Navbar.tsx
git commit -m "feat(nav): v2 navbar — new links, sign in + book demo CTAs"
```

---

## Task 2: HeroSection

**Files:**
- Modify: `client/src/components/HeroSection.tsx`

The hero gets v2's headline copy and layout. The right side becomes an inline dispatch dashboard mock + floating iPhone. The existing 4 animated stat cards are **kept as-is** (not replaced with prototype's fake company metrics).

- [ ] **Step 1: Replace HeroSection.tsx**

```tsx
import { useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import Lightbox from "@/components/Lightbox";
import { Check } from "lucide-react";

const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Dashboard_c175dc22.webp";

const DRIVERS = [
  { name: "Amelia Scott", initials: "AS", route: "CA_R01", status: "Arrived", score: 94.2 },
  { name: "Marcus Okoye", initials: "MO", route: "CA_R04", status: "Arrived", score: 91.8 },
  { name: "Priya Mehta", initials: "PM", route: "CA_R07", status: "Late", score: 88.5 },
  { name: "James Callahan", initials: "JC", route: "CA_R11", status: "Arrived", score: 95.1 },
];

function HeroMock() {
  return (
    <div className="relative pr-[60px]">
      {/* Main dashboard */}
      <div className="bg-white rounded-[14px] border border-border shadow-[0_30px_60px_-20px_rgba(17,17,19,0.2)] overflow-hidden">
        {/* Browser chrome */}
        <div className="px-4 py-[11px] border-b border-border flex justify-between items-center bg-background">
          <div className="flex gap-[5px]">
            {["#F87171", "#FBBF24", "#34D399"].map(c => (
              <div key={c} className="w-[9px] h-[9px] rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="text-[11px] text-[#6C6C72] font-sans">app.dspops.co.uk</div>
          <div className="w-[30px]" />
        </div>
        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-[10px] text-[#6C6C72] uppercase tracking-[0.1em] font-sans">MON 14 APR · 06:42</div>
              <div className="text-[22px] font-bold text-[#111113] tracking-[-0.02em] mt-1">Morning Dispatch</div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-[9px] py-[3px] bg-emerald-100 text-emerald-700 rounded-full text-[11px] font-semibold">
              <span className="w-[5px] h-[5px] rounded-full bg-emerald-600" /> Live
            </div>
          </div>
          {/* Status grid */}
          <div className="grid grid-cols-3 gap-2 mb-3.5">
            {[
              { n: "38", l: "Arrived", bg: "bg-emerald-100", text: "text-emerald-600" },
              { n: "2", l: "No-show", bg: "bg-red-100", text: "text-red-600" },
              { n: "1", l: "Late", bg: "bg-amber-100", text: "text-amber-700" },
            ].map(k => (
              <div key={k.l} className={`p-3 ${k.bg} rounded-lg`}>
                <div className={`text-[28px] font-extrabold ${k.text} tracking-[-0.03em] leading-none`}>{k.n}</div>
                <div className={`text-[11px] ${k.text} mt-1.5 font-semibold`}>{k.l}</div>
              </div>
            ))}
          </div>
          {/* Driver table */}
          <div className="border border-border rounded-[10px] overflow-hidden">
            {DRIVERS.map((d, i) => (
              <div key={i} className="grid grid-cols-[2fr_1fr_0.9fr_0.6fr] px-3 py-[10px] border-b border-[#EFEFEB] last:border-0 text-xs items-center">
                <div className="flex items-center gap-[9px] text-[#111113] font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand/10 text-brand-dark text-[10px] font-bold flex items-center justify-center shrink-0">{d.initials}</div>
                  {d.name}
                </div>
                <div className="text-[#6C6C72] text-[11px]">{d.route}</div>
                <div>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    d.status === "Late" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  }`}>{d.status}</span>
                </div>
                <div className="text-right font-bold text-[#111113] tabular-nums">{d.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating iPhone */}
      <div className="absolute right-[-10px] top-20 w-[180px] bg-[#111113] rounded-[24px] p-1 shadow-[0_25px_50px_-10px_rgba(17,17,19,0.3)] border-[6px] border-[#111113]">
        <img src="/images/portal/home.jpeg" className="w-full rounded-[18px] block" alt="Driver portal" />
      </div>

      {/* Floating notification */}
      <div className="absolute left-[-24px] bottom-10 bg-white border border-border rounded-[12px] p-3 shadow-[0_15px_30px_-8px_rgba(17,17,19,0.18)] flex gap-[10px] items-center w-[240px]">
        <div className="w-[34px] h-[34px] rounded-[9px] bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <Check size={17} />
        </div>
        <div className="text-xs">
          <div className="font-semibold text-[#111113]">Payroll finalised</div>
          <div className="text-[#6C6C72] mt-[1px]">42 payslips · £24,390</div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const hours = useCountUp(3, 2000, isVisible);
  const hoursYear = useCountUp(750, 2000, isVisible);
  const platforms = useCountUp(1, 2000, isVisible);
  const roi = useCountUp(5.3, 2000, isVisible, 1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section className="bg-background border-b border-border py-[60px] pb-[80px] relative overflow-hidden">
      <div ref={ref} className="max-w-[1280px] mx-auto px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-[52px] items-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-[10px] py-2 pr-[18px] pl-2 bg-white border border-border rounded-full text-sm text-[#111113] shadow-sm">
              <span className="px-[11px] py-1 bg-brand text-white rounded-full text-[11px] font-extrabold tracking-[0.06em]">NEW</span>
              <span className="font-semibold tracking-[-0.005em]">Built for DSP 2.0</span>
              <span className="text-brand font-bold">→</span>
            </div>

            {/* Headline */}
            <h1 className="font-sans text-[56px] lg:text-[84px] font-extrabold tracking-[-0.045em] leading-[0.98] text-[#111113] mt-[22px]">
              Run your DSP<br />in <span className="text-brand">one screen.</span>
            </h1>

            {/* Description */}
            <p className="text-[17px] lg:text-[19px] leading-[1.5] text-[#6C6C72] mt-5 max-w-[500px]">
              Rota, dispatch, payroll, compliance, driver portal, van inspections — and dedicated Same-Day Delivery tooling. Built for UK Amazon DSP owners. Replace five tools, save your OSM 32 hours a week.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-[10px] mt-7 items-center">
              <a href="#book-demo" className="px-6 py-[14px] bg-brand text-white rounded-[10px] text-[15px] font-bold tracking-[-0.005em] shadow-[0_10px_24px_rgba(37,99,235,0.4)] hover:bg-brand-dark transition-colors">
                Book a demo →
              </a>
              <button onClick={() => setLightboxOpen(true)}
                className="px-[22px] py-[14px] text-[#111113] text-[15px] font-semibold flex items-center gap-2 hover:opacity-70 transition-opacity">
                <span className="w-7 h-7 rounded-full bg-[#111113] text-white inline-flex items-center justify-center text-xs">▶</span>
                Watch 2-min tour
              </button>
            </div>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap items-center gap-[18px] text-[13px] text-[#6C6C72]">
              {["Free 14-day trial", "No card", "Setup in 20 min"].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <Check size={13} className="text-emerald-600" /> {t}
                </div>
              ))}
            </div>

            {/* Stat cards (kept from current design) */}
            <div className={`mt-11 pt-7 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              {[
                { value: `${hours}+`, label: "Hours saved daily" },
                { value: `${hoursYear}+`, label: "Hours back per year" },
                { value: String(platforms), label: "Platform replaces 3+ tools" },
                { value: `${roi}x`, label: "Average ROI" },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-border/40 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200">
                  <div className="w-8 h-1 rounded-full bg-brand mb-3" style={{ opacity: 1 - i * 0.15 }} />
                  <div className="text-3xl font-extrabold text-[#111113]">{s.value}</div>
                  <div className="text-sm text-[#6C6C72] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — dispatch mock */}
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <HeroMock />
          </div>
        </div>
      </div>

      <Lightbox src={lightboxOpen ? DASHBOARD_IMG : null} alt="DSPOps Dashboard" onClose={() => setLightboxOpen(false)} />
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm exec tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/HeroSection.tsx
git commit -m "feat(hero): v2 hero — 84px headline, inline dispatch mock, floating iPhone + notification"
```

---

## Task 3: ReplacesSection (new — most complex)

**Files:**
- Create: `client/src/components/ReplacesSection.tsx`

This section animates 5 "chaos" document mockups (WhatsApp chat, Excel rota, Post-it, Sage invoice, Cortex scorecard) that visually collapse into a single DSPOps panel as the user scrolls. Uses Framer Motion `useScroll` + chained `useTransform` calls. The collapse starts when `scrollYProgress` reaches 0.45 through the section and completes at 0.70.

- [ ] **Step 1: Create ReplacesSection.tsx**

```tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// ── Artifact definitions ──────────────────────────────────────────
const ARTIFACTS = [
  { kind: "whatsapp", x: -10, y: 10, rot: -7, z: 1 },
  { kind: "excel", x: 210, y: 40, rot: 4, z: 2 },
  { kind: "postit", x: 90, y: 180, rot: -3, z: 3 },
  { kind: "invoice", x: 280, y: 220, rot: 6, z: 4 },
  { kind: "scorecard", x: 30, y: 340, rot: -4, z: 5 },
] as const;

const COLLAPSE_X = 520;
const COLLAPSE_Y = 220;

// ── Per-artifact animated wrapper ─────────────────────────────────
function ArtifactWrapper({
  artifact,
  index,
  ease,
  children,
}: {
  artifact: (typeof ARTIFACTS)[number];
  index: number;
  ease: MotionValue<number>;
  children: React.ReactNode;
}) {
  const artP = useTransform(ease, (e: number) =>
    Math.max(0, Math.min(1, (e - index * 0.08) / 0.6))
  );
  const left = useTransform(artP, (p: number) => artifact.x + (COLLAPSE_X - artifact.x) * p);
  const top = useTransform(artP, (p: number) => artifact.y + (COLLAPSE_Y - artifact.y) * p);
  const rotate = useTransform(artP, (p: number) => artifact.rot * (1 - p));
  const opacity = useTransform(artP, (p: number) => Math.max(0, 1 - p * 1.15));
  const scale = useTransform(artP, (p: number) => 1 - p * 0.5);

  return (
    <motion.div style={{ position: "absolute", left, top, rotate, opacity, scale, zIndex: artifact.z }}>
      {children}
    </motion.div>
  );
}

// ── Artifact content components ───────────────────────────────────
function WhatsAppMock() {
  return (
    <div className="w-[280px] bg-[#ECE5DD] rounded-[10px] border border-border overflow-hidden shadow-[0_8px_20px_-8px_rgba(17,17,19,0.18)]">
      <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#075E54] text-white">
        <div className="w-[30px] h-[30px] rounded-full bg-[#25D366] flex items-center justify-center text-[11px] font-bold">DG</div>
        <div>
          <div className="text-[13px] font-semibold leading-tight">Drivers Group</div>
          <div className="text-[10px] opacity-75 mt-0.5">19 members · online</div>
        </div>
        <div className="ml-auto text-sm opacity-85">⋮</div>
      </div>
      <div className="p-3 space-y-[5px]">
        <div className="bg-white text-[#111113] px-[10px] py-1.5 rounded-lg text-xs max-w-[85%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">Can't make it, kids sick 🤒</div>
        <div className="bg-white text-[#111113] px-[10px] py-1.5 rounded-lg text-xs max-w-[70%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">Who's taking CA_R07??</div>
        <div className="bg-[#DCF8C6] text-[#111113] px-[10px] py-1.5 rounded-lg text-xs max-w-[55%] ml-auto shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">Van 4 flat tyre</div>
        <div className="text-[10px] text-[#25D366] font-bold text-right mt-2">+ 47 unread</div>
      </div>
    </div>
  );
}

function ExcelMock() {
  const rows = [
    ["Name", "Mon", "Tue", "Wed", "Thu"],
    ["A.Scott", "07:00", "07:00", "OFF", "07:00"],
    ["M.Okoye", "07:00", "#REF!", "07:00", "07:00"],
    ["P.Mehta", "OFF", "07:00", "07:00", "OFF"],
    ["J.Callahan", "07:00", "07:00", "07:00", "07:00"],
  ];
  return (
    <div className="w-[340px] bg-white border border-border rounded-[4px] overflow-hidden shadow-[0_8px_20px_-8px_rgba(17,17,19,0.18)]">
      <div className="bg-[#217346] px-[10px] py-1.5 text-[11px] text-white font-semibold flex items-center gap-2">
        <div className="w-4 h-4 bg-white text-[#217346] rounded-[2px] flex items-center justify-center text-[11px] font-black">X</div>
        rota_v17_FINAL_USE_THIS.xlsx
        <span className="ml-auto opacity-80">— Excel</span>
      </div>
      <div className="text-[10px]">
        {rows.map((row, ri) => (
          <div key={ri} className="grid border-b border-[#EEE] last:border-0" style={{ gridTemplateColumns: "28px repeat(4, 1fr)" }}>
            <div className="bg-[#F7F6F2] px-1.5 py-[5px] text-[#6C6C72] border-r border-[#EEE] text-center">{ri + 1}</div>
            {row.map((cell, ci) => (
              <div key={ci} className={`px-1.5 py-[5px] border-r border-[#EEE] last:border-0 font-mono ${
                cell === "#REF!" ? "text-red-600 bg-red-50" : ri === 0 ? "font-semibold text-[#353538]" : "text-[#111113]"
              }`}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PostItMock() {
  return (
    <div className="w-[180px] bg-[#FDE68A] p-4 shadow-[0_8px_20px_-8px_rgba(17,17,19,0.18)]" style={{ fontFamily: '"Comic Sans MS", cursive', fontSize: 18, lineHeight: 1.3, color: "#1F1F1F" }}>
      Samsara login<br />
      <span style={{ textDecoration: "line-through", opacity: 0.6 }}>drivers2024</span><br />
      <span style={{ fontWeight: 700, color: "#DC2626" }}>Dr1vers!25</span><br />
      <span style={{ fontSize: 13, opacity: 0.7 }}>(ask Mike?)</span>
    </div>
  );
}

function InvoiceMock() {
  return (
    <div className="w-[240px] bg-white border border-border overflow-hidden shadow-[0_8px_20px_-8px_rgba(17,17,19,0.18)] relative">
      <div className="bg-[#00D639] px-[14px] py-2 flex items-center gap-2">
        <span className="text-[13px] font-black text-[#00261C]">Sage</span>
        <span className="text-[9px] text-[#00261C] opacity-70 tracking-[0.1em] uppercase font-semibold">Payroll</span>
      </div>
      <div className="p-4">
        <div className="text-[9px] tracking-[0.14em] text-[#6C6C72] uppercase">Invoice #P-1427</div>
        <div className="text-[15px] font-bold text-[#111113] mt-1">Week 14 Payroll</div>
        <div className="mt-2.5 text-[11px] text-[#353538] space-y-1">
          <div>22 drivers · 1,732 hrs</div>
          <div>Overtime adj: <span className="text-red-600 font-bold">± £340?</span></div>
          <div className="font-bold text-[#111113] mt-1.5">£17,340</div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2.5 text-[28px] text-red-600/30 font-extrabold rotate-[-15deg] tracking-[0.1em]">RE-DO</div>
    </div>
  );
}

function ScorecardMock() {
  return (
    <div className="w-[260px] bg-white border border-border overflow-hidden shadow-[0_8px_20px_-8px_rgba(17,17,19,0.18)]">
      <div className="bg-[#232F3E] px-[14px] py-2 flex items-center gap-2">
        <span className="text-[12px] font-bold text-white">Cortex</span>
        <div className="w-px h-[10px] bg-white/25" />
        <span className="text-[10px] text-[#FF9900] font-semibold tracking-[0.08em] uppercase">Driver Scorecard</span>
      </div>
      <div className="p-3.5">
        <div className="text-[9px] tracking-[0.14em] text-[#6C6C72] uppercase mb-2">Week 14 · Printed</div>
        <div className="grid grid-cols-2 gap-1.5 text-xs text-[#353538]">
          <div>Delivered</div><div className="font-bold text-[#111113] tabular-nums text-right">98.2%</div>
          <div>DCR</div><div className="font-bold text-[#111113] tabular-nums text-right">94.1%</div>
          <div>On-time</div><div className="font-bold text-amber-700 tabular-nums text-right">91.4%</div>
        </div>
        <div className="mt-2.5 text-[11px] text-red-600 italic">"why is mine wrong again?" — James</div>
      </div>
    </div>
  );
}

// ── DSPOps result panel (right side, fades in as chaos collapses) ──
function DSPOpsPanel({ ease }: { ease: MotionValue<number> }) {
  const translateY = useTransform(ease, (e: number) => `${(1 - e) * 20}px`);
  const scale = useTransform(ease, (e: number) => 0.97 + e * 0.03);
  const opacity = useTransform(ease, (e: number) => 0.6 + e * 0.4);

  const rows = [
    { k: "Messages", v: "3 flagged", sub: "WhatsApp feed merged", color: "bg-brand" },
    { k: "Rota", v: "Auto-rebuilt", sub: "2 reassignments done", color: "bg-emerald-600" },
    { k: "Van checks", v: "21 / 22", sub: "Van 4 flagged by Priya", color: "bg-amber-500" },
    { k: "Payroll", v: "Week 14 ready", sub: "Export in 1 click", color: "bg-[#353538]" },
    { k: "Scorecards", v: "Live from Cortex", sub: "Drivers can see own", color: "bg-brand-dark" },
  ];

  return (
    <motion.div style={{ translateY, scale, opacity }}
      className="bg-white rounded-[16px] border border-border shadow-[0_30px_60px_-20px_rgba(17,17,19,0.12)] overflow-hidden">
      {/* chrome */}
      <div className="px-[18px] py-3 border-b border-border flex items-center gap-2.5 bg-background">
        <div className="w-[22px] h-[22px] rounded-[6px] bg-[#111113] text-white flex items-center justify-center text-[11px] font-extrabold tracking-[-0.05em]">D</div>
        <div className="text-[13px] font-bold text-[#111113]">DSPOps · Morning</div>
        <div className="ml-auto flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Live · 06:42
        </div>
      </div>
      {/* rows */}
      <div className="p-6 flex flex-col gap-3.5">
        {rows.map((row, i) => {
          const rowOpacity = useTransform(ease, (e: number) =>
            Math.max(0, Math.min(1, (e - 0.3 - i * 0.08) / 0.25))
          );
          const rowX = useTransform(ease, (e: number) =>
            `${(1 - Math.max(0, Math.min(1, (e - 0.3 - i * 0.08) / 0.25))) * 12}px`
          );
          return (
            <motion.div key={i} style={{ opacity: rowOpacity, translateX: rowX }}
              className="grid grid-cols-[110px_1fr_auto] gap-4 items-center pb-3.5 border-b border-[#EFEFEB] last:border-0 last:pb-0">
              <div className="text-[11px] font-semibold text-[#6C6C72] uppercase tracking-[0.1em]">{row.k}</div>
              <div>
                <div className="text-[15px] font-bold text-[#111113] tracking-[-0.01em]">{row.v}</div>
                <div className="text-[12px] text-[#6C6C72] mt-0.5">{row.sub}</div>
              </div>
              <div className={`w-2 h-2 rounded-full ${row.color}`} />
            </motion.div>
          );
        })}
      </div>
      {/* footer */}
      <div className="px-6 py-3 bg-[#111113] text-white flex items-center justify-between text-[12px]">
        <span className="font-semibold">5 tools → 1 screen → 1 login</span>
        <span className="opacity-70">Monday handled by 07:00</span>
      </div>
    </motion.div>
  );
}

// ── Progress arrow (middle column) ────────────────────────────────
function ProgressArrow({ ease }: { ease: MotionValue<number> }) {
  const lineHeight = useTransform(ease, (e: number) => e * 170);
  return (
    <div className="h-full flex flex-col items-center justify-center gap-3">
      <div className="text-[10px] font-bold text-[#6C6C72] tracking-[0.2em] uppercase" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>DSPOps</div>
      <svg width="40" height="180" viewBox="0 0 40 180" style={{ overflow: "visible" }}>
        <line x1="20" y1="0" x2="20" y2="170" stroke="#E6E6E3" strokeWidth="2" />
        <motion.line x1="20" y1="0" x2="20" y2={lineHeight as any} stroke="#2563EB" strokeWidth="2" />
      </svg>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────
export default function ReplacesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawProgress = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const ease = useTransform(rawProgress, (p: number) =>
    1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3)
  );

  return (
    <section ref={sectionRef} className="bg-background py-[140px] border-b border-border overflow-hidden relative">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#E6E6E3 1px, transparent 1px), linear-gradient(90deg, #E6E6E3 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-8 relative">
        {/* Section header */}
        <div className="mb-[72px]">
          <div className="text-[12px] font-semibold text-[#6C6C72] uppercase tracking-[0.2em] mb-5 flex items-center gap-3">
            <span className="w-7 h-px bg-[#111113]" />
            CHAPTER 01 · The morning you lose
          </div>
          <h2 className="font-sans text-[72px] lg:text-[108px] font-extrabold text-[#111113] tracking-[-0.045em] leading-[0.92] max-w-[1100px]">
            Five apps.<br />
            <span className="relative inline-block">
              Three WhatsApps.
              <svg className="absolute left-[-8px] bottom-[-14px]" style={{ width: "calc(100% + 16px)", height: 20 }} viewBox="0 0 600 20" preserveAspectRatio="none">
                <path d="M5 12 Q 150 3, 300 10 T 595 11" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            <span className="italic font-medium text-[#353538]">One printer that jams.</span>
          </h2>
          <div className="mt-10 grid grid-cols-[1fr_auto_1fr] gap-12 items-start max-w-[1100px]">
            <p className="text-[18px] text-[#353538] leading-[1.55] max-w-[460px]">
              Before 9 AM on a Monday your OSM has switched apps seventeen times, typed the same driver's name into four different spreadsheets, and answered the phone while doing both.
            </p>
            <div className="self-stretch w-px bg-border" />
            <div>
              <div className="text-[68px] font-extrabold text-[#111113] tracking-[-0.04em] leading-[0.95] tabular-nums">
                32<span className="text-[28px] font-semibold text-[#6C6C72] tracking-normal"> hrs/wk</span>
              </div>
              <div className="text-[14px] text-[#6C6C72] mt-2.5 max-w-[320px] leading-[1.5]">
                lost per station to the pile below. Unbilled. Uncharted. Just… Tuesday.
              </div>
            </div>
          </div>
        </div>

        {/* Animation stage: chaos → order */}
        <div className="grid mb-24" style={{ gridTemplateColumns: "1fr 60px 1fr", alignItems: "center", minHeight: 560 }}>
          {/* LEFT: artifact pile */}
          <div style={{ position: "relative", height: 520 }}>
            <div className="absolute top-[-24px] left-0 text-[11px] font-bold text-red-600 tracking-[0.18em] uppercase">Before · 06:42 MON</div>
            {ARTIFACTS.map((a, i) => (
              <ArtifactWrapper key={i} artifact={a} index={i} ease={ease}>
                {a.kind === "whatsapp" && <WhatsAppMock />}
                {a.kind === "excel" && <ExcelMock />}
                {a.kind === "postit" && <PostItMock />}
                {a.kind === "invoice" && <InvoiceMock />}
                {a.kind === "scorecard" && <ScorecardMock />}
              </ArtifactWrapper>
            ))}
          </div>

          {/* MIDDLE: progress arrow */}
          <ProgressArrow ease={ease} />

          {/* RIGHT: DSPOps panel */}
          <div className="relative">
            <div className="absolute top-[-24px] right-0 text-[11px] font-bold text-brand tracking-[0.18em] uppercase">After · One screen</div>
            <DSPOpsPanel ease={ease} />
          </div>
        </div>

        {/* Payoff band */}
        <div className="bg-[#111113] text-white rounded-[20px] px-[52px] py-12 grid gap-9 relative overflow-hidden"
          style={{ gridTemplateColumns: "1.4fr 1px 1fr 1px 1fr" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative">
            <div className="text-[11px] font-bold text-brand-light tracking-[0.22em] uppercase mb-3.5 flex items-center gap-2.5">
              <span className="w-6 h-px bg-brand-light" /> So, Monday becomes…
            </div>
            <div className="flex items-baseline gap-2.5">
              <div className="text-[80px] lg:text-[120px] font-extrabold tracking-[-0.05em] leading-[0.85] tabular-nums">+£13,400</div>
              <div className="text-[22px] text-white/55 font-medium">/yr</div>
            </div>
            <p className="text-[15px] text-white/70 mt-4.5 max-w-[440px] leading-[1.55]">
              saved on duplicate tools plus OSM hours clawed back from re-keying.{" "}
              <a href="#calculator" className="text-brand-light underline font-semibold">Run your own numbers →</a>
            </p>
          </div>
          <div className="self-stretch bg-white/12" />
          <div className="relative">
            <div className="text-[11px] font-bold text-white/50 tracking-[0.22em] uppercase mb-3.5">Payback</div>
            <div className="text-[68px] font-extrabold tracking-[-0.04em] leading-[0.9]">~3 wks</div>
            <p className="text-[13px] text-white/60 mt-3.5 leading-[1.5]">Break-even on Professional for most DSPs.</p>
          </div>
          <div className="self-stretch bg-white/12" />
          <div className="relative">
            <div className="text-[11px] font-bold text-white/50 tracking-[0.22em] uppercase mb-3.5">Logins · bills</div>
            <div className="text-[68px] font-extrabold tracking-[-0.04em] leading-[0.9]">5 <span className="text-brand-light">→</span> 1</div>
            <p className="text-[13px] text-white/60 mt-3.5 leading-[1.5]">One platform, one invoice, one login.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify — check Framer Motion imports resolve**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -i "ReplacesSection\|framer"
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/ReplacesSection.tsx
git commit -m "feat(replaces): scroll-linked chaos→DSPOps animation with 5 artifact mockups"
```

---

## Task 4: AudiencesSection (new)

**Files:**
- Create: `client/src/components/AudiencesSection.tsx`

Uses shadcn/ui `Tabs` (already in `client/src/components/ui/tabs.tsx`). Two tabs: DSP Owner (blue) and Operations Manager (navy). Each tab has a colored left panel with metrics 2×2 and a right timeline panel.

- [ ] **Step 1: Create AudiencesSection.tsx**

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const OWNER = {
  name: "Alex", role: "DSP Owner", fleet: "3 stations · 64 drivers",
  headline: "Fleet performance at a glance. No more Sunday-night spreadsheet forensics.",
  metrics: [
    { l: "Tools consolidated", v: "5 → 1", d: "£3,240/yr saved" },
    { l: "OSM hours recovered", v: "32 hrs/wk", d: "Per station, typical" },
    { l: "New station rollout", v: "20 min", d: "From zero to dispatching" },
    { l: "Compliance alerts", v: "↗ 12", d: "Before Amazon flagged us" },
  ],
  schedule: [
    { t: "07:15", evt: "Opens fleet dashboard", tag: "One login" },
    { t: "07:20", evt: "Spots Station B below 94% — calls OSM", tag: "Proactive" },
    { t: "12:00", evt: "Reviews weekly payroll export", tag: "One click" },
    { t: "18:00", evt: "Approves next week rota from phone", tag: "Mobile" },
  ],
  panelBg: "bg-brand",
  accent: "text-brand-light",
  accentBg: "bg-brand-light",
  tagBg: "bg-brand/10",
  tagText: "text-brand-dark",
  dot: "bg-brand",
  cta: "Owner demo",
  ctaBg: "bg-brand",
};

const OSM = {
  name: "Priya", role: "Operations Manager", fleet: "Station A · 22 drivers",
  headline: "Close WhatsApp. Dispatch by 08:30. Actually leave the depot on time.",
  metrics: [
    { l: "Weekly hours back", v: "32 hrs", d: "Rota + payroll + chaos" },
    { l: "Dispatch time", v: "08:30", d: "Down from 09:45" },
    { l: "Driver calls answered", v: "−68%", d: "They use the portal" },
    { l: "Monday start", v: "Calm", d: "Not a spreadsheet rebuild" },
  ],
  schedule: [
    { t: "06:42", evt: "Morning Dispatch — 38 arrived, 2 no-shows", tag: "One screen" },
    { t: "07:10", evt: "Reassigns 2 routes via drag-and-drop", tag: "Fast" },
    { t: "08:30", evt: "All waves out — SDD + standard", tag: "On time" },
    { t: "16:00", evt: "Payroll auto-runs. Leaves at 17:00", tag: "Home" },
  ],
  panelBg: "bg-[#111113]",
  accent: "text-emerald-400",
  accentBg: "bg-emerald-400",
  tagBg: "bg-emerald-100",
  tagText: "text-emerald-800",
  dot: "bg-emerald-500",
  cta: "OSM walkthrough",
  ctaBg: "bg-[#111113]",
};

function PersonaPanel({ p }: { p: typeof OWNER | typeof OSM }) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] border border-border rounded-[20px] overflow-hidden min-h-[520px]`}>
      {/* Left: colored panel */}
      <div className={`${p.panelBg} text-white p-10 flex flex-col relative overflow-hidden`}>
        <div className="absolute right-[-80px] top-[-80px] w-[300px] h-[300px] rounded-full bg-white/10 blur-2xl pointer-events-none" />
        {/* Persona header */}
        <div className="flex items-center gap-3.5 relative">
          <div className="w-[52px] h-[52px] rounded-full bg-white/15 border-2 border-white/25 flex items-center justify-center text-[20px] font-extrabold">
            {p.name[0]}
          </div>
          <div>
            <div className="text-[18px] font-bold tracking-[-0.015em]">{p.name}</div>
            <div className={`text-[11px] ${p.accent} uppercase tracking-[0.1em] mt-0.5`}>{p.role}</div>
          </div>
        </div>
        {/* Headline */}
        <h3 className="relative text-[28px] font-extrabold tracking-[-0.03em] leading-[1.1] mt-7 max-w-[420px]">{p.headline}</h3>
        {/* Metrics 2×2 */}
        <div className="relative mt-auto pt-9 grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          {p.metrics.map((m, i) => (
            <div key={i} className="px-5 py-[18px] bg-white/4 backdrop-blur-sm">
              <div className={`text-[10px] ${p.accent} uppercase tracking-[0.1em]`}>{m.l}</div>
              <div className="text-[28px] font-extrabold tracking-[-0.025em] mt-1 leading-none">{m.v}</div>
              <div className="text-[11px] text-white/65 mt-1">{m.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: timeline */}
      <div className="bg-white p-10 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="text-[11px] text-[#6C6C72] uppercase tracking-[0.12em] font-semibold">A DAY WITH DSPOps</div>
          <div className={`flex items-center gap-1.5 px-[10px] py-1 ${p.tagBg} ${p.tagText} rounded-full text-[11px] font-bold`}>
            <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} /> Live now
          </div>
        </div>
        <div className="relative flex-1">
          <div className="absolute left-8 top-1.5 bottom-1.5 w-0.5 bg-border" />
          {p.schedule.map((s, i) => (
            <div key={i} className="grid mb-6 last:mb-0 relative" style={{ gridTemplateColumns: "72px 1fr", gap: 18 }}>
              <div className="text-[13px] font-bold text-[#111113] text-right pt-1 tabular-nums">{s.t}</div>
              <div className="relative">
                <div className={`absolute left-[-26px] top-1.5 w-3 h-3 rounded-full ${p.dot} border-[3px] border-white shadow-sm`} />
                <div className="px-4 py-3 bg-background border border-border rounded-[10px]">
                  <div className="text-[14px] text-[#111113] font-semibold tracking-[-0.01em]">{s.evt}</div>
                  <div className={`inline-flex items-center mt-1.5 px-2 py-0.5 ${p.tagBg} ${p.tagText} rounded-full text-[10px] font-semibold uppercase tracking-[0.06em]`}>
                    {s.tag}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <a href="#book-demo" className={`mt-7 px-5 py-[13px] ${p.ctaBg} text-white rounded-[10px] text-[14px] font-bold self-start inline-flex items-center gap-2 hover:opacity-80 transition-opacity`}>
          {p.cta} <span className="text-[15px]">→</span>
        </a>
      </div>
    </div>
  );
}

export default function AudiencesSection() {
  return (
    <section id="audiences" className="bg-background py-[100px] border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3.5">— WHO IT'S FOR</div>
          <div className="flex items-end justify-between gap-10 flex-wrap">
            <h2 className="text-[52px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02]">Two people, one platform.</h2>
            <p className="text-[17px] text-[#6C6C72] leading-[1.55] max-w-[420px]">The Owner makes the call. The OSM lives in it. Both see the same truth.</p>
          </div>
        </div>

        <Tabs defaultValue="owner">
          <TabsList className="mb-5 p-1 bg-white border border-border rounded-xl gap-1 h-auto">
            <TabsTrigger value="owner"
              className="flex items-center gap-3 px-[18px] py-3 rounded-[9px] data-[state=active]:bg-background data-[state=active]:border data-[state=active]:border-border data-[state=active]:shadow-sm text-left">
              <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center text-xs font-bold shrink-0">👤</div>
              <div>
                <div className="text-[14px] font-bold text-[#111113]">DSP Owner</div>
                <div className="text-[10px] text-[#6C6C72] mt-0.5 tabular-nums">{OWNER.fleet}</div>
              </div>
            </TabsTrigger>
            <TabsTrigger value="osm"
              className="flex items-center gap-3 px-[18px] py-3 rounded-[9px] data-[state=active]:bg-background data-[state=active]:border data-[state=active]:border-border data-[state=active]:shadow-sm text-left">
              <div className="w-8 h-8 rounded-lg bg-[#111113] text-white flex items-center justify-center text-xs font-bold shrink-0">⚙</div>
              <div>
                <div className="text-[14px] font-bold text-[#111113]">Operations Manager</div>
                <div className="text-[10px] text-[#6C6C72] mt-0.5 tabular-nums">{OSM.fleet}</div>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="owner"><PersonaPanel p={OWNER} /></TabsContent>
          <TabsContent value="osm"><PersonaPanel p={OSM} /></TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -i "AudiencesSection"
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/AudiencesSection.tsx
git commit -m "feat(audiences): tabbed owner/OSM view with day-in-the-life timelines"
```

---

## Task 5: FeaturesSection

**Files:**
- Modify: `client/src/components/FeaturesSection.tsx`

Nine clickable module buttons. Clicking shows a left description panel and a right inline preview (JSX mock panels, no external images except for portal/payroll/scorecards which use existing `/images/portal/*.jpeg`).

- [ ] **Step 1: Replace FeaturesSection.tsx**

```tsx
import { useState } from "react";
import { Calendar, Sunrise, Smartphone, PoundSterling, BarChart2, Truck, Shield, Zap, Activity } from "lucide-react";

const MODULES = [
  { key: "rota", name: "Rota", short: "Scheduling", blurb: "Drag-to-assign routes. Conflict detection. Driver availability baked in.", icon: Calendar, saved: "9hr/wk" },
  { key: "dispatch", name: "Dispatch", short: "Morning", blurb: "Mark arrivals, hand out keys, track no-shows in under 30 minutes.", icon: Sunrise, saved: "4hr/wk" },
  { key: "portal", name: "Portal", short: "Driver app", blurb: "Every driver gets their own app. Rota, payslips, scorecards, van inspections.", icon: Smartphone, saved: "3hr/wk" },
  { key: "payroll", name: "Payroll", short: "& Invoices", blurb: "Pay calculated from shift data. One-click export for your accountant.", icon: PoundSterling, saved: "6hr/wk" },
  { key: "scorecards", name: "Scorecards", short: "Cortex", blurb: "Amazon Cortex metrics live. Drivers see their score — so you stop getting asked.", icon: BarChart2, saved: "3hr/wk" },
  { key: "damage", name: "Van Condition", short: "Inspections", blurb: "Daily van check-ins with photo + timestamp. Replace your £249/mo third-party inspection app.", icon: Truck, saved: "£249/mo" },
  { key: "compliance", name: "Compliance", short: "Docs", blurb: "Licences, right-to-work, insurance — expiries tracked. Auto-reminders.", icon: Shield, saved: "2hr/wk" },
  { key: "sdd", name: "Same-Day", short: "SDD waves", blurb: "Purpose-built for DSPs running SDD. Separate wave view, tighter SLAs, late-stop alerts — all live from Cortex.", icon: Zap, saved: "SLA risk ↓" },
  { key: "tracking", name: "Tracking", short: "Live", blurb: "Live delivery progress from Cortex, surfaced to drivers so they know where they stand.", icon: Activity, saved: "2hr/wk" },
] as const;

function ModulePreview({ moduleKey }: { moduleKey: string }) {
  if (moduleKey === "portal") {
    return <img src="/images/portal/home.jpeg" className="max-h-[440px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]" alt="Driver portal" />;
  }
  if (moduleKey === "payroll") {
    return <img src="/images/portal/invoice.jpeg" className="max-h-[440px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]" alt="Payslip" />;
  }
  if (moduleKey === "scorecards") {
    return <img src="/images/portal/scorecards.jpeg" className="max-h-[440px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]" alt="Scorecards" />;
  }
  if (moduleKey === "rota") {
    return (
      <div className="w-full max-w-[420px] bg-white rounded-xl border border-border p-5">
        <div className="text-[13px] font-bold text-[#111113] mb-3.5">Week 3 · Apr 12 – 18</div>
        <div className="grid grid-cols-7 gap-1">
          {["M","T","W","T","F","S","S"].map((d, i) => (
            <div key={i} className="p-2 bg-background rounded-md border border-border">
              <div className="text-[10px] text-[#6C6C72] font-semibold mb-1.5">{d}</div>
              {[0,1,2,3].map(r => (
                <div key={r} className={`h-3 rounded-sm mb-[3px] border ${
                  i >= 5 ? "bg-emerald-100 border-emerald-200" : "bg-brand/10 border-brand/20"
                }`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (moduleKey === "dispatch") {
    return (
      <div className="w-full max-w-[440px] bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border text-[13px] font-bold text-[#111113]">Dispatch · 38/42 arrived</div>
        {[
          { name: "Amelia Scott · CA_R01", s: "a" },
          { name: "Marcus Okoye · CA_R04", s: "a" },
          { name: "Priya Mehta · CA_R07", s: "l" },
          { name: "James Callahan · CA_R11", s: "a" },
          { name: "Sofia Delgado · CA_R14", s: "n" },
        ].map((x, i) => (
          <div key={i} className="px-4 py-[11px] border-b border-[#EFEFEB] last:border-0 flex justify-between items-center text-xs">
            <span className="text-[#111113] font-mono">{x.name}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              x.s === "a" ? "bg-emerald-100 text-emerald-700" : x.s === "l" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"
            }`}>{x.s === "a" ? "Arrived" : x.s === "l" ? "Late" : "No-show"}</span>
          </div>
        ))}
      </div>
    );
  }
  if (moduleKey === "damage") {
    return (
      <div className="w-full max-w-[420px] grid grid-cols-3 gap-2">
        {[0,1,2,3,4,5].map(i => (
          <div key={i} className="aspect-square bg-gradient-to-br from-[#EFEFEB] to-border rounded-lg relative border border-border">
            <div className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
              i < 2 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
            }`}>{i < 2 ? "ATTN" : "CLEAN"}</div>
          </div>
        ))}
      </div>
    );
  }
  if (moduleKey === "compliance") {
    return (
      <div className="w-full max-w-[400px] bg-white rounded-xl border border-border overflow-hidden">
        {[
          { n: "Driving licence", d: "Expires Feb 2027", ok: true },
          { n: "Right to work", d: "Expires May 2028", ok: true },
          { n: "Insurance", d: "Expires in 14 days", ok: false },
          { n: "DBS check", d: "Up to date", ok: true },
        ].map((x, i, arr) => (
          <div key={i} className="px-4 py-3.5 border-b border-[#EFEFEB] last:border-0 flex justify-between items-center">
            <div>
              <div className="text-[14px] font-semibold text-[#111113]">{x.n}</div>
              <div className="text-[12px] text-[#6C6C72] mt-0.5">{x.d}</div>
            </div>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
              x.ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}>
              {x.ok ? "✓" : "!"}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (moduleKey === "sdd") {
    return (
      <div className="w-full max-w-[440px] bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex justify-between items-center">
          <div className="text-[13px] font-bold text-[#111113]">Same-Day · Wave 3</div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-[11px] font-bold">
            ⏰ SLA 14:30
          </div>
        </div>
        <div className="px-4 py-2 bg-red-50 border-b border-[#EFEFEB] flex items-center gap-2 text-[12px] text-red-600 font-semibold">
          ⚡ 2 routes at risk — reassign or extend window
        </div>
        {[
          { r: "SDD_R14", d: "Priya M.", stops: "18/24", eta: "14:12", s: "risk" },
          { r: "SDD_R15", d: "Marcus O.", stops: "22/22", eta: "13:48", s: "done" },
          { r: "SDD_R16", d: "Amelia S.", stops: "9/21", eta: "14:55", s: "late" },
          { r: "SDD_R17", d: "James C.", stops: "15/19", eta: "14:22", s: "live" },
        ].map((x, i, arr) => {
          const colors = { done: "bg-emerald-100 text-emerald-700", late: "bg-red-100 text-red-600", risk: "bg-amber-100 text-amber-700", live: "bg-brand/10 text-brand" };
          return (
            <div key={i} className="px-4 py-3 border-b border-[#EFEFEB] last:border-0 grid grid-cols-[1.1fr_1fr_0.9fr_0.7fr] items-center text-xs">
              <span className="text-[#111113] font-mono font-semibold">{x.r}</span>
              <span className="text-[#353538]">{x.d}</span>
              <span className="text-[#6C6C72] tabular-nums">{x.stops}</span>
              <span className={`justify-self-end px-2 py-0.5 rounded-full text-[10px] font-bold ${colors[x.s as keyof typeof colors]}`}>{x.eta}</span>
            </div>
          );
        })}
      </div>
    );
  }
  // tracking
  return (
    <div className="w-full max-w-[400px] bg-white rounded-xl border border-border p-5">
      {[
        { l: "Wave 1 · CA_R01", p: 78 }, { l: "Wave 1 · CA_R04", p: 92 },
        { l: "Wave 2 · CA_R07", p: 45 }, { l: "Wave 2 · CA_R11", p: 32 }, { l: "SDD · CA_R14", p: 12 },
      ].map((x, i) => (
        <div key={i} className="mb-3.5 last:mb-0">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-[#353538] font-mono">{x.l}</span>
            <span className="text-[#111113] font-bold">{x.p}%</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-brand rounded-full" style={{ width: `${x.p}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FeaturesSection() {
  const [active, setActive] = useState(0);
  const m = MODULES[active];
  const Icon = m.icon;

  return (
    <section id="features" className="bg-white py-[100px] border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3.5">— PLATFORM</div>
          <div className="flex items-end justify-between gap-10 flex-wrap">
            <h2 className="text-[52px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02]">Nine modules. One login. Zero spreadsheets.</h2>
            <p className="text-[17px] text-[#6C6C72] leading-[1.55] max-w-[420px]">Every module built specifically for how Amazon DSPs run — including dedicated Same-Day Delivery support.</p>
          </div>
        </div>

        {/* Module pill row */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2 text-[11px] text-[#6C6C72] uppercase tracking-[0.12em]">
            <span className="px-[9px] py-1 bg-[#111113] text-white rounded-full text-[10px] font-bold">TAP TO EXPLORE</span>
            <span>← select a module →</span>
          </div>
          <div className="text-[11px] text-[#6C6C72] tabular-nums">0{active+1} / 09</div>
        </div>

        <div className="bg-background rounded-[16px] border border-border p-2 grid gap-1 mb-4.5"
          style={{ gridTemplateColumns: "repeat(9, 1fr)" }}>
          {MODULES.map((mod, i) => {
            const Ic = mod.icon;
            return (
              <button key={mod.key} onClick={() => setActive(i)}
                className={`py-4 px-2 flex flex-col items-center gap-2 rounded-[11px] text-[12px] font-semibold transition-all duration-150 relative ${
                  active === i
                    ? "bg-brand text-white border border-brand shadow-[0_6px_16px_rgba(37,99,235,0.35)]"
                    : "bg-white text-[#353538] border border-border shadow-[0_1px_2px_rgba(17,17,19,0.04)] hover:bg-background"
                }`}>
                <Ic size={22} />
                <div className="text-center leading-tight">{mod.name}</div>
                {active === i && (
                  <div className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-brand" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-4">
          <div className="bg-background rounded-[16px] border border-border p-9 flex flex-col">
            <div className="text-[11px] text-[#6C6C72] uppercase tracking-[0.1em]">MODULE · 0{active+1}/09 · {m.short.toUpperCase()}</div>
            <h3 className="text-[44px] font-extrabold text-[#111113] tracking-[-0.03em] leading-[1.02] mt-3">{m.name}</h3>
            <p className="text-[17px] text-[#353538] leading-[1.55] mt-4">{m.blurb}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Built for Amazon DSPs", "Mobile + web", "CSV export", "Live sync"].map(t => (
                <span key={t} className="px-3 py-1.5 bg-white border border-border rounded-full text-[12px] font-medium text-[#353538]">{t}</span>
              ))}
            </div>
            <div className="mt-7 pt-5 border-t border-border grid grid-cols-2 gap-6">
              <div>
                <div className="text-[11px] text-[#6C6C72] uppercase tracking-[0.1em]">TIME SAVED</div>
                <div className="text-[22px] font-extrabold text-[#111113] tracking-[-0.02em] mt-1">{m.saved}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#6C6C72] uppercase tracking-[0.1em]">WORKS WITH</div>
                <div className="text-[22px] font-extrabold text-[#111113] tracking-[-0.02em] mt-1">Amazon Cortex</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-background to-border/40 rounded-[16px] border border-border p-9 min-h-[480px] flex items-center justify-center">
            <ModulePreview moduleKey={m.key} />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -i "FeaturesSection"
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/FeaturesSection.tsx
git commit -m "feat(features): 9 clickable modules with inline previews and SDD wave module"
```

---

## Task 6: DriverPortalSection

**Files:**
- Modify: `client/src/components/DriverPortalSection.tsx`

Replace the iPhone carousel with a 4-column card grid, each card containing a screenshot + label + description.

- [ ] **Step 1: Replace DriverPortalSection.tsx**

```tsx
const PORTAL_SCREENS = [
  { src: "/images/portal/home.jpeg", label: "Deployment", desc: "Wave, route, van, cage — every morning, clearly laid out." },
  { src: "/images/portal/rota.jpeg", label: "Availability", desc: "Drivers set their own rota. OSM locks it when ready." },
  { src: "/images/portal/scorecards.jpeg", label: "Scorecards", desc: "Cortex metrics live. Drivers see their score — fewer calls." },
  { src: "/images/portal/invoice.jpeg", label: "Payslips", desc: "Auto-generated. PDF download. Zero questions." },
];

export default function DriverPortalSection() {
  return (
    <section id="driver-portal" className="bg-background py-[100px] border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3.5">— DRIVER PORTAL</div>
          <div className="flex items-end justify-between gap-10 flex-wrap">
            <h2 className="text-[52px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02]">In every driver's pocket. Included in every plan.</h2>
            <p className="text-[17px] text-[#6C6C72] leading-[1.55] max-w-[420px]">
              Drivers self-serve their rota, payslips, scorecards, and van inspections — so your OSM stops being a help desk.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {PORTAL_SCREENS.map((s, i) => (
            <div key={s.label} className="bg-white rounded-[20px] p-6 flex flex-col items-center gap-[18px] border border-border">
              <img src={s.src} className="w-full max-w-[210px] rounded-[18px] shadow-[0_20px_40px_-10px_rgba(17,17,19,0.18)]" alt={s.label} />
              <div className="text-center">
                <div className="text-[10px] text-[#6C6C72] uppercase tracking-[0.12em]">0{i + 1}</div>
                <div className="text-[18px] font-bold text-[#111113] mt-1 tracking-[-0.015em]">{s.label}</div>
                <div className="text-[13px] text-[#6C6C72] mt-1.5 leading-[1.5]">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -i "DriverPortal"
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/DriverPortalSection.tsx
git commit -m "feat(portal): 4-column screenshot grid replacing iPhone carousel"
```

---

## Task 7: CostCalculatorSection

**Files:**
- Modify: `client/src/components/CostCalculatorSection.tsx`

Three sliders (drivers, scheduling hours, payroll hours) + yes/no damage app toggle. Dark right panel shows live computed savings.

- [ ] **Step 1: Replace CostCalculatorSection.tsx**

```tsx
import { useState } from "react";

function getTier(drivers: number) {
  if (drivers <= 30) return { name: "Starter", cost: 99 };
  if (drivers <= 100) return { name: "Professional", cost: 249 };
  return { name: "Enterprise", cost: 0 };
}

export default function CostCalculatorSection() {
  const [drivers, setDrivers] = useState(42);
  const [schedHrs, setSchedHrs] = useState(15);
  const [payrollHrs, setPayrollHrs] = useState(8);
  const [inspectApp, setInspectApp] = useState(true);

  const rate = 25;
  const weekly = schedHrs + payrollHrs;
  const monthlyHrs = weekly * 4.33;
  const timeVal = monthlyHrs * rate;
  const damageVal = inspectApp ? 250 : 0;
  const tier = getTier(drivers);
  const netMonthly = timeVal + damageVal - tier.cost;

  return (
    <section id="calculator" className="bg-white py-[100px] border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3.5">— CALCULATE</div>
          <div className="flex items-end justify-between gap-10 flex-wrap">
            <h2 className="text-[52px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02]">See your exact savings.</h2>
            <p className="text-[17px] text-[#6C6C72] leading-[1.55] max-w-[420px]">
              Adjust the sliders to match your fleet. We use a typical £25/hr loaded rate for OSM time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Inputs */}
          <div className="bg-background rounded-[16px] border border-border p-8">
            <div className="text-[11px] text-[#6C6C72] uppercase tracking-[0.1em] mb-6">INPUTS</div>
            <div className="flex flex-col gap-7">
              {[
                { label: "Drivers", value: drivers, set: setDrivers, min: 5, max: 200, unit: "" },
                { label: "Hours/week on scheduling", value: schedHrs, set: setSchedHrs, min: 0, max: 40, unit: "" },
                { label: "Hours/week on payroll", value: payrollHrs, set: setPayrollHrs, min: 0, max: 20, unit: "" },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between mb-2.5">
                    <span className="text-[14px] font-semibold text-[#111113]">{s.label}</span>
                    <span className="text-[22px] font-extrabold text-brand tracking-[-0.02em] leading-none">{s.value}</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} value={s.value}
                    onChange={e => s.set(+e.target.value)}
                    className="w-full accent-brand" />
                </div>
              ))}
              {/* Damage app toggle */}
              <div>
                <div className="text-[14px] font-semibold text-[#111113] mb-1.5">Pay for a separate van inspection app?</div>
                <div className="text-[12px] text-[#6C6C72] mb-2.5">Many UK DSPs use Samsara, Odeon or similar — £200–£300/mo. DSPOps includes this.</div>
                <div className="flex gap-2">
                  {[true, false].map(v => (
                    <button key={String(v)} onClick={() => setInspectApp(v)}
                      className={`flex-1 py-2.5 rounded-lg text-[14px] font-semibold border transition-colors ${
                        inspectApp === v ? "bg-brand text-white border-brand" : "bg-white text-[#111113] border-border"
                      }`}>
                      {v ? "Yes, I pay for one" : "No"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-[#111113] text-white rounded-[16px] p-8 flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-[#94A3B8] uppercase tracking-[0.1em] mb-5">YOUR MONTHLY ESTIMATE</div>
              <div className="flex flex-col gap-3.5">
                {[
                  { l: "OSM hours saved per week", v: `${weekly} hrs` },
                  { l: "Hours recovered per month", v: `${Math.round(monthlyHrs)} hrs` },
                  { l: "Value of OSM time (£25/hr)", v: `£${Math.round(timeVal).toLocaleString()}` },
                  { l: "Van inspection app cancelled", v: inspectApp ? "£250" : "£0" },
                  { l: `DSPOps ${tier.name} (monthly)`, v: tier.cost ? `−£${tier.cost}` : "Contact sales" },
                ].map((r, i) => (
                  <div key={i} className={`flex justify-between pb-3 text-[14px] ${
                    i < 4 ? "border-b border-white/8" : ""
                  }`}>
                    <span className="text-[#94A3B8]">{r.l}</span>
                    <span className="font-bold tabular-nums">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-7 p-[22px] bg-brand/15 border border-brand/35 rounded-xl">
              <div className="text-[11px] text-brand-light uppercase tracking-[0.1em]">NET SAVINGS / MONTH</div>
              <div className="text-[52px] font-extrabold tracking-[-0.04em] leading-none mt-1">
                {tier.cost ? `£${Math.round(netMonthly).toLocaleString()}` : "Custom"}
              </div>
              <div className="text-[13px] text-[#94A3B8] mt-1.5">
                {tier.cost ? `That's £${Math.round(netMonthly * 12).toLocaleString()}/yr back in your DSP.` : "Book a demo for a tailored Enterprise quote."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -i "Calculator"
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/CostCalculatorSection.tsx
git commit -m "feat(calculator): 3-slider + damage toggle with live dark results panel"
```

---

## Task 8: WhatYouGetSection (new)

**Files:**
- Create: `client/src/components/WhatYouGetSection.tsx`

Three promise cards — one per stakeholder type. Replaces the old TestimonialsSection.

- [ ] **Step 1: Create WhatYouGetSection.tsx**

```tsx
import { PoundSterling, Clock, Zap } from "lucide-react";

const OUTCOMES = [
  {
    role: "DSP Owner",
    headline: "Stop paying five separate bills.",
    detail: "Consolidate rota, dispatch, payroll, compliance, van inspections and SDD tracking. One invoice, no per-driver fees, and you keep the cash your old stack was costing you.",
    metric: "~£3k–£6k/yr saved",
    Icon: PoundSterling,
    color: "text-brand",
    bg: "bg-brand/10",
    dot: "bg-brand",
  },
  {
    role: "Operations Manager",
    headline: "Leave the depot on time.",
    detail: "No more rota_v17_FINAL.xlsx, no more WhatsApp chaos at 06:30. Dispatch done by 08:30, scorecards pulled from Cortex, payroll runs itself on Friday.",
    metric: "20+ hrs/wk back",
    Icon: Clock,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    dot: "bg-emerald-600",
  },
  {
    role: "SDD Operations",
    headline: "Never miss an SDD SLA.",
    detail: "Dedicated Same-Day wave view with live SLA timers, late-stop alerts and auto-flagged at-risk routes. Purpose-built for DSPs running same-day contracts.",
    metric: "Real-time wave view",
    Icon: Zap,
    color: "text-amber-700",
    bg: "bg-amber-100",
    dot: "bg-amber-500",
  },
];

export default function WhatYouGetSection() {
  return (
    <section className="bg-background py-[100px] border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3.5">— WHAT YOU GET</div>
          <h2 className="text-[52px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02]">Three promises. Built into the platform.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {OUTCOMES.map((o, i) => (
            <div key={i} className="bg-white border border-border rounded-[16px] p-8 flex flex-col gap-[18px]">
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-xl ${o.bg} ${o.color} flex items-center justify-center`}>
                  <o.Icon size={24} />
                </div>
                <div className="text-[10px] text-[#6C6C72] uppercase tracking-[0.12em]">FOR {o.role.toUpperCase()}</div>
              </div>
              <div className="text-[24px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.15]">{o.headline}</div>
              <div className="text-[14px] text-[#6C6C72] leading-[1.55] flex-1">{o.detail}</div>
              <div className="mt-auto pt-4 border-t border-[#EFEFEB] flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${o.dot}`} />
                <div className={`text-[13px] font-semibold ${o.color} tabular-nums`}>{o.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -i "WhatYouGet"
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/WhatYouGetSection.tsx
git commit -m "feat(whatyouget): three promise cards for owner, OSM, and SDD ops"
```

---

## Task 9: PricingSection

**Files:**
- Modify: `client/src/components/PricingSection.tsx`

Update headline to v2 copy. Keep £99/30 drivers, £249/100 drivers, Enterprise custom. Featured card becomes dark navy background. Keep existing email capture logic.

- [ ] **Step 1: Update the section header and featured card styling**

In `PricingSection.tsx`, change:
1. The `<h2>` from `"One platform. No hidden fees."` to `"Flat monthly. No per-driver fees. Ever."`
2. The `<p>` subtitle to `"Add all the drivers you want within your tier. We never charge per-seat — so you're never penalised for growing."`
3. The `eyebrow` span text from `"Simple pricing"` to `"PRICING"`
4. The `popular` card's outer div: change `bg-white` to `bg-[#111113]` and `text-navy` to `text-white` for the plan name, price, and description. Keep the email input white (`bg-white`). Change check icon color from `text-amber-500` to `text-brand-light`.
5. Change `"Most Popular"` badge: keep it at top right (not top center), using `position: absolute, top: 24, right: 24`.
6. Update `plan.drivers` display: wrap in a `<p>` with styling `text-[13px] text-[#6C6C72]` for non-featured, `text-[13px] text-white/65` for featured.

Full replacement of the plans array features to match v2:

```tsx
const plans = [
  {
    name: "Starter", price: "99", period: "/mo", drivers: "Up to 30 drivers", popular: false,
    features: ["All 8 modules", "Driver portal", "Email support", "Cortex integration"],
  },
  {
    name: "Professional", price: "249", period: "/mo", drivers: "Up to 100 drivers", popular: true,
    features: ["Everything in Starter", "Priority support", "Custom scorecards", "API access", "Dedicated onboarding"],
  },
  {
    name: "Enterprise", price: null, period: "", drivers: "100+ drivers", popular: false,
    features: ["Everything in Pro", "Dedicated CSM", "SSO / SAML", "Custom SLAs", "White-glove setup"],
  },
];
```

Update the card rendering so the featured (popular) card uses:
```tsx
className={`relative rounded-[16px] p-8 ${plan.popular ? "bg-[#111113] text-white border-[#111113]" : "bg-white border-border"} border`}
```

- [ ] **Step 2: Verify**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -i "Pricing"
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/PricingSection.tsx
git commit -m "feat(pricing): v2 copy — flat monthly headline, navy featured card, driver-tier tiers"
```

---

## Task 10: FAQSection

**Files:**
- Modify: `client/src/components/FAQSection.tsx`

Replace the 8 current questions with 7 v2 questions. Keep the existing accordion component structure.

- [ ] **Step 1: Replace the `faqs` array in FAQSection.tsx**

```tsx
const faqs = [
  {
    question: "How long does setup take?",
    answer: "Most DSPs are live in 20 minutes. We import your drivers from a CSV, connect your Cortex scorecard feed, and generate driver portal logins automatically. Priority onboarding sessions are included on Professional and Enterprise plans.",
  },
  {
    question: "Does it work with Amazon Cortex?",
    answer: "Yes — live two-way sync. Scorecards, delivery progress, and route data flow into DSPOps automatically. No more manual re-keying, no more 'why is my score wrong?' calls.",
  },
  {
    question: "We run Same-Day Delivery. Is that supported?",
    answer: "Yes — SDD is a first-class module, not an afterthought. You get a separate wave view for same-day routes, tighter SLA timers, late-stop alerts, and SDD-specific payroll rates. Owners running both standard and SDD contracts see everything in one fleet-wide dashboard.",
  },
  {
    question: "Do drivers need to install anything?",
    answer: "No app store, no download. Drivers get a login link via text and access the portal from any phone's browser. It works offline too — they can mark vans, submit damage, check rota without signal.",
  },
  {
    question: "Can I cancel my other tools immediately?",
    answer: "Usually yes. DSPOps replaces rota spreadsheets, WhatsApp driver groups, van inspection apps, and most payroll sheets. We migrate historical data in your first week so you lose nothing.",
  },
  {
    question: "Is it GDPR compliant?",
    answer: "Yes — UK-hosted, GDPR-compliant. Driver data stays in the UK. We sign DPAs and provide audit logs for all data access.",
  },
  {
    question: "What if my fleet grows past a tier?",
    answer: "We upgrade you mid-month and prorate the difference. No per-driver fees, ever — you just move to the next tier when you hit the driver limit.",
  },
];
```

Also update the section header:
- Eyebrow: `"FAQ"`
- `<h2>`: `"Questions DSP owners ask us."`
- Subtitle `<p>`: `"Still something missing? Email hello@dspops.co.uk — real humans answer."`

- [ ] **Step 2: Verify**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -i "FAQ"
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/FAQSection.tsx
git commit -m "feat(faq): v2 questions — setup, SDD, GDPR, tier growth, driver portal offline"
```

---

## Task 11: CTASection

**Files:**
- Modify: `client/src/components/CTASection.tsx`

Two-column dark section: big headline on the left, demo booking form on the right. Removes the centered single-column layout.

- [ ] **Step 1: Replace CTASection.tsx**

```tsx
import { useState } from "react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [dsp, setDsp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && dsp) {
      fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Bottom CTA", metadata: { dspName: dsp } }),
      });
      setEmail("");
      setDsp("");
    }
  };

  return (
    <section id="book-demo" className="bg-[#111113] py-[110px] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.27), transparent 60%)" }} />
      <div className="max-w-[1280px] mx-auto px-8 relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[52px] items-center">
        {/* Left: headline */}
        <div>
          <h2 className="font-sans text-[56px] lg:text-[76px] font-extrabold tracking-[-0.04em] leading-[0.98] text-white">
            Your Monday<br />starts at 06:42.<br />
            <span className="text-brand-light">It doesn't have to.</span>
          </h2>
          <p className="text-[17px] text-[#94A3B8] mt-5.5 max-w-[500px] leading-[1.55]">
            20 minutes with us and you'll see your DSP on DSPOps. We'll import drivers, rota and Cortex data live.
          </p>
        </div>

        {/* Right: form */}
        <div className="bg-white/4 border border-white/10 rounded-[16px] p-8 backdrop-blur-[10px] text-white">
          <div className="text-[11px] text-brand-light uppercase tracking-[0.1em]">BOOK A 20-MIN DEMO</div>
          <div className="text-[22px] font-bold mt-1 tracking-[-0.01em]">See your DSP live on DSPOps</div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mt-5">
            <input
              type="email" placeholder="Work email" required value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-[14px] py-[13px] bg-white border-0 rounded-lg text-[14px] text-[#111113] placeholder:text-[#6C6C72] outline-none focus:ring-2 focus:ring-brand"
            />
            <input
              type="text" placeholder="DSP name" required value={dsp}
              onChange={e => setDsp(e.target.value)}
              className="px-[14px] py-[13px] bg-white border-0 rounded-lg text-[14px] text-[#111113] placeholder:text-[#6C6C72] outline-none focus:ring-2 focus:ring-brand"
            />
            <button type="submit"
              className="px-4 py-[13px] bg-brand text-white rounded-lg text-[14px] font-bold hover:bg-brand-dark transition-colors">
              Book demo →
            </button>
          </form>
          <div className="text-[12px] text-white/55 mt-3.5">No credit card · Setup in 20 min · GDPR compliant</div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -i "CTASection"
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/CTASection.tsx
git commit -m "feat(cta): 2-col dark section — headline left, demo booking form right"
```

---

## Task 12: Footer

**Files:**
- Modify: `client/src/components/Footer.tsx`

Slim single-row footer with logo wordmark on left, legal links on right.

- [ ] **Step 1: Replace Footer.tsx**

```tsx
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dop-logo_ba62af1c.png";

export default function Footer() {
  return (
    <footer className="bg-[#111113] py-10 border-t border-white/6">
      <div className="max-w-[1280px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#94A3B8] font-sans">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="DSPOps" className="w-6 h-6 rounded-md" />
            <span className="font-extrabold text-white tracking-tight text-[15px]">DSP<span className="text-brand">Ops</span></span>
          </a>
          <span>© {new Date().getFullYear()} DSPOps Ltd</span>
        </div>
        <div className="flex gap-6">
          {[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "#" },
            { label: "Security", href: "#" },
            { label: "hello@dspops.co.uk", href: "mailto:hello@dspops.co.uk" },
          ].map(l => (
            <a key={l.label} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -i "Footer"
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/Footer.tsx
git commit -m "feat(footer): slim single-row dark footer"
```

---

## Task 13: Home.tsx + delete obsolete components

**Files:**
- Modify: `client/src/pages/Home.tsx`
- Delete: 9 obsolete component files

- [ ] **Step 1: Rewrite Home.tsx**

```tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ReplacesSection from "@/components/ReplacesSection";
import AudiencesSection from "@/components/AudiencesSection";
import FeaturesSection from "@/components/FeaturesSection";
import DriverPortalSection from "@/components/DriverPortalSection";
import CostCalculatorSection from "@/components/CostCalculatorSection";
import WhatYouGetSection from "@/components/WhatYouGetSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <ReplacesSection />
        <AudiencesSection />
        <FeaturesSection />
        <DriverPortalSection />
        <CostCalculatorSection />
        <WhatYouGetSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
```

- [ ] **Step 2: Delete obsolete components**

```bash
cd F:/Github-DOP/dop-marketing-landing-page
rm client/src/components/ProblemsSection.tsx
rm client/src/components/OwnerSection.tsx
rm client/src/components/OSMSection.tsx
rm client/src/components/NewFeaturesSection.tsx
rm client/src/components/BeforeAfterSection.tsx
rm client/src/components/MorningStoryboardSection.tsx
rm client/src/components/VideoSection.tsx
rm client/src/components/HowItWorksSection.tsx
rm client/src/components/TestimonialsSection.tsx
```

- [ ] **Step 3: Full TypeScript check**

```bash
pnpm exec tsc --noEmit 2>&1
```

Expected: zero errors.

- [ ] **Step 4: Build check**

```bash
pnpm build 2>&1 | tail -20
```

Expected: `✓ built in Xs`

- [ ] **Step 5: Commit**

```bash
git add client/src/pages/Home.tsx
git rm client/src/components/ProblemsSection.tsx client/src/components/OwnerSection.tsx client/src/components/OSMSection.tsx client/src/components/NewFeaturesSection.tsx client/src/components/BeforeAfterSection.tsx client/src/components/MorningStoryboardSection.tsx client/src/components/VideoSection.tsx client/src/components/HowItWorksSection.tsx client/src/components/TestimonialsSection.tsx
git commit -m "feat(home): v2 page assembly — 11 sections, 9 obsolete components deleted"
```

---

## Task 14: Visual verification

- [ ] **Step 1: Start dev server**

```bash
pnpm dev
```

Open `http://localhost:3000` in a browser.

- [ ] **Step 2: Scroll through every section and verify**

Check list:
- [ ] Navbar: new links visible, "Sign in" + "Book demo →" on right, blur on scroll
- [ ] Hero: 84px headline, dispatch mock dashboard on right, floating iPhone, floating "Payroll finalised" notif, 4 stat cards below
- [ ] Replaces: chaos artifacts visible at top; scroll down — artifacts collapse into DSPOps panel; payoff band shows +£13,400/yr
- [ ] Audiences: two tabs switch between Owner (blue) and OSM (navy) panels with timelines
- [ ] Features: 9 module buttons; clicking each updates left info panel and right preview
- [ ] Portal: 4 screenshot cards in a row
- [ ] Calculator: sliders move, dark right panel updates live
- [ ] What You Get: 3 promise cards
- [ ] Pricing: dark navy middle card, driver tier labels, email capture working
- [ ] FAQ: 7 new questions, accordion opens/closes
- [ ] CTA: two columns, form submits to /api/waitlist
- [ ] Footer: single row, slim dark

- [ ] **Step 3: Check mobile (375px viewport)**

Resize browser to 375px wide. Verify:
- [ ] Navbar: hamburger menu opens and closes
- [ ] Hero: single column layout, mock hidden or stacked below headline
- [ ] Audiences: tabs stack vertically
- [ ] Features: module buttons wrap or scroll
- [ ] Portal: 2-column grid
- [ ] Calculator: full width sliders
- [ ] Pricing: stacked cards
- [ ] CTA: single column

- [ ] **Step 4: Fix any TypeScript or rendering errors found**, then commit fixes individually.

---

## Self-Review Against Spec

| Requirement | Task |
|---|---|
| Full overhaul of Home.tsx | Task 13 |
| DM Sans font kept | Token table (font-sans already DM Sans) |
| ChatbotWidget kept | Task 13 |
| BeforeAfterSection deleted | Task 13 |
| MorningStoryboard deleted | Task 13 |
| VideoSection deleted | Task 13 |
| Keep current hero stat cards | Task 2 (4 animated stat cards retained) |
| No fake company metrics in hero | Task 2 (only animated counters) |
| Pricing by driver tiers, not per-driver | Task 9 |
| Faithful Replaces scroll animation | Task 3 (Framer Motion useScroll + chained useTransform) |
| New nav links | Task 1 |
| Inline dispatch mock in hero | Task 2 (HeroMock component) |
| 9-module features with SDD | Task 5 |
| Audiences tabbed Owner/OSM | Task 4 (shadcn Tabs) |
| Portal as 4-card grid | Task 6 |
| Calculator with dark results panel | Task 7 |
| WhatYouGet 3 promise cards | Task 8 |
| CTA 2-column with form | Task 11 |
| Slim dark footer | Task 12 |
