/* Gateway artwork URLs (server page preload + client CSS). */
import imageLoader from "@/lib/image-loader";

/** Upright screens (portrait iPads) get the upright artwork; landscape screens the wide one. */
export const PORTRAIT_QUERY = "(orientation: portrait)";
/** Tall upright screens (phones) get the tall 9:16 artwork, which fills them edge to edge. */
export const TALL_QUERY = "(orientation: portrait) and (max-aspect-ratio: 2/3)";

/** Build-time WebP URLs for the gateway artwork (see scripts/build-images.mjs). */
export function gatewayUrls(wide: string, upright: string, tall: string) {
  return {
    wide: imageLoader({ src: wide, width: 1672 }),
    upright: imageLoader({ src: upright, width: 1672 }),
    tall: imageLoader({ src: tall, width: 1672 }),
  };
}
