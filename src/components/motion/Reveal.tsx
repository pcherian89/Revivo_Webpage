"use client";

import { m } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useRevealState } from "./useRevealState";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds once the element enters view */
  delay?: number;
  /** Vertical travel in px (kept small on purpose) */
  y?: number;
};

/** Restrained section entrance: short fade + 16px rise, played once. */
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRevealState(ref);

  return (
    <m.div
      ref={ref}
      className={className}
      initial={false}
      animate={state === "hidden" ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      transition={
        state === "hidden"
          ? { duration: 0 }
          : { duration: 0.6, delay: state === "shown" ? delay : 0, ease: [0.25, 1, 0.5, 1] }
      }
    >
      {children}
    </m.div>
  );
}
