/*
 * Design: Clean Logistics Blueprint
 * Pricing: 3 tiers, middle highlighted. CTAs updated to Get Early Access / Book a Demo
 */

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, Star, ArrowRight } from "lucide-react";

const STARTER_MODULES = "Rota · Dispatch · Portal · Scorecards · Compliance · Tracking";

const plans = [
  {
    name: "Starter", price: "99", period: "/mo", drivers: "Up to 30 drivers", popular: false,
    features: ["6 modules", "Email support", "Cortex integration"],
  },
  {
    name: "Professional", price: "249", period: "/mo", drivers: "Up to 100 drivers", popular: true,
    features: ["Everything in Starter", "Payroll", "Van Condition", "Same-Day Delivery", "Priority support"],
  },
  {
    name: "Enterprise", price: null, period: "", drivers: "100+ drivers", popular: false,
    features: ["Everything in Pro", "Multi-station support", "API access", "Dedicated CSM", "Custom SLAs", "White-glove setup"],
  },
] as const satisfies {
  name: string;
  price: string | null;
  period: string;
  drivers: string;
  popular: boolean;
  features: readonly string[];
}[];

function PricingEmailCapture({ popular }: { popular: boolean }) {
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("Thanks! We'll be in touch soon.");
      setEmail("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-navy placeholder:text-muted-foreground text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
      />
      <button
        type="submit"
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-200 ${
          popular
            ? "bg-brand hover:bg-brand-dark text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.3)]"
            : "bg-navy/5 hover:bg-navy/10 text-navy"
        }`}
      >
        Start Free Trial
        <ArrowRight size={16} />
      </button>
    </form>
  );
}

export default function PricingSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            PRICING
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Flat monthly. No per-driver fees. Ever.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Add all the drivers you want within your tier. We never charge per-seat — so you're never penalised for growing.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-700 ${
                plan.popular
                  ? "border-2 border-brand shadow-[0_25px_60px_-8px_rgba(59,130,246,0.28),0_8px_24px_-4px_rgba(0,0,0,0.08)] scale-[1.03] lg:scale-[1.05] z-10"
                  : "border border-border/50 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.07)] hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] hover:-translate-y-1"
              } ${plan.popular ? 'bg-[#111113]' : plan.name === 'Enterprise' ? 'bg-gradient-to-br from-slate-50 to-blue-50/70' : 'bg-white'} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute top-6 right-6 inline-flex items-center gap-1 px-3 py-1 bg-brand text-white text-xs font-bold rounded-full">
                  <Star size={12} fill="white" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-bold ${plan.popular ? 'text-white' : 'text-navy'}`}>{plan.name}</h3>
              </div>

              {plan.price !== null && (
                <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full whitespace-nowrap">
                  <span className="text-[11px] font-semibold text-green-700">
                    14-day free trial — no card required
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {plan.price !== null && (
                    <span className={`text-lg ${plan.popular ? 'text-white/60' : 'text-muted-foreground'}`}>£</span>
                  )}
                  <span className={`text-4xl lg:text-5xl font-extrabold ${plan.popular ? 'text-white' : 'text-navy'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={plan.popular ? 'text-white/60' : 'text-muted-foreground'}>{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-brand font-medium mt-1">{plan.drivers}</p>
              </div>

              <PricingEmailCapture popular={plan.popular} />

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className={`shrink-0 mt-0.5 ${
                        plan.popular ? "text-brand-light" : "text-green-500"
                      }`}
                    />
                    {feature === "6 modules" ? (
                      <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-navy/80'} relative group cursor-help`}>
                        6 modules
                        <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-56 bg-[#111113] text-white text-xs rounded-lg px-3 py-2 shadow-xl z-20 leading-relaxed pointer-events-none">
                          {STARTER_MODULES}
                        </span>
                      </span>
                    ) : (
                      <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-navy/80'}`}>{feature}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-muted-foreground mt-10">
          All plans include 14-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
