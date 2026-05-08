import { PoundSterling, Clock, Zap } from "lucide-react";

const OUTCOMES = [
  {
    role: "DSP Owner",
    headline: "Stop paying five separate bills.",
    detail: "Consolidate rota, dispatch, payroll, compliance, van inspections and SDD tracking. One invoice, no per-driver fees, and you keep the cash your old stack was costing you.",
    metric: "~£3k–£6k/yr saved",
    Icon: PoundSterling,
    color: "text-brand",
    bg: "bg-brand/10",
    dot: "bg-brand",
  },
  {
    role: "Operations Manager",
    headline: "Leave the depot on time.",
    detail: "No more spreadsheets. No more WhatsApp chaos at 06:30. Dispatch done on time, scorecards pulled from Cortex, next week's scheduling sorted in minutes, payroll runs itself at the end of the week.",
    metric: "20+ hrs/wk back",
    Icon: Clock,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    dot: "bg-emerald-600",
  },
  {
    role: "SDD Operations",
    headline: "Dedicated Same-Day Delivery.",
    detail: "Easily manage your same-day drivers separately from your standard route drivers. Their own scheduling, wave times, and vans — all kept apart so nothing gets mixed up and everything is easier to track and manage.",
    metric: "Real-time wave view",
    Icon: Zap,
    color: "text-amber-700",
    bg: "bg-amber-100",
    dot: "bg-amber-500",
  },
];

export default function WhatYouGetSection() {
  return (
    <section className="bg-background py-[100px] border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3.5">— WHAT YOU GET</div>
          <h2 className="text-[52px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02]">Three promises. Built into the platform.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {OUTCOMES.map((o, i) => (
            <div key={i} className="bg-white border border-border rounded-[16px] p-8 flex flex-col gap-[18px]">
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-xl ${o.bg} ${o.color} flex items-center justify-center`}>
                  <o.Icon size={24} />
                </div>
                <div className="text-[10px] text-[#6C6C72] uppercase tracking-[0.12em]">FOR {o.role.toUpperCase()}</div>
              </div>
              <div className="text-[24px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.15]">{o.headline}</div>
              <div className="text-[14px] text-[#6C6C72] leading-[1.55] flex-1">{o.detail}</div>
              <div className="mt-auto pt-4 border-t border-[#EFEFEB] flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${o.dot}`} />
                <div className={`text-[13px] font-semibold ${o.color} tabular-nums`}>{o.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
