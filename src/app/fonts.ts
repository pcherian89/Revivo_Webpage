import { Barlow_Condensed, Manrope } from "next/font/google";

/**
 * The same pairing as Revivo IQ, so both feel like one brand family:
 *  - Barlow Condensed 700 → headlines, labels, buttons
 *  - Manrope 400 / 500   → body copy and navigation
 * Two families, three weights. next/font self-hosts them at build time.
 */
export const displayFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const sansFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-manrope",
  display: "swap",
});
