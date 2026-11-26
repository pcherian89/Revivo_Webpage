import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Images are pre-converted to WebP at build time (scripts/build-images.mjs) and served as static
  // files by a custom loader, so no visitor waits for on-demand conversion.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 750, 828, 1080, 1200, 1672],
    imageSizes: [384],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The Revivo Pathway prototype (fictional data) is linked from /pathway but kept out of search results.
      { source: "/pathway/demo", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/pathway-demo.html", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      // The Revivo Impact prototype (fictional data) is linked from /impact, also kept out of search results.
      { source: "/impact/demo", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/impact-demo.html", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  async rewrites() {
    // Each prototype is one self-contained HTML file in public/.
    return [
      { source: "/pathway/demo", destination: "/pathway-demo.html" },
      { source: "/impact/demo", destination: "/impact-demo.html" },
    ];
  },
};

export default nextConfig;
