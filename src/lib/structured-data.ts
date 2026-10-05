import { contactConfig, siteConfig, siteUrl } from "@/config/site";
import { zones } from "@/content/explorer";

/** schema.org data describing Revivo for search engines. Facts only. */
export function organizationJsonLd() {
  const sameAs = [contactConfig.linkedin].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    founder: { "@type": "Person", name: siteConfig.founder },
    areaServed: "Worldwide",
    knowsAbout: [
      "AI solutions for sport",
      "Sports operations and event technology",
      "Sponsorship and fan intelligence",
      "Athlete development and performance analysis",
      "Safeguarding and governance in sport",
      "Sports programme and grant impact",
      "Custom sports software development",
    ],
    ...(contactConfig.email
      ? { contactPoint: { "@type": "ContactPoint", contactType: "sales", email: contactConfig.email } }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#service`,
    name: "Custom AI solutions for sports organizations",
    serviceType: "Custom AI system design and development for sport",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Worldwide",
    audience: {
      "@type": "Audience",
      audienceType:
        "Teams, clubs, leagues, federations, events and venues, academies, gyms, community programmes, foundations, sports businesses and media organizations",
    },
    description: siteConfig.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solution areas",
      itemListElement: zones.map((z) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: z.name,
          description: `${z.summary} Illustrative capabilities, scoped through discovery for each organization.`,
        },
      })),
    },
  };
}

/** Safely serialise JSON-LD for a <script> tag. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
