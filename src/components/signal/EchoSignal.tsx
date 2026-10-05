"use client";

import { useEffect, useRef, useState } from "react";
import { finalCta } from "@/content/home";
import { DIM_LIME, PULSE_HALF, pulseSegment, SIGNAL } from "@/lib/signal";

const H = 56;

/**
 * "Your signal": a line beside the enquiry form that responds as the visitor
 * types — each burst of typing sends a pulse along it. When idle it carries a
 * slow ambient light like the rest of the site. Decorative (aria-hidden svg);
 * the caption is plain text. Respects reduced motion.
 */
export function EchoSignal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lights = useRef<Array<SVGPathElement | null>>([]);
  const [w, setW] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!w) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let next = 0;
    let lastSent = 0;
    let visible = false;
    let idleTimer = 0;
    let typingTimer = 0;

    const send = (bright: boolean) => {
      const path = lights.current[next % lights.current.length];
      next++;
      if (!path) return;
      const len = path.getTotalLength();
      const dash = bright ? 90 : 70;
      path.style.strokeDasharray = `${dash} ${len + dash * 2}`;
      path.style.opacity = bright ? "1" : "0.7";
      path.animate([{ strokeDashoffset: dash }, { strokeDashoffset: -len }], {
        duration: bright ? 1100 : 2400,
        easing: "linear",
        fill: "forwards",
      });
    };

    const onTyping = () => {
      setTyping(true);
      window.clearTimeout(typingTimer);
      typingTimer = window.setTimeout(() => setTyping(false), 2500);
      const now = performance.now();
      if (now - lastSent < 220) return; // a pulse per burst, not per key
      lastSent = now;
      send(true);
    };

    const idle = () => {
      if (visible) send(false);
      idleTimer = window.setTimeout(idle, 4800);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (wrapRef.current) io.observe(wrapRef.current);
    idleTimer = window.setTimeout(idle, 1200);
    window.addEventListener("revivo:typing", onTyping);
    return () => {
      io.disconnect();
      window.clearTimeout(idleTimer);
      window.clearTimeout(typingTimer);
      window.removeEventListener("revivo:typing", onTyping);
    };
  }, [w]);

  const y = H / 2;
  const px = Math.max(80, w * 0.62);
  const d = w ? `M 0 ${y} H ${px - PULSE_HALF.before * 0.8}${pulseSegment(px, y, 0.8)} H ${w - 10}` : "";

  return (
    <div className="mt-10">
      <p className="label text-subtle">{finalCta.signal.label}</p>
      <div ref={wrapRef} className="mt-3 h-14 w-full">
        {w > 0 && (
          <svg
            aria-hidden="true"
            focusable="false"
            width={w}
            height={H}
            viewBox={`0 0 ${w} ${H}`}
            fill="none"
          >
            <path
              d={d}
              stroke={DIM_LIME}
              strokeWidth={SIGNAL.width}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                ref={(el) => {
                  lights.current[i] = el;
                }}
                d={d}
                stroke={SIGNAL.color}
                strokeWidth={2.25}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ strokeDasharray: "0 100000" }}
              />
            ))}
            <circle cx={w - 4} cy={y} r={3.5} fill={typing ? SIGNAL.color : DIM_LIME} />
          </svg>
        )}
      </div>
      <p className="text-small mt-2 text-muted">{typing ? finalCta.signal.active : finalCta.signal.idle}</p>
    </div>
  );
}
