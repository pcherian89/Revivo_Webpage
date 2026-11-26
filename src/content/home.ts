/**
 * HOMEPAGE COPY (hero, process, final call to action).
 * Zone and capability content lives in `src/content/explorer.ts`.
 *
 * Word limits (enforced by `npm run check:copy`). Never add clients,
 * testimonials, metrics or product names. One tagline only — see CLAUDE.md.
 */

export const hero = {
  eyebrow: "Digital solutions for sport",
  /** The master tagline: two sentences, one statement, one h1. "Pulse" and "Mind" in lime. */
  headline: {
    line1: { pulse: "Pulse", rest: " of Sport." },
    line2: { accent: "Mind", rest: " of the Game." },
  },
  statement:
    "Revivo builds AI-powered digital solutions for sport, helping organisations develop athletes, engage audiences, manage events and make better decisions.",
  secondaryAction: { label: "Explore the signal", href: "#explore" },
} as const;

export const process = {
  title: "We start with the problem—not the technology.",
  steps: [
    {
      name: "Discover",
      body: "We learn how the work really happens: the people, the process and the pressure points.",
    },
    { name: "Define", body: "We agree the users, data, decisions and what success should look like." },
    { name: "Prototype", body: "You see and test the proposed system before full development begins." },
    { name: "Build", body: "We build, integrate and launch the working system—then keep improving it." },
  ],
  /** Proof of the Prototype step: one line under the steps, linking to each prototype page. */
  proof: {
    title: "See a prototype working.",
    body: "Revivo Pathway runs a talent identification programme and Revivo Impact runs sports funding and sponsorship, end to end, on fictional data. People make every decision.",
    links: [
      { label: "Explore Revivo Pathway", href: "/pathway" },
      { label: "Explore Revivo Impact", href: "/impact" },
    ],
  },
} as const;

export const finalCta = {
  title: "What is your organisation not seeing yet?",
  support: "Bring us the process, bottleneck or decision that needs to work better.",
  signal: {
    label: "Your signal",
    idle: "Start typing — every conversation begins as a signal.",
    active: "Signal received. Keep going.",
  },
  nextLabel: "What happens next",
  next: [
    "We read your message properly.",
    "We reply with a few focused questions.",
    "If there is a fit, we suggest a first conversation.",
  ],
} as const;
