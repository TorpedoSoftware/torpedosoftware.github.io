import { useEffect, useRef, useState } from "react";

// Reveal immediately (skip the fade-in) when motion is reduced or when there is
// no IntersectionObserver to drive the reveal. Without this, reduced-motion
// users still get the animation, and any environment where the observer never
// fires would leave the content stuck at opacity-0 (invisible but in the DOM).
function shouldRevealImmediately(): boolean {
  if (typeof IntersectionObserver === "undefined") return true;
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return false;
}

export function useInView<T extends HTMLElement = HTMLElement>(
  threshold = 0.1,
  rootMargin = "0px 0px 150px 0px",
): { ref: React.RefObject<T | null>; inView: boolean } {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(shouldRevealImmediately);

  useEffect(() => {
    if (inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, inView]);

  return { ref, inView };
}
