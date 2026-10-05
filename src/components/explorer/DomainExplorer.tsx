"use client";

import { m, useReducedMotion } from "motion/react";
import { ArrowRight, Pointer } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type RefObject,
} from "react";
import { useMediaQuery } from "@/components/ui/useMediaQuery";
import { explorer, zones } from "@/content/explorer";
import { cn } from "@/lib/cn";
import { DIM_LIME, MID_LIME, orthogonal, SIGNAL, type Point } from "@/lib/signal";
import { flash, signalClock } from "@/lib/signal-clock";
import { moveSpot, Perforation } from "@/components/signal/Perforation";
import { DomainPanel } from "./DomainPanel";
import { SignalNode } from "./SignalNode";
import { useAnchors } from "./useAnchors";
import { useTravel } from "./useTravel";

type Selection = { zone: number; cap: number } | null;

const STEP = 0.42; // seconds for each pulse to reach a new node
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// true after hydration; false on the server (so the server HTML shows everything)
const subscribeNoop = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

/**
 * Scene 2 — the interactive explorer.
 * 1. The Revivo Intelligence Layer waits to be activated (tap / click / Enter).
 * 2. Activating it sends a pulse to each of the four domains in turn.
 * 3. Choosing a domain sends a pulse to each of its four capabilities in turn.
 * 4. A capability opens a detail panel.
 * Without JavaScript (and for search engines) everything is shown at once.
 */
export function DomainExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = Boolean(useReducedMotion());
  const isDesktop = useMediaQuery("(min-width: 64rem)");
  const hydrated = useHydrated();

  const [activated, setActivated] = useState(false);
  const [drawnZones, setDrawnZones] = useState(0); // branches drawing / drawn
  const [shownZones, setShownZones] = useState(0); // domains introduced
  const [zone, setZone] = useState<number | null>(null);
  const [drawnCaps, setDrawnCaps] = useState(0);
  const [shownCaps, setShownCaps] = useState(0);
  const [selection, setSelection] = useState<Selection>(null);

  const triggerRef = useRef<HTMLElement | null>(null);
  const coreRef = useRef<HTMLButtonElement>(null);
  const coreNodeRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const paths = useRef(new Map<string, SVGPathElement | null>());
  const runId = useRef(0);
  const { dotRef, travel } = useTravel(!reduce);
  const geo = useAnchors(sectionRef, `${zone}-${isDesktop}-${activated}`);

  // Server / no-JS: show the whole map statically.
  const staticAll = !hydrated;
  const zonesVisible = staticAll ? zones.length : shownZones;
  const capsVisible = staticAll ? 4 : shownCaps;
  const openZone = staticAll ? 0 : zone;
  const mapOpen = staticAll || activated; // domains exist in the layout only once activated

  const chooseZone = useCallback(
    async (i: number) => {
      if (i === zone) return;
      const id = ++runId.current;
      setDrawnZones(4);
      setShownZones(4);
      setZone(i);
      setDrawnCaps(0);
      setShownCaps(0);
      if (reduce) {
        setDrawnCaps(4);
        setShownCaps(4);
        return;
      }
      await wait(140); // let the new capability anchors render and be measured
      for (let j = 0; j < 4; j++) {
        if (id !== runId.current) return;
        setDrawnCaps(j + 1);
        await travel([paths.current.get(`cap-${j}`)], STEP * 0.85);
        setShownCaps(j + 1);
      }
    },
    [zone, reduce, travel],
  );

  const activate = useCallback(async () => {
    if (activated) return;
    const id = ++runId.current;
    setActivated(true);
    if (reduce) {
      setDrawnZones(4);
      setShownZones(4);
      chooseZone(0);
      return;
    }
    await wait(140); // let the domain anchors render and be measured
    for (let i = 0; i < zones.length; i++) {
      if (id !== runId.current) return;
      setDrawnZones(i + 1);
      await travel([paths.current.get(`zone-${i}`)], STEP);
      setShownZones(i + 1);
    }
    // One tap gives a full first view: the pulse carries on into the first area.
    if (id === runId.current) chooseZone(0);
  }, [activated, reduce, travel, chooseZone]);

  const openCapability = (cap: number, e: MouseEvent<HTMLButtonElement>) => {
    if (openZone === null) return;
    triggerRef.current = e.currentTarget;
    setSelection({ zone: openZone, cap });
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

  // The hero light continues down the trunk and lights the Intelligence Layer on arrival.
  useEffect(() => {
    const section = sectionRef.current;
    const light = paths.current.get("trunk-light");
    const glow = paths.current.get("trunk-glow");
    if (!section || !light || !glow || !geo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const length = light.getTotalLength();
    signalClock.set({
      key: "trunk",
      order: 1,
      paths: [glow, light],
      length,
      events: [
        {
          at: length - 2,
          fire: () => {
            if (!window.matchMedia("(min-width: 64rem)").matches) {
              flash(coreNodeRef.current, [{ transform: "scale(1.8)" }, { transform: "scale(1)" }], 700);
              return;
            }
            flash(
              coreRef.current,
              [
                {
                  boxShadow: "0 0 0 0 rgba(204, 255, 0, 0.55), 0 0 36px rgba(204, 255, 0, 0.35)",
                  backgroundColor: "rgba(204, 255, 0, 0.14)",
                },
                {
                  boxShadow: "0 0 0 26px rgba(204, 255, 0, 0), 0 0 0 rgba(204, 255, 0, 0)",
                  backgroundColor: "rgba(17, 17, 19, 1)",
                },
              ],
              1200,
            );
          },
        },
      ],
      onMove: (pt) => moveSpot(spotRef.current, pt),
    });
    const io = new IntersectionObserver(([e]) => signalClock.setVisible("trunk", e.isIntersecting));
    io.observe(section);
    return () => {
      io.disconnect();
      signalClock.remove("trunk");
    };
  }, [geo]);

  // Stop any running sequence when unmounting.
  useEffect(
    () => () => {
      runId.current++;
    },
    [],
  );

  const activeCap = selection && selection.zone === openZone ? selection.cap : -1;
  const setPath = (key: string) => (el: SVGPathElement | null) => {
    paths.current.set(key, el);
  };
  const hint =
    !activated && !staticAll ? explorer.layer.activate : openZone === null ? explorer.layer.chooseZone : null;

  return (
    <section id="explore" ref={sectionRef} aria-labelledby="explore-heading" className="relative pb-4">
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

      {geo && <Perforation mask={textureMask(geo.pts, isDesktop)} spotRef={spotRef} />}
      {geo && (
        <SignalMap
          geo={geo}
          isDesktop={isDesktop}
          zone={openZone}
          drawnZones={staticAll ? 4 : drawnZones}
          drawnCaps={staticAll ? 4 : drawnCaps}
          activeCap={activeCap}
          animate={hydrated && !reduce}
          setPath={setPath}
          dotRef={dotRef}
        />
      )}

      <div className="relative z-10">
        {/* Heading */}
        <div className="container-site pt-10 md:pt-12">
          <div className="pl-[42px] md:pl-8 lg:w-[calc(50%-3rem)] lg:pl-0">
            <h2 id="explore-heading" className="text-title">
              {explorer.title}
            </h2>
            <p className="text-lead mt-3 text-muted">{explorer.intro}</p>
          </div>
        </div>

        {/* The Revivo Intelligence Layer — the thing to touch */}
        <div className="mt-10 grid grid-cols-[62px_1fr] items-center pr-5 md:grid-cols-[94px_1fr] md:pr-10 lg:mt-12 lg:flex lg:flex-col lg:items-center lg:pr-0">
          <div ref={coreNodeRef} className="flex justify-center lg:hidden">
            <SignalNode anchor="core" state="on" />
          </div>
          <div className="flex flex-col lg:items-center">
            <span data-anchor="core-in" aria-hidden="true" className="hidden size-px lg:block" />
            <button
              ref={coreRef}
              type="button"
              onClick={activate}
              aria-expanded={staticAll || activated}
              aria-controls="explore-domains"
              disabled={staticAll}
              className={cn(
                "group relative flex items-center gap-4 text-left transition-colors duration-300 lg:size-56 lg:flex-col lg:justify-center lg:gap-2 lg:rounded-full lg:border lg:text-center",
                activated || staticAll
                  ? "cursor-default lg:border-lime/50 lg:bg-lime/[0.06]"
                  : "lg:border-lime/40 lg:bg-raised hover:lg:border-lime",
              )}
            >
              <span className="flex flex-col">
                <span className="text-subtitle text-ink lg:mx-auto lg:max-w-[9ch] lg:text-[1.75rem] lg:leading-none">
                  {explorer.layer.name}
                </span>
                <span className="text-small mt-1.5 text-subtle lg:mt-2 lg:max-w-[19ch] lg:self-center">
                  {explorer.layer.detail}
                </span>
              </span>
              {!activated && !staticAll && (
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border border-lime/50 text-lime lg:absolute lg:-right-3 lg:-bottom-3 lg:bg-canvas"
                >
                  <Pointer className="size-5" />
                </span>
              )}
            </button>
            <span data-anchor="core-out" aria-hidden="true" className="hidden size-px lg:mt-3 lg:block" />
          </div>
        </div>
        {hint && (
          <p
            className="label mt-4 pl-[62px] text-lime md:pl-[94px] lg:mt-3 lg:pl-0 lg:text-center"
            aria-live="polite"
          >
            {hint}
          </p>
        )}

        {/* ---------- Desktop: domains appear one by one, then capabilities ---------- */}
        <div id="explore-domains" className="container-site hidden lg:block">
          {mapOpen && (
            <ul className="mt-14 grid grid-cols-4 gap-8">
              {zones.map((z, i) => {
                const visible = i < zonesVisible;
                const on = i === openZone;
                return (
                  <li key={z.id} className="flex flex-col items-center text-center">
                    <m.div
                      className="flex flex-col items-center"
                      initial={false}
                      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
                      transition={{ duration: 0.35 }}
                      inert={!visible}
                    >
                      <SignalNode anchor={`zone-in-${i}`} state={on ? "on" : visible ? "dim" : "off"} />
                      <button
                        type="button"
                        aria-expanded={on}
                        aria-controls="explore-caps"
                        onClick={() => chooseZone(i)}
                        className={cn(
                          "text-subtitle mt-3 min-h-11 max-w-[13rem] rounded-full px-2 transition-colors duration-200",
                          on ? "text-ink" : "text-muted hover:text-ink",
                        )}
                      >
                        {z.name}
                      </button>
                      <p className={cn("text-small mt-1 max-w-[14rem]", on ? "text-muted" : "text-subtle")}>
                        {z.summary}
                      </p>
                      <span data-anchor={`zone-out-${i}`} aria-hidden="true" className="mt-3 block size-px" />
                    </m.div>
                  </li>
                );
              })}
            </ul>
          )}

          <div id="explore-caps" className={cn(openZone !== null && "mt-14")}>
            {openZone !== null && (
              <ul key={openZone} className="grid grid-cols-4 gap-8">
                {zones[openZone].capabilities.map((c, j) => {
                  const visible = j < capsVisible;
                  return (
                    <li key={c.id} className="flex flex-col items-center text-center">
                      <m.div
                        className="flex flex-col items-center"
                        initial={false}
                        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
                        transition={{ duration: 0.3 }}
                        inert={!visible}
                      >
                        <SignalNode
                          anchor={`cap-${j}`}
                          state={activeCap === j ? "on" : visible ? "dim" : "off"}
                        />
                        <button
                          type="button"
                          aria-haspopup="dialog"
                          onClick={(e) => openCapability(j, e)}
                          className={cn(
                            "group mt-3 flex min-h-11 max-w-[15rem] flex-col items-center gap-1 rounded-lg px-2 transition-colors duration-200",
                            activeCap === j ? "text-lime" : "text-ink hover:text-lime",
                          )}
                        >
                          <span className="font-medium">{c.name}</span>
                          <span className="text-small inline-flex items-center gap-1 text-subtle group-hover:text-lime">
                            View possibilities <ArrowRight aria-hidden="true" className="size-3.5" />
                          </span>
                        </button>
                        <span
                          data-anchor={`cap-out-${j}`}
                          aria-hidden="true"
                          className="mt-2 block size-px"
                        />
                      </m.div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* ---------- Mobile / tablet: the same story down a vertical rail ---------- */}
        {mapOpen && (
          <ul className="mt-4 lg:hidden">
            {zones.map((z, i) => {
              const visible = i < zonesVisible;
              const on = i === openZone;
              return (
                <m.li
                  key={z.id}
                  className="grid grid-cols-[62px_1fr] pr-5 md:grid-cols-[94px_1fr] md:pr-10"
                  initial={false}
                  animate={{ opacity: visible ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  inert={!visible}
                >
                  <div className="flex justify-center pt-[1.15rem]">
                    <SignalNode anchor={`zone-in-${i}`} state={on ? "on" : visible ? "dim" : "off"} />
                  </div>
                  <div className="border-b border-line">
                    <h3>
                      <button
                        type="button"
                        id={`zone-acc-${z.id}`}
                        aria-expanded={on}
                        aria-controls={`zone-acc-panel-${z.id}`}
                        onClick={() => chooseZone(i)}
                        className={cn(
                          "text-subtitle flex min-h-14 w-full items-center py-2 text-left",
                          on ? "text-ink" : "text-muted",
                        )}
                      >
                        {z.name}
                      </button>
                    </h3>
                    {on && (
                      <div
                        id={`zone-acc-panel-${z.id}`}
                        role="region"
                        aria-labelledby={`zone-acc-${z.id}`}
                        className="pb-4"
                      >
                        <p className="text-small text-muted">{z.summary}</p>
                        <ul className="mt-2">
                          {z.capabilities.map((c, j) => {
                            const capVisible = j < capsVisible;
                            return (
                              <m.li
                                key={c.id}
                                initial={false}
                                animate={{ opacity: capVisible ? 1 : 0 }}
                                transition={{ duration: 0.25 }}
                                inert={!capVisible}
                              >
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
                              </m.li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </m.li>
              );
            })}
          </ul>
        )}

        {/* Qualifier */}
        <div className="container-site">
          <p className="text-small mt-10 pl-[42px] text-subtle md:pl-8 lg:mx-auto lg:max-w-xl lg:pl-0 lg:text-center">
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
  drawnZones,
  drawnCaps,
  activeCap,
  animate,
  setPath,
  dotRef,
}: {
  geo: { w: number; h: number; pts: Record<string, Point> };
  isDesktop: boolean;
  zone: number | null;
  drawnZones: number;
  drawnCaps: number;
  activeCap: number;
  animate: boolean;
  setPath: (key: string) => (el: SVGPathElement | null) => void;
  dotRef: RefObject<SVGGElement | null>;
}) {
  const p = geo.pts;
  const core = isDesktop ? p["core-in"] : p.core;
  const coreOut = isDesktop ? p["core-out"] : p.core;
  if (!p.entry || !core || !coreOut) return null;

  // One shared bus height per parent → a clean, symmetric tree.
  const zoneTargets = zones.map((_, i) => p[`zone-in-${i}`]).filter(Boolean);
  const zoneBus = zoneTargets.length
    ? coreOut.y + (Math.min(...zoneTargets.map((t) => t.y)) - coreOut.y) / 2
    : undefined;

  const zoneBranches = zones
    .map((_, i) => {
      const target = p[`zone-in-${i}`];
      if (!target) return null;
      const from = isDesktop ? coreOut : i === 0 ? coreOut : p[`zone-in-${i - 1}`];
      const lit = zone === null ? null : isDesktop ? i === zone : i <= zone;
      return {
        key: `zone-${i}`,
        d: orthogonal(from, target, isDesktop ? zoneBus : undefined),
        drawn: i < drawnZones,
        color: lit === null ? MID_LIME : lit ? SIGNAL.color : DIM_LIME,
        order: lit ? 2 : lit === null ? 1 : 0,
      };
    })
    .filter((b) => b !== null)
    .sort((a, b) => a.order - b.order);

  const capFrom = zone === null ? null : isDesktop ? p[`zone-out-${zone}`] : p[`zone-in-${zone}`];
  const capTargets = zone === null ? [] : [0, 1, 2, 3].map((j) => p[`cap-${j}`]).filter(Boolean);
  const capBus =
    capFrom && capTargets.length
      ? capFrom.y + (Math.min(...capTargets.map((t) => t.y)) - capFrom.y) / 2
      : undefined;
  const capBranches =
    zone === null || !capFrom
      ? []
      : [0, 1, 2, 3]
          .map((j) => {
            const target = p[`cap-${j}`];
            if (!target) return null;
            const lit = j === activeCap;
            return {
              key: `cap-${j}`,
              d: orthogonal(capFrom, target, capBus, isDesktop ? SIGNAL.radius : 12),
              drawn: j < drawnCaps,
              color: lit ? SIGNAL.color : MID_LIME,
              order: lit ? 1 : 0,
            };
          })
          .filter((b) => b !== null)
          .sort((a, b) => a.order - b.order);

  const draw = (on: boolean, dur = 0.42) => ({
    initial: animate ? { pathLength: 0 } : false,
    animate: { pathLength: on ? 1 : 0 },
    transition: { duration: animate ? dur : 0, ease: [0.45, 0, 0.2, 1] as const },
  });
  const trunk = orthogonal(p.entry, core);

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
      {/* Trunk: the hero signal continues into the Intelligence Layer */}
      <path d={trunk} stroke={DIM_LIME} strokeWidth={SIGNAL.width} />
      <path
        ref={setPath("trunk-glow")}
        className="sig-light"
        d={trunk}
        stroke={SIGNAL.color}
        strokeOpacity={0.28}
        strokeWidth={8}
      />
      <path
        ref={setPath("trunk-light")}
        className="sig-light"
        d={trunk}
        stroke={SIGNAL.color}
        strokeWidth={2.25}
      />

      {/* Domain branches: introduced one at a time; the chosen route stays bright */}
      {zoneBranches.map((b) => (
        <m.path
          key={b.key}
          ref={setPath(b.key)}
          d={b.d}
          stroke={b.color}
          strokeWidth={SIGNAL.width}
          {...draw(b.drawn)}
        />
      ))}

      {/* Capability branches for the chosen domain */}
      {capBranches.map((b) => (
        <m.path
          key={`${zone}-${b.key}`}
          ref={setPath(b.key)}
          d={b.d}
          stroke={b.color}
          strokeWidth={SIGNAL.width}
          {...draw(b.drawn, 0.36)}
        />
      ))}

      {/* The single moving pulse */}
      <g ref={dotRef} style={{ opacity: 0 }} transform={`translate(${coreOut.x} ${coreOut.y})`}>
        <circle r={SIGNAL.haloRadius + 3} fill={SIGNAL.color} opacity={0.16} />
        <circle r={SIGNAL.dotRadius + 0.5} fill={SIGNAL.color} />
      </g>
    </svg>
  );
}

/** The perforated texture gathers around the Intelligence Layer and its trunk. */
function textureMask(p: Record<string, Point>, isDesktop: boolean) {
  if (isDesktop && p["core-in"] && p["core-out"]) {
    const cx = p["core-in"].x;
    const cy = (p["core-in"].y + p["core-out"].y) / 2;
    return `radial-gradient(ellipse 380px 320px at ${Math.round(cx)}px ${Math.round(cy)}px, #000 35%, transparent 100%)`;
  }
  const core = p.core ?? p.entry;
  if (!core) return "none";
  return `radial-gradient(ellipse 130px ${Math.round(core.y * 0.75 + 60)}px at ${Math.round(core.x)}px ${Math.round(core.y * 0.6)}px, #000 30%, transparent 100%)`;
}
