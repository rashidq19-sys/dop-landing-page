import { Link } from "wouter";
import { ArrowRight, Calendar, Smartphone, BarChart2, Truck, PoundSterling, Shield } from "lucide-react";

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
    body: "Cortex scorecard data flows in live, broken down per driver. DCR, DPMO, DNRs, POD, CC and CDF — the metrics that decide your weekly status, all in one view.",
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
    body: "Driver pay calculated from Amazon Cortex's Work Summary Tool. One-click CSV export ready for your accountant, with every line traceable to a route.",
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
    body: "Every driver gets their own login — view rota, download payslips, check their personal scorecard, and submit van inspections. No app store, no download.",
  },
];

export default function SEOOverviewSection() {
  return (
    <section id="platform-overview" className="bg-white py-20 lg:py-28 border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 mb-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              AMAZON DSP MANAGEMENT SOFTWARE
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111113] tracking-[-0.03em] leading-[1.05]">
              One platform for every part of running a UK Amazon DSP.
            </h2>
          </div>
          <div className="text-[16px] lg:text-[17px] text-[#353538] leading-[1.65] space-y-4">
            <p>
              DSPOps is Amazon DSP management software designed for UK Delivery Service Partners. It brings driver
              rota management, driver performance tracking, van inspections, invoicing and payroll support, and
              compliance tools into a single platform — so owners and OSMs can run the business from one screen
              instead of five.
            </p>
            <p>
              Every module is built for how DSPs actually operate: live Amazon Cortex scorecard sync, POD and CDF
              tracking per driver, a dedicated DSP driver app on the phone, and the SDD-specific tooling owners
              running Same-Day Delivery routes have been asking for. Use the links below to see how each module
              works.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group bg-background rounded-[14px] border border-border p-6 hover:border-brand transition-colors flex flex-col"
            >
              <m.icon size={22} className="text-brand" />
              <h3 className="mt-4 text-[18px] font-bold text-[#111113] group-hover:text-brand transition-colors">
                {m.name}
              </h3>
              <p className="mt-2 text-[14px] text-[#6C6C72] leading-[1.6] flex-1">{m.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand">
                Learn more <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-[15px] text-[#6C6C72] max-w-[680px]">
            Built for UK Delivery Service Partners. UK-hosted, GDPR-compliant, with a 14-day free trial — no card
            required.
          </p>
          <a
            href="#book-demo"
            className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-lg text-[15px] font-bold hover:bg-brand-dark transition-colors"
          >
            Book a demo <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
