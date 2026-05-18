import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@shared/faqs";

export default function SeoFaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question} className="border-b border-border last:border-b-0">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left group"
              aria-expanded={isOpen}
            >
              <span className="text-base lg:text-lg font-semibold text-[#111113] pr-4 group-hover:text-brand transition-colors">
                {faq.question}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-[#6C6C72] transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-brand" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 pb-5" : "max-h-0"
              }`}
            >
              <p className="text-sm lg:text-base text-[#6C6C72] leading-relaxed pr-4 sm:pr-8">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
