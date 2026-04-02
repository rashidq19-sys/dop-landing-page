/*
 * Section 5: For OSMs
 * Design: Screenshot LEFT, text RIGHT (alternates from Section 4)
 * Benefit list with green CheckCircle2 icons
 * Lightbox for fullscreen screenshot viewing
 */

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Lightbox from "@/components/Lightbox";
import { CheckCircle2, Expand } from "lucide-react";
import EmailCaptureInline from "@/components/EmailCaptureInline";

const ROTA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Rota_aa854325.webp";

const benefits = [
  "Live attendance tracking — see who's checked in, who's missing, instantly know who to call",
  "Live rota changes — no spreadsheet — drivers update availability, OSM sees instantly, quick swaps when absent",
  "Van handover tracking — know which keys have been handed over and which vans are waiting",
  "Instant van inspection uploads — drivers upload photos/videos, you see them instantly, know who hasn't uploaded",
  "Quick adjustments on the fly — someone's not coming? Find a replacement and reassign in seconds",
];

export default function OSMSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section id="for-osms" className="py-20 lg:py-28 relative">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Screenshot — LEFT */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div
              className="relative group cursor-pointer"
              onClick={() => setLightboxSrc(ROTA_IMG)}
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
                    src={ROTA_IMG}
                    alt="DSPOps Rota and Dispatch View"
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

          {/* Text — RIGHT */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              For OSMs
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              Morning dispatch, sorted in minutes.
            </h2>

            <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
              No more spreadsheets, no more chasing. Everything your OSM needs to
              run a smooth dispatch — live, in one place.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-green-500 mt-0.5 shrink-0"
                  />
                  <span className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Email CTA */}
            <EmailCaptureInline className="mt-8 max-w-lg" buttonText="Make Mornings Easy" />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        src={lightboxSrc}
        alt="DSPOps Rota and Dispatch View"
        onClose={() => setLightboxSrc(null)}
      />
    </section>
  );
}
