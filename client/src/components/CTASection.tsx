import { useState, useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Check, ArrowRight, Loader2, CalendarCheck } from "lucide-react";
import SectionEyebrow from "@/components/home/SectionEyebrow";
import SplitWords from "@/components/motion/SplitWords";
import { rise, riseWords, useMotion } from "@/lib/motion";

type FormStep = "email" | "details" | "calendar" | "done";

const DEMO_STEPS = [
  {
    title: "Request a walkthrough",
    body: "Tell us how to reach you and the name of your DSP.",
  },
  {
    title: "Explore a sample depot",
    body: "See availability, check-in and dispatch. No driver data needed.",
  },
  {
    title: "Choose your next step",
    body: "If it fits, discuss a trial and the first workflow you want to use.",
  },
];

// The Cal.com event type behind the calendar. This is the last part of the
// public booking URL (cal.com/<user>/<event>) — change it here if the event
// type is ever renamed in Cal.com.
const CAL_LINK = "dspops/30min";

// The fixed answers to "Where did you hear about us?" on the details step. The
// question is optional and self-reported, so the list stays short — anything it
// does not cover goes in the free-text box behind "Other".
const HEARD_ABOUT_OPTIONS = [
  "Google search",
  "Word of mouth / another DSP",
  "Facebook or LinkedIn",
  "Amazon contact",
  "Event or conference",
  "Other",
];

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
  const [heardAbout, setHeardAbout] = useState("");
  const [heardAboutOther, setHeardAboutOther] = useState("");
  const [recordId, setRecordId] = useState<number | null>(null);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scope = useRef<HTMLElement>(null);
  useMotion(scope, () => {
    riseWords(scope.current!.querySelector("h2"));
    rise("[data-rise]");
  });

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

  // What they actually answered: the typed text when they picked "Other",
  // the chosen option otherwise, and an empty string when they skipped it.
  const heardAboutAnswer =
    heardAbout === "Other" ? heardAboutOther.trim() : heardAbout;

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setError("");
    try {
      // The question is optional, so send the key only when they answered.
      const res = await fetch(`/api/waitlist/${recordId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dsp_name: dspName,
          phone,
          ...(heardAboutAnswer ? { heard_about: heardAboutAnswer } : {}),
        }),
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
      ref={scope}
      id="book-demo"
      className="bg-linear-to-b from-deep to-deep-alt text-white py-16 sm:py-20 lg:py-[96px]"
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <SectionEyebrow onDark>Book a demo</SectionEyebrow>
        <SplitWords
          mode="rise"
          lines={[["See the difference."], ["Bring your questions."]]}
          className="mt-3.5 font-display text-[34px] sm:text-[48px] lg:text-[56px] font-black tracking-[-0.045em] leading-[1.03] text-balance"
        />
        <p data-rise className="mt-4 text-[15.5px] sm:text-[17px] text-[#AAB8DC] leading-[1.6] max-w-[62ch]">
          You shouldn't need to organise a spreadsheet just to decide whether a tool is useful.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-9 items-start">
          {/* ── What happens next ─────────────────────────────── */}
          <ol className="grid gap-7">
            {DEMO_STEPS.map((s, i) => (
              <li key={s.title} data-rise className="flex gap-4">
                <span className="w-[34px] h-[34px] rounded-full bg-brand/25 text-[#9DBBFF] grid place-items-center shrink-0 text-[14px] font-bold">
                  {i + 1}
                </span>
                <div className="min-w-0 pt-1">
                  <strong className="block font-display text-[17px] font-extrabold">{s.title}</strong>
                  <p className="mt-1 text-[14.5px] text-[#C7D3F2] leading-[1.55]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* ── The demo form ─────────────────────────────────── */}
          <div
            data-rise
            className={`bg-card text-ink rounded-2xl p-6 sm:p-7 shadow-[0_30px_70px_-25px_rgba(11,18,32,0.5)] ${
              step === "calendar" ? "lg:col-span-2" : ""
            }`}
          >
            <h3 className="font-display text-[22px] font-extrabold tracking-[-0.025em]">
              Let’s look at your daily workflow.
            </h3>
            <p className="text-[13px] text-muted-foreground mt-1 mb-5">
              Request a 20-minute demo, then pick a time that suits you.
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
                      Your work email
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourcompany.co.uk"
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
                      placeholder="Your DSP name"
                      className={inputClass}
                    />
                  </div>
                  {error && <p className="text-[13px] text-destructive">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand px-4 py-3 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <>Request my demo <ArrowRight size={15} /></>}
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
                  <div>
                    <label htmlFor="cta-heard" className="block text-[12px] font-bold uppercase tracking-[0.05em] text-muted-foreground mb-1.5">
                      Where did you hear about us?{" "}
                      <span className="normal-case tracking-normal font-semibold text-muted-foreground/70">(optional)</span>
                    </label>
                    <select
                      id="cta-heard"
                      value={heardAbout}
                      onChange={(e) => setHeardAbout(e.target.value)}
                      className={`${inputClass} ${heardAbout ? "" : "text-muted-foreground"}`}
                    >
                      <option value="">Please choose…</option>
                      {HEARD_ABOUT_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  {heardAbout === "Other" && (
                    <div>
                      <label htmlFor="cta-heard-other" className="sr-only">
                        Tell us where you heard about us
                      </label>
                      <input
                        id="cta-heard-other"
                        type="text"
                        value={heardAboutOther}
                        onChange={(e) => setHeardAboutOther(e.target.value)}
                        placeholder="Tell us where…"
                        maxLength={200}
                        className={inputClass}
                      />
                    </div>
                  )}
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
                  Got your details — pick a date, then tap a time to continue.
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
                      notes: `DSP: ${dspName}\nPhone: ${phone}${
                        heardAboutAnswer
                          ? `\nHeard about us: ${heardAboutAnswer}`
                          : ""
                      }`,
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
