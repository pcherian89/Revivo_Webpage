/* Gateway artwork URLs (server page preload + client CSS). */
import imageLoader from "@/lib/image-loader";

/** Upright screens (phones, portrait iPads) get the upright artwork; landscape screens the wide one. */
export const PORTRAIT_QUERY = "(orientation: portrait)";
/** Phones in portrait get a lighter file of the upright artwork. */
export const SMALL_QUERY = "(orientation: portrait) and (max-width: 480px)";

/** Build-time WebP URLs for the gateway artwork (see scripts/build-images.mjs). */
export function gatewayUrls(wide: string, upright: string) {
  return {
    wide: imageLoader({ src: wide, width: 1672 }),
    upright: imageLoader({ src: upright, width: 1672 }),
    uprightSmall: imageLoader({ src: upright, width: 828 }),
  };
}
