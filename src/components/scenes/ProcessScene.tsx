import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { primaryCta } from "@/config/site";
import { process } from "@/content/home";

/** Scene 4 — the signal settles into a calm rail: four milestones, one sentence each. */
export function ProcessScene() {
  return (
    <section id="how-we-work" aria-labelledby="process-heading" className="scene">
      <div className="container-site">
        <Reveal>
          <h2 id="process-heading" className="text-title max-w-4xl">
            {process.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="relative mt-12 grid gap-9 md:mt-16 lg:grid-cols-4 lg:gap-10">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong lg:hidden"
            />
            <span
              aria-hidden="true"
              className="absolute top-[5px] right-0 left-0 hidden h-px bg-line-strong lg:block"
            />
            {process.steps.map((step, i) => (
              <li key={step.name} className="relative pl-9 lg:pt-10 lg:pl-0">
                <span
                  aria-hidden="true"
                  className={`absolute top-1 left-0 size-[11px] rounded-full lg:top-0 ${
                    i === process.steps.length - 1 ? "bg-lime" : "border border-muted bg-canvas"
                  }`}
                />
                <h3 className="text-lead font-semibold text-ink">{step.name}</h3>
                <p className="mt-2 max-w-xs text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-14 flex flex-col gap-8 md:mt-20 lg:flex-row lg:items-end lg:justify-between">
          <p className="text-lead measure text-muted">{process.credibility}</p>
          <ButtonLink href={primaryCta.href} className="shrink-0 self-start lg:self-auto">
            {primaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
