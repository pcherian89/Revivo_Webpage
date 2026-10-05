/**
 * Copy-density guard: keeps the homepage short.
 * Run with `npm run check:copy`. Fails if any copy exceeds its word limit.
 */
import { flatlines, hero, process as processCopy, stories } from "../src/content/home.ts";

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const problems: string[] = [];
const limit = (label: string, text: string, max: number) => {
  const n = words(text);
  if (n > max) problems.push(`${label}: ${n} words (max ${max})`);
};

limit("hero.statement", hero.statement, 35);
limit("flatlines.intro", flatlines.intro, 40);
limit("stories.intro", stories.intro, 40);
for (const f of flatlines.items) {
  limit(`flatline "${f.name}" problem`, f.problem, 35);
  limit(`flatline "${f.name}" system`, f.system, 35);
  limit(`flatline "${f.name}" outcome`, f.outcome, 35);
}
if (stories.items.length > 3) problems.push(`stories: ${stories.items.length} (max 3)`);
for (const s of stories.items)
  for (const step of s.steps)
    if ("note" in step && step.note) limit(`story "${s.label}" note`, step.note, 12);
for (const step of processCopy.steps) limit(`process "${step.name}"`, step.body, 20);

if (problems.length) {
  console.error("Copy is over its limits:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("Copy within limits ✓");
