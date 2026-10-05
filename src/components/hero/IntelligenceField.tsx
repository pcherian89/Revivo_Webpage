"use client";

import { m, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { intelligenceField } from "@/content/home";
import { buildCompactGeometry, buildWideGeometry, type FieldGeometry } from "./fieldGeometry";

type ActiveState = { id: string; pinned: boolean } | null;

const COLORS = {
  line: "#3A453B",
  lineSoft: "#252E26",
  node: "#171D18",
  label: "#A4AE9F",
  ink: "#F4F5EF",
  lime: "#CCFF00",
};

/** Formation timeline (ms). Total ≈ 2.4s, then the field settles. */
const T = {
  nodeIn: (i: number) => 100 + i * 45,
  inDraw: (i: number) => 450 + i * 50,
  inSignal: (i: number) => 700 + i * 50,
  outDraw: (j: number) => 1350 + j * 60,
  outSignal: (j: number) => 1500 + j * 60,
  outFade: (j: number) => 1550 + j * 60,
};

/** Ambient pulses: input index → output index, delay in seconds. */
const AMBIENT = [
  { input: 0, output: 4, delay: 3 },
  { input: 7, output: 2, delay: 10 },
];

const INPUT_LABELS = intelligenceField.inputs.map((n) => n.label);
const WIDE = buildWideGeometry(INPUT_LABELS, intelligenceField.outputs);
const COMPACT = buildCompactGeometry(INPUT_LABELS, intelligenceField.outputs);

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/**
 * The Revivo Intelligence Field — the hero's signature moment.
 * Disconnected nodes align, connect through a central Revivo core and
 * resolve into structured outputs, then settle into a near-still state.
 */
export function IntelligenceField() {
  const [active, setActive] = useState<ActiveState>(null);
  const [paused, setPaused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Restrained pointer depth (desktop, fine pointers only): a few pixels at most.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 22, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 80, damping: 22, mass: 0.6 });

  // Pause ambient animation and pointer tracking while the hero is off-screen.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const fine = window.matchMedia("(pointer: fine) and (min-width: 80rem)");
    if (!fine.matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, paused, px, py]);

  const activeNode = intelligenceField.inputs.find((n) => n.id === active?.id);

  const handlers = {
    enter: (id: string) => setActive((a) => (a?.pinned ? a : { id, pinned: false })),
    leave: (id: string) => setActive((a) => (a && !a.pinned && a.id === id ? null : a)),
    toggle: (id: string) => setActive((a) => (a?.id === id && a.pinned ? null : { id, pinned: true })),
  };

  return (
    <div ref={wrapperRef} className="field relative" data-paused={paused ? "true" : "false"}>
      <div className="mx-auto max-w-[28rem] xl:hidden">
        <FieldSvg geometry={COMPACT} variant="compact" active={active} handlers={handlers} />
      </div>
      <div className="hidden xl:block">
        <FieldSvg geometry={WIDE} variant="wide" active={active} handlers={handlers} sx={sx} sy={sy} />
      </div>

      <div className="mt-4 flex min-h-12 items-start gap-3 border-t border-line pt-3 xl:ml-[10%]">
        <span className="text-label shrink-0 pt-0.5 text-subtle" aria-hidden="true">
          Readout
        </span>
        <p className="text-sm text-muted" aria-live="polite">
          {activeNode ? (
            <>
              <span className="font-mono text-xs tracking-[0.12em] text-ink uppercase">
                {activeNode.label}
              </span>
              <span aria-hidden="true" className="text-lime">
                {" "}
                →{" "}
              </span>
              <span className="sr-only">: </span>
              {activeNode.example}
            </>
          ) : (
            "Select a node to see an example of what Revivo could connect."
          )}
        </p>
      </div>
    </div>
  );
}

type Handlers = {
  enter: (id: string) => void;
  leave: (id: string) => void;
  toggle: (id: string) => void;
};

type FieldSvgProps = {
  geometry: FieldGeometry;
  variant: "wide" | "compact";
  active: ActiveState;
  handlers: Handlers;
  sx?: MotionValue<number>;
  sy?: MotionValue<number>;
};

function FieldSvg({ geometry: g, variant, active, handlers, sx, sy }: FieldSvgProps) {
  const rawId = useId();
  const uid = `f${rawId.replace(/[^a-zA-Z0-9]/g, "")}${variant}`;
  const zero = useMotionValue(0);

  // Grid drifts opposite to the network for a hint of depth (max ±3px / ±6px).
  const gridX = useTransform(sx ?? zero, (v) => v * -3);
  const gridY = useTransform(sy ?? zero, (v) => v * -3);
  const netX = useTransform(sx ?? zero, (v) => v * 6);
  const netY = useTransform(sy ?? zero, (v) => v * 4);

  const { core } = g;
  const onKey = (id: string) => (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlers.toggle(id);
    }
  };

  return (
    <svg
      viewBox={`0 0 ${g.width} ${g.height}`}
      className="block h-auto w-full overflow-visible"
      role="group"
      aria-label="Revivo Intelligence Field: athlete, coach, member, video, venue, event, revenue and safety information connect through a Revivo core into workflow, insight, alert, decision and action."
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: g.fontSize,
        letterSpacing: "0.1em",
        fontVariantLigatures: "none",
        fontFeatureSettings: '"calt" 0, "liga" 0',
      }}
    >
      <defs>
        <radialGradient id={`${uid}-fade`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${uid}-mask`}>
          <rect x="0" y="0" width={g.width} height={g.height} fill={`url(#${uid}-fade)`} />
        </mask>
        <pattern id={`${uid}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={COLORS.ink} strokeOpacity="0.07" />
        </pattern>
      </defs>

      {/* Background grid, faded at the edges with an SVG mask */}
      <m.g style={{ x: gridX, y: gridY }} aria-hidden="true">
        <rect
          x="0"
          y="0"
          width={g.width}
          height={g.height}
          fill={`url(#${uid}-grid)`}
          mask={`url(#${uid}-mask)`}
        />
        {variant === "wide" && (
          <g fill={COLORS.label} opacity="0.7" style={{ fontSize: 10 }}>
            <text x="20" y="18">
              IN / {String(g.inputs.length).padStart(2, "0")}
            </text>
            <text x={g.width - 20} y="18" textAnchor="end">
              OUT / {String(g.outputs.length).padStart(2, "0")}
            </text>
            <text x={core.x} y={core.y + 78} textAnchor="middle">
              REVIVO CORE
            </text>
          </g>
        )}
      </m.g>

      <m.g style={{ x: netX, y: netY }}>
        {/* Output links (drawn first so nodes sit above them) */}
        <g aria-hidden="true">
          {g.outputs.map((o, j) => (
            <g key={`out-link-${j}`}>
              <path
                className="field-draw"
                pathLength={1}
                d={o.path}
                fill="none"
                stroke={COLORS.line}
                strokeWidth="1"
                style={vars({ "--d": `${T.outDraw(j)}ms` })}
              />
              <path
                className="field-signal"
                pathLength={1}
                d={o.path}
                fill="none"
                stroke={COLORS.lime}
                strokeWidth="1.5"
                style={vars({ "--d": `${T.outSignal(j)}ms`, animationDuration: "700ms" })}
              />
              {AMBIENT.filter((a) => a.output === j).map((a) => (
                <path
                  key={`amb-out-${j}`}
                  className="field-ambient"
                  pathLength={1}
                  d={o.path}
                  fill="none"
                  stroke={COLORS.lime}
                  strokeWidth="1.5"
                  style={vars({ "--d": `${a.delay + 1.6}s` })}
                />
              ))}
            </g>
          ))}
        </g>

        {/* Input nodes + links. Each node is focusable and reveals one example. */}
        {g.inputs.map((p, i) => {
          const node = intelligenceField.inputs[i];
          const isActive = active?.id === node.id;
          return (
            <g
              key={node.id}
              className="field-hit"
              data-active={isActive ? "true" : "false"}
              tabIndex={0}
              role="button"
              aria-pressed={isActive && !!active?.pinned}
              aria-label={`${node.label}: ${node.example}`}
              onMouseEnter={() => handlers.enter(node.id)}
              onMouseLeave={() => handlers.leave(node.id)}
              onFocus={() => handlers.enter(node.id)}
              onBlur={() => handlers.leave(node.id)}
              onClick={() => handlers.toggle(node.id)}
              onKeyDown={onKey(node.id)}
            >
              <path
                className="field-link field-draw"
                pathLength={1}
                d={p.path}
                fill="none"
                stroke={COLORS.line}
                strokeWidth="1"
                style={vars({ "--d": `${T.inDraw(i)}ms` })}
              />
              <path
                className="field-signal"
                pathLength={1}
                d={p.path}
                fill="none"
                stroke={COLORS.lime}
                strokeWidth="1.5"
                style={vars({ "--d": `${T.inSignal(i)}ms` })}
              />
              {AMBIENT.filter((a) => a.input === i).map((a) => (
                <path
                  key={`amb-in-${i}`}
                  className="field-ambient"
                  pathLength={1}
                  d={p.path}
                  fill="none"
                  stroke={COLORS.lime}
                  strokeWidth="1.5"
                  style={vars({ "--d": `${a.delay}s` })}
                />
              ))}
              <g
                className="field-node-shift"
                style={vars({ "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--d": `${T.nodeIn(i)}ms` })}
              >
                {/* Generous invisible hit area for touch */}
                <rect
                  className="field-focus-ring"
                  x={p.hit.x}
                  y={p.hit.y}
                  width={p.hit.w}
                  height={p.hit.h}
                  fill="transparent"
                  stroke="transparent"
                  strokeWidth="1"
                  rx="2"
                />
                <rect
                  className="field-node-box"
                  x={p.x - 4}
                  y={p.y - 4}
                  width="8"
                  height="8"
                  fill={COLORS.node}
                  stroke={COLORS.label}
                  strokeWidth="1"
                />
                <text
                  className="field-node-label"
                  x={p.labelX}
                  y={p.labelY}
                  textAnchor={p.anchor}
                  fill={COLORS.label}
                >
                  {node.label.toUpperCase()}
                </text>
              </g>
            </g>
          );
        })}

        {/* Central Revivo intelligence core */}
        <g aria-hidden="true" transform={`translate(${core.x} ${core.y})`}>
          <circle className="field-pulse" r="40" fill="none" stroke={COLORS.lime} strokeWidth="1" />
          <g className="field-core">
            <circle r="46" fill="none" stroke={COLORS.line} strokeDasharray="2 5" />
            <rect
              x="-17"
              y="-17"
              width="34"
              height="34"
              transform="rotate(45)"
              fill={COLORS.node}
              stroke={COLORS.ink}
              strokeWidth="1"
            />
            <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" fill={COLORS.line} />
            <rect
              className="field-core-on"
              x="-6"
              y="-6"
              width="12"
              height="12"
              transform="rotate(45)"
              fill={COLORS.lime}
            />
          </g>
        </g>

        {/* Structured outputs */}
        <g aria-hidden="true">
          {g.outputs.map((o, j) => (
            <g key={`out-${j}`} className="field-fade" style={vars({ "--d": `${T.outFade(j)}ms` })}>
              <rect x={o.x - 4} y={o.y - 4} width="8" height="8" fill={COLORS.lime} />
              <text x={o.labelX} y={o.labelY} textAnchor={o.anchor} fill={COLORS.ink}>
                {intelligenceField.outputs[j].toUpperCase()}
              </text>
            </g>
          ))}
        </g>
      </m.g>
    </svg>
  );
}
