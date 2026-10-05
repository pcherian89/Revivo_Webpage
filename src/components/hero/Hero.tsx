import { ButtonLink } from "@/components/ui/ButtonLink";
import { primaryCta } from "@/config/site";
import { hero } from "@/content/home";
import { IntelligenceField } from "./IntelligenceField";

/**
 * The hero renders on the server: headline, copy and CTAs are visible
 * immediately. Only the Intelligence Field is interactive.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden pt-16 lg:pt-[4.5rem]">
      {/* Fine technical grid, faded toward the edges */}
      <div
        aria-hidden="true"
        className="bg-tech-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_65%_40%,black,transparent)]"
      />

      <div className="container-site relative grid items-center gap-x-10 gap-y-12 py-10 md:py-14 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-6">
          <p className="text-label flex items-center gap-3 text-muted">
            <span aria-hidden="true" className="inline-block size-2 bg-lime" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-heading" className="text-display-hero mt-6 text-balance md:mt-8">
            <span className="block text-muted">{hero.headline[0]}</span>
            <span className="mt-1 block text-ink">{hero.headline[1]}</span>
          </h1>

          <p className="text-lead measure mt-6 text-muted md:mt-8">{hero.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <p className="text-label mt-8 text-subtle md:mt-10">{hero.supportingLabel}</p>
        </div>

        <div className="lg:col-span-6">
          <IntelligenceField />
        </div>
      </div>

      <div aria-hidden="true" className="container-site relative hidden pb-6 lg:block">
        <div className="text-label flex justify-between border-t border-line pt-3 text-subtle">
          <span>N 20.59° / E 78.96°</span>
          <span>Field 01 — connected</span>
        </div>
      </div>
    </section>
  );
}
