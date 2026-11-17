# Image pilot — final audit (all 21 final images integrated)

Branch `revivo-image-pilot` only; not merged or deployed. All images are generated, illustrative photography: never
present them as Revivo clients, partners, events, products or results.

## How images are served

- Sources: `src/assets/pilot/*.png` (21 files, 1672×941). Placement: `src/content/pilot-images.ts` (hero on
  ≥1024px only; one image per area as fallback; one image per capability panel).
- `npm run build` first runs `scripts/build-images.mjs`, which pre-converts every source to content-hashed WebP at
  384–1672px in `public/img/` (git-ignored). `src/lib/image-loader.ts` (custom next/image loader) serves those files,
  so there is no first-request conversion delay. Netlify caches `/img/*` as immutable.
- Hero: the photo's own lime wave is muted on its flat left stretch (`.hero-photo-quiet`) so it never doubles the
  site's animated signal.

## Creative direction (clarified by the owner)

Conceptual and futuristic technology imagery (AI-assisted tracking, analytics, conceptual dashboards and interfaces)
is intentional. Not acceptable: specific, unsupported performance figures; third-party or invented branding;
generator watermarks; illegible pseudo-lettering. No captions or disclaimers on imagery.

## Corrections integrated (16, 18, 19, 21)

New 1672×941 compositions, manifest SHA-256 verified:
- 18: conceptual dashboard kept; no readable figures; no watermark. Previous blocker resolved.
- 16: conceptual tracking overlays kept; no fictional sponsor boards visible. Previous blocker resolved.
- 19: grassroots multi-sport group; jacket swooshes and crests gone. Minor: a small illegible wordmark on one
  girl's sleeve and a tiny tick-like mark on another sleeve (barely visible at panel size).
- 21: conceptual holographic interface with icons only, no lettering.

## Should fix

| Image | Problem |
|---|---|
| 01 Hero | Purple-magenta sky close to the banned "AI gradient" mood; lime roof arc competes with the core rings. |
| 09 Staff & Volunteers | Gibberish wordmarks on jackets and accreditations. |
| 13 Membership | Monogram crest on a jacket reads like a luxury brand. |
| 15 Training | Tick-like chest logo on the coach; wall of screens hints at a monitoring suite. |
| 20 Funding & Impact | Growth-arrow bar-chart screen implies results. |
| 12 Fan Engagement | Heaviest lime (banners, scarves, turnstile). |
| 11 Sponsorship | Odd gold cast on one handshake hand (artefact); lime bar chart on laptop (no numbers). |
| 07 Venue & Facility | Reads as stewarding rather than bookings/maintenance; near-duplicate of 02. |

## Set-level

- About 75% dusk/night with purple-orange skies; ~12 of 21 generic glass super-stadiums; ~85% elite settings
  (grassroots only in 19 and 20).
- Repeated props and archetypes: tablets (~13), pointing gestures, black-and-lime staff jackets (~14 images — read as
  one invented uniform brand), the same grey-bearded "mentor".
- Football dominates; no cricket, rugby, hockey, tennis, para-sport or esports. Casts are diverse; places are
  generic Western.
- Baked-in lime light streaks (01–03, 06–10) and lime props dilute the site rule that lime means signal/action.
- Area images 02–05 are not displayed anywhere (every capability has its own image).
- Source resolution 1672px: the hero at 1440px on 2× screens is served ~6% below native; ideally regenerate at 2400px+.
