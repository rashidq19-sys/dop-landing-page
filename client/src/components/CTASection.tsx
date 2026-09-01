import { useState, useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Check, ArrowRight, Loader2, Mail, PoundSterling, CalendarCheck } from "lucide-react";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import { LOGO_MARK } from "@/lib/brandAssets";

type FormStep = "email" | "details" | "calendar" | "done";

// The Cal.com event type behind the calendar. This is the last part of the
// public booking URL (cal.com/<user>/<event>) — change it here if the event
// type is ever renamed in Cal.com.
const CAL_LINK = "rashid-qanooni-j1pvld/30min";

// Cal.com reports the slot as an ISO string. Show it back in the visitor's own
// timezone — the one they picked it in — rather than forcing UK time.
function formatSlot(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "Your slot is confirmed";
  return date.toLocaleString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CTASection() {
  const [step, setStep] = useState<FormStep>("email");
  const [email, setEmail] = useState("");
  const [dspName, setDspName] = useState("");
  const [phone, setPhone] = useState("");
  const [recordId, setRecordId] = useState<number | null>(null);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cal.com fires its booking event from inside the iframe, long after this
  // effect was set up, so the callback must not close over stale state. Refs
  // hold the values it needs; bookedRef also stops the legacy and V2 events
  // both being handled for the same booking.
  const recordIdRef = useRef<number | null>(null);
  const bookedRef = useRef(false);
  recordIdRef.current = recordId;

  useEffect(() => {
    if (step !== "calendar") return;
    let cancelled = false;

    const handleBooking = (startTime: string | null, uid: string | null) => {
      if (bookedRef.current) return;
      bookedRef.current = true;
      setBookedSlot(startTime);
      setStep("done");

      const id = recordIdRef.current;
      if (!id) return;
      // Cal.com has already made the booking and sent the invite. This is
      // only so the lead record knows, so a failure here must stay silent.
      fetch(`/api/waitlist/${id}/demo-booked`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startTime, uid }),
      }).catch((err) => console.error("Could not record the demo booking:", err));
    };

    (async () => {
      try {
        const cal = await getCalApi();
        if (cancelled) return;
        cal("on", {
          action: "bookingSuccessfulV2",
          callback: (e: any) =>
            handleBooking(e?.detail?.data?.startTime ?? null, e?.detail?.data?.uid ?? null),
        });
        cal("on", {
          action: "bookingSuccessful",
          callback: (e: any) => handleBooking(e?.detail?.data?.date ?? null, null),
        });
      } catch (err) {
        // If the embed script cannot load, the visitor still sees the
        // calendar area and the "call me instead" escape hatch.
        console.error("Cal.com embed failed to initialise:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !dspName) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, dsp_name: dspName, source: "Bottom CTA" }),
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
    if (!phone) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/waitlist/${recordId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dsp_name: dspName, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStep("calendar");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-[10px] border border-border bg-background px-3.5 py-3 text-[16px] text-ink placeholder:text-muted-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/25";

  return (
    <section
      id="book-demo"
      className="bg-linear-to-b from-deep to-deep-alt text-white py-16 sm:py-20 lg:py-[82px]"
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <SectionEyebrow onDark>Book a demo</SectionEyebrow>
        <h2 className="mt-3.5 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.06] text-balance">
          Twenty minutes.
          <br />
          Your depot on the screen.
        </h2>
        <p className="mt-3.5 text-[15.5px] sm:text-[17px] text-[#AAB8DC] leading-[1.6] max-w-[62ch]">
          Not a canned walkthrough — we import your drivers, your rota and your Amazon data on the
          call, so what you're looking at is your own operation. You'd be talking to the person who
          built it, not a sales team.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-9 items-start">
          {/* ── Who's behind it ───────────────────────────────── */}
          <div>
            <div className="flex gap-4 bg-white/5 border border-white/12 rounded-2xl p-5">
              <img
                src={LOGO_MARK}
                alt=""
                aria-hidden="true"
                className="w-[52px] h-[52px] rounded-[14px] shrink-0"
              />
              <div className="min-w-0">
                <strong className="block text-[16px]">Built by a former on-site manager</strong>
                <span className="block text-[13px] text-[#9DB1E4]">
                  Independent · UK-built · not affiliated with Amazon
                </span>
                <p className="mt-2.5 text-[14px] text-[#C7D3F2] leading-[1.55]">
                  DSPOps was written on the depot floor by someone who ran an Amazon delivery
                  partner's operation day to day — which is why it looks like the job rather than
                  like software.
                </p>
              </div>
            </div>

            <div className="grid gap-2.5 mt-4">
              <a
                href="mailto:support@dspops.app"
                className="flex items-center gap-3 border border-white/12 rounded-xl px-4 py-3.5 text-[14px] font-semibold hover:bg-white/8 transition-colors"
              >
                <span className="w-[34px] h-[34px] rounded-[9px] bg-brand/25 text-[#9DBBFF] grid place-items-center shrink-0">
                  <Mail size={17} />
                </span>
                <span>
                  support@dspops.app
                  <small className="block font-normal text-[12px] text-[#9DB1E4] mt-0.5">
                    Goes straight to the person who built it
                  </small>
                </span>
              </a>
              <a
                href="#pricing"
                className="flex items-center gap-3 border border-white/12 rounded-xl px-4 py-3.5 text-[14px] font-semibold hover:bg-white/8 transition-colors"
              >
                <span className="w-[34px] h-[34px] rounded-[9px] bg-white/10 text-[#C7D3F2] grid place-items-center shrink-0">
                  <PoundSterling size={17} />
                </span>
                <span>
                  Start the 7-day free trial
                  <small className="block font-normal text-[12px] text-[#9DB1E4] mt-0.5">
                    No card, cancel any time
                  </small>
                </span>
              </a>
            </div>
          </div>

          {/* ── The demo form ─────────────────────────────────── */}
          <div
            className={`bg-card text-ink rounded-2xl p-6 sm:p-7 shadow-[0_30px_70px_-25px_rgba(11,18,32,0.5)] ${
              step === "calendar" ? "lg:col-span-2" : ""
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-dark">
              Book a 20-minute demo
            </div>
            <h3 className="font-display text-[22px] font-extrabold tracking-[-0.025em] mt-1.5">
              See your DSP live on DSPOps
            </h3>
            <p className="text-[13px] text-muted-foreground mt-1 mb-5">
              We'll import your drivers, rota and Amazon data on the call, so you're looking at your
              own operation — not a canned demo.
            </p>

            {step === "done" && (
              <div className="rounded-lg bg-mint-soft border border-mint/25 px-4 py-3.5 text-[13px] text-mint-ink">
                <div className="flex items-center gap-2 font-semibold">
                  {bookedSlot ? (
                    <CalendarCheck size={15} className="shrink-0" />
                  ) : (
                    <Check size={15} className="shrink-0" />
                  )}
                  {bookedSlot ? "You're booked in." : "Got it — we'll reach out shortly to book you in."}
                </div>
                {bookedSlot && (
                  <p className="mt-1.5 font-normal leading-[1.55]">
                    {formatSlot(bookedSlot)}. The calendar invite and joining link are on their way
                    to <strong className="font-semibold">{email}</strong>.
                  </p>
                )}
              </div>
            )}

            {step === "email" && (
              <>
                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
                  <div>
                    <label htmlFor="cta-email" className="block text-[12px] font-bold uppercase tracking-[0.05em] text-muted-foreground mb-1.5">
                      Your email
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourdsp.co.uk"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-dsp" className="block text-[12px] font-bold uppercase tracking-[0.05em] text-muted-foreground mb-1.5">
                      DSP name
                    </label>
                    <input
                      id="cta-dsp"
                      type="text"
                      required
                      value={dspName}
                      onChange={(e) => setDspName(e.target.value)}
                      placeholder="e.g. Aurora Logistics Ltd"
                      className={inputClass}
                    />
                  </div>
                  {error && <p className="text-[13px] text-destructive">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand px-4 py-3 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <>Book demo <ArrowRight size={15} /></>}
                  </button>
                </form>
                <p className="mt-3 text-[12px] text-muted-foreground">
                  No credit card · 7-day free trial · GDPR compliant
                </p>
              </>
            )}

            {step === "details" && (
              <>
                <div className="flex items-center gap-2 mb-4 rounded-lg bg-mint-soft border border-mint/25 px-4 py-2.5 text-[13px] font-semibold text-mint-ink">
                  <Check size={15} className="shrink-0" />
                  Almost there — one last detail.
                </div>
                <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-3">
                  <div>
                    <label htmlFor="cta-phone" className="block text-[12px] font-bold uppercase tracking-[0.05em] text-muted-foreground mb-1.5">
                      Phone number
                    </label>
                    <input
                      id="cta-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07…"
                      className={inputClass}
                    />
                  </div>
                  {error && <p className="text-[13px] text-destructive">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand px-4 py-3 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <>Complete booking <ArrowRight size={15} /></>}
                  </button>
                </form>
              </>
            )}

            {step === "calendar" && (
              <>
                <div className="flex items-center gap-2 mb-4 rounded-lg bg-mint-soft border border-mint/25 px-4 py-2.5 text-[13px] font-semibold text-mint-ink">
                  <Check size={15} className="shrink-0" />
                  Got your details — now pick a time that suits you.
                </div>
                <div className="-mx-1 rounded-xl border border-border overflow-hidden">
                  <Cal
                    calLink={CAL_LINK}
                    // Cal sizes its own iframe to the content. Left to a narrow
                    // column it stacks the month view above the slot list and
                    // runs to ~1500px, so the card goes full width for this
                    // step and the calendar is left to find its own height.
                    style={{ width: "100%" }}
                    config={{
                      email,
                      // The form asks for the DSP, not the person, so leave the
                      // name for them to fill in — it is the one useful detail
                      // this form never captures.
                      notes: `DSP: ${dspName}\nPhone: ${phone}`,
                      theme: "light",
                      layout: "month_view",
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep("done")}
                  className="mt-3 text-[13px] text-muted-foreground underline underline-offset-2 hover:text-ink transition-colors"
                >
                  I'd rather you just called me
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
