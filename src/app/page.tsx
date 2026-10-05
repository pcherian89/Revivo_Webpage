import type { Metadata } from "next";
import { DomainExplorer } from "@/components/explorer/DomainExplorer";
import { FinalCtaScene } from "@/components/scenes/FinalCtaScene";
import { HeroScene } from "@/components/scenes/HeroScene";
import { ProcessScene } from "@/components/scenes/ProcessScene";
import { siteConfig } from "@/config/site";
import { jsonLdScript, organizationJsonLd, servicesJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: siteConfig.title, description: siteConfig.socialDescription },
};

/** Hero signal → domain explorer → how Revivo works → final call to action. */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript([organizationJsonLd(), servicesJsonLd()]) }}
      />
      <HeroScene />
      <DomainExplorer />
      <ProcessScene />
      <FinalCtaScene />
    </>
  );
}
