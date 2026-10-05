"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SignalGlyph } from "@/components/signal/SignalGlyph";
import { process } from "@/content/home";
import { DIM_LIME, SIGNAL } from "@/lib/signal";

const PERIOD = 4.5; // seconds per run
const TRAVEL = 0.7; // share of the cycle the light is moving

type Rail = { w: number; h: number; d: string; hits: number[] };

/**
 * Scene 3 — how Revivo works. One continuous rail runs through the four stages;
 * a light travels along it on a loop and each stage's signal lights up as the
 * light passes. Horizontal on desktop, vertical on phones. Paused off-screen.
 */
export function ProcessScene() {
  const listRef = useRef<HTMLOListElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [rail, setRail] = useState<Rail | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const box = list.getBoundingClientRect();
        const glyphs = Array.from(list.querySelectorAll<HTMLElement>("[data-step-glyph]")).map((g) => {
          const r = g.getBoundingClientRect();
          return { x: r.left - box.left + 12, y: r.top - box.top + r.height / 2 };
        });
        if (!glyphs.length) return;
        const horizontal = glyphs.length > 1 && Math.abs(glyphs[1].y - glyphs[0].y) < 4;
        if (horizontal) {
          const y = glyphs[0].y;
          setRail({
            w: box.width,
            h: box.height,
            d: `M 0 ${y} H ${box.width}`,
            hits: glyphs.map((g) => g.x / box.width),
          });
        } else {
          const x = glyphs[0].x;
          setRail({
            w: box.width,
            h: box.height,
            d: `M ${x} 0 V ${box.height}`,
            hits: glyphs.map((g) => g.y / box.height),
          });
        }
      });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // Pause off-screen.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const io = new IntersectionObserver(([e]) => list.classList.toggle("sig-paused", !e.isIntersecting));
    io.observe(list);
    return () => io.disconnect();
  }, []);

  const timing = (i: number) =>
    ({
      "--rail-period": `${PERIOD}s`,
      animationDelay: `${(rail?.hits[i] ?? i / 4) * PERIOD * TRAVEL}s`,
    }) as CSSProperties;

  return (
    <section id="how-we-work" aria-labelledby="process-heading" className="section-y">
      <div className="container-site">
        <p className="label text-subtle">How Revivo works</p>
        <h2 id="process-heading" className="text-title mt-3 max-w-3xl">
          {process.title}
        </h2>

        <ol ref={listRef} className="relative mt-10 grid gap-8 md:mt-12 lg:grid-cols-4 lg:gap-10">
          {rail && (
            <svg
              ref={svgRef}
              aria-hidden="true"
              focusable="false"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 ${rail.w} ${rail.h}`}
              fill="none"
              style={{ "--rail-period": `${PERIOD}s` } as CSSProperties}
            >
              <path d={rail.d} stroke={DIM_LIME} strokeWidth={SIGNAL.width} />
              <path
                className="rail-light"
                pathLength={1}
                d={rail.d}
                stroke={SIGNAL.color}
                strokeOpacity={0.3}
                strokeWidth={8}
                strokeLinecap="round"
              />
              <path
                className="rail-light"
                pathLength={1}
                d={rail.d}
                stroke={SIGNAL.color}
                strokeWidth={2.25}
                strokeLinecap="round"
              />
            </svg>
          )}
          {process.steps.map((step, i) => (
            <li key={step.name} className="relative flex gap-5 lg:flex-col lg:gap-4">
              <span data-step-glyph className="relative z-10 flex h-6 w-14 shrink-0 items-center bg-canvas">
                <SignalGlyph color={DIM_LIME} />
                <span className="rail-hit absolute inset-0 flex items-center" style={timing(i)}>
                  <SignalGlyph />
                </span>
              </span>
              <div>
                <h3 className="text-subtitle text-ink">{step.name}</h3>
                <p className="mt-1.5 max-w-xs text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
