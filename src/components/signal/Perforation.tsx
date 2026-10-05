import type { CSSProperties, Ref } from "react";

const GRID = 9; // px between perforations
const SPOT = 200; // diameter of the lit area around the light

const dots = (color: string, r: number): CSSProperties => ({
  backgroundImage: `radial-gradient(circle at center, ${color} ${r}px, transparent ${r + 0.6}px)`,
  backgroundSize: `${GRID}px ${GRID}px`,
});

/**
 * "Perforated Signal" — Revivo's texture. A fine dot screen like perforated
 * stadium cladding, faded in only where `mask` allows. Where the signal light
 * passes, the perforations nearby grow and turn lime, as if the light shines
 * through the venue's skin. The lit spot is moved by `moveSpot` (from the
 * signal clock): one small element, transform + background-position only.
 * Decorative; static under reduced motion (the light never moves).
 */
export function Perforation({ mask, spotRef }: { mask: string; spotRef: Ref<HTMLDivElement> }) {
  return (
    <div
      aria-hidden="true"
      className="sig-fade pointer-events-none absolute inset-0 overflow-hidden"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <div className="absolute inset-0" style={dots("rgba(245, 245, 242, 0.075)", 1)} />
      <div
        ref={spotRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{
          ...dots("rgba(204, 255, 0, 0.85)", 1.5),
          width: SPOT,
          height: SPOT,
          opacity: 0,
          maskImage: "radial-gradient(circle closest-side, #000 15%, transparent)",
          WebkitMaskImage: "radial-gradient(circle closest-side, #000 15%, transparent)",
        }}
      />
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
  el.style.backgroundPosition = `${-x}px ${-y}px`; // keep the lit dots on the same grid
}
