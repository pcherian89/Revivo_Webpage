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
  /** The master tagline — exactly as written. */
  tagline: "AI built for the pulse of sport.",
  title: "Revivo — AI Built for the Pulse of Sport",
  description:
    "Revivo designs custom AI systems for sports operations, commercial growth, athlete development, performance, governance and impact.",
  socialDescription:
    "Custom AI solutions built around the people, decisions and systems that keep sport moving.",
  positioning: "Custom AI solutions for sports organizations worldwide.",
  founder: "Pothen Cherian",
} as const;

export const contactConfig = {
  /** Public enquiry email. Shown in the footer and used for the email fallback. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  /** Company LinkedIn page, e.g. "https://www.linkedin.com/company/…" */
  linkedin: "",
  /** Optional WhatsApp click-to-chat link, e.g. "https://wa.me/XXXXXXXXXXXX" */
  whatsapp: "",
  /** Optional booking link (Calendly, Cal.com, etc.) */
  booking: "",
} as const;

export const navLinks = [
  { label: "Capabilities", href: "/#explore" },
  { label: "How we work", href: "/#how-we-work" },
] as const;

/** The one primary action, used everywhere. */
export const primaryCta = { label: "Start with your challenge", href: "/#start" } as const;
