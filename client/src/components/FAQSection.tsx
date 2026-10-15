import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import SplitWords from "@/components/motion/SplitWords";
import { lightUp, rise, useMotion } from "@/lib/motion";
import { faqs } from "@shared/faqs";

export default function FAQSection() {
  const scope = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useMotion(scope, () => {
    lightUp(scope.current!.querySelector("h2"));
    rise("[data-rise]", 18);
    rise("[data-faq]", 24);
  });

  return (
    <section ref={scope} id="faq" className="bg-background py-16 sm:py-20 lg:py-[96px]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <div>
          <SectionEyebrow>Questions</SectionEyebrow>
          <SplitWords
            lines={[["The things owners ask first."]]}
            className="mt-3.5 font-display text-[34px] sm:text-[48px] lg:text-[56px] font-black tracking-[-0.045em] leading-[1.03] text-ink text-balance"
          />
          <p data-rise className="mt-4 text-[15.5px] sm:text-[17px] text-muted-foreground leading-[1.6] max-w-[62ch]">
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
              <div
                key={faq.question}
                data-faq
                className="bg-card border border-border rounded-[13px] overflow-hidden transition-colors duration-250 hover:border-brand/40"
              >
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
