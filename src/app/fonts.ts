import { Manrope } from "next/font/google";

/**
 * One family, three weights (400 body · 500 interface · 600 headlines).
 * Manrope's calm geometric forms sit naturally beside the lowercase Revivo
 * wordmark. next/font self-hosts it at build time (no runtime Google requests).
 */
export const sansFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});
