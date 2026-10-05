import type { CSSProperties } from "react";
import { HeroSignal } from "@/components/signal/HeroSignal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { primaryCta } from "@/config/site";
import { hero } from "@/content/home";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Scene 1 — the hero. Server-rendered HTML (readable immediately, even if
 * animation fails); the signal is a decorative layer measured on the client.
 */
export function HeroScene() {
  const { headline } = hero;
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative flex min-h-[86svh] flex-col">
      <HeroSignal />
      <div className="container-site relative flex flex-1 flex-col justify-center pt-28 pb-36 lg:pt-32 lg:pb-32">
        <p className="label hero-fade text-subtle" style={delay(0)}>
          {hero.eyebrow}
        </p>
        <h1 id="hero-heading" className="text-hero mt-5 max-w-5xl">
          <span className="hero-fade block" style={delay(250)}>
            {headline.first}
          </span>{" "}
          <span className="hero-mask">
            <span style={delay(520)}>
              {headline.before}
              <span id="hero-pulse-word" className="text-lime">
                {headline.pulse}
              </span>
              {headline.after}
            </span>
          </span>
        </h1>
        <p id="hero-copy" className="text-lead measure hero-fade mt-8 text-muted lg:mt-14" style={delay(700)}>
          {hero.statement}
        </p>
        <div
          id="hero-actions"
          className="hero-fade mt-8 flex w-fit flex-col gap-3 sm:flex-row sm:items-center"
          style={delay(900)}
        >
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          <ButtonLink href={hero.secondaryAction.href} variant="secondary">
            {hero.secondaryAction.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
