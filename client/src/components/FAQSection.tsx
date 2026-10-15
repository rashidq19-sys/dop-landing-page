import { useRef, useState } from "react";
import SplitWords from "@/components/motion/SplitWords";
import { lightUp, rise, useMotion } from "@/lib/motion";
import { faqs } from "@shared/faqs";

export default function FAQSection() {
  const scope = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useMotion(scope, () => {
    lightUp(scope.current!.querySelector("h2"));
    rise("[data-faq]", 24);
  });

  return (
    <section ref={scope} id="faq" className="bg-background border-t border-border py-16 sm:py-20 lg:py-[96px]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-9 grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <SplitWords
          lines={[["A few things"], ["you might be wondering."]]}
          className="font-display text-[34px] sm:text-[48px] lg:text-[56px] font-black tracking-[-0.045em] leading-[1.06] text-ink text-balance"
        />

        <div>
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.question} data-faq className="border-b border-border">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center gap-2.5 py-6 text-left text-[17px] sm:text-[18px] font-semibold text-ink hover:text-brand-dark transition-colors"
                  >
                    <svg
                      viewBox="0 0 10 10"
                      aria-hidden="true"
                      className={`w-[10px] h-[10px] shrink-0 fill-current transition-transform duration-200 ${open ? "rotate-90" : ""}`}
                    >
                      <path d="M1 0 L9 5 L1 10 Z" />
                    </svg>
                    {faq.question}
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  hidden={!open}
                  className="pb-8 pr-4 text-[15.5px] sm:text-[16px] text-muted-foreground leading-[1.7] max-w-[62ch]"
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
