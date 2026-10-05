import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { EchoSignal } from "@/components/signal/EchoSignal";
import { contactConfig } from "@/config/site";
import { finalCta } from "@/content/home";

/**
 * Scene 4 — one question and a short form. Beside it, the visitor's own signal
 * responds as they type, and three short lines say what happens next.
 */
export function FinalCtaScene() {
  return (
    <section
      id="start"
      aria-labelledby="start-heading"
      className="section-y border-t border-line bg-[linear-gradient(to_bottom,var(--color-raised),var(--color-canvas))]"
    >
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="label text-subtle">Start with your challenge</p>
          <h2 id="start-heading" className="text-title mt-3">
            {finalCta.title}
          </h2>
          <p className="text-lead mt-4 text-muted">{finalCta.support}</p>

          <ChallengeAside />
        </div>
        <div className="lg:col-span-7">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}

/** The visitor's signal, what happens next, and the email fallback — shared with /contact. */
export function ChallengeAside() {
  return (
    <>
      <EchoSignal />

      <div className="mt-10 hidden lg:block">
        <p className="label text-subtle">{finalCta.nextLabel}</p>
        <ol className="mt-4 space-y-3">
          {finalCta.next.map((step, i) => (
            <li key={step} className="flex items-baseline gap-4 text-muted">
              <span className="font-display text-sm font-bold text-lime">0{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {contactConfig.email && (
        <p className="text-small mt-8 text-subtle">
          Prefer email?{" "}
          <a
            href={`mailto:${contactConfig.email}`}
            className="text-ink underline underline-offset-4 hover:text-lime"
          >
            {contactConfig.email}
          </a>
        </p>
      )}
    </>
  );
}
