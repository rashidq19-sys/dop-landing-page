/*
 * Design: Clean Logistics Blueprint
 * Problems: 6 cards (2x3 grid) with red accents, impact stats, cost callout
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock, Wrench, EyeOff, FileText, Smartphone, MessageSquareWarning } from "lucide-react";
import EmailCaptureInline from "@/components/EmailCaptureInline";

const problems = [
  {
    icon: Clock,
    title: "Spreadsheet Scheduling",
    description: "You're still assigning drivers to routes manually. Someone calls in sick at 6 AM and it's a scramble to rearrange everything.",
    impact: "~750 hours/year wasted",
  },
  {
    icon: Wrench,
    title: "Paying Extra for Van Damage Apps",
    description: "You're paying £200-300/month for a separate damage detection tool. Another app, another login, another bill.",
    impact: "£2,400-3,600/year on top",
  },
  {
    icon: EyeOff,
    title: "No Visibility Into Operations",
    description: "You don't know what's happening until the OSM tells you. No real-time view of performance, attendance, or problems.",
    impact: "Flying blind daily",
  },
  {
    icon: FileText,
    title: "Manual Pay Calculations",
    description: "Timesheets, deductions, bonuses — your OSM spends hours every week calculating pay. Then the accountant needs it in a different format.",
    impact: "5-10 hours/week",
  },
  {
    icon: Smartphone,
    title: "Drivers Juggling Multiple Apps",
    description: "One app for driving performance, another for van damage, constantly asking the OSM about shifts and pay. Everyone's time gets wasted.",
    impact: "Constant interruptions",
  },
  {
    icon: MessageSquareWarning,
    title: "Everything Buried in WhatsApp Groups",
    description: "Van photos in one group, routes in another, attendance in a third. With 30+ drivers all messaging at once, your OSM spends half the morning scrolling back to figure out who's submitted what — and who hasn't.",
    impact: "Hours lost in chat every day",
  },
];

export default function ProblemsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div
          className={`transition-all duration-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Sound familiar?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Running a DSP shouldn't feel<br className="hidden sm:block" /> like this
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Every DSP owner knows these headaches. You're not alone — but you don't have to live with them.
          </p>
        </div>

        {/* Problem Cards — 2x3 grid */}
        <div className="mt-12 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {problems.map((problem, i) => (
            <div
              key={problem.title}
              className={`group p-6 lg:p-8 rounded-xl border border-red-200/60 hover:border-red-300 hover:shadow-lg bg-white transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-red-50 shrink-0">
                  <problem.icon size={20} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy mb-2">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {problem.description}
                  </p>
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    {problem.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Time Waste Callout + Email CTA */}
        <div
          className={`mt-10 p-6 lg:p-8 rounded-xl bg-navy text-white transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-white/60 uppercase tracking-wider">
                Time you could get back
              </p>
              <p className="text-3xl lg:text-4xl font-extrabold mt-1">
                750+ hours<span className="text-lg font-medium text-white/60">/year</span>
              </p>
              <p className="text-sm text-white/50 mt-1">
                wasted on manual scheduling, payroll, and juggling multiple tools
              </p>
            </div>
            <EmailCaptureInline variant="dark" className="w-full lg:max-w-md" buttonText="Stop Wasting Time" />
          </div>
        </div>
      </div>
    </section>
  );
}
