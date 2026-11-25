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
  if (z.capabilities.length !== 3)
    problems.push(`zone "${z.name}": ${z.capabilities.length} capabilities (must be 3)`);
  for (const c of z.capabilities) {
    limit(`"${c.name}" short`, c.short, 14);
    if (!c.audience) problems.push(`"${c.name}": missing "For" line (audience)`);
    else limit(`"${c.name}" audience`, c.audience, 8);
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
// One product, one home: every showcased product links to exactly one existing capability, and no capability
// is home to more than one showcased product.
const capIds = new Set(zones.flatMap((z) => z.capabilities.map((c) => c.id)));
const homes = new Map<string, string>();
for (const p of products) {
  for (const id of p.capabilities)
    if (!capIds.has(id)) problems.push(`product "${p.name}" links to unknown capability "${id}"`);
  if (!p.showcase) continue;
  if (p.capabilities.length !== 1)
    problems.push(`showcased product "${p.name}" must have exactly one home capability`);
  const home = p.capabilities[0];
  if (homes.has(home)) problems.push(`capability "${home}" is home to two products`);
  homes.set(home, p.name);
}
// Products stay off the page until the owner approves them (showcase: true).
for (const p of products) {
  if (!p.showcase && all.toLowerCase().includes(p.name.toLowerCase()))
    problems.push(`unapproved product named in copy: "${p.name}"`);
}

if (problems.length) {
  console.error("Copy is over its limits:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("Copy within limits ✓ (4 zones · 12 capabilities)");
