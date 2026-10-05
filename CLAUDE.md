# CLAUDE.md — rules for working on the Revivo website

**Read this whole file before making any change.** It encodes brand, accuracy and engineering decisions that must hold
across sessions. Also read `AGENTS.md` (Next.js 16 has breaking changes — consult `node_modules/next/dist/docs/`).

## 1. Positioning

Revivo is **a global AI solutions-building company for the complete sports ecosystem.** It works with sports
organizations to understand operational, commercial, performance, participation, safety and governance problems, then
designs and builds the appropriate AI-powered system around their workflows.

Revivo is **not**: only a coaching, athlete-performance or fitness company; a fixed catalogue of products; an
India-specific company; or Revivo IQ. **There are no finished products.** The sixteen capabilities are illustrative
systems Revivo can configure and build. Never write "Our Products" or "Request a demo".

## 2. Approved language

- **Master tagline (exactly as written, hero h1 only): "AI built for the pulse of sport."** — rendered on two
  lines: "AI built for / the pulse of sport." with only the word "pulse" in lime. No other slogans on the homepage.
- Eyebrow: "CUSTOM AI SOLUTIONS FOR SPORT"
- Supporting copy: "Revivo designs custom AI systems for sports organizations—from operations and commercial growth to
  athlete development, performance, governance and impact."
- Primary action everywhere: **"Start with your challenge"** (`/#start`). Hero secondary: "Explore the signal" (`#explore`).
- Process statement: "We start with the problem—not the technology." Final CTA: "What is your organization not seeing yet?"
- Page title: "Revivo — AI Built for the Pulse of Sport". Social description: "Custom AI solutions built around the
  people, decisions and systems that keep sport moving."
- **Retired — never use:** "AI that gives sport a pulse", "Sport, intelligently built", "From silence to signal",
  "Build the unseen advantage", "Find the flatline", "AI for fitness and sports", any India-based positioning.
- Capability language: "could build", "designed to", "illustrative", "potential outcome". Structure every capability as
  Problem → What Revivo could build → Potential outcome → Relevant organizations → Typical decision-maker.
- Keep client examples varied (gyms, academies, teams, leagues, federations, events, venues, government and community
  programmes, foundations/CSR, sports businesses, media). Do not over-index on coaches or athletes.
- Required qualifier in the explorer and panels: "Illustrative possibilities. Every Revivo system is designed around the
  client's workflows, users, data and objectives."
- Copy limits (enforced by `npm run check:copy`): hero statement ≤35 words, explorer intro ≤40, capability problem
  and outcome ≤35, build items 3–5 of ≤12 words, process step ≤20, exactly 4 zones × 4 capabilities.

## 3. Prohibited claims (never add, even if asked casually — confirm with the owner first)

- Describing capabilities as finished products, or fake screenshots/dashboards implying deployed systems
- Invented customers, partners, testimonials, logos, metrics or case studies; "Trusted by" without real clients
- Superlatives; guaranteed revenue, performance or outcomes
- Injury prediction, medical diagnosis, health monitoring, or fully autonomous decisions
- Advanced computer vision presented as existing — describe it as a scoped pilot or R&D engagement
- Calling third-party foundation models "proprietary AI"; implying the founder's past employers are clients
- Certifications or legal compliance Revivo has not obtained; generated founder photos
- Revivo IQ or other sub-brands on this site (until approved)

## 4. Design system

Tokens live in `src/app/globals.css` (`@theme`). Palette: near-black `canvas`, `raised`, `surface` (panels), warm
white `ink`, greys `muted`/`subtle`, graphite `line`, **lime `#CCFF00` only for the signal, active states and primary
actions**, `amber` for form errors only.

**Typography — the Revivo IQ family:** Barlow Condensed **700** for headlines, labels and buttons; Manrope **400/500**
for body and navigation. Two families, three weights. Sizes: `text-hero` clamp(3rem→6.25rem), `text-title`
clamp(2.25rem→4rem), `text-subtitle`, `text-lead` clamp(1.05rem→1.35rem), body 1.0625rem, `text-small`, and the
uppercase `.label`. Headline max two lines on laptops.

**Spacing:** `container-site` (≈1280px content; padding 20–24 / 32–48 / 56–72px), `section-y` (44–64px mobile,
64–88px desktop). No spacer elements, no full-viewport sections except the ≈86svh hero.

**Logo:** `src/components/brand/RevivoLogo.tsx` — horizontal lockup in header/footer (≥24px tall), symbol for icons.

**Buttons:** condensed bold, near-square (`rounded-xs`), lime primary, outlined secondary.

Never use: purple/blue AI gradients, robots/brains, glass blobs, card grids, fake dashboards, background video,
particles, SVG turbulence or large blur filters, scroll hijacking, typewriter/glitch effects, ECG/hospital-monitor visuals, wobbly or hand-drawn-looking lines.

## 5. The Revivo Signal Journey

Story: live sports signal → Revivo intelligence → solution domains → organized action.

1. **Hero (`HeroSignal`)** — measured on the client from the real headline. A perfectly straight lime line draws
   beneath the headline, makes one crisp pulse under the word "pulse", passes five evenly spaced data dots, then turns
   down (one 18px rounded corner) just beside the copy — on the explorer's own axis whenever it clears the text — and
   drops straight into the explorer entry (`#signal-entry-desktop` / `#signal-entry-mobile`). Plays once (~3s), then is
   still. Geometry lives in `src/lib/signal.ts`: straight runs, one corner radius (`SIGNAL.radius`), right-angled
   connectors (`orthogonal`) — never wobble, never a trip to the far edge of the page.
2. **Explorer (`DomainExplorer`)** — the trunk enters the Revivo Intelligence Layer and branches to the four zones
   (desktop: tree; below 1024px: vertical rail + accordion). Branches connect to measured HTML anchors (`useAnchors`).
   Selected branch lit, others at reduced opacity. Capabilities open `DomainPanel` (desktop right panel ≈46vw; mobile
   bottom sheet). One moving signal point at a time (`useTravel`, coordinated via `signal-bus`). No auto-cycling.
3. **After the explorer** — the branches reconverge into one short line labelled "Built around your challenge"; the
   process uses small `SignalGlyph` accents; one final glyph on the submit button. The lower page stays calm.

## 6. Component structure

- `src/content/explorer.ts` — the four zones and sixteen capabilities (single source for map, HTML and panels).
- `src/content/home.ts` — hero, process and final CTA copy. `src/content/enquiry.ts` — form options.
- `src/components/scenes/` — `HeroScene`, `ProcessScene`, `FinalCtaScene`.
- `src/components/explorer/` — `DomainExplorer`, `DomainPanel`, `SignalNode`, `useAnchors`, `useTravel`.
- `src/components/signal/` — `HeroSignal`, `SignalGlyph`. Geometry: `src/lib/signal.ts`.
- `src/components/enquiry/EnquiryForm.tsx` (homepage + `/contact`; listens for `revivo:prefill`).
- Motion via the `m` component only (`LazyMotion strict`) plus Motion's `animate()` for signal travel. No GSAP,
  Three.js, WebGL, canvas or particle libraries. The hero text sequence is CSS so it renders without JavaScript.
- Reduced motion: paths drawn, no travel, all interactions intact.

## 7. Responsive rules

Mobile-first; one codebase. Check at **375, 768, 1024, 1440px**. No horizontal overflow; fluid `clamp()` type; touch
targets ≥ 44px; tap equivalents for every hover; headline + primary CTA visible immediately on mobile; split layouts
become vertical stories; the explorer is a vertical rail below 1024px; no pointer effects on touch.

## 8. Accessibility

WCAG 2.2 AA: semantic landmarks and headings, skip link, visible lime focus rings, accessible mobile menu (focus trap,
Escape, focus return), ARIA tabs with arrow-key support, labelled form fields with inline errors + error summary,
contrast ≥ 4.5:1 for text, never colour-only meaning.

## 9. Testing requirements (before every commit)

```bash
npm run lint && npm run typecheck && npm run build
```

Also run `npm run check:copy`. Then preview with `npm run start` and check: the four widths above for overflow and layout; keyboard path (skip link →
nav → hero actions → zone tabs (arrow keys) → capabilities → panel (Escape, focus return) → form); reduced motion (static complete hero); contact form invalid
submit, valid submit without email env (fallback appears), and with Resend configured if keys are available.
Lighthouse targets: accessibility ≥ 95, SEO ≥ 95, CLS ≤ 0.1, LCP ≤ 2.5s, INP ≤ 200ms.

Do not deploy, buy services, or add credentials without the owner's explicit approval. Never commit `.env*` files
other than `.env.example`.

@AGENTS.md
