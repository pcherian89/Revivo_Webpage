"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { dataMarks, PULSE_HALF, pulseSegment, SIGNAL, type Point } from "@/lib/signal";
import { signalBus } from "@/lib/signal-bus";
import { visibleRect } from "./visibleRect";

type Geo = { w: number; h: number; a: string; marks: Point[]; b: string; end: Point };

/**
 * The hero signal: a precise lime line draws beneath the headline, makes one
 * crisp pulse under the word "pulse", passes through evenly spaced data marks,
 * then turns down beside the copy (straight runs, one corner radius) and drops
 * into exactly where the explorer's signal begins.
 * Plays once, then settles. Decorative only (aria-hidden).
 */
export function HeroSignal() {
  const [geo, setGeo] = useState<Geo | null>(null);
  const [drawn, setDrawn] = useState(false);
  const reduce = useReducedMotion();
  const started = useRef(false);
  const aRefs = useRef<Array<SVGPathElement | null>>([]);
  const bRefs = useRef<Array<SVGPathElement | null>>([]);
  const marksRef = useRef<SVGGElement>(null);
  const dotRef = useRef<SVGGElement>(null);

  // Measure the real layout (headline, "pulse", actions, explorer entry).
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setGeo(buildGeometry(hero)));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(hero);
    const h1 = document.getElementById("hero-heading");
    if (h1) ro.observe(h1);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // Play the sequence once.
  useEffect(() => {
    if (!geo || started.current) return;
    started.current = true;
    if (reduce) {
      signalBus.markHeroDone();
      return;
    }
    let cancelled = false;
    const controls: Array<{ stop: () => void }> = [];
    const dot = dotRef.current;
    const setDot = (p: DOMPoint | Point) => dot?.setAttribute("transform", `translate(${p.x} ${p.y})`);
    const draw = (paths: Array<SVGPathElement | null>, v: number) =>
      paths.forEach((p) => p && (p.style.strokeDashoffset = String(1 - v)));

    const run = async () => {
      const [a] = aRefs.current;
      const [b] = bRefs.current;
      if (!a || !b || !dot) return;
      const lenA = a.getTotalLength();
      const lenB = b.getTotalLength();
      dot.style.opacity = "1";

      const c1 = animate(0, 1, {
        duration: 1.35,
        delay: 0.25,
        ease: [0.45, 0, 0.25, 1],
        onUpdate: (v) => {
          draw(aRefs.current, v);
          setDot(a.getPointAtLength(v * lenA));
        },
      });
      controls.push(c1);
      await c1;
      if (cancelled) return;

      const marks = Array.from(marksRef.current?.children ?? []) as SVGElement[];
      const start = a.getPointAtLength(lenA);
      const bStart = b.getPointAtLength(0);
      const c2 = animate(0, 1, {
        duration: 0.4,
        ease: "linear",
        onUpdate: (v) => {
          marks.forEach((m, i) => (m.style.opacity = v * marks.length > i ? "1" : "0"));
          setDot({ x: start.x + (bStart.x - start.x) * v, y: start.y + (bStart.y - start.y) * v });
        },
      });
      controls.push(c2);
      await c2;
      if (cancelled) return;

      const c3 = animate(0, 1, {
        duration: 1.3,
        ease: [0.45, 0, 0.2, 1],
        onUpdate: (v) => {
          draw(bRefs.current, v);
          setDot(b.getPointAtLength(v * lenB));
        },
      });
      controls.push(c3);
      await c3;
      if (cancelled) return;
      animate(dot, { opacity: 0 }, { duration: 0.4 });
      setDrawn(true);
      signalBus.markHeroDone();
    };

    // Hide everything, then draw.
    draw(aRefs.current, 0);
    draw(bRefs.current, 0);
    Array.from(marksRef.current?.children ?? []).forEach((m) => ((m as SVGElement).style.opacity = "0"));
    run();
    return () => {
      cancelled = true;
      controls.forEach((c) => c.stop());
    };
  }, [geo, reduce]);

  if (!geo) return null;
  const finished = drawn || Boolean(reduce);
  const pathProps = {
    fill: "none",
    pathLength: 1,
    strokeDasharray: "1 1",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: finished ? { strokeDashoffset: 0 } : undefined,
  };

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      width={geo.w}
      height={geo.h}
    >
      {[geo.a, geo.b].map((d, i) => {
        const refs = i === 0 ? aRefs : bRefs;
        return (
          <g key={i}>
            <path
              {...pathProps}
              ref={(el) => {
                refs.current[1] = el;
              }}
              d={d}
              stroke={SIGNAL.color}
              strokeOpacity={SIGNAL.glowOpacity}
              strokeWidth={SIGNAL.glowWidth}
            />
            <path
              {...pathProps}
              ref={(el) => {
                refs.current[0] = el;
              }}
              d={d}
              stroke={SIGNAL.color}
              strokeWidth={SIGNAL.width}
            />
          </g>
        );
      })}
      <g ref={marksRef} fill={SIGNAL.color}>
        {geo.marks.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={2} />
        ))}
      </g>
      <g ref={dotRef} transform={`translate(${geo.end.x} ${geo.end.y})`} style={{ opacity: 0 }}>
        <circle r={SIGNAL.haloRadius} fill={SIGNAL.color} opacity={0.18} />
        <circle r={SIGNAL.dotRadius} fill={SIGNAL.color} />
      </g>
    </svg>
  );
}

function buildGeometry(hero: HTMLElement): Geo | null {
  const box = hero.getBoundingClientRect();
  const rel = (r: DOMRect | null) =>
    r && {
      left: r.left - box.left,
      right: r.right - box.left,
      top: r.top - box.top,
      bottom: r.bottom - box.top,
    };
  const h1 = rel(visibleRect("hero-heading"));
  const word = rel(visibleRect("hero-pulse-word"));
  const actions = rel(visibleRect("hero-actions"));
  const copy = rel(visibleRect("hero-copy"));
  const entry = rel(visibleRect("signal-entry-desktop", "signal-entry-mobile"));
  if (!h1 || !word || !actions || !copy) return null;

  const w = box.width;
  const h = box.height;
  const R = SIGNAL.radius;
  const desktop = window.matchMedia("(min-width: 64rem)").matches;
  const exitX = entry ? (entry.left + entry.right) / 2 : desktop ? w / 2 : 31;
  const end = { x: exitX, y: h };
  const f = (n: number) => Math.round(n * 10) / 10;

  // Shared start: a straight line, one pulse, a short straight, evenly spaced marks.
  const lead = (y0: number, px: number, s: number, markGap: number) => {
    const a = `M 0 ${f(y0)} H ${f(px - PULSE_HALF.before * s)}${pulseSegment(px, y0, s)} H ${f(px + PULSE_HALF.after * s + 16)}`;
    const marksStart = px + PULSE_HALF.after * s + 16 + markGap;
    const marks = dataMarks(marksStart, y0, 5, markGap);
    const bStart = marksStart + markGap * 5;
    return { a, marks, bStart };
  };

  if (desktop) {
    // Beneath the headline; the pulse sits under the word "pulse".
    const y0 = h1.bottom + 16;
    const px = (word.left + word.right) / 2;
    const { a, marks, bStart } = lead(y0, px, 1, 14);
    // Turn down just beyond the copy — or exactly on the explorer's axis when it is clear of the text.
    const textRight = Math.max(copy.right, actions.right);
    let xV = Math.max(textRight + 40, bStart + R + 12);
    // Prefer one continuous vertical on the explorer's axis whenever it clears the text.
    const aligned = exitX >= Math.max(textRight + 20, bStart + R + 12);
    if (aligned) xV = exitX;
    else xV = Math.max(xV, exitX + 2 * R);
    let b = `M ${f(bStart)} ${f(y0)} H ${f(xV - R)} A ${R} ${R} 0 0 1 ${f(xV)} ${f(y0 + R)}`;
    if (aligned) b += ` V ${f(h)}`;
    else {
      const yJ = Math.max(actions.bottom + 40, y0 + 3 * R);
      b += ` V ${f(yJ - R)} A ${R} ${R} 0 0 1 ${f(xV - R)} ${f(yJ)} H ${f(exitX + R)} A ${R} ${R} 0 0 0 ${f(exitX)} ${f(yJ + R)} V ${f(h)}`;
    }
    return { w, h, a, marks, b, end };
  }

  // Tablet / mobile: below the actions, turning at the text edge and stepping back to the left rail.
  const y0 = actions.bottom + 36;
  const px = Math.min(w * 0.42, copy.right - 200);
  const { a, marks, bStart } = lead(y0, px, 0.85, 12);
  const xR = Math.max(bStart + R + 8, Math.min(copy.right, w - 20));
  const yL = y0 + 2 * R + 8;
  const b =
    `M ${f(bStart)} ${f(y0)} H ${f(xR - R)} A ${R} ${R} 0 0 1 ${f(xR)} ${f(y0 + R)}` +
    ` V ${f(yL - R)} A ${R} ${R} 0 0 1 ${f(xR - R)} ${f(yL)} H ${f(exitX + R)}` +
    ` A ${R} ${R} 0 0 0 ${f(exitX)} ${f(yL + R)} V ${f(h)}`;
  return { w, h, a, marks, b, end };
}
