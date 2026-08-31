import { Link } from "wouter";
import { ArrowRight, Calendar, Smartphone, BarChart2, Truck, PoundSterling, Shield } from "lucide-react";
import SectionEyebrow from "@/components/home/SectionEyebrow";

/**
 * The homepage's link block to the six keyword-targeted feature pages. This is
 * the pillar pages' main link source from the site's highest-authority page —
 * the hrefs and their anchor text are load-bearing for search and must survive
 * any restyle unchanged.
 */
const modules = [
  {
    icon: Calendar,
    name: "Driver rota management",
    href: "/dsp-rota-management",
    body: "Drivers set their own availability inside the portal. The weekly rota assembles itself, and last-minute cover is reassigned in two taps instead of a 4 AM scramble.",
  },
  {
    icon: BarChart2,
    name: "Driver performance tracking",
    href: "/driver-performance-tracking",
    body: "Scorecard data flows in live, broken down per driver. DCR, DPMO, DNRs, POD, CC and CDF — the metrics that decide your weekly status, all in one view.",
  },
  {
    icon: Truck,
    name: "Van inspection app",
    href: "/van-inspection-app",
    body: "Daily van checks with photos and video, submitted from any phone's browser. Designed to replace third-party inspection apps and give owners a clean audit trail.",
  },
  {
    icon: PoundSterling,
    name: "Invoicing and payroll support",
    href: "/dsp-invoicing-payroll",
    body: "Driver pay calculated from Amazon's Work Summary Tool. One-click CSV export ready for your accountant, with every line traceable to a route.",
  },
  {
    icon: Shield,
    name: "Compliance tools",
    href: "/dsp-compliance-tools",
    body: "Right-to-work, licence and insurance expiries tracked with auto-reminders. UK-hosted and GDPR-compliant, with audit logs for every data access.",
  },
  {
    icon: Smartphone,
    name: "DSP driver app",
    href: "/amazon-dsp-management-software",
    body: "Every driver gets their own login — view rota, download payslips, check their personal scorecard, and submit van inspections, from iOS, Android or any phone browser.",
  },
];

export default function SEOOverviewSection() {
  return (
    <section
      id="platform-overview"
      className="bg-card py-16 sm:py-20 lg:py-[82px] border-y border-border"
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-14">
          <div>
            <SectionEyebrow>Amazon DSP management software</SectionEyebrow>
            <h2 className="mt-3.5 font-display text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold tracking-[-0.035em] leading-[1.08] text-ink text-balance">
              One platform for every part of running a UK Amazon DSP.
            </h2>
          </div>
          <div className="text-[16px] text-ink/85 leading-[1.68] space-y-3.5">
            <p>
              DSPOps is Amazon DSP management software designed for UK Delivery Service Partners. It
              brings driver rota management, driver performance tracking, van inspections, invoicing
              and payroll support, and compliance tools into a single platform — so owners and OSMs
              can run the business from one screen instead of five.
            </p>
            <p>
              Every module is built for how DSPs actually operate: live Amazon scorecard
              sync, POD and CDF tracking per driver, a dedicated DSP driver app on the phone, and
              the SDD-specific tooling owners running Same-Day Delivery routes have been asking for.
              Use the links below to see how each module works.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group bg-background rounded-[14px] border border-border p-6 hover:border-brand hover:bg-card transition-colors flex flex-col"
            >
              <m.icon size={22} className="text-brand" aria-hidden="true" />
              <h3 className="mt-3.5 font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink group-hover:text-brand-dark transition-colors">
                {m.name}
              </h3>
              <p className="mt-2 text-[14px] text-muted-foreground leading-[1.6] flex-1">{m.body}</p>
              <span className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-dark">
                Learn more <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-7 border-t border-border">
          <p className="text-[15px] text-muted-foreground max-w-[680px]">
            Built for UK Delivery Service Partners. UK-hosted, GDPR-compliant, with a 7-day free
            trial — no card required.
          </p>
          <a
            href="#book-demo"
            className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-[10px] text-[15px] font-bold hover:bg-brand-dark transition-colors"
          >
            Book a demo <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
