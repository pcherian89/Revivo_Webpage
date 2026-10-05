import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { ChallengeAside } from "@/components/scenes/FinalCtaScene";
import { finalCta } from "@/content/home";

export const metadata: Metadata = {
  title: "Start with your challenge",
  description:
    "Tell Revivo the process, bottleneck or decision in your sports organization that needs to work better. A person reads every message.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="section-y pt-28 md:pt-36">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="label text-subtle">Start with your challenge</p>
          <h1 className="text-title mt-5">{finalCta.title}</h1>
          <p className="text-lead mt-5 text-muted">{finalCta.support}</p>
          <ChallengeAside />
        </div>
        <div className="lg:col-span-7">
          <EnquiryForm idPrefix="contact" />
        </div>
      </div>
    </div>
  );
}
