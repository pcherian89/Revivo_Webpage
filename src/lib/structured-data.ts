import { contactConfig, siteConfig, siteUrl } from "@/config/site";
import { flatlines } from "@/content/home";

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
      "AI for fitness and coaching",
      "Athlete and client progress tracking",
      "Athlete-development pathways",
      "Sports event operations",
      "Sports analytics and data",
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
    name: "Custom AI solutions for sport and fitness organizations",
    serviceType: "Custom AI solution design and development for sport and fitness",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Worldwide",
    audience: {
      "@type": "Audience",
      audienceType:
        "Coaches, academies, clubs, fitness studios, teams, leagues, events, venues, federations and sports foundations",
    },
    description: siteConfig.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Problems we help solve",
      itemListElement: flatlines.items.map((f) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: f.name,
          description: `${f.system} Scoped through discovery for each organization.`,
        },
      })),
    },
  };
}

/** Safely serialise JSON-LD for a <script> tag. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
