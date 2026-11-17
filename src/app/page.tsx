import type { Metadata } from "next";
import gatewayImage from "@/assets/pilot/00-gateway.png";
import { gatewayUrls, SMALL_QUERY } from "@/components/gateway/boot";
import { Gateway } from "@/components/gateway/Gateway";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: siteConfig.title, description: siteConfig.socialDescription },
};

const art = gatewayUrls(gatewayImage.src);

/** revivosportech.com — the cinematic gateway. The homepage lives at /home. */
export default function GatewayPage() {
  return (
    <>
      <link rel="preload" as="image" href={art.small} media={SMALL_QUERY} fetchPriority="high" />
      <link
        rel="preload"
        as="image"
        href={art.large}
        media={`not all and ${SMALL_QUERY}`}
        fetchPriority="high"
      />
      <Gateway />
    </>
  );
}
