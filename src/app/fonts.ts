import { Barlow_Condensed, JetBrains_Mono, Manrope } from "next/font/google";

/**
 * Three typography roles only:
 *  - Barlow Condensed → major display headlines
 *  - Manrope          → body text and navigation
 *  - JetBrains Mono   → labels, indices and system statuses
 * next/font self-hosts these at build time (no requests to Google at runtime).
 */
export const displayFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const sansFont = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jetbrains-mono",
  display: "swap",
  // Labels only — not needed for the first paint of the headline and copy.
  preload: false,
});
