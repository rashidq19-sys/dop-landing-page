/*
 * Section: New Features
 * Design: Clean Logistics Blueprint — Section header + 2x2 card grid
 * Each card: Lucide icon, "New" badge, feature name, copy, placeholder image
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Activity, PackagePlus, ClipboardCheck, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Activity,
    name: "Live Tracking",
    copy: "Delivery progress is pulled directly from Amazon Cortex and fed into each driver's portal throughout the day. Drivers know if they're on track or falling behind — without the OSM making a single call.",
  },
  {
    icon: PackagePlus,
    name: "Same Day Delivery",
    copy: "SDD drivers are managed in a clearly separate roster. Schedule, assign, and track same day delivery drivers alongside your regular fleet — full clarity, no confusion.",
  },
  {
    icon: ClipboardCheck,
    name: "Arriving",
    copy: "During dispatch, the OSM marks each driver as arrived in one tap. See who's in, who's missing, and which keys to hand over — all tracked live before the morning rush.",
  },
  {
    icon: ShieldCheck,
    name: "Automatic Data Backup",
    copy: "All your data is continuously and automatically backed up. Driver records, payroll history, compliance documents — nothing is ever lost.",
  },
];

export default function NewFeaturesSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section id="new-features" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            What's New
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
            Built for how DSPs actually operate.
          </h2>
          <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
            New features shipped to solve the real pain points your team faces every single day.
          </p>
        </div>

        {/* 2x2 card grid */}
        <div className="mt-14 grid sm:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.name}
                className={`bg-white border border-border/60 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-5 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                {/* Card top: icon + badge */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                    <Icon size={20} className="text-brand" />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-brand text-white">
                    New
                  </span>
                </div>

                {/* Feature name */}
                <h3 className="text-lg font-bold text-navy leading-snug">
                  {feature.name}
                </h3>

                {/* Copy */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.copy}
                </p>

                {/* Placeholder image */}
                <div className="w-full aspect-video bg-slate-100 rounded-lg" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
