/**
 * The Revivo heartbeat — the exact shape from the logo mark
 * (flatline → one beat → flatline → dot), expressed relative to its start.
 * Every pulse on the site is drawn from these points so it always matches the logo.
 */

/** Beat points relative to the start of the beat, in logo units. */
const BEAT: Array<[number, number]> = [
  [0, 0],
  [14.4, -39.6],
  [32.4, 39.6],
  [45, -14.4],
  [55.8, 0],
];

/** Logo proportions (in logo units). */
export const LOGO = {
  leadIn: 61.2, // flat line before the beat
  beatWidth: 55.8,
  tail: 19.8, // flat line after the beat
  dotGap: 19.8, // gap from line end to dot centre
  dotRadius: 7.96,
  stroke: 10.2,
  amplitude: 39.6,
} as const;

/**
 * Build a path: a flat line of `before` units, the beat, then `after` units of flat line.
 * `scale` multiplies the beat geometry; the flat lengths are already in output units.
 */
export function heartbeatPath({
  x = 0,
  y = 0,
  before,
  after,
  scale = 1,
}: {
  x?: number;
  y?: number;
  before: number;
  after: number;
  scale?: number;
}) {
  const start = x + before;
  const pts = BEAT.map(([dx, dy]) => `${round(start + dx * scale)} ${round(y + dy * scale)}`);
  const end = start + LOGO.beatWidth * scale + after;
  return `M ${round(x)} ${round(y)} L ${pts.join(" L ")} L ${round(end)} ${round(y)}`;
}

const round = (n: number) => Math.round(n * 100) / 100;
