/*
 * Design: Clean Logistics Blueprint — Dark navy + Blue brand
 * Features: Alternating left-right sections with screenshots
 * Lightbox: Click any screenshot to view fullscreen
 */

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Lightbox from "@/components/Lightbox";
import { Expand } from "lucide-react";
import {
  Zap,
  Camera,
  Receipt,
  ShieldCheck,
  UserPlus,
  RefreshCw,
  Users,
} from "lucide-react";

const DEPLOYMENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/DeploymentPlan_8f6f0776.webp";
const INSPECTION_DETECTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Inspectiondamagesreport_e1c0b1ab.webp";
const ROTA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Rota_aa854325.webp";
const SCORECARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Scorecard_5b525443.webp";
const FLEET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/FleetManagement_d568d5e9.webp";
const INSPECTION_V1_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Inspectionv1_f2ffa66b.webp";
const INVOICE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Invoice_b6d91efd.png";
const WEEKLY_PAYROLL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/weeklyPayroll_ceea7203.webp";
const REPORTS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Reports_0d90951a.webp";
const DRIVERS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Drivers_86b5a1e8.webp";
const CAPACITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/capacity-planning-new_dfeca29f.webp";

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
    image: INSPECTION_DETECTION_IMG,
    imageAlt: "DOP AI Van Damage Detection with Photos",
  },
  {
    icon: Receipt,
    label: "Automated Invoicing",
    title: "Shift-Based Pay Calculation",
    description:
      "Upload your Cortex report and let the system calculate everything. Weekly payroll, shift breakdowns, and driver pay — all automated. No more spreadsheet errors at 2am.",
    stat: "Save 5–10 hours/week",
    image: WEEKLY_PAYROLL_IMG,
    imageAlt: "DOP Weekly Payroll and Invoicing",
  },
  {
    icon: RefreshCw,
    label: "Amazon Integration",
    title: "Sync With Amazon Cortex in 1 Click",
    description:
      "Fully integrated with Amazon's systems. Sync your scorecards, route data, and performance metrics from Amazon Cortex with a single click. No manual data entry, no copy-pasting from spreadsheets.",
    stat: "One-click Amazon sync",
    image: SCORECARD_IMG,
    imageAlt: "DOP Performance Scorecards synced from Amazon Cortex",
  },
  {
    icon: ShieldCheck,
    label: "Compliance Management",
    title: "Never Miss an Expiry Again",
    description:
      "Track every driver licence, passport, RTW document, and van insurance, MOT, and road tax in one place. Automatic alerts when documents are expiring. Stay compliant year-round.",
    stat: "Stay compliant year-round",
    image: FLEET_IMG,
    imageAlt: "DOP Fleet Management and Compliance",
  },
  {
    icon: UserPlus,
    label: "Driver Management",
    title: "Complete Driver Lifecycle",
    description:
      "From onboarding to offboarding, manage your entire driver roster. Digital document collection, status tracking, and performance history — everything in one place.",
    stat: "Faster onboarding, better retention",
    image: DRIVERS_IMG,
    imageAlt: "DOP Driver Management Page",
  },
  {
    icon: Users,
    label: "Capacity Planning",
    title: "Never Be Short of Drivers Again",
    description:
      "See at a glance if you have enough drivers and vans for your committed days. Identify coverage gaps before they become problems, plan ahead, and ensure you always meet Amazon's targets.",
    stat: "Prevent understaffing",
    image: CAPACITY_IMG,
    imageAlt: "DOP Capacity Planning and Driver Coverage",
  },
];

function FeatureRow({
  feature,
  index,
  onImageClick,
}: {
  feature: (typeof features)[0];
  index: number;
  onImageClick: (src: string, alt: string) => void;
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 mb-4">
          <feature.icon size={14} className="text-brand" />
          <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
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
        <div
          className="relative group cursor-pointer"
          onClick={() => onImageClick(feature.image, feature.imageAlt)}
        >
          <div className="absolute -inset-3 bg-brand/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] border border-border/50 overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-light/50 border-b border-border/40">
              <div className="w-2 h-2 rounded-full bg-red-400/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
              <div className="w-2 h-2 rounded-full bg-green-400/50" />
              <div className="ml-2 flex-1 h-4 bg-white/70 rounded text-[9px] text-muted-foreground flex items-center px-2">
                dspops.app
              </div>
            </div>
            <div className="relative">
              <img
                src={feature.image}
                alt={feature.imageAlt}
                className="w-full"
                loading="lazy"
              />
              {/* Fullscreen hint overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                  <Expand size={16} className="text-navy" />
                  <span className="text-sm font-medium text-navy">Click to enlarge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  const handleImageClick = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  };

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
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Features
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Everything you need to run<br className="hidden sm:block" /> your DSP efficiently
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Eight powerful modules that replace spreadsheets, third-party tools, and
            manual processes — all in one platform.
          </p>
        </div>

        {/* Feature Rows */}
        <div className="space-y-20 lg:space-y-32">
          {features.map((feature, i) => (
            <FeatureRow
              key={feature.label}
              feature={feature}
              index={i}
              onImageClick={handleImageClick}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        src={lightboxSrc}
        alt={lightboxAlt}
        onClose={() => setLightboxSrc(null)}
      />
    </section>
  );
}
