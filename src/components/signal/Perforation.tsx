import type { CSSProperties, Ref } from "react";
import { flash } from "@/lib/signal-clock";

const GRID = 9; // px between perforations
const SPOT = 190; // diameter of the lit area around the light

const LIME_DOTS: CSSProperties = {
  backgroundImage: "radial-gradient(circle at center, rgba(204, 255, 0, 0.9) 1.5px, transparent 2.1px)",
  backgroundSize: `${GRID}px ${GRID}px`,
};
const SOFT_EDGE = "radial-gradient(circle closest-side, #000 20%, transparent)";
const RING = "radial-gradient(circle closest-side, transparent 58%, #000 72%, #000 82%, transparent 100%)";

/**
 * "Perforated Signal" — Revivo's texture. Nothing shows at rest: the page stays
 * clean black. Where the running light passes, the perforations around it glow
 * lime, as if the light shines through a stadium's perforated skin; when it
 * reaches a core, a ring of lit perforations ripples outwards.
 * `mask` keeps the effect away from text. Decorative; nothing moves under
 * reduced motion (the signal clock does not run).
 */
export function Perforation({
  mask,
  spotRef,
  waveRef,
  wave,
}: {
  mask: string;
  spotRef: Ref<HTMLDivElement>;
  waveRef?: Ref<HTMLDivElement>;
  wave?: { x: number; y: number; size: number } | null;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <div
        ref={spotRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{
          ...LIME_DOTS,
          width: SPOT,
          height: SPOT,
          opacity: 0,
          maskImage: SOFT_EDGE,
          WebkitMaskImage: SOFT_EDGE,
        }}
      />
      {wave && waveRef && (
        <div
          ref={waveRef}
          className="absolute"
          style={{
            ...LIME_DOTS,
            left: Math.round(wave.x - wave.size / 2),
            top: Math.round(wave.y - wave.size / 2),
            width: Math.round(wave.size),
            height: Math.round(wave.size),
            opacity: 0,
            maskImage: RING,
            WebkitMaskImage: RING,
          }}
        />
      )}
    </div>
  );
}

/** Move the lit spot to the light's head (container coordinates), or hide it. */
export function moveSpot(el: HTMLDivElement | null, pt: { x: number; y: number } | null) {
  if (!el) return;
  if (!pt) {
    if (el.style.opacity !== "0") el.style.opacity = "0";
    return;
  }
  const x = Math.round(pt.x - SPOT / 2);
  const y = Math.round(pt.y - SPOT / 2);
  el.style.opacity = "1";
  el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  el.style.backgroundPosition = `${-x}px ${-y}px`; // keep the lit dots on one grid
}

/** A ring of lit perforations ripples out from a core. */
export function waveOut(el: HTMLDivElement | null) {
  flash(
    el,
    [
      { opacity: 1, transform: "scale(0.3)" },
      { opacity: 0.9, transform: "scale(0.7)", offset: 0.5 },
      { opacity: 0, transform: "scale(1)" },
    ],
    1300,
  );
}
