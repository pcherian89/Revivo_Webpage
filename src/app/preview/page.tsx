import type { Metadata } from "next";
import { TreeHome } from "@/components/tree/TreeHome";
import { relatedProducts } from "@/content/products";

/**
 * PREVIEW of the new single-screen homepage ("The i is the intelligence").
 * Hidden from search engines and left out of the sitemap; the live homepage at /
 * is unchanged until the owner approves the switch.
 */
export const metadata: Metadata = {
  title: { absolute: "Revivo — Preview" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function PreviewPage() {
  return (
    <>
      {/* Lets CSS hide the expanded server render until the tree is ready (no flash) */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <TreeHome relatedProducts={relatedProducts()} />
    </>
  );
}
