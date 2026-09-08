# Micromobility on the landing page — feature surface + search + AI discoverability

Date: 2026-09-08 · Repo: `dop-marketing-landing-page` (dspops.app) · Test command: `npm run check`

## Why

DSPOps has shipped micromobility in the product (Riders as a first-class person type, licence-free
onboarding, morning/afternoon blocks, per-block availability and pay). The marketing site mentions it
in exactly one place: an orange badge on the hero. There is no page, no sitemap entry, no structured
data and nothing an LLM can read, so a DSP searching "micromobility delivery software" or asking
ChatGPT "what software manages Amazon e-cargo bike riders" never reaches us.

## The honesty constraint — read before writing any copy

`shared/micromobility.ts` and `client/src/components/WorkTypeIcon.tsx` in the **app** repo
(`F:\Github-DOP\dop-app`) are the ground truth:

- **Bikes are fully built.** `drivers.work_type = 'rider'`, `vehicle_type` of `'van' | 'bike'`,
  rider onboarding with no driving licence and no DVLA check, morning/afternoon blocks
  (`shifts.wave_no`), per-block availability, per-block pay.
- **Walkers are NOT a separate type.** There is no walker mode, no walk vehicle type, no walker
  glyph — the app draws a bicycle. Amazon's UK on-foot model (vans parked as mini-hubs, teams
  walking pre-planned routes with pushcarts) is real but not launched at our client's site.
- The rider onboarding medical declaration genuinely covers "on a cargo bike or on foot", and every
  rider surface (blocks, availability, pay, compliance) is vehicle-agnostic.

**Approved framing (Rashid, 2026-09-08):** lead on e-cargo bikes; say on-foot couriers are managed
the same way, as Riders, with the same onboarding, blocks, availability and pay. Never claim a
walker mode, a walker vehicle type, or walker-specific routing. Never write "cycle"/"cyclist"/
"cycling" for bikes — in DSPOps "cycle" means same-day delivery.

## Phase 1 — The visible surface

### T1 — Make the hero micromobility badge readable and subtle
source: this plan
files: `client/src/components/HeroSection.tsx`
The badge exists twice — the desktop copy (`absolute -top-[15px] -right-1 ... hidden sm:inline-flex`)
and the mobile copy (`sm:hidden`). Both must change identically.
1. Replace the emoji with a monochrome inline SVG bicycle at `currentColor`, sized ~13px, so it
   inherits the pill's text colour instead of rendering a full-colour emoji at 11px on orange. Use
   the Phosphor bicycle path already proven in the app repo at
   `F:\Github-DOP\dop-app\client\src\components\WorkTypeIcon.tsx` (viewBox `0 0 256 256`,
   `fill="currentColor"`, `aria-hidden="true"`). Define it once as a local component in this file and
   use it in both copies.
2. Make the pill subtle: drop the `bg-gradient-to-br from-[#FFC53D] to-[#F97316]` gradient, the
   `shadow-[0_10px_26px_rgba(249,115,22,0.45)]` glow and the `ring-2 ring-white`. Replace with a soft
   amber tint background, a thin amber border and darker amber text that clears 4.5:1 contrast —
   e.g. `bg-amber-50 border border-amber-200 text-amber-900`, with no shadow or a very light one.
   Keep the pill shape, the uppercase tracking and the wording.
3. Update the code comment directly above the badge (currently "Amber, not brand blue: ... This is
   the only warm colour on the page") so it describes what the badge now is. A stale comment here
   is a trap for the next person.
Do NOT touch the chat launcher's colour (`ChatbotWidget.tsx`) — it was deliberately matched to the
old badge and whether it follows is a separate decision.
done-when: `npm run check` passes, both badge copies use the inline SVG and the subtle palette, and
no other component changed.

### T2 — Build the micromobility pillar page and register the route in all four places
source: this plan
files: `client/src/pages/MicromobilityDeliverySoftware.tsx` (new), `client/src/App.tsx`,
`client/public/sitemap.xml`, `server/index.ts`, `scripts/prerender.mjs`
Route: `/micromobility-delivery-software`.
Build the page to the exact pattern of `client/src/pages/DspRotaManagement.tsx` — read that file
first and mirror its structure, imports, class names and section rhythm. It must have:
- `usePageMeta` with a title, a description, `canonicalPath: "/micromobility-delivery-software"`, and
  `jsonLd: [faqJsonLd(faqs), breadcrumbJsonLd([...])]`.
- Title target: `Micromobility Delivery Management Software | DSPOps`.
- Hero H1 naming micromobility and e-cargo bikes, a breadcrumb nav, the two hero CTAs.
- A "the problem" section: micromobility DSPs run 3–4 hour blocks with two or three waves a day, most
  riders work more than one block, and van-shaped rota software cannot express a person working a
  morning and an afternoon on the same date.
- A "the solution" 4-card grid covering: Riders as their own person type; morning/afternoon blocks
  with per-block availability; licence-free rider onboarding (right to work, ID and the rest of the
  vetting stack stay, the driving licence and DVLA check drop away); per-block pay and one
  compliance list across vans, bikes and on-foot rounds.
- A "how it works" numbered 01–04 column with an image on the right. Reuse an existing image from
  `client/public/images/` — do NOT invent a filename; check what exists and pick the closest, the
  rota phone shot is a reasonable choice.
- 5 FAQs as a `const faqs: Faq[]` typed from `@shared/faqs`, answering at minimum: does DSPOps
  support e-cargo bike riders; what about walkers / on-foot rounds (answer within the honesty
  constraint above); can a rider work a morning and an afternoon block on the same day; what changes
  in onboarding for a rider; can one DSP run vans, riders and same-day delivery in the same account.
- The `SeoFaqAccordion` FAQ section, the "explore the platform" pill row, `CTASection`, `Footer`,
  `ChatbotWidget` — same as the rota page.
- A prose link to the existing blog post at `/blog/amazon-micromobility-dsp-guide`, worked into a
  sentence somewhere on the page.
Keywords to work naturally into the prose (never stuffed): micromobility delivery software,
e-cargo bike delivery, Amazon micromobility DSP, rider management software, on-foot delivery rounds,
same-day delivery. Mention same-day delivery explicitly at least once, as a sibling capability.
Register the route in ALL FOUR places or it ships broken:
1. `client/src/App.tsx` — lazy import plus a `<Route path="/micromobility-delivery-software" ... />`
   placed with the other feature pages, above the `/` route.
2. `client/public/sitemap.xml` — a `<url>` entry, `lastmod` 2026-09-08, `changefreq` monthly,
   `priority` 0.8, sitting with the other feature pages.
3. `server/index.ts` — the pattern for that exact path in `PUBLIC_ROUTE_PATTERNS`.
4. `scripts/prerender.mjs` — `"/micromobility-delivery-software"` in `ROUTES`, with the feature pages.
done-when: `npm run check` passes, the route appears in all four files, and the page file mirrors the
rota page's structure.

### T3 — Link the new page in from everywhere it should be reachable
source: this plan
files: `client/src/pages/DspRotaManagement.tsx`, `client/src/pages/DriverPerformanceTracking.tsx`,
`client/src/pages/VanInspectionApp.tsx`, `client/src/pages/DspInvoicingPayroll.tsx`,
`client/src/pages/DspComplianceTools.tsx`, `client/src/pages/AmazonDspManagementSoftware.tsx`
Each of these pages carries an `otherPages` array (or an equivalent "explore the platform" link
list) that cross-links the feature pages. Add an entry named "Micromobility delivery software"
pointing at `/micromobility-delivery-software` to every one of them. Without this the new page is an
orphan with zero internal links and will not rank.
`AmazonDspManagementSoftware.tsx` is the pillar overview page — read how it lists the feature pages
and add micromobility in the same shape it already uses, whatever that shape is.
Change nothing else in these files.
done-when: `npm run check` passes, and grepping for `micromobility-delivery-software` returns a hit
in all six pages.

## Phase 2 — Search and AI discoverability

### T4 — Put micromobility on the homepage: platform card, overview card, FAQ
source: this plan
files: `client/src/components/home/PlatformSection.tsx`, `client/src/components/SEOOverviewSection.tsx`,
`shared/faqs.ts`
1. `PlatformSection.tsx` — add a 10th card, "Micromobility", after "Same-day delivery". Match the
   existing card objects exactly (same fields, same tone, same length). Pick an existing lucide icon
   already imported in the file if one fits, otherwise import `Bike` from lucide-react.
2. `SEOOverviewSection.tsx` — add a 7th module entry linking to `/micromobility-delivery-software`
   with the anchor text "Micromobility delivery software", using lucide's `Bike`. Also extend the
   second body paragraph so the prose on this page names micromobility and e-cargo bike riders
   alongside the same-day delivery clause it already has. The comment at the top of that file says
   the hrefs and anchor text are load-bearing for search — do not alter any existing entry.
3. `shared/faqs.ts` — add one FAQ: "We run e-cargo bike riders. Does DSPOps handle micromobility?"
   Answer inside the honesty constraint above, mentioning riders as their own person type, blocks,
   licence-free onboarding, and on-foot rounds managed the same way. This file feeds both the
   homepage FAQ section and the homepage's FAQPage JSON-LD, which is what AI crawlers read.
done-when: `npm run check` passes, the homepage carries micromobility in all three places, and no
existing module href or anchor text changed.

### T5 — Add llms.txt so AI systems can read what DSPOps is without running JavaScript
source: this plan
files: `client/public/llms.txt` (new)
Write a plain-text `llms.txt` in the emerging convention: an H1 with the product name, a one-line
blockquote summary, then short markdown sections with links. It must cover, factually:
- What DSPOps is: Amazon DSP management software for UK Delivery Service Partners.
- The modules, each with its absolute `https://dspops.app/...` URL: rota management, driver
  performance tracking, van inspection, invoicing and payroll, compliance, micromobility.
- **Micromobility, stated plainly** so a model can quote it: DSPOps manages e-cargo bike riders as
  their own person type, with morning and afternoon blocks, per-block availability and pay, and
  licence-free rider onboarding; on-foot couriers are managed the same way as riders. The honesty
  constraint above applies verbatim — no walker mode.
- **Same-day delivery**, stated plainly: SDD is supported on every plan with its own wave view,
  separate driver pool and SDD-specific pay rates.
- Pricing, taken from the tier facts already in `server/lib/chatAi.ts`'s `SYSTEM_PROMPT` — do not
  invent numbers, copy the ones there.
- Contact: rashid@dspops.app.
Do NOT edit `client/public/robots.txt`. robots.txt group matching is most-specific-wins, so adding a
named `User-agent: GPTBot` block would stop that bot reading the wildcard group and silently expose
the `Disallow`ed private sales brochures.
done-when: `client/public/llms.txt` exists, every URL in it is a real route in `App.tsx`, and every
factual claim traces to this plan or to the existing chatAi SYSTEM_PROMPT.

### T6 — Teach the site chatbot about micromobility
source: this plan
files: `server/lib/chatAi.ts`
The `SYSTEM_PROMPT` feature list has a "Same Day Delivery management" line but nothing about
micromobility, so the site's own assistant cannot answer the question the new page is ranking for.
Add one feature bullet in the same style as the neighbouring ones, covering: riders as their own
person type, e-cargo bikes, morning/afternoon blocks, per-block availability and pay, licence-free
rider onboarding, on-foot couriers managed as riders. Keep it to one or two lines to match the
others — this prompt is sent on every chat turn.
Change nothing else in the file: not the pricing block, not the response rules, not the model id.
done-when: `npm run check` passes and the diff touches only the SYSTEM_PROMPT feature list.

## Out of scope

- Shipping. The reviewer runs the local `npm run build`, verifies the prerendered HTML, commits
  `dist/public`, and Rashid decides when it goes live.
- `robots.txt`. See T5.
- The chat launcher's colour. See T1.
- Any change to the app repo (`dop-app`). This plan is landing-page only.

## Reviewer's own checks, after the last task

1. `npm run build` locally (vite + esbuild + prerender), then open
   `dist/public/micromobility-delivery-software/index.html` and confirm the `<title>` and
   `<link rel="canonical">` are page-specific, NOT the homepage's. `scripts/prerender.mjs` catches
   all errors and exits 0, so a green build proves nothing.
2. Browser-verify the badge at both breakpoints — the mobile copy is a separate `sm:hidden` element.
3. Browser-verify the new page renders and its internal links resolve.
4. Re-check `git status` / `git log` immediately before committing `dist/public`: a scheduled blog
   agent commits straight to main in this repo and will conflict across ~20 hashed asset files.
