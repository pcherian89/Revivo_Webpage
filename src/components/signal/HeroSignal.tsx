"use client";

import { useEffect, useRef, useState } from "react";
import { flash, signalClock } from "@/lib/signal-clock";
import { dataMarks, PULSE_HALF, pulseSegment, SIGNAL, type Point } from "@/lib/signal";
import { visibleRect } from "./visibleRect";

type Geo = {
  w: number;
  h: number;
  /** Visible track: before and after the data marks */
  a: string;
  b: string;
  /** One continuous path for the running light */
  light: string;
  /** Path from the start to the core (to time the core ripple) */
  toCore: string;
  marks: Point[];
  core: { x: number; y: number; rings: number[] } | null;
};

/**
 * The hero signal. A precise lime track runs beneath the headline, makes one
 * crisp pulse under "pulse", passes five data marks and flows into the Revivo
 * signal core on the right, then drops into the explorer. A bright light keeps
 * running through the track (driven by the shared signal clock, so it continues
 * into the explorer) and the core ripples each time it passes. Paused off-screen;
 * static under reduced motion. Decorative.
 */
export function HeroSignal() {
  const [geo, setGeo] = useState<Geo | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lightRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const toCoreRef = useRef<SVGPathElement>(null);
  const rippleRef = useRef<SVGCircleElement>(null);

  // Measure the real layout (headline, "pulse", copy, actions, explorer entry).
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

  // Hand the light to the shared clock (segment 0: the hero), and pause it off-screen.
  useEffect(() => {
    const svg = svgRef.current;
    const light = lightRef.current;
    const glow = glowRef.current;
    if (!svg || !light || !glow || !geo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const toCore = toCoreRef.current?.getTotalLength();
    signalClock.set({
      key: "hero",
      order: 0,
      paths: [glow, light],
      length: light.getTotalLength(),
      events:
        geo.core && toCore
          ? [
              {
                at: toCore,
                fire: () =>
                  flash(
                    rippleRef.current,
                    [
                      { opacity: 0.8, transform: "scale(0.2)" },
                      { opacity: 0, transform: "scale(1)" },
                    ],
                    1100,
                  ),
              },
            ]
          : [],
    });
    const io = new IntersectionObserver(([e]) => signalClock.setVisible("hero", e.isIntersecting));
    io.observe(svg);
    return () => {
      io.disconnect();
      signalClock.remove("hero");
    };
  }, [geo]);

  if (!geo) return null;
  const common = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      width={geo.w}
      height={geo.h}
    >
      {/* Signal core: quiet concentric rings */}
      {geo.core && (
        <g className="sig-fade">
          {geo.core.rings.map((r, i) => (
            <circle
              key={r}
              cx={geo.core!.x}
              cy={geo.core!.y}
              r={r}
              fill="none"
              stroke={i === 0 ? SIGNAL.color : "#F5F5F2"}
              strokeOpacity={i === 0 ? 0.22 : 0.07}
              strokeWidth={1}
            />
          ))}
        </g>
      )}

      {/* The track (always visible, dim) */}
      {[geo.a, geo.b].map((d) => (
        <path
          key={d.slice(0, 24)}
          {...common}
          className="sig-track"
          pathLength={1}
          d={d}
          stroke={SIGNAL.color}
          strokeOpacity={0.38}
          strokeWidth={SIGNAL.width}
        />
      ))}
      <g fill={SIGNAL.color} fillOpacity={0.6} className="sig-fade">
        {geo.marks.map((p) => (
          <circle key={p.x} cx={p.x} cy={p.y} r={2} />
        ))}
      </g>

      {/* The running light: a soft glow and a bright core */}
      <path {...common} d={geo.toCore} ref={toCoreRef} stroke="none" />
      <path
        {...common}
        ref={glowRef}
        className="sig-light"
        d={geo.light}
        stroke={SIGNAL.color}
        strokeOpacity={0.28}
        strokeWidth={8}
      />
      <path
        {...common}
        ref={lightRef}
        className="sig-light"
        d={geo.light}
        stroke={SIGNAL.color}
        strokeWidth={2.25}
      />

      {/* Core point and its ripple */}
      {geo.core && (
        <g className="sig-fade">
          <circle
            ref={rippleRef}
            className="sig-ripple"
            style={{ transformBox: "fill-box", transformOrigin: "center", opacity: 0 }}
            cx={geo.core.x}
            cy={geo.core.y}
            r={geo.core.rings[geo.core.rings.length - 1]}
            fill="none"
            stroke={SIGNAL.color}
            strokeWidth={1.25}
          />
          <circle cx={geo.core.x} cy={geo.core.y} r={14} fill={SIGNAL.color} fillOpacity={0.12} />
          <circle cx={geo.core.x} cy={geo.core.y} r={5} fill={SIGNAL.color} />
        </g>
      )}
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
  const f = (n: number) => Math.round(n * 10) / 10;

  const lead = (y0: number, px: number, s: number, gap: number) => {
    const toMarks = `M 0 ${f(y0)} H ${f(px - PULSE_HALF.before * s)}${pulseSegment(px, y0, s)} H ${f(px + PULSE_HALF.after * s + 16)}`;
    const marksStart = px + PULSE_HALF.after * s + 16 + gap;
    const marks = dataMarks(marksStart, y0, 5, gap);
    const bStart = marksStart + gap * 5;
    return { toMarks, marks, bStart };
  };

  if (desktop) {
    const y0 = h1.bottom + 14;
    const px = (word.left + word.right) / 2;
    const { toMarks, marks, bStart } = lead(y0, px, 1, 14);

    // Signal core in the empty right half, centred on the track.
    const textRight = Math.max(h1.right, copy.right, actions.right);
    const room = w - 48 - (textRight + 56);
    const outer = Math.max(90, Math.min(210, room / 2));
    const cx = textRight + 56 + Math.max(outer, room / 2);
    const rings = [outer * 0.36, outer * 0.68, outer];

    // From the core, straight down and across into the explorer's axis.
    const yT = h - 34;
    const down =
      Math.abs(cx - exitX) < 3
        ? ` V ${f(h)}`
        : ` V ${f(yT - R)} A ${R} ${R} 0 0 1 ${f(cx - R)} ${f(yT)} H ${f(exitX + R)} A ${R} ${R} 0 0 0 ${f(exitX)} ${f(yT + R)} V ${f(h)}`;
    const b = `M ${f(bStart)} ${f(y0)} H ${f(cx)}${down}`;
    const toCore = `${toMarks} H ${f(cx)}`;
    const light = `${toCore}${down}`;
    return { w, h, a: toMarks, b, light, toCore, marks, core: { x: cx, y: y0, rings } };
  }

  // Tablet / mobile: below the actions, turning at the text edge and stepping back to the rail.
  const y0 = actions.bottom + 34;
  const px = Math.min(w * 0.42, copy.right - 200);
  const { toMarks, marks, bStart } = lead(y0, px, 0.85, 12);
  const xR = Math.max(bStart + R + 8, Math.min(copy.right, w - 20));
  const yL = y0 + 2 * R + 8;
  const rest =
    ` H ${f(xR - R)} A ${R} ${R} 0 0 1 ${f(xR)} ${f(y0 + R)}` +
    ` V ${f(yL - R)} A ${R} ${R} 0 0 1 ${f(xR - R)} ${f(yL)} H ${f(exitX + R)}` +
    ` A ${R} ${R} 0 0 0 ${f(exitX)} ${f(yL + R)} V ${f(h)}`;
  return {
    w,
    h,
    a: toMarks,
    b: `M ${f(bStart)} ${f(y0)}${rest}`,
    light: `${toMarks}${rest}`,
    toCore: toMarks,
    marks,
    core: null,
  };
}
