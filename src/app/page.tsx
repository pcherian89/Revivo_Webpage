import type { Metadata } from "next";
import gatewayImage from "@/assets/pilot/00-gateway.png";
import gatewayPhone from "@/assets/pilot/00-gateway-phone.png";
import gatewayPortrait from "@/assets/pilot/00-gateway-portrait.png";
import { gatewayUrls, PORTRAIT_QUERY, TALL_QUERY } from "@/components/gateway/boot";
import { Gateway } from "@/components/gateway/Gateway";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: siteConfig.title, description: siteConfig.socialDescription },
};

const art = gatewayUrls(gatewayImage.src, gatewayPortrait.src, gatewayPhone.src);

/** revivosportech.com — the cinematic gateway. The homepage lives at /home. */
export default function GatewayPage() {
  return (
    <>
      <link rel="preload" as="image" href={art.tall} media={TALL_QUERY} fetchPriority="high" />
      <link
        rel="preload"
        as="image"
        href={art.upright}
        media={`${PORTRAIT_QUERY} and (min-aspect-ratio: 2001/3000)`}
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={art.wide}
        media={`not all and ${PORTRAIT_QUERY}`}
        fetchPriority="high"
      />
      <Gateway />
    </>
  );
}
