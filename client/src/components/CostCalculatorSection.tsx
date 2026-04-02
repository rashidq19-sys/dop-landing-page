/*
 * Design: Clean Logistics Blueprint
 * Section 10: Interactive Cost Calculator
 * Side-by-side inputs + live results panel
 */

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calculator, Clock, PoundSterling, TrendingDown, Smartphone } from "lucide-react";

const HOURLY_RATE = 25;
const DAMAGE_APP_MONTHLY = 250;
const WEEKS_PER_YEAR = 52;

function getTier(drivers: number): { monthly: number; annual: number; label: string } | null {
  if (drivers <= 30) return { monthly: 99, annual: 99 * 12, label: "Starter (£99/mo)" };
  if (drivers <= 100) return { monthly: 249, annual: 249 * 12, label: "Professional (£249/mo)" };
  return null; // Enterprise — contact us
}

export default function CostCalculatorSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const [drivers, setDrivers] = useState(40);
  const [schedulingHours, setSchedulingHours] = useState(15);
  const [payrollHours, setPayrollHours] = useState(8);
  const [hasDamageApp, setHasDamageApp] = useState(false);

  const weeklyHoursSaved = schedulingHours + payrollHours;
  const annualHoursSaved = weeklyHoursSaved * WEEKS_PER_YEAR;
  const damageAppSavings = hasDamageApp ? DAMAGE_APP_MONTHLY * 12 : 0;
  const tier = getTier(drivers);
  const annualDSPOpsCost = tier?.annual ?? 0;
  const timeSavingsValue = annualHoursSaved * HOURLY_RATE;
  const netSavings = timeSavingsValue + damageAppSavings - annualDSPOpsCost;

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-slate-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Calculate your savings
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            How much is your current setup costing you?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Enter your DSP details and see what you could save with DSPOps.
          </p>
        </div>

        {/* Calculator Grid */}
        <div
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Input Form — Left Side */}
          <div className="space-y-6">
            <InputField
              label="How many drivers?"
              icon={<Calculator size={18} className="text-brand" />}
              value={drivers}
              onChange={setDrivers}
              min={1}
              max={500}
            />
            <InputField
              label="Hours/week on manual scheduling?"
              icon={<Clock size={18} className="text-brand" />}
              value={schedulingHours}
              onChange={setSchedulingHours}
              min={0}
              max={80}
            />
            <InputField
              label="Hours/week on payroll?"
              icon={<Clock size={18} className="text-brand" />}
              value={payrollHours}
              onChange={setPayrollHours}
              min={0}
              max={80}
            />

            {/* Damage App Toggle */}
            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Paying for a separate damage app?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setHasDamageApp(true)}
                  className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    hasDamageApp
                      ? "bg-brand text-white shadow-md"
                      : "bg-white border border-border text-navy/60 hover:border-brand/40"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHasDamageApp(false)}
                  className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    !hasDamageApp
                      ? "bg-brand text-white shadow-md"
                      : "bg-white border border-border text-navy/60 hover:border-brand/40"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel — Right Side */}
          <div className="bg-navy text-white rounded-xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingDown size={20} className="text-amber" />
                Your estimated savings
              </h3>

              <div className="space-y-5">
                <ResultLine
                  label="Time saved per week"
                  value={`${weeklyHoursSaved} hours/week`}
                  icon={<Clock size={16} />}
                />
                <ResultLine
                  label="Annual time savings"
                  value={`${annualHoursSaved.toLocaleString()} hours/year`}
                  icon={<Clock size={16} />}
                />
                <ResultLine
                  label="Value of time saved"
                  value={`£${timeSavingsValue.toLocaleString()}/year`}
                  sublabel="Based on £25/hour"
                  icon={<PoundSterling size={16} />}
                />
                <ResultLine
                  label="Damage app savings"
                  value={hasDamageApp ? "£3,000/year" : "£0"}
                  icon={<Smartphone size={16} />}
                />

                <div className="border-t border-white/15 pt-4">
                  <ResultLine
                    label="DSPOps cost"
                    value={tier ? `£${tier.annual.toLocaleString()}/year` : "Contact us for pricing"}
                    sublabel={tier?.label}
                    icon={<PoundSterling size={16} />}
                  />
                </div>

                <div className="border-t border-white/15 pt-5">
                  {tier ? (
                    <div>
                      <span className="text-sm text-white/60">Estimated net savings</span>
                      <p className="text-3xl lg:text-4xl font-extrabold text-green-400 mt-1">
                        £{netSavings.toLocaleString()}/year
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-sm text-white/60">Estimated net savings</span>
                      <p className="text-lg font-semibold text-amber mt-1">
                        Contact us for a custom quote
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-white/40 mt-8">
              Estimates based on average DSP operations. Actual savings may vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Sub-components ── */

function InputField({
  label,
  icon,
  value,
  onChange,
  min = 0,
  max = 999,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (!isNaN(v)) onChange(Math.max(min, Math.min(max, v)));
          }}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white text-navy font-semibold text-base focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
        />
      </div>
    </div>
  );
}

function ResultLine({
  label,
  value,
  sublabel,
  icon,
}: {
  label: string;
  value: string;
  sublabel?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-2 text-white/60 text-sm shrink-0">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-right">
        <span className="font-bold text-white">{value}</span>
        {sublabel && <p className="text-xs text-white/40">{sublabel}</p>}
      </div>
    </div>
  );
}
