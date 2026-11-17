"use client";

import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import gatewayImage from "@/assets/pilot/00-gateway.png";
import { RevivoLogo } from "@/components/brand/RevivoLogo";
import { DIM_LIME, pulseSegment, SIGNAL } from "@/lib/signal";
import { GATEWAY_KEY, gatewayUrls, SMALL_QUERY } from "./boot";

const ART = gatewayUrls(gatewayImage.src);
/* A CSS background (not <img>): never downloaded while the gateway is hidden, painted without
   waiting for JavaScript when it shows. Same URL the boot script preloads. */
const ART_CSS = `.gw-art{background-image:url(${ART.large})}@media ${SMALL_QUERY}{.gw-art{background-image:url(${ART.small})}}`;

// The signal through the identity: a straight track with the homepage's ECG pulse in the middle.
const W = 600;
const Y = 30;
const PX = W / 2;
const TRACK = `M 0 ${Y} H ${PX - 34 * 1.2}${pulseSegment(PX, Y, 1.2)} H ${W}`;

/**
 * The cinematic gateway: the clean background artwork, the real Revivo logo with one live lime
 * pulse, and a real "Enter Revivo" button. A dismissible overlay above the homepage (not a
 * separate route). Enter, Escape or the button reveal the homepage, which stays intact beneath.
 */
export function Gateway() {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const setBackground = (inert: boolean) => {
    for (const sel of ["body > a[href='#main']", "header", "#main", "footer"]) {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (el.closest("[data-gateway]")) return;
        if (inert) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      });
    }
  };

  const enter = useCallback(() => {
    const html = document.documentElement;
    if (!html.classList.contains("gw")) return;
    try {
      sessionStorage.setItem(GATEWAY_KEY, "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setBackground(false);
    const done = () => {
      html.classList.remove("gw", "gw-leaving");
      document.getElementById("main")?.focus({ preventScroll: true });
    };
    if (reduce) return done();
    html.classList.add("gw-leaving");
    window.setTimeout(done, 700);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("gw")) return;
    setBackground(true);
    // Focus the button for keyboard and screen-reader users without drawing the ring on load.
    buttonRef.current?.focus({ preventScroll: true, focusVisible: false } as FocusOptions);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        enter();
      } else if (e.key === "Tab") {
        // Only one control: keep focus on it.
        e.preventDefault();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      setBackground(false);
    };
  }, [enter]);

  return (
    <div ref={rootRef} data-gateway className="gateway" role="dialog" aria-modal="true" aria-label="Revivo">
      <div className="gw-stage">
        <style dangerouslySetInnerHTML={{ __html: ART_CSS }} />
        <div aria-hidden="true" className="gw-art photo absolute inset-0 bg-cover bg-center" />
        <div className="gw-identity">
          <RevivoLogo className="gw-logo h-auto w-full text-ink" title="Revivo" />
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
        <button
          ref={buttonRef}
          type="button"
          onClick={enter}
          className="gw-enter group inline-flex min-h-12 items-center gap-2 rounded-full bg-lime px-7 font-display text-lg font-bold tracking-[0.03em] text-canvas transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
        >
          Enter Revivo
          <ArrowRight
            aria-hidden="true"
            className="size-5 transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </div>
  );
}
