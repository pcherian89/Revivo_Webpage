"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type RefObject } from "react";
import { useMediaQuery } from "@/components/ui/useMediaQuery";
import { useTabs } from "@/components/ui/useTabs";
import { explorer, zones } from "@/content/explorer";
import { cn } from "@/lib/cn";
import { orthogonal, SIGNAL, type Point } from "@/lib/signal";
import { signalBus } from "@/lib/signal-bus";
import { DomainPanel } from "./DomainPanel";
import { SignalNode } from "./SignalNode";
import { useAnchors } from "./useAnchors";
import { useTravel } from "./useTravel";

type Selection = { zone: number; cap: number } | null;

/**
 * Scene 2 — the domain explorer. The hero signal enters a central Revivo
 * Intelligence Layer and branches to four solution zones; the active zone
 * reveals its four capabilities; a capability opens a detail panel.
 * All meaningful content is HTML; the SVG only draws connections.
 */
export function DomainExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = Boolean(useReducedMotion());
  const isDesktop = useMediaQuery("(min-width: 64rem)");
  const { selected: zone, setSelected: setZone, getTabProps } = useTabs(zones.length);
  const [interacted, setInteracted] = useState(false);
  const [selection, setSelection] = useState<Selection>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const paths = useRef(new Map<string, SVGPathElement | null>());
  const { dotRef, travel } = useTravel(!reduce);
  const geo = useAnchors(sectionRef, `${zone}-${isDesktop}`);

  const zonePath = useCallback(
    (i: number) =>
      isDesktop
        ? [paths.current.get(`zone-${i}`)]
        : Array.from({ length: i + 1 }, (_, k) => paths.current.get(`zone-${k}`)),
    [isDesktop],
  );

  // Continue the hero signal once: entry → intelligence layer → first zone.
  const introDone = useRef(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduce || !geo) return;
    let visible = false;
    let heroDone = false;
    const go = () => {
      if (!visible || !heroDone || introDone.current) return;
      introDone.current = true;
      travel([paths.current.get("trunk"), ...zonePath(zone)], isDesktop ? 0.7 : 0.35);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        go();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    const off = signalBus.onHeroDone(() => {
      heroDone = true;
      go();
    });
    const fallback = window.setTimeout(() => {
      heroDone = true;
      go();
    }, 4500);
    return () => {
      io.disconnect();
      off();
      window.clearTimeout(fallback);
    };
  }, [geo, reduce, travel, zonePath, zone, isDesktop]);

  // Whenever the visitor changes zone (click, tap or arrow keys), the signal travels to it.
  const lastZone = useRef(zone);
  useEffect(() => {
    if (lastZone.current === zone) return;
    lastZone.current = zone;
    introDone.current = true;
    // Wait a frame so branch paths for the new layout exist.
    const raf = requestAnimationFrame(() => travel(zonePath(zone), isDesktop ? 0.6 : 0.25));
    return () => cancelAnimationFrame(raf);
  }, [zone, travel, zonePath, isDesktop]);

  const selectZone = (i: number) => {
    setInteracted(true);
    setZone(i);
  };

  const openCapability = (cap: number, e: MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setSelection({ zone, cap });
    travel([paths.current.get(`cap-${cap}`)], 0.45);
  };

  const closePanel = useCallback((restoreFocus = true) => {
    setSelection(null);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const discuss = useCallback(
    (capName: string) => {
      closePanel(false);
      window.dispatchEvent(
        new CustomEvent("revivo:prefill", { detail: `I'd like to discuss ${capName.toLowerCase()}: ` }),
      );
      requestAnimationFrame(() => {
        document.getElementById("start")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        window.setTimeout(
          () => document.getElementById("enquiry-fullName")?.focus({ preventScroll: true }),
          600,
        );
      });
    },
    [closePanel, reduce],
  );

  const activeCap = selection && selection.zone === zone ? selection.cap : -1;
  const setPath = (key: string) => (el: SVGPathElement | null) => {
    paths.current.set(key, el);
  };

  return (
    <section id="explore" ref={sectionRef} aria-labelledby="explore-heading" className="relative pb-6">
      {/* Signal entry points — the hero signal ends exactly here */}
      <span
        id="signal-entry-desktop"
        data-anchor="entry"
        aria-hidden="true"
        className="absolute top-0 left-1/2 hidden size-px lg:block"
      />
      <span
        id="signal-entry-mobile"
        data-anchor="entry"
        aria-hidden="true"
        className="absolute top-0 left-[31px] size-px md:left-[47px] lg:hidden"
      />

      {geo && (
        <SignalMap
          geo={geo}
          isDesktop={isDesktop}
          zone={zone}
          activeCap={activeCap}
          interacted={interacted}
          setPath={setPath}
          dotRef={dotRef}
        />
      )}

      <div className="relative z-10">
        {/* Heading (left of the central signal on desktop, right of the rail on mobile) */}
        <div className="container-site pt-12 md:pt-14">
          <div className="pl-[42px] md:pl-8 lg:w-[calc(50%-3rem)] lg:pl-0">
            <h2 id="explore-heading" className="text-title">
              {explorer.title}
            </h2>
            <p className="text-lead mt-4 text-muted">{explorer.intro}</p>
          </div>
        </div>

        {/* Intelligence layer */}
        <div className="mt-10 grid grid-cols-[62px_1fr] items-center pr-5 md:grid-cols-[94px_1fr] md:pr-10 lg:mt-12 lg:flex lg:flex-col lg:items-center lg:pr-0 lg:text-center">
          <div className="flex justify-center">
            <SignalNode anchor="layer" state="on" className="size-4" />
          </div>
          <div className="lg:mt-4">
            <p className="label text-ink">{explorer.layer.name}</p>
            <p className="text-small mt-1 text-subtle">{explorer.layer.detail}</p>
            <span
              data-anchor="layer-out"
              aria-hidden="true"
              className="mx-auto mt-3 hidden size-px lg:block"
            />
          </div>
        </div>

        {/* ---------- Desktop: zones as a typographic index, capabilities below ---------- */}
        <div className="container-site hidden lg:block">
          <div role="tablist" aria-label="Solution areas" className="mt-16 grid grid-cols-4 gap-8">
            {zones.map((z, i) => {
              const props = getTabProps(i, { tab: `zone-tab-${z.id}`, panel: "zone-panel" });
              const on = i === zone;
              return (
                <div key={z.id} className="flex flex-col items-center text-center">
                  <SignalNode anchor={`zone-in-${i}`} state={on ? "on" : "dim"} />
                  <button
                    {...props}
                    onClick={() => selectZone(i)}
                    onKeyDown={(e) => {
                      props.onKeyDown(e);
                      setInteracted(true);
                    }}
                    className={cn(
                      "text-subtitle mt-4 min-h-11 max-w-[14rem] transition-colors duration-200",
                      on ? "text-ink" : "text-subtle hover:text-muted",
                    )}
                  >
                    {z.name}
                  </button>
                  <p className={cn("text-small mt-2 max-w-[15rem]", on ? "text-muted" : "text-subtle/70")}>
                    {z.summary}
                  </p>
                  <span data-anchor={`zone-out-${i}`} aria-hidden="true" className="mt-4 block size-px" />
                </div>
              );
            })}
          </div>

          <div
            id="zone-panel"
            role="tabpanel"
            aria-labelledby={`zone-tab-${zones[zone].id}`}
            className="mt-20"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.ul
                key={zone}
                className="grid grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {zones[zone].capabilities.map((c, j) => (
                  <li key={c.id} className="flex flex-col items-center text-center">
                    <SignalNode anchor={`cap-${j}`} state={activeCap === j ? "on" : "dim"} />
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={(e) => openCapability(j, e)}
                      className={cn(
                        "group mt-4 flex min-h-11 max-w-[16rem] flex-col items-center gap-1 transition-colors duration-200",
                        activeCap === j ? "text-lime" : "text-ink hover:text-lime",
                      )}
                    >
                      <span className="text-lead font-medium">{c.name}</span>
                      <span className="text-small inline-flex items-center gap-1 text-subtle group-hover:text-lime">
                        View possibilities <ArrowRight aria-hidden="true" className="size-3.5" />
                      </span>
                    </button>
                    <span data-anchor={`cap-out-${j}`} aria-hidden="true" className="mt-3 block size-px" />
                  </li>
                ))}
              </m.ul>
            </AnimatePresence>
          </div>
        </div>

        {/* ---------- Mobile / tablet: a vertical rail with one open zone ---------- */}
        <ul className="mt-6 lg:hidden">
          {zones.map((z, i) => {
            const on = i === zone;
            return (
              <li key={z.id} className="grid grid-cols-[62px_1fr] pr-5 md:grid-cols-[94px_1fr] md:pr-10">
                <div className="flex justify-center pt-[1.35rem]">
                  <SignalNode anchor={`zone-in-${i}`} state={on ? "on" : "dim"} />
                </div>
                <div className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      id={`zone-acc-${z.id}`}
                      aria-expanded={on}
                      aria-controls={`zone-acc-panel-${z.id}`}
                      onClick={() => selectZone(i)}
                      className={cn(
                        "text-subtitle flex min-h-16 w-full items-center py-3 text-left",
                        on ? "text-ink" : "text-subtle",
                      )}
                    >
                      {z.name}
                    </button>
                  </h3>
                  {on && (
                    <m.div
                      id={`zone-acc-panel-${z.id}`}
                      role="region"
                      aria-labelledby={`zone-acc-${z.id}`}
                      initial={interacted ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="pb-5"
                    >
                      <p className="text-small text-muted">{z.summary}</p>
                      <ul className="mt-3">
                        {z.capabilities.map((c, j) => (
                          <li key={c.id}>
                            <button
                              type="button"
                              aria-haspopup="dialog"
                              onClick={(e) => openCapability(j, e)}
                              className={cn(
                                "flex min-h-12 w-full items-center gap-3 py-2 text-left",
                                activeCap === j ? "text-lime" : "text-ink",
                              )}
                            >
                              <SignalNode anchor={`cap-${j}`} state={activeCap === j ? "on" : "dim"} />
                              <span className="flex-1 font-medium">{c.name}</span>
                              <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-subtle" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Reconvergence: the branches gather into one outgoing line */}
        <div className="mt-12 grid grid-cols-[62px_1fr] items-center pr-5 md:grid-cols-[94px_1fr] lg:mt-16 lg:flex lg:justify-center lg:pr-0">
          <div className="flex justify-center">
            <SignalNode anchor="converge" state="on" className="size-2.5" />
          </div>
          <p className="label text-muted lg:ml-4">{explorer.converge}</p>
        </div>
        <div className="container-site">
          <p className="text-small mt-6 pl-[42px] text-subtle md:pl-8 lg:mx-auto lg:max-w-xl lg:pl-0 lg:text-center">
            {explorer.qualifier}
          </p>
        </div>
      </div>

      <DomainPanel
        selection={selection}
        isDesktop={isDesktop}
        onClose={closePanel}
        onSwitch={(cap) => selection && setSelection({ zone: selection.zone, cap })}
        onDiscuss={discuss}
      />
    </section>
  );
}

/* ------------------------------------------------------------------------ */

function SignalMap({
  geo,
  isDesktop,
  zone,
  activeCap,
  interacted,
  setPath,
  dotRef,
}: {
  geo: { w: number; h: number; pts: Record<string, Point> };
  isDesktop: boolean;
  zone: number;
  activeCap: number;
  interacted: boolean;
  setPath: (key: string) => (el: SVGPathElement | null) => void;
  dotRef: RefObject<SVGGElement | null>;
}) {
  const p = geo.pts;
  if (!p.entry || !p.layer || !p.converge) return null;

  const zoneBranches = zones.map((_, i) => {
    const target = p[`zone-in-${i}`];
    if (!target) return null;
    const from = isDesktop ? (p["layer-out"] ?? p.layer) : i === 0 ? p.layer : p[`zone-in-${i - 1}`];
    const lit = isDesktop ? i === zone : i <= zone;
    return { key: `zone-${i}`, d: orthogonal(from, target), lit };
  });

  const capFrom = isDesktop ? p[`zone-out-${zone}`] : p[`zone-in-${zone}`];
  const capBranches = zones[zone].capabilities.map((_, j) => {
    const target = p[`cap-${j}`];
    if (!capFrom || !target) return null;
    return { key: `cap-${j}`, d: orthogonal(capFrom, target), lit: j === activeCap };
  });

  const lastZone = p[`zone-in-${zones.length - 1}`];
  const converge = isDesktop
    ? zones[zone].capabilities
        .map((_, j) => p[`cap-out-${j}`])
        .filter(Boolean)
        .map((a) => orthogonal(a, p.converge))
    : lastZone
      ? [orthogonal(lastZone, p.converge)]
      : [];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      width={geo.w}
      height={geo.h}
      fill="none"
      strokeLinecap="round"
    >
      {/* Quiet reconvergence and the small outgoing line */}
      {converge.map((d, i) => (
        <path key={`cv-${i}`} d={d} stroke={SIGNAL.quiet} strokeWidth={1.25} />
      ))}
      <path
        d={`M ${p.converge.x} ${p.converge.y} V ${p.converge.y + (isDesktop ? 22 : 40)}`}
        stroke={SIGNAL.quiet}
        strokeWidth={1.25}
      />

      {/* Trunk: hero signal → intelligence layer */}
      <path
        d={orthogonal(p.entry, p.layer)}
        stroke={SIGNAL.color}
        strokeOpacity={SIGNAL.glowOpacity}
        strokeWidth={SIGNAL.glowWidth}
      />
      <path
        ref={setPath("trunk")}
        d={orthogonal(p.entry, p.layer)}
        stroke={SIGNAL.color}
        strokeWidth={SIGNAL.width}
      />

      {/* Zone branches: the selected branch illuminates, others stay visible but dim */}
      {zoneBranches.map(
        (b) =>
          b && (
            <g key={b.key}>
              {b.lit && (
                <path
                  d={b.d}
                  stroke={SIGNAL.color}
                  strokeOpacity={SIGNAL.glowOpacity}
                  strokeWidth={SIGNAL.glowWidth}
                />
              )}
              <m.path
                ref={setPath(b.key)}
                d={b.d}
                stroke={SIGNAL.color}
                strokeWidth={SIGNAL.width}
                initial={false}
                animate={{ strokeOpacity: b.lit ? 1 : 0.22 }}
                transition={{ duration: 0.35 }}
              />
            </g>
          ),
      )}

      {/* Capability branches for the active zone */}
      {capBranches.map(
        (b) =>
          b && (
            <m.path
              key={`${zone}-${b.key}`}
              ref={setPath(b.key)}
              d={b.d}
              stroke={SIGNAL.color}
              strokeWidth={b.lit ? SIGNAL.width : 1.25}
              initial={interacted ? { pathLength: 0, strokeOpacity: 0.5 } : false}
              animate={{ pathLength: 1, strokeOpacity: b.lit ? 1 : 0.5 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            />
          ),
      )}

      {/* The single moving signal point */}
      <g ref={dotRef} style={{ opacity: 0 }} transform={`translate(${p.layer.x} ${p.layer.y})`}>
        <circle r={SIGNAL.haloRadius} fill={SIGNAL.color} opacity={0.18} />
        <circle r={SIGNAL.dotRadius} fill={SIGNAL.color} />
      </g>
    </svg>
  );
}
