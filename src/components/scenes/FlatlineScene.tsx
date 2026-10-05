"use client";

import { m } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Pulse } from "@/components/signal/Pulse";
import { flatlines } from "@/content/home";
import { cn } from "@/lib/cn";

// Desktop: choices fill the left column; the active answer spans the right.
// Mobile: the answer sits directly under its choice (an accordion).
const ROW = ["lg:row-start-1", "lg:row-start-2", "lg:row-start-3", "lg:row-start-4", "lg:row-start-5"];

/** Scene 2 — the visitor recognizes their problem. One choice is alive at a time. */
export function FlatlineScene() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);

  return (
    <section id="what-we-solve" aria-labelledby="flatline-heading" className="scene">
      <div className="container-site">
        <Reveal>
          <h2 id="flatline-heading" className="text-title">
            {flatlines.title}
          </h2>
          <p className="text-lead measure mt-5 text-muted">{flatlines.intro}</p>
        </Reveal>

        <div className="mt-12 grid md:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[repeat(5,auto)_1fr] lg:gap-x-20">
          {flatlines.items.map((item, i) => {
            const isActive = i === active;
            const buttonId = `flatline-${item.id}`;
            const panelId = `flatline-panel-${item.id}`;
            return [
              <h3 key={`${item.id}-h`} className={cn("border-b border-line lg:col-start-1", ROW[i])}>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => {
                    setActive(i);
                    setInteracted(true);
                  }}
                  className="group flex min-h-20 w-full items-center gap-5 py-4 text-left"
                >
                  <Pulse key={isActive ? `on-${i}` : `off-${i}`} alive={isActive} />
                  <span
                    className={cn(
                      "text-subtitle transition-colors duration-200",
                      isActive ? "text-ink" : "text-subtle group-hover:text-muted",
                    )}
                  >
                    {item.name}
                  </span>
                </button>
              </h3>,
              isActive && (
                <m.div
                  key={`${item.id}-p`}
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="border-b border-line pt-2 pb-8 sm:pl-[5.25rem] lg:col-start-2 lg:[grid-row:1/span_6] lg:border-b-0 lg:pt-4 lg:pl-0"
                  initial={interacted ? { opacity: 0, y: 6 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                >
                  <FlatlineAnswer index={i} />
                </m.div>
              ),
            ];
          })}
        </div>
      </div>
    </section>
  );
}

function FlatlineAnswer({ index }: { index: number }) {
  const item = flatlines.items[index];
  const { labels } = flatlines;
  const parts = [
    { label: labels.problem, text: item.problem, alive: false },
    { label: labels.system, text: item.system, alive: false },
    { label: labels.outcome, text: item.outcome, alive: true },
  ];
  return (
    <div className="max-w-xl">
      <dl className="space-y-7">
        {parts.map((p) => (
          <div key={p.label}>
            <dt className={cn("text-small font-medium", p.alive ? "text-lime" : "text-subtle")}>{p.label}</dt>
            <dd className="text-lead mt-1.5 text-ink">{p.text}</dd>
          </div>
        ))}
      </dl>
      <p className="text-small mt-8 text-subtle">Often for: {item.oftenFor}</p>
    </div>
  );
}
