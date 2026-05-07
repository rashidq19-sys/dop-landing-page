import { useState } from "react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [dsp, setDsp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && dsp) {
      fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Bottom CTA", metadata: { dspName: dsp } }),
      });
      setEmail("");
      setDsp("");
    }
  };

  return (
    <section id="book-demo" className="bg-[#111113] py-[110px] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.27), transparent 60%)" }} />
      <div className="max-w-[1280px] mx-auto px-8 relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[52px] items-center">
        {/* Left: headline */}
        <div>
          <h2 className="font-sans text-[56px] lg:text-[76px] font-extrabold tracking-[-0.04em] leading-[0.98] text-white">
            Your Monday<br />starts at 06:42.<br />
            <span className="text-brand-light">It doesn't have to.</span>
          </h2>
          <p className="text-[17px] text-[#94A3B8] mt-5.5 max-w-[500px] leading-[1.55]">
            20 minutes with us and you'll see your DSP on DSPOps. We'll import drivers, rota and Cortex data live.
          </p>
        </div>

        {/* Right: form */}
        <div className="bg-white/4 border border-white/10 rounded-[16px] p-8 backdrop-blur-[10px] text-white">
          <div className="text-[11px] text-brand-light uppercase tracking-[0.1em]">BOOK A 20-MIN DEMO</div>
          <div className="text-[22px] font-bold mt-1 tracking-[-0.01em]">See your DSP live on DSPOps</div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mt-5">
            <input
              type="email" placeholder="Work email" required value={email}
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
