import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ChatbotWidget from "@/components/ChatbotWidget";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Link } from "wouter";
import { BarChart2, TrendingUp, Eye, Users, ArrowRight } from "lucide-react";

export default function FeatureScorecard() {
  usePageMeta({
    title: "Amazon Cortex scorecard tracking for DSPs | DSPOps",
    description:
      "Track and improve your Amazon Cortex scorecard live. DCR, DPMO, DNRs, POD, CC, CDF — every metric, per driver and fleet-wide, with the patterns that move the needle.",
    canonicalPath: "/features/scorecard",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[68px]">
        {/* Hero */}
        <section className="bg-background border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-4">
              — SCORECARD MODULE
            </div>
            <h1 className="text-[36px] sm:text-[56px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02] max-w-[820px]">
              Track your Amazon Cortex scorecard live — and actually move it.
            </h1>
            <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[760px]">
              Every Amazon DSP owner has stared at their weekly Cortex scorecard wondering which driver is dragging
              the numbers. DSPOps pulls your scorecard data live, splits it per driver, and surfaces the patterns
              that explain a dropped metric — so the same problem doesn't recur next week.
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
                Read: How to improve your Cortex scorecard →
              </Link>
            </div>
          </div>
        </section>

        {/* Screenshot + lead copy */}
        <section className="bg-white py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Every Cortex metric, live, per driver.
              </h2>
              <p className="mt-5 text-[16px] text-[#353538] leading-[1.65]">
                DSPOps syncs directly with Amazon Cortex. The metrics that decide your scorecard — DCR (Delivery
                Completion Rate), DPMO (Defects Per Million Opportunities), DNRs (Delivered Not Received), POD
                (Photo on Delivery), CC (Contact Compliance), CDF (Customer Delivery Feedback) — all flow into
                DSPOps as they update, with the per-driver breakdown your OSM needs to act.
              </p>
              <p className="mt-4 text-[16px] text-[#353538] leading-[1.65]">
                Instead of one weekly screenshot of fleet averages, you see the metric movement in real time: which
                driver missed a POD on Tuesday's wave, which van went off-route, which route consistently produces a
                low CC score. The problems become specific — and fixable.
              </p>
            </div>
            <div className="bg-gradient-to-b from-background to-border/40 rounded-[16px] border border-border p-6 sm:p-9 flex items-center justify-center">
              <img
                src="/images/scorecard.png"
                alt="DSPOps Amazon Cortex scorecard view"
                className="max-h-[480px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]"
              />
            </div>
          </div>
        </section>

        {/* Metrics it tracks */}
        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — METRICS COVERED
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1] max-w-[700px]">
              The full Amazon DSP scorecard, broken down where it matters.
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { metric: "DCR", name: "Delivery Completion Rate", body: "See per-driver completion live — spot drop-offs before they hit your weekly score." },
                { metric: "DPMO", name: "Defects Per Million Ops", body: "Defect events broken down by type, driver, and route — patterns instead of noise." },
                { metric: "DNR", name: "Delivered Not Received", body: "Track DNR claims back to specific drops, drivers, and customer addresses." },
                { metric: "POD", name: "Photo on Delivery", body: "Compliance per driver, per wave — including drivers who consistently skip photos." },
                { metric: "CC", name: "Contact Compliance", body: "Which drivers are calling customers, which aren't, and where it correlates to CDF dips." },
                { metric: "CDF", name: "Customer Delivery Feedback", body: "Live feedback scores rolled up per driver — the one your DA-of-the-month uses to win." },
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

        {/* Use case */}
        <section className="bg-white py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — HOW DSP OWNERS USE IT
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1] max-w-[700px]">
              Stop debating averages. Start fixing patterns.
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Eye,
                  title: "Live per-driver visibility",
                  body: "Every driver sees their own scorecard inside the portal. The conversation shifts from 'the fleet score dropped' to 'here are the three things to fix on your routes this week'.",
                },
                {
                  icon: Users,
                  title: "OSM dashboards that act",
                  body: "Your OSM doesn't dig through Cortex tabs. DSPOps flags the drivers and routes most likely to drag the scorecard — and ranks them by impact.",
                },
                {
                  icon: TrendingUp,
                  title: "Weekly trend, not weekly shock",
                  body: "See the metric moving day by day, not as a Monday-morning surprise. Intervene mid-week instead of explaining a fall on Friday.",
                },
              ].map((it) => (
                <div key={it.title} className="bg-background rounded-[14px] border border-border p-6">
                  <it.icon size={22} className="text-brand" />
                  <h3 className="mt-4 text-[17px] font-bold text-[#111113]">{it.title}</h3>
                  <p className="mt-2 text-[14px] text-[#6C6C72] leading-[1.6]">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Driver portal tie-in */}
        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — DRIVERS SEE THEIR OWN SCORES
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Self-correcting drivers, without the lectures.
              </h2>
              <p className="mt-5 text-[16px] text-[#353538] leading-[1.65]">
                Every driver logs into their own portal and sees their personal contribution to the fleet scorecard
                — their own DCR, their own CC, their own POD. The drivers who care about being top of the leaderboard
                self-correct without you running a meeting. The ones who don't are visible immediately.
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
                Two-way sync. Scorecards, delivery progress, and route data flow into DSPOps automatically. No manual
                re-keying, no "why is my score wrong?" calls.
              </p>
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
