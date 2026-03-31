/*
 * Design: Clean Logistics Blueprint
 * Features: Alternating left-right sections, each with a large screenshot and descriptive text
 * Hairline section label, generous vertical rhythm
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Zap,
  Camera,
  Receipt,
  BarChart3,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

const DEPLOYMENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/deployment_9e82936d.webp";
const FLEET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/fleet-management_ebfc891c.webp";
const REPORTS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/reports_41204a79.webp";
const DRIVERS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/drivers_650b22a8.webp";
const TRACKER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/tracker_978440a5.webp";
const INSPECTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/inspection_59f00ee3.webp";

const features = [
  {
    icon: Zap,
    label: "Smart Assign",
    title: "AI-Powered Driver-to-Route Matching",
    description:
      "Stop spending hours on manual scheduling. Smart Assign automatically matches the right driver to the right route based on availability, skills, and performance history. One click. Done.",
    stat: "Save 3+ hours daily",
    image: DEPLOYMENT_IMG,
    imageAlt: "DOP Smart Assign Deployment Planning",
  },
  {
    icon: Camera,
    label: "Van Damage Detection",
    title: "AI Detects Damage Automatically",
    description:
      "Replace expensive third-party tools. Our AI-powered inspection system detects and documents van damage through photos and videos, creating a complete damage timeline for every vehicle.",
    stat: "Replace £200–300/month tools",
    image: INSPECTION_IMG,
    imageAlt: "DOP Van Inspection System",
  },
  {
    icon: Receipt,
    label: "Automated Invoicing",
    title: "Shift-Based Pay Calculation",
    description:
      "Upload your Cortex report and let the system calculate everything. Weekly payroll, shift breakdowns, and driver pay — all automated. No more spreadsheet errors at 2am.",
    stat: "Save 5–10 hours/week",
    image: FLEET_IMG,
    imageAlt: "DOP Fleet Management and Payroll",
  },
  {
    icon: BarChart3,
    label: "Performance Scorecards",
    title: "Live KPI Dashboards",
    description:
      "See exactly how every driver is performing with real-time scorecards. Weekly and daily views, quality metrics, and performance trends — all synced from Amazon data.",
    stat: "Improve DSP-wide KPIs",
    image: REPORTS_IMG,
    imageAlt: "DOP Reports and Analytics Dashboard",
  },
  {
    icon: ShieldCheck,
    label: "Compliance Management",
    title: "Never Miss an Expiry Again",
    description:
      "Track every driver licence, passport, RTW document, and van insurance, MOT, and road tax in one place. Automatic alerts when documents are expiring. Stay compliant year-round.",
    stat: "Stay compliant year-round",
    image: TRACKER_IMG,
    imageAlt: "DOP Compliance Tracker",
  },
  {
    icon: UserPlus,
    label: "Driver Management",
    title: "Complete Driver Lifecycle",
    description:
      "From onboarding to offboarding, manage your entire driver roster. Digital document collection, status tracking, and performance history — everything in one place.",
    stat: "Faster onboarding, better retention",
    image: DRIVERS_IMG,
    imageAlt: "DOP Driver Management",
  },
];

function FeatureRow({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const reversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
        reversed ? "lg:direction-rtl" : ""
      }`}
    >
      {/* Text */}
      <div
        className={`${reversed ? "lg:order-2 lg:direction-ltr" : ""} transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 mb-4">
          <feature.icon size={14} className="text-amber" />
          <span className="text-xs font-semibold text-amber-dark uppercase tracking-wider">
            {feature.label}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight leading-tight">
          {feature.title}
        </h3>

        <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm font-semibold text-green-700">{feature.stat}</span>
        </div>
      </div>

      {/* Screenshot */}
      <div
        className={`${reversed ? "lg:order-1 lg:direction-ltr" : ""} transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="relative group">
          <div className="absolute -inset-3 bg-amber/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] border border-border/50 overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-light/50 border-b border-border/40">
              <div className="w-2 h-2 rounded-full bg-red-400/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
              <div className="w-2 h-2 rounded-full bg-green-400/50" />
              <div className="ml-2 flex-1 h-4 bg-white/70 rounded text-[9px] text-muted-foreground flex items-center px-2">
                dsp-operations-platform.app
              </div>
            </div>
            <img
              src={feature.image}
              alt={feature.imageAlt}
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="features" className="py-20 lg:py-28 relative">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/features-pattern-JrKiqRyPV3uvpEHyPpEEiP.webp)`,
        backgroundSize: "400px",
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            Features
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Everything you need to run<br className="hidden sm:block" /> your DSP efficiently
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Six powerful modules that replace spreadsheets, third-party tools, and
            manual processes — all in one platform.
          </p>
        </div>

        {/* Feature Rows */}
        <div className="space-y-20 lg:space-y-32">
          {features.map((feature, i) => (
            <FeatureRow key={feature.label} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
