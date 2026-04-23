import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const OWNER = {
  name: "Alex", role: "DSP Owner", fleet: "3 stations · 64 drivers",
  headline: "Fleet performance at a glance. No more Sunday-night spreadsheet forensics.",
  metrics: [
    { l: "Tools consolidated", v: "5 → 1", d: "£3,240/yr saved" },
    { l: "OSM hours recovered", v: "32 hrs/wk", d: "Per station, typical" },
    { l: "New station rollout", v: "20 min", d: "From zero to dispatching" },
    { l: "Compliance alerts", v: "↗ 12", d: "Before Amazon flagged us" },
  ],
  schedule: [
    { t: "07:15", evt: "Opens fleet dashboard", tag: "One login" },
    { t: "07:20", evt: "Spots Station B below 94% — calls OSM", tag: "Proactive" },
    { t: "12:00", evt: "Reviews weekly payroll export", tag: "One click" },
    { t: "18:00", evt: "Approves next week rota from phone", tag: "Mobile" },
  ],
  panelBg: "bg-brand",
  accent: "text-brand-light",
  accentBg: "bg-brand-light",
  tagBg: "bg-brand/10",
  tagText: "text-brand-dark",
  dot: "bg-brand",
  cta: "Owner demo",
  ctaBg: "bg-brand",
};

const OSM = {
  name: "Priya", role: "Operations Manager", fleet: "Station A · 22 drivers",
  headline: "Close WhatsApp. Dispatch by 08:30. Actually leave the depot on time.",
  metrics: [
    { l: "Weekly hours back", v: "32 hrs", d: "Rota + payroll + chaos" },
    { l: "Dispatch time", v: "08:30", d: "Down from 09:45" },
    { l: "Driver calls answered", v: "−68%", d: "They use the portal" },
    { l: "Monday start", v: "Calm", d: "Not a spreadsheet rebuild" },
  ],
  schedule: [
    { t: "06:42", evt: "Morning Dispatch — 38 arrived, 2 no-shows", tag: "One screen" },
    { t: "07:10", evt: "Reassigns 2 routes via drag-and-drop", tag: "Fast" },
    { t: "08:30", evt: "All waves out — SDD + standard", tag: "On time" },
    { t: "16:00", evt: "Payroll auto-runs. Leaves at 17:00", tag: "Home" },
  ],
  panelBg: "bg-[#111113]",
  accent: "text-emerald-400",
  accentBg: "bg-emerald-400",
  tagBg: "bg-emerald-100",
  tagText: "text-emerald-800",
  dot: "bg-emerald-500",
  cta: "OSM walkthrough",
  ctaBg: "bg-[#111113]",
};

type Persona = typeof OWNER;

function PersonaPanel({ p }: { p: Persona }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] border border-border rounded-[20px] overflow-hidden min-h-[520px]">
      {/* Left: colored panel */}
      <div className={`${p.panelBg} text-white p-10 flex flex-col relative overflow-hidden`}>
        <div className="absolute right-[-80px] top-[-80px] w-[300px] h-[300px] rounded-full bg-white/10 blur-2xl pointer-events-none" />
        {/* Persona header */}
        <div className="flex items-center gap-3.5 relative">
          <div className="w-[52px] h-[52px] rounded-full bg-white/15 border-2 border-white/25 flex items-center justify-center text-[20px] font-extrabold">
            {p.name[0]}
          </div>
          <div>
            <div className="text-[18px] font-bold tracking-[-0.015em]">{p.name}</div>
            <div className={`text-[11px] ${p.accent} uppercase tracking-[0.1em] mt-0.5`}>{p.role}</div>
          </div>
        </div>
        {/* Headline */}
        <h3 className="relative text-[28px] font-extrabold tracking-[-0.03em] leading-[1.1] mt-7 max-w-[420px]">{p.headline}</h3>
        {/* Metrics 2x2 */}
        <div className="relative mt-auto pt-9 grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          {p.metrics.map((m, i) => (
            <div key={i} className="px-5 py-[18px] bg-white/[0.04] backdrop-blur-sm">
              <div className={`text-[10px] ${p.accent} uppercase tracking-[0.1em]`}>{m.l}</div>
              <div className="text-[28px] font-extrabold tracking-[-0.025em] mt-1 leading-none">{m.v}</div>
              <div className="text-[11px] text-white/65 mt-1">{m.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: timeline */}
      <div className="bg-white p-10 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="text-[11px] text-[#6C6C72] uppercase tracking-[0.12em] font-semibold">A DAY WITH DSPOps</div>
          <div className={`flex items-center gap-1.5 px-[10px] py-1 ${p.tagBg} ${p.tagText} rounded-full text-[11px] font-bold`}>
            <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} /> Live now
          </div>
        </div>
        <div className="relative flex-1">
          <div className="absolute left-8 top-1.5 bottom-1.5 w-0.5 bg-border" />
          {p.schedule.map((s, i) => (
            <div key={i} className="grid mb-6 last:mb-0 relative" style={{ gridTemplateColumns: "72px 1fr", gap: 18 }}>
              <div className="text-[13px] font-bold text-[#111113] text-right pt-1 tabular-nums">{s.t}</div>
              <div className="relative">
                <div className={`absolute left-[-26px] top-1.5 w-3 h-3 rounded-full ${p.dot} border-[3px] border-white shadow-sm`} />
                <div className="px-4 py-3 bg-background border border-border rounded-[10px]">
                  <div className="text-[14px] text-[#111113] font-semibold tracking-[-0.01em]">{s.evt}</div>
                  <div className={`inline-flex items-center mt-1.5 px-2 py-0.5 ${p.tagBg} ${p.tagText} rounded-full text-[10px] font-semibold uppercase tracking-[0.06em]`}>
                    {s.tag}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <a href="#book-demo" className={`mt-7 px-5 py-[13px] ${p.ctaBg} text-white rounded-[10px] text-[14px] font-bold self-start inline-flex items-center gap-2 hover:opacity-80 transition-opacity`}>
          {p.cta} <span className="text-[15px]">&#x2192;</span>
        </a>
      </div>
    </div>
  );
}

export default function AudiencesSection() {
  return (
    <section id="audiences" className="bg-background py-[100px] border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3.5">— WHO IT&apos;S FOR</div>
          <div className="flex items-end justify-between gap-10 flex-wrap">
            <h2 className="text-[52px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02]">Two people, one platform.</h2>
            <p className="text-[17px] text-[#6C6C72] leading-[1.55] max-w-[420px]">The Owner makes the call. The OSM lives in it. Both see the same truth.</p>
          </div>
        </div>

        <Tabs defaultValue="owner">
          <TabsList className="mb-5 p-1 bg-white border border-border rounded-xl gap-1 h-auto">
            <TabsTrigger value="owner"
              className="flex items-center gap-3 px-[18px] py-3 rounded-[9px] data-[state=active]:bg-background data-[state=active]:border data-[state=active]:border-border data-[state=active]:shadow-sm text-left">
              <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center text-xs font-bold shrink-0">A</div>
              <div>
                <div className="text-[14px] font-bold text-[#111113]">DSP Owner</div>
                <div className="text-[10px] text-[#6C6C72] mt-0.5 tabular-nums">{OWNER.fleet}</div>
              </div>
            </TabsTrigger>
            <TabsTrigger value="osm"
              className="flex items-center gap-3 px-[18px] py-3 rounded-[9px] data-[state=active]:bg-background data-[state=active]:border data-[state=active]:border-border data-[state=active]:shadow-sm text-left">
              <div className="w-8 h-8 rounded-lg bg-[#111113] text-white flex items-center justify-center text-xs font-bold shrink-0">P</div>
              <div>
                <div className="text-[14px] font-bold text-[#111113]">Operations Manager</div>
                <div className="text-[10px] text-[#6C6C72] mt-0.5 tabular-nums">{OSM.fleet}</div>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="owner"><PersonaPanel p={OWNER} /></TabsContent>
          <TabsContent value="osm"><PersonaPanel p={OSM} /></TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
