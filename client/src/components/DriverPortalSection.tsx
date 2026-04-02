/*
 * Section 6: Driver Portal
 * Design: Clean Logistics Blueprint — Text left, screenshot right
 * Amber/yellow accent for driver-facing features
 * Lightbox: Click screenshot to view fullscreen
 */

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Lightbox from "@/components/Lightbox";
import { CheckCircle2, Expand } from "lucide-react";
import EmailCaptureInline from "@/components/EmailCaptureInline";

const DRIVER_PORTAL_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Drivers_86b5a1e8.webp";

const benefits = [
  "See their rota and request changes — no more calling OSM to check schedule or swap shifts",
  "Pay and shift details — always visible — drivers see exactly what they're being paid and why",
  "Performance scores with clear guidance — shows where they're struggling and what to improve",
  "Van damage — upload and track in one place — no separate app",
  "Built-in training — targeted training based on weak areas",
];

export default function DriverPortalSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

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

          {/* Screenshot — Right */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div
              className="relative group cursor-pointer"
              onClick={() => setLightboxSrc(DRIVER_PORTAL_IMG)}
            >
              <div className="absolute -inset-3 bg-amber-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                    src={DRIVER_PORTAL_IMG}
                    alt="DSPOps Driver Portal"
                    className="w-full"
                    loading="lazy"
                  />
                  {/* Fullscreen hint overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                      <Expand size={16} className="text-navy" />
                      <span className="text-sm font-medium text-navy">
                        Click to enlarge
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        src={lightboxSrc}
        alt="DSPOps Driver Portal"
        onClose={() => setLightboxSrc(null)}
      />
    </section>
  );
}
