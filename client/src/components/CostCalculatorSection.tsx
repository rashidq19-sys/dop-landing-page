import { useState } from "react";

function getTier(drivers: number): { name: string; cost: number } {
  if (drivers <= 30) return { name: "Starter", cost: 99 };
  if (drivers <= 100) return { name: "Professional", cost: 249 };
  return { name: "Enterprise", cost: 0 };
}

export default function CostCalculatorSection() {
  const [drivers, setDrivers] = useState(42);
  const [schedHrs, setSchedHrs] = useState(15);
  const [payrollHrs, setPayrollHrs] = useState(8);
  const [inspectApp, setInspectApp] = useState(true);

  const rate = 25;
  const weekly = schedHrs + payrollHrs;
  const monthlyHrs = weekly * 4.33;
  const timeVal = monthlyHrs * rate;
  const damageVal = inspectApp ? 250 : 0;
  const tier = getTier(drivers);
  const netMonthly = timeVal + damageVal - tier.cost;

  return (
    <section id="calculator" className="bg-white py-[70px] sm:py-[100px] border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3.5">— CALCULATE</div>
          <div className="flex items-end justify-between gap-10 flex-wrap">
            <h2 className="text-[32px] sm:text-[52px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02]">See your exact savings.</h2>
            <p className="text-[17px] text-[#6C6C72] leading-[1.55] max-w-[420px]">
              Adjust the sliders to match your fleet. We use a typical £25/hr loaded rate for OSM time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Inputs */}
          <div className="bg-background rounded-[16px] border border-border p-5 sm:p-8">
            <div className="text-[11px] text-[#6C6C72] uppercase tracking-[0.1em] mb-6">INPUTS</div>
            <div className="flex flex-col gap-7">
              {[
                { label: "Drivers", value: drivers, set: setDrivers, min: 5, max: 200 },
                { label: "Hours/week on scheduling", value: schedHrs, set: setSchedHrs, min: 0, max: 40 },
                { label: "Hours/week on payroll", value: payrollHrs, set: setPayrollHrs, min: 0, max: 20 },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between mb-2.5">
                    <span className="text-[14px] font-semibold text-[#111113]">{s.label}</span>
                    <span className="text-[22px] font-extrabold text-brand tracking-[-0.02em] leading-none">{s.value}</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} value={s.value}
                    onChange={e => s.set(+e.target.value)}
                    className="w-full accent-brand" />
                </div>
              ))}
              {/* Damage app toggle */}
              <div>
                <div className="text-[14px] font-semibold text-[#111113] mb-1.5">Pay for a separate van inspection app?</div>
                <div className="text-[12px] text-[#6C6C72] mb-2.5">Many UK DSPs use Samsara, Odeon or similar — £200–£300/mo. DSPOps includes this.</div>
                <div className="flex gap-2">
                  {[true, false].map(v => (
                    <button key={String(v)} onClick={() => setInspectApp(v)}
                      className={`flex-1 py-2.5 rounded-lg text-[14px] font-semibold border transition-colors ${
                        inspectApp === v ? "bg-brand text-white border-brand" : "bg-white text-[#111113] border-border"
                      }`}>
                      {v ? "Yes, I pay for one" : "No"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-[#111113] text-white rounded-[16px] p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-[#94A3B8] uppercase tracking-[0.1em] mb-5">YOUR MONTHLY ESTIMATE</div>
              <div className="flex flex-col gap-3.5">
                {[
                  { l: "OSM hours saved per week", v: `${weekly} hrs` },
                  { l: "Hours recovered per month", v: `${Math.round(monthlyHrs)} hrs` },
                  { l: "Value of OSM time (£25/hr)", v: `£${Math.round(timeVal).toLocaleString()}` },
                  { l: "Van inspection app cancelled", v: inspectApp ? "£250" : "£0" },
                  { l: `DSPOps ${tier.name} (monthly)`, v: tier.cost ? `−£${tier.cost}` : "Contact sales" },
                ].map((r, i) => (
                  <div key={i} className={`flex justify-between pb-3 text-[14px] ${i < 4 ? "border-b border-white/[0.08]" : ""}`}>
                    <span className="text-[#94A3B8]">{r.l}</span>
                    <span className="font-bold tabular-nums">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-7 p-4 sm:p-[22px] bg-brand/15 border border-brand/35 rounded-xl">
              <div className="text-[11px] text-brand-light uppercase tracking-[0.1em]">NET SAVINGS / MONTH</div>
              <div className="text-[36px] sm:text-[52px] font-extrabold tracking-[-0.04em] leading-none mt-1">
                {tier.cost ? `£${Math.round(netMonthly).toLocaleString()}` : "Custom"}
              </div>
              <div className="text-[13px] text-[#94A3B8] mt-1.5">
                {tier.cost ? `That's £${Math.round(netMonthly * 12).toLocaleString()}/yr back in your DSP.` : "Book a demo for a tailored Enterprise quote."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
