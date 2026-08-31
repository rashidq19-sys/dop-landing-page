import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import ScreenshotLightbox from "@/components/home/ScreenshotLightbox";

type Module = {
  title: string;
  body: string;
  win: string;
  img: string;
  alt: string;
  /** Screens narrower than the tile are letterboxed rather than cropped. */
  contain?: boolean;
};

const MODULES: Module[] = [
  {
    title: "Dispatch & deployment",
    body: "Smart Assign fills every route from live availability, you adjust, then one tap publishes waves, routes and vans to every driver's phone.",
    win: "~4 hrs a week back",
    img: "/images/product/deployment.webp",
    alt: "Deployment board showing a wave with drivers, route codes and vans",
  },
  {
    title: "Rota & availability",
    body: "Drivers mark themselves ON or OFF for every day in their own app. The week fills itself, locks when you need certainty, and shortfalls show up days early instead of at 06:00.",
    win: "~9 hrs a week back",
    img: "/images/product/rota.webp",
    alt: "Weekly rota grid with per-day headcount",
  },
  {
    title: "Morning check-in",
    body: "Drivers tap “I'm here” at the depot. You see the arrival time, how many minutes late against their own start time, and how far from the station they were standing when they tapped it.",
    win: "06:30 answers itself",
    img: "/images/product/checkin.webp",
    alt: "Morning check-in board showing arrival times, late markers and a distance flag",
  },
  {
    title: "Driver performance",
    body: "Every metric Amazon scores your drivers on, weekly, per driver: DCR, DNR DPMO, POD, contact compliance, CDF and customer escalations — with worst-offender lists per metric and a league table your drivers can see too.",
    win: "Better network scores",
    img: "/images/product/performance.webp",
    alt: "Driver quality metrics ranked by worst offenders",
  },
  {
    title: "Driver invoicing & pay",
    body: "Upload the week's report and DSPOps generates every driver's invoice — day rates, same-day rates, bonuses and deductions — then sends it to each driver in the app and gives you a clean export for your accountant.",
    win: "~6 hrs a week back",
    img: "/images/product/invoicing.webp",
    alt: "Weekly driver invoice run and a driver's invoice on a phone",
    contain: true,
  },
  {
    title: "Van inspections",
    body: "Daily van checks with photos and video from the driver's phone, guided angle by angle. See instantly who has and hasn't submitted, and keep a clean damage trail for every vehicle.",
    win: "Replaces a £200+/mo app",
    img: "/images/product/van-checks.webp",
    alt: "Daily van inspection with photo capture and damage reporting",
  },
  {
    title: "Multi-station, one account",
    body: "Every depot is a station inside the same account, each with its own rota, deployment board, drivers and vans. Switch between them from the top of the screen — no separate logins, no separate spreadsheets.",
    win: "One bill, every depot",
    img: "/images/product/stations.webp",
    alt: "Station switcher listing three depots",
    contain: true,
  },
  {
    title: "Announcements & messaging",
    body: "Send a notice to every driver, one station or a single person — it lands as a push notification in their app, and you see who has actually read it. One-to-one chat is built in, so operational messages stop living in personal WhatsApp.",
    win: "Proof it was read",
    img: "/images/product/announcements.webp",
    alt: "Announcements list with per-driver read tracking",
    contain: true,
  },
  {
    title: "Same-day delivery",
    body: "SDD is a first-class module, not an afterthought. Same-day drivers, wave times, vans and rates are kept completely separate from your standard routes, so nothing gets mixed up and nothing gets missed.",
    win: "SDD kept separate",
    img: "/images/product/sdd.webp",
    alt: "Same-day delivery wave management view",
  },
];

export default function PlatformSection() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const [zoom, setZoom] = useState<Module | null>(null);

  return (
    <section id="platform" className="bg-background py-16 sm:py-20 lg:py-[82px] border-b border-border">
      <div ref={ref} className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <SectionEyebrow>The platform</SectionEyebrow>
          <h2 className="mt-3.5 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.06] text-ink text-balance">
            Every daily job, one login.
          </h2>
          <p className="mt-3.5 text-[15.5px] sm:text-[17px] text-muted-foreground leading-[1.6] max-w-[62ch]">
            Nine modules built for how a UK Amazon DSP actually runs. Tap any screen to open it
            full size.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-8">
          {MODULES.map((m, i) => (
            <article
              key={m.title}
              style={{ transitionDelay: `${Math.min(i, 5) * 60}ms` }}
              className={`bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all duration-600 hover:shadow-lg hover:-translate-y-0.5 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <button
                type="button"
                onClick={() => setZoom(m)}
                aria-label={`Open the ${m.title} screen full size`}
                className="block h-[158px] bg-background border-b border-border overflow-hidden cursor-zoom-in group"
              >
                <img
                  src={m.img}
                  alt={m.alt}
                  loading="lazy"
                  className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.04] ${
                    m.contain ? "object-contain object-center bg-card p-2.5" : "object-cover object-left-top"
                  }`}
                />
              </button>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-[18px] font-extrabold tracking-[-0.025em] text-ink">
                  {m.title}
                </h3>
                <p className="mt-1.5 text-[14px] text-muted-foreground leading-[1.55] flex-1">{m.body}</p>
                <span className="mt-3.5 self-start text-[12.5px] font-bold text-mint-ink bg-mint-soft rounded-full px-3 py-1.5">
                  {m.win}
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-[12.5px] text-muted-foreground leading-[1.6]">
          Also included: live route progress from Amazon · driver document &amp; right-to-work
          expiry tracking · incident reports · shift history &amp; reliability reporting · e-signed
          agreements · role-based access and 2FA.
        </p>
      </div>

      <ScreenshotLightbox src={zoom?.img ?? null} alt={zoom?.alt} onClose={() => setZoom(null)} />
    </section>
  );
}
