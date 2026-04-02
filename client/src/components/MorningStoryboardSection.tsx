/*
 * Design: Clean Logistics Blueprint
 * Section 8: "A Morning With DSPOps" — immersive dark timeline
 * Dark navy background with vertical timeline showing a typical dispatch morning
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock } from "lucide-react";

const timelineEntries = [
  {
    time: "6:00",
    title: "OSM opens the dashboard",
    description:
      "Today's rota is already set. Drivers assigned to routes. Van allocations done. No spreadsheet needed.",
    borderColor: "border-blue-500",
    bgTint: "",
  },
  {
    time: "6:10",
    title: "Attendance check — live",
    description:
      "Drivers check in on the app. OSM sees who's arrived and who's missing — no clipboard, no guessing.",
    borderColor: "border-blue-500",
    bgTint: "",
  },
  {
    time: "6:15",
    title: "Someone doesn't show up",
    description:
      "A driver is missing. OSM taps their name, calls them. Not coming? One tap to find a replacement and reassign. Done.",
    borderColor: "border-red-500",
    bgTint: "bg-red-500/10",
  },
  {
    time: "6:20",
    title: "Keys handed over, vans tracked",
    description:
      "Each van handover is logged. OSM sees exactly which vans are out and which are still waiting.",
    borderColor: "border-purple-500",
    bgTint: "",
  },
  {
    time: "6:25",
    title: "Van photos uploaded — instantly visible",
    description:
      "Drivers upload pre-departure photos/videos. OSM sees them in real time — spots who hasn't uploaded.",
    borderColor: "border-green-500",
    bgTint: "",
  },
  {
    time: "6:30",
    title: "Dispatch complete. Everyone's on the road.",
    description:
      "30 minutes. No spreadsheets, no chaos, no shouting across the yard. Owner checks dashboard from home — everything's green.",
    borderColor: "border-green-500",
    bgTint: "bg-green-500/10",
  },
];

export default function MorningStoryboardSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/cta-bg-iTRQFNjxE444sjVTvXHPEt.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-navy/92" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-blue-300 text-sm font-medium mb-4">
            <Clock size={14} />
            See it in action
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            A morning with DSPOps
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            It's 6:00 AM. Dispatch starts. Here's how DSPOps keeps everything
            running smoothly.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical gradient line */}
          <div
            className="absolute left-[27px] sm:left-[31px] top-0 bottom-0 w-0.5"
            style={{
              background:
                "linear-gradient(to bottom, #3b82f6, #a855f7, #22c55e)",
            }}
          />

          <div className="space-y-8">
            {timelineEntries.map((entry, i) => (
              <div
                key={entry.time}
                className={`relative flex gap-4 sm:gap-6 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Time badge */}
                <div className="flex-shrink-0 w-14 sm:w-16 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center z-10">
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {entry.time}
                  </span>
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 border-l-4 ${entry.borderColor} ${
                    entry.bgTint || "bg-white/5"
                  } rounded-lg p-4 sm:p-5 backdrop-blur-sm`}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {entry.title}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-white/60 leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing line */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <p className="text-white/60 italic text-lg max-w-2xl mx-auto">
            That's dispatch done in 30 minutes. Your OSM can now focus on
            improving performance — not firefighting.
          </p>
        </div>
      </div>
    </section>
  );
}
