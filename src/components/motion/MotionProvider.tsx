"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Site-wide Motion settings.
 * - LazyMotion: components use the lightweight `m` element and the animation
 *   engine is fetched after the page renders (better load performance).
 *   `strict` makes accidental use of the heavier `motion.*` throw in dev.
 * - reducedMotion="user": respects the visitor's "reduce motion" setting
 *   (transforms are skipped; only gentle opacity changes remain).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
