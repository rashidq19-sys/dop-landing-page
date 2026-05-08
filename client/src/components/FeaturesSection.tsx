import { useState } from "react";
import { Calendar, Sunrise, Smartphone, PoundSterling, BarChart2, Truck, Shield, Zap, Activity } from "lucide-react";

const MODULES = [
  { key: "rota", name: "Rota", short: "Scheduling", blurb: "Fully automated. Drivers choose their availability from their own portal — it syncs straight to the rota, no chasing required.", icon: Calendar, saved: "9hr/wk" },
  { key: "dispatch", name: "Dispatch", short: "Deployment Plan", blurb: "Mark arrivals, hand out keys, track no-shows in under 30 minutes.", icon: Sunrise, saved: "4hr/wk" },
  { key: "portal", name: "Portal", short: "Driver app", blurb: "Every driver gets their own app. Rota, payslips, scorecards, van inspections.", icon: Smartphone, saved: "3hr/wk" },
  { key: "payroll", name: "Payroll", short: "& Invoices", blurb: "Pay calculated directly from Amazon Cortex's Work Summary Tool. One-click export for your accountant.", icon: PoundSterling, saved: "6hr/wk" },
  { key: "scorecards", name: "Scorecards", short: "Cortex", blurb: "Amazon Cortex metrics live. Every driver sees their own score. Your OSM instantly knows where the DSP needs attention — spot the pattern, stop the same problem recurring.", icon: BarChart2, saved: "3hr/wk" },
  { key: "damage", name: "Van Condition", short: "Inspections", blurb: "Daily van check-ins with photo + timestamp. Replace your £249/mo third-party inspection app.", icon: Truck, saved: "£249/mo" },
  { key: "compliance", name: "Compliance", short: "Docs", blurb: "Licences, right-to-work, insurance — expiries tracked. Auto-reminders.", icon: Shield, saved: "2hr/wk" },
  { key: "sdd", name: "Same-Day", short: "SDD waves", blurb: "Purpose-built for DSPs running SDD. Separate wave view, tighter SLAs, late-stop alerts — all live from Cortex.", icon: Zap, saved: "SLA risk ↓" },
  { key: "tracking", name: "Tracking", short: "Live", blurb: "Live delivery progress from Cortex, surfaced to drivers so they know where they stand.", icon: Activity, saved: "2hr/wk" },
] as const;

type ModuleKey = typeof MODULES[number]["key"];

function ModulePreview({ moduleKey }: { moduleKey: ModuleKey }) {
  if (moduleKey === "portal") {
    return <img src="/images/driver-portal.png" className="max-h-[440px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]" alt="Driver portal" />;
  }
  if (moduleKey === "payroll") {
    return <img src="/images/payroll-phone.png" className="max-h-[440px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]" alt="Payroll" />;
  }
  if (moduleKey === "scorecards") {
    return <img src="/images/scorecard.png" className="max-h-[440px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]" alt="Scorecards" />;
  }
  if (moduleKey === "rota") {
    return <img src="/images/rota-phone-v2.png" className="max-h-[440px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]" alt="Rota" />;
  }
  if (moduleKey === "dispatch") {
    return <img src="/images/dispatch-deployment-plan.png" className="max-h-[440px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]" alt="Deployment Plan" />;
  }
  if (moduleKey === "damage") {
    return (
      <div className="w-full max-w-[420px] grid grid-cols-3 gap-2">
        {[0,1,2,3,4,5].map(i => (
          <div key={i} className="aspect-square bg-gradient-to-br from-[#EFEFEB] to-border rounded-lg relative border border-border">
            <div className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
              i < 2 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
            }`}>{i < 2 ? "ATTN" : "CLEAN"}</div>
          </div>
        ))}
      </div>
    );
  }
  if (moduleKey === "compliance") {
    return (
      <div className="w-full max-w-[400px] bg-white rounded-xl border border-border overflow-hidden">
        {[
          { n: "Driving licence", d: "Expires Feb 2027", ok: true },
          { n: "Right to work", d: "Expires May 2028", ok: true },
          { n: "Insurance", d: "Expires in 14 days", ok: false },
          { n: "DBS check", d: "Up to date", ok: true },
        ].map((x, i) => (
          <div key={i} className="px-4 py-3.5 border-b border-[#EFEFEB] last:border-0 flex justify-between items-center">
            <div>
              <div className="text-[14px] font-semibold text-[#111113]">{x.n}</div>
              <div className="text-[12px] text-[#6C6C72] mt-0.5">{x.d}</div>
            </div>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
              x.ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}>
              {x.ok ? "✓" : "!"}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (moduleKey === "sdd") {
    return (
      <div className="w-full max-w-[440px] bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex justify-between items-center">
          <div className="text-[13px] font-bold text-[#111113]">Same-Day · Wave 3</div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-[11px] font-bold">
            ⏰ SLA 14:30
          </div>
        </div>
        <div className="px-4 py-2 bg-red-50 border-b border-[#EFEFEB] flex items-center gap-2 text-[12px] text-red-600 font-semibold">
          ⚡ 2 routes at risk — reassign or extend window
        </div>
        {[
          { r: "SDD_R14", d: "Priya M.", stops: "18/24", eta: "14:12", s: "risk" },
          { r: "SDD_R15", d: "Marcus O.", stops: "22/22", eta: "13:48", s: "done" },
          { r: "SDD_R16", d: "Amelia S.", stops: "9/21", eta: "14:55", s: "late" },
          { r: "SDD_R17", d: "James C.", stops: "15/19", eta: "14:22", s: "live" },
        ].map((x, i) => {
          const colors: Record<string, string> = { done: "bg-emerald-100 text-emerald-700", late: "bg-red-100 text-red-600", risk: "bg-amber-100 text-amber-700", live: "bg-brand/10 text-brand" };
          return (
            <div key={i} className="px-4 py-3 border-b border-[#EFEFEB] last:border-0 grid grid-cols-[1.1fr_1fr_0.9fr_0.7fr] items-center text-xs">
              <span className="text-[#111113] font-mono font-semibold">{x.r}</span>
              <span className="text-[#353538]">{x.d}</span>
              <span className="text-[#6C6C72] tabular-nums">{x.stops}</span>
              <span className={`justify-self-end px-2 py-0.5 rounded-full text-[10px] font-bold ${colors[x.s]}`}>{x.eta}</span>
            </div>
          );
        })}
      </div>
    );
  }
  // tracking (default)
  return (
    <div className="w-full max-w-[400px] bg-white rounded-xl border border-border p-5">
      {[
        { l: "Wave 1 · CA_R01", p: 78 }, { l: "Wave 1 · CA_R04", p: 92 },
        { l: "Wave 2 · CA_R07", p: 45 }, { l: "Wave 2 · CA_R11", p: 32 }, { l: "SDD · CA_R14", p: 12 },
      ].map((x, i) => (
        <div key={i} className="mb-3.5 last:mb-0">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-[#353538] font-mono">{x.l}</span>
            <span className="text-[#111113] font-bold">{x.p}%</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-brand rounded-full" style={{ width: `${x.p}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FeaturesSection() {
  const [active, setActive] = useState(0);
  const m = MODULES[active];
  const Icon = m.icon;

  return (
    <section id="features" className="bg-white py-[100px] border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3.5">— PLATFORM</div>
          <div className="flex items-end justify-between gap-10 flex-wrap">
            <h2 className="text-[52px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02]">Nine modules. One login. Zero spreadsheets.</h2>
            <p className="text-[17px] text-[#6C6C72] leading-[1.55] max-w-[420px]">Every module built specifically for how Amazon DSPs run — including dedicated Same-Day Delivery support.</p>
          </div>
        </div>

        {/* Module pill row */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2 text-[11px] text-[#6C6C72] uppercase tracking-[0.12em]">
            <span className="px-[9px] py-1 bg-[#111113] text-white rounded-full text-[10px] font-bold">TAP TO EXPLORE</span>
            <span className="hidden sm:inline">← select a module →</span>
          </div>
          <div className="text-[11px] text-[#6C6C72] tabular-nums">0{active + 1} / 09</div>
        </div>

        <div className="bg-background rounded-[16px] border border-border p-2 grid gap-1 mb-6"
          style={{ gridTemplateColumns: "repeat(9, 1fr)" }}>
          {MODULES.map((mod, i) => {
            const Ic = mod.icon;
            return (
              <button key={mod.key} onClick={() => setActive(i)}
                className={`py-4 px-2 flex flex-col items-center gap-2 rounded-[11px] text-[12px] font-semibold transition-all duration-150 relative ${
                  active === i
                    ? "bg-brand text-white border border-brand shadow-[0_6px_16px_rgba(37,99,235,0.35)]"
                    : "bg-white text-[#353538] border border-border shadow-[0_1px_2px_rgba(17,17,19,0.04)] hover:bg-background"
                }`}>
                <Ic size={22} />
                <div className="text-center leading-tight text-[11px]">{mod.name}</div>
                {active === i && (
                  <div className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-brand" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-4">
          <div className="bg-background rounded-[16px] border border-border p-9 flex flex-col">
            <div className="text-[11px] text-[#6C6C72] uppercase tracking-[0.1em]">MODULE · 0{active + 1}/09 · {m.short.toUpperCase()}</div>
            <h3 className="text-[44px] font-extrabold text-[#111113] tracking-[-0.03em] leading-[1.02] mt-3">{m.name}</h3>
            <p className="text-[17px] text-[#353538] leading-[1.55] mt-4">{m.blurb}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Built for Amazon DSPs", "Mobile + web", "CSV export", "Live sync"].map(t => (
                <span key={t} className="px-3 py-1.5 bg-white border border-border rounded-full text-[12px] font-medium text-[#353538]">{t}</span>
              ))}
            </div>
            <div className="mt-7 pt-5 border-t border-border grid grid-cols-2 gap-6">
              <div>
                <div className="text-[11px] text-[#6C6C72] uppercase tracking-[0.1em]">TIME SAVED</div>
                <div className="text-[22px] font-extrabold text-[#111113] tracking-[-0.02em] mt-1">{m.saved}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#6C6C72] uppercase tracking-[0.1em]">WORKS WITH</div>
                <div className="text-[22px] font-extrabold text-[#111113] tracking-[-0.02em] mt-1">Amazon Cortex</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-background to-border/40 rounded-[16px] border border-border p-9 min-h-[480px] flex items-center justify-center">
            <ModulePreview moduleKey={m.key} />
          </div>
        </div>
      </div>
    </section>
  );
}
