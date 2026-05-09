import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import Lightbox from "@/components/Lightbox";
import { Check } from "lucide-react";

const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/Dashboard_c175dc22.webp";

const DRIVERS = [
  { name: "Amelia Scott", initials: "AS", route: "CA_R01", status: "Arrived", score: 94.2 },
  { name: "Marcus Okoye", initials: "MO", route: "CA_R04", status: "Arrived", score: 91.8 },
  { name: "Priya Mehta", initials: "PM", route: "CA_R07", status: "Late", score: 88.5 },
  { name: "James Callahan", initials: "JC", route: "CA_R11", status: "Arrived", score: 95.1 },
];

function HeroMock() {
  return (
    <div className="relative pr-[40px] sm:pr-[60px]">
      {/* Main dashboard */}
      <div className="bg-white rounded-[14px] border border-border shadow-[0_30px_60px_-20px_rgba(17,17,19,0.2)] overflow-hidden">
        {/* Browser chrome */}
        <div className="px-4 py-[11px] border-b border-border flex justify-between items-center bg-background">
          <div className="flex gap-[5px]">
            {["#F87171", "#FBBF24", "#34D399"].map(c => (
              <div key={c} className="w-[9px] h-[9px] rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="text-[11px] text-[#6C6C72] font-sans">dspops.app</div>
          <div className="w-[30px]" />
        </div>
        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-[10px] text-[#6C6C72] uppercase tracking-[0.1em] font-sans">MON 14 APR · 06:42</div>
              <div className="text-[22px] font-bold text-[#111113] tracking-[-0.02em] mt-1">Morning Dispatch</div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-[9px] py-[3px] bg-emerald-100 text-emerald-700 rounded-full text-[11px] font-semibold">
              <span className="w-[5px] h-[5px] rounded-full bg-emerald-600" /> Live
            </div>
          </div>
          {/* Status grid */}
          <div className="grid grid-cols-3 gap-2 mb-3.5">
            {[
              { n: "38", l: "Arrived", bg: "bg-emerald-100", text: "text-emerald-600" },
              { n: "2", l: "No-show", bg: "bg-red-100", text: "text-red-600" },
              { n: "1", l: "Late", bg: "bg-amber-100", text: "text-amber-700" },
            ].map(k => (
              <div key={k.l} className={`p-3 ${k.bg} rounded-lg`}>
                <div className={`text-[28px] font-extrabold ${k.text} tracking-[-0.03em] leading-none`}>{k.n}</div>
                <div className={`text-[11px] ${k.text} mt-1.5 font-semibold`}>{k.l}</div>
              </div>
            ))}
          </div>
          {/* Driver table */}
          <div className="border border-border rounded-[10px] overflow-hidden">
            {DRIVERS.map((d, i) => (
              <div key={i} className="grid grid-cols-[2fr_1fr_0.9fr_0.6fr] px-3 py-[10px] border-b border-[#EFEFEB] last:border-0 text-xs items-center">
                <div className="flex items-center gap-[9px] text-[#111113] font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand/10 text-brand-dark text-[10px] font-bold flex items-center justify-center shrink-0">{d.initials}</div>
                  {d.name}
                </div>
                <div className="text-[#6C6C72] text-[11px]">{d.route}</div>
                <div>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    d.status === "Late" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  }`}>{d.status}</span>
                </div>
                <div className="text-right font-bold text-[#111113] tabular-nums">{d.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating iPhone */}
      <div className="absolute right-0 sm:right-[-10px] top-14 sm:top-20 w-[120px] sm:w-[180px] bg-[#111113] rounded-[24px] p-1 shadow-[0_25px_50px_-10px_rgba(17,17,19,0.3)] border-[6px] border-[#111113]">
        <img src="/images/portal/home.jpeg" className="w-full rounded-[18px] block" alt="Driver portal" />
      </div>

      {/* Floating notification */}
      <div className="absolute left-0 sm:left-[-24px] bottom-6 sm:bottom-10 bg-white border border-border rounded-[12px] p-3 shadow-[0_15px_30px_-8px_rgba(17,17,19,0.18)] flex gap-[10px] items-center w-[200px] sm:w-[240px]">
        <div className="w-[34px] h-[34px] rounded-[9px] bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <Check size={17} />
        </div>
        <div className="text-xs">
          <div className="font-semibold text-[#111113]">Payroll finalised</div>
          <div className="text-[#6C6C72] mt-[1px]">42 payslips · £24,390</div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const hours = useCountUp(3, 2000, isVisible);
  const hoursYear = useCountUp(750, 2000, isVisible);
  const platforms = useCountUp(1, 2000, isVisible);
  const roi = useCountUp(5.3, 2000, isVisible, 1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section className="bg-background border-b border-border pt-[70px] sm:pt-[100px] pb-[60px] sm:pb-[80px] relative overflow-hidden">
      <div ref={ref} className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-[52px] items-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {/* Left */}
          <div>
            {/* Headline */}
            <h1 className="font-sans text-[44px] sm:text-[56px] lg:text-[84px] font-extrabold tracking-[-0.045em] leading-[0.98] text-[#111113]">
              Run your DSP<br />in <span className="text-brand">one screen.</span>
            </h1>

            {/* Badge */}
            <div className="inline-flex items-center gap-[10px] py-2 pr-[18px] pl-2 bg-white border border-border rounded-full text-sm text-[#111113] shadow-sm mt-5">
              <span className="px-[11px] py-1 bg-brand text-white rounded-full text-[11px] font-extrabold tracking-[0.06em]">NEW</span>
              <span className="font-semibold tracking-[-0.005em]">Built for DSP 2.0</span>
              <span className="text-brand font-bold">→</span>
            </div>

            {/* Description */}
            <p className="text-[15px] sm:text-[17px] lg:text-[19px] leading-[1.5] text-[#6C6C72] mt-5 max-w-[500px]">
              Rota, dispatch, payroll, compliance, driver portal, van inspections — and dedicated Same-Day Delivery tooling. Built for UK Amazon DSP owners. Replace five tools, save your OSM 32 hours a week.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-[10px] mt-7 items-center">
              <a href="#book-demo" className="px-6 py-[14px] bg-brand text-white rounded-[10px] text-[15px] font-bold tracking-[-0.005em] shadow-[0_10px_24px_rgba(37,99,235,0.4)] hover:bg-brand-dark transition-colors">
                Book a demo →
              </a>
              <button onClick={() => setLightboxOpen(true)}
                className="px-[22px] py-[14px] text-[#111113] text-[15px] font-semibold flex items-center gap-2 hover:opacity-70 transition-opacity">
                <span className="w-7 h-7 rounded-full bg-[#111113] text-white inline-flex items-center justify-center text-xs">▶</span>
                Watch 2-min tour
              </button>
            </div>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap items-center gap-[18px] text-[13px] text-[#6C6C72]">
              {["Free 14-day trial", "No card", "Setup in 20 min"].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <Check size={13} className="text-emerald-600" /> {t}
                </div>
              ))}
            </div>

            {/* Stat cards (kept from current design) */}
            <div className={`mt-7 sm:mt-11 pt-7 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              {[
                { value: `${hours}+`, label: "Hours saved daily" },
                { value: `${hoursYear}+`, label: "Hours back per year" },
                { value: String(platforms), label: "Platform replaces 3+ tools" },
                { value: `${roi}x`, label: "Average ROI" },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-border/40 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200">
                  <div className="w-8 h-1 rounded-full bg-brand mb-3" style={{ opacity: 1 - i * 0.15 }} />
                  <div className="text-3xl font-extrabold text-[#111113]">{s.value}</div>
                  <div className="text-sm text-[#6C6C72] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — dispatch mock */}
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <HeroMock />
          </div>
        </div>
      </div>

      <Lightbox videoId={lightboxOpen ? "DJtEvVlwjHo" : null} onClose={() => setLightboxOpen(false)} />
    </section>
  );
}
