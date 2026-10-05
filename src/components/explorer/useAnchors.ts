"use client";

import { useEffect, useState, type RefObject } from "react";
import type { Point } from "@/lib/signal";

export type AnchorMap = { w: number; h: number; pts: Record<string, Point> };

/**
 * Measures every `[data-anchor]` element inside `ref` (centre point relative to
 * the container), so SVG branches connect exactly to the HTML labels at any
 * screen size. Re-measures on resize and whenever `version` changes.
 * Skips measuring while the container is hidden (e.g. the other breakpoint).
 */
export function useAnchors(ref: RefObject<HTMLElement | null>, version: string | number) {
  const [geo, setGeo] = useState<AnchorMap | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (el.getClientRects().length === 0) return;
        const box = el.getBoundingClientRect();
        const pts: Record<string, Point> = {};
        el.querySelectorAll<HTMLElement>("[data-anchor]").forEach((a) => {
          if (a.getClientRects().length === 0) return; // belongs to the hidden breakpoint layout
          const r = a.getBoundingClientRect();
          pts[a.dataset.anchor as string] = {
            x: r.left - box.left + r.width / 2,
            y: r.top - box.top + r.height / 2,
          };
        });
        setGeo({ w: box.width, h: box.height, pts });
      });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, version]);

  return geo;
}
