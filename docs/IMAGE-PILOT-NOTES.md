# Image pilot — notes for the final full-site audit

Branch `revivo-image-pilot` only. All images are generated, illustrative concept photography: never present them as
Revivo clients, partners, events or delivered products. Nothing here is approved for production yet.

Images live in `src/assets/pilot/` (source PNGs; Next.js serves responsive AVIF/WebP). Placement is in
`src/content/pilot-images.ts`: hero (desktop/laptop only), one image per area (fallback header for any capability
without its own), and capability-specific panel headers.

## Open issues by image

| File | Status | Notes for the audit |
|---|---|---|
| 01-hero | Final Batch 1 | New render with a lime wave in the photo. Its flat left stretch ran ~50px under the site's signal and reached the hero copy: muted in CSS (`.hero-photo-quiet`, desaturated masked copy, source untouched); the lime roof line rising into the signal core is kept. Purple-pink dusk sky. |
| 02-area-events-operations | Final Batch 1 | New. Lime hi-vis and lime stadium lighting; dusk sky. |
| 03-area-growth-engagement | Final Batch 1 | New. Realistic AI-generated faces; lime light ring along the roof; dusk sky. |
| 04-area-athletes-performance | Final Batch 1 | New. Indoor sprint scene; close in subject to 14 and 17. |
| 05-area-management-reporting | Final Batch 1 | New. Strategy meeting around printed papers — fits the area. |
| 06-cap-event-planning-coordination | Final Batch 2 | New, distinct image (no longer a copy of 02). 1672×941; manifest SHA-256 verified. |
| 07-cap-venue-facility-management | Final Batch 2 | New. 1672×941; manifest SHA-256 verified. |
| 08-cap-registration-administration | Final Batch 2 | New, full resolution (replaces the 824px board crop). 1672×941; manifest SHA-256 verified. |
| 09-cap-staff-volunteer-management | Final Batch 2 | New, full resolution (replaces the 824px board crop). 1672×941; manifest SHA-256 verified. |
| 10-cap-social-media-campaigns | Final Batch 2 | New, full resolution (replaces the 824px board crop and its label strip). 1672×941; manifest SHA-256 verified. |
| 11-cap-sponsorship-management | Final Batch 3 | New. Laptop screen shows chart/dashboard-style graphics (fake-UI risk); lime lanyards. 1672×941; manifest SHA-256 verified. |
| 12-cap-fan-engagement-ticketing | Final Batch 3 | New. Ticket-scanning scene fits the capability; heavy lime scarves, banners and lighting. 1672×941; manifest SHA-256 verified. |
| 13-cap-membership-customer-management | Final Batch 3 | New, distinct image (no longer a copy of 05). Lime scarves. 1672×941; manifest SHA-256 verified. |
| 14-cap-athlete-management-development | Final Batch 3 | New. Lime kit trims and camera light. 1672×941; manifest SHA-256 verified. |
| 15-cap-training-performance-monitoring | Final Batch 3 | New (replaces the version with swoosh-style logos). Lime kit trims. 1672×941; manifest SHA-256 verified. |
| 16-cap-video-analysis-scouting | Integrated (Batch 4 file identical) | Duplicate steel bottle; slightly malformed binoculars. Sunset. |
| 17-cap-athlete-career-welfare | Integrated (Batch 4) | Same file as 14 (indoor sprint training) — subject mismatch for career & welfare; strong lime accents. Replace. |
| 18-cap-dashboards-reporting | Integrated (Batch 4) | Same file as 05 and 13 (control room) — third use of one image; partial subject match. Replace. |
| 19-cap-sports-programme-management | Integrated (Batch 4) | Preview resolution (824×392, board crop) — replace. Good subject (grassroots). Concept-board label visible on the bottom edge; identifiable children. |
| 20-cap-funding-impact-reporting | Integrated (Batch 4) | Preview resolution (824×392, board crop) — replace. Subject mismatch (fan crowd); face paint, child; label visible on the bottom edge. |
| 21-cap-governance-compliance | Integrated (Batch 4) | Preview resolution (824×390, board crop) — replace. Document with text-like lines; label visible on the bottom edge. |

## Final Batch 1 (hero and four areas) — integration notes

- The five SHA-256 checksums in the batch's ASSET-MANIFEST.csv do not match the supplied files (dimensions match;
  all five are new images, not copies of earlier assets).
- Area images 02–05 are mapped, but every capability now has its own file, so they only appear if a capability
  image is removed. Capability file 18 is still a copy of the earlier 05 render; 17 is still a copy of the earlier 14.
- Hero first-request conversion: LCP 2.1 s on a cold cache at 1440 @2x, 0.18 s once cached. Pre-generate or confirm
  Netlify Image CDN behaviour before launch.

## Set-wide themes to check in the final audit

- Logos and lettering (swooshes, flag/banner marks, lanyards).
- Lime/neon green inside images competing with the site's signal colour.
- Repetition: sunsets, steel bottle/notebook props, indoor lime training halls, camera-at-pitch scenes.
- Duplicate files standing in for distinct capabilities (18 = earlier 05; 17 = earlier 14) — Batch 4 pending.
- Preview-resolution assets (19, 20, 21), with concept-board labels on the bottom edge.
- Capability relevance (05, 12, 13, 17, 18, 20).
- Performance: images are converted to AVIF on first request (locally 1.4–2.1 s per large image, then cached).
  In a cold-cache test, 6 of 16 desktop panel headers were still blank after 1.6 s. Verify on the Netlify Image CDN,
  or pre-generate the sizes, before launch.

## Slot check (Batch 4 integration)

All 21 slots populated: hero (desktop/laptop only), 4 area images, 16 capability panels. Every panel was opened at
1440 and 375 px and shows its intended file.
