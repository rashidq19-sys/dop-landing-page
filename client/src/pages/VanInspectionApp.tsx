import { Link } from "wouter";
import { ArrowRight, Camera, Clock, FileCheck, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ChatbotWidget from "@/components/ChatbotWidget";
import SeoFaqAccordion from "@/components/SeoFaqAccordion";
import { usePageMeta, faqJsonLd, breadcrumbJsonLd } from "@/hooks/usePageMeta";
import type { Faq } from "@shared/faqs";

const faqs: Faq[] = [
  {
    question: "How does the van inspection app work?",
    answer:
      "Drivers open the DSPOps driver portal on their phone's browser, walk around the van, and submit the daily check — photos for each side, video where required, and a quick condition tick-list. Submissions land in the office view, so you can see at a glance who has and hasn't checked in.",
  },
  {
    question: "Do drivers need to install anything?",
    answer:
      "No app store, no download. Drivers get a one-tap login link via text and use any phone's browser. The portal is designed to work even on patchy signal so checks aren't blocked at depot.",
  },
  {
    question: "Can DSPOps replace our existing third-party inspection app?",
    answer:
      "Yes — DSPOps is designed to replace standalone van inspection apps that typically cost £200+ a month. The checks, photos, video and audit trail are all built into the platform alongside rota, scorecards and payroll.",
  },
  {
    question: "Where do van photos and videos get stored?",
    answer:
      "Files are stored in UK-hosted cloud storage. Access is logged, and only your DSP's staff with the right permission can view them. Files are retained according to your retention policy and the storage section of our Privacy Policy.",
  },
  {
    question: "Can owners see who hasn't completed their van check?",
    answer:
      "Yes. The morning view shows every driver due to depart, their check status, and any flagged condition issues — so you can chase the laggards before the wave starts rather than after.",
  },
];

const otherPages = [
  { name: "Driver rota management", href: "/dsp-rota-management" },
  { name: "Driver performance tracking", href: "/driver-performance-tracking" },
  { name: "Invoicing and payroll support", href: "/dsp-invoicing-payroll" },
  { name: "Compliance tools", href: "/dsp-compliance-tools" },
  { name: "DSP management software overview", href: "/amazon-dsp-management-software" },
];

export default function VanInspectionApp() {
  usePageMeta({
    title: "Van Inspection App for Amazon DSP Fleets | DSPOps",
    description:
      "Daily van inspections with photos and video, submitted from any driver's phone. Designed to replace third-party van inspection apps and give DSP owners a clean audit trail.",
    canonicalPath: "/van-inspection-app",
    jsonLd: [
      faqJsonLd(faqs),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Van Inspection App", path: "/van-inspection-app" },
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
              <span className="text-[#353538]">Van Inspection App</span>
            </nav>
            <h1 className="text-[36px] sm:text-[56px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02] max-w-[820px]">
              A van inspection app built into your DSP platform — not bolted on.
            </h1>
            <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[760px]">
              DSPOps gives every driver a daily van check on their phone, with photos and video, and gives owners a
              live view of who has and hasn't completed it. Designed to replace the standalone inspection app
              you're already paying for.
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
                — THE PROBLEM
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Most DSPs pay for a separate inspection app that doesn't talk to anything else.
              </h2>
            </div>
            <div className="text-[16px] text-[#353538] leading-[1.65] space-y-4">
              <p>
                Daily van checks are mandatory, but most DSPs run them in a separate app that costs £200 or more a
                month and doesn't share a single driver record with rota, payroll or scorecards. Photos sit in one
                place, the rota in another, and the office spends Friday matching them up.
              </p>
              <p>
                The other common pattern is even worse: drivers send check photos to a WhatsApp group, and somebody
                in the office spends an hour scrolling back through messages every time a damage claim or scorecard
                query needs evidence.
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
              Daily checks, with the same driver record as everything else.
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Camera,
                  title: "Photos and video per side",
                  body: "Drivers submit four-side photos and short walk-around video. Files attach to the driver record and the route — searchable by date, driver or van.",
                },
                {
                  icon: Clock,
                  title: "Live morning view for owners",
                  body: "See every driver due to depart, their check status, and any flagged condition issues. Chase the laggards before the wave starts.",
                },
                {
                  icon: FileCheck,
                  title: "Audit trail for damage claims",
                  body: "When a damage claim lands, the check photos for that van on that day are one click away. No more scrolling through WhatsApp.",
                },
                {
                  icon: AlertTriangle,
                  title: "Condition flags routed to ops",
                  body: "Drivers tag issues (lights, tyres, body) in the check form. Flags surface in the office view so problems get logged and routed, not lost.",
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
                — REPLACES YOUR INSPECTION APP
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                One platform. One driver record. No more £200/month for a single feature.
              </h2>
              <p className="mt-5 text-[16px] text-[#353538] leading-[1.65]">
                DSPOps is designed to replace the standalone van inspection app you're paying for today. The checks
                sit inside the same platform as rota, scorecards, payroll and compliance — so the same driver shows
                up consistently across every screen.
              </p>
              <ul className="mt-6 space-y-3 text-[15px] text-[#353538]">
                {[
                  "Designed to work on patchy signal at depot",
                  "Photos and video stored in UK-hosted cloud storage",
                  "Access logged, retention policy applied per your settings",
                  "Linked to driver record, route and van — one record, every screen",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-b from-background to-border/40 rounded-[16px] border border-border p-6 sm:p-9 flex items-center justify-center">
              <img
                src="/images/van-checks.png"
                alt="DSPOps van inspection app on a phone"
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
                  Van inspection app — common questions.
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
