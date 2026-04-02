/*
 * Section 6: Driver Portal
 * Design: Clean Logistics Blueprint — Text left, iPhone mockup carousel right
 * Amber/yellow accent for driver-facing features
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CheckCircle2 } from "lucide-react";
import EmailCaptureInline from "@/components/EmailCaptureInline";
import IPhoneMockup from "@/components/IPhoneMockup";

const portalScreens = [
  { src: "/images/portal/home.jpeg", label: "Home" },
  { src: "/images/portal/rota.jpeg", label: "Rota" },
  { src: "/images/portal/scorecards.jpeg", label: "Scorecards" },
  { src: "/images/portal/invoice.jpeg", label: "Pay" },
];

const benefits = [
  "See their rota and request changes — no more calling OSM to check schedule or swap shifts",
  "Pay and shift details — always visible — drivers see exactly what they're being paid and why",
  "Performance scores with clear guidance — shows where they're struggling and what to improve",
  "Van damage — upload and track in one place — no separate app",
  "Built-in training — targeted training based on weak areas",
];

export default function DriverPortalSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section id="driver-portal" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Text — Left */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              For Your Drivers (so they stop coming to you)
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              One app. Everything they need to know.
            </h2>

            <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
              Drivers get their own portal — shifts, pay, performance, van damage
              — all in one place. They stop chasing the OSM. You get your time
              back.
            </p>

            {/* Benefit list */}
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-brand mt-0.5 shrink-0"
                  />
                  <span className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Callout */}
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-medium text-amber-800">
                Less time answering driver questions = more time improving your
                operation
              </p>
            </div>

            {/* Email CTA */}
            <EmailCaptureInline className="mt-8 max-w-lg" buttonText="Give Drivers Their Own Portal" />
          </div>

          {/* iPhone Mockup — Right */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <IPhoneMockup images={portalScreens} interval={4000} />
          </div>
        </div>
      </div>
    </section>
  );
}
