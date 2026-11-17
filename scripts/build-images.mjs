/**
 * Build-time image variants (runs before `next build`).
 *
 * Every source image in src/assets/pilot is converted once, at build time, to WebP at the widths the site
 * requests, so no visitor waits for a first-request conversion. Output: public/img/<name>-<hash>-<width>.webp
 * (content-hashed, so a replaced image always gets new URLs). The custom image loader
 * (src/lib/image-loader.ts) reads src/lib/image-manifest.json to find them.
 */
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "src/assets/pilot";
const OUT = "public/img";
const MANIFEST = "src/lib/image-manifest.json";
/** Keep in step with images.deviceSizes / imageSizes in next.config.ts */
export const WIDTHS = [384, 640, 750, 828, 1080, 1200, 1672];
const QUALITY = 78;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const manifest = {};
const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();
let bytes = 0;
for (const file of files) {
  const buf = await readFile(path.join(SRC, file));
  const name = file.replace(/\.(png|jpe?g)$/i, "");
  const hash = createHash("sha256").update(buf).digest("hex").slice(0, 10);
  const { width: srcWidth } = await sharp(buf).metadata();
  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, srcWidth)))];
  for (const w of widths) {
    const out = await sharp(buf).resize({ width: w }).webp({ quality: QUALITY, effort: 6 }).toBuffer();
    bytes += out.length;
    await writeFile(path.join(OUT, `${name}-${hash}-${w}.webp`), out);
  }
  manifest[name] = { hash, widths };
}
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`build-images: ${files.length} images → ${Object.values(manifest).reduce((n, m) => n + m.widths.length, 0)} WebP files (${(bytes / 1048576).toFixed(1)} MB)`);
