/* Shared by the server layout (boot script) and the client Gateway. */
import imageLoader from "@/lib/image-loader";

/** sessionStorage key: set once the visitor has entered, so the gateway shows once per session. */
export const GATEWAY_KEY = "revivo-entered";

/**
 * Runs in <head> before first paint. Shows the gateway only on a first arrival at the homepage
 * (no deep-link hash) in this browser session, and preloads its artwork only then. Without
 * JavaScript the gateway never shows, so search engines and no-JS visitors get the site directly.
 */
export function gatewayBootScript(urls: { small: string; large: string }) {
  return `try{if(location.pathname==="/"&&!location.hash&&!sessionStorage.getItem("${GATEWAY_KEY}")){document.documentElement.classList.add("gw");var l=document.createElement("link");l.rel="preload";l.as="image";l.href=matchMedia("${SMALL_QUERY}").matches?${JSON.stringify(urls.small)}:${JSON.stringify(urls.large)};l.setAttribute("fetchpriority","high");document.head.appendChild(l)}}catch(e){}`;
}

/** Phones in portrait get the 1080px artwork; everything else the full 1672px. */
export const SMALL_QUERY = "(orientation: portrait) and (max-width: 480px)";

/** Build-time WebP URLs for the gateway artwork (see scripts/build-images.mjs). */
export function gatewayUrls(src: string) {
  return { small: imageLoader({ src, width: 1080 }), large: imageLoader({ src, width: 1672 }) };
}
