import { useState } from "react";
import { MapPin, UserCheck, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import ScreenshotLightbox from "@/components/home/ScreenshotLightbox";

const CARDS = [
  {
    Icon: MapPin,
    title: "Check-in that answers 06:30",
    body: (
      <>
        The driver taps <strong className="text-white">“I'm here”</strong> at the depot. You get the
        exact arrival time, how many minutes late they are against their own start time, and{" "}
        <strong className="text-white">how far from the station they were standing</strong> — so a
        driver who checks in from two miles away is flagged, not assumed.
      </>
    ),
    img: "/images/product/checkin.webp",
    alt: "Morning check-in board showing arrival times, late markers and a distance flag",
    kick: "The distance flag raises a question — it never blocks a driver from working.",
  },
  {
    Icon: UserCheck,
    title: "Drivers onboard themselves",
    body: (
      <>
        A new starter gets a link and works through eight guided steps on their phone — details,
        address history, ID and right to work, tax and payroll, then the agreement signed on screen.
        No packs emailed back and forth. You get a review queue: approve, reject, or ask for a
        better photo.
      </>
    ),
    img: "/images/product/onboarding.webp",
    alt: "Driver registration wizard on a phone, step 2 of 8: address history with proof-of-address upload",
    kick: "Switch it off entirely if you onboard your own way.",
  },
  {
    Icon: ShieldCheck,
    title: "Documents that chase themselves",
    body: (
      <>
        Licences, passports, right to work, insurance, MOT and tax — tracked per driver and per van,
        with every expiry date in plain sight. Filter to{" "}
        <strong className="text-white">Needs attention</strong> and you have today's list; drivers
        get reminded before you have to ask.
      </>
    ),
    img: "/images/product/compliance-drivers.webp",
    alt: "Driver documents board listing licence, passport and right-to-work status per driver, filtered to those needing attention",
    kick: "ID numbers encrypted · audit log on every access · UK-hosted.",
  },
];

export default function EssentialsSection() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const [zoom, setZoom] = useState<(typeof CARDS)[number] | null>(null);

  return (
    <section
      id="essentials"
      className="bg-linear-to-b from-deep to-deep-alt text-white py-16 sm:py-20 lg:py-[82px]"
    >
      <div ref={ref} className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <SectionEyebrow onDark>Turning up · getting in · staying legal</SectionEyebrow>
          <h2 className="mt-3.5 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.06] text-balance">
            The three that cause
            <br />
            the most trouble.
          </h2>
          <p className="mt-3.5 text-[15.5px] sm:text-[17px] text-[#AAB8DC] leading-[1.6] max-w-[62ch]">
            Attendance, paperwork and expiry dates are where a DSP quietly loses its week — and
            where a failed audit starts. Here is what each one looks like in DSPOps.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mt-8">
          {CARDS.map((c, i) => (
            <article
              key={c.title}
              style={{ transitionDelay: `${i * 90}ms` }}
              className={`bg-white/5 border border-white/12 rounded-[18px] p-5 sm:p-6 flex flex-col transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="w-10 h-10 rounded-xl bg-[#8FB0FF]/15 text-[#9DBBFF] grid place-items-center mb-3.5">
                <c.Icon size={19} aria-hidden="true" />
              </span>
              <h3 className="font-display text-[19px] font-extrabold tracking-[-0.025em] mb-2">
                {c.title}
              </h3>
              <p className="text-[14px] text-[#A7B4D8] leading-[1.6]">{c.body}</p>

              <button
                type="button"
                onClick={() => setZoom(c)}
                aria-label={`Open the ${c.title} screen full size`}
                className="mt-4 block rounded-[11px] overflow-hidden border border-white/12 bg-white cursor-zoom-in"
              >
                {/* All three screens are tall portraits at different ratios; a shared
                    height cropped from the top keeps the cards the same shape and
                    still leads with the part that carries the meaning. */}
                <img
                  src={c.img}
                  alt={c.alt}
                  loading="lazy"
                  className="w-full h-[330px] object-cover object-top"
                />
              </button>

              <p className="mt-auto pt-4 text-[13px] font-bold text-[#5BD6A4]">{c.kick}</p>
            </article>
          ))}
        </div>
      </div>

      <ScreenshotLightbox src={zoom?.img ?? null} alt={zoom?.alt} onClose={() => setZoom(null)} />
    </section>
  );
}
