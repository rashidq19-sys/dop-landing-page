# Privacy Policy Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone `/privacy` page with the full DSPOps privacy policy, satisfying Apple App Store and Google Play Store submission requirements.

**Architecture:** Two new files (`PrivacyPage.tsx` content component + `Privacy.tsx` page shell), plus minor updates to `App.tsx` (new route) and `Footer.tsx` (link href). Uses the existing wouter router and matches the Clean Logistics Blueprint design system.

**Tech Stack:** React 19, TypeScript, TailwindCSS v4, wouter routing

---

### Task 1: Create PrivacyPage.tsx — policy content component

**Files:**
- Create: `client/src/components/PrivacyPage.tsx`

- [ ] **Step 1: Create the file with full policy content**

Create `client/src/components/PrivacyPage.tsx` with this exact content:

```tsx
/*
 * Design: Clean Logistics Blueprint
 * Page: Privacy Policy — readable document layout
 * Typography: DM Sans, navy text on off-white background
 */

const EFFECTIVE_DATE = "16 April 2026";

const dataCategories = [
  { category: "Identity", data: "Full name, date of birth, email address, phone number, home address" },
  { category: "Government IDs", data: "National Insurance number, passport number, driving licence details, Right to Work codes" },
  { category: "Financial", data: "Bank account number, sort code, UTR number, VAT number" },
  { category: "Documents & Photos", data: "Licence photos, passport photos, Right to Work evidence, van inspection photos and videos" },
  { category: "Employment", data: "Driver code, shift data, deployment assignments, performance scorecards" },
  { category: "Device", data: "Push notification tokens, platform type (iOS, Android, or web)" },
  { category: "Health", data: "Medical fitness self-declarations" },
  { category: "Emergency Contact", data: "Name, phone number, and relationship of a nominated third party" },
  { category: "Messages", data: "In-app conversations between drivers and managers" },
  { category: "Audit", data: "IP address, user agent string, timestamps (recorded when signing agreements)" },
];

const thirdParties = [
  { service: "Anthropic (Claude AI)", data: "Document images (licence, passport)", purpose: "Automated field extraction during onboarding" },
  { service: "Roboflow", data: "Van photo frames", purpose: "AI-assisted damage detection" },
  { service: "OneSignal", data: "Device tokens, driver identifiers", purpose: "Push notifications" },
  { service: "Cloudflare R2", data: "All uploaded files and photos", purpose: "Cloud file storage" },
  { service: "Neon (PostgreSQL)", data: "All structured data", purpose: "Database hosting" },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAFAF8] pt-28 lg:pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-navy mb-3">Privacy Policy</h1>
          <p className="text-sm text-navy/50">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div className="space-y-10">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">1. Introduction</h2>
            <div className="h-px bg-navy/10 mb-4" />
            <div className="space-y-3 text-navy/70 text-[15px] leading-relaxed">
              <p>
                DSPOps is a fleet management and operations platform for Amazon Delivery Service
                Partners (DSPs). It is operated under the trading name{" "}
                <strong className="text-navy">DSPOps</strong>.
              </p>
              <p>
                This Privacy Policy explains what personal data we collect, why we collect it, how
                it is used, and your rights under UK GDPR. It applies to all drivers, operations
                managers, and administrators who use the DSPOps platform.
              </p>
              <p>
                By using DSPOps, you agree to the collection and use of information as described
                in this policy.
              </p>
            </div>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">2. Information We Collect</h2>
            <div className="h-px bg-navy/10 mb-4" />
            <p className="text-navy/70 text-[15px] leading-relaxed mb-4">
              We collect the following categories of personal data:
            </p>
            <div className="overflow-x-auto rounded-lg border border-navy/10">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="bg-navy/5 border-b border-navy/10">
                    <th className="text-left px-4 py-3 font-semibold text-navy w-40">Category</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy">Data Collected</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCategories.map((row, i) => (
                    <tr
                      key={row.category}
                      className={i % 2 === 0 ? "bg-white" : "bg-navy/[0.02]"}
                    >
                      <td className="px-4 py-3 font-medium text-navy align-top">
                        {row.category}
                      </td>
                      <td className="px-4 py-3 text-navy/70">{row.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">3. How We Use Your Information</h2>
            <div className="h-px bg-navy/10 mb-4" />
            <p className="text-navy/70 text-[15px] leading-relaxed mb-3">
              We use personal data only for the purposes for which it was collected:
            </p>
            <ul className="space-y-2 list-none">
              {[
                "Fleet management and driver deployment",
                "Van inspection and damage detection (AI-assisted)",
                "Document verification during onboarding (AI-assisted)",
                "Push notifications for shift and deployment updates",
                "Driver performance tracking and scorecards",
                "Payroll and employment compliance",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-navy/70 text-[15px] leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Third-Party Services */}
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">4. Third-Party Services</h2>
            <div className="h-px bg-navy/10 mb-4" />
            <p className="text-navy/70 text-[15px] leading-relaxed mb-4">
              To operate the platform, we share specific data with the following third-party
              services. We do not use your data for advertising, and we do not share data across
              apps or for any tracking purposes.
            </p>
            <div className="overflow-x-auto rounded-lg border border-navy/10">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="bg-navy/5 border-b border-navy/10">
                    <th className="text-left px-4 py-3 font-semibold text-navy">Service</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy">Data Shared</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {thirdParties.map((row, i) => (
                    <tr
                      key={row.service}
                      className={i % 2 === 0 ? "bg-white" : "bg-navy/[0.02]"}
                    >
                      <td className="px-4 py-3 font-medium text-navy align-top whitespace-nowrap">
                        {row.service}
                      </td>
                      <td className="px-4 py-3 text-navy/70 align-top">{row.data}</td>
                      <td className="px-4 py-3 text-navy/70 align-top">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Data Security */}
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">5. Data Security</h2>
            <div className="h-px bg-navy/10 mb-4" />
            <p className="text-navy/70 text-[15px] leading-relaxed mb-3">
              We apply appropriate technical and organisational measures to protect your personal
              data:
            </p>
            <ul className="space-y-2 list-none">
              {[
                "Financial data (bank details, sort codes) is encrypted at rest using AES-256-GCM",
                "Passwords are hashed using bcrypt",
                "Two-factor authentication (TOTP) is required for all manager and admin accounts",
                "All data is transmitted over HTTPS",
                "Document integrity is verified using SHA-256 checksums",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-navy/70 text-[15px] leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Data Retention */}
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">6. Data Retention</h2>
            <div className="h-px bg-navy/10 mb-4" />
            <div className="space-y-3 text-navy/70 text-[15px] leading-relaxed">
              <p>
                We retain personal data for{" "}
                <strong className="text-navy">1 year</strong> after a driver is offboarded or
                their account is closed. After this period, personal data is permanently deleted
                or anonymised.
              </p>
              <p>
                Drivers may request earlier deletion of their data at any time. See Your Rights
                below for how to make that request.
              </p>
            </div>
          </section>

          {/* 7. Your Rights */}
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">7. Your Rights (UK GDPR)</h2>
            <div className="h-px bg-navy/10 mb-4" />
            <p className="text-navy/70 text-[15px] leading-relaxed mb-3">
              Under UK GDPR, you have the following rights regarding your personal data:
            </p>
            <ul className="space-y-2.5 list-none mb-4">
              {[
                { right: "Access", desc: "You can request a copy of the personal data we hold about you." },
                { right: "Correction", desc: "You can ask us to correct any inaccurate or incomplete data." },
                { right: "Deletion", desc: "You can request that we delete your personal data." },
                { right: "Restriction", desc: "You can ask us to limit how we use your data in certain circumstances." },
                { right: "Portability", desc: "You can request your data in a structured, machine-readable format." },
                { right: "Withdrawal of consent", desc: "Where processing is based on consent, you can withdraw it at any time." },
                { right: "Complain to the ICO", desc: "You have the right to lodge a complaint with the Information Commissioner's Office at ico.org.uk." },
              ].map(({ right, desc }) => (
                <li key={right} className="flex items-start gap-2.5 text-navy/70 text-[15px] leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                  <span>
                    <strong className="text-navy">{right}:</strong> {desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-navy/70 text-[15px] leading-relaxed">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:support@dspops.app" className="text-brand hover:underline">
                support@dspops.app
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          {/* 8. Children's Privacy */}
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">8. Children's Privacy</h2>
            <div className="h-px bg-navy/10 mb-4" />
            <p className="text-navy/70 text-[15px] leading-relaxed">
              The DSPOps platform is intended for use by adults in employment. We do not knowingly
              collect personal data from anyone under the age of 16. If you believe a minor has
              provided us with personal data, please contact us immediately at{" "}
              <a href="mailto:support@dspops.app" className="text-brand hover:underline">
                support@dspops.app
              </a>
              .
            </p>
          </section>

          {/* 9. Changes to This Policy */}
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">9. Changes to This Policy</h2>
            <div className="h-px bg-navy/10 mb-4" />
            <p className="text-navy/70 text-[15px] leading-relaxed">
              We may update this Privacy Policy from time to time. When we do, the revised version
              will be posted at this URL with an updated effective date. Continued use of the
              DSPOps platform after changes are posted constitutes your acceptance of the updated
              policy. We encourage you to review this page periodically.
            </p>
          </section>

          {/* 10. Contact Us */}
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">10. Contact Us</h2>
            <div className="h-px bg-navy/10 mb-4" />
            <p className="text-navy/70 text-[15px] leading-relaxed mb-4">
              For any privacy-related questions, requests, or concerns, please contact us:
            </p>
            <div className="p-4 rounded-lg bg-navy/[0.03] border border-navy/10 text-[15px] space-y-1">
              <p className="font-semibold text-navy">DSPOps</p>
              <p className="text-navy/70">
                Email:{" "}
                <a href="mailto:support@dspops.app" className="text-brand hover:underline">
                  support@dspops.app
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd f:/Github-DOP/dop-marketing-landing-page && npx tsc --noEmit
```

Expected: no errors

---

### Task 2: Create Privacy.tsx page shell

**Files:**
- Create: `client/src/pages/Privacy.tsx`

- [ ] **Step 1: Create the page shell**

Create `client/src/pages/Privacy.tsx` with this exact content:

```tsx
/*
 * Page: Privacy Policy
 * Layout: Same shell as Home — Navbar + content + Footer + ChatbotWidget
 */

import Navbar from "@/components/Navbar";
import PrivacyPage from "@/components/PrivacyPage";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PrivacyPage />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
```

---

### Task 3: Wire up route and update footer link

**Files:**
- Modify: `client/src/App.tsx`
- Modify: `client/src/components/Footer.tsx`

- [ ] **Step 1: Add `/privacy` route to App.tsx**

In `client/src/App.tsx`, add the import after the existing page imports:

```tsx
import Privacy from "./pages/Privacy";
```

Then add the route inside `<Switch>`, before the `"/"` catch-all route (order matters in wouter — more specific routes must come first):

```tsx
<Route path="/privacy" component={Privacy} />
<Route path="/" component={Home} />
```

The full updated `<Switch>` block should look like:

```tsx
<Switch>
  <Route path="/admin" component={Admin} />
  <Route path="/privacy" component={Privacy} />
  <Route path="/" component={Home} />
</Switch>
```

- [ ] **Step 2: Update Privacy Policy link in Footer.tsx**

In `client/src/components/Footer.tsx`, find the `legalLinks` array and change the Privacy Policy href from `"#"` to `"/privacy"`:

```tsx
const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];
```

---

### Task 4: Verify and commit

- [ ] **Step 1: TypeScript check**

```bash
cd f:/Github-DOP/dop-marketing-landing-page && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 2: Start dev server and manually verify**

```bash
cd f:/Github-DOP/dop-marketing-landing-page && npm run dev
```

Then open `http://localhost:3000/privacy` in a browser and confirm:
- Page loads without errors
- Navbar is present and sticky
- All 10 sections render with correct content
- Both tables (data categories, third-party services) display correctly
- Footer is present and "Privacy Policy" link in footer points to `/privacy` (not `#`)
- Page is readable on mobile width

- [ ] **Step 3: Commit**

```bash
git add client/src/components/PrivacyPage.tsx client/src/pages/Privacy.tsx client/src/App.tsx client/src/components/Footer.tsx
git commit -m "feat: add /privacy page with UK GDPR-compliant privacy policy

Covers all data categories, third-party services, security measures,
1-year retention, and UK GDPR rights. Required for App Store and
Google Play Store submissions."
```
