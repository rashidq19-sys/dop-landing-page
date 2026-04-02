/*
 * Design: Clean Logistics Blueprint
 * Testimonials: Warm background, quote cards with subtle shadows
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "DSPOps replaced three different tools we were using. The scheduling alone saves me 3 hours a day. I actually get to go home on time now.",
    name: "James T.",
    role: "DSP Owner, Manchester",
    initials: "JT",
  },
  {
    quote:
      "The van damage detection is a game-changer. We cancelled our third-party damage tracking subscription on day one. That's £300/month straight back into the business.",
    name: "Sarah M.",
    role: "Operations Manager, Birmingham",
    initials: "SM",
  },
  {
    quote:
      "Setup took 20 minutes. By the end of the first week, my team couldn't imagine going back to spreadsheets. The compliance tracker alone is worth the price.",
    name: "Ahmed K.",
    role: "DSP Owner, London",
    initials: "AK",
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      className="py-20 lg:py-28 relative"
      style={{
        backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/testimonial-bg-KKaWVfYGineS5zLJFQgqBE.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Trusted by DSP owners<br className="hidden sm:block" /> across the UK
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-white rounded-xl p-6 lg:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border border-border/40 transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <Quote size={24} className="text-brand/30 mb-4" />
              <p className="text-sm lg:text-base text-navy/80 leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-brand">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
