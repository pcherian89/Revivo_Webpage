"use client";

import { m } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTabs } from "@/components/ui/useTabs";
import { useRevealState } from "@/components/motion/useRevealState";
import { problemToSystem } from "@/content/home";
import { cn } from "@/lib/cn";

const EASE = [0.25, 1, 0.5, 1] as const;

// Where each workflow step starts before it "organizes" (kept modest so it
// never causes horizontal overflow on small screens).
const SCATTER = [
  { x: -42, y: 26, rotate: -3 },
  { x: 30, y: -18, rotate: 2.5 },
  { x: -24, y: 34, rotate: -2 },
  { x: 46, y: -24, rotate: 3.5 },
  { x: -36, y: 14, rotate: -2.5 },
  { x: 22, y: -30, rotate: 2 },
];

export function ProblemToSystem() {
  const { examples } = problemToSystem;
  const { selected, getTabProps } = useTabs(examples.length);
  const [hasSwitched, setHasSwitched] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reveal = useRevealState(panelRef, "0px 0px -20% 0px");
  const example = examples[selected];

  // The workflow is "organized" unless it is waiting below the fold to animate in.
  const organized = reveal !== "hidden";

  return (
    <section
      aria-labelledby="problem-system-heading"
      className="section-pad overflow-hidden border-t border-line bg-raised"
    >
      <div className="container-site">
        <SectionHeader
          index={problemToSystem.index}
          label={problemToSystem.label}
          annotation={problemToSystem.annotation}
          headline={problemToSystem.headline}
          headingId="problem-system-heading"
        >
          <p className="text-lead measure mt-6 text-muted md:mt-8">{problemToSystem.intro}</p>
        </SectionHeader>

        <div
          role="tablist"
          aria-label="Problem-to-system examples"
          className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4"
        >
          {examples.map((ex, i) => {
            const tabProps = getTabProps(i, { tab: `pts-tab-${ex.id}`, panel: `pts-panel` });
            const isSelected = i === selected;
            return (
              <button
                key={ex.id}
                {...tabProps}
                onClick={() => {
                  tabProps.onClick();
                  setHasSwitched(true);
                }}
                onKeyDown={(e) => {
                  tabProps.onKeyDown(e);
                  setHasSwitched(true);
                }}
                className={cn(
                  "relative flex min-h-[4.5rem] flex-col items-start justify-center gap-1 px-4 py-3 text-left transition-colors duration-200 md:px-6",
                  isSelected ? "bg-surface text-ink" : "bg-raised text-muted hover:text-ink",
                )}
              >
                <span className={cn("text-label", isSelected ? "text-lime" : "text-subtle")}>0{i + 1}</span>
                <span className="text-sm font-semibold md:text-base">{ex.label}</span>
                {isSelected && (
                  <m.span
                    layoutId="pts-indicator"
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 bg-lime"
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          ref={panelRef}
          id="pts-panel"
          role="tabpanel"
          aria-labelledby={`pts-tab-${example.id}`}
          tabIndex={0}
          className="grid border-x border-b border-line lg:grid-cols-2"
        >
          {/* Problem */}
          <div className="border-b border-line p-6 md:p-10 lg:border-r lg:border-b-0">
            <p className="text-label text-subtle">The problem</p>
            <blockquote className="mt-6 max-w-xl text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] leading-snug font-medium text-ink">
              <span aria-hidden="true" className="text-lime">
                “
              </span>
              {example.problem}
              <span aria-hidden="true" className="text-lime">
                ”
              </span>
            </blockquote>
            <div className="mt-10">
              <p className="text-label text-subtle">Often managed today through</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {example.today.map((t) => (
                  <li
                    key={t}
                    className="border border-dashed border-line-strong px-3 py-1.5 font-mono text-xs text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div aria-hidden="true" className="mt-10 flex items-center gap-3 text-subtle">
              <span className="text-label">Organize</span>
              <ArrowDown className="size-4 lg:hidden" />
              <ArrowRight className="hidden size-4 lg:block" />
            </div>
          </div>

          {/* Possible system */}
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-label text-lime">Possible system</p>
              <p className="text-label text-subtle">Illustrative</p>
            </div>
            <ol key={example.id} className="relative mt-6">
              <m.span
                aria-hidden="true"
                className="absolute top-3 bottom-3 left-[0.6875rem] w-px origin-top bg-line-strong"
                initial={hasSwitched ? { scaleY: 0 } : false}
                animate={{ scaleY: organized ? 1 : 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              />
              {example.system.map((step, k) => (
                <m.li
                  key={step}
                  className="relative flex min-h-12 items-center gap-5 py-2"
                  initial={hasSwitched ? { ...SCATTER[k % SCATTER.length], opacity: 0.55 } : false}
                  animate={
                    organized
                      ? { x: 0, y: 0, rotate: 0, opacity: 1 }
                      : { ...SCATTER[k % SCATTER.length], opacity: 0.55 }
                  }
                  transition={
                    organized ? { duration: 0.55, ease: EASE, delay: 0.08 + k * 0.07 } : { duration: 0 }
                  }
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-6 shrink-0 items-center justify-center border font-mono text-[0.625rem]",
                      k === 0 ? "border-lime bg-lime text-canvas" : "border-line-strong bg-raised text-muted",
                    )}
                  >
                    {k + 1}
                  </span>
                  <span className="text-base text-ink">{step}</span>
                </m.li>
              ))}
            </ol>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm text-muted">{problemToSystem.disclaimer}</p>
      </div>
    </section>
  );
}
