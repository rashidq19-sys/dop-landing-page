/*
 * Design: Stripe-inspired bento grid — varied card sizes, cropped screenshot close-ups
 * Layout: 3-col grid on desktop. Large cards (col-span-2) use horizontal split.
 *         Medium cards (col-span-1) use vertical stack. Wide card (col-span-3) spans full row.
 * Screenshots: Cropped with object-cover + object-position for close-up "hero shots"
 * Shadows: Stripe-style soft elevation — lifts on hover
 */

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Lightbox from "@/components/Lightbox";
import {
  Zap,
  Camera,
  Receipt,
  ShieldCheck,
  UserPlus,
  RefreshCw,
  Users,
  Trophy,
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
const LEADERBOARD_IMG = ""; // screenshot not yet available — renders a placeholder div

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
  {
    icon: Trophy,
    label: "Driver Leaderboard",
    title: "Rate Your Drivers Automatically — Even Without Amazon's Scorecard",
    description:
      "Amazon stopped publishing individual driver scorecards. DSPOps fills that gap — pulling your Amazon performance metrics and automatically calculating each driver's rating. OSMs can adjust the metric weighting to match what matters to your operation. See your full leaderboard at a glance and know exactly who your top performers are.",
    stat: "No more guesswork on driver performance",
    image: LEADERBOARD_IMG,
    imageAlt: "DSPOps Driver Rating Leaderboard",
  },
];

type LayoutType = "horizontal" | "vertical" | "wide";

// Bento grid config — controls each card's size and screenshot crop position
const bentoConfig: { gridClass: string; layout: LayoutType; objectPosition: string }[] = [
  { gridClass: "lg:col-span-2",                         layout: "horizontal", objectPosition: "top left"    },
  { gridClass: "lg:col-span-1",                         layout: "vertical",   objectPosition: "top center"  },
  { gridClass: "lg:col-span-1",                         layout: "vertical",   objectPosition: "top left"    },
  { gridClass: "lg:col-span-1",                         layout: "vertical",   objectPosition: "top center"  },
  { gridClass: "lg:col-span-1",                         layout: "vertical",   objectPosition: "top right"   },
  { gridClass: "lg:col-span-1",                         layout: "vertical",   objectPosition: "top center"  },
  { gridClass: "lg:col-span-2",                         layout: "horizontal", objectPosition: "top center"  },
  { gridClass: "col-span-1 md:col-span-2 lg:col-span-3", layout: "wide",     objectPosition: "top center"  },
];

function BentoCard({
  feature,
  gridClass,
  layout,
  objectPosition,
  onImageClick,
}: {
  feature: (typeof features)[number];
  gridClass: string;
  layout: LayoutType;
  objectPosition: string;
  onImageClick: (src: string, alt: string) => void;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const baseCard = [
    gridClass,
    "group bg-white rounded-2xl overflow-hidden",
    "border border-border/40",
    "shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)]",
    "hover:shadow-[0_24px_50px_-8px_rgba(0,0,0,0.14)]",
    "hover:-translate-y-1",
    "transition-all duration-300",
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    "transition-[opacity,transform] duration-700",
  ].join(" ");

  /* ── Horizontal card (2-col wide): content left, screenshot right ── */
  if (layout === "horizontal") {
    return (
      <div ref={ref} className={baseCard}>
        <div className="flex flex-col lg:grid lg:grid-cols-[45%_55%] min-h-[300px]">
          {/* Content */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 mb-4 self-start">
              <feature.icon size={13} className="text-brand" />
              <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                {feature.label}
              </span>
            </div>
            <h3 className="text-xl lg:text-2xl font-extrabold text-navy tracking-tight leading-tight">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-4">
              {feature.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 self-start">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              <span className="text-xs font-semibold text-green-700">{feature.stat}</span>
            </div>
          </div>
          {/* Screenshot — close-up crop */}
          {feature.image ? (
            <div
              className="relative overflow-hidden bg-slate-50 min-h-[220px] lg:min-h-full cursor-pointer"
              onClick={() => onImageClick(feature.image, feature.imageAlt)}
            >
              <img
                src={feature.image}
                alt={feature.imageAlt}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                style={{ objectPosition }}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="bg-slate-100 flex items-center justify-center min-h-[220px]">
              <span className="text-sm text-muted-foreground">Screenshot coming soon</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── Wide card (3-col): content left, placeholder/screenshot right ── */
  if (layout === "wide") {
    return (
      <div ref={ref} className={baseCard}>
        <div className="flex flex-col lg:grid lg:grid-cols-[38%_62%] min-h-[200px]">
          {/* Content */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 mb-3 self-start">
              <feature.icon size={13} className="text-brand" />
              <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                {feature.label}
              </span>
            </div>
            <h3 className="text-lg lg:text-xl font-extrabold text-navy tracking-tight leading-tight">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {feature.description}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 self-start">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              <span className="text-xs font-semibold text-green-700">{feature.stat}</span>
            </div>
          </div>
          {/* Screenshot or placeholder */}
          {feature.image ? (
            <div
              className="relative overflow-hidden bg-slate-50 min-h-[180px] lg:min-h-full cursor-pointer"
              onClick={() => onImageClick(feature.image, feature.imageAlt)}
            >
              <img
                src={feature.image}
                alt={feature.imageAlt}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                style={{ objectPosition }}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="bg-slate-100/80 flex items-center justify-center min-h-[160px] lg:min-h-full">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-2">
                  <feature.icon size={18} className="text-slate-400" />
                </div>
                <span className="text-sm text-muted-foreground">Screenshot coming soon</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── Vertical card (1-col): screenshot on top, content below ── */
  return (
    <div
      ref={ref}
      className={`${baseCard} flex flex-col ${feature.image ? "cursor-pointer" : ""}`}
      onClick={() => feature.image && onImageClick(feature.image, feature.imageAlt)}
    >
      {/* Screenshot — cropped close-up at 4:3 */}
      {feature.image ? (
        <div className="relative overflow-hidden bg-slate-50 aspect-[4/3] shrink-0">
          <img
            src={feature.image}
            alt={feature.imageAlt}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            style={{ objectPosition }}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-slate-100/80 flex items-center justify-center shrink-0">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-2">
              <feature.icon size={18} className="text-slate-400" />
            </div>
            <span className="text-sm text-muted-foreground">Screenshot coming soon</span>
          </div>
        </div>
      )}
      {/* Content */}
      <div className="p-5 lg:p-6 flex flex-col flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 mb-3 self-start">
          <feature.icon size={13} className="text-brand" />
          <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
            {feature.label}
          </span>
        </div>
        <h3 className="text-base lg:text-lg font-extrabold text-navy tracking-tight leading-tight">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {feature.description}
        </p>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 self-start">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          <span className="text-xs font-semibold text-green-700">{feature.stat}</span>
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
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/features-pattern-JrKiqRyPV3uvpEHyPpEEiP.webp)`,
          backgroundSize: "400px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-12 lg:mb-16 transition-all duration-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Features
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Everything you need to run
            <br className="hidden sm:block" /> your DSP efficiently
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Eight powerful modules that replace spreadsheets, third-party tools, and
            manual processes — all in one platform.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {features.map((feature, i) => (
            <BentoCard
              key={feature.label}
              feature={feature}
              gridClass={bentoConfig[i].gridClass}
              layout={bentoConfig[i].layout}
              objectPosition={bentoConfig[i].objectPosition}
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
