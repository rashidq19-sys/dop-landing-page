import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X, Check } from "lucide-react";
import EmailCaptureInline from "@/components/EmailCaptureInline";

const withoutItems = [
  "Scheduling in spreadsheets — hours every week",
  "Paying £200-300/month for a separate damage app",
  "Morning dispatch takes 60+ minutes of chaos",
  "Manual pay calculations — 5-10 hours/week",
  "Drivers constantly asking OSM about shifts and pay",
  "Scrolling through 5 WhatsApp groups to track 30+ drivers",
  "No clear view of driver performance trends",
  "Reformatting data every time accountant needs it",
];

const withItems = [
  "Smart scheduling — routes assigned automatically",
  "Van damage detection built in — no extra app or cost",
  "Dispatch done in 30 minutes — calm, tracked, sorted",
  "Payroll calculated automatically from shift data",
  "Drivers see everything on their own portal",
  "Everything submitted, tracked, and visible in one place",
  "Performance pinpointed per driver — with training",
  "One-click export for your accountant",
];

export default function BeforeAfterSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
            Before & After DSP<span className="text-brand">Ops</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Without DSPOps — Red Panel */}
          <div
            className={`rounded-2xl border border-red-200 bg-red-50 p-6 lg:p-8 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="text-xl font-semibold text-red-700 mb-6 flex items-center gap-2">
              <X className="w-6 h-6 text-red-500" />
              The Old Way
            </h3>
            <ul className="space-y-4">
              {withoutItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With DSPOps — Green Panel */}
          <div
            className={`rounded-2xl border border-green-200 bg-green-50 p-6 lg:p-8 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h3 className="text-xl font-semibold text-green-700 mb-6 flex items-center gap-2">
              <Check className="w-6 h-6 text-green-500" />
              <span>With <span className="text-navy">DSP</span><span className="text-brand">Ops</span></span>
            </h3>
            <ul className="space-y-4">
              {withItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Email CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <p className="text-lg font-semibold text-navy mb-4">
            See the difference for yourself
          </p>
          <EmailCaptureInline className="max-w-lg mx-auto" buttonText="Make The Switch" />
        </div>
      </div>
    </section>
  );
}
