# CLAUDE.md — rules for working on the Revivo website

**Read this whole file before making any change.** It encodes brand, accuracy and engineering decisions that must hold
across sessions. Also read `AGENTS.md` (Next.js 16 has breaking changes — consult `node_modules/next/dist/docs/`).

## 1. Positioning

Revivo is **"a specialist AI solutions builder for sports and fitness."** It is an early-stage, India-based company
serving Indian and international organizations. It designs and builds tailored AI, data and automation solutions —
from operations and commercial growth to athlete development, performance and safety.

Revivo works with clients to: understand the problem → study workflow and data → identify users, decisions and success
measures → design → prototype/pilot → build and deploy → support and improve.

Revivo is **not**: a generic software agency, a catalogue of finished apps, a self-service SaaS product, a
report-only consultancy, or a company that claims to solve every sports problem automatically.

**There are no finished commercial products yet.** Every example on the site is an illustrative solution area.
Never write "Our Products". Revivo IQ (a separate application) must **not** appear on this launch website.

## 2. Approved language

- Descriptor: **AI SYSTEMS FOR SPORT** · Master tagline: **SPORT, INTELLIGENTLY BUILT.**
- Hero eyebrow: **THE GAME IS ONLY THE VISIBLE PART.**
- Hero headline: **SPORT CREATES THE CHALLENGES. / WE BUILD THE INTELLIGENCE.**
- Primary CTA: **TELL US THE PROBLEM** · Secondary: **EXPLORE WHAT WE CAN BUILD**
- Additional lines: From fragmented activity to coordinated intelligence. · Custom where it matters. Reusable where it
  makes sense. · Customer-shaped. Revivo-built. · One challenge. The right system. · Designed for sport. Configured
  for you. · Technology should clarify the next move. · Sport moves fast. Its systems often do not. · Bring us the
  process slowing your organization down.
- Preferred vocabulary: what we can build, problems we help solve, example/illustrative system, capabilities, scoped
  discovery, prototype, pilot, custom implementation, decision support, built around your workflow, could, designed
  to, supports, potential outcome.
- Required qualifier near capability examples (keep verbatim): _"These are representative solution areas. Every
  engagement begins with discovery, and the final system is scoped around the organization's users, workflow, data
  and objectives."_

**Tone:** intelligent but understandable; ambitious but credible; premium but not cold; technical but problem-led;
athletic but not aggressive; confident without exaggeration.

**Avoid:** revolutionizing sports, game-changing innovation, repeated "cutting-edge AI", unlocking limitless
potential, disrupting the ecosystem, one platform for everything.

## 3. Prohibited claims (never add, even if asked casually — confirm with the owner first)

- Describing examples as completed Revivo products, or fake product screenshots/dashboards implying deployed systems
- Invented customers, partners, testimonials, logos, revenue or performance statistics; "Trusted by" without real clients
- "India's leading sports AI company" or similar superlatives
- Guaranteed revenue or performance improvement
- Injury prediction, medical diagnosis, or fully autonomous decision-making
- Calling third-party foundation models "proprietary AI"
- Suggesting every capability is already built
- Implying ICC or any US organization from the founder's background is a Revivo client/partner
- Certifications or legal compliance Revivo has not obtained
- A generated or stock founder photo (use the typographic panel until a real photo is supplied)

## 4. Design system

Tokens live in `src/app/globals.css` (`@theme`). Use the tokens — no ad-hoc hex values in components (exceptions: the
hero SVG `COLORS` map, the final-CTA decoration and the OG image, which mirror the tokens).

| Token            | Value      | Use                                     |
| ---------------- | ---------- | --------------------------------------- |
| `canvas`         | `#0B0F0C`  | Main background                         |
| `raised`         | `#111612`  | Alternate section background            |
| `surface`        | `#171D18`  | Elevated surfaces, selected states      |
| `lime`           | `#CCFF00`  | Signal/active/primary CTA — **~10–15% of the view max**; never large lime blocks |
| `ink`            | `#F4F5EF`  | Main text                               |
| `muted`/`subtle` | grey-green | Secondary text / small labels (both pass AA) |
| `line`/`line-strong` | graphite | Dividers, borders                   |
| `amber`          | `#F2B04B`  | Form errors/status only, always with an icon + text |

Typography — exactly three roles (`src/app/fonts.ts`, via next/font): **Barlow Condensed 600** for major display
headlines only (`text-display-*`), **Manrope** for body and navigation, **JetBrains Mono** for labels, indices and
statuses (`text-label`). Do not make every heading uppercase/condensed.

Layout: `container-site` (max ~1408px), `section-pad`, body copy `measure` (~656px), strong editorial grid, thin
technical dividers, mono indices (`01 / LABEL`), asymmetric compositions, sharp edges (`rounded-xs` max), one dominant
headline per section (`SectionHeader`).

Never use: purple/blue AI gradients, robots/brains/circuit heads, glass blobs or heavy glassmorphism, generic rounded
SaaS cards, stock celebrating athletes, neon overload, fake dashboards or meaningless charts, background video,
particles, heavy parallax, bouncing/springy motion, scroll hijacking.

## 5. Component structure

- `src/content/*.ts` — all copy. Components must read copy from here, not hard-code it.
- `src/config/site.ts` — contact details, links, site URL, nav. Empty string = hidden.
- `src/components/hero/` — `Hero` (server) + `IntelligenceField` (client) + `fieldGeometry.ts` (pure layout maths).
- `src/components/home/` — one file per homepage section.
- `src/components/ui/` — `ButtonLink`, `SectionHeader`, `useTabs` (accessible tabs).
- `src/components/motion/` — `MotionProvider` (LazyMotion + reduced motion), `Reveal`, `useRevealState`.
- `src/lib/contact-schema.ts` — single Zod schema shared by the form and `src/app/api/contact/route.ts`.
- Keep sections as separate components; never collapse the site into one large component.

## 6. Animation constraints

Principle: **one cinematic hero moment, three purposeful interactions, disciplined stillness everywhere else.**

- Hero field formation: CSS keyframes in `globals.css`, completes in ~2.4s, plays once, then a near-still ambient
  state. Its default (un-animated) state must be the final connected network so it is complete without JS or with
  reduced motion. Ambient animation pauses off-screen (`data-paused`).
- The three interactions: capability signal channels (one active at a time), problem-to-system examples, sector
  selector. Each must work by click/tap **and** keyboard; nothing may be hover-only.
- Use Motion via the `m` component only (`LazyMotion strict` will throw on `motion.*`). No other animation libraries,
  no Three.js/WebGL/Lottie/video.
- Timing: entrances 400–700ms, hover/focus 150–250ms, ease-out curves, no springs with overshoot. Animate only
  `transform` and `opacity`. Pointer depth: desktop fine pointers only, a few pixels max.
- Content must never be hidden before JS runs: use `Reveal`/`useRevealState` (visible by default; only hidden once
  JS confirms it is below the fold).
- Every motion must respect `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` + CSS media query).

## 7. Responsive rules

Mobile-first; one codebase. Check at **375, 768, 1024, 1440px**. No horizontal overflow; fluid `clamp()` type; touch
targets ≥ 44px; tap equivalents for every hover; headline + primary CTA visible immediately on mobile; split layouts
become vertical stories; the hero uses the compact fan geometry below `xl`; no pointer parallax on touch.

## 8. Accessibility

WCAG 2.2 AA: semantic landmarks and headings, skip link, visible lime focus rings, accessible mobile menu (focus trap,
Escape, focus return), ARIA tabs with arrow-key support, labelled form fields with inline errors + error summary,
contrast ≥ 4.5:1 for text, never colour-only meaning.

## 9. Testing requirements (before every commit)

```bash
npm run lint && npm run typecheck && npm run build
```

Then preview with `npm run start` and check: the four widths above for overflow and layout; keyboard path (skip link →
nav → hero CTAs → field nodes → channels → tabs → form); reduced motion (static complete hero); contact form invalid
submit, valid submit without email env (fallback appears), and with Resend configured if keys are available.
Lighthouse targets: accessibility ≥ 95, SEO ≥ 95, CLS ≤ 0.1, LCP ≤ 2.5s, INP ≤ 200ms.

Do not deploy, buy services, or add credentials without the owner's explicit approval. Never commit `.env*` files
other than `.env.example`.

@AGENTS.md
