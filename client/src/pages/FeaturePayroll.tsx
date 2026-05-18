import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ChatbotWidget from "@/components/ChatbotWidget";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Link } from "wouter";
import { PoundSterling, FileSpreadsheet, Calculator, ShieldCheck, ArrowRight } from "lucide-react";

export default function FeaturePayroll() {
  usePageMeta({
    title: "DSP payroll, calculated from Amazon Cortex | DSPOps",
    description:
      "Stop re-keying driver hours into Excel every Sunday. DSPOps pulls driver pay directly from Amazon Cortex's Work Summary Tool — one-click export ready for your accountant.",
    canonicalPath: "/features/payroll",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[68px]">
        {/* Hero */}
        <section className="bg-background border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-4">
              — PAYROLL MODULE
            </div>
            <h1 className="text-[36px] sm:text-[56px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02] max-w-[820px]">
              Payroll that calculates itself from Cortex.
            </h1>
            <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[760px]">
              Every Sunday night, somebody in your office is hand-typing driver hours into a payroll spreadsheet,
              cross-checking Cortex screenshots, and praying the numbers add up. DSPOps removes that step entirely —
              driver pay is calculated live from Amazon Cortex's Work Summary Tool, with full visibility per driver,
              per route, per day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#book-demo"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-lg text-[15px] font-bold hover:bg-brand-dark transition-colors"
              >
                Book a 20-min demo <ArrowRight size={16} />
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 text-[#353538] text-[15px] font-semibold hover:text-[#111113] transition-colors"
              >
                See the full platform →
              </Link>
            </div>
          </div>
        </section>

        {/* Screenshot + lead copy */}
        <section className="bg-white py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                One source of truth for what every driver earned.
              </h2>
              <p className="mt-5 text-[16px] text-[#353538] leading-[1.65]">
                DSPOps connects to Amazon Cortex's Work Summary Tool and pulls down each driver's worked hours,
                routes, stops, and miles every single day. We apply your pay rules — standard rates, SDD rates,
                overtime, mileage, bonus thresholds — and produce a payroll number per driver that you can audit
                line by line.
              </p>
              <p className="mt-4 text-[16px] text-[#353538] leading-[1.65]">
                When a driver argues about their pay on a Friday afternoon, you don't dig through screenshots. You
                open their driver record, click the pay period, and show them the exact routes, the exact hours, and
                the exact line items that built their number.
              </p>
            </div>
            <div className="bg-gradient-to-b from-background to-border/40 rounded-[16px] border border-border p-6 sm:p-9 flex items-center justify-center">
              <img
                src="/images/payroll-phone.png"
                alt="DSPOps payroll on a phone"
                className="max-h-[480px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]"
              />
            </div>
          </div>
        </section>

        {/* Use case */}
        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — A TYPICAL FRIDAY
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1] max-w-[700px]">
              Six hours of payroll, done in twenty minutes.
            </h2>
            <p className="mt-5 text-[16px] text-[#353538] leading-[1.65] max-w-[760px]">
              Most DSP owners we talk to spend the best part of a Friday — or worse, a Sunday — building payroll.
              Pull Cortex screenshots. Match drivers to routes. Apply different pay rates for standard vs Same-Day.
              Add holiday pay. Adjust for sickness. Send the file to the accountant. Field complaints on Monday.
            </p>
            <p className="mt-4 text-[16px] text-[#353538] leading-[1.65] max-w-[760px]">
              With DSPOps that whole sequence collapses. You open the pay period, review any drivers DSPOps has
              flagged for review (mismatched hours, unusual mileage, missing route data), approve, and one-click
              export a CSV or run it straight into your payroll software. Twenty minutes, audit trail attached.
            </p>
          </div>
        </section>

        {/* What it gets right */}
        <section className="bg-white py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — BUILT FOR DSP PAYROLL
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1] max-w-[700px]">
              The DSP payroll cases generic tools miss.
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: PoundSterling,
                  title: "Mixed standard + SDD pay rates",
                  body: "Different hourly rates for standard and Same-Day Delivery routes — applied per route automatically, no manual splits.",
                },
                {
                  icon: Calculator,
                  title: "Live mileage and bonus thresholds",
                  body: "Pay per mile, per stop, or per bonus tier — DSPOps calculates against live Cortex data, not Friday's screenshot.",
                },
                {
                  icon: FileSpreadsheet,
                  title: "Accountant-ready exports",
                  body: "One-click CSV for your accountant, or push straight to your payroll software. Period totals reconcile automatically.",
                },
                {
                  icon: ShieldCheck,
                  title: "Every pay line is auditable",
                  body: "Every number traces back to a route, a date, and a Cortex record. When a driver disputes, you have receipts.",
                },
              ].map((it) => (
                <div
                  key={it.title}
                  className="bg-background rounded-[14px] border border-border p-6 shadow-[0_1px_2px_rgba(17,17,19,0.04)]"
                >
                  <it.icon size={22} className="text-brand" />
                  <h3 className="mt-4 text-[17px] font-bold text-[#111113]">{it.title}</h3>
                  <p className="mt-2 text-[14px] text-[#6C6C72] leading-[1.6]">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Driver self-service */}
        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — DRIVER SELF-SERVICE
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Drivers see their own payslips. You stop fielding "what's my pay?" calls.
              </h2>
              <p className="mt-5 text-[16px] text-[#353538] leading-[1.65]">
                Every driver can open their own portal and see exactly what they've earned this week — the routes
                they ran, the hours they worked, the bonuses they hit. They can download payslips themselves. You
                stop answering the same five questions every Friday.
              </p>
            </div>
            <div className="bg-white rounded-[16px] border border-border p-6">
              <div className="text-[12px] text-[#6C6C72] uppercase tracking-[0.1em]">TIME SAVED</div>
              <div className="text-[44px] font-extrabold text-[#111113] tracking-[-0.02em] mt-1">~6 hours / week</div>
              <p className="mt-3 text-[14px] text-[#6C6C72] leading-[1.6]">
                Average payroll-prep time reported by DSPOps customers vs. their previous spreadsheet workflow.
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
