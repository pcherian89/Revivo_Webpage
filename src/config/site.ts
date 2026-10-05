/**
 * SITE CONFIGURATION — the single place for Revivo's contact details,
 * public links and site URL.
 *
 * Values can come from environment variables (see .env.example) or be typed
 * directly into the quotes below. Leave a value as "" to hide it on the site:
 * nothing is ever shown as a fake link.
 */

const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** Absolute site URL used for canonical links, the sitemap and social cards. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelProductionHost ? `https://${vercelProductionHost}` : "http://localhost:3000")
).replace(/\/$/, "");

export const siteConfig = {
  name: "Revivo",
  wordmark: "REVIVO",
  descriptor: "AI Systems for Sport",
  tagline: "Sport, intelligently built.",
  positioning: "A specialist AI solutions builder for sports and fitness.",
  description:
    "Revivo designs custom AI, data and automation solutions for sports and fitness organizations across operations, commercial growth, athlete development, performance and safety.",
  location: "India-based, available internationally",
  country: "IN",
  founder: "Pothen Cherian",
} as const;

export const contactConfig = {
  /** Public enquiry email. Shown on the contact page and used for the email fallback. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  /** Company LinkedIn page, e.g. "https://www.linkedin.com/company/…" */
  linkedin: "",
  /** Optional WhatsApp click-to-chat link, e.g. "https://wa.me/91XXXXXXXXXX" */
  whatsapp: "",
  /** Optional booking link (Calendly, Cal.com, etc.) */
  booking: "",
} as const;

export const navLinks = [
  { label: "What We Build", href: "/#what-we-build" },
  { label: "Who We Build For", href: "/#who-we-build-for" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "About", href: "/#about" },
] as const;

export const primaryCta = { label: "Tell us the problem", href: "/contact" } as const;
export const pilotCta = {
  label: "Apply to become a pilot partner",
  href: "/contact?intent=pilot",
} as const;
