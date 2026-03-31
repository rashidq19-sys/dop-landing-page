/*
 * Design: Clean Logistics Blueprint
 * Hero: Asymmetric split — large headline left, floating app screenshot right
 * Generous whitespace, dramatic type scale, dot-grid background
 * Stats bar with animated counters
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { ArrowRight, Play } from "lucide-react";

const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dashboard_274ee24f.webp";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/hero-bg-XQ8arLSDGf8uu7C5gXymXc.webp";

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const hours = useCountUp(3, 2000, isVisible);
  const hoursYear = useCountUp(750, 2000, isVisible);
  const roi = useCountUp(5.3, 2000, isVisible, 1);

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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber/10 border border-amber/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              <span className="text-xs font-semibold text-amber-dark uppercase tracking-wider">
                Built by a DSP owner, for DSP owners
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-navy leading-[1.08] tracking-tight">
              Stop Running Your DSP From a{" "}
              <span className="relative inline-block">
                Spreadsheet
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C50 3 150 1 298 6" stroke="#e67e22" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-navy-light/80 leading-relaxed max-w-xl">
              Scheduling, van damage detection, invoicing, and performance tracking.
              One platform. Fully automated.{" "}
              <span className="font-semibold text-navy">Save 3+ hours every day.</span>
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://app.dspops.app"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-amber hover:bg-amber-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_4px_14px_0_rgba(230,126,34,0.35)] hover:shadow-[0_6px_20px_0_rgba(230,126,34,0.45)] hover:-translate-y-0.5"
              >
                Start 14-Day Free Trial
                <ArrowRight size={18} />
              </a>
              <a
                href="#demo-video"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-border text-navy font-semibold rounded-lg hover:bg-slate-light transition-all duration-200"
              >
                <Play size={16} className="text-amber" />
                Watch Demo
              </a>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. 14-day free trial on all plans.
            </p>
          </div>

          {/* Right — App Screenshot */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-amber/10 rounded-2xl blur-2xl" />
              {/* Browser frame */}
              <div className="relative bg-white rounded-xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] border border-border/50 overflow-hidden">
                {/* Browser bar */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-light/60 border-b border-border/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  <div className="ml-3 flex-1 h-5 bg-white/80 rounded-md text-[10px] text-muted-foreground flex items-center px-2">
                    dsp-operations-platform.app
                  </div>
                </div>
                <img
                  src={DASHBOARD_IMG}
                  alt="DSP Operations Platform Dashboard"
                  className="w-full"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div
          className={`mt-16 lg:mt-20 grid grid-cols-3 gap-6 lg:gap-12 max-w-2xl transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="border-l-2 border-amber pl-4">
            <div className="text-3xl lg:text-4xl font-extrabold text-navy">
              {hours}+
            </div>
            <div className="text-sm text-muted-foreground mt-1">Hours saved daily</div>
          </div>
          <div className="border-l-2 border-amber/60 pl-4">
            <div className="text-3xl lg:text-4xl font-extrabold text-navy">
              {hoursYear}+
            </div>
            <div className="text-sm text-muted-foreground mt-1">Hours back per year</div>
          </div>
          <div className="border-l-2 border-amber/40 pl-4">
            <div className="text-3xl lg:text-4xl font-extrabold text-navy">
              {roi}x
            </div>
            <div className="text-sm text-muted-foreground mt-1">Average ROI</div>
          </div>
        </div>
      </div>
    </section>
  );
}
