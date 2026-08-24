import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import { faqs } from "@shared/faqs";

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-background py-16 sm:py-20 lg:py-[82px]">
      <div ref={ref} className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <SectionEyebrow>Questions</SectionEyebrow>
          <h2 className="mt-3.5 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.06] text-ink text-balance">
            The things owners ask first.
          </h2>
          <p className="mt-3.5 text-[15.5px] sm:text-[17px] text-muted-foreground leading-[1.6] max-w-[62ch]">
            Still something missing? Email{" "}
            <a href="mailto:support@dspops.app" className="text-brand-dark font-semibold hover:underline">
              support@dspops.app
            </a>{" "}
            — real humans answer.
          </p>
        </div>

        <div className="grid gap-2.5 mt-8 max-w-[860px]">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.question} className="bg-card border border-border rounded-[13px] overflow-hidden">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 px-5 py-[18px] text-left"
                  >
                    <span className="text-[15.5px] font-bold text-ink">{faq.question}</span>
                    {open ? (
                      <Minus size={18} className="text-brand shrink-0" />
                    ) : (
                      <Plus size={18} className="text-brand shrink-0" />
                    )}
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  hidden={!open}
                  className="px-5 pb-[18px] text-[14.5px] text-muted-foreground leading-[1.62]"
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
