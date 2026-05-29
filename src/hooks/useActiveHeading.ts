import { useEffect, useState } from "react";

// Walks up from a node to the nearest scrollable ancestor. The site scrolls
// inside <main> (overflow-y-auto), not the document, so scroll-spy has to listen
// on that element. Falls back to null (meaning: use the window) if none is found.
function getScrollParent(node: HTMLElement): HTMLElement | null {
  let el = node.parentElement;
  while (el) {
    const overflowY = getComputedStyle(el).overflowY;
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

// Tracks which of the given section ids is the active heading, for the
// single-page anchor nav. Pass the current pathname so the listeners are torn
// down and re-attached on client-side navigation (the home sections are fresh
// DOM nodes each time "/" mounts).
//
// Rather than an IntersectionObserver band (which can never activate a short
// section pinned to the bottom of the scroll, since it cannot scroll high
// enough), this computes the active section directly: the lowest section whose
// top has passed an activation line near the top of the viewport. When the
// scroll is bottomed out, the last section always wins, so a short trailing
// section like Contact still highlights.
export function useActiveHeading(headingIds: string[], pathname: string): string | null {
  const [activeId, setActiveId] = useState<string | null>(() => {
    const hash = window.location.hash.slice(1);
    return hash && headingIds.includes(hash) ? hash : null;
  });

  useEffect(() => {
    if (headingIds.length === 0 || typeof window === "undefined") return;

    const getEl = (id: string) => document.getElementById(id);
    const firstEl = headingIds.map(getEl).find((el): el is HTMLElement => el !== null);
    // None of the sections exist on this route (e.g. /contact).
    if (!firstEl) {
      setActiveId(null);
      return;
    }

    const scrollParent = getScrollParent(firstEl);
    const scrollTarget: HTMLElement | Window = scrollParent ?? window;

    let ticking = false;

    const compute = () => {
      ticking = false;

      const viewTop = scrollParent ? scrollParent.getBoundingClientRect().top : 0;
      const viewHeight = scrollParent ? scrollParent.clientHeight : window.innerHeight;
      // Activation line sits below the sticky header, ~30% down the viewport.
      const line = viewTop + viewHeight * 0.3;

      const atBottom = scrollParent
        ? scrollParent.scrollTop + scrollParent.clientHeight >= scrollParent.scrollHeight - 2
        : window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let active: string | null = null;
      if (atBottom) {
        // Bottomed out: the last existing section wins, even if it is too short
        // to ever reach the activation line on its own.
        for (let i = headingIds.length - 1; i >= 0; i--) {
          if (getEl(headingIds[i])) {
            active = headingIds[i];
            break;
          }
        }
      } else {
        // The lowest section whose top has scrolled above the line.
        for (const id of headingIds) {
          const el = getEl(id);
          if (el && el.getBoundingClientRect().top <= line) active = id;
        }
      }

      setActiveId(active);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    compute();
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headingIds, pathname]);

  return activeId;
}
