import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { contactConfig } from "@/config/site";
import { finalCta } from "@/content/home";

/** Scene 4 — one question and a short form. The final pulse sits on the submit button. */
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
          <h2 id="start-heading" className="text-title mt-4">
            {finalCta.title}
          </h2>
          <p className="text-lead mt-5 text-muted">{finalCta.support}</p>
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
        </div>
        <div className="lg:col-span-7">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
