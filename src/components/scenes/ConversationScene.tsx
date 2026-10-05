import { Reveal } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { contactConfig } from "@/config/site";
import { conversation } from "@/content/home";

/** Scene 5 — one question, one short form. The signal ends at the submit button. */
export function ConversationScene() {
  return (
    <section
      id="start"
      aria-labelledby="start-heading"
      className="scene bg-[linear-gradient(to_bottom,var(--color-canvas),var(--color-raised))]"
    >
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 id="start-heading" className="text-title">
            {conversation.title}
          </h2>
          <p className="text-lead mt-5 text-muted">{conversation.support}</p>
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
        </Reveal>
        <div className="lg:col-span-7">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
