/**
 * THE REVIVO SIGNAL — shared geometry and style for every signal on the site.
 * Smooth, irregular curves (never sharp ECG corners) so it reads as movement,
 * energy and data rather than a hospital monitor.
 */

export type Point = { x: number; y: number };

/** Shared look: the hero, the seam and the explorer all use these. */
export const SIGNAL = {
  color: "#CCFF00",
  width: 1.75,
  glowWidth: 7,
  glowOpacity: 0.14,
  quiet: "#3F3F46",
  dotRadius: 3.5,
  haloRadius: 9,
} as const;

/** Catmull-Rom spline through points, returned as a smooth cubic Bézier path. */
export function smoothPath(points: readonly Point[], tension = 0.5): string {
  if (points.length < 2) return "";
  const r = (n: number) => Math.round(n * 10) / 10;
  let d = `M ${r(points[0].x)} ${r(points[0].y)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const t = tension / 3;
    const c1 = { x: p1.x + (p2.x - p0.x) * t, y: p1.y + (p2.y - p0.y) * t };
    const c2 = { x: p2.x - (p3.x - p1.x) * t, y: p2.y - (p3.y - p1.y) * t };
    d += ` C ${r(c1.x)} ${r(c1.y)} ${r(c2.x)} ${r(c2.y)} ${r(p2.x)} ${r(p2.y)}`;
  }
  return d;
}

/**
 * A quiet, irregular "athletic rhythm" between x0 and x1 — tiny undulations of
 * varying size, like movement rather than a repeated beat.
 */
export function rhythm(x0: number, x1: number, y: number, amp = 3, step = 26): Point[] {
  const pts: Point[] = [];
  const n = Math.max(1, Math.round((x1 - x0) / step));
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const envelope = 0.45 + 0.55 * Math.abs(Math.sin(x / 150));
    pts.push({ x, y: y + amp * envelope * Math.sin(x / 31 + Math.sin(x / 97)) });
  }
  return pts;
}

/**
 * The one recognizable pulse: a small lift, a strong asymmetric swing and a
 * soft recovery — energy, not a heartbeat trace. `cx` is the pulse centre.
 */
export function pulse(cx: number, y: number, scale = 1): Point[] {
  const s = scale;
  return [
    { x: cx - 64 * s, y },
    { x: cx - 34 * s, y: y - 3 * s },
    { x: cx - 16 * s, y: y - 9 * s },
    { x: cx - 2 * s, y: y + 22 * s },
    { x: cx + 14 * s, y: y - 14 * s },
    { x: cx + 30 * s, y: y + 6 * s },
    { x: cx + 48 * s, y: y - 2 * s },
    { x: cx + 70 * s, y },
  ];
}

/** Small "data marks" the signal briefly separates into. */
export function dataMarks(x0: number, y: number, count = 6, gap = 18): Point[] {
  const offsets = [-6, 3, -2, 7, -5, 2, -3, 5];
  return Array.from({ length: count }, (_, i) => ({
    x: x0 + gap * (i + 1),
    y: y + offsets[i % offsets.length],
  }));
}

/** A smooth connector between two anchors, leaving and arriving vertically. */
export function connector(a: Point, b: Point): string {
  const dy = (b.y - a.y) * 0.5;
  const r = (n: number) => Math.round(n * 10) / 10;
  return `M ${r(a.x)} ${r(a.y)} C ${r(a.x)} ${r(a.y + dy)} ${r(b.x)} ${r(b.y - dy)} ${r(b.x)} ${r(b.y)}`;
}

/** Ease-out used for signal travel. */
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
