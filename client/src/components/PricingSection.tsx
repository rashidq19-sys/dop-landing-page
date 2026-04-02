/*
 * Design: Clean Logistics Blueprint
 * Pricing: 3 tiers, middle highlighted. CTAs updated to Get Early Access / Book a Demo
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "99",
    period: "/month",
    description: "Perfect for small DSPs getting started with automation.",
    drivers: "Up to 30 drivers",
    popular: false,
    cta: "Get Early Access",
    features: [
      "Smart scheduling",
      "Driver management",
      "Fleet tracking",
      "Basic compliance alerts",
      "Weekly payroll",
      "Driver portal",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "249",
    period: "/month",
    description: "The complete toolkit for growing DSP operations.",
    drivers: "Up to 100 drivers",
    popular: true,
    cta: "Get Early Access",
    features: [
      "Everything in Starter",
      "AI van damage detection",
      "Performance scorecards",
      "Advanced compliance tracking",
      "Reports & analytics",
      "Capacity planning",
      "Amazon Cortex integration",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large DSPs needing unlimited scale and support.",
    drivers: "Unlimited drivers",
    popular: false,
    cta: "Book a Demo",
    features: [
      "Everything in Professional",
      "Multi-DSP management",
      "Custom integrations",
      "Dedicated account manager",
      "Custom reports",
      "SLA guarantee",
      "Onboarding support",
    ],
  },
];

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
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            Simple pricing
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            One platform. No hidden fees.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Replace 3+ tools with one. Every plan includes a 14-day free trial.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-6 lg:p-8 transition-all duration-700 ${
                plan.popular
                  ? "border-2 border-brand shadow-[0_20px_50px_-12px_rgba(59,130,246,0.2)] scale-[1.02] lg:scale-105"
                  : "border border-border hover:border-brand/30 hover:shadow-lg"
              } bg-white ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 bg-brand text-white text-xs font-bold rounded-full">
                  <Star size={12} fill="white" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-navy">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {plan.price !== "Custom" && (
                    <span className="text-lg text-muted-foreground">£</span>
                  )}
                  <span className="text-4xl lg:text-5xl font-extrabold text-navy">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-brand font-medium mt-1">{plan.drivers}</p>
              </div>

              <a
                href={plan.cta === "Book a Demo" ? "#book-demo" : "#pricing"}
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-200 mb-6 ${
                  plan.popular
                    ? "bg-brand hover:bg-brand-dark text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.3)]"
                    : "bg-navy/5 hover:bg-navy/10 text-navy"
                }`}
              >
                {plan.cta}
              </a>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className={`shrink-0 mt-0.5 ${
                        plan.popular ? "text-brand" : "text-green-500"
                      }`}
                    />
                    <span className="text-sm text-navy/80">{feature}</span>
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
