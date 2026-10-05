/**
 * Geometry for the hero Intelligence Field.
 * Pure functions — no React — so the layout maths stays easy to read.
 *
 * "wide"    → horizontal composition for large screens (inputs left, outputs right)
 * "compact" → vertical fan for tablet/mobile (inputs on an arc, outputs below)
 */

export type Anchor = "start" | "middle" | "end";

export type FieldPoint = {
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  anchor: Anchor;
  path: string;
  hit: { x: number; y: number; w: number; h: number };
  /** Starting offset for the "disconnected" opening state */
  dx: number;
  dy: number;
};

export type FieldGeometry = {
  width: number;
  height: number;
  fontSize: number;
  core: { x: number; y: number };
  inputs: FieldPoint[];
  outputs: FieldPoint[];
};

const SCATTER: Array<[number, number]> = [
  [-22, 14],
  [16, -18],
  [-12, 22],
  [24, 10],
  [-18, -16],
  [14, 20],
  [-26, -8],
  [10, -22],
];

const r = (n: number) => Math.round(n * 10) / 10;

/** Approximate rendered width of a mono uppercase label */
const labelWidth = (label: string, fontSize: number) => label.length * fontSize * 0.62;

function hitBox(x: number, y: number, anchor: Anchor, label: string, fontSize: number, labelY: number) {
  const w = labelWidth(label, fontSize);
  if (anchor === "end") return { x: x - 14 - w - 8, y: y - 17, w: w + 30, h: 34 };
  if (anchor === "start") return { x: x - 10, y: y - 17, w: w + 32, h: 34 };
  const top = Math.min(y, labelY) - 16;
  return { x: x - Math.max(w, 24) / 2 - 8, y: top, w: Math.max(w, 24) + 16, h: Math.abs(y - labelY) + 28 };
}

export function buildWideGeometry(
  inputLabels: readonly string[],
  outputLabels: readonly string[],
): FieldGeometry {
  const fontSize = 12;
  const core = { x: 392, y: 280 };
  const n = inputLabels.length;

  const inputs = inputLabels.map((label, i) => {
    const t = n > 1 ? i / (n - 1) : 0.5;
    const y = r(52 + t * 456);
    const x = r(168 - 40 * Math.sin(Math.PI * t));
    const labelX = x - 14;
    const labelY = y + 4;
    return {
      x,
      y,
      labelX,
      labelY,
      anchor: "end" as const,
      path: `M ${x + 6} ${y} C ${x + 120} ${y}, ${core.x - 150} ${core.y}, ${core.x - 34} ${core.y}`,
      hit: hitBox(x, y, "end", label, fontSize, labelY),
      dx: SCATTER[i % SCATTER.length][0],
      dy: SCATTER[i % SCATTER.length][1],
    };
  });

  const m = outputLabels.length;
  const outputs = outputLabels.map((label, j) => {
    const t = m > 1 ? j / (m - 1) : 0.5;
    const y = r(core.y + (t - 0.5) * 320);
    const x = r(524 + 18 * Math.sin(Math.PI * t));
    return {
      x,
      y,
      labelX: x + 14,
      labelY: y + 4,
      anchor: "start" as const,
      path: `M ${core.x + 34} ${core.y} C ${core.x + 100} ${core.y}, ${x - 90} ${y}, ${x - 6} ${y}`,
      hit: hitBox(x, y, "start", label, fontSize, y + 4),
      dx: 0,
      dy: 0,
    };
  });

  return { width: 640, height: 560, fontSize, core, inputs, outputs };
}

export function buildCompactGeometry(
  inputLabels: readonly string[],
  outputLabels: readonly string[],
): FieldGeometry {
  const fontSize = 12;
  const core = { x: 200, y: 232 };
  const n = inputLabels.length;

  const inputs = inputLabels.map((label, i) => {
    const theta = Math.PI - (n > 1 ? (i * Math.PI) / (n - 1) : Math.PI / 2);
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const x = r(core.x + 128 * cos);
    const y = r(core.y - 156 * sin);
    const anchor: Anchor = cos < -0.3 ? "end" : cos > 0.3 ? "start" : "middle";
    const labelX = anchor === "end" ? x - 14 : anchor === "start" ? x + 14 : x;
    const labelY = anchor === "middle" ? y - 14 : y + 4;
    const ex = r(core.x + 34 * cos);
    const ey = r(core.y - 34 * sin);
    return {
      x,
      y,
      labelX,
      labelY,
      anchor,
      path: `M ${x} ${y} L ${ex} ${ey}`,
      hit: hitBox(x, y, anchor, label, fontSize, labelY),
      dx: r(SCATTER[i % SCATTER.length][0] * 0.7),
      dy: r(SCATTER[i % SCATTER.length][1] * 0.7),
    };
  });

  const m = outputLabels.length;
  const outputs = outputLabels.map((label, j) => {
    const x = r(48 + j * (304 / Math.max(m - 1, 1)));
    const y = 352;
    return {
      x,
      y,
      labelX: x,
      labelY: y + 24,
      anchor: "middle" as const,
      path: `M ${core.x} ${core.y + 34} C ${core.x} ${core.y + 80}, ${x} ${y - 60}, ${x} ${y - 8}`,
      hit: hitBox(x, y, "middle", label, fontSize, y + 24),
      dx: 0,
      dy: 0,
    };
  });

  return { width: 400, height: 396, fontSize, core, inputs, outputs };
}
