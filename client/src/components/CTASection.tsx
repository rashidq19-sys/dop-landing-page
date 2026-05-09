import { useState } from "react";
import { Check } from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [dsp, setDsp] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !dsp) return;
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Bottom CTA", metadata: { dspName: dsp } }),
      });
      if (!res.ok) throw new Error("Something went wrong");
      setSubmitted(true);
      setEmail("");
      setDsp("");
    } catch {
      setError("Something went wrong — please try again.");
    }
  };

  return (
    <section id="book-demo" className="bg-[#111113] py-[70px] sm:py-[110px] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.27), transparent 60%)" }} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 sm:gap-[52px] items-center">
        {/* Left: headline */}
        <div>
          <h2 className="font-sans text-[36px] sm:text-[56px] lg:text-[76px] font-extrabold tracking-[-0.04em] leading-[0.98] text-white">
            The platform<br />Amazon forgot<br />
            <span className="text-brand-light">to build.</span>
          </h2>
          <p className="text-[17px] text-[#94A3B8] mt-5.5 max-w-[500px] leading-[1.55]">
            20 minutes with us and you'll see your DSP on DSPOps. We'll import drivers, rota and Cortex data live.
          </p>
        </div>

        {/* Right: form */}
        <div className="bg-white/4 border border-white/10 rounded-[16px] p-5 sm:p-8 backdrop-blur-[10px] text-white">
          <div className="text-[11px] text-brand-light uppercase tracking-[0.1em]">BOOK A 20-MIN DEMO</div>
          <div className="text-[18px] sm:text-[22px] font-bold mt-1 tracking-[-0.01em]">See your DSP live on DSPOps</div>
          {submitted && (
            <div className="flex items-center gap-2 px-4 py-3 mb-4 bg-emerald-500/15 border border-emerald-500/25 rounded-lg text-emerald-300 text-[13px] font-semibold">
              <Check size={15} className="shrink-0" />
              Got it — someone from the team will reach out shortly.
            </div>
          )}
          {error && (
            <div className="px-4 py-3 mb-4 bg-red-500/15 border border-red-500/25 rounded-lg text-red-300 text-[13px]">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mt-5">
            <input
              type="email" placeholder="Email" required value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-[14px] py-[13px] bg-white border-0 rounded-lg text-[14px] text-[#111113] placeholder:text-[#6C6C72] outline-none focus:ring-2 focus:ring-brand"
            />
            <input
              type="text" placeholder="DSP name" required value={dsp}
              onChange={e => setDsp(e.target.value)}
              className="px-[14px] py-[13px] bg-white border-0 rounded-lg text-[14px] text-[#111113] placeholder:text-[#6C6C72] outline-none focus:ring-2 focus:ring-brand"
            />
            <button type="submit"
              className="px-4 py-[13px] bg-brand text-white rounded-lg text-[14px] font-bold hover:bg-brand-dark transition-colors">
              Book demo →
            </button>
          </form>
          <div className="text-[12px] text-white/55 mt-3.5">No credit card · Setup in 20 min · GDPR compliant</div>
        </div>
      </div>
    </section>
  );
}
