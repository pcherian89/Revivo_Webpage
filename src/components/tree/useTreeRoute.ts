"use client";

import { useSyncExternalStore } from "react";
import { zones } from "@/content/explorer";

/**
 * The tree's state lives in the URL hash, so every level can be shared as a link
 * and the browser's Back button goes up one level:
 *   ""                      switched off
 *   #on                     powered on, four areas showing
 *   #events-operations      an area open (its four capabilities)
 *   #events-operations/x    a capability panel open
 *   #overview               every area open at once
 *   #talk                   the conversation panel (process + form)
 */
export type TreeRoute = {
  powered: boolean;
  view: "tree" | "overview" | "talk";
  zone: number | null;
  cap: number | null;
};

const OFF: TreeRoute = { powered: false, view: "tree", zone: null, cap: null };
const EVENT = "revivo:tree-route";

export function parseRoute(hash: string): TreeRoute {
  const h = decodeURIComponent(hash.replace(/^#/, ""));
  if (!h) return OFF;
  if (h === "on") return { ...OFF, powered: true };
  if (h === "overview") return { ...OFF, powered: true, view: "overview" };
  if (h === "talk") return { ...OFF, powered: true, view: "talk" };
  const [zoneId, capId] = h.split("/");
  const zone = zones.findIndex((z) => z.id === zoneId);
  if (zone < 0) return OFF;
  const cap = capId ? zones[zone].capabilities.findIndex((c) => c.id === capId) : -1;
  return { powered: true, view: "tree", zone, cap: cap < 0 ? null : cap };
}

export function routeHash(r: Partial<TreeRoute> & { powered: boolean }): string {
  if (!r.powered) return "";
  if (r.view === "overview") return "#overview";
  if (r.view === "talk") return "#talk";
  if (r.zone == null) return "#on";
  const z = zones[r.zone];
  return r.cap == null ? `#${z.id}` : `#${z.id}/${z.capabilities[r.cap].id}`;
}

/** Change level. Adds a history entry (so Back undoes it) unless `replace` is set. */
export function navigate(hash: string, replace = false) {
  const url = hash || window.location.pathname + window.location.search;
  if (replace) window.history.replaceState(null, "", url);
  else window.history.pushState(null, "", url);
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/** The current hash (empty on the server, so the server HTML is the switched-off state). */
export function useTreeHash() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => "",
  );
}
