import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { contactConfig } from "@/config/site";

// STARTER POLICY — have it reviewed by a qualified lawyer before Revivo
// processes sensitive client, athlete or health-related information.

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Revivo collects and uses information submitted through this website.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

const contactLine = contactConfig.email ? (
  <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>
) : (
  <Link href="/contact">our contact page</Link>
);

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="6 October 2026"
      intro={
        <p>
          This policy explains what information Revivo collects through this website, why we collect it and
          how we handle it. Revivo is an early-stage company.
        </p>
      }
      sections={[
        {
          heading: "Information we collect",
          body: (
            <>
              <p>When you submit an enquiry, we collect the details you choose to provide, such as:</p>
              <ul>
                <li>your name, work email and (optionally) phone number;</li>
                <li>your organization’s name, type and country;</li>
                <li>
                  your description of the problem, current process, users, desired outcome, timeline and
                  budget.
                </li>
              </ul>
              <p>
                Please do not submit sensitive personal information—such as medical, health or
                athlete-identifying data—through the website form.
              </p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              We use enquiry information only to respond to you, understand your requirements, and discuss a
              possible discovery conversation, prototype, pilot or project. We do not sell your information.
            </p>
          ),
        },
        {
          heading: "Service providers",
          body: (
            <p>
              We rely on trusted providers to operate this website and deliver enquiries—for example, website
              hosting and an email-delivery service. They process information on our behalf and only as needed
              to provide their services. Some providers may store or process data in other countries.
            </p>
          ),
        },
        {
          heading: "Cookies and analytics",
          body: (
            <p>
              This website does not currently use advertising or analytics cookies. If that changes, we will
              update this policy and, where required, ask for your consent.
            </p>
          ),
        },
        {
          heading: "Retention",
          body: (
            <p>
              We keep enquiry information for as long as needed to respond and to manage any resulting
              relationship, and then delete it unless we need to keep it for legal or accounting reasons.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You can ask us to access, correct or delete the information you have provided, or withdraw your
              consent to further contact, by writing to {contactLine}.
            </p>
          ),
        },
        {
          heading: "Changes",
          body: (
            <p>We may update this policy as Revivo grows. The date at the top shows when it last changed.</p>
          ),
        },
      ]}
    />
  );
}
