import { Fragment, useRef } from "react";
import { gsap, lightUp, useMotion } from "@/lib/motion";
import SplitWords from "@/components/motion/SplitWords";
import SectionEyebrow from "@/components/home/SectionEyebrow";

type Module = {
  title: string;
  body: string;
  win: string;
  img: string;
  alt: string;
  /** Screens that must be seen whole float centred; the rest bleed off the panel edge. */
  contain?: boolean;
};

const MODULES: Module[] = [
  {
    title: "Rota, availability & dispatch",
    body: "Drivers mark themselves ON or OFF for every day in their own app, so the week fills itself and shortfalls show up days early. On the day, Smart Assign fills every route from that availability, you adjust, then one tap publishes waves, routes and vans to every driver's phone.",
    win: "~13 hrs a week back",
    img: "/images/product/deployment-hd.webp",
    alt: "Deployment board showing a wave with drivers, route codes and vans",
  },
  {
    title: "Driver performance",
    body: "Every metric Amazon scores your drivers on, weekly, per driver: DCR, DNR DPMO, POD, contact compliance, CDF and customer escalations — with worst-offender lists per metric and a league table your drivers can see too.",
    win: "Better network scores",
    img: "/images/product/performance-hd.webp",
    alt: "Worst-offender lists for DSC DPMO, delivery completion rate and photo-on-delivery compliance",
  },
  {
    title: "Driver invoicing & pay",
    body: "Upload the week's report and DSPOps generates every driver's invoice — day rates, same-day rates, bonuses and deductions — then sends it to each driver in the app and gives you a clean export for your accountant.",
    win: "~6 hrs a week back",
    img: "/images/product/invoicing.webp",
    alt: "Weekly driver invoice run and a driver's invoice on a phone",
    contain: true,
  },
  {
    title: "Van inspections",
    body: "Daily van checks with photos and video from the driver's phone, guided angle by angle. See instantly who has and hasn't submitted, and keep a clean damage trail for every vehicle.",
    win: "Replaces a £200+/mo app",
    img: "/images/product/van-checks.webp",
    alt: "Daily van inspection with photo capture and damage reporting",
  },
  {
    title: "Multi-station, one account",
    body: "Every depot is a station inside the same account, each with its own rota, deployment board, drivers and vans. Switch between them from the top of the screen — no separate logins, no separate spreadsheets.",
    win: "One bill, every depot",
    img: "/images/product/stations.webp",
    alt: "Station switcher listing three depots",
    contain: true,
  },
  {
    title: "Announcements & messaging",
    body: "Send a notice to every driver, one station or a single person — it lands as a push notification in their app, and you see who has actually read it. One-to-one chat is built in, so operational messages stop living in personal WhatsApp.",
    win: "Proof it was read",
    img: "/images/product/announcements.webp",
    alt: "Announcements list with per-driver read tracking",
    contain: true,
  },
  {
    title: "Same-day & micromobility",
    body: "Same-day drivers, wave times, vans and rates are kept completely separate from your standard routes. E-cargo bike riders get their own blocks, availability, pay and compliance on the same rota, without being forced into a driver workflow.",
    win: "Every service type, one rota",
    img: "/images/product/micromobility-rota.webp",
    alt: "Rota grid showing van drivers and e-cargo bike riders side by side, riders answering morning and afternoon separately",
  },
];

export default function PlatformSection() {
  const scope = useRef<HTMLElement>(null);

  useMotion(scope, () => {
    lightUp(scope.current!.querySelector("[data-lit-heading]"));

    const markers = gsap.utils.toArray<HTMLElement>("[data-stack-marker]");
    const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");

    cards.forEach((card, i) => {
      const marker = markers[i];

      // The screenshot opens from a smaller rounded window as the card comes up.
      gsap.fromTo(
        card.querySelector("[data-shot]"),
        { clipPath: "inset(6% 14% 6% 14% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: marker, start: "top 95%", end: "top 40%", scrub: true },
        },
      );
      gsap.fromTo(
        card.querySelector("[data-shot] img"),
        { scale: 1.18 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: marker, start: "top bottom", end: "top top", scrub: true },
        },
      );

      // As the next card slides over this one, this one sinks back. It starts
      // the moment this card sticks, so it never shrinks while still moving.
      const next = cards[i + 1];
      if (!next) return;
      const stickyTop = (el: HTMLElement) => parseFloat(getComputedStyle(el).top) || 0;
      const nextTop = () => stickyTop(next);
      const gap = () => markers[i + 1].offsetTop - marker.offsetTop;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: markers[i + 1],
            start: () => `top ${stickyTop(card) + gap()}px`,
            end: () => `top ${nextTop()}px`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(card.querySelector("[data-card-inner]"), { scale: 1 }, { scale: 0.94, ease: "none" }, 0)
        .fromTo(card.querySelector("[data-card-shade]"), { opacity: 0 }, { opacity: 0.4, ease: "none" }, 0);
    });
  });

  return (
    <section
      ref={scope}
      id="platform"
      className="bg-background py-16 sm:py-20 lg:py-[96px] border-b border-border"
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <SectionEyebrow>The platform</SectionEyebrow>
        <SplitWords
          data-lit-heading
          lines={[["Every daily job, one login."]]}
          className="mt-3.5 font-display text-[36px] sm:text-[50px] lg:text-[60px] font-black tracking-[-0.045em] leading-[1.02] text-ink text-balance"
        />
        <p className="mt-4 text-[15.5px] sm:text-[17px] text-muted-foreground leading-[1.6] max-w-[62ch]">
          Seven modules built for how a UK Amazon DSP actually runs.
        </p>

        {/* Stacking cards: every card is sticky inside this one container, each a
            step lower than the last, so they pile up as you scroll. Markers sit in
            normal flow at each card's natural position and drive the scroll timing. */}
        <div className="relative mt-10 sm:mt-12 [--stack-top:84px] [--stack-step:8px] sm:[--stack-step:14px]">
          {MODULES.map((m, i) => (
            <Fragment key={m.title}>
              <div data-stack-marker aria-hidden="true" />
              <article
                data-stack-card
                style={{ "--i": i } as React.CSSProperties}
                className="motion-safe:sticky top-[calc(var(--stack-top)+var(--i)*var(--stack-step))] mb-6 sm:mb-12"
              >
                <div
                  data-card-inner
                  className="relative origin-top bg-card border border-border rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-[0_24px_60px_-28px_rgba(10,18,53,0.35)] flex flex-col lg:grid lg:grid-cols-[0.92fr_1.08fr] sm:h-[min(560px,calc(100svh-240px))] sm:min-h-[420px]"
                >
                  <div className="relative flex-none h-[min(230px,30svh)] sm:h-auto sm:flex-1 sm:min-h-[150px] lg:order-2 overflow-hidden">
                    {/* The whole screen floats on a soft panel rather than being cropped:
                        the screenshots range from portrait phones to wide dashboards. */}
                    <span
                      data-shot
                      className={`absolute inset-0 overflow-hidden bg-[#EEF3FA] ${
                        m.contain
                          ? "flex items-center justify-center p-4 sm:p-7 lg:p-9"
                          : "flex items-center justify-center p-4 sm:block sm:p-0"
                      }`}
                    >
                      <img
                        src={m.img}
                        alt={m.alt}
                        loading="lazy"
                        className={`block bg-card border border-[#dbe3ef] shadow-[0_18px_40px_-18px_rgba(10,18,53,0.35)] ${
                          m.contain
                            ? "max-w-full max-h-full w-auto h-auto rounded-[10px] sm:rounded-[14px]"
                            : // Phones show the whole screen; wider layouts let it bleed off the edge.
                              "max-w-full max-h-full w-auto h-auto rounded-[10px] sm:absolute sm:left-9 sm:top-9 sm:h-[118%] sm:max-w-none sm:max-h-none sm:rounded-none sm:rounded-tl-[14px]"
                        }`}
                      />
                    </span>
                  </div>

                  <div className="p-5 sm:p-8 lg:p-11 flex flex-col lg:justify-center shrink-0">
                    <span className="font-display text-[13px] sm:text-[14px] font-extrabold tracking-[0.06em] text-brand tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1.5 sm:mt-3 font-display text-[23px] sm:text-[30px] lg:text-[36px] font-black tracking-[-0.04em] leading-[1.05] text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-2 sm:mt-4 text-[14px] sm:text-[16px] text-muted-foreground leading-[1.55] max-w-[46ch]">
                      {m.body}
                    </p>
                    <span className="mt-3.5 sm:mt-6 self-start text-[12.5px] sm:text-[13.5px] font-bold text-mint-ink bg-mint-soft rounded-full px-3 py-1.5">
                      {m.win}
                    </span>
                  </div>

                  <div
                    data-card-shade
                    aria-hidden="true"
                    className="absolute inset-0 bg-deep opacity-0 pointer-events-none"
                  />
                </div>
              </article>
            </Fragment>
          ))}
          {/* Sticky cards are held inside the parent's content box (padding does not
              count), so this spacer is what lets the full pile sit for a moment. */}
          <div aria-hidden="true" className="hidden motion-safe:block h-[22svh]" />
        </div>

        <p className="mt-4 text-[12.5px] text-muted-foreground leading-[1.6]">
          Also included: live route progress from Amazon · driver document &amp; right-to-work
          expiry tracking · incident reports · shift history &amp; reliability reporting · e-signed
          agreements · role-based access and 2FA.
        </p>
      </div>
    </section>
  );
}
