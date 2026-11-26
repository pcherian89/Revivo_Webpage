/** Copy for /impact, the Revivo Impact prototype page. Prototype on fictional data: never claim clients or results. */
export const impact = {
  eyebrow: "Prototype · Funding, grants & programmes",
  description:
    "A clickable prototype of a sports funding and sponsorship system, built on fictional data to show how Revivo designs a complete system.",
  lead: "A clickable prototype of a sports funding and sponsorship system, built on fictional data to show how Revivo designs a complete system—from a published scholarship to payments, spending checks and an honest report.",
  demoNote: "Opens the prototype in a new tab. The main guided journey takes about ten minutes.",
  howTitle: "One scholarship, from first search to final report.",
  stages: [
    {
      name: "Publish",
      body: "A foundation drafts a scholarship and a different person publishes it, with clear rules on who can apply.",
    },
    {
      name: "Discover",
      body: "An athlete joins on her own and sees why each opportunity fits. Funders can find athletes, requests and teams too.",
    },
    {
      name: "Apply",
      body: "One sporting profile fills each application. Missing documents are flagged before anything is sent.",
    },
    {
      name: "Decide",
      body: "Staff check and score applications. An approver decides every offer, with the budget shown after each one.",
    },
    {
      name: "Pay & report",
      body: "Finance records each payment. Spending and results are checked against receipts, and every figure in a report opens its source.",
    },
  ],
  safeTitle: "Built around fair decisions and young people's safety.",
  safeguards: [
    "People make every decision. The person who approves funding is never the person who pays it.",
    "Results are matched on stated rules, never ranked by popularity, followers or a talent score.",
    "Under-18s are never searchable. A guardian decides everything, and funders see only an anonymised card.",
    "A promise is never shown as paid, and reported spending is never shown as checked.",
    "The AI help is simulated and labelled. It explains matches and drafts text, but never decides who is funded.",
  ],
  about: [
    "Revivo Impact is a prototype, not a deployed system. Every person, organisation, amount and record in it is invented, and some steps—such as sign-in, payments, checks and messages—are simulated. No real money moves.",
    "It shows the kind of complete system Revivo can design. A real system is built around each client's funding rules, country, payment provider, data and data-protection requirements.",
  ],
} as const;
