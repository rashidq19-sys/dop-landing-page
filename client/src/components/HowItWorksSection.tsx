/*
 * Design: Clean Logistics Blueprint
 * How It Works: 3-step horizontal timeline with connecting line
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { UserPlus, Settings, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up & Add Your Team",
    description:
      "Create your account, add drivers and vans. Takes about 30 minutes. No complex setup, no IT team needed.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Connect Your Amazon Data",
    description:
      "Sync with Amazon Cortex, upload capacity planning data with one click. Everything flows in automatically.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Save Hours Every Day",
    description:
      "Automation handles scheduling, damage detection, and payroll. Focus on growing your business.",
  },
];

export default function HowItWorksSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            Getting started
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Up and running in 30 minutes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No complex setup. No IT team needed. Just sign up and start saving time.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-[2px] bg-border" />

          {steps.map((step, i) => (
            <div
              key={step.step}
              className={`relative text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              {/* Step number circle */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber/10 border-2 border-amber mb-6 z-10">
                <step.icon size={24} className="text-amber" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber text-white text-[10px] font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-bold text-navy mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
