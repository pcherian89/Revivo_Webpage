"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * "static"  → server render / already on screen: show content, no animation.
 * "hidden"  → JS confirmed the element is below the fold: hide it, ready to enter.
 * "shown"   → element scrolled into view: play the entrance once.
 *
 * Content is never hidden before JavaScript runs, so the page is always
 * readable even if scripts fail to load.
 */
export type RevealState = "static" | "hidden" | "shown";

export function useRevealState(ref: RefObject<Element | null>, rootMargin = "0px 0px -12% 0px") {
  const [state, setState] = useState<RevealState>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          if (entry.isIntersecting) {
            observer.disconnect();
            return; // already visible on load — leave it static
          }
          setState("hidden");
          return;
        }
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return state;
}
