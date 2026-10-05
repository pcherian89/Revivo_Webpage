/**
 * SIGNAL CLOCK — one light, one timeline, across sections.
 *
 * Sections register their "light" paths as ordered segments (hero → explorer
 * trunk). A single requestAnimationFrame loop moves one bright dash through all
 * of them at a constant speed, so the light flows continuously from the hero
 * into the Intelligence Layer. Events fire when the light passes a point (e.g.
 * the core ripples, the Intelligence Layer lights up).
 * The loop runs only while at least one segment is on screen.
 */

type SignalEvent = { at: number; fire: () => void };

export type Segment = {
  key: string;
  order: number;
  paths: SVGPathElement[];
  length: number;
  events?: SignalEvent[];
};

const SPEED = 560; // px per second
const PAUSE = 1.3; // seconds of rest between runs
const DASH = 120; // length of the light in px

const segments = new Map<string, Segment>();
const visible = new Set<string>();
let raf = 0;
let start = 0;
let prevD = -1;

function prepare(seg: Segment) {
  for (const p of seg.paths) {
    p.style.strokeDasharray = `${DASH} ${seg.length + DASH * 2}`;
    p.style.strokeDashoffset = String(DASH); // hidden before its start
  }
}

function frame(now: number) {
  raf = requestAnimationFrame(frame);
  const ordered = [...segments.values()].sort((a, b) => a.order - b.order);
  const total = ordered.reduce((s, seg) => s + seg.length, 0);
  if (!total) return;
  if (!start) start = now;
  const cycle = (total + DASH) / SPEED + PAUSE;
  const d = (((now - start) / 1000) % cycle) * SPEED;
  if (d < prevD) prevD = -1; // new run

  let offset = 0;
  for (const seg of ordered) {
    const local = d - offset;
    const off = String(DASH - local);
    for (const p of seg.paths) p.style.strokeDashoffset = off;
    for (const ev of seg.events ?? []) {
      const at = offset + ev.at;
      if (prevD < at && d >= at) ev.fire();
    }
    offset += seg.length;
  }
  prevD = d;
}

function sync() {
  const shouldRun = segments.size > 0 && [...visible].some((k) => segments.has(k));
  if (shouldRun && !raf) {
    start = 0;
    prevD = -1;
    raf = requestAnimationFrame(frame);
  } else if (!shouldRun && raf) {
    cancelAnimationFrame(raf);
    raf = 0;
  }
}

export const signalClock = {
  set(seg: Segment) {
    segments.set(seg.key, seg);
    prepare(seg);
    sync();
  },
  remove(key: string) {
    segments.delete(key);
    visible.delete(key);
    sync();
  },
  setVisible(key: string, isVisible: boolean) {
    if (isVisible) visible.add(key);
    else visible.delete(key);
    sync();
  },
};

/** A one-off ripple/flash using the Web Animations API (transform + opacity only). */
export function flash(el: Element | null, keyframes: Keyframe[], duration = 900) {
  if (!el || typeof (el as HTMLElement).animate !== "function") return;
  (el as HTMLElement).animate(keyframes, { duration, easing: "cubic-bezier(0.25, 1, 0.5, 1)" });
}
