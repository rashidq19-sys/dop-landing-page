import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionEyebrow from "@/components/home/SectionEyebrow";

type Plan = {
  name: string;
  price: string;
  priceNote: string;
  drivers: string;
  features: string[];
  featured?: boolean;
  dark?: boolean;
  trial: string;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "£99",
    priceNote: "/mo",
    drivers: "Up to 30 drivers · single station",
    features: [
      "Rota · Dispatch · Check-in · Driver app",
      "Performance scorecards & van inspections",
      "Compliance & document expiry tracking",
    ],
    trial: "7-day free trial · no card",
  },
  {
    name: "Professional",
    price: "£249",
    priceNote: "/mo",
    drivers: "Up to 100 drivers · single station",
    features: [
      "Everything in Starter",
      "Driver invoicing & pay runs",
      "Self-service driver onboarding",
      "Same-day delivery module · priority support",
    ],
    featured: true,
    trial: "7-day free trial · no card",
  },
  {
    name: "Enterprise",
    price: "Per driver",
    priceNote: "/mo · rate agreed with you",
    drivers: "Unlimited drivers & stations",
    features: [
      "Unlimited depots on one account, each with its own board",
      "Everything in Professional",
      "You only pay for drivers actually on the road",
      "White-glove setup & data import, dedicated contact",
    ],
    dark: true,
    trial: "Billed on a minimum of 100 drivers a month",
  },
];

const NETWORKS = ["Amazon", "Evri", "UPS", "FedEx", "DX", "ArrowXL", "Parcelforce"];

/**
 * Per-plan lead capture. Kept from the previous pricing section: `source` tells
 * the admin list which tier someone was looking at when they signed up, which is
 * the only signal distinguishing a Starter enquiry from an Enterprise one.
 */
function PlanEmailCapture({ planName, dark }: { planName: string; dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `Pricing – ${planName}` }),
      });
      if (!res.ok) throw new Error("Something went wrong");
      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`mt-4 flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[13px] font-semibold ${
          dark
            ? "bg-emerald-500/15 border border-emerald-500/25 text-emerald-300"
            : "bg-mint-soft border border-mint/25 text-mint-ink"
        }`}
      >
        <Check size={15} className="shrink-0" />
        Got it — we'll be in touch shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <label className="sr-only" htmlFor={`plan-email-${planName}`}>
        Your email
      </label>
      <input
        id={`plan-email-${planName}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@yourdsp.co.uk"
        className={`w-full rounded-[10px] px-3.5 py-2.5 text-[14px] outline-none transition-colors ${
          dark
            ? "bg-white/10 border border-white/15 text-white placeholder:text-white/45 focus:border-brand-light"
            : "bg-background border border-border text-ink placeholder:text-muted-foreground focus:border-brand"
        }`}
      />
      {error && <p className={`text-[12.5px] ${dark ? "text-red-300" : "text-destructive"}`}>{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className={`inline-flex items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 text-[14.5px] font-bold transition-colors disabled:opacity-50 ${
          dark
            ? "bg-brand text-white hover:bg-brand-dark"
            : "bg-brand text-white hover:bg-brand-dark"
        }`}
      >
        {loading ? "Sending…" : <>Start free trial <ArrowRight size={15} /></>}
      </button>
    </form>
  );
}

export default function PricingSection() {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section id="pricing" className="bg-background py-16 sm:py-20 lg:py-[82px]">
      <div ref={ref} className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h2 className="mt-3.5 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.06] text-ink text-balance">
            Flat to 100 drivers.
            <br />
            Per driver above that.
          </h2>
          <p className="mt-3.5 text-[15.5px] sm:text-[17px] text-muted-foreground leading-[1.6] max-w-[62ch]">
            No setup fee, no per-seat charge for your office staff, and no contract to sign before
            you've tried it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3.5 mt-8 items-stretch">
          {PLANS.map((p, i) => (
            <div
              key={p.name}
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`relative rounded-2xl p-6 flex flex-col transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } ${
                p.dark
                  ? "bg-deep text-white border border-deep shadow-lg"
                  : p.featured
                    ? "bg-card border border-brand shadow-lg"
                    : "bg-card border border-border shadow-sm"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-[11px] left-6 bg-brand text-white text-[10.5px] font-extrabold tracking-[0.06em] rounded-full px-3 py-1">
                  MOST DSPs START HERE
                </span>
              )}

              <div className="font-display text-[15px] font-extrabold">{p.name}</div>
              <div
                className={`font-display font-black tracking-[-0.04em] mt-2 ${
                  p.dark ? "text-[30px]" : "text-[34px]"
                }`}
              >
                {p.price}{" "}
                <small
                  className={`font-sans font-semibold tracking-normal ${
                    p.dark ? "block text-[13.5px] text-[#9DB1E4] mt-1" : "text-[13.5px] text-muted-foreground"
                  }`}
                >
                  {p.priceNote}
                </small>
              </div>
              <div
                className={`text-[12.5px] font-semibold mt-1.5 ${
                  p.dark ? "text-[#9DBBFF]" : "text-brand-dark"
                }`}
              >
                {p.drivers}
              </div>

              <ul className="grid gap-2 mt-4 text-[13.5px]">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check
                      size={14}
                      strokeWidth={3}
                      className={`shrink-0 mt-[3px] ${p.dark ? "text-[#5BD6A4]" : "text-mint"}`}
                    />
                    <span className={`flex-1 ${p.dark ? "text-[#DCE4F9]" : "text-ink/85"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <PlanEmailCapture planName={p.name} dark={p.dark} />

              <div
                className={`mt-auto pt-4 text-[12px] ${
                  p.dark ? "text-[#9DB1E4]" : "text-muted-foreground"
                }`}
              >
                {p.trial}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 items-center text-[13px] text-muted-foreground">
          Runs alongside the networks you already serve:
          {NETWORKS.map((n) => (
            <span
              key={n}
              className="bg-card border border-border rounded-full px-3 py-1 font-semibold text-ink/80"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
