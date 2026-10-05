import { HeroSignal } from "@/components/signal/HeroSignal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { primaryCta } from "@/config/site";
import { hero } from "@/content/home";

/**
 * Scene 1 — one focused viewport. Server-rendered: the headline, statement and
 * actions are visible immediately; the signal is CSS-only.
 */
export function HeroScene() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-12 md:pb-16"
    >
      <div className="container-site">
        <p className="eyebrow text-muted">{hero.eyebrow}</p>
        <h1 id="hero-heading" className="text-hero mt-5 max-w-5xl md:mt-6">
          <span className="md:block">{hero.headline[0]} </span>
          <span className="md:block">{hero.headline[1]}</span>
        </h1>
        <p className="text-lead measure mt-6 text-muted md:mt-8">{hero.statement}</p>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6 md:mt-10">
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          <ButtonLink href={hero.secondaryAction.href} variant="quiet">
            {hero.secondaryAction.label}
          </ButtonLink>
        </div>
      </div>

      <div className="mt-14 md:mt-20">
        <HeroSignal />
      </div>

      <div className="container-site mt-6 md:mt-8">
        <p className="text-small text-subtle">{hero.audience}</p>
      </div>
    </section>
  );
}
