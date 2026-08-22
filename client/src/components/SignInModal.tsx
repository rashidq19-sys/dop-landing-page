import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Check } from "lucide-react";
import {
  useIsPhoneViewport,
  useVisualViewportRect,
  useBodyScrollLock,
} from "@/hooks/useVisualViewportPanel";

interface Props {
  onClose: () => void;
}

export default function SignInModal({ onClose }: Props) {
  const [email, setEmail] = useState("");
  const [dsp, setDsp] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // The modal only exists while it is open, so being mounted is the signal.
  const isPhone = useIsPhoneViewport();
  const viewportRect = useVisualViewportRect(isPhone);
  useBodyScrollLock(isPhone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !dsp) return;
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Sign In", metadata: { dspName: dsp } }),
      });
      if (!res.ok) throw new Error("Something went wrong");
      setSubmitted(true);
    } catch {
      setError("Something went wrong — please try again.");
    }
  };

  // On a phone the overlay is pinned to the visual viewport instead of
  // inset-0, so the card centres inside the area the keyboard is NOT covering.
  // As inset-0 the "Sign in" button sat behind the keyboard — both fields were
  // reachable, and then there was nothing to press.
  //
  // The card uses m-auto rather than the parent's items-center: inside an
  // overflow-y-auto parent, a centred flex item taller than the container gets
  // its top clipped with no way to scroll back to it. Auto margins centre it
  // and keep every edge reachable.
  //
  // The close button gained padding rather than a bigger icon — the 20px glyph
  // stays where it was, but the tap area becomes 36px.
  return createPortal(
    <div
      className={`fixed z-[100] flex justify-center overflow-y-auto px-4 py-6 ${
        viewportRect ? "" : "inset-0"
      }`}
      style={{
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        ...(viewportRect ?? {}),
      }}
      onClick={onClose}
    >
      <div
        className="relative m-auto bg-white rounded-[16px] w-full max-w-[420px] p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-[#6C6C72] hover:text-[#111113] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

          <div className="text-[22px] font-bold text-[#111113] tracking-[-0.01em]">Sign in to DSPOps</div>
          <p className="text-[14px] text-[#6C6C72] mt-1 mb-5">Enter your details and we'll be in touch.</p>
          {submitted && (
            <div className="flex items-center gap-2 px-4 py-3 mb-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-[13px] font-semibold">
              <Check size={15} className="shrink-0" />
              Got it — someone from the team will reach out shortly.
            </div>
          )}
          {error && (
            <div className="px-4 py-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-[13px]">
              {error}
            </div>
          )}
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
      </div>
    </div>,
    document.body
  );
}
