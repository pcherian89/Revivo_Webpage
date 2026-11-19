"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import gatewayImage from "@/assets/pilot/00-gateway.png";
import gatewayPhone from "@/assets/pilot/00-gateway-phone.png";
import gatewayPortrait from "@/assets/pilot/00-gateway-portrait.png";
import { RevivoLogo } from "@/components/brand/RevivoLogo";
import { DIM_LIME, MID_LIME, pulseSegment, SIGNAL } from "@/lib/signal";
import { gatewayUrls, PORTRAIT_QUERY, TALL_QUERY } from "./boot";

const ART = gatewayUrls(gatewayImage.src, gatewayPortrait.src, gatewayPhone.src);
/* A CSS background: painted without waiting for JavaScript. Landscape screens get the wide artwork,
   upright iPads the upright one, phones the tall one. */
const ART_CSS = `.gw-art{background-image:url(${ART.wide})}@media ${PORTRAIT_QUERY}{.gw-art{background-image:url(${ART.upright})}}@media ${TALL_QUERY}{.gw-art{background-image:url(${ART.tall})}}`;

// The signal through the identity: a straight track with the homepage's ECG pulse in the middle.
const W = 600;
const Y = 30;
const PX = W / 2;
const TRACK = `M 0 ${Y} H ${PX - 34 * 1.2}${pulseSegment(PX, Y, 1.2)} H ${W}`;
/** Just the heartbeat, which glows as the light passes through it. */
const SPIKE = `M ${PX - 34 * 1.2} ${Y}${pulseSegment(PX, Y, 1.2)}`;
/**
 * The light is a long comet (a bright head with a soft body and tail) that runs slowly along the
 * track; every layer shares one leading edge. `L` is each layer's length (fraction of the track),
 * mirrored in the gw-run-* keyframes in globals.css.
 */
const COMET = [
  { cls: "gw-tail", L: 0.45, width: 2, opacity: 0.16 },
  { cls: "gw-body", L: 0.22, width: 2, opacity: 0.45 },
  { cls: "gw-glow", L: 0.22, width: 8, opacity: 0.22 },
  { cls: "gw-head", L: 0.07, width: 2.25, opacity: 1 },
] as const;

/**
 * The cinematic gateway page (revivosportech.com/): the clean background artwork, the real Revivo
 * logo with one live lime pulse, and a real "Enter Revivo" link to the homepage (/home).
 */
export function Gateway() {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "firing" | "leaving">("idle");

  // Old deep links (/#start, /#explore…) now live on /home: send them straight there.
  useEffect(() => {
    if (window.location.hash) router.replace(`/home${window.location.hash}`);
    else router.prefetch("/home");
  }, [router]);

  const enter = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // new tab etc.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    if (phase !== "idle") return;
    // The heartbeat fires once, the scene fades, and the homepage (and its own pulse) takes over.
    setPhase("firing");
    window.setTimeout(() => setPhase("leaving"), 420);
    window.setTimeout(() => router.push("/home"), 860);
  };

  return (
    <div
      data-gateway-page
      className={
        phase === "idle"
          ? "gateway"
          : phase === "firing"
            ? "gateway gw-firing"
            : "gateway gw-firing gw-leaving"
      }
    >
      <div className="gw-stage">
        <style dangerouslySetInnerHTML={{ __html: ART_CSS }} />
        <div aria-hidden="true" className="gw-art photo absolute inset-0 bg-cover bg-center" />
        <div className="gw-identity">
          <h1 className="w-full">
            <RevivoLogo className="gw-logo h-auto w-full text-ink" title="Revivo" />
          </h1>
          <svg className="gw-pulse" viewBox={`0 0 ${W} 60`} fill="none" aria-hidden="true" focusable="false">
            <defs>
              {/* Both ends fade into the dark, so the line seems to come out of the night and carry on. */}
              <linearGradient id="gw-fade-track" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
                <stop offset="0" stopColor={DIM_LIME} stopOpacity="0" />
                <stop offset="0.24" stopColor={DIM_LIME} />
                <stop offset="0.76" stopColor={DIM_LIME} />
                <stop offset="1" stopColor={DIM_LIME} stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gw-fade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.24" stopColor="#fff" />
                <stop offset="0.76" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <mask id="gw-fade-mask" maskUnits="userSpaceOnUse" x="-20" y="-20" width={W + 40} height="100">
                <rect x="-20" y="-20" width={W + 40} height="100" fill="url(#gw-fade)" />
              </mask>
            </defs>
            <path
              className="gw-track"
              d={TRACK}
              stroke="url(#gw-fade-track)"
              strokeWidth={SIGNAL.width}
              strokeLinejoin="round"
            />
            <path
              className="gw-spike-rest"
              d={SPIKE}
              stroke={MID_LIME}
              strokeWidth={SIGNAL.width}
              strokeLinejoin="round"
            />
            <g mask="url(#gw-fade-mask)">
              {COMET.map((c) => (
                <path
                  key={c.cls}
                  className={`gw-comet ${c.cls}`}
                  d={TRACK}
                  pathLength={1}
                  stroke={SIGNAL.color}
                  strokeOpacity={c.opacity}
                  strokeWidth={c.width}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </g>
            <path
              className="gw-spike"
              d={SPIKE}
              stroke={SIGNAL.color}
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Link
          href="/home"
          onClick={enter}
          className="gw-enter group inline-flex min-h-12 items-center gap-2 rounded-full bg-lime px-7 font-display text-lg font-bold tracking-[0.03em] text-canvas transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
        >
          Enter Revivo
          <ArrowRight
            aria-hidden="true"
            className="size-5 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
