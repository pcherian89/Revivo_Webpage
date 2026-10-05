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

## 2. Brand idea and approved language

**Concept — "Flatline → Alive."** The logo is a flat line, one heartbeat, then a dot: _re-vivo_, "live again".
Every sports and fitness organization has something that has gone quiet (progress no one can see, relationships
that drift, days run on chat groups, talent that slips through, concerns that go unheard). Revivo finds the
flatline and builds the AI system that brings it back to life.

- **The one tagline (hero h1): "AI that gives sport a pulse."** Do not add other taglines to pages.
- Eyebrow: "Custom-built for sport and fitness"
- Primary action everywhere: **"Start with your challenge"** (links to `/#start`). Secondary (hero only): "Explore what we solve".
- Scene titles: "Find the flatline." · "From silence to signal." · "We start with the problem—not the technology." ·
  "What has gone quiet in your organization?"
- **Say:** pulse, quiet, flatline, visible, alive, signal, progress record, relationship memory, live operations
  picture, talent pathway, coach, athlete, client, could, designed to, illustrative.
- **Never say:** gym software, CRM, management system, platform, dashboard, app, all-in-one, leverage, empower,
  seamless, revolutionize, game-changing, cutting-edge, "Our Products", "Request a demo".
- Do not lead with gyms; the default story is coach ↔ athlete/client progress.
- Required qualifier near the stories: "Illustrative system. Every Revivo engagement is designed around the
  client's actual workflow, users, data and objectives."
- Copy limits (enforced by `npm run check:copy`): hero statement ≤35 words, scene intro ≤40, each flatline part ≤35,
  story annotation ≤12, process step ≤20, max 3 stories, one primary + one secondary action per scene.

**Tone:** intelligent but understandable; creative, not generic; confident without exaggeration.

## 3. Prohibited claims (never add, even if asked casually — confirm with the owner first)

- Describing examples as completed Revivo products, or fake screenshots/dashboards implying deployed systems
- Invented customers, partners, testimonials, logos, metrics or case studies; "Trusted by" without real clients
- Superlatives such as "India's leading sports AI company"
- Guaranteed revenue or performance improvement
- Injury prediction, medical diagnosis, health/heart-rate monitoring (the heartbeat is a brand metaphor only), or
  fully autonomous decision-making
- Calling third-party foundation models "proprietary AI"
- Implying ICC or any US organization from the founder's background is a Revivo client/partner
- Certifications or legal compliance Revivo has not obtained
- Generated or stock founder photos
- Revivo IQ or other sub-brands on this site (until approved)

## 4. Design system

Tokens live in `src/app/globals.css` (`@theme`). Use tokens — no ad-hoc hex values in components (exceptions: the
logo and signal SVGs, the OG image).

| Token                  | Value                 | Use                                                                          |
| ---------------------- | --------------------- | ---------------------------------------------------------------------------- |
| `canvas` / `raised`    | `#0A0B0A` / `#101210` | Background / scene tone shift (blend with gradients, never hard edges)       |
| `ink`                  | `#F5F5F2`             | Main text (logo wordmark colour)                                             |
| `muted` / `subtle`     | grey                  | Secondary text / quiet text (both pass AA)                                   |
| `line` / `line-strong` | graphite              | The quiet flatline, hairlines                                                |
| `lime`                 | `#CCFF00`             | **Alive only:** the signal, active state, primary action. ~5–10% of a screen |
| `amber`                | `#F2B04B`             | Form errors only, always with icon + text                                    |

**Logo** (`src/components/brand/RevivoLogo.tsx`, traced from the official lockups): horizontal lockup (A) in header
and footer, never under 24px tall; symbol (C) for icons only; stacked idea (B) for the social image. Mark is always
lime (black on lime); never outlined or glowing. The wordmark is a placeholder face; replace `WORDMARK_PATH` when the
final one exists.

**The Revivo Signal** = the logo's own heartbeat (`src/lib/heartbeat.ts`). Grammar: graphite flat line = quiet,
lime heartbeat = alive, dot = action. It appears only in: hero, the active flatline choice, story key steps, and the
submit button. Never as decoration elsewhere.

**Typography:** one family, Manrope 400/500/600, sentence case. Six sizes only: `text-hero`, `text-title`,
`text-subtitle`, `text-lead`, body (1.0625rem), `text-small`. Uppercase only via `.eyebrow`. No monospace.

**Layout:** `container-site`, `scene` spacing, `measure` for body copy, one focal point per scene, editorial and
asymmetric, no card grids, no bordered panels, no nested panels, no decorative codes or coordinates, pill buttons.

Never use: purple/blue AI gradients, robots/brains, glass blobs, card grids, fake dashboards, background video,
particles, heavy parallax, bouncing motion, scroll hijacking, scroll snapping, typewriter or glitch effects.

## 5. Component structure

- `src/content/home.ts` — all homepage copy; `src/content/enquiry.ts` — form copy/options.
- `src/config/site.ts` — contact details, links, site URL, nav, primary CTA. Empty string = hidden.
- `src/components/scenes/` — the five scenes: `HeroScene`, `FlatlineScene`, `StoryScene`, `ProcessScene`, `ConversationScene`.
- `src/components/signal/` — `HeroSignal` (CSS-only), `Pulse` (choice glyph).
- `src/components/enquiry/EnquiryForm.tsx` — the short form (homepage + `/contact`); schema in `src/lib/contact-schema.ts`, shared with `src/app/api/contact/route.ts`.
- `src/components/ui/` — `ButtonLink`, `useTabs`. `src/components/motion/` — `MotionProvider`, `Reveal`, `useRevealState`.
- Five scenes only. Detailed explanations belong on future pages, not the homepage.

## 6. Animation constraints

- Hero signal: CSS keyframes in `globals.css`, plays once (~1.6s), resting state = finished signal, no JS.
- Interactions: flatline choices (one alive at a time; accordion on mobile) and story tabs (max 3). Click/tap and
  keyboard for everything; nothing hover-only.
- Motion via the `m` component only (`LazyMotion strict`). No other animation libraries, WebGL, Lottie or video.
- Entrances 400–600ms ease-out, crossfades ~250–350ms; animate transform/opacity/stroke only; nothing replays on
  scroll-back. Content is never hidden before JS runs (`Reveal`/`useRevealState`).
- Respect `prefers-reduced-motion` everywhere.

## 7. Responsive rules

Mobile-first; one codebase. Check at **375, 768, 1024, 1440px**. No horizontal overflow; fluid `clamp()` type; touch
targets ≥ 44px; tap equivalents for every hover; headline + primary CTA visible immediately on mobile; split layouts
become vertical stories; the story flow is vertical below `xl`; no pointer effects on touch.

## 8. Accessibility

WCAG 2.2 AA: semantic landmarks and headings, skip link, visible lime focus rings, accessible mobile menu (focus trap,
Escape, focus return), ARIA tabs with arrow-key support, labelled form fields with inline errors + error summary,
contrast ≥ 4.5:1 for text, never colour-only meaning.

## 9. Testing requirements (before every commit)

```bash
npm run lint && npm run typecheck && npm run build
```

Also run `npm run check:copy`. Then preview with `npm run start` and check: the four widths above for overflow and layout; keyboard path (skip link →
nav → hero actions → flatline choices → story tabs → form); reduced motion (static complete hero); contact form invalid
submit, valid submit without email env (fallback appears), and with Resend configured if keys are available.
Lighthouse targets: accessibility ≥ 95, SEO ≥ 95, CLS ≤ 0.1, LCP ≤ 2.5s, INP ≤ 200ms.

Do not deploy, buy services, or add credentials without the owner's explicit approval. Never commit `.env*` files
other than `.env.example`.

@AGENTS.md
