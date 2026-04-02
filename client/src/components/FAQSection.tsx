/*
 * Design: Clean Logistics Blueprint
 * FAQ: Clean accordion with 8 questions, updated per redesign spec
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Does it integrate with Amazon Cortex?",
    answer:
      "Yes, direct integration. Upload capacity planning data, syncs seamlessly. Scorecard data and performance metrics flow in automatically.",
  },
  {
    question: "Can I replace my current van damage app?",
    answer:
      "Yes. AI damage detection is built into the Professional plan. Drivers upload photos and videos, the system detects and documents damage automatically. No separate tool needed — save £200-300/month.",
  },
  {
    question: "How long does setup take?",
    answer:
      "About 30 minutes. Add your drivers, import your van fleet, and connect your Amazon data. No complex integrations, no IT team required.",
  },
  {
    question: "Do my drivers need to download an app?",
    answer:
      "Yes, they get their own portal app. It's simple — shifts, pay, performance, damage uploads, all in one place. No more juggling multiple apps.",
  },
  {
    question: "What makes DSPOps different from Zerity or Courio?",
    answer:
      "DSPOps bundles everything — scheduling, damage detection, payroll, driver portal — in one platform. Others require separate tools for each. Built by an OSM who understands DSP operations firsthand.",
  },
  {
    question: "Is my data secure?",
    answer:
      "SOC 2 compliant, end-to-end encryption, regular security audits. Your data is stored on secure servers and we never share it with third parties.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, month-to-month. No long-term contracts. Cancel from your account settings and retain access until the end of your billing period.",
  },
  {
    question: "How does automated payroll work?",
    answer:
      "DSPOps pulls shift data, applies your pay rules and deductions, and generates payroll reports. Export directly for your accountant — no more reformatting spreadsheets.",
  },
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
        <span className="text-base lg:text-lg font-semibold text-navy pr-4 group-hover:text-amber transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180 text-amber" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed pr-8">
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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Can't find what you're looking for? Reach out to our support team.
            </p>
            <a
              href="mailto:support@dspops.app"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-amber hover:text-amber-dark transition-colors"
            >
              Contact Support
              <span className="text-lg">&rarr;</span>
            </a>
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
