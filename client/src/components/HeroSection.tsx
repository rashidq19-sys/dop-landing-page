import { useState } from "react";
import { Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import ScreenshotLightbox from "@/components/home/ScreenshotLightbox";
// import Lightbox from "@/components/Lightbox"; // demo video hidden — see HeroSection button + render below

const DASHBOARD = "/images/product/dashboard.webp";
const DRIVER_PHONE = "/images/product/phone-home.webp";

const DASHBOARD_ALT =
  "DSPOps operations dashboard showing driver status, today's deployment plan, the morning check-in board and the driver leaderboard";
const PHONE_ALT =
  "DSPOps driver app home screen showing the check-in button, today's route, van and wave";

const TRUST = [
  "Built & hosted in the UK",
  "Syncs with Amazon Cortex",
  "iOS & Android",
  "7-day free trial, no card",
];

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  // const [videoOpen, setVideoOpen] = useState(false); // demo video hidden

  const hours = useCountUp(3, 1600, isVisible);
  const weekly = useCountUp(32, 1600, isVisible);
  const modules = useCountUp(9, 1600, isVisible);
  const setup = useCountUp(20, 1600, isVisible);

  const stats = [
    { value: `${hours}+ hrs`, label: "saved per ops manager, per day", bar: "bg-brand" },
    { value: `${weekly} hrs`, label: "of admin back per station, per week", bar: "bg-brand" },
    { value: String(modules), label: "modules on one login, one bill", bar: "bg-mint" },
    { value: `${setup} min`, label: "to import your drivers and go", bar: "bg-amber-500" },
  ];

  return (
    <section className="bg-background border-b border-border pt-[86px] pb-14 sm:pt-24 sm:pb-16 overflow-hidden">
      <div ref={ref} className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <div
          className={`grid grid-cols-1 lg:grid-cols-[1fr_1.06fr] gap-10 lg:gap-12 items-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* ── Left: the pitch ───────────────────────────────── */}
          <div>
            <div className="inline-flex items-center gap-2.5 bg-card border border-border rounded-full py-1.5 pl-1.5 pr-4 text-[13px] font-semibold shadow-sm mb-5">
              <span className="bg-brand text-white text-[10.5px] font-extrabold tracking-[0.08em] rounded-full px-2.5 py-1 whitespace-nowrap">
                UK BUILT
              </span>
              Made for Amazon DSPs — 1.0 and 2.0
            </div>

            <h1 className="font-display text-[38px] sm:text-[52px] lg:text-[60px] font-black tracking-[-0.035em] leading-[1.02] text-ink text-balance">
              Run your entire DSP from <span className="text-brand">one screen.</span>
            </h1>

            <p className="mt-4 text-[15.5px] sm:text-[17px] text-muted-foreground leading-[1.6] max-w-[62ch]">
              Rota, dispatch, morning check-in, driver onboarding, Cortex performance, van
              inspections and driver invoicing — one login, one bill, and an app your drivers
              actually use.
            </p>

            <div className="flex flex-wrap gap-3 mt-6 items-center">
              <a
                href="#book-demo"
                className="inline-flex items-center gap-2 px-6 py-[15px] bg-brand text-white rounded-[10px] text-[16.5px] font-bold shadow-[0_10px_26px_rgba(37,99,235,0.36)] hover:bg-brand-dark transition-colors"
              >
                Book a demo →
              </a>
              {/* Demo video hidden — uncomment this button, the Lightbox render below, and the
                  videoOpen state + import above to bring it back
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-2 px-[18px] py-[13px] text-[15px] font-bold text-ink hover:opacity-70 transition-opacity"
              >
                <span className="w-7 h-7 rounded-full bg-ink text-white inline-flex items-center justify-center text-[10px]">
                  ▶
                </span>
                Watch 2-min tour
              </button>
              */}
              <a
                href="#platform"
                className="inline-flex items-center px-[22px] py-[13px] rounded-[10px] border border-border text-[15px] font-bold text-ink hover:bg-card transition-colors"
              >
                See the screens
              </a>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-5 text-[12.5px] text-muted-foreground">
              {TRUST.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check size={13} className="text-mint shrink-0" strokeWidth={3} />
                  {t}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-7 pt-6 border-t border-border">
              {stats.map((s) => (
                <div key={s.label} className="bg-card border border-border rounded-[13px] p-3.5 shadow-sm">
                  <div className={`w-6 h-1 rounded-full mb-2.5 ${s.bar}`} />
                  <div className="font-display text-[25px] font-black tracking-[-0.04em] tabular-nums text-ink leading-none">
                    {s.value}
                  </div>
                  <div className="text-[12px] text-muted-foreground mt-1.5 leading-[1.35]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: the two screens ────────────────────────── */}
          <div className="relative">
            <span className="absolute -top-[15px] -right-1 z-[5] hidden sm:inline-flex items-center gap-2 rounded-full px-[15px] py-2 text-[11px] font-extrabold uppercase tracking-[0.07em] text-white bg-gradient-to-br from-brand to-violet-600 shadow-[0_10px_26px_rgba(37,99,235,0.4)] whitespace-nowrap">
              🚴 New — Micromobility just added
            </span>
            <span className="sm:hidden inline-flex items-center gap-2 mb-3 rounded-full px-[15px] py-2 text-[11px] font-extrabold uppercase tracking-[0.07em] text-white bg-gradient-to-br from-brand to-violet-600 shadow-[0_10px_26px_rgba(37,99,235,0.4)]">
              🚴 New — Micromobility just added
            </span>

            {/* The phone is positioned against this box, not the column: including
                the caption in the reference box drops the phone onto the text. */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setZoom({ src: DASHBOARD, alt: DASHBOARD_ALT })}
                aria-label="Open the operations dashboard full size"
                className="block w-full text-left bg-card border border-border rounded-[15px] overflow-hidden shadow-[0_30px_70px_-25px_rgba(11,18,32,0.35)] cursor-zoom-in"
              >
                <span className="flex items-center justify-between bg-background border-b border-border px-3.5 py-2.5">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="w-[9px] h-[9px] rounded-full bg-[#F87171]" />
                    <span className="w-[9px] h-[9px] rounded-full bg-[#FBBF24]" />
                    <span className="w-[9px] h-[9px] rounded-full bg-[#34D399]" />
                  </span>
                  <span className="text-[11px] text-muted-foreground">app.dspops.app — live operations</span>
                  <span className="w-7" aria-hidden="true" />
                </span>
                <img src={DASHBOARD} alt={DASHBOARD_ALT} loading="eager" className="w-full block" />
              </button>

              <button
                type="button"
                onClick={() => setZoom({ src: DRIVER_PHONE, alt: PHONE_ALT })}
                aria-label="Open the driver app screen full size"
                className="absolute -right-2 -bottom-3.5 w-24 sm:w-[124px] sm:-right-4 sm:-bottom-[18px] lg:w-[142px] lg:-right-5 lg:-bottom-5 z-[4] cursor-zoom-in"
              >
                <span className="block bg-[#0B1220] rounded-[22px] p-1 shadow-[0_25px_50px_-10px_rgba(11,18,32,0.45)]">
                  <span className="block rounded-[19px] overflow-hidden">
                    <img src={DRIVER_PHONE} alt={PHONE_ALT} loading="eager" className="w-full block" />
                  </span>
                </span>
              </button>
            </div>

            <p className="mt-8 sm:mt-10 text-center text-[12.5px] text-muted-foreground">
              Your ops manager's morning on the left, the driver's on the right. Tap either to
              open it full size.
            </p>
          </div>
        </div>
      </div>

      <ScreenshotLightbox src={zoom?.src ?? null} alt={zoom?.alt} onClose={() => setZoom(null)} />
      {/* <Lightbox videoId={videoOpen ? "DJtEvVlwjHo" : null} onClose={() => setVideoOpen(false)} /> */}
    </section>
  );
}
