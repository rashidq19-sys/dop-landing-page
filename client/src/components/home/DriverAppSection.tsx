import { useEffect, useRef, useState } from "react";
import { MapPin, CalendarDays, TrendingUp, LayoutGrid } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionEyebrow from "@/components/home/SectionEyebrow";

const SCREENS = [
  {
    img: "/images/product/phone-home.webp",
    alt: "Driver app home — check in, today's route and van",
    Icon: MapPin,
    title: "Check in, and today's job",
    body: "Route, van, wave and start time — no morning group chat.",
  },
  {
    img: "/images/product/phone-rota.webp",
    alt: "Driver app My Rota — set availability day by day",
    Icon: CalendarDays,
    title: "Set their own availability",
    body: "Every day marked ON or OFF, weeks ahead.",
  },
  {
    img: "/images/product/phone-scorecards.webp",
    alt: "Driver app My Scorecards — the driver's own performance metrics",
    Icon: TrendingUp,
    title: "Their own scorecard",
    body: "They see the number before you have to mention it.",
  },
  {
    img: "/images/product/phone-menu.webp",
    alt: "Driver app menu — rota, shifts, scorecards, van inspection, reports and messages",
    Icon: LayoutGrid,
    title: "Invoices, documents, van checks",
    body: "Everything in their pocket, nothing forwarded on WhatsApp.",
  },
];

const ADVANCE_MS = 3800;

export default function DriverAppSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  // Auto-advance only while the section is on screen, and stop for good once
  // someone picks a screen themselves.
  useEffect(() => {
    if (!isVisible || paused.current) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % SCREENS.length), ADVANCE_MS);
    return () => window.clearInterval(t);
  }, [isVisible, active]);

  const select = (i: number) => {
    paused.current = true;
    setActive(i);
  };

  // Fan the stack around the active phone. A plain (i - active) puts the active
  // card at 0 and every other card to its right, which shoves the whole group
  // off-centre and over the text column.
  const half = Math.floor(SCREENS.length / 2);
  const offsetOf = (i: number) =>
    (((i - active + half) % SCREENS.length) + SCREENS.length) % SCREENS.length - half;

  return (
    <section
      id="driverapp"
      className="bg-linear-to-b from-deep-alt to-deep text-white py-16 sm:py-20 lg:py-[82px] overflow-hidden"
    >
      <div ref={ref} className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <SectionEyebrow onDark>The driver app</SectionEyebrow>
          <h2 className="mt-3.5 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.06] text-balance">
            If they can use WhatsApp,
            <br />
            they can use this.
          </h2>
          <p className="mt-3.5 text-[15.5px] sm:text-[17px] text-[#AAB8DC] leading-[1.6] max-w-[62ch]">
            One tap to check in; shifts, invoices, scorecards and announcements all in one place —
            on iOS, Android, or any phone browser.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-10 items-center mt-9">
          {/* ── The phone stack ───────────────────────────────── */}
          <div>
            <div className="relative h-[430px] sm:h-[520px] flex items-center justify-center">
              {SCREENS.map((s, i) => {
                const d = offsetOf(i);
                const ad = Math.abs(d);
                return (
                  <button
                    key={s.img}
                    type="button"
                    onClick={() => select(i)}
                    aria-label={`Show ${s.title}`}
                    aria-current={i === active}
                    tabIndex={i === active ? 0 : -1}
                    className="absolute w-[min(226px,54vw)] transition-all duration-[450ms] ease-[cubic-bezier(.2,.8,.2,1)]"
                    style={{
                      transform: `translateX(${d * 128}px) scale(${1 - ad * 0.14})`,
                      opacity: ad > 2 ? 0 : 1 - ad * 0.3,
                      filter: ad === 0 ? "none" : "brightness(.6)",
                      zIndex: 10 - ad,
                      pointerEvents: ad > 2 ? "none" : "auto",
                    }}
                  >
                    <span className="block bg-[#0B1220] rounded-[32px] p-1.5 shadow-[0_30px_70px_-25px_rgba(11,18,32,0.6)]">
                      <span className="block rounded-[26px] overflow-hidden">
                        <img src={s.img} alt={s.alt} loading="lazy" className="w-full block" />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 justify-center mt-4">
              {SCREENS.map((s, i) => (
                <button
                  key={s.img}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Show ${s.title}`}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    i === active ? "bg-white" : "bg-white/25 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── What each screen does ─────────────────────────── */}
          <div className="grid gap-2.5">
            {SCREENS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => select(i)}
                className={`flex gap-3.5 text-left rounded-[13px] border px-4 py-3.5 transition-colors ${
                  i === active
                    ? "bg-brand/20 border-[#8FB0FF]/50"
                    : "bg-white/4 border-white/12 hover:bg-white/8"
                }`}
              >
                <span className="w-[34px] h-[34px] rounded-[9px] bg-[#8FB0FF]/15 text-[#9DBBFF] grid place-items-center shrink-0">
                  <s.Icon size={17} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-bold">{s.title}</span>
                  <span className="block text-[13px] text-[#A7B4D8] leading-[1.45] mt-0.5">
                    {s.body}
                  </span>
                </span>
              </button>
            ))}
            <div className="flex flex-wrap gap-2 mt-3">
              {["App Store", "Google Play", "Any phone browser"].map((t) => (
                <span
                  key={t}
                  className="border border-white/12 rounded-full px-3 py-1.5 text-[12px] font-semibold text-[#C7D3F2]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
