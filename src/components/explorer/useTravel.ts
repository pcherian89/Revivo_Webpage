"use client";

import { animate } from "motion/react";
import { useCallback, useRef } from "react";

/**
 * Moves the single signal point along one or more SVG paths, in order.
 * Starting a new journey stops the previous one — only one point ever moves.
 */
export function useTravel(enabled: boolean) {
  const dotRef = useRef<SVGGElement>(null);
  const current = useRef<{ stop: () => void } | null>(null);
  const token = useRef(0);

  const travel = useCallback(
    async (paths: Array<SVGPathElement | null | undefined>, duration = 0.6) => {
      const dot = dotRef.current;
      current.current?.stop();
      const mine = ++token.current;
      if (!enabled || !dot) return;
      dot.style.opacity = "1";
      for (const path of paths) {
        if (!path || mine !== token.current) return;
        const len = path.getTotalLength();
        const controls = animate(0, 1, {
          duration,
          ease: [0.45, 0, 0.2, 1],
          onUpdate: (v) => {
            const p = path.getPointAtLength(v * len);
            dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
          },
        });
        current.current = controls;
        await controls;
      }
      if (mine === token.current) dot.style.opacity = "0"; // fade out: no node looks selected by accident
    },
    [enabled],
  );

  return { dotRef, travel };
}
