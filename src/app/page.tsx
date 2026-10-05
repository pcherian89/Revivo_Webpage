import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { CapabilityChannels } from "@/components/home/CapabilityChannels";
import { DeliveryOptions } from "@/components/home/DeliveryOptions";
import { FinalCta } from "@/components/home/FinalCta";
import { FounderSection } from "@/components/home/FounderSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ProblemToSystem } from "@/components/home/ProblemToSystem";
import { ProcessSection } from "@/components/home/ProcessSection";
import { SectorSelector } from "@/components/home/SectorSelector";
import { WhyRevivo } from "@/components/home/WhyRevivo";
import { jsonLdScript, organizationJsonLd, servicesJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: "Revivo — AI Systems for Sport | Custom AI solutions for sports and fitness" },
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript([organizationJsonLd(), servicesJsonLd()]) }}
      />
      <Hero />
      <ProblemSection />
      <CapabilityChannels />
      <ProblemToSystem />
      <SectorSelector />
      <ProcessSection />
      <DeliveryOptions />
      <div id="about">
        <WhyRevivo />
        <FounderSection />
      </div>
      <FinalCta />
    </>
  );
}
