# Revivo — company website

The official website for **Revivo**, a specialist AI solutions builder for sports and fitness.

> **Sport, intelligently built.**

The site advertises Revivo's capabilities, shows how Revivo thinks, and invites sports and fitness organizations to
_bring Revivo a problem_. It is not a product catalogue — the examples on the site are illustrative.

**Pages**

| URL        | What it is                                                         |
| ---------- | ------------------------------------------------------------------ |
| `/`        | Main company website (hero, capabilities, process, founder, CTA)   |
| `/contact` | Detailed solution-enquiry form (`/contact?intent=pilot` preselects "Pilot partnership") |
| `/privacy` | Starter privacy policy                                             |
| `/terms`   | Starter website terms                                              |

---

## Technology used

| Tool                       | Why                                                                           |
| -------------------------- | ----------------------------------------------------------------------------- |
| **Next.js 16** (App Router) | The website framework. Pages are pre-built for speed.                        |
| **TypeScript**             | JavaScript with type checking, which catches mistakes before they go live.    |
| **Tailwind CSS 4**         | Styling. Design tokens (colours, fonts, sizes) live in one CSS file.          |
| **Motion** (for React)     | The animation library for the interactive sections.                          |
| **Zod**                    | Checks contact-form answers in the browser _and_ on the server.               |
| **Resend**                 | Sends contact-form enquiries to your inbox (once configured).                |
| **Lucide**                 | A small set of line icons (arrows, plus/minus).                               |
| **next/font**              | Self-hosts Barlow Condensed, Manrope and JetBrains Mono — no Google requests at runtime. |

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
│  ├─ page.tsx               Homepage (assembles the sections)
│  ├─ contact/page.tsx       Contact page
│  ├─ privacy/ terms/        Legal pages (edit wording directly here)
│  ├─ api/contact/route.ts   Server code that receives the contact form
│  ├─ layout.tsx             Shared layout, page titles and SEO defaults
│  ├─ globals.css            ★ Design tokens: colours, type sizes, hero animation
│  ├─ fonts.ts               ★ Font choices
│  ├─ sitemap.ts, robots.ts  Search-engine files
│  ├─ opengraph-image.tsx    Image shown when the site is shared on social media
│  └─ icon.svg               Browser-tab icon
├─ config/site.ts            ★ Contact email, LinkedIn, WhatsApp, booking link, site URL
├─ content/
│  ├─ home.ts                ★ ALL homepage text
│  └─ contact.ts             ★ Contact page text and form options
├─ components/
│  ├─ hero/                  Hero + the animated "Revivo Intelligence Field"
│  ├─ home/                  One file per homepage section
│  ├─ contact/               The enquiry form
│  ├─ layout/                Header (with mobile menu) and footer
│  ├─ brand/                 REVIVO wordmark and symbol
│  ├─ motion/                Animation helpers (scroll reveal, reduced-motion support)
│  └─ ui/                    Buttons, section headers, accessible tabs
└─ lib/                      Form validation, structured data, small helpers
```

★ = the files you are most likely to edit.

### Changing website copy

All homepage wording is in **`src/content/home.ts`**. Change the text between the quotes and save — the layout updates
automatically. Contact-page wording and dropdown options are in **`src/content/contact.ts`**. Privacy and terms wording
is directly in `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`.

Before changing copy, read the "Accuracy rules" in `CLAUDE.md` (no invented clients, metrics or products).

### Changing contact details

Open **`src/config/site.ts`**:

- **Email** — set `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local` (and on Vercel), _or_ type it into `email: ... || ""`.
- **LinkedIn / WhatsApp / booking link** — paste the full URL between the quotes.

Anything left as `""` is simply hidden (the footer shows "LinkedIn — coming soon" until a URL is added).

### Adding the founder photograph

Put the photo in `public/` (e.g. `public/founder.jpg`), then in `src/content/home.ts` set:

```ts
photo: { src: "/founder.jpg", alt: "Pothen Cherian, founder of Revivo" },
```

Until then, an abstract typographic panel is shown. Never use a generated or stock image there.

### Changing colours and fonts

- **Colours:** edit the `@theme` block at the top of `src/app/globals.css` (e.g. `--color-lime: #ccff00;`). Every
  part of the site uses these tokens, so one change updates everything. Note: the hero SVG and social image repeat a few
  hex values — search for the old hex code if you change the palette.
- **Fonts:** edit `src/app/fonts.ts` (choose any font from `next/font/google`). Keep to three roles: display, body, mono.

---

## Environment variables

Copy the example file and fill in values:

```bash
cp .env.example .env.local
```

| Variable                    | Required?          | What it does                                                    |
| --------------------------- | ------------------ | --------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | For production     | Your live address, e.g. `https://www.yourdomain.com`            |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Strongly recommended | Public email shown on the site and used by the email fallback |
| `RESEND_API_KEY`            | To send form emails | Secret key from Resend                                          |
| `CONTACT_TO_EMAIL`          | To send form emails | Inbox that receives enquiries                                   |
| `CONTACT_FROM_EMAIL`        | To send form emails | Sender address on a domain verified in Resend                   |

`.env.local` is never committed to Git. **Never paste real keys into any committed file.**

## Contact-form setup

1. Create a free account at <https://resend.com>.
2. Add and verify your domain (Resend shows the DNS records to add at your domain provider).
3. Create an API key.
4. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` (locally in `.env.local`, and on Vercel).
5. Restart the server and send a test enquiry.

**If email is not configured**, the form still validates, then shows a clear message with an **"Email your enquiry"**
button (opens the visitor's email app with their answers filled in, using `NEXT_PUBLIC_CONTACT_EMAIL`) and a
**"Copy enquiry text"** button. Submissions are never silently lost.

Spam protection: a hidden "honeypot" field that people never see; bots that fill it get a fake success and nothing is
sent. There is no rate limiting yet (see limitations).

---

## Quality checks

Run these before publishing changes:

```bash
npm run lint        # code-quality rules (ESLint)
npm run typecheck   # TypeScript type checking
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

| Problem                                    | Fix                                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| `npm: command not found`                   | Install Node.js from <https://nodejs.org>, then reopen the terminal.            |
| `Port 3000 is already in use`              | Another server is running. Stop it (`Ctrl + C` in its terminal) or use `-p 3001`. |
| Changes don't appear                       | Save the file; hard-refresh the browser (`Ctrl/Cmd + Shift + R`).               |
| Contact form shows "Online sending isn't available yet" | Email variables aren't set — see _Contact-form setup_. Restart the server after editing `.env.local`. |
| Build fails after editing `home.ts`        | Usually a missing quote, comma or bracket. The error message names the line.    |
| Fonts fail to download during build        | The build fetches fonts once from Google; check your internet connection.       |
| Weird errors after updating packages       | Delete `node_modules` and `.next`, then run `npm install` again.                |
