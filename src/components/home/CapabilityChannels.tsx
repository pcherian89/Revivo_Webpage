"use client";

import { m } from "motion/react";
import { Info, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { capabilities } from "@/content/home";
import { cn } from "@/lib/cn";

// Static class lists so Tailwind can see them. Rows place each channel on
// desktop; the active panel sits in the right column spanning all rows.
const ROW = ["lg:row-start-1", "lg:row-start-2", "lg:row-start-3", "lg:row-start-4", "lg:row-start-5"];

const EASE = [0.25, 1, 0.5, 1] as const;

export function CapabilityChannels() {
  const [active, setActive] = useState(0);
  // The first panel is server-rendered fully visible; only later selections animate.
  const [interacted, setInteracted] = useState(false);

  return (
    <section id="what-we-build" aria-labelledby="what-we-build-heading" className="section-pad">
      <div className="container-site">
        <SectionHeader
          index={capabilities.index}
          label={capabilities.label}
          annotation={capabilities.annotation}
          headline={capabilities.headline}
          headingId="what-we-build-heading"
        >
          <p className="text-lead measure mt-6 text-muted md:mt-8">{capabilities.intro}</p>
        </SectionHeader>

        <Reveal>
          <div className="grid border-t border-line lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[repeat(5,auto)_1fr] lg:gap-x-16">
            {capabilities.channels.map((channel, i) => {
              const isActive = i === active;
              const panelId = `channel-panel-${channel.id}`;
              const buttonId = `channel-button-${channel.id}`;
              return [
                <h3 key={`${channel.id}-h`} className={cn("border-b border-line lg:col-start-1", ROW[i])}>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => {
                      setActive(i);
                      setInteracted(true);
                    }}
                    className="group flex min-h-[4.5rem] w-full items-center gap-4 py-4 text-left md:gap-6"
                  >
                    <span className={cn("text-label w-6 shrink-0", isActive ? "text-lime" : "text-subtle")}>
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "text-display-md shrink-0 transition-colors duration-200",
                        isActive ? "text-ink" : "text-muted group-hover:text-ink",
                      )}
                    >
                      {channel.name}
                    </span>
                    {/* Signal line — only the active channel carries the lime signal */}
                    <span aria-hidden="true" className="relative hidden h-px min-w-8 flex-1 bg-line sm:block">
                      <m.span
                        className="absolute inset-0 origin-left bg-lime"
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: isActive ? 0.6 : 0.2, ease: EASE }}
                      />
                      <m.span
                        className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 bg-lime"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.2, delay: isActive ? 0.5 : 0 }}
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn("ml-auto shrink-0", isActive ? "text-lime" : "text-subtle")}
                    >
                      {isActive ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                </h3>,
                isActive && (
                  <div
                    key={`${channel.id}-p`}
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="border-b border-line pt-2 pb-8 lg:col-start-2 lg:[grid-row:1/span_6] lg:border-b-0 lg:pt-6 lg:pb-0"
                  >
                    <ChannelPanel index={i} animateIn={interacted} />
                  </div>
                ),
              ];
            })}
          </div>
        </Reveal>

        <p className="mt-10 flex max-w-3xl gap-3 text-sm text-muted">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-subtle" />
          <span>{capabilities.qualifier}</span>
        </p>
      </div>
    </section>
  );
}

function ChannelPanel({ index, animateIn }: { index: number; animateIn: boolean }) {
  const channel = capabilities.channels[index];
  return (
    <div>
      <p className="text-label hidden text-subtle lg:block">
        Channel 0{index + 1} / {channel.name}
      </p>
      <m.p
        className="text-lead mt-0 max-w-xl text-ink lg:mt-6"
        initial={animateIn ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        {channel.summary}
      </m.p>
      <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:mt-10">
        {channel.items.map((item, k) => (
          <m.li
            key={item}
            className="flex min-h-12 items-center gap-4 border-t border-line py-3 text-[0.95rem] text-ink"
            initial={animateIn ? { opacity: 0, x: -8 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.35 + k * 0.05, ease: EASE }}
          >
            <span className="text-label text-subtle" aria-hidden="true">
              {String(index + 1)}.{k + 1}
            </span>
            {item}
          </m.li>
        ))}
      </ul>
    </div>
  );
}
