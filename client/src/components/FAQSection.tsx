/*
 * Design: Clean Logistics Blueprint
 * FAQ: Clean accordion with 7 questions, updated per redesign spec
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "How long does setup take?", answer: "Most DSPs are live in 20 minutes. We import your drivers from a CSV, connect your Cortex scorecard feed, and generate driver portal logins automatically. Priority onboarding sessions are included on Professional and Enterprise plans." },
  { question: "Does it work with Amazon Cortex?", answer: "Yes — live two-way sync. Scorecards, delivery progress, and route data flow into DSPOps automatically. No more manual re-keying, no more 'why is my score wrong?' calls." },
  { question: "We run Same-Day Delivery. Is that supported?", answer: "Yes — SDD is a first-class module, not an afterthought. You get a separate wave view for same-day routes, tighter SLA timers, late-stop alerts, and SDD-specific payroll rates. Owners running both standard and SDD contracts see everything in one fleet-wide dashboard." },
  { question: "Do drivers need to install anything?", answer: "No app store, no download. Drivers get a login link via text and access the portal from any phone's browser. It works offline too — they can mark vans, submit damage, check rota without signal." },
  { question: "Can I cancel my other tools immediately?", answer: "Usually yes. DSPOps replaces rota spreadsheets, WhatsApp driver groups, van inspection apps, and most payroll sheets. We migrate historical data in your first week so you lose nothing." },
  { question: "Is it GDPR compliant?", answer: "Yes — UK-hosted, GDPR-compliant. Driver data stays in the UK. We sign DPAs and provide audit logs for all data access." },
  { question: "What if my fleet grows past a tier?", answer: "We upgrade you mid-month and prorate the difference. No per-driver fees, ever — you just move to the next tier when you hit the driver limit." },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base lg:text-lg font-semibold text-navy pr-4 group-hover:text-brand transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180 text-brand" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed pr-4 sm:pr-8">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          {/* Left — Header */}
          <div
            className={`transition-all duration-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Questions DSP owners ask us.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Still something missing? Email support@dspops.app — real humans answer.
            </p>
          </div>

          {/* Right — Accordion */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
