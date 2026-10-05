"use client";

import { m } from "motion/react";
import { useRef } from "react";
import { useRevealState } from "@/components/motion/useRevealState";
import { SignalGlyph } from "@/components/signal/SignalGlyph";
import { process } from "@/content/home";
import { cn } from "@/lib/cn";

const STEP = 0.35; // seconds between stages

/**
 * Scene 3 — how Revivo works. A calm rail; when it enters view a small pulse
 * accent lights each stage once, in order. Quieter than the hero and explorer.
 */
export function ProcessScene() {
  const ref = useRef<HTMLOListElement>(null);
  const reveal = useRevealState(ref, "0px 0px -20% 0px");
  const lit = reveal !== "hidden";
  const animate = reveal === "shown";

  return (
    <section id="how-we-work" aria-labelledby="process-heading" className="section-y">
      <div className="container-site">
        <p className="label text-subtle">How Revivo works</p>
        <h2 id="process-heading" className="text-title mt-4 max-w-4xl">
          {process.title}
        </h2>

        <ol ref={ref} className="relative mt-10 grid gap-8 md:mt-12 lg:grid-cols-4 lg:gap-10">
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-[27px] w-px bg-line lg:hidden" />
          <span aria-hidden="true" className="absolute top-3 right-0 left-0 hidden h-px bg-line lg:block" />
          {process.steps.map((step, i) => (
            <li key={step.name} className="relative flex gap-5 lg:flex-col lg:gap-5">
              <m.span
                className="relative z-10 flex h-6 w-14 shrink-0 items-center bg-canvas"
                initial={false}
                animate={{ opacity: lit ? 1 : 0.25 }}
                transition={animate ? { duration: 0.4, delay: 0.2 + i * STEP } : { duration: 0 }}
              >
                <SignalGlyph className={cn(i === 0 && "")} />
              </m.span>
              <div>
                <h3 className="text-subtitle text-ink">{step.name}</h3>
                <p className="mt-2 max-w-xs text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
