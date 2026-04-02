import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

interface EmailCaptureInlineProps {
  variant?: "light" | "dark";
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

type FormStep = "email" | "details" | "done";

export default function EmailCaptureInline({
  variant = "light",
  buttonText = "Get Early Access",
  placeholder = "Enter your email",
  className = "",
}: EmailCaptureInlineProps) {
  const [step, setStep] = useState<FormStep>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [recordId, setRecordId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const isDark = variant === "dark";

  const inputClass = `w-full px-5 py-3.5 rounded-lg border transition-colors focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand ${
    isDark
      ? "bg-white/10 border-white/20 text-white placeholder:text-white/40"
      : "bg-white border-border text-navy placeholder:text-muted-foreground"
  }`;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setRecordId(data.id);
      setStep("details");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/waitlist/${recordId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSubmittedName(name);
      setStep("done");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Final success
  if (step === "done") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div
          className={`flex items-center gap-2 px-5 py-3.5 rounded-lg ${
            isDark ? "bg-green-500/20 text-green-300" : "bg-green-50 text-green-700"
          }`}
        >
          <Check size={20} />
          <span className="font-semibold">
            Thanks, {submittedName}! We'll be in touch.
          </span>
        </div>
      </div>
    );
  }

  // Step 2: Name + Phone
  if (step === "details") {
    return (
      <div className={className}>
        <div
          className={`flex items-center gap-2 mb-4 px-4 py-2.5 rounded-lg ${
            isDark ? "bg-green-500/20 text-green-300" : "bg-green-50 text-green-700"
          }`}
        >
          <Check size={18} />
          <span className="font-semibold text-sm">You're on the list! Complete your profile below.</span>
        </div>
        <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className={`flex-1 ${inputClass}`}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              required
              className={`flex-1 ${inputClass}`}
            />
          </div>
          {error && (
            <p className={`text-sm ${isDark ? "text-red-300" : "text-red-600"}`}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_4px_14px_0_rgba(59,130,246,0.35)] hover:shadow-[0_6px_20px_0_rgba(59,130,246,0.45)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Complete Profile"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    );
  }

  // Step 1: Email
  return (
    <form
      onSubmit={handleEmailSubmit}
      className={`flex flex-col sm:flex-row items-center gap-3 ${className}`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className={`flex-1 sm:w-auto ${inputClass}`}
      />
      {error && (
        <p className={`text-sm w-full ${isDark ? "text-red-300" : "text-red-600"}`}>{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_4px_14px_0_rgba(59,130,246,0.35)] hover:shadow-[0_6px_20px_0_rgba(59,130,246,0.45)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : buttonText}
        {!loading && <ArrowRight size={18} />}
      </button>
    </form>
  );
}
