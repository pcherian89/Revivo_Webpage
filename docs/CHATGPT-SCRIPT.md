# Exact ChatGPT script — Revivo images, delivered as zip files

Paste each message below into **one ChatGPT chat**, in order. Each grey box is one message: copy everything inside
it. Wait for ChatGPT to finish before sending the next one.

- You'll end up with **5 zip files**, each well under 30 MB, which you paste into the Claude chat.
- Use ChatGPT Plus (or higher) with image generation turned on. If ChatGPT asks to "continue", say **continue**.
- If an image breaks the rules (text, logos, real-looking faces, neon), reply:
  **"Regenerate <file name> following the master style and negative line exactly."**

---

## Message 1 — set the style and the rules (send once)

```
For this whole chat you are making one consistent series of illustrations for Revivo, a global company that
designs custom digital systems for sports organisations.

MEDIUM: premium editorial illustration in a matte, painterly gouache style. It must clearly read as an
illustration, never a photo: confident visible brushwork, simplified shapes, soft painted edges, limited palette.

LIGHT AND COLOUR: night or dusk. One warm practical light source per scene (a floodlight, a doorway, a desk lamp,
a tunnel light) with rim light on figures, gentle haze and deep shadows that fall to near-black (#0A0A0B) and
deep graphite. Low saturation everywhere; only warm amber and off-white (#F5F5F2) highlights keep colour.

COMPOSITION: calm and uncluttered. Usually 1–4 people, never a crowd collage. One continuous believable place
with a clear foreground, middle and background. At least 40% of every frame is quiet dark space.

PEOPLE: warm and human, absorbed in what they are doing, mostly three-quarter or profile views. Faces are
stylised and painted with simple features, never photoreal, never close-up portraits, never a real or famous
person. Mix ages, genders, skin tones, body types and abilities (include para-sport and wheelchair users). Show
many roles, not only athletes: organisers, venue crew, volunteers, administrators, fans, families, coaches,
officials, analysts, community players.

SETTING: global and unspecific: no landmarks, no single country, no palm-tree postcard scenery. Vary the sports
across the series. Plain kit in muted solid colours.

NEGATIVE LINE (apply to every image, always):
No text, letters, numbers or signage; no logos, crests, flags, jersey numbers or real kits; no screens showing an interface, chart or dashboard (screens turned away or dark); no lime, neon, yellow-green, blue or purple glow; no robots, brains, holograms, particles, glass shapes or ECG lines; nothing medical; no celebrities or trophies; no over-saturated colour or glossy plastic skin.

WORKING RULES FOR THIS CHAT:
1. I will ask for images by FILE NAME. Generate exactly one image per file name, in the shape I give (landscape 3:2 unless I say otherwise). Keep the bottom third of every image dark and quiet unless told otherwise.
2. After each image, write its file name underneath so we keep track.
3. Every image must follow the master style above and, once I approve one, match it as the style reference.
4. When I say "PACKAGE", use your Python tool to collect the images I name, save each as a high-quality JPEG (quality 90, longest side 1536 px) with exactly the file name I gave plus .jpg, put them in one ZIP file with the name I give, check the ZIP is under 25 MB, and give me the download link. If any image is not available to your Python tool, tell me which ones.

Reply "Ready" and wait.
```

---

## Message 2 — the hero (3 versions)

```
Match the master style. Create 3 different versions of this image, each named 01-hero-A, 01-hero-B, 01-hero-C.
Wide 16:9.

A wide night scene of one floodlit community sports precinct where several venues share one painted landscape. Keep it calm: only three or four activities, small in the frame — a youth football session with a coach, a wheelchair basketball pair on an outdoor court, two runners on a track bend, a volunteer carrying cones. The focal point is the softly glowing centre circle of the football pitch, placed in the right third of the frame at about 40% of the height. All the people and light sit in the right half; the left half is dark haze and night sky fading to near-black, empty for a headline. A long low perimeter wall runs perfectly straight across the whole image at one-third of its height, its top edge catching faint warm-white light (do NOT colour it lime or make it glow).

Apply the negative line.
```

Pick your favourite, then send:

## Message 3 — lock the style

```
I choose 01-hero-<A/B/C>. Rename it 01-hero. Use this image as the style and palette reference for every image that follows: same painted finish, same night light, same muted palette, same amount of dark space.
```

---

## Message 4 — the four areas

```
Match the master style and the approved reference 01-hero. Create these 4 images one after another, each landscape 3:2, interest in the middle band, the left and right ends darker. Apply the negative line to each.

02-area-events-operations — The night before an outdoor sports festival: crew raising a lighting gantry, a volunteer laying out lane cones, an organiser with a clipboard pointing across the site. Several sports areas being prepared side by side under work lights. Landscape 3:2.
03-area-growth-engagement — Fans and families arriving at a floodlit ground at dusk: a child on a parent's shoulders, two friends in plain muted scarves, someone filming the warm-up on a phone held away from us, the glow of the ground beyond the gate. Landscape 3:2.
04-area-athletes-performance — Evening training seen through the open doors of a sports centre: a sprinter settling into the blocks outside, a boxer working pads with a coach inside, a young netball squad gathered around their coach. Focused, warm mood. Landscape 3:2.
05-area-management-reporting — A clubhouse at night with its upper windows lit: inside, a small committee around a table with paper folders and mugs, one person gesturing towards the window. Below, the community pitches they run are in use under lights. Landscape 3:2.
```

## Message 5 — PACKAGE zip 1

```
PACKAGE: 01-hero, 02-area-events-operations, 03-area-growth-engagement, 04-area-athletes-performance, 05-area-management-reporting → revivo-images-1.zip
```

Download **revivo-images-1.zip**.

---

## Message 6 — capabilities 6 to 9

```
Match the master style and the approved reference 01-hero. Create these 4 images one after another, each landscape 3:2, keeping the bottom third dark and quiet. Apply the negative line to each.

06-cap-event-planning-coordination — At dawn on a half-built event site, an organiser and a volunteer lead lean over a folding table with a clipboard of blank sheets and a two-way radio, agreeing the plan, while crew raise a gantry behind them. Landscape 3:2.
07-cap-venue-facility-management — An indoor multi-sport hall after hours with one bank of lights on over the far court. A facilities manager with a torch checks a basketball hoop from a ladder while a colleague wheels an equipment cart along the court lines. Landscape 3:2.
08-cap-registration-administration — A registration desk at a junior cricket academy in the early evening: an administrator hands a blank form to a parent while a child in plain whites waits, neat stacks of blank paper and a rubber stamp on the desk. Landscape 3:2.
09-cap-staff-volunteer-management — Before sunrise at a city road race, in a staging tent lit by warm lamps: a volunteer coordinator briefs a mixed group in plain unbranded hi-vis vests — a student, a retiree, a wheelchair user, a parent with a flask — while others take vests from a rail. Landscape 3:2.
```

## Message 7 — PACKAGE zip 2

```
PACKAGE: 06-cap-event-planning-coordination, 07-cap-venue-facility-management, 08-cap-registration-administration, 09-cap-staff-volunteer-management → revivo-images-2.zip
```

Download **revivo-images-2.zip**.

---

## Message 8 — capabilities 10 to 13

```
Match the master style and the approved reference 01-hero. Create these 4 images one after another, each landscape 3:2, keeping the bottom third dark and quiet. Apply the negative line to each.

10-cap-social-media-campaign-management — At the sideline of a youth football match at dusk, a young media volunteer films the play on a phone held away from us while a club staff member beside her reviews shots on a closed notebook. Players beyond are backlit. Landscape 3:2.
11-cap-sponsorship-management — Pitchside at dusk on a rugby ground: a partnerships manager walks two visitors in plain business clothes along the touchline, gesturing to a row of completely blank, unlit boards, while a ground crew member fixes one in place. Players warm up behind. The boards have no graphics. Landscape 3:2.
12-cap-fan-engagement-ticketing — Fans moving through floodlit stadium turnstiles at night: a grandmother with a grandchild, two teenagers, a man in a plain scarf, with a steward gently waving them through. Warm, welcoming, no signage. Landscape 3:2.
13-cap-membership-customer-management — Early morning at the welcome desk of a community fitness club: a staff member greets a new member while another member walks in with a towel over the shoulder, the training floor softly lit beyond. Landscape 3:2.
```

## Message 9 — PACKAGE zip 3

```
PACKAGE: 10-cap-social-media-campaign-management, 11-cap-sponsorship-management, 12-cap-fan-engagement-ticketing, 13-cap-membership-customer-management → revivo-images-3.zip
```

Download **revivo-images-3.zip**.

---

## Message 10 — capabilities 14 to 17

```
Match the master style and the approved reference 01-hero. Create these 4 images one after another, each landscape 3:2, keeping the bottom third dark and quiet. Apply the negative line to each.

14-cap-athlete-management-development — A coach and a teenage footballer sit on a locker-room bench under a single light, talking through a paper notebook; beside them, a row of boots in ascending sizes from child to adult suggests years of growth. Landscape 3:2.
15-cap-training-performance-monitoring — A dewy training ground at first light: a coach with a stopwatch watches a runner mid-stride between neat rows of small cones, breath visible in the cold air. Landscape 3:2.
16-cap-video-analysis-scouting — A camera operator on a high gantry above an evening hockey match, and beside him a scout with a paper notepad watching the play below. No screens visible. Landscape 3:2.
17-cap-athlete-career-welfare — At dusk on empty stadium steps, a young athlete with a backpack sits beside a mentor, both looking out over the city lights, mid-conversation. Calm and hopeful. Landscape 3:2.
```

## Message 11 — PACKAGE zip 4

```
PACKAGE: 14-cap-athlete-management-development, 15-cap-training-performance-monitoring, 16-cap-video-analysis-scouting, 17-cap-athlete-career-welfare → revivo-images-4.zip
```

Download **revivo-images-4.zip**.

---

## Message 12 — capabilities 18 to 21

```
Match the master style and the approved reference 01-hero. Create these 4 images one after another, each landscape 3:2, keeping the bottom third dark and quiet. Apply the negative line to each.

18-cap-dashboards-reporting — A high, wide night view of a large multi-pitch sports complex with some pitches lit and some dark in a clean grid; on a balcony in the foreground, a manager with a folder takes it all in. Landscape 3:2.
19-cap-sports-programme-management — Dusk at a community court: a programme coordinator unloads kit bags from the back of a minibus while children carry balls towards the court lights. Landscape 3:2.
20-cap-funding-impact-reporting — A newly surfaced community pitch at golden hour seen through a chain-link fence: a girls' match in play, and a programme officer by the gate photographing it with a camera held away from us. Landscape 3:2.
21-cap-governance-compliance — A quiet clubhouse office at night: a club secretary files a binder on a shelf of plain unlabelled binders while a colleague reads a paper document at a desk lamp. Ordered and calm. Landscape 3:2.
```

## Message 13 — PACKAGE zip 5

```
PACKAGE: 18-cap-dashboards-reporting, 19-cap-sports-programme-management, 20-cap-funding-impact-reporting, 21-cap-governance-compliance → revivo-images-5.zip
```

Download **revivo-images-5.zip**.

---

## Optional — Message 14: process steps and contact band

```
Match the master style and the approved reference 01-hero. Create these 5 images one after another, each landscape 3:2. Apply the negative line to each.

22-process-discover — A clubhouse table at night with a notebook and pen, two people mid-conversation, listening. Landscape 3:2.
23-process-define — The same clubhouse table: two hands arranging blank index cards into a neat grid. Landscape 3:2.
24-process-prototype — The same clubhouse table: hands assembling a simple white card model of a sports ground. Landscape 3:2.
25-process-build — The same clubhouse table: the finished white card model under one warm light, the two people standing back. Landscape 3:2.
26-contact-band — A clubhouse window at dusk looking out over an empty training pitch, a single chair turned towards the window, a mug on the sill. The middle band carries the light; top and bottom fade into darkness. Landscape 3:2.
```

## Optional — Message 15: PACKAGE zip 6

```
PACKAGE: 22-process-discover, 23-process-define, 24-process-prototype, 25-process-build, 26-contact-band → revivo-images-6.zip
```

---

## If ChatGPT says it can't put the images in a zip

Sometimes ChatGPT's Python tool can't see the images it just drew. If that happens:

1. Click each image, download it, and rename it to the file name written under it (e.g. `11-cap-sponsorship-management`).
2. On your Mac, put each batch's images in a folder, select them, right-click → **Compress**. That makes a zip.
3. Each batch of 4–5 images is roughly 5–15 MB, comfortably under 30 MB.

## Then

Paste the zips into the Claude chat (one or several at a time). Claude unpacks them, colour-matches the set, crops
and compresses the images, places them on the site, and sends laptop and phone screenshots for your approval before
anything goes live.
