import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import SplitWords from "@/components/motion/SplitWords";
import { gsap, lightUp, PALE_ON_DARK, rise, useMotion } from "@/lib/motion";

/** The admin rituals every DSP runs on, and what each one turns into. */
const SWAPS = [
  ["Chasing availability on WhatsApp all weekend", "Drivers set their own rota in the app"],
  ["Ringing round at 06:30 to see who turned up", "Check-in board fills itself as they arrive"],
  ["Typing the plan into Amazon's system by hand", "One tap publishes it to every driver's phone"],
  ["A spreadsheet per station, a login per tool", "One account, every station, one bill"],
  ["Onboarding packs emailed back and forth", "Drivers onboard themselves, you approve"],
  ["Driver invoices rebuilt by hand each week", "Generated, sent and exported in minutes"],
];

export default function WhatChangesSection() {
  const scope = useRef<HTMLElement>(null);

  // Each row plays out as you scroll past it: the old chore is struck through
  // and dims, the arrow slides in, and the new way lights up.
  useMotion(scope, () => {
    lightUp(scope.current!.querySelector("h2"), PALE_ON_DARK);
    lightUp(scope.current!.querySelector("[data-closing]"), PALE_ON_DARK);
    rise("[data-rise]", 18);

    gsap.utils.toArray<HTMLElement>("[data-swap]").forEach((row) => {
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: row, start: "top 92%", end: "top 58%", scrub: true },
        })
        .fromTo(row, { opacity: 0.35, y: 26 }, { opacity: 1, y: 0, duration: 0.4 }, 0)
        .fromTo(
          row.querySelector("[data-was]"),
          { color: "#E4EAF8", textDecorationColor: "rgba(148,163,199,0)" },
          { color: "#94A3C7", textDecorationColor: "rgba(148,163,199,0.6)", duration: 0.5 },
          0.15,
        )
        .fromTo(row.querySelector("[data-arrow]"), { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 }, 0.45)
        .fromTo(row.querySelector("[data-now]"), { color: PALE_ON_DARK }, { color: "#ffffff", duration: 0.4 }, 0.6);
    });
  });

  return (
    <section
      ref={scope}
      id="changes"
      className="bg-linear-to-b from-deep to-deep-alt text-white py-16 sm:py-20 lg:py-[96px]"
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <div>
          <SectionEyebrow onDark>What changes</SectionEyebrow>
          <SplitWords
            lines={[["Six jobs you’ll never"], ["do by hand again."]]}
            className="mt-3.5 font-display text-[34px] sm:text-[48px] lg:text-[56px] font-black tracking-[-0.045em] leading-[1.03] text-balance"
          />
          <p
            data-rise
            className="mt-4 text-[15.5px] sm:text-[17px] text-[#AAB8DC] leading-[1.6] max-w-[62ch]"
          >
            Every DSP runs on the same handful of admin rituals — the weekend availability chase,
            the 06:30 ring-round, the Sunday-night spreadsheet. Here is what each one turns into.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-2.5 mt-8 sm:mt-10">
          {SWAPS.map(([was, now]) => (
            <div
              key={was}
              data-swap
              className="flex items-center gap-3.5 bg-white/5 border border-white/12 rounded-[13px] px-4 py-4"
            >
              <span
                data-was
                className="flex-1 min-w-0 text-[14px] text-[#94A3C7] line-through decoration-[#94A3C7]/45"
              >
                {was}
              </span>
              <ArrowRight data-arrow size={16} className="text-[#8FB0FF] shrink-0" aria-hidden="true" />
              <span data-now className="flex-[1.15] min-w-0 text-[14.5px] font-semibold text-white">
                {now}
              </span>
            </div>
          ))}
        </div>

        <SplitWords
          as="p"
          data-closing
          lines={[["Same operation. Around 32 fewer admin hours a week, per station."]]}
          className="mt-8 font-display text-[20px] sm:text-[26px] lg:text-[30px] font-extrabold tracking-[-0.035em] leading-[1.15]"
        />
      </div>
    </section>
  );
}
