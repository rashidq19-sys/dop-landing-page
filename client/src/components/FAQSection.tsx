/*
 * Design: Clean Logistics Blueprint
 * FAQ: Clean accordion with hairline dividers
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How is this different from Zerity, Courio, or SimplyFleet?",
    answer:
      "DSPOps is built specifically by a DSP owner who understands the daily pain points. Unlike generic fleet tools, we combine scheduling, van damage detection, invoicing, compliance tracking, and performance scorecards in one platform — purpose-built for Amazon DSP operations. No need to stitch together 4-5 different tools.",
  },
  {
    question: "Does it integrate with Amazon DSP?",
    answer:
      "Yes. We sync directly with Amazon's Capacity Planning data using a simple browser bookmarklet. Upload your Cortex reports for payroll calculations. Scorecard data can be imported to track driver performance against Amazon's metrics.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption for all data in transit and at rest. Your data is stored on secure, SOC 2 compliant servers. We never share your data with third parties, and you maintain full ownership of all your information.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most DSPs are fully set up within 30 minutes. Add your drivers, import your van fleet, and you're ready to go. No complex integrations, no IT team required. Our onboarding guide walks you through every step.",
  },
  {
    question: "What is the ROI?",
    answer:
      "On average, DSPOps delivers a 5.3x return on investment. You save 3+ hours daily on scheduling alone, eliminate £200-300/month in third-party damage tracking tools, and reduce 5-10 hours/week of manual invoicing. Most customers see positive ROI within the first month.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, absolutely. All plans are month-to-month with no long-term contracts. You can cancel anytime from your account settings. If you cancel, you'll retain access until the end of your current billing period.",
  },
  {
    question: "What support do you offer?",
    answer:
      "All plans include email support with response times under 24 hours. Professional plans get priority support with faster response times. Enterprise customers receive a dedicated account manager and phone support. We also have comprehensive documentation and video guides.",
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
              href="mailto:support@dspoperationsplatform.com"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-amber hover:text-amber-dark transition-colors"
            >
              Contact Support
              <span className="text-lg">→</span>
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
