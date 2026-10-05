/**
 * THE REVIVO SIGNAL — shared geometry and style for every signal on the site.
 * Precise and engineered: perfectly straight runs, one consistent corner radius,
 * and a single crisp pulse. Never wobbly, never a hospital-monitor trace.
 */

export type Point = { x: number; y: number };

/** Shared look: the hero, the seam and the explorer all use these. */
export const SIGNAL = {
  color: "#CCFF00",
  width: 1.75,
  glowWidth: 6,
  glowOpacity: 0.12,
  quiet: "#3F3F46",
  dotRadius: 3.5,
  haloRadius: 9,
  /** One corner radius for every turn in the system */
  radius: 18,
} as const;

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Catmull-Rom spline through points as cubic Béziers (used only for the pulse). */
function smoothThrough(points: readonly Point[], tension = 0.42): string {
  let d = "";
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const t = tension / 3;
    d += ` C ${r1(p1.x + (p2.x - p0.x) * t)} ${r1(p1.y + (p2.y - p0.y) * t)} ${r1(p2.x - (p3.x - p1.x) * t)} ${r1(
      p2.y - (p3.y - p1.y) * t,
    )} ${r1(p2.x)} ${r1(p2.y)}`;
  }
  return d;
}

/**
 * Path continuation for the one recognizable pulse, centred on `cx` and
 * starting/ending on the baseline `y`: a small lift, a strong asymmetric swing
 * and a quick recovery. Assumes the current point is (cx - 34·s, y).
 */
export function pulseSegment(cx: number, y: number, s = 1): string {
  const pts: Point[] = [
    { x: cx - 34 * s, y },
    { x: cx - 13 * s, y: y - 9 * s },
    { x: cx + 1 * s, y: y + 21 * s },
    { x: cx + 15 * s, y: y - 13 * s },
    { x: cx + 27 * s, y: y + 3 * s },
    { x: cx + 38 * s, y },
  ];
  return smoothThrough(pts);
}

/** Half-width of the pulse (baseline before → after). */
export const PULSE_HALF = { before: 34, after: 38 } as const;

/** Evenly spaced data marks sitting exactly on the line. */
export function dataMarks(x0: number, y: number, count = 5, gap = 14): Point[] {
  return Array.from({ length: count }, (_, i) => ({ x: x0 + gap * i, y }));
}

/**
 * A right-angled connector with rounded corners, leaving `a` vertically and
 * arriving at `b` vertically (down → across → down). Straight if aligned.
 * Pass the same `busY` for all children of one parent so their routes share one
 * stem and one horizontal bar — a clean, symmetric tree with no parallel lines.
 */
export function orthogonal(a: Point, b: Point, busY?: number, radius: number = SIGNAL.radius): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) < 3) return `M ${r1(a.x)} ${r1(a.y)} V ${r1(b.y)}`; // near-aligned: one clean vertical
  const midY = busY ?? a.y + dy / 2;
  const r = Math.max(0, Math.min(radius, Math.abs(dx) / 2, midY - a.y, b.y - midY));
  const dir = Math.sign(dx);
  // Turning from "down" to "right" is sweep 0 on screen; to "left" is sweep 1.
  const s1 = dir > 0 ? 0 : 1;
  const s2 = dir > 0 ? 1 : 0;
  return [
    `M ${r1(a.x)} ${r1(a.y)}`,
    `V ${r1(midY - r)}`,
    `A ${r} ${r} 0 0 ${s1} ${r1(a.x + dir * r)} ${r1(midY)}`,
    `H ${r1(b.x - dir * r)}`,
    `A ${r} ${r} 0 0 ${s2} ${r1(b.x)} ${r1(midY + r)}`,
    `V ${r1(b.y)}`,
  ].join(" ");
}

/** Lime blended onto the page background — opaque, so overlapping routes never double up. */
export const DIM_LIME = "#4A5B0B";
export const MID_LIME = "#86A606";

/** Ease-out used for signal travel. */
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
