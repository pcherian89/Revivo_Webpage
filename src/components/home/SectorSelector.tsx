"use client";

import { AnimatePresence, m } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTabs } from "@/components/ui/useTabs";
import { sectors } from "@/content/home";
import { cn } from "@/lib/cn";

const EASE = [0.25, 1, 0.5, 1] as const;

export function SectorSelector() {
  const { items, columns } = sectors;
  const { selected, getTabProps } = useTabs(items.length);
  const [interacted, setInteracted] = useState(false);
  const sector = items[selected];

  const steps = [
    { key: "challenge", label: columns.challenge, text: sector.challenge },
    { key: "system", label: columns.system, text: sector.system },
    { key: "outcome", label: columns.outcome, text: sector.outcome },
  ] as const;

  return (
    <section id="who-we-build-for" aria-labelledby="who-heading" className="section-pad">
      <div className="container-site">
        <SectionHeader
          index={sectors.index}
          label={sectors.label}
          annotation={sectors.annotation}
          headline={sectors.headline}
          headingId="who-heading"
        >
          <p className="text-lead measure mt-6 text-muted md:mt-8">{sectors.intro}</p>
        </SectionHeader>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div
            role="tablist"
            aria-label="Organization types"
            aria-orientation="vertical"
            className="grid grid-cols-1 gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1"
          >
            {items.map((item, i) => {
              const tabProps = getTabProps(i, { tab: `sector-tab-${item.id}`, panel: "sector-panel" });
              const isSelected = i === selected;
              return (
                <button
                  key={item.id}
                  {...tabProps}
                  onClick={() => {
                    tabProps.onClick();
                    setInteracted(true);
                  }}
                  onKeyDown={(e) => {
                    tabProps.onKeyDown(e);
                    setInteracted(true);
                  }}
                  className={cn(
                    "relative flex min-h-14 items-center gap-4 px-4 py-3 text-left text-[0.95rem] transition-colors duration-200",
                    isSelected
                      ? "bg-surface text-ink"
                      : "bg-canvas text-muted hover:bg-raised hover:text-ink",
                  )}
                >
                  <span className={cn("text-label w-6 shrink-0", isSelected ? "text-lime" : "text-subtle")}>
                    0{i + 1}
                  </span>
                  <span className="font-medium">{item.name}</span>
                  {isSelected && (
                    <m.span
                      layoutId="sector-indicator"
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-0.5 bg-lime"
                      transition={{ duration: 0.25, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            id="sector-panel"
            role="tabpanel"
            aria-labelledby={`sector-tab-${sector.id}`}
            tabIndex={0}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={sector.id}
                initial={interacted ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-5">
                  <h3 className="text-display-md">{sector.name}</h3>
                  <p className="text-label text-subtle">Illustrative workflow</p>
                </div>

                <ol className="mt-8 grid gap-4 xl:grid-cols-[1fr_auto_1fr_auto_1fr] xl:gap-0">
                  {steps.map((step, k) => (
                    <SectorStep
                      key={step.key}
                      index={k}
                      label={step.label}
                      text={step.text}
                      highlight={step.key === "system"}
                      last={k === steps.length - 1}
                    />
                  ))}
                </ol>
              </m.div>
            </AnimatePresence>
            <p className="mt-8 max-w-2xl text-sm text-muted">
              Potential outcomes depend on scope, data quality and how the system is adopted. Every engagement
              starts with discovery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectorStep({
  index,
  label,
  text,
  highlight,
  last,
}: {
  index: number;
  label: string;
  text: string;
  highlight: boolean;
  last: boolean;
}) {
  return (
    <>
      <li
        className={cn(
          "border-t p-5 md:p-6",
          highlight ? "border-lime bg-surface" : "border-line-strong bg-raised",
        )}
      >
        <p className={cn("text-label", highlight ? "text-lime" : "text-subtle")}>
          {String.fromCharCode(65 + index)} / {label}
        </p>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-ink">{text}</p>
      </li>
      {!last && (
        <li aria-hidden="true" className="flex items-center justify-center text-subtle xl:px-3">
          <ArrowDown className="size-4 xl:hidden" />
          <ArrowRight className="hidden size-4 xl:block" />
        </li>
      )}
    </>
  );
}
