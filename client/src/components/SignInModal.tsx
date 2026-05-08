import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function SignInModal({ onClose }: Props) {
  const [email, setEmail] = useState("");
  const [dsp, setDsp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && dsp) {
      fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Sign In", metadata: { dspName: dsp } }),
      });
      setSubmitted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[16px] w-full max-w-[420px] p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6C6C72] hover:text-[#111113] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-[40px] mb-3">✓</div>
            <div className="text-[20px] font-bold text-[#111113] tracking-[-0.01em]">Got it!</div>
            <p className="text-[15px] text-[#6C6C72] mt-2 leading-[1.55]">
              Someone will contact you soon.
            </p>
          </div>
        ) : (
          <>
            <div className="text-[22px] font-bold text-[#111113] tracking-[-0.01em]">Sign in to DSPOps</div>
            <p className="text-[14px] text-[#6C6C72] mt-1 mb-5">Enter your details and we'll be in touch.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              <input
                type="email" placeholder="Email" required value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-[14px] py-[13px] bg-[#F5F5F3] border border-[#E5E5E3] rounded-lg text-[14px] text-[#111113] placeholder:text-[#6C6C72] outline-none focus:ring-2 focus:ring-brand"
              />
              <input
                type="text" placeholder="DSP name" required value={dsp}
                onChange={e => setDsp(e.target.value)}
                className="px-[14px] py-[13px] bg-[#F5F5F3] border border-[#E5E5E3] rounded-lg text-[14px] text-[#111113] placeholder:text-[#6C6C72] outline-none focus:ring-2 focus:ring-brand"
              />
              <button type="submit"
                className="px-4 py-[13px] bg-brand text-white rounded-lg text-[14px] font-bold hover:bg-brand-dark transition-colors mt-1">
                Sign in →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
