import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { contactConfig } from "@/config/site";

// STARTER TERMS — have them reviewed by a qualified lawyer before launch.

export const metadata: Metadata = {
  title: "Website terms",
  description: "Terms for using the Revivo website.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Website terms"
      updated="5 October 2026"
      intro={<p>These terms apply to your use of this website. By using it, you agree to them.</p>}
      sections={[
        {
          heading: "About this website",
          body: (
            <p>
              This website describes what Revivo can design and build: custom AI solutions for sport and
              fitness organizations. It is provided for general information only.
            </p>
          ),
        },
        {
          heading: "Illustrative content",
          body: (
            <p>
              Solution areas, example systems, workflows and potential outcomes shown on this website are
              illustrative. They are not finished products, offers or guarantees of results. Any engagement is
              scoped separately and governed by a written agreement.
            </p>
          ),
        },
        {
          heading: "No professional advice",
          body: (
            <p>
              Nothing on this website is medical, legal, financial or safeguarding advice. Systems Revivo
              builds are designed to support—not replace—the judgement of qualified people.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              The Revivo name, logo, text, graphics and design of this website belong to Revivo unless stated
              otherwise. Please do not reuse them without permission.
            </p>
          ),
        },
        {
          heading: "Third-party links",
          body: (
            <p>
              Links to other websites are provided for convenience. Revivo is not responsible for their
              content.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              We work to keep this website accurate and available but cannot guarantee that it is always
              complete, current or uninterrupted. To the extent permitted by law, Revivo is not liable for
              losses arising from use of this website.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: <p>These terms are governed by the laws of India.</p>,
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms can be sent via{" "}
              {contactConfig.email ? (
                <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>
              ) : (
                <Link href="/contact">our contact page</Link>
              )}
              .
            </p>
          ),
        },
      ]}
    />
  );
}
