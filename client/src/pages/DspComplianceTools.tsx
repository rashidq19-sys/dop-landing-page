import { Link } from "wouter";
import { ArrowRight, Shield, FileCheck, Bell, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ChatbotWidget from "@/components/ChatbotWidget";
import SeoFaqAccordion from "@/components/SeoFaqAccordion";
import { usePageMeta, faqJsonLd, breadcrumbJsonLd } from "@/hooks/usePageMeta";
import type { Faq } from "@shared/faqs";

const faqs: Faq[] = [
  {
    question: "What does DSPOps track for compliance?",
    answer:
      "DSPOps tracks the documents UK DSPs need on file for every driver: Right-to-Work evidence, driving licence (with expiry), passport or other ID, insurance and any DSP-specific paperwork you require. Each item has an expiry date and an auto-reminder rule.",
  },
  {
    question: "How are expiry reminders sent?",
    answer:
      "When a document is approaching expiry, DSPOps surfaces it in the office view and notifies the driver in their portal. You set the reminder windows — for example, 30 days, 7 days, and day-of — and the platform handles the rest.",
  },
  {
    question: "Is DSPOps GDPR compliant?",
    answer:
      "Yes — DSPOps is UK-hosted, UK GDPR-compliant, and DSPOps Ltd is registered with the Information Commissioner's Office. We sign DPAs where required and keep audit logs for all personal data access.",
  },
  {
    question: "Where is driver data stored?",
    answer:
      "All personal data — including documents and photos — is stored in UK-hosted cloud infrastructure. The full list of subprocessors and what they receive is documented in our Privacy Policy.",
  },
  {
    question: "Can we see who accessed a specific driver record?",
    answer:
      "Yes. Sensitive data access is logged. Audit logs are available for review and can be exported on request.",
  },
];

const otherPages = [
  { name: "Driver rota management", href: "/dsp-rota-management" },
  { name: "Driver performance tracking", href: "/driver-performance-tracking" },
  { name: "Van inspection app", href: "/van-inspection-app" },
  { name: "Invoicing and payroll support", href: "/dsp-invoicing-payroll" },
  { name: "DSP management software overview", href: "/amazon-dsp-management-software" },
];

export default function DspComplianceTools() {
  usePageMeta({
    title: "Amazon DSP Compliance Tools | DSPOps",
    description:
      "Compliance tools for UK Amazon DSPs. Right-to-Work, driving licence and insurance expiry tracking with auto-reminders. UK-hosted, GDPR-compliant, with audit logs.",
    canonicalPath: "/dsp-compliance-tools",
    jsonLd: [
      faqJsonLd(faqs),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "DSP Compliance Tools", path: "/dsp-compliance-tools" },
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
              <span className="text-[#353538]">DSP Compliance Tools</span>
            </nav>
            <h1 className="text-[36px] sm:text-[56px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02] max-w-[820px]">
              Amazon DSP compliance tools, built for UK Delivery Service Partners.
            </h1>
            <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[760px]">
              Right-to-Work, driving licences, insurance and other driver documents tracked in one place with
              auto-reminders before expiry. UK-hosted, GDPR-compliant, with audit logs for every sensitive data
              access.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#book-demo"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-lg text-[15px] font-bold hover:bg-brand-dark transition-colors"
              >
                Book a 20-min demo <ArrowRight size={16} />
              </a>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-5 py-3 text-[#353538] text-[15px] font-semibold hover:text-[#111113] transition-colors"
              >
                See our Privacy Policy →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — THE PROBLEM
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Compliance documents in a folder of PDFs nobody looks at until something expires.
              </h2>
            </div>
            <div className="text-[16px] text-[#353538] leading-[1.65] space-y-4">
              <p>
                Most DSPs we talk to keep driver documents in a shared folder, a HR app, or a stack of PDFs on
                somebody's laptop. Nobody checks until a Right-to-Work expires mid-week and a driver has to come
                off the rota at short notice.
              </p>
              <p>
                The compliance problem isn't intent — it's visibility. Without a single dashboard that shows what's
                expiring this week and what's already lapsed, the documents slip through.
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
              Compliance you can actually see.
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: FileCheck,
                  title: "All required documents tracked",
                  body: "Right-to-Work, driving licence, passport, insurance and your DSP-specific paperwork — each with an expiry date and audit history.",
                },
                {
                  icon: Bell,
                  title: "Auto-reminders before expiry",
                  body: "Configurable reminder windows surface expiring documents in the office view and notify the driver in their portal.",
                },
                {
                  icon: Shield,
                  title: "UK-hosted, UK GDPR-compliant",
                  body: "All driver data stays in the UK. DSPOps Ltd is registered with the Information Commissioner's Office.",
                },
                {
                  icon: Lock,
                  title: "Audit logs for sensitive data",
                  body: "Sensitive data access is logged. Audit trails are available for review and can be exported on request.",
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
                — IN PRACTICE
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                The dashboard you wish you had at audit time.
              </h2>
              <p className="mt-5 text-[16px] text-[#353538] leading-[1.65]">
                When an Amazon DSP audit or an Right-to-Work spot-check happens, the question is always the same:
                "Show us the documents for these drivers." With DSPOps you open the compliance view, filter to the
                drivers in question, and export. Designed to make compliance reviews boring — in a good way.
              </p>
            </div>
            <div className="bg-gradient-to-b from-background to-border/40 rounded-[16px] border border-border p-6 sm:p-9 flex items-center justify-center">
              <img
                src="/images/compliance.png"
                alt="DSPOps compliance dashboard"
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
                  Compliance tools — common questions.
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
