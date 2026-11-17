# Image pilot — notes for the final full-site audit

Branch `revivo-image-pilot` only. All images are generated, illustrative concept photography: never present them as
Revivo clients, partners, events or delivered products. Nothing here is approved for production yet.

Images live in `src/assets/pilot/` (source PNGs; Next.js serves responsive AVIF/WebP). Placement is in
`src/content/pilot-images.ts`: hero (desktop/laptop only), one image per area (fallback header for any capability
without its own), and capability-specific panel headers.

## Open issues by image

| File | Status | Notes for the audit |
|---|---|---|
| 01-hero | Integrated | Row of US-style flags and an American-looking skyline; bright white touchline runs just under the lime signal; floodlight pole crosses the signal core. Sunset. |
| 02-area-events-operations | Integrated | Feather flags carry lettering-like marks; steel bottle and notebook props repeat across images. Sunset. |
| 03-area-growth-engagement | Integrated | Stadium sunset again; realistic AI-generated faces with face paint. |
| 04-area-athletes-performance | Integrated (Batch 1) | Strong lime/green kit trims, lights and hurdles compete with the signal colour. |
| 05-area-management-reporting | Integrated (Batch 1) | Match-day control room: reads as event operations, not management/reporting; lime lanyards and trims. |
| 06-cap-event-planning-coordination | Integrated (Batch 2) | Same file as 02 — no distinct image yet. |
| 07-cap-venue-facility-management | Integrated (Batch 2) | Lime/green strip lighting in the stands. Sunset. |
| 08-cap-registration-administration | Integrated (Batch 2) | Preview resolution (824×390, board crop) — replace. Lettering/logo-like marks on shirt and lanyard. |
| 09-cap-staff-volunteer-management | Integrated (Batch 2) | Preview resolution (824×390, board crop) — replace. Lime hi-vis vests. |
| 10-cap-social-media-campaigns | Integrated (Batch 2) | Preview resolution (824×392, board crop) — replace. Leftover label strip on the bottom edge; scene repeats 16 (camera at a pitch). |
| 11-cap-sponsorship-management | Integrated (Batch 3) | 1536×1024 (3:2), new render of the hospitality-box scene. Blank monitor, steel bottle and notebook props repeat; sunset. |
| 12-cap-fan-engagement-ticketing | Integrated (Batch 3) | Celebration scene; weak link to ticketing. Heavy lime kit, scarves and stadium lighting. |
| 13-cap-membership-customer-management | Integrated (Batch 3) | Same file as 05 (control room) — provisional; does not depict membership/customer management. |
| 14-cap-athlete-management-development | Integrated (Batch 3) | Indoor training hall; strong lime accents (kit, lights, hurdles). Close in look to 04 and 15. |
| 15-cap-training-performance-monitoring | Integrated | Same file as the earlier pilot. Swoosh-style logos on athlete and coach kit — must be removed. Sunset. |
| 16-cap-video-analysis-scouting | Integrated | Duplicate steel bottle; slightly malformed binoculars. Sunset. |

## Set-wide themes to check in the final audit

- Logos and lettering (swooshes, flag/banner marks, lanyards).
- Lime/neon green inside images competing with the site's signal colour.
- Repetition: sunsets, steel bottle/notebook props, indoor lime training halls, camera-at-pitch scenes.
- Duplicate files standing in for distinct capabilities (06 = 02, 13 = 05).
- Preview-resolution assets (08, 09, 10).
- Capability relevance (05, 12, 13).
