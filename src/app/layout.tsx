import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import gatewayImage from "@/assets/pilot/00-gateway.png";
import { gatewayBootScript, gatewayUrls } from "@/components/gateway/boot";
import { Gateway } from "@/components/gateway/Gateway";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { siteConfig, siteUrl } from "@/config/site";
import { displayFont, sansFont } from "./fonts";
import "./globals.css";

const title = siteConfig.title;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en",
    title: siteConfig.socialTitle,
    description: siteConfig.socialDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.socialTitle,
    description: siteConfig.socialDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

const gatewayArt = gatewayUrls(gatewayImage.src);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${sansFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* First arrival only: decide before first paint whether the gateway shows. */}
        <script dangerouslySetInnerHTML={{ __html: gatewayBootScript(gatewayArt) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-xs bg-lime px-5 py-3 font-display text-base font-bold text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <Gateway />
        </MotionProvider>
      </body>
    </html>
  );
}
