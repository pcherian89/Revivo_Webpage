"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import gatewayImage from "@/assets/pilot/00-gateway.png";
import { RevivoLogo } from "@/components/brand/RevivoLogo";
import { DIM_LIME, pulseSegment, SIGNAL } from "@/lib/signal";
import { gatewayUrls, SMALL_QUERY } from "./boot";

const ART = gatewayUrls(gatewayImage.src);
/* A CSS background: painted without waiting for JavaScript, and phones get the lighter file. */
const ART_CSS = `.gw-art{background-image:url(${ART.large})}@media ${SMALL_QUERY}{.gw-art{background-image:url(${ART.small})}}`;

// The signal through the identity: a straight track with the homepage's ECG pulse in the middle.
const W = 600;
const Y = 30;
const PX = W / 2;
const TRACK = `M 0 ${Y} H ${PX - 34 * 1.2}${pulseSegment(PX, Y, 1.2)} H ${W}`;

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
    window.setTimeout(() => setPhase("leaving"), 380);
    window.setTimeout(() => router.push("/home"), 820);
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
            <path d={TRACK} stroke={DIM_LIME} strokeWidth={SIGNAL.width} strokeLinejoin="round" />
            <path
              className="gw-light"
              d={TRACK}
              pathLength={1}
              stroke={SIGNAL.color}
              strokeOpacity={0.3}
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="gw-light"
              d={TRACK}
              pathLength={1}
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
