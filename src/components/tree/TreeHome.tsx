"use client";

import { m, useReducedMotion } from "motion/react";
import { ArrowRight, Pointer } from "lucide-react";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import { MARK_PATH, WORDMARK_PATH } from "@/components/brand/RevivoLogo";
import { DomainPanel } from "@/components/explorer/DomainPanel";
import { SignalNode } from "@/components/explorer/SignalNode";
import { useAnchors } from "@/components/explorer/useAnchors";
import { useTravel } from "@/components/explorer/useTravel";
import { moveSpot, Perforation, waveOut } from "@/components/signal/Perforation";
import { useMediaQuery } from "@/components/ui/useMediaQuery";
import { explorer, zones } from "@/content/explorer";
import { hero } from "@/content/home";
import type { RelatedProduct } from "@/content/products";
import { cn } from "@/lib/cn";
import { DIM_LIME, MID_LIME, orthogonal, SIGNAL, type Point } from "@/lib/signal";
import { flash, signalClock } from "@/lib/signal-clock";
import { ConversationPanel } from "./ConversationPanel";
import { conversation, treeCopy } from "./tree-copy";
import { navigate, parseRoute, routeHash, useTreeHash, type TreeRoute } from "./useTreeRoute";

/*
 * "THE i IS THE INTELLIGENCE" — the tree homepage (preview).
 * Switched off: the Revivo logo, dim, with the running light passing through the
 * mark and the letters. Tap the logo: it powers on, the dot of the i lights up as
 * the Revivo Intelligence Layer, and the tree grows down out of the i — four
 * areas plus "Start a conversation". Choosing an area grows its four
 * capabilities; a capability opens its panel. Every level is a URL hash.
 */

const STEP = 0.36; // seconds for the pulse to reach each new node
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const subscribeNoop = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

// Logo geometry, in the logo's own units (viewBox 0 154 558 108)
const LOGO = { w: 558, top: 154, h: 108 };
const MARK_START = { x: 5.1, y: 216.94 };
const END_DOT = { x: 161.7, y: 216.94 };
const I_DOT = { x: 400.9, y: 166.36 };
const I_BOTTOM = { x: 400.84, y: 250 };
const WORD_FULL = "M 205 216.94 H 556"; // the light sweeps through every letter
const WORD_TO_I = "M 205 216.94 H 401"; // once powered, it stops at the i
const at = (p: Point) => ({
  left: `${(p.x / LOGO.w) * 100}%`,
  top: `${((p.y - LOGO.top) / LOGO.h) * 100}%`,
});

const STATIC: TreeRoute = { powered: true, view: "overview", zone: null, cap: null };
type Seq = { kind: "power" } | { kind: "caps"; zone: number } | null;

export function TreeHome({ relatedProducts }: { relatedProducts?: Record<string, RelatedProduct[]> }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = Boolean(useReducedMotion());
  const isDesktop = useMediaQuery("(min-width: 64rem)");
  // The five-column tree needs ≥1280px; narrower screens use the rail (as on phones)
  const wideTree = useMediaQuery("(min-width: 80rem)");
  const hydrated = useHydrated();
  const hash = useTreeHash();
  // Server / no-JS: the whole tree, every capability visible (search engines read it all)
  const route = hydrated ? parseRoute(hash) : STATIC;
  const { powered } = route;
  const overview = route.view === "overview";

  const [seq, setSeq] = useState<Seq>(null);
  const [drawn, setDrawn] = useState(0);
  const [shown, setShown] = useState(0);
  const runId = useRef(0);
  // Registry of SVG paths the light and the travelling pulse run along (filled by ref callbacks)
  const [paths] = useState(() => new Map<string, SVGPathElement | null>());
  const endDotRef = useRef<SVGCircleElement>(null);
  const iDotRef = useRef<SVGCircleElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const talkReturn = useRef("#on");
  // Panels opened by a click added a history entry: closing them steps Back, so the
  // browser's Back button never reopens a panel the visitor just closed.
  const pushedPanel = useRef(false);
  const { dotRef, travel } = useTravel(!reduce);
  const geo = useAnchors(stageRef, `${hash}-${wideTree}-${hydrated}-${seq?.kind ?? ""}`);

  // What is on screen (a running sequence reveals things one by one; otherwise all at once)
  const branchesDrawn = !powered ? 0 : seq?.kind === "power" ? drawn : 5;
  const branchesShown = !powered ? 0 : seq?.kind === "power" ? shown : 5;
  const isOpen = (i: number) => overview || route.zone === i;
  const capsDrawn = (i: number) => (seq?.kind === "caps" && seq.zone === i ? drawn : 4);
  const capsShown = (i: number) => (seq?.kind === "caps" && seq.zone === i ? shown : 4);

  const setPath = (key: string) => (el: SVGPathElement | null) => {
    paths.set(key, el);
  };

  /* ---------------- actions ---------------- */

  const powerOn = useCallback(async () => {
    if (powered) {
      navigate("#on"); // tapping the logo again folds the tree back to the four areas
      return;
    }
    const id = ++runId.current;
    navigate("#on");
    flash(endDotRef.current, [{ transform: "scale(1.9)" }, { transform: "scale(1)" }], 600);
    if (reduce) return;
    setSeq({ kind: "power" });
    setDrawn(0);
    setShown(0);
    await wait(180);
    waveOut(waveRef.current);
    flash(iDotRef.current, [{ transform: "scale(1.6)" }, { transform: "scale(1)" }], 700);
    await wait(220);
    for (let i = 0; i < 5; i++) {
      if (id !== runId.current) return;
      setDrawn(i + 1);
      await travel([paths.get(`z-${i}`)], STEP);
      setShown(i + 1);
    }
    if (id === runId.current) setSeq(null);
  }, [powered, reduce, travel, paths]);

  const chooseZone = useCallback(
    async (i: number) => {
      if (route.zone === i && !overview) {
        navigate("#on"); // tap an open area again to fold it
        return;
      }
      const id = ++runId.current;
      navigate(routeHash({ powered: true, zone: i }));
      if (reduce) {
        setSeq(null);
        return;
      }
      setSeq({ kind: "caps", zone: i });
      setDrawn(0);
      setShown(0);
      await wait(140);
      for (let j = 0; j < 4; j++) {
        if (id !== runId.current) return;
        setDrawn(j + 1);
        await travel([paths.get(`c-${i}-${j}`)], STEP * 0.8);
        setShown(j + 1);
      }
      if (id === runId.current) setSeq(null);
    },
    [route.zone, overview, reduce, travel, paths],
  );

  const openCap = (i: number, j: number, e: MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    runId.current++;
    setSeq(null);
    pushedPanel.current = true;
    navigate(routeHash({ powered: true, zone: i, cap: j }));
  };

  const closeCap = useCallback(
    (restoreFocus = true) => {
      if (pushedPanel.current) window.history.back();
      else navigate(routeHash({ powered: true, zone: route.zone }), true);
      pushedPanel.current = false;
      if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
    },
    [route.zone],
  );

  const openTalk = useCallback(() => {
    talkReturn.current = powered && route.view !== "talk" ? routeHash({ ...route, cap: null }) : "#on";
    pushedPanel.current = true;
    navigate("#talk");
  }, [powered, route]);

  const closeTalk = useCallback(() => {
    if (pushedPanel.current) window.history.back();
    else navigate(talkReturn.current || "#on", true);
    pushedPanel.current = false;
  }, []);

  const discuss = useCallback(
    (capName: string) => {
      talkReturn.current = routeHash({ powered: true, zone: route.zone });
      // replace the capability entry, so Back from the conversation returns to the area
      pushedPanel.current = false;
      navigate("#talk", true);
      window.setTimeout(
        () =>
          window.dispatchEvent(
            new CustomEvent("revivo:prefill", { detail: `I'd like to discuss ${capName.toLowerCase()}: ` }),
          ),
        500,
      );
    },
    [route.zone],
  );

  const toggleOverview = () => navigate(overview ? "#on" : "#overview");

  /* ---------------- geometry ---------------- */

  const p = geo?.pts ?? {};
  const ms = p["mark-start"];
  const ib = p["i-bottom"];
  const target = (k: number) => (k === 4 ? p.talk : p[`z-${k}`]);
  const zoneTargets = [0, 1, 2, 3, 4].map(target).filter(Boolean) as Point[];
  const busY = ib && zoneTargets.length ? ib.y + (Math.min(...zoneTargets.map((t) => t.y)) - ib.y) / 2 : 0;

  const branchD = (k: number): string | null => {
    const t = target(k);
    if (!ib || !t) return null;
    if (wideTree) return orthogonal(ib, t, busY);
    if (k === 0) return orthogonal(ib, t);
    const prev = target(k - 1);
    return prev ? `M ${prev.x} ${prev.y} V ${t.y}` : null;
  };
  const capD = (i: number, j: number): string | null => {
    const z = p[`z-${i}`];
    const c = p[`c-${i}-${j}`];
    if (!z || !c) return null;
    if (wideTree) {
      const prev = j === 0 ? z : p[`c-${i}-${j - 1}`];
      return prev ? `M ${z.x} ${prev.y} V ${c.y}` : null;
    }
    const c0 = p[`c-${i}-0`];
    const bus = c0 ? z.y + (c0.y - z.y) / 2 : undefined;
    return orthogonal(z, c, bus, 12);
  };

  // The running light's route once powered: i → trunk → the open area (and down its capabilities),
  // or → "Start a conversation" when no area is open.
  let routeD = "";
  if (powered && ib && !seq && !staticRoute(hydrated)) {
    const k = route.zone ?? 4;
    const t = target(k);
    if (t) {
      if (wideTree) routeD = orthogonal(ib, t, busY);
      else {
        const z0 = target(0);
        if (z0) routeD = orthogonal(ib, z0) + (k > 0 ? ` V ${t.y}` : "");
      }
      const last = route.zone != null ? p[`c-${route.zone}-3`] : undefined;
      if (last && route.zone != null) {
        routeD += wideTree ? ` V ${last.y}` : "";
      }
    }
  }

  /* ---------------- the continuous light ---------------- */

  useEffect(() => {
    if (!geo || !hydrated) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pts = geo.pts;
    const a = pts["mark-start"];
    const b = pts["i-bottom"];
    const g = (k: string) => paths.get(k);
    const lead = [g("lead-glow"), g("lead-light")];
    const mark = [g("mark-glow"), g("mark-core")];
    const word = g("word");
    if (!a || !b || lead.some((x) => !x) || mark.some((x) => !x) || !word) return;
    // logo units → stage pixels (for the lit perforations)
    const s = (b.x - a.x) / (I_BOTTOM.x - MARK_START.x);
    const lx = a.x - MARK_START.x * s;
    const ly = a.y - (MARK_START.y - LOGO.top) * s;
    const toStage = (pt: DOMPoint | null) => pt && { x: lx + pt.x * s, y: ly + (pt.y - LOGO.top) * s };
    const spot = (pt: { x: number; y: number } | null) => moveSpot(spotRef.current, pt);

    const keys = ["t-lead", "t-mark", "t-word", "t-route"];
    signalClock.set({
      key: "t-lead",
      order: 0,
      paths: lead as SVGPathElement[],
      length: lead[1]!.getTotalLength(),
      onMove: spot,
    });
    const markLen = mark[1]!.getTotalLength();
    signalClock.set({
      key: "t-mark",
      order: 1,
      paths: mark as SVGPathElement[],
      length: markLen,
      dash: 60,
      onMove: (pt) => spot(toStage(pt)),
      events: powered
        ? []
        : [
            {
              at: markLen - 1,
              fire: () =>
                flash(endDotRef.current, [{ transform: "scale(1.7)" }, { transform: "scale(1)" }], 600),
            },
          ],
    });
    const wordLen = word.getTotalLength();
    signalClock.set({
      key: "t-word",
      order: 2,
      paths: [word],
      length: wordLen,
      dash: 46,
      onMove: (pt) => spot(toStage(pt)),
      events: powered
        ? [
            {
              at: wordLen - 1,
              fire: () =>
                flash(iDotRef.current, [{ transform: "scale(1.5)" }, { transform: "scale(1)" }], 600),
            },
          ]
        : [],
    });
    const rl = g("route-light");
    const rg = g("route-glow");
    if (powered && routeD && rl && rg) {
      signalClock.set({
        key: "t-route",
        order: 3,
        paths: [rg, rl],
        length: rl.getTotalLength(),
        onMove: spot,
      });
    } else signalClock.remove("t-route");

    const io = new IntersectionObserver(([e]) =>
      keys.forEach((k) => signalClock.setVisible(k, e.isIntersecting)),
    );
    if (stageRef.current) io.observe(stageRef.current);
    return () => {
      io.disconnect();
      keys.forEach((k) => signalClock.remove(k));
    };
  }, [geo, hydrated, powered, routeD, paths]);

  /* ---------------- render ---------------- */

  const hint = !hydrated
    ? null
    : !powered
      ? treeCopy.powerHint
      : route.zone == null && !overview
        ? treeCopy.chooseZone
        : !overview
          ? treeCopy.chooseCap
          : null;
  const panelSel = route.zone != null && route.cap != null ? { zone: route.zone, cap: route.cap } : null;
  const iDot = p["i-dot"];

  return (
    <div ref={stageRef} className="relative min-h-[100svh] pb-20" data-ssr={hydrated ? undefined : "true"}>
      {geo && (
        <Perforation
          mask="linear-gradient(#000, #000)"
          spotRef={spotRef}
          waveRef={waveRef}
          wave={iDot ? { x: iDot.x, y: iDot.y, size: 300 } : null}
        />
      )}

      {/* Lines: lead-in, trunk, branches, the running light and the travelling pulse */}
      {geo && (
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
          {ms && (
            <>
              <path d={`M 0 ${ms.y} H ${ms.x}`} stroke={DIM_LIME} strokeWidth={SIGNAL.width} />
              <path
                ref={setPath("lead-glow")}
                className="sig-light"
                d={`M 0 ${ms.y} H ${ms.x}`}
                stroke={SIGNAL.color}
                strokeOpacity={0.28}
                strokeWidth={8}
              />
              <path
                ref={setPath("lead-light")}
                className="sig-light"
                d={`M 0 ${ms.y} H ${ms.x}`}
                stroke={SIGNAL.color}
                strokeWidth={2.25}
              />
            </>
          )}

          {[0, 1, 2, 3, 4].map((k) => {
            const d = branchD(k);
            if (!d) return null;
            const lit = k === 4 ? route.view === "talk" : route.zone === k;
            const quiet = route.zone != null && !lit;
            return (
              <m.path
                key={`z-${k}-${wideTree}`}
                ref={setPath(`z-${k}`)}
                d={d}
                stroke={lit ? SIGNAL.color : quiet ? DIM_LIME : MID_LIME}
                strokeWidth={SIGNAL.width}
                initial={hydrated && !reduce ? { pathLength: 0 } : false}
                animate={{ pathLength: k < branchesDrawn ? 1 : 0 }}
                transition={{ duration: hydrated && !reduce ? STEP : 0, ease: [0.45, 0, 0.2, 1] }}
              />
            );
          })}

          {zones.map((_, i) =>
            isOpen(i) && powered
              ? [0, 1, 2, 3].map((j) => {
                  const d = capD(i, j);
                  if (!d) return null;
                  const lit = route.zone === i && route.cap === j;
                  return (
                    <m.path
                      key={`c-${i}-${j}-${wideTree}`}
                      ref={setPath(`c-${i}-${j}`)}
                      d={d}
                      stroke={lit ? SIGNAL.color : MID_LIME}
                      strokeWidth={SIGNAL.width}
                      initial={hydrated && !reduce ? { pathLength: 0 } : false}
                      animate={{ pathLength: j < capsDrawn(i) ? 1 : 0 }}
                      transition={{ duration: hydrated && !reduce ? STEP * 0.8 : 0, ease: [0.45, 0, 0.2, 1] }}
                    />
                  );
                })
              : null,
          )}

          {routeD && (
            <>
              <path
                ref={setPath("route-glow")}
                className="sig-light"
                d={routeD}
                stroke={SIGNAL.color}
                strokeOpacity={0.28}
                strokeWidth={8}
              />
              <path
                ref={setPath("route-light")}
                className="sig-light"
                d={routeD}
                stroke={SIGNAL.color}
                strokeWidth={2.25}
              />
            </>
          )}

          <g ref={dotRef} style={{ opacity: 0, transition: "opacity 450ms ease-out" }}>
            <circle r={SIGNAL.haloRadius + 3} fill={SIGNAL.color} opacity={0.16} />
            <circle r={SIGNAL.dotRadius + 0.5} fill={SIGNAL.color} />
          </g>
        </svg>
      )}

      <div className="container-site relative z-10 pt-24 lg:pt-28">
        {/* Who Revivo is — readable before any click */}
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-12">
          <div>
            <p className="label text-subtle">{hero.eyebrow}</p>
            <h1 className="text-hero mt-4 leading-[0.92]">
              <span className="block">
                <span className="text-lime">{hero.headline.line1.pulse}</span>
                {hero.headline.line1.rest}
              </span>
              <span className="block">
                {hero.headline.line2.before}
                <span className="text-lime">{hero.headline.line2.ai}</span>
                {hero.headline.line2.after}
              </span>
            </h1>
          </div>
          <div>
            <p className="text-lead measure text-muted">{hero.statement}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openTalk}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lime px-6 font-display text-base font-bold tracking-[0.03em] text-canvas transition-colors hover:bg-ink"
              >
                {conversation.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={powered ? toggleOverview : powerOn}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-6 font-display text-base font-bold tracking-[0.03em] text-ink transition-colors hover:border-lime"
              >
                {!powered ? treeCopy.powerOn : overview ? treeCopy.closeOverview : treeCopy.overview}
              </button>
            </div>
          </div>
        </div>

        {/* The root: the Revivo logo. Tap it to power on. */}
        <div className="relative mx-auto mt-12 w-full max-w-[32rem] lg:mt-12">
          <p
            aria-live="polite"
            className={cn("label mb-3 flex min-h-6 items-center gap-2 text-lime", !hint && "invisible")}
            style={{ paddingLeft: `${(MARK_START.x / LOGO.w) * 100}%` }}
          >
            {!powered && <Pointer aria-hidden="true" className="size-4" />}
            {hint ?? " "}
          </p>
          <button
            type="button"
            onClick={powerOn}
            aria-expanded={powered}
            aria-controls="tree-areas"
            aria-label={
              powered ? `Revivo — ${treeCopy.intelligence}. Show the four areas` : treeCopy.powerOnAria
            }
            className="group relative block w-full rounded-lg"
          >
            <svg viewBox="0 154 558 108" className="block h-auto w-full overflow-visible" aria-hidden="true">
              <defs>
                <clipPath id="tree-wordmark-clip">
                  <path d={WORDMARK_PATH} />
                </clipPath>
              </defs>
              <path
                d={MARK_PATH}
                fill="none"
                stroke={powered ? SIGNAL.color : MID_LIME}
                strokeWidth="10.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "stroke 700ms ease-out" }}
              />
              <path
                ref={setPath("mark-glow")}
                className="sig-light"
                d={MARK_PATH}
                fill="none"
                stroke={SIGNAL.color}
                strokeOpacity={0.35}
                strokeWidth={22}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={setPath("mark-core")}
                className="sig-light"
                d={MARK_PATH}
                fill="none"
                stroke="#F5F5F2"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                ref={endDotRef}
                cx={END_DOT.x}
                cy={END_DOT.y}
                r="7.96"
                fill={powered ? SIGNAL.color : MID_LIME}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: "fill 700ms ease-out",
                }}
              />
              <path
                d={WORDMARK_PATH}
                fill={powered ? "#F5F5F2" : "#8C8C88"}
                style={{ transition: "fill 700ms ease-out" }}
              />
              {/* The light passing through the letters */}
              <g clipPath="url(#tree-wordmark-clip)">
                <path
                  ref={setPath("word")}
                  className="sig-light"
                  d={powered ? WORD_TO_I : WORD_FULL}
                  fill="none"
                  stroke={SIGNAL.color}
                  strokeWidth={110}
                  strokeLinecap="butt"
                />
              </g>
              {/* The dot of the i — the Revivo Intelligence Layer */}
              <circle
                ref={iDotRef}
                cx={I_DOT.x}
                cy={I_DOT.y}
                r="8.9"
                fill={SIGNAL.color}
                opacity={powered ? 1 : 0}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: "opacity 500ms ease-out",
                }}
              />
            </svg>
            {/* measured points on the logo */}
            {(
              [
                ["mark-start", MARK_START],
                ["i-dot", I_DOT],
                ["i-bottom", I_BOTTOM],
              ] as const
            ).map(([name, pt]) => (
              <span
                key={name}
                data-anchor={name}
                aria-hidden="true"
                className="absolute size-px"
                style={at(pt)}
              />
            ))}
          </button>
        </div>

        {/* The tree */}
        <div id="tree-areas" className="tree-reveal">
          {powered && (wideTree ? renderDesktopTree() : renderPhoneTree())}
        </div>

        {powered && (
          <p className="text-small mx-auto mt-14 max-w-xl text-center text-subtle">{explorer.qualifier}</p>
        )}
      </div>

      <DomainPanel
        selection={panelSel}
        isDesktop={isDesktop}
        onClose={closeCap}
        onSwitch={(cap) =>
          route.zone != null && navigate(routeHash({ powered: true, zone: route.zone, cap }), true)
        }
        onDiscuss={discuss}
        relatedProducts={relatedProducts}
      />
      <ConversationPanel open={route.view === "talk"} isDesktop={isDesktop} onClose={closeTalk} />
    </div>
  );

  /* ---------- desktop: four columns under the word, plus the conversation ---------- */
  function renderDesktopTree() {
    return (
      <ul className="mt-12 grid grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-x-6">
        {zones.map((z, i) => {
          const visible = i < branchesShown;
          const open = isOpen(i);
          const lit = route.zone === i;
          const quiet = route.zone != null && !lit && !overview;
          return (
            <li key={z.id}>
              <m.div
                initial={false}
                animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
                transition={{ duration: 0.3 }}
                inert={!visible}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`tree-caps-${i}`}
                  onClick={() => chooseZone(i)}
                  className="flex min-h-11 items-start gap-3 text-left"
                >
                  <SignalNode
                    anchor={`z-${i}`}
                    state={lit ? "on" : quiet ? "off" : "dim"}
                    className="mt-1.5"
                  />
                  <span
                    className={cn(
                      "text-subtitle transition-colors duration-300",
                      quiet ? "text-subtle hover:text-ink" : "text-ink hover:text-lime",
                    )}
                  >
                    {z.name.split(" & ").map((part, n, all) => (
                      <Fragment key={part}>
                        {part}
                        {n < all.length - 1 && (
                          <>
                            {" &"}
                            <br />
                          </>
                        )}
                      </Fragment>
                    ))}
                  </span>
                </button>
                {open && (
                  <div id={`tree-caps-${i}`}>
                    <p className="text-small mt-2 pl-7 text-subtle">{z.summary}</p>
                    <ul className="mt-3 space-y-1">
                      {z.capabilities.map((c, j) => {
                        const show = j < capsShown(i);
                        const on = route.zone === i && route.cap === j;
                        return (
                          <li key={c.id}>
                            <m.div
                              initial={false}
                              animate={{ opacity: show ? 1 : 0 }}
                              transition={{ duration: 0.25 }}
                              inert={!show}
                            >
                              <button
                                type="button"
                                aria-haspopup="dialog"
                                onClick={(e) => openCap(i, j, e)}
                                className="group flex min-h-11 w-full items-start gap-3 py-1 text-left"
                              >
                                <SignalNode
                                  anchor={`c-${i}-${j}`}
                                  state={on ? "on" : "dim"}
                                  className="mt-[0.2rem]"
                                />
                                <span
                                  className={cn(
                                    "text-[0.9375rem] leading-snug font-medium transition-colors",
                                    on ? "text-lime" : "text-ink group-hover:text-lime",
                                  )}
                                >
                                  {c.name}
                                </span>
                              </button>
                            </m.div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </m.div>
            </li>
          );
        })}
        <li>
          <m.div
            initial={false}
            animate={{ opacity: branchesShown >= 5 ? 1 : 0, y: branchesShown >= 5 ? 0 : 8 }}
            transition={{ duration: 0.3 }}
            inert={branchesShown < 5}
          >
            <button
              type="button"
              onClick={openTalk}
              className="group flex min-h-11 items-center gap-3 text-left"
            >
              <SignalNode anchor="talk" state={route.view === "talk" ? "on" : "dim"} />
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lime px-5 whitespace-nowrap font-display text-base font-bold tracking-[0.03em] text-canvas transition-colors group-hover:bg-ink">
                {conversation.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </button>
          </m.div>
        </li>
      </ul>
    );
  }

  /* ---------- phones and tablets: the same tree down a rail on the left ---------- */
  function renderPhoneTree() {
    return (
      <ul className="mt-10">
        {zones.map((z, i) => {
          const visible = i < branchesShown;
          const open = isOpen(i);
          const lit = route.zone === i;
          const quiet = route.zone != null && !lit && !overview;
          return (
            <m.li
              key={z.id}
              className="grid grid-cols-[46px_1fr]"
              initial={false}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              inert={!visible}
            >
              <div className="flex justify-center pt-[1.15rem]">
                <SignalNode anchor={`z-${i}`} state={lit ? "on" : quiet ? "off" : "dim"} />
              </div>
              <div className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`tree-caps-m-${i}`}
                  onClick={() => chooseZone(i)}
                  className={cn(
                    "text-subtitle flex min-h-14 w-full items-center py-2 text-left",
                    quiet ? "text-subtle" : "text-ink",
                  )}
                >
                  {z.name}
                </button>
                {open && (
                  <div id={`tree-caps-m-${i}`} className="pb-4">
                    <p className="text-small pl-7 text-muted">{z.summary}</p>
                    <ul className="mt-2">
                      {z.capabilities.map((c, j) => {
                        const show = j < capsShown(i);
                        const on = route.zone === i && route.cap === j;
                        return (
                          <m.li
                            key={c.id}
                            initial={false}
                            animate={{ opacity: show ? 1 : 0 }}
                            transition={{ duration: 0.25 }}
                            inert={!show}
                          >
                            <button
                              type="button"
                              aria-haspopup="dialog"
                              onClick={(e) => openCap(i, j, e)}
                              className={cn(
                                "flex min-h-12 w-full items-center gap-3 py-2 text-left",
                                on ? "text-lime" : "text-ink",
                              )}
                            >
                              <SignalNode anchor={`c-${i}-${j}`} state={on ? "on" : "dim"} />
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
        <m.li
          className="grid grid-cols-[46px_1fr]"
          initial={false}
          animate={{ opacity: branchesShown >= 5 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          inert={branchesShown < 5}
        >
          <div className="flex justify-center pt-[1.4rem]">
            <SignalNode anchor="talk" state={route.view === "talk" ? "on" : "dim"} />
          </div>
          <div className="py-2.5">
            <button
              type="button"
              onClick={openTalk}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lime px-5 font-display text-base font-bold tracking-[0.03em] text-canvas"
            >
              {conversation.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </m.li>
      </ul>
    );
  }
}

/** Before hydration the server shows everything; no running light then. */
function staticRoute(hydrated: boolean) {
  return !hydrated;
}
