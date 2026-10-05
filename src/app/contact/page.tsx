import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactConfig } from "@/config/site";
import { contactPage, nextSteps } from "@/content/contact";

export const metadata: Metadata = {
  title: "Tell us the problem",
  description:
    "Discuss a sports or fitness problem with Revivo. Tell us what is not working, how it is handled today and what a better outcome would look like.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { intent } = await searchParams;
  const defaultNextStep = intent === "pilot" ? nextSteps[2] : intent === "prototype" ? nextSteps[1] : "";

  return (
    <div className="pt-16 lg:pt-[4.5rem]">
      <div className="container-site grid gap-14 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="text-label flex items-center gap-3 text-muted">
              <span aria-hidden="true" className="inline-block size-2 bg-lime" />
              {contactPage.label}
            </p>
            <h1 className="text-display-lg mt-6 text-balance">
              <span className="block">{contactPage.headline[0]}</span>
              <span className="block text-muted">{contactPage.headline[1]}</span>
            </h1>
            <p className="text-lead mt-6 text-muted">{contactPage.intro}</p>

            <ul className="mt-10 border-t border-line">
              {contactPage.expectations.map((item, i) => (
                <li key={item.title} className="border-b border-line py-5">
                  <p className="text-label text-subtle">
                    <span className="text-lime">0{i + 1}</span> / {item.title}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.body}</p>
                </li>
              ))}
            </ul>

            <DirectLinks />
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm defaultNextStep={defaultNextStep} />
        </div>
      </div>
    </div>
  );
}

function DirectLinks() {
  const links = [
    contactConfig.email && {
      label: "Email",
      value: contactConfig.email,
      href: `mailto:${contactConfig.email}`,
    },
    contactConfig.booking && { label: "Book a call", value: "Choose a time", href: contactConfig.booking },
    contactConfig.whatsapp && { label: "WhatsApp", value: "Message us", href: contactConfig.whatsapp },
    contactConfig.linkedin && {
      label: "LinkedIn",
      value: "Revivo on LinkedIn",
      href: contactConfig.linkedin,
    },
  ].filter(Boolean) as Array<{ label: string; value: string; href: string }>;

  if (!links.length) return null;

  return (
    <div className="mt-10">
      <p className="text-label text-subtle">Prefer to reach us directly?</p>
      <ul className="mt-3 space-y-1">
        {links.map((l) => {
          const external = l.href.startsWith("http");
          return (
            <li key={l.label}>
              <a
                href={l.href}
                className="inline-flex min-h-11 items-center gap-3 text-sm text-ink hover:text-lime"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="text-label w-24 text-subtle">{l.label}</span>
                {l.value}
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
