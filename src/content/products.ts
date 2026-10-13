/**
 * REVIVO PRODUCTS — internal associations between Revivo products and the
 * explorer capabilities. Products are NOT a separate website category.
 *
 * - A capability can relate to zero, one or several products; a product can
 *   relate to several capabilities (list capability ids from `explorer.ts`).
 * - Nothing here appears on the site until the owner approves it: set
 *   `showcase: true` and give the product an `href` to its information page.
 *   The capability panel then shows a "Related Revivo product" link.
 * - Only showcased products are passed to the browser (see `relatedProducts`),
 *   so unannounced product names never reach the page or its JavaScript.
 */

export type ProductStatus = "concept" | "in-development" | "pilot" | "available";

export type Product = {
  id: string;
  name: string;
  status: ProductStatus;
  /** Capability ids from src/content/explorer.ts */
  capabilities: readonly string[];
  /** Owner-approved for public display */
  showcase: boolean;
  /** Product information page, required before showcasing */
  href?: string;
  /** One line shown in the panel when showcased */
  summary?: string;
};

export const products: readonly Product[] = [
  {
    id: "revivo-flow",
    name: "Revivo Flow",
    status: "in-development",
    capabilities: ["event-planning-coordination"],
    showcase: false,
  },
  {
    id: "revivo-training",
    name: "Revivo Training",
    status: "in-development",
    capabilities: ["training-performance-monitoring"],
    showcase: false,
  },
  {
    id: "event-promotion-analytics",
    name: "Event Promotion & Analytics",
    status: "concept",
    capabilities: ["social-media-campaigns"],
    showcase: false,
  },
];

/** What the panel needs to show a related product. */
export type RelatedProduct = { id: string; name: string; href: string; summary?: string };

/**
 * Showcased products for each capability id. Call on the server and pass the
 * result to the explorer; products without approval or a page are left out.
 */
export function relatedProducts(): Record<string, RelatedProduct[]> {
  const out: Record<string, RelatedProduct[]> = {};
  for (const p of products) {
    if (!p.showcase || !p.href) continue;
    for (const capId of p.capabilities) {
      (out[capId] ??= []).push({ id: p.id, name: p.name, href: p.href, summary: p.summary });
    }
  }
  return out;
}
