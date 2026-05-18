import { Link } from "wouter";
import { ArrowRight, Check, Calendar, BarChart2, Truck, PoundSterling, Shield, Smartphone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ChatbotWidget from "@/components/ChatbotWidget";
import SeoFaqAccordion from "@/components/SeoFaqAccordion";
import { usePageMeta, faqJsonLd, breadcrumbJsonLd } from "@/hooks/usePageMeta";
import type { Faq } from "@shared/faqs";

const faqs: Faq[] = [
  {
    question: "What is Amazon DSP management software?",
    answer:
      "Amazon DSP management software is a platform designed to help Delivery Service Partners run the operational side of their fleet — driver scheduling, performance tracking, van inspections, payroll, and compliance. It's built around the specific way Amazon DSPs work, so it integrates with Amazon Cortex and supports both standard and Same-Day Delivery operations.",
  },
  {
    question: "Why do UK Delivery Service Partners need a dedicated platform?",
    answer:
      "DSP operations don't fit neatly into generic fleet software. Owners juggle Cortex scorecards, route assignments, driver portals, van checks and weekly payroll all referencing the same drivers. DSPOps is designed for that workflow, so the same driver record connects to their rota, their score, their van check, and their payslip.",
  },
  {
    question: "Does DSPOps work with Amazon Cortex?",
    answer:
      "Yes — DSPOps connects to Amazon Cortex to pull scorecard data, delivery progress and route information into the platform. You don't need to re-key data between systems, and per-driver metrics are surfaced live rather than as a weekly summary screenshot.",
  },
  {
    question: "How long does it take to get set up?",
    answer:
      "Most DSPs are live in around 20 minutes. The team imports your drivers from CSV, connects your Cortex feed and generates driver portal logins. Priority onboarding sessions are included on Professional and Enterprise plans.",
  },
  {
    question: "Is DSPOps suitable for DSPs running Same-Day Delivery?",
    answer:
      "Yes. SDD is a first-class module, not a bolt-on. You get a separate wave view for same-day routes, tighter SLA timers, late-stop alerts, and SDD-specific payroll rates — without losing visibility on standard delivery routes.",
  },
  {
    question: "Is it GDPR compliant?",
    answer:
      "Yes — DSPOps is UK-hosted and GDPR-compliant. Driver data stays in the UK, DPAs are signed where required, and audit logs are kept for all data access.",
  },
];

const modules = [
  {
    icon: Calendar,
    name: "Driver rota management",
    href: "/dsp-rota-management",
    summary: "Drivers set their own availability. The rota assembles itself and cover is reassigned in two taps.",
  },
  {
    icon: BarChart2,
    name: "Driver performance tracking",
    href: "/driver-performance-tracking",
    summary: "Cortex scorecard metrics, broken down per driver and per route. DCR, DPMO, DNRs, POD, CC, CDF.",
  },
  {
    icon: Truck,
    name: "Van inspection app",
    href: "/van-inspection-app",
    summary: "Daily van checks with photos and video, submitted from any phone's browser. Audit trail for owners.",
  },
  {
    icon: PoundSterling,
    name: "Invoicing and payroll support",
    href: "/dsp-invoicing-payroll",
    summary: "Driver pay calculated from Amazon Cortex's Work Summary Tool. One-click export for accountants.",
  },
  {
    icon: Shield,
    name: "Compliance tools",
    href: "/dsp-compliance-tools",
    summary: "Right-to-work, licence and insurance expiries tracked with auto-reminders. UK-hosted and GDPR-compliant.",
  },
  {
    icon: Smartphone,
    name: "DSP driver app",
    href: "/amazon-dsp-management-software",
    summary: "Every driver gets their own login — view rota, payslips, scorecards, and submit van inspections.",
  },
];

export default function AmazonDspManagementSoftware() {
  usePageMeta({
    title: "Amazon DSP Management Software UK | DSPOps",
    description:
      "Amazon DSP management software designed for UK Delivery Service Partners. Driver scheduling, performance tracking, van inspections, payroll and compliance in one platform.",
    canonicalPath: "/amazon-dsp-management-software",
    jsonLd: [
      faqJsonLd(faqs),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Amazon DSP Management Software", path: "/amazon-dsp-management-software" },
      ]),
    ],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[68px]">
        {/* Hero */}
        <section className="bg-background border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
            <nav aria-label="Breadcrumb" className="text-[12px] text-[#6C6C72] mb-4">
              <Link href="/" className="hover:text-[#111113]">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-[#353538]">Amazon DSP Management Software</span>
            </nav>
            <h1 className="text-[36px] sm:text-[56px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02] max-w-[860px]">
              Amazon DSP management software, built for UK Delivery Service Partners.
            </h1>
            <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[760px]">
              DSPOps brings driver scheduling, performance tracking, van inspections, payroll support and compliance
              tools into a single platform designed for how UK Amazon DSPs actually run. It's built to reduce the
              tools owners juggle and give OSMs better visibility on the metrics that move the weekly scorecard.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#book-demo"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-lg text-[15px] font-bold hover:bg-brand-dark transition-colors"
              >
                Book a 20-min demo <ArrowRight size={16} />
              </a>
              <a
                href="#platform"
                className="inline-flex items-center gap-2 px-5 py-3 text-[#353538] text-[15px] font-semibold hover:text-[#111113] transition-colors"
              >
                See the platform →
              </a>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="bg-white py-16 sm:py-20 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — THE PROBLEM
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Most DSPs run on five separate tools that don't talk to each other.
              </h2>
            </div>
            <div className="text-[16px] text-[#353538] leading-[1.65] space-y-4">
              <p>
                A typical UK DSP runs the rota in Excel, dispatches over WhatsApp, checks vans on a third-party
                inspection app, calculates pay against Cortex screenshots in a separate sheet, and tracks compliance
                in a folder of PDFs. Each tool stores driver data its own way, and none of them know about each
                other.
              </p>
              <p>
                The result is the same problem every week: somebody on your team is rebuilding tables in Excel
                instead of running the operation. Drivers ask the same questions on WhatsApp because they can't see
                their rota, their pay or their score in one place.
              </p>
            </div>
          </div>
        </section>

        {/* Solution / Modules */}
        <section id="platform" className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — THE PLATFORM
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1] max-w-[760px]">
              Every part of running a DSP, joined up.
            </h2>
            <p className="mt-5 text-[16px] text-[#353538] leading-[1.6] max-w-[760px]">
              Each DSPOps module is built for a specific job UK DSP owners have to do every week. They share one
              driver record, so the same person on Cortex is the same person on the rota, the payslip and the van
              check.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {modules.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="group bg-white rounded-[14px] border border-border p-6 hover:border-brand transition-colors flex flex-col"
                >
                  <m.icon size={22} className="text-brand" />
                  <h3 className="mt-4 text-[17px] font-bold text-[#111113] group-hover:text-brand transition-colors">
                    {m.name}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#6C6C72] leading-[1.6] flex-1">{m.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand">
                    Learn more <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What to look for */}
        <section className="bg-white py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — WHAT TO LOOK FOR
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1] max-w-[760px]">
              How to evaluate Amazon DSP management software.
            </h2>
            <p className="mt-5 text-[16px] text-[#353538] leading-[1.6] max-w-[760px]">
              If you're comparing platforms, these are the questions that matter most for UK DSPs.
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Does it actually connect to Amazon Cortex?",
                  body: "Live scorecard sync — not weekly screenshot uploads — is the difference between intervening mid-week and explaining a drop on Monday.",
                },
                {
                  title: "Is it designed for DSPs, or general fleet software?",
                  body: "Generic fleet tools don't know about Cortex, Work Summary Tool exports, or SDD waves. A DSP-specific platform reflects how the operation actually runs.",
                },
                {
                  title: "Does it cover the full week's workflow?",
                  body: "Rota, dispatch, performance, payroll and compliance need to share one driver record. Stitching together five separate apps creates the spreadsheet rebuild problem you're trying to escape.",
                },
                {
                  title: "Do drivers get their own portal?",
                  body: "If drivers can't see their rota, score and pay themselves, the office spends the week answering questions instead of running the operation.",
                },
                {
                  title: "Is it built for UK compliance?",
                  body: "Right-to-work, licence expiry, GDPR data residency and ICO registration matter for UK DSPs. Generic global tools rarely tick all four.",
                },
                {
                  title: "Does Same-Day Delivery have first-class support?",
                  body: "If you run SDD contracts now or might in future, SDD needs its own rota view, wave timing and pay rates — not a workaround on top of standard delivery.",
                },
              ].map((it) => (
                <div key={it.title} className="bg-background rounded-[14px] border border-border p-6">
                  <div className="flex items-start gap-3">
                    <Check size={20} className="text-brand shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[16px] font-bold text-[#111113]">{it.title}</h3>
                      <p className="mt-2 text-[14px] text-[#6C6C72] leading-[1.6]">{it.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshot */}
        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — DRIVER PORTAL
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Drivers see their own rota, score and pay. You stop fielding the same five questions every Friday.
              </h2>
              <p className="mt-5 text-[16px] text-[#353538] leading-[1.65]">
                Every driver gets a personal login — no app download — and sees their week's routes, their personal
                Cortex score, their last payslip and any compliance documents they need to update. Self-service for
                the things drivers ask about every week.
              </p>
            </div>
            <div className="bg-white rounded-[16px] border border-border p-6 sm:p-9 flex items-center justify-center">
              <img
                src="/images/driver-portal.png"
                alt="DSPOps driver portal on a phone"
                loading="lazy"
                className="max-h-[480px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">FAQ</span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#111113] tracking-tight">
                  Common questions about DSP management software.
                </h2>
                <p className="mt-4 text-[15px] text-[#6C6C72]">
                  Something else on your mind? Email{" "}
                  <a href="mailto:support@dspops.app" className="text-brand font-semibold hover:underline">
                    support@dspops.app
                  </a>{" "}
                  — real humans answer.
                </p>
              </div>
              <SeoFaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
