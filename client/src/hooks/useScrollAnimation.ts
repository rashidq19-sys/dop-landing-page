import { useLayoutEffect, useRef, useState } from "react";

// Reveal a little before the element reaches the viewport, so slow connections
// never show a faded placeholder where content should be.
const REVEAL_ROOT_MARGIN = "0px 0px 200px 0px";
const REVEAL_THRESHOLD = 0.01;

/*
 * Consumers must render the hidden state only when `armed && !isVisible`.
 * `armed` stays false until we know JS is running, IntersectionObserver exists,
 * the user has not asked for reduced motion, and the element starts off-screen.
 * That keeps content fully visible with JS disabled, during prerender, and on
 * first paint — opacity is never 0 by default.
 */
export function useScrollAnimation(threshold = REVEAL_THRESHOLD) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    const current = ref.current;
    if (!current) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion or no observer support: show everything, animate nothing.
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    // Already on screen at first paint — reveal it without ever hiding it.
    const rect = current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    setArmed(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: REVEAL_ROOT_MARGIN }
    );
    observer.observe(current);

    return () => observer.unobserve(current);
  }, [threshold]);

  return { ref, isVisible, armed };
}
