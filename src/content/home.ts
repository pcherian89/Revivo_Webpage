/**
 * HOMEPAGE COPY — every word on the homepage lives here.
 *
 * Word limits (enforced by `npm run check:copy`):
 *   hero statement ≤ 35 · scene intro ≤ 40 · each flatline part ≤ 35
 *   story annotation ≤ 12 · process step ≤ 20 · max 3 stories
 *
 * Accuracy: everything here is illustrative of what Revivo could build.
 * Never add clients, testimonials, metrics or product names. See CLAUDE.md.
 * Language: avoid category words (gym software, CRM, dashboard, platform, app).
 */

export const hero = {
  eyebrow: "Custom-built for sport and fitness",
  /** The one tagline on the site. Two lines on wide screens. */
  headline: ["AI that gives", "sport a pulse."],
  statement:
    "Revivo designs and builds custom AI solutions for sport and fitness—so coaches can track progress, clients can see it, and organizations stop losing what matters between sessions, spreadsheets and chat groups.",
  secondaryAction: { label: "Explore what we solve", href: "#what-we-solve" },
  audience: "For coaches, academies, clubs, fitness studios, events and sports bodies.",
} as const;

export const flatlines = {
  title: "Find the flatline.",
  intro: "Every organization has something that has gone quiet. Choose the one that sounds familiar.",
  labels: { problem: "What has gone quiet", system: "What we could build", outcome: "What comes alive" },
  items: [
    {
      id: "progress",
      name: "Progress no one can see",
      problem:
        "Coaches put in the work and clients put in the effort, but neither can clearly see what is improving.",
      system: "A shared progress record: coaches capture in seconds, and clients see their own improvement.",
      outcome: "Visible progress that keeps athletes and clients committed.",
      oftenFor: "Coaches, academies, fitness studios and athlete-development programs",
    },
    {
      id: "relationships",
      name: "Relationships that go quiet",
      problem: "Enquiries, trials, members, parents and sponsors drift away without anyone noticing.",
      system:
        "A relationship memory that remembers every conversation and prompts the right follow-up at the right moment.",
      outcome: "Fewer people lost to silence, and fair credit to whoever earned it.",
      oftenFor: "Clubs, studios, academies and commercial teams",
    },
    {
      id: "operations",
      name: "Days held together by chat groups",
      problem: "Sessions, staff, venues and event days run on message threads and memory.",
      system: "One live picture of who is doing what, where, with issues escalated to the right person.",
      outcome: "Calmer days and a clear record of what happened.",
      oftenFor: "Events, venues, leagues and multi-site organizations",
    },
    {
      id: "talent",
      name: "Talent that slips through",
      problem:
        "Promising athletes are assessed inconsistently and lost between levels, coaches and programs.",
      system:
        "A connected pathway: standard assessments, evidence profiles and alerts when development stalls.",
      outcome: "Development decisions backed by evidence, not memory.",
      oftenFor: "Academies, federations, teams and talent programs",
    },
    {
      id: "safety",
      name: "Concerns that go unheard",
      problem: "Incidents and welfare concerns are hard to raise, and harder to follow through.",
      system: "Confidential reporting and case tracking, built around your policies and people.",
      outcome: "Every concern heard, handled and recorded responsibly.",
      oftenFor: "Federations, foundations, academies and events",
    },
  ],
} as const;

export const stories = {
  title: "From silence to signal.",
  intro: "One example at a time: how a quiet process could become a living system.",
  qualifier:
    "Illustrative system. Every Revivo engagement is designed around the client’s actual workflow, users, data and objectives.",
  items: [
    {
      id: "progress",
      label: "Progress",
      problem: "The coach sees the work. The client feels the effort. Neither can see the progress.",
      steps: [
        { label: "Session" },
        { label: "Coach note", note: "Captured in seconds, during the session" },
        { label: "Measurement", note: "Measured the same way, every time" },
        { label: "Progress record" },
        { label: "Client view", note: "Progress visible to coach and client" },
        { label: "Plateau check", note: "Plateaus flagged before motivation drops" },
        { label: "Plan adjusted", note: "Next session planned on evidence" },
      ],
    },
    {
      id: "relationships",
      label: "Relationships",
      problem: "An enquiry, a trial, a great conversation—then silence.",
      steps: [
        { label: "First contact", note: "Every touchpoint remembered" },
        { label: "Conversation" },
        { label: "Trial" },
        { label: "Follow-up", note: "Silence noticed, follow-up prompted" },
        { label: "Joined", note: "Contribution credited fairly" },
        { label: "Check-in" },
        { label: "Renewal", note: "Renewal conversations prepared in advance" },
      ],
    },
    {
      id: "event-day",
      label: "Event day",
      problem: "Staff, equipment and incidents run through a dozen chat groups.",
      steps: [
        { label: "Briefing" },
        { label: "Assignment", note: "Every role assigned and confirmed" },
        { label: "Checklist" },
        { label: "Incident", note: "Logged once, in one place" },
        { label: "Escalation", note: "Routed to the right person immediately" },
        { label: "Resolution" },
        { label: "Report", note: "Generated, not compiled" },
      ],
    },
  ],
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
  credibility:
    "Founded by Pothen Cherian, Revivo combines experience inside sports operations and analytics with practical AI engineering—so what we build fits the way sport actually works.",
} as const;

export const conversation = {
  title: "What has gone quiet in your organization?",
  support: "Show us the progress, relationship or process that needs a pulse.",
} as const;
