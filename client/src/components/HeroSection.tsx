/*
 * Design: Clean Logistics Blueprint — Dark navy + Blue brand
 * Hero: Asymmetric split — large headline left, floating app screenshot right
 * Trust bar with 4 animated counters below
 * Lightbox: Click dashboard screenshot to view fullscreen
 */

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { Calendar, Expand } from "lucide-react";
import EmailCaptureInline from "@/components/EmailCaptureInline";
import Lightbox from "@/components/Lightbox";

const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Dashboard_c175dc22.webp";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/hero-bg-XQ8arLSDGf8uu7C5gXymXc.webp";

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const hours = useCountUp(3, 2000, isVisible);
  const hoursYear = useCountUp(750, 2000, isVisible);
  const platforms = useCountUp(1, 2000, isVisible);
  const roi = useCountUp(5.3, 2000, isVisible, 1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Built by an OSM who lived the 4 AM chaos
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-navy leading-[1.08] tracking-tight">
              Run Your Entire DSP From{" "}
              <span className="relative inline-block">
                One Screen
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C50 3 150 1 298 6" stroke="oklch(0.55 0.2 255)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-navy-light/80 leading-relaxed max-w-xl">
              Scheduling, van damage detection, driver management, and payroll — all in one platform.{" "}
              <span className="font-semibold text-navy">No more spreadsheets. No more juggling 3 different apps.</span>
            </p>

            {/* CTAs — Email Capture */}
            <EmailCaptureInline className="mt-8 max-w-lg" buttonText="Start Saving Time" source="Hero" />

            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">or</span>
              <a
                href="#book-demo"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-border text-navy font-semibold rounded-lg hover:bg-slate-light transition-all duration-200 text-sm"
              >
                <Calendar size={16} className="text-brand" />
                Book a 15-Min Demo
              </a>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. Set up in under 30 minutes.
            </p>
          </div>

          {/* Right — App Screenshot */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div
              className="relative group cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-brand/10 rounded-2xl blur-2xl" />
              {/* Browser frame */}
              <div className="relative bg-white rounded-xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] border border-border/50 overflow-hidden">
                {/* Browser bar */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-light/60 border-b border-border/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  <div className="ml-3 flex-1 h-5 bg-white/80 rounded-md text-[10px] text-muted-foreground flex items-center px-2">
                    dspops.app
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={DASHBOARD_IMG}
                    alt="DSPOps Dashboard"
                    className="w-full"
                    loading="eager"
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

        {/* Trust Bar — 4 stats */}
        <div
          className={`mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 max-w-3xl transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="border-l-2 border-brand pl-4">
            <div className="text-3xl lg:text-4xl font-extrabold text-navy">
              {hours}+
            </div>
            <div className="text-sm text-muted-foreground mt-1">Hours saved daily</div>
          </div>
          <div className="border-l-2 border-brand/80 pl-4">
            <div className="text-3xl lg:text-4xl font-extrabold text-navy">
              {hoursYear}+
            </div>
            <div className="text-sm text-muted-foreground mt-1">Hours back per year</div>
          </div>
          <div className="border-l-2 border-brand/60 pl-4">
            <div className="text-3xl lg:text-4xl font-extrabold text-navy">
              {platforms}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Platform replaces 3+ tools</div>
          </div>
          <div className="border-l-2 border-brand/40 pl-4">
            <div className="text-3xl lg:text-4xl font-extrabold text-navy">
              {roi}x
            </div>
            <div className="text-sm text-muted-foreground mt-1">Average ROI</div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        src={lightboxOpen ? DASHBOARD_IMG : null}
        alt="DSPOps Dashboard"
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
