/* Gateway artwork URLs (server page preload + client CSS). */
import imageLoader from "@/lib/image-loader";

/** Phones in portrait get the 1080px artwork; everything else the full 1672px. */
export const SMALL_QUERY = "(orientation: portrait) and (max-width: 480px)";

/** Build-time WebP URLs for the gateway artwork (see scripts/build-images.mjs). */
export function gatewayUrls(src: string) {
  return { small: imageLoader({ src, width: 1080 }), large: imageLoader({ src, width: 1672 }) };
}
