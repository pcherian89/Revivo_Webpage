import { contactConfig, siteConfig, siteUrl } from "@/config/site";
import { capabilities } from "@/content/home";

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
    address: { "@type": "PostalAddress", addressCountry: siteConfig.country },
    areaServed: "Worldwide",
    knowsAbout: [
      "AI solutions for sports",
      "Sports technology development",
      "Sports analytics and data",
      "Sports workflow automation",
      "Athlete-development systems",
      "Sports event operations",
      "Sponsorship technology",
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
    name: "Custom AI, data and automation solutions for sports and fitness organizations",
    serviceType: "Custom sports software and AI solution development",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Worldwide",
    audience: {
      "@type": "Audience",
      audienceType:
        "Gyms, sports academies, teams, leagues, events and venues, federations, sports foundations and sponsorship organizations",
    },
    description: siteConfig.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solution areas",
      itemListElement: capabilities.channels.map((c) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: c.name,
          description: `${c.summary} Scoped through discovery for each organization.`,
        },
      })),
    },
  };
}

/** Safely serialise JSON-LD for a <script> tag. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
