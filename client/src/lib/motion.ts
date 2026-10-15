import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/*
 * Shared GSAP motion for the homepage. Every hidden start state is set from
 * here at runtime, never in CSS (the hero's pre-paint `.js` rules are the one
 * exception, see client/index.html), so the page stays fully readable when
 * motion is off, the script fails, or the prerenderer captures it.
 */

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger };

/** Pale start colour for words that light up on a light background. */
export const PALE = "#c3cedd";
/** The same idea on the navy sections. */
export const PALE_ON_DARK = "#3b4876";

/**
 * Puppeteer (the build-time prerender) reports `navigator.webdriver`. Running
 * motion there would bake half-animated inline styles into dist/public.
 */
export function motionAllowed() {
  return typeof navigator !== "undefined" && !navigator.webdriver;
}

let refreshInstalled = false;

/**
 * Lazy images and the video change the page height after load, which would
 * leave every trigger pointing at the wrong scroll position. One observer for
 * the whole page, installed the first time any section animates.
 */
function installRefreshOnResize() {
  if (refreshInstalled || typeof ResizeObserver === "undefined") return;
  refreshInstalled = true;
  let t: number | undefined;
  new ResizeObserver(() => {
    window.clearTimeout(t);
    t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
  }).observe(document.body);
}

type MotionContext = { phone: boolean };

/**
 * useGSAP with the two gates every section needs: skipped under the prerender
 * and under prefers-reduced-motion. Selector strings inside `setup` are scoped
 * to `scope`. Re-runs (and cleans up) when the phone breakpoint flips.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: MotionContext) => void | (() => void),
  dependencies: unknown[] = [],
) {
  useGSAP(
    () => {
      if (!motionAllowed() || !scope.current) return;
      installRefreshOnResize();
      const mm = gsap.matchMedia(scope.current);
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", phone: "(max-width: 639px)" },
        (ctx) => {
          if (!ctx.conditions?.motion) return;
          return setup({ phone: !!ctx.conditions.phone });
        },
      );
      return () => mm.revert();
    },
    { scope, dependencies, revertOnUpdate: true },
  );
}

let swatch: CanvasRenderingContext2D | null | undefined;

/**
 * The theme defines some colours in oklch, and computed styles hand them back
 * that way. GSAP can only blend rgb/hex/hsl, so an oklch end value interpolates
 * through garbage hues. Painting one pixel and reading it back gives plain rgb.
 */
export function toRgb(color: string) {
  if (color.startsWith("rgb") || color.startsWith("#")) return color;
  if (swatch === undefined) swatch = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!swatch) return color;
  swatch.clearRect(0, 0, 1, 1);
  swatch.fillStyle = color;
  swatch.fillRect(0, 0, 1, 1);
  const px = swatch.getImageData(0, 0, 1, 1).data;
  return `rgba(${px[0]}, ${px[1]}, ${px[2]}, ${(px[3] / 255).toFixed(3)})`;
}

/**
 * Words inside `container` (rendered by <SplitWords>) turn from `from` to their
 * own colour one after another, tied to the scroll position.
 */
export function lightUp(container: Element | null, from = PALE) {
  if (!container) return;
  const words = gsap.utils.toArray<HTMLElement>(container.querySelectorAll("[data-word]"));
  if (!words.length) return;
  const ends = words.map((w) => toRgb(getComputedStyle(w).color));
  gsap.fromTo(
    words,
    { color: from },
    {
      color: (i: number) => ends[i],
      ease: "none",
      stagger: 0.11,
      scrollTrigger: { trigger: container, start: "top 82%", end: "bottom 45%", scrub: true },
    },
  );
}

/** Words rise up through a slot, once, when `container` scrolls into view. */
export function riseWords(container: Element | null, start = "top 85%") {
  if (!container) return;
  gsap.fromTo(
    container.querySelectorAll("[data-word]"),
    { y: 0, yPercent: 115 },
    {
      y: 0,
      yPercent: 0,
      duration: 1.05,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: { trigger: container, start, once: true },
    },
  );
}

/**
 * Fade up from below, once, as each element reaches the screen. Elements that
 * arrive together are staggered. Transforms are cleared afterwards so hover
 * lifts and fixed descendants behave normally.
 */
export function rise(targets: string | Element[], y = 34) {
  const els = gsap.utils.toArray<HTMLElement>(targets);
  if (!els.length) return;
  gsap.set(els, { opacity: 0, y });
  ScrollTrigger.batch(els, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        overwrite: true,
        clearProps: "transform,opacity",
      }),
  });
}

/**
 * A frame opens from a smaller rounded window to full size as it comes up the
 * screen, while the picture inside zooms out. Both scrubbed to the scroll.
 */
export function openWindow(frame: Element | null, media?: Element | null, radius = 16) {
  if (!frame) return;
  gsap.fromTo(
    frame,
    { clipPath: "inset(6% 14% 6% 14% round 28px)" },
    {
      clipPath: `inset(0% 0% 0% 0% round ${radius}px)`,
      ease: "none",
      scrollTrigger: { trigger: frame, start: "top 95%", end: "center 60%", scrub: true },
    },
  );
  if (media) {
    gsap.fromTo(
      media,
      { scale: 1.18 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }
}
