import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import { HeroSignal } from "@/components/signal/HeroSignal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { primaryCta } from "@/config/site";
import { hero } from "@/content/home";
import { pilotHero } from "@/content/pilot-images";

const {
  props: { srcSet: heroSrcSet, sizes: heroSizes },
} = getImageProps({ src: pilotHero, alt: "", fill: true, sizes: "62vw" });
const heroPhoto = { srcSet: heroSrcSet, sizes: heroSizes };

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Scene 1 — the hero. Server-rendered HTML (readable immediately, even if
 * animation fails); the signal is a decorative layer measured on the client.
 */
export function HeroScene() {
  const { headline } = hero;
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex flex-col lg:min-h-[min(72svh,42rem)]"
    >
      {/* IMAGE PILOT: desktop/laptop only; sits under the signal and never sets the hero's height. */}
      <div
        aria-hidden="true"
        className="hero-photo pointer-events-none absolute inset-y-0 right-0 hidden lg:block"
      >
        {/* Only screens ≥1024px download it: phones get a 1×1 placeholder. */}
        <picture>
          <source media="(min-width: 1024px)" srcSet={heroPhoto.srcSet} sizes={heroPhoto.sizes} />
          <img
            alt=""
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "38% 50%" }}
          />
        </picture>
      </div>
      <HeroSignal />
      <div className="container-site relative flex flex-1 flex-col justify-center pt-24 pb-24 lg:pt-28 lg:pb-16">
        <p className="label hero-fade text-subtle" style={delay(0)}>
          {hero.eyebrow}
        </p>
        {/* One statement on two lines; the running pulse sits beneath the whole headline. */}
        <h1 id="hero-heading" className="text-hero mt-4 max-w-4xl leading-[0.92]">
          <span className="hero-fade block" style={delay(250)}>
            <span id="hero-pulse-word" className="text-lime">
              {headline.line1.pulse}
            </span>
            {headline.line1.rest}
          </span>{" "}
          <span className="hero-mask">
            <span style={delay(520)}>
              <span className="text-lime">{headline.line2.accent}</span>
              {headline.line2.rest}
            </span>
          </span>
        </h1>
        <p
          id="hero-copy"
          className="text-lead measure hero-fade mt-[72px] text-muted lg:mt-[80px]"
          style={delay(700)}
        >
          {hero.statement}
        </p>
        <div
          id="hero-actions"
          className="hero-fade mt-7 flex w-fit flex-col gap-3 sm:flex-row sm:items-center"
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
