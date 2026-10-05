"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { dataMarks, pulse, rhythm, SIGNAL, smoothPath, type Point } from "@/lib/signal";
import { signalBus } from "@/lib/signal-bus";
import { visibleRect } from "./visibleRect";

type Geo = { w: number; h: number; a: string; marks: Point[]; b: string; end: Point };

/**
 * The hero signal: a quiet lime line draws beneath the headline, lifts into one
 * restrained pulse under the word "pulse", separates into data marks,
 * reconnects, and sweeps down to exactly where the explorer's signal begins.
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
          <circle key={i} cx={p.x} cy={p.y} r={i % 2 ? 1.6 : 2.2} />
        ))}
      </g>
      <g
        ref={dotRef}
        transform={`translate(${geo.end.x} ${geo.end.y})`}
        style={{ opacity: finished ? 1 : 0 }}
      >
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
  const desktop = window.matchMedia("(min-width: 64rem)").matches;
  const exitX = entry ? (entry.left + entry.right) / 2 : desktop ? w / 2 : 31;
  const end = { x: exitX, y: h };

  if (desktop) {
    // Beneath the headline, pulsing under the word "pulse".
    const y0 = h1.bottom + 16;
    const px = (word.left + word.right) / 2;
    const aPts = [
      ...rhythm(0, px - 64, y0),
      ...pulse(px, y0).slice(1),
      ...rhythm(px + 70, px + 116, y0, 2).slice(1),
    ];
    const marks = dataMarks(px + 116, y0, 6, 18);
    const bStart = px + 252;
    const xR = Math.min(w - 40, Math.max(copy.right + 72, w * 0.86));
    const r = 36;
    const yS = Math.max(actions.bottom + 28, y0 + r + 24);
    const k = (h - yS) * 0.55;
    const bLine = bStart < xR - r - 24 ? smoothPath(rhythm(bStart, xR - r, y0, 2)) : `M ${bStart} ${y0}`;
    const b = `${bLine} Q ${xR} ${y0} ${xR} ${y0 + r} L ${xR} ${yS} C ${xR} ${yS + k} ${exitX} ${h - k} ${exitX} ${h}`;
    return { w, h, a: smoothPath(aPts), marks, b, end };
  }

  // Tablet / mobile: the signal runs below the actions and sweeps to the left rail.
  const y0 = actions.bottom + 40;
  const px = w * 0.36;
  const s = 0.8;
  const aPts = [
    ...rhythm(0, px - 64 * s, y0, 2),
    ...pulse(px, y0, s).slice(1),
    ...rhythm(px + 56, px + 88, y0, 1.5).slice(1),
  ];
  const marks = dataMarks(px + 88, y0, 5, 14);
  const bStart = px + 170;
  const xR = w - 22;
  const r = 20;
  const yS = y0 + r + 14;
  const k = (h - yS) * 0.55;
  const b = `M ${bStart} ${y0} L ${xR - r} ${y0} Q ${xR} ${y0} ${xR} ${y0 + r} L ${xR} ${yS} C ${xR} ${yS + k} ${exitX} ${h - k} ${exitX} ${h}`;
  return { w, h, a: smoothPath(aPts), marks, b, end };
}
