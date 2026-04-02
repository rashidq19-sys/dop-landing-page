/*
 * Design: Clean Logistics Blueprint
 * Owner Section: Text left + dashboard screenshot right
 * 5 benefit points with blue icon accent for DSP owners
 */

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Lightbox from "@/components/Lightbox";
import { CheckCircle2, Expand } from "lucide-react";
import EmailCaptureInline from "@/components/EmailCaptureInline";

const DASHBOARD_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Dashboard_c175dc22.webp";

const benefits = [
  {
    title: "Real-time operations dashboard",
    description:
      "See attendance, route coverage, performance at a glance",
  },
  {
    title: "Full payment control",
    description:
      "Decide how much to pay or deduct, you're in charge",
  },
  {
    title: "Accountant-ready reports in seconds",
    description:
      "Export exactly what your accountant needs",
  },
  {
    title: "Nail down performance problems",
    description:
      "See exactly where each driver is struggling",
  },
  {
    title: "Same page as your OSM",
    description:
      "Both see the same data, plan together",
  },
];

export default function OwnerSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section id="features" className="py-20 lg:py-28 bg-white relative">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              For DSP Owners
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
              See everything.<br className="hidden sm:block" /> Control everything.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Stop relying on WhatsApp updates and end-of-week summaries. Know
              exactly what's happening in your operation — right now.
            </p>

            {/* Benefits */}
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit, i) => (
                <li
                  key={benefit.title}
                  className={`flex items-start gap-3 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100 + 200}ms` }}
                >
                  <CheckCircle2
                    size={20}
                    className="text-brand shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-semibold text-navy">
                      {benefit.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {" — "}
                      {benefit.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Email CTA */}
            <EmailCaptureInline className="mt-8 max-w-lg" buttonText="Take Back Control" />
          </div>

          {/* Screenshot */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div
              className="relative group cursor-pointer"
              onClick={() => setLightboxSrc(DASHBOARD_IMG)}
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
                    src={DASHBOARD_IMG}
                    alt="DSPOps Owner Dashboard"
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
        alt="DSPOps Owner Dashboard"
        onClose={() => setLightboxSrc(null)}
      />
    </section>
  );
}
