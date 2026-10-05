"use client";

import { m } from "motion/react";
import { useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useRevealState } from "@/components/motion/useRevealState";
import { useTabs } from "@/components/ui/useTabs";
import { stories } from "@/content/home";
import { heartbeatPath } from "@/lib/heartbeat";
import { cn } from "@/lib/cn";

type Mode = "static" | "quiet" | "play";

const EASE = [0.25, 1, 0.5, 1] as const;
const TRAVEL = 1.6; // seconds for the signal to cross all steps

/** Scene 3 — one transformation at a time: a quiet process becomes a living system. */
export function StoryScene() {
  const { items } = stories;
  const { selected, getTabProps } = useTabs(items.length);
  const [switched, setSwitched] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);
  const reveal = useRevealState(flowRef, "0px 0px -25% 0px");
  const story = items[selected];

  const mode: Mode = switched
    ? "play"
    : reveal === "hidden"
      ? "quiet"
      : reveal === "shown"
        ? "play"
        : "static";

  return (
    <section
      aria-labelledby="story-heading"
      className="scene bg-[linear-gradient(to_bottom,var(--color-canvas),var(--color-raised)_18%,var(--color-raised)_82%,var(--color-canvas))]"
    >
      <div className="container-site">
        <Reveal>
          <h2 id="story-heading" className="text-title">
            {stories.title}
          </h2>
          <p className="text-lead measure mt-5 text-muted">{stories.intro}</p>
        </Reveal>

        <div role="tablist" aria-label="Examples" className="mt-10 flex flex-wrap gap-x-8 gap-y-2 md:mt-12">
          {items.map((s, i) => {
            const props = getTabProps(i, { tab: `story-tab-${s.id}`, panel: "story-panel" });
            const isSelected = i === selected;
            return (
              <button
                key={s.id}
                {...props}
                onClick={() => {
                  props.onClick();
                  setSwitched(true);
                }}
                onKeyDown={(e) => {
                  props.onKeyDown(e);
                  if (e.key.startsWith("Arrow") || e.key === "Home" || e.key === "End") setSwitched(true);
                }}
                className={cn(
                  "relative min-h-11 py-2 text-base font-medium transition-colors duration-200",
                  isSelected ? "text-ink" : "text-subtle hover:text-muted",
                )}
              >
                {s.label}
                {isSelected && (
                  <m.span
                    layoutId="story-tab-line"
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-lime"
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          ref={flowRef}
          id="story-panel"
          role="tabpanel"
          aria-labelledby={`story-tab-${story.id}`}
          tabIndex={0}
          className="mt-10 rounded-xs md:mt-12"
        >
          <p className="text-subtitle max-w-3xl text-ink">
            <span aria-hidden="true" className="text-subtle">
              “
            </span>
            {story.problem}
            <span aria-hidden="true" className="text-subtle">
              ”
            </span>
          </p>
          <StoryFlow key={story.id} steps={story.steps} mode={mode} />
        </div>

        <p className="text-small mt-12 max-w-2xl text-subtle">{stories.qualifier}</p>
      </div>
    </section>
  );
}

type Step = { label: string; note?: string };

function StoryFlow({ steps, mode }: { steps: readonly Step[]; mode: Mode }) {
  const n = steps.length;
  const at = (i: number) => 0.15 + (i / Math.max(n - 1, 1)) * TRAVEL;
  const lit = mode !== "quiet";
  const animate = mode === "play";

  const track = (axis: "x" | "y") => (
    <m.span
      className={cn("absolute inset-0 bg-lime", axis === "x" ? "origin-left" : "origin-top")}
      initial={animate ? { [axis === "x" ? "scaleX" : "scaleY"]: 0 } : false}
      animate={{ [axis === "x" ? "scaleX" : "scaleY"]: lit ? 1 : 0 }}
      transition={animate ? { duration: TRAVEL, delay: 0.15, ease: "linear" } : { duration: 0 }}
    />
  );

  return (
    <ol className="relative mt-12 grid gap-7 md:mt-14 xl:grid-cols-7 xl:gap-5">
      {/* The signal track: vertical on small screens, horizontal on wide */}
      <span aria-hidden="true" className="absolute top-3 bottom-3 left-[11px] w-0.5 bg-line xl:hidden">
        {track("y")}
      </span>
      <span aria-hidden="true" className="absolute top-[11px] right-0 left-0 hidden h-0.5 bg-line xl:block">
        {track("x")}
      </span>

      {steps.map((step, i) => (
        <li key={step.label} className="relative flex gap-5 xl:flex-col xl:gap-4">
          <StepNode beat={Boolean(step.note)} lit={lit} animate={animate} delay={at(i)} />
          <div className="min-w-0 pt-0.5 xl:pt-0">
            <p className="font-medium text-ink">{step.label}</p>
            {step.note && (
              <m.p
                className="text-small mt-1 text-muted"
                initial={animate ? { opacity: 0 } : false}
                animate={{ opacity: lit ? 1 : 0 }}
                transition={animate ? { duration: 0.4, delay: at(i) + 0.1 } : { duration: 0 }}
              >
                {step.note}
              </m.p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** A step on the track: key moments get the Revivo heartbeat, others a dot. */
function StepNode({
  beat,
  lit,
  animate,
  delay,
}: {
  beat: boolean;
  lit: boolean;
  animate: boolean;
  delay: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="relative z-10 flex size-6 shrink-0 items-center justify-center bg-raised"
    >
      {beat ? (
        <svg viewBox="0 0 24 24" className="size-6 overflow-visible">
          {lit ? (
            <path
              className={animate ? "beat-once" : undefined}
              style={animate ? ({ animationDelay: `${delay}s` } as CSSProperties) : undefined}
              pathLength={1}
              d={heartbeatPath({ x: 0, y: 12, before: 4, after: 4, scale: 0.29 })}
              fill="none"
              stroke="#CCFF00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path d="M0 12 H24" stroke="#383B37" strokeWidth="2" />
          )}
        </svg>
      ) : (
        <span className="relative block size-2.5 rounded-full bg-line-strong">
          <m.span
            className="absolute inset-0 rounded-full bg-lime"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: lit ? 1 : 0 }}
            transition={animate ? { duration: 0.2, delay } : { duration: 0 }}
          />
        </span>
      )}
    </span>
  );
}
