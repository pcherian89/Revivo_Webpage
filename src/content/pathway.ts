/** Copy for /pathway, the Revivo Pathway prototype page. Prototype on fictional data: never claim clients or results. */
export const pathway = {
  eyebrow: "Prototype · Talent identification & development",
  description:
    "A clickable prototype of a consent-based talent identification programme, built on fictional data to show how Revivo designs a complete system.",
  lead: "A clickable prototype of a consent-based talent programme, built on fictional data to show how Revivo designs a complete system—from a school's class list to a training place and a first progress review.",
  demoNote: "Opens the prototype in a new tab. A guided journey takes about ten minutes.",
  howTitle: "One young person's journey, end to end.",
  stages: [
    {
      name: "Consent",
      body: "A school lists a class. Each family decides, purpose by purpose; saying no changes nothing for the child.",
    },
    {
      name: "Assessment",
      body: "Simple, agreed tests at stations. A second person checks any unusual result before anyone sees it.",
    },
    {
      name: "Review",
      body: "A person chooses the next step with a reason; a different person approves it. Families see verified results only.",
    },
    {
      name: "Referral",
      body: "A nearby training place sees an anonymous card until the family accepts. No one has to change school.",
    },
    {
      name: "Development",
      body: "A development plan, attendance and coach reviews, with retests compared fairly over time.",
    },
  ],
  safeTitle: "Built around children, families and fair decisions.",
  safeguards: [
    "No assessment without a family's recorded consent; withdrawing stops everything.",
    "It describes current strengths. It never predicts talent, ranks children or labels anyone.",
    "People make every decision, and a second person checks it.",
    "Results are compared with peers of the same age, with fairness checks by sex, birth date, disability and area.",
    "Only the people who need to see a child's record can see it, and every view is recorded.",
  ],
  about: [
    "Revivo Pathway is a prototype, not a deployed system. Every person, school, centre and result in it is invented, and some steps—such as messages and sign-in—are simulated.",
    "It shows the kind of complete system Revivo can design. A real programme is built around each client's sports, country, rules, data and data-protection requirements, with experts approving the tests and wording.",
  ],
} as const;
