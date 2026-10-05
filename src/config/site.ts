/**
 * SITE CONFIGURATION — contact details, public links and site URL.
 * Values can come from environment variables (see .env.example) or be typed
 * into the quotes below. Leave a value as "" to hide it: nothing is ever
 * shown as a fake link.
 */

const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** Absolute site URL used for canonical links, the sitemap and social cards. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelProductionHost ? `https://${vercelProductionHost}` : "http://localhost:3000")
).replace(/\/$/, "");

export const siteConfig = {
  name: "Revivo",
  tagline: "AI that gives sport a pulse.",
  description:
    "Revivo designs and builds custom AI solutions for sport and fitness—helping coaches track progress, clients see it, and organizations run, grow and protect what matters.",
  location: "India-based, working internationally",
  country: "IN",
  founder: "Pothen Cherian",
} as const;

export const contactConfig = {
  /** Public enquiry email. Shown in the footer and used for the email fallback. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  /** Company LinkedIn page, e.g. "https://www.linkedin.com/company/…" */
  linkedin: "",
  /** Optional WhatsApp click-to-chat link, e.g. "https://wa.me/91XXXXXXXXXX" */
  whatsapp: "",
  /** Optional booking link (Calendly, Cal.com, etc.) */
  booking: "",
} as const;

export const navLinks = [
  { label: "What we solve", href: "/#what-we-solve" },
  { label: "How we work", href: "/#how-we-work" },
] as const;

/** The one primary action, used everywhere. */
export const primaryCta = { label: "Start with your challenge", href: "/#start" } as const;
