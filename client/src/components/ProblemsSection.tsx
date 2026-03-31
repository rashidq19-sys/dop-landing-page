/*
 * Design: Clean Logistics Blueprint
 * Problems: Stacked cards with red/warning accents, leading to a total cost callout
 * Hairline dividers, section label at top
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock, Wrench, TrendingDown, FileText } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Scheduling Chaos",
    stat: "750 hours/year",
    description: "Wasted on manual scheduling, last-minute changes, and driver coordination. That's 3+ hours every single day.",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Wrench,
    title: "Van Damage Tracking",
    stat: "£2,400–3,600/year",
    description: "Spent on third-party tools like ClearCourt just to track van damage. Money that should stay in your pocket.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: TrendingDown,
    title: "Performance Blind Spots",
    stat: "Lower KPIs",
    description: "Without real-time scorecards, you can't see who's underperforming until it's too late. Higher churn, lower scores.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    icon: FileText,
    title: "Manual Invoicing",
    stat: "5–10 hours/week",
    description: "Spent calculating pay, chasing timesheets, and fixing errors. Admin work that adds zero value to your business.",
    color: "text-red-400",
    bgColor: "bg-red-50",
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
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            The Problem
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Running a DSP shouldn't feel<br className="hidden sm:block" /> like a second job
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Most DSP owners lose thousands of pounds and hundreds of hours every year
            to problems that should have been solved long ago.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="mt-12 lg:mt-16 grid sm:grid-cols-2 gap-4 lg:gap-6">
          {problems.map((problem, i) => (
            <div
              key={problem.title}
              className={`group p-6 lg:p-8 rounded-xl border border-border/60 hover:border-border hover:shadow-lg transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg ${problem.bgColor} shrink-0`}>
                  <problem.icon size={20} className={problem.color} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-navy">{problem.title}</h3>
                    <span className={`text-xs font-bold ${problem.color} ${problem.bgColor} px-2 py-0.5 rounded-full`}>
                      {problem.stat}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Cost Callout */}
        <div
          className={`mt-10 p-6 lg:p-8 rounded-xl bg-navy text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-sm font-medium text-white/60 uppercase tracking-wider">
              Total estimated cost of doing nothing
            </p>
            <p className="text-3xl lg:text-4xl font-extrabold mt-1">
              £8,400 – £15,600<span className="text-lg font-medium text-white/60">/year</span>
            </p>
          </div>
          <a
            href="#pricing"
            className="shrink-0 px-6 py-3 bg-amber hover:bg-amber-dark text-white font-semibold rounded-lg transition-colors"
          >
            See How We Fix This
          </a>
        </div>
      </div>
    </section>
  );
}
