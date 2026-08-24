import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionEyebrow from "@/components/home/SectionEyebrow";

/** The admin rituals every DSP runs on, and what each one turns into. */
const SWAPS = [
  ["Chasing availability on WhatsApp all weekend", "Drivers set their own rota in the app"],
  ["Ringing round at 06:30 to see who turned up", "Check-in board fills itself as they arrive"],
  ["Typing the plan into Cortex by hand", "DSPOps syncs straight to Amazon Cortex"],
  ["A spreadsheet per station, a login per tool", "One account, every station, one bill"],
  ["Onboarding packs emailed back and forth", "Drivers onboard themselves, you approve"],
  ["Driver invoices rebuilt by hand each week", "Generated, sent and exported in minutes"],
];

export default function WhatChangesSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="changes"
      className="bg-linear-to-b from-deep to-deep-alt text-white py-16 sm:py-20 lg:py-[82px]"
    >
      <div ref={ref} className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <SectionEyebrow onDark>What changes</SectionEyebrow>
          <h2 className="mt-3.5 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.06] text-balance">
            Six jobs that stop
            <br />
            being jobs.
          </h2>
          <p className="mt-3.5 text-[15.5px] sm:text-[17px] text-[#AAB8DC] leading-[1.6] max-w-[62ch]">
            Every DSP runs on the same handful of admin rituals — the weekend availability chase,
            the 06:30 ring-round, the Sunday-night spreadsheet. Here is what each one turns into.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-2.5 mt-8">
          {SWAPS.map(([was, now], i) => (
            <div
              key={was}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`flex items-center gap-3.5 bg-white/5 border border-white/12 rounded-[13px] px-4 py-4 transition-all duration-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <span className="flex-1 min-w-0 text-[14px] text-[#94A3C7] line-through decoration-[#94A3C7]/45">
                {was}
              </span>
              <ArrowRight size={16} className="text-[#8FB0FF] shrink-0" aria-hidden="true" />
              <span className="flex-[1.15] min-w-0 text-[14.5px] font-semibold text-white">{now}</span>
            </div>
          ))}
        </div>

        <p
          className={`mt-7 font-display text-[18px] sm:text-[22px] font-extrabold tracking-[-0.03em] transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Same operation. Around 32 fewer admin hours a week, per station.
        </p>
      </div>
    </section>
  );
}
