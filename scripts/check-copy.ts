/**
 * Copy-density guard: keeps the homepage concise and the explorer consistent.
 * Run with `npm run check:copy`. Fails if any copy exceeds its limits.
 */
import { explorer, zones } from "../src/content/explorer.ts";
import { hero, process as processCopy } from "../src/content/home.ts";
import { products } from "../src/content/products.ts";

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const problems: string[] = [];
const limit = (label: string, text: string, max: number) => {
  const n = words(text);
  if (n > max) problems.push(`${label}: ${n} words (max ${max})`);
};

limit("hero.statement", hero.statement, 35);
limit("explorer.intro", explorer.intro, 40);
if (zones.length !== 4) problems.push(`zones: ${zones.length} (must be 4)`);
for (const z of zones) {
  limit(`zone "${z.name}" summary`, z.summary, 12);
  if (z.capabilities.length !== 4)
    problems.push(`zone "${z.name}": ${z.capabilities.length} capabilities (must be 4)`);
  for (const c of z.capabilities) {
    limit(`"${c.name}" short`, c.short, 14);
    limit(`"${c.name}" problem`, c.problem, 35);
    limit(`"${c.name}" build`, c.build, 45);
    limit(`"${c.name}" benefit`, c.benefit, 30);
    if (c.ai.length < 2 || c.ai.length > 3) problems.push(`"${c.name}": ${c.ai.length} AI examples (2–3)`);
    c.ai.forEach((a) => limit(`"${c.name}" AI example`, a, 16));
  }
}
for (const step of processCopy.steps) limit(`process "${step.name}"`, step.body, 20);

const banned = /\b(gym software|CRM|request a demo|our products|india)\b/i;
const all = JSON.stringify({ hero, explorer, zones, processCopy });
const hit = all.match(banned);
if (hit) problems.push(`banned phrase: "${hit[0]}"`);
// Products stay off the page until the owner approves them (showcase: true).
for (const p of products) {
  if (!p.showcase && all.toLowerCase().includes(p.name.toLowerCase()))
    problems.push(`unapproved product named in copy: "${p.name}"`);
}

if (problems.length) {
  console.error("Copy is over its limits:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("Copy within limits ✓ (4 zones · 16 capabilities)");
