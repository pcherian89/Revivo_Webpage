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

## Production blockers

| # | Image | Problem |
|---|---|---|
| 1 | 18 Dashboards & Reporting | Readable invented results on the wall screen (Engagement +28%, Revenue +18%, Operations 96%, 96% Programme Delivery, 18.6K participants), still legible on phones; faint generator watermark bottom-right. Conflicts with CLAUDE.md §3 (fake dashboards, invented metrics). |
| 2 | 16 Video Analysis & Scouting | Player-tracking overlays, heat zones and highlight rings present computer vision as existing; ad boards carry pseudo-brands. |
| 3 | 19 Sports Programme Management | Nike-style swooshes on two jackets, crest emblems on others. |

## Should fix

| Image | Problem |
|---|---|
| 01 Hero | Purple-magenta sky close to the banned "AI gradient" mood; lime roof arc competes with the core rings. |
| 09 Staff & Volunteers | Gibberish wordmarks on jackets and accreditations. |
| 13 Membership | Monogram crest on a jacket reads like a luxury brand. |
| 15 Training | Tick-like chest logo on the coach; wall of screens hints at a monitoring suite. |
| 20 Funding & Impact | Growth-arrow bar-chart screen implies results. |
| 21 Governance | Floating holographic UI with gibberish text; lime-heavy. |
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
