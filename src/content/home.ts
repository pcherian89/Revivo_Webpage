/**
 * HOMEPAGE COPY (hero, process, final call to action).
 * Zone and capability content lives in `src/content/explorer.ts`.
 *
 * Word limits (enforced by `npm run check:copy`). Never add clients,
 * testimonials, metrics or product names. One tagline only — see CLAUDE.md.
 */

export const hero = {
  eyebrow: "Custom AI solutions for sport",
  /** The master tagline. Exactly as written, on two lines. */
  headline: { first: "AI built for", before: "the ", pulse: "pulse", after: " of sport." },
  statement:
    "Revivo designs custom AI systems for sports organizations—from operations and commercial growth to athlete development, performance, governance and impact.",
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
} as const;

export const finalCta = {
  title: "What is your organization not seeing yet?",
  support: "Bring us the process, bottleneck or decision that needs to work better.",
  signal: {
    label: "Your signal",
    idle: "Start typing — every challenge begins as a signal.",
    active: "Signal received. Keep going.",
  },
  nextLabel: "What happens next",
  next: [
    "We read your challenge properly.",
    "We reply with a few focused questions.",
    "If there is a fit, we suggest a first conversation.",
  ],
} as const;
