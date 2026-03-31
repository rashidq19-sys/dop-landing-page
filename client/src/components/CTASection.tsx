/*
 * Design: Clean Logistics Blueprint
 * CTA: Dark navy background with amber accents, strong call to action
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Calendar } from "lucide-react";

export default function CTASection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/cta-bg-iTRQFNjxE444sjVTvXHPEt.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-navy/92" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Ready to take back control<br className="hidden sm:block" /> of your DSP?
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
            Join DSP owners who are saving 3+ hours every day. Start your free trial
            today — no credit card required.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.dspops.app"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber hover:bg-amber-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_4px_20px_0_rgba(230,126,34,0.4)] hover:shadow-[0_6px_28px_0_rgba(230,126,34,0.5)] hover:-translate-y-0.5"
            >
              Start 14-Day Free Trial
              <ArrowRight size={18} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <Calendar size={18} />
              Book a 15-Min Demo
            </a>
          </div>

          <p className="mt-6 text-sm text-white/40">
            No credit card required. Setup takes less than 5 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
