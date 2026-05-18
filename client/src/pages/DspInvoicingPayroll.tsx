import { Link } from "wouter";
import { ArrowRight, PoundSterling, Calculator, FileSpreadsheet, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ChatbotWidget from "@/components/ChatbotWidget";
import SeoFaqAccordion from "@/components/SeoFaqAccordion";
import { usePageMeta, faqJsonLd, breadcrumbJsonLd } from "@/hooks/usePageMeta";
import type { Faq } from "@shared/faqs";

const faqs: Faq[] = [
  {
    question: "How does DSPOps calculate driver pay?",
    answer:
      "DSPOps connects to Amazon Cortex's Work Summary Tool and pulls each driver's worked hours, routes, stops and miles every day. The platform applies your pay rules — standard rates, SDD rates, overtime, mileage, bonus thresholds — and produces a per-driver pay number you can audit line by line.",
  },
  {
    question: "Can I export payroll to send to my accountant?",
    answer:
      "Yes — one-click CSV export, with period totals that reconcile automatically. You can send the file to your accountant, or push it into payroll software that accepts CSV import.",
  },
  {
    question: "Does it handle different pay rates for SDD?",
    answer:
      "Yes. Standard and Same-Day Delivery routes can have separate hourly rates, applied per route automatically — no manual splits, no risk of paying SDD work at standard rates.",
  },
  {
    question: "Can drivers see their own pay before payroll runs?",
    answer:
      "Drivers see their earned pay in the portal in near real time — the routes they ran, the hours worked, the bonuses hit. It cuts the volume of \"what's my pay this week?\" calls considerably.",
  },
  {
    question: "What if there's a dispute on a payslip?",
    answer:
      "Every pay line traces back to a specific route, date and Cortex record. When a driver questions a number you open their pay period, show them the routes and hours that built it, and resolve the conversation in minutes instead of hours.",
  },
];

const otherPages = [
  { name: "Driver rota management", href: "/dsp-rota-management" },
  { name: "Driver performance tracking", href: "/driver-performance-tracking" },
  { name: "Van inspection app", href: "/van-inspection-app" },
  { name: "Compliance tools", href: "/dsp-compliance-tools" },
  { name: "DSP management software overview", href: "/amazon-dsp-management-software" },
];

export default function DspInvoicingPayroll() {
  usePageMeta({
    title: "DSP Invoicing and Payroll Support Software | DSPOps",
    description:
      "DSP invoicing and payroll support that pulls driver pay directly from Amazon Cortex's Work Summary Tool. One-click CSV exports for accountants. Built for UK Delivery Service Partners.",
    canonicalPath: "/dsp-invoicing-payroll",
    jsonLd: [
      faqJsonLd(faqs),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "DSP Invoicing and Payroll", path: "/dsp-invoicing-payroll" },
      ]),
    ],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[68px]">
        <section className="bg-background border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
            <nav aria-label="Breadcrumb" className="text-[12px] text-[#6C6C72] mb-4">
              <Link href="/" className="hover:text-[#111113]">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-[#353538]">DSP Invoicing and Payroll</span>
            </nav>
            <h1 className="text-[36px] sm:text-[56px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02] max-w-[820px]">
              DSP invoicing and payroll support, calculated from Cortex.
            </h1>
            <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[760px]">
              Stop rekeying driver hours into Excel every Sunday night. DSPOps pulls pay directly from Amazon
              Cortex's Work Summary Tool, applies your pay rules, and produces a per-driver number you can audit
              line by line — ready to export to your accountant.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#book-demo"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-lg text-[15px] font-bold hover:bg-brand-dark transition-colors"
              >
                Book a 20-min demo <ArrowRight size={16} />
              </a>
              <Link
                href="/amazon-dsp-management-software"
                className="inline-flex items-center gap-2 px-5 py-3 text-[#353538] text-[15px] font-semibold hover:text-[#111113] transition-colors"
              >
                See the full platform →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — A TYPICAL FRIDAY
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Hours of payroll. Cortex screenshots. Manual reconciliation. Monday complaints.
              </h2>
            </div>
            <div className="text-[16px] text-[#353538] leading-[1.65] space-y-4">
              <p>
                Most DSP owners spend the best part of a Friday — or worse, a Sunday — pulling Cortex screenshots,
                matching drivers to routes, applying different pay rates for standard vs Same-Day, adding holiday
                pay, adjusting for sickness, sending the file to the accountant, then fielding complaints on
                Monday.
              </p>
              <p>
                The whole loop runs on copy-pasting from one screen to another, with no audit trail when a driver
                questions a number.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — THE SOLUTION
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1] max-w-[760px]">
              Built for DSP payroll, not generic payroll.
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: PoundSterling,
                  title: "Mixed standard + SDD pay rates",
                  body: "Different hourly rates for standard and Same-Day Delivery routes, applied per route automatically.",
                },
                {
                  icon: Calculator,
                  title: "Live mileage and bonus thresholds",
                  body: "Pay per mile, per stop, or per bonus tier — calculated against live Cortex data, not Friday's screenshot.",
                },
                {
                  icon: FileSpreadsheet,
                  title: "Accountant-ready exports",
                  body: "One-click CSV for your accountant, or push to payroll software. Period totals reconcile automatically.",
                },
                {
                  icon: ShieldCheck,
                  title: "Every pay line is auditable",
                  body: "Each number traces back to a route, a date and a Cortex record. When a driver disputes, you have receipts.",
                },
              ].map((it) => (
                <div key={it.title} className="bg-white rounded-[14px] border border-border p-6">
                  <it.icon size={22} className="text-brand" />
                  <h3 className="mt-4 text-[17px] font-bold text-[#111113]">{it.title}</h3>
                  <p className="mt-2 text-[14px] text-[#6C6C72] leading-[1.6]">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — DRIVERS SEE THEIR OWN PAY
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Self-service payslips. Fewer "what's my pay?" calls.
              </h2>
              <p className="mt-5 text-[16px] text-[#353538] leading-[1.65]">
                Every driver opens the portal and sees what they've earned this week — the routes they ran, the
                hours worked, the bonuses they hit. They can download past payslips themselves. The office stops
                answering the same five questions every Friday.
              </p>
            </div>
            <div className="bg-gradient-to-b from-background to-border/40 rounded-[16px] border border-border p-6 sm:p-9 flex items-center justify-center">
              <img
                src="/images/payroll-phone.png"
                alt="DSPOps payroll view on a phone"
                loading="lazy"
                className="max-h-[480px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]"
              />
            </div>
          </div>
        </section>

        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">FAQ</span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#111113] tracking-tight">
                  DSP invoicing and payroll — common questions.
                </h2>
              </div>
              <SeoFaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>

        <section className="bg-white py-12 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-4">
              — EXPLORE THE PLATFORM
            </div>
            <div className="flex flex-wrap gap-3">
              {otherPages.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-full text-[13px] font-semibold text-[#353538] hover:border-brand hover:text-brand transition-colors"
                >
                  {p.name} <ArrowRight size={12} />
                </Link>
              ))}
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
