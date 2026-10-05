import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pilotCta, primaryCta } from "@/config/site";
import { finalCta } from "@/content/home";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="section-pad relative overflow-hidden border-t border-line"
    >
      <ConvergenceLines />
      <div className="container-site relative">
        <Reveal>
          <p className="text-label flex items-center gap-3 text-muted">
            <span aria-hidden="true" className="inline-block size-2 bg-lime" />
            {finalCta.brandLine}
          </p>
          <h2 id="final-cta-heading" className="text-display-lg mt-8 max-w-4xl text-balance">
            <span className="block">{finalCta.headline[0]}</span>
            <span className="block text-muted">{finalCta.headline[1]}</span>
          </h2>
          <p className="text-lead measure mt-8 text-muted">{finalCta.body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href={pilotCta.href} variant="secondary">
              {pilotCta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Static decoration: fine lines converging on a single point of action. */
function ConvergenceLines() {
  const ys = [40, 110, 180, 250, 320, 390, 460];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 500"
      className="pointer-events-none absolute top-1/2 right-0 hidden h-[34rem] w-auto -translate-y-1/2 opacity-60 xl:block"
      fill="none"
    >
      {ys.map((y) => (
        <path key={y} d={`M 0 ${y} C 220 ${y}, 300 250, 470 250`} stroke="#252E26" strokeWidth="1" />
      ))}
      <path d="M 470 250 H 600" stroke="#3A453B" strokeWidth="1" />
      <rect x="463" y="243" width="14" height="14" transform="rotate(45 470 250)" fill="#CCFF00" />
    </svg>
  );
}
