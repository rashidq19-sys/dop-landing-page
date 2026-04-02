/*
 * Design: Clean Logistics Blueprint
 * Final CTA: Dark navy, inline email capture, founder quote
 */

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Calendar } from "lucide-react";

export default function CTASection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email capture service (Mailchimp, ConvertKit, etc.)
    if (email) {
      alert("Thanks! We'll be in touch soon.");
      setEmail("");
    }
  };

  return (
    <section
      id="book-demo"
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
            Stop firefighting.<br className="hidden sm:block" /> Start running your DSP.
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
            Join DSP owners who are taking back control of their operations.
            Get early access — no credit card required.
          </p>

          {/* Inline email capture */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 w-full sm:w-auto px-5 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_4px_14px_0_rgba(59,130,246,0.35)] hover:shadow-[0_6px_20px_0_rgba(59,130,246,0.45)] hover:-translate-y-0.5"
            >
              Get Early Access
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Or Book Demo */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-sm text-white/40">or</span>
            <a
              href="#book-demo"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 text-sm"
            >
              <Calendar size={16} />
              Book a 15-Min Demo
            </a>
          </div>

          {/* Founder quote */}
          <p className="mt-10 text-base italic text-white/50 max-w-xl mx-auto">
            "Built by an OSM who got tired of the spreadsheets. DSPOps is the tool I wish I had."
          </p>
        </div>
      </div>
    </section>
  );
}
