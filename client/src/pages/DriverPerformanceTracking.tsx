import { Link } from "wouter";
import { ArrowRight, Eye, TrendingUp, Users, BarChart2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ChatbotWidget from "@/components/ChatbotWidget";
import SeoFaqAccordion from "@/components/SeoFaqAccordion";
import { usePageMeta, faqJsonLd, breadcrumbJsonLd } from "@/hooks/usePageMeta";
import type { Faq } from "@shared/faqs";

const faqs: Faq[] = [
  {
    question: "What does DSPOps track for driver performance?",
    answer:
      "DSPOps pulls the core Amazon Cortex scorecard metrics into the platform live: DCR (Delivery Completion Rate), DPMO (Defects Per Million Opportunities), DNRs (Delivered Not Received), POD (Photo on Delivery), CC (Contact Compliance) and CDF (Customer Delivery Feedback). Each metric is broken down per driver and per route.",
  },
  {
    question: "How is this different from looking at Cortex directly?",
    answer:
      "Cortex shows the weekly fleet-level scorecard, which doesn't tell you which driver or route is dragging the numbers. DSPOps brings the same data in but joins it to your roster, so a low POD score lands on the specific driver who missed the photos.",
  },
  {
    question: "Can drivers see their own performance?",
    answer:
      "Yes — every driver gets a personal portal showing their own contribution to the fleet scorecard. The drivers who care about being top of the leaderboard tend to self-correct without a separate meeting.",
  },
  {
    question: "Does DSPOps support same-day delivery performance tracking?",
    answer:
      "Yes. SDD routes are tracked separately with their own SLA timers and metrics, so same-day performance doesn't get mixed in with standard delivery numbers.",
  },
  {
    question: "How quickly does new performance data appear?",
    answer:
      "Scorecard data refreshes from Cortex on a regular cadence throughout the day. You see day-by-day movement rather than a Monday-morning weekly summary.",
  },
];

const otherPages = [
  { name: "Driver rota management", href: "/dsp-rota-management" },
  { name: "Van inspection app", href: "/van-inspection-app" },
  { name: "Invoicing and payroll support", href: "/dsp-invoicing-payroll" },
  { name: "Compliance tools", href: "/dsp-compliance-tools" },
  { name: "DSP management software overview", href: "/amazon-dsp-management-software" },
];

export default function DriverPerformanceTracking() {
  usePageMeta({
    title: "DSP Driver Performance Tracking Software | DSPOps",
    description:
      "Track every Amazon Cortex scorecard metric per driver and per route. DCR, DPMO, DNRs, POD, CC and CDF — live, so OSMs can act mid-week instead of explaining a drop on Monday.",
    canonicalPath: "/driver-performance-tracking",
    jsonLd: [
      faqJsonLd(faqs),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Driver Performance Tracking", path: "/driver-performance-tracking" },
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
              <span className="text-[#353538]">Driver Performance Tracking</span>
            </nav>
            <h1 className="text-[36px] sm:text-[56px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02] max-w-[820px]">
              DSP driver performance tracking, joined up to the Cortex scorecard.
            </h1>
            <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[760px]">
              DSPOps brings Amazon Cortex scorecard data into the platform live and breaks it down per driver and
              per route. Designed to give owners and OSMs the visibility they need to intervene mid-week instead of
              explaining a drop on Monday.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#book-demo"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-lg text-[15px] font-bold hover:bg-brand-dark transition-colors"
              >
                Book a 20-min demo <ArrowRight size={16} />
              </a>
              <Link
                href="/blog/improve-amazon-cortex-scorecard"
                className="inline-flex items-center gap-2 px-5 py-3 text-[#353538] text-[15px] font-semibold hover:text-[#111113] transition-colors"
              >
                Read: improving your Cortex scorecard →
              </Link>
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
                Cortex tells you the fleet score. It doesn't tell you who's dragging it.
              </h2>
            </div>
            <div className="text-[16px] text-[#353538] leading-[1.65] space-y-4">
              <p>
                Every Monday, owners open Cortex and see a fleet-average score. The metric moved, but the data
                doesn't tell you which driver, which route or which day caused it — and by the time you ask the OSM
                to find out, the people involved have forgotten the specifics.
              </p>
              <p>
                Without per-driver visibility through the week, the same problems repeat. The same driver drops POD
                photos. The same route runs late. The same CC misses happen on the same shift. The numbers move
                only after you've already explained the drop.
              </p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — THE PLATFORM
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1] max-w-[760px]">
              Per-driver, per-route, live.
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { metric: "DCR", name: "Delivery Completion Rate", body: "Per-driver completion live. Spot drop-offs before they hit your weekly score." },
                { metric: "DPMO", name: "Defects Per Million Ops", body: "Defect events grouped by type, driver and route — patterns instead of noise." },
                { metric: "DNR", name: "Delivered Not Received", body: "Track DNR claims back to specific drops, drivers and customer addresses." },
                { metric: "POD", name: "Photo on Delivery", body: "Compliance per driver, per wave — including drivers consistently skipping photos." },
                { metric: "CC", name: "Contact Compliance", body: "Which drivers are calling customers, which aren't, and how it correlates to CDF dips." },
                { metric: "CDF", name: "Customer Delivery Feedback", body: "Live feedback scores rolled up per driver — the metric your DA-of-the-month uses to win." },
              ].map((m) => (
                <div
                  key={m.metric}
                  className="bg-white rounded-[14px] border border-border p-6 shadow-[0_1px_2px_rgba(17,17,19,0.04)]"
                >
                  <div className="text-[20px] font-extrabold text-brand tracking-tight">{m.metric}</div>
                  <h3 className="mt-1 text-[15px] font-bold text-[#111113]">{m.name}</h3>
                  <p className="mt-2 text-[14px] text-[#6C6C72] leading-[1.6]">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How owners use it */}
        <section className="bg-white py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — HOW OSMs USE IT
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Stop debating averages. Start fixing patterns.
              </h2>
              <div className="mt-8 space-y-5">
                {[
                  {
                    icon: Eye,
                    title: "Live per-driver visibility",
                    body: "Each driver's scorecard is visible to them in the portal — the conversation shifts from 'fleet score dropped' to 'three things to fix on your routes this week'.",
                  },
                  {
                    icon: Users,
                    title: "OSM dashboards that act",
                    body: "DSPOps flags the drivers and routes most likely to drag the scorecard and ranks them by impact, so the morning huddle is two minutes not twenty.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Weekly trend, not weekly shock",
                    body: "See metric movement day by day. Intervene mid-week instead of explaining a fall on Friday.",
                  },
                ].map((it) => (
                  <div key={it.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-[10px] bg-brand/10 flex items-center justify-center shrink-0">
                      <it.icon size={18} className="text-brand" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-[#111113]">{it.title}</h3>
                      <p className="mt-1 text-[14px] text-[#6C6C72] leading-[1.6]">{it.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-b from-background to-border/40 rounded-[16px] border border-border p-6 sm:p-9 flex items-center justify-center">
              <img
                src="/images/scorecard.png"
                alt="DSPOps Amazon Cortex scorecard view per driver"
                loading="lazy"
                className="max-h-[480px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]"
              />
            </div>
          </div>
        </section>

        {/* Driver self-service */}
        <section className="bg-background py-16 sm:py-20 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — DRIVERS SEE THEIR OWN SCORES
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Self-correcting drivers, without the lectures.
              </h2>
              <p className="mt-5 text-[16px] text-[#353538] leading-[1.65]">
                Every driver opens the portal and sees their own DCR, POD and CC. The drivers who care about the
                leaderboard tend to self-correct without a meeting. The ones who don't are visible immediately.
              </p>
            </div>
            <div className="bg-white rounded-[16px] border border-border p-6">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 size={18} className="text-brand" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6C6C72]">
                  WORKS WITH
                </span>
              </div>
              <div className="text-[28px] font-extrabold text-[#111113] tracking-[-0.02em]">Amazon Cortex</div>
              <p className="mt-3 text-[14px] text-[#6C6C72] leading-[1.6]">
                Live sync. Scorecards, delivery progress and route data flow into DSPOps automatically — no manual
                re-keying, no "why is my score wrong?" calls.
              </p>
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
                  Driver performance tracking — common questions.
                </h2>
              </div>
              <SeoFaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>

        {/* Internal cross-links */}
        <section className="bg-background py-12 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-4">
              — EXPLORE THE PLATFORM
            </div>
            <div className="flex flex-wrap gap-3">
              {otherPages.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-full text-[13px] font-semibold text-[#353538] hover:border-brand hover:text-brand transition-colors"
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
