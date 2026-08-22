import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Phones get different treatment from tablets and desktops in the fixed
 * overlays (the chat widget, the sign-in modal). 640px matches Tailwind's `sm:`
 * breakpoint, which is what those components' own classes switch on.
 *
 * Deliberately NOT the same as `useIsMobile()` in `useMobile.tsx` — that is
 * shadcn's 768px sidebar breakpoint and belongs to a different component. Do
 * not "unify" the two.
 */
export const PHONE_BREAKPOINT = 640;

export function useIsPhoneViewport() {
  const [isPhone, setIsPhone] = useState(
    () => typeof window !== "undefined" && window.innerWidth < PHONE_BREAKPOINT
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${PHONE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsPhone(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isPhone;
}

/**
 * Inline styles that pin a `position: fixed` element to the *visible* part of
 * the screen — the area the software keyboard is not covering. Returns null
 * when inactive, so the caller can fall back to its normal layout.
 *
 * iOS Safari does not shrink the layout viewport when the keyboard opens; it
 * shrinks the *visual* viewport and scrolls the page underneath. A fixed
 * overlay therefore stays sized to the full layout viewport and whatever sits
 * in its lower half — a chat composer, a modal's submit button — ends up behind
 * the keyboard, while Safari drags the page about trying to reveal the focused
 * input. That is what made the chat panel appear to float while typing.
 */
export function useVisualViewportRect(active: boolean) {
  const [rect, setRect] = useState<CSSProperties | null>(null);

  useEffect(() => {
    if (!active) {
      setRect(null);
      return;
    }

    const vv = window.visualViewport;
    const apply = () => {
      setRect({
        top: vv ? vv.offsetTop : 0,
        left: vv ? vv.offsetLeft : 0,
        width: vv ? vv.width : window.innerWidth,
        height: vv ? vv.height : window.innerHeight,
      });
    };

    apply();
    // iOS reports the keyboard through visualViewport; Android Chrome resizes
    // the layout viewport instead and only fires window resize. Both needed —
    // drop either and the panel sticks at the wrong height on that platform.
    vv?.addEventListener("resize", apply);
    vv?.addEventListener("scroll", apply);
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
    return () => {
      vv?.removeEventListener("resize", apply);
      vv?.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, [active]);

  return rect;
}

/**
 * Stops the page behind a full-screen overlay from scrolling, so a drag outside
 * the overlay's own scroller cannot move the page and make the overlay look
 * like it is sliding. `position: fixed` on the body is the only lock iOS
 * respects; the scroll position has to be restored on release, or fixing the
 * body jumps the visitor back to the top of the page.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.overflow = previous.overflow;
      // html { scroll-behavior: smooth } would otherwise animate the restore.
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, [active]);
}
