# Revivo — company website

The official website for **Revivo**, a specialist AI solutions builder for sports and fitness.

> **AI built for the pulse of sport.**

Revivo is a global AI solutions-building company for the sports ecosystem. The homepage is deliberately short:

1. **Hero** — the master tagline and the Revivo Signal, which pulses once beneath the word "pulse" and flows down
2. **Domain explorer** — the signal enters the Revivo Intelligence Layer and branches into four solution zones
   (Operations & Infrastructure, Revenue & Engagement, Athlete Development & Performance, Governance & Impact);
   each zone shows four capabilities, and each capability opens a detail panel
3. **How Revivo works** — Discover → Define → Prototype → Build
4. **Final call to action** — "What is your organization not seeing yet?" and a short enquiry form

Every capability is illustrative — nothing on the site is presented as a finished product.

**Pages**

| URL        | What it is                                         |
| ---------- | -------------------------------------------------- |
| `/`        | The five-scene homepage (the form is at `/#start`) |
| `/contact` | The same short enquiry form on its own page        |
| `/privacy` | Starter privacy policy                             |
| `/terms`   | Starter website terms                              |

---

## Technology used

| Tool                        | Why                                                                        |
| --------------------------- | -------------------------------------------------------------------------- |
| **Next.js 16** (App Router) | The website framework. Pages are pre-built for speed.                      |
| **TypeScript**              | JavaScript with type checking, which catches mistakes before they go live. |
| **Tailwind CSS 4**          | Styling. Design tokens (colours, fonts, sizes) live in one CSS file.       |
| **Motion** (for React)      | The animation library for the interactive sections.                        |
| **Zod**                     | Checks contact-form answers in the browser _and_ on the server.            |
| **Resend**                  | Sends contact-form enquiries to your inbox (once configured).              |
| **Lucide**                  | A small set of line icons (arrows, plus/minus).                            |
| **next/font**               | Self-hosts the Manrope font — no Google requests at runtime.               |

No database, CMS, video, WebGL or tracking is used.

---

## Running the website on your computer

You need **Node.js 20 or newer** (check with `node -v`). Download it from <https://nodejs.org> if needed.

Open a terminal in this folder, then:

```bash
# 1. Install dependencies (only needed the first time, or after package.json changes)
npm install

# 2. Start the development server
npm run dev
```

Now open **<http://localhost:3000>** in your browser. Pages reload automatically when you save a file.

- **Stop the server:** click in the terminal and press `Ctrl + C`.
- **Restart it:** run `npm run dev` again.
- **Use a different port** (if 3000 is busy): `npm run dev -- -p 3001`, then open <http://localhost:3001>.

To preview the real production version locally:

```bash
npm run build   # creates the optimized site
npm run start   # serves it at http://localhost:3000
```

---

## Where things live

```
src/
├─ app/                      Pages and site-wide settings
│  ├─ page.tsx               Homepage (assembles the four scenes)
│  ├─ contact/page.tsx       Contact page
│  ├─ privacy/ terms/        Legal pages (edit wording directly here)
│  ├─ api/contact/route.ts   Server code that receives the enquiry form
│  ├─ layout.tsx             Shared layout, page titles and SEO defaults
│  ├─ globals.css            ★ Colours, type sizes, spacing, hero text animation
│  ├─ fonts.ts               ★ Fonts (Barlow Condensed + Manrope)
│  ├─ sitemap.ts, robots.ts  Search-engine files
│  └─ opengraph-image.tsx    Image shown when the site is shared on social media
├─ config/site.ts            ★ Tagline, page title, contact email, LinkedIn, site URL
├─ content/
│  ├─ home.ts                ★ Hero, process and final call-to-action text
│  ├─ explorer.ts            ★ The 4 zones and 16 capabilities (map + panels read from here)
│  └─ enquiry.ts             ★ Form button text and organization types
├─ components/
│  ├─ scenes/                Hero, process and final CTA sections
│  ├─ explorer/              The domain explorer, its signal map and detail panel
│  ├─ signal/                The hero signal and small signal accents
│  ├─ brand/RevivoLogo.tsx   The official logo
│  ├─ enquiry/               The enquiry form
│  ├─ layout/                Header (with mobile menu) and footer
│  ├─ motion/                Animation helpers (reveal on scroll, reduced motion)
│  └─ ui/                    Buttons, accessible tabs, media-query hook
├─ lib/signal.ts             Shape of the Revivo Signal (smooth curves, one pulse)
scripts/check-copy.ts        Keeps copy within its word limits (4 zones × 4 capabilities)
```

★ = the files you are most likely to edit.

### Changing website copy

Hero, process and final-CTA wording is in **`src/content/home.ts`**; the four zones and sixteen capabilities
(problem, what Revivo could build, outcome, organizations, decision-maker) are in **`src/content/explorer.ts`**. Change the text between the quotes and save. Then run
`npm run check:copy` — it fails if any text grows past its word limit, which keeps the homepage short. Privacy and
terms wording is in `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`.

Before changing copy, read `CLAUDE.md` (approved language, words to avoid, and no invented clients or products).

### Changing contact details

Open **`src/config/site.ts`**:

- **Email** — set `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local` (and on Vercel), _or_ type it into `email: ... || ""`.
- **LinkedIn / WhatsApp / booking link** — paste the full URL between the quotes.

Anything left as `""` is simply hidden (the footer shows "LinkedIn — coming soon" until a URL is added).

### Updating the logo

The logo lives in `src/components/brand/RevivoLogo.tsx`, traced from the official "Flatline → Alive" lockups. The
wordmark currently uses the designer's placeholder typeface; when the final wordmark is ready, replace the
`WORDMARK_PATH` value (and the same path in `src/app/opengraph-image.tsx`).

### Changing colours and fonts

- **Colours:** edit the `@theme` block at the top of `src/app/globals.css` (e.g. `--color-lime: #ccff00;`). Every
  part of the site uses these tokens, so one change updates everything. Note: the hero SVG and social image repeat a few
  hex values (logo, signal, social image) — search for the old hex code if you change the palette.
- **Fonts:** edit `src/app/fonts.ts`. The site matches Revivo IQ: Barlow Condensed (bold) + Manrope — two families, three weights.

---

## Environment variables

Copy the example file and fill in values:

```bash
cp .env.example .env.local
```

| Variable                    | Required?            | What it does                                                  |
| --------------------------- | -------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | For production       | Your live address, e.g. `https://www.yourdomain.com`          |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Strongly recommended | Public email shown on the site and used by the email fallback |
| `RESEND_API_KEY`            | To send form emails  | Secret key from Resend                                        |
| `CONTACT_TO_EMAIL`          | To send form emails  | Inbox that receives enquiries                                 |
| `CONTACT_FROM_EMAIL`        | To send form emails  | Sender address on a domain verified in Resend                 |

`.env.local` is never committed to Git. **Never paste real keys into any committed file.**

## Contact-form setup

1. Create a free account at <https://resend.com>.
2. Add and verify your domain (Resend shows the DNS records to add at your domain provider).
3. Create an API key.
4. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` (locally in `.env.local`, and on Vercel).
5. Restart the server and send a test enquiry.

**If email is not configured**, the form still validates, then shows a clear message with an **"Email your challenge"**
button (opens the visitor's email app with their answers filled in, using `NEXT_PUBLIC_CONTACT_EMAIL`) and a
**"Copy your answers"** button. Submissions are never silently lost.

Spam protection: a hidden "honeypot" field that people never see; bots that fill it get a fake success and nothing is
sent. There is no rate limiting yet (see limitations).

---

## Quality checks

Run these before publishing changes:

```bash
npm run lint        # code-quality rules (ESLint)
npm run typecheck   # TypeScript type checking
npm run check:copy  # homepage copy stays within its word limits
npm run build       # full production build — must succeed
npm run format      # optional: tidy code formatting (Prettier)
```

---

## Deploying to Vercel (only after the preview is approved)

1. Push this repository to GitHub (already done if you are reading this there).
2. Sign in at <https://vercel.com> with GitHub → **Add New… → Project** → import this repository.
3. Framework preset: **Next.js** (detected automatically). Leave build settings as default.
4. Under **Environment Variables**, add the variables from the table above.
5. Click **Deploy**. Vercel gives you a preview URL (`*.vercel.app`).
6. To use your own domain: Project → **Settings → Domains** → add it and follow the DNS instructions. Then set
   `NEXT_PUBLIC_SITE_URL` to that domain and redeploy.

Every later push to the main branch redeploys automatically; other branches get their own preview URLs.

---

## Legal pages

`/privacy` and `/terms` are **starter drafts**. Have them reviewed by a qualified lawyer before Revivo begins processing
sensitive client, athlete, health or safeguarding information, or before adding analytics. They intentionally make no
claims of certification or regulatory compliance.

---

## Troubleshooting

| Problem                                           | Fix                                                                                                   |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `npm: command not found`                          | Install Node.js from <https://nodejs.org>, then reopen the terminal.                                  |
| `Port 3000 is already in use`                     | Another server is running. Stop it (`Ctrl + C` in its terminal) or use `-p 3001`.                     |
| Changes don't appear                              | Save the file; hard-refresh the browser (`Ctrl/Cmd + Shift + R`).                                     |
| Form shows "Online sending isn't switched on yet" | Email variables aren't set — see _Contact-form setup_. Restart the server after editing `.env.local`. |
| Build fails after editing `home.ts`               | Usually a missing quote, comma or bracket. The error message names the line.                          |
| Fonts fail to download during build               | The build fetches fonts once from Google; check your internet connection.                             |
| Weird errors after updating packages              | Delete `node_modules` and `.next`, then run `npm install` again.                                      |
