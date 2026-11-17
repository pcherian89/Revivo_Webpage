import type { ImageLoaderProps } from "next/image";
import manifest from "./image-manifest.json";

type Entry = { hash: string; widths: number[] };
const images = manifest as Record<string, Entry>;

/**
 * Serves the WebP variants made at build time by scripts/build-images.mjs (no runtime conversion).
 * `src` is a static import URL such as /_next/static/media/01-hero.<hash>.png; anything not in the
 * manifest is returned unchanged.
 */
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const name = src.match(/\/([^/.]+)\.[^/.]+\.(?:png|jpe?g)$/i)?.[1];
  const entry = name ? images[name] : undefined;
  if (!entry) return src;
  const w = entry.widths.find((x) => x >= width) ?? entry.widths[entry.widths.length - 1];
  return `/img/${name}-${entry.hash}-${w}.webp`;
}
