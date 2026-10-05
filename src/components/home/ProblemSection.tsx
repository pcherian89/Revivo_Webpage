import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { problem } from "@/content/home";
import { cn } from "@/lib/cn";

// Small static offsets so "today" reads as fragmented on wide screens.
const OFFSETS = ["lg:ml-6", "lg:ml-0", "lg:ml-10", "lg:ml-3", "lg:ml-8", "lg:ml-1", "lg:ml-5"];

export function ProblemSection() {
  return (
    <section aria-labelledby="problem-heading" className="section-pad border-t border-line">
      <div className="container-site">
        <SectionHeader
          index={problem.index}
          label={problem.label}
          headline={problem.headline}
          headingId="problem-heading"
        >
          <p className="text-lead measure mt-6 text-muted md:mt-8">{problem.body}</p>
        </SectionHeader>

        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-12">
            <div>
              <p className="text-label text-subtle">{problem.todayLabel}</p>
              <ul className="mt-5 space-y-2">
                {problem.today.map((item, i) => (
                  <li
                    key={item}
                    className={cn(
                      "flex min-h-11 max-w-sm items-center gap-3 border border-dashed border-line-strong px-4 py-2 text-[0.95rem] text-muted",
                      OFFSETS[i % OFFSETS.length],
                    )}
                  >
                    <span aria-hidden="true" className="size-2 shrink-0 border border-subtle" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 lg:max-w-40 lg:flex-col lg:text-center">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center border border-line-strong text-lime"
              >
                <ArrowDown className="size-4 lg:hidden" />
                <ArrowRight className="hidden size-4 lg:block" />
              </span>
              <p className="text-label text-subtle">{problem.transformLine}</p>
            </div>

            <div>
              <p className="text-label text-subtle">{problem.betterLabel}</p>
              <ul className="relative mt-5 border-l border-line-strong">
                {problem.better.map((item) => (
                  <li key={item} className="relative flex min-h-14 items-center gap-4 pl-6">
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 -left-[5px] size-[9px] -translate-y-1/2 bg-lime"
                    />
                    <span className="text-display-md text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <p className="text-lead measure mt-16 border-t border-line pt-8 text-ink md:mt-20">
          {problem.closing}
        </p>
      </div>
    </section>
  );
}
