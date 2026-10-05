/**
 * HOMEPAGE COPY
 * Every piece of homepage text lives here. Edit wording in this file —
 * the components read from it and do not need to change.
 *
 * Accuracy rules (see CLAUDE.md): examples are illustrative solution areas,
 * not finished products. Never add clients, metrics or testimonials here
 * unless they are real and approved.
 */

export const hero = {
  eyebrow: "The game is only the visible part.",
  headline: ["Sport creates the challenges.", "We build the intelligence."],
  description:
    "Revivo designs and builds tailored AI, data and automation solutions for sports and fitness organizations—from operations and commercial growth to athlete development, performance and safety.",
  secondaryCta: { label: "Explore what we can build", href: "#what-we-build" },
  supportingLabel: "India-based. Built for sport anywhere.",
} as const;

/** Nodes in the hero "Revivo Intelligence Field". Examples are illustrative. */
export const intelligenceField = {
  inputs: [
    { id: "athlete", label: "Athlete", example: "Development pathways" },
    { id: "coach", label: "Coach", example: "Standardized observations" },
    { id: "member", label: "Member", example: "Journeys, renewals and retention" },
    { id: "video", label: "Video", example: "Analysis and tagging workflows" },
    { id: "venue", label: "Venue", example: "Readiness and maintenance" },
    { id: "event", label: "Event", example: "Staff, equipment and incident command" },
    { id: "revenue", label: "Revenue", example: "Leads, commissions and sponsorship" },
    { id: "safety", label: "Safety", example: "Incidents and safeguarding" },
  ],
  outputs: ["Workflow", "Insight", "Alert", "Decision", "Action"],
} as const;

export const problem = {
  index: "01",
  label: "The problem",
  headline: ["Sport moves fast.", "Its systems often do not."],
  body: "Across sport and fitness, critical information remains trapped in spreadsheets, WhatsApp groups, paper reports and disconnected platforms. Data is collected, but it rarely reaches the right person at the right time.",
  todayLabel: "How it often runs today",
  today: [
    "Disconnected tools",
    "Manual reporting",
    "Isolated athlete records",
    "Unclear staff accountability",
    "Unused video and data",
    "Missed revenue opportunities",
    "Slow incident workflows",
  ],
  transformLine: "From fragmented activity to coordinated intelligence.",
  betterLabel: "What a well-built system supports",
  better: ["Connected workflow", "Clear accountability", "Timely insight", "Coordinated action"],
  closing:
    "Revivo begins with the problem and builds the system around the way your organization actually works.",
} as const;

export const capabilities = {
  index: "02",
  label: "What we build",
  annotation: "Signal channels / 05",
  headline: ["What we can build", "with you"],
  intro:
    "We work across the systems that keep sport moving—from daily operations and commercial growth to athlete development, performance and safety.",
  qualifier:
    "These are representative solution areas. Every engagement begins with discovery, and the final system is scoped around the organization’s users, workflow, data and objectives.",
  channels: [
    {
      id: "run",
      name: "Run better",
      summary:
        "Operational systems that replace scattered spreadsheets, chats and paper with clear, accountable workflows.",
      items: [
        "Gym and academy operations",
        "Member and participant workflows",
        "Event command systems",
        "Venue and equipment management",
        "Staff accountability",
        "Dashboards and reporting",
      ],
    },
    {
      id: "grow",
      name: "Grow smarter",
      summary: "Commercial systems that make leads, contributions, retention and sponsor value visible.",
      items: [
        "Lead tracking",
        "Contribution and commission attribution",
        "Membership retention",
        "Sponsorship workflows",
        "Sponsor delivery reporting",
        "Content and campaign automation",
      ],
    },
    {
      id: "develop",
      name: "Develop people",
      summary:
        "Development systems that give athletes, coaches and experts a shared, evidence-based picture of progress.",
      items: [
        "Athlete profiles",
        "Standardized assessments",
        "Coach observations",
        "Progress tracking",
        "Talent pathways",
        "Expert intervention workflows",
      ],
    },
    {
      id: "perform",
      name: "Perform with clarity",
      summary:
        "Performance tools that organize video, scouting and workload information into coach-assisted decision support.",
      items: [
        "Video-analysis workflows",
        "Scouting information",
        "Pose-assessment pilots",
        "Workload decision support",
        "Performance dashboards",
        "Coach-assisted intelligence",
      ],
    },
    {
      id: "protect",
      name: "Protect what matters",
      summary:
        "Safety and governance workflows that make concerns easier to raise, track and resolve responsibly.",
      items: [
        "Incident reporting",
        "Safeguarding workflows",
        "Confidential complaints",
        "Policy knowledge assistants",
        "Case histories and escalation",
        "Welfare and governance reporting",
      ],
    },
  ],
} as const;

export const problemToSystem = {
  index: "03",
  label: "Problem to system",
  annotation: "Illustrative systems",
  headline: ["From operational problem", "to working system."],
  intro:
    "Choose an example. Each starts with a problem we hear in sport and shows the kind of system Revivo could design around it.",
  disclaimer:
    "Illustrative systems — not existing packaged products. Final scope, features and integrations are defined with each organization during discovery.",
  examples: [
    {
      id: "gym-revenue",
      label: "Gym revenue",
      problem:
        "Our coach developed the lead, but someone else closed the membership and received all the commission.",
      today: ["Paper enquiry forms", "Personal WhatsApp chats", "Month-end spreadsheet"],
      system: [
        "Time-stamped lead journey",
        "Contribution attribution",
        "Configurable commission rules",
        "Manager approval",
        "Permanent audit history",
        "Owner reporting",
      ],
    },
    {
      id: "athlete-development",
      label: "Athlete development",
      problem: "Our coaches assess athletes differently, and we cannot see whether they are improving.",
      today: ["Individual coach notebooks", "Inconsistent test formats", "Verbal feedback"],
      system: [
        "Standardized assessment workflow",
        "Athlete evidence profile",
        "Coach verification",
        "Progress trends",
        "Stagnation alerts",
        "Expert review",
      ],
    },
    {
      id: "event-operations",
      label: "Event operations",
      problem: "Our event team coordinates staff, incidents and equipment through multiple WhatsApp groups.",
      today: ["Multiple WhatsApp groups", "Printed checklists", "Phone calls for incidents"],
      system: [
        "Staff assignments",
        "Operational checklists",
        "Equipment tracking",
        "Incident escalation",
        "Live status visibility",
        "Automated reporting",
      ],
    },
    {
      id: "sponsorship",
      label: "Sponsorship",
      problem: "We cannot clearly prove the value delivered to sponsors.",
      today: ["Contract PDFs", "Shared photo folders", "Manual end-of-season report"],
      system: [
        "Sponsorship inventory",
        "Contracted deliverables",
        "Fulfilment tracking",
        "Evidence repository",
        "Sponsor reports",
        "Renewal alerts",
      ],
    },
  ],
} as const;

export const sectors = {
  index: "04",
  label: "Who we build for",
  annotation: "Sectors / 08",
  headline: ["Built around the way", "your organization works."],
  intro:
    "Select your type of organization to see an illustrative workflow. Designed for sport. Configured for you.",
  columns: {
    challenge: "Typical challenge",
    system: "What Revivo could build",
    outcome: "Potential outcome",
  },
  items: [
    {
      id: "gyms",
      name: "Gyms and fitness businesses",
      challenge:
        "Leads, trials, renewals and staff contributions are tracked across spreadsheets and messaging apps, so owners cannot see where members come from or why they leave.",
      system:
        "A member-journey system that connects lead capture, trial follow-up, commission attribution and retention alerts in one workflow.",
      outcome:
        "Designed to give owners clearer visibility of acquisition and retention, and a fairer record of staff contribution.",
    },
    {
      id: "academies",
      name: "Sports academies",
      challenge:
        "Coaches assess athletes in different ways, and parents ask for evidence of progress that is hard to compile.",
      system:
        "A standardized assessment and athlete-profile workflow with coach verification and clear progress reports.",
      outcome: "Supports more consistent evaluation and makes progress over time easier to see and explain.",
    },
    {
      id: "teams",
      name: "Teams and clubs",
      challenge:
        "Video, scouting notes and workload information sit with different staff members and rarely come together before a decision.",
      system:
        "A shared performance information hub linking video tags, observations and workload records into coach-facing decision support.",
      outcome: "Staff could work from one shared picture, while coaches keep the final call.",
    },
    {
      id: "leagues",
      name: "Leagues and tournaments",
      challenge:
        "Registrations, eligibility checks, officials and results are coordinated manually across emails and spreadsheets.",
      system:
        "A competition-operations workflow covering registration, eligibility checks, officials assignment, results capture and automated reporting.",
      outcome: "Fewer manual handoffs and faster, more reliable competition reporting.",
    },
    {
      id: "events",
      name: "Events and venues",
      challenge:
        "Staff, equipment and incidents are coordinated through multiple chat groups, and nothing is documented in one place.",
      system:
        "An event command system with staff assignments, checklists, equipment tracking, incident escalation and live status.",
      outcome: "Clearer accountability on event day and a documented operational record afterwards.",
    },
    {
      id: "federations",
      name: "Federations and government programs",
      challenge:
        "Program and talent data arrives from districts and centres in inconsistent formats, making comparison slow and unreliable.",
      system:
        "Standardized data collection with talent-pathway tracking and role-based reporting for program officials.",
      outcome: "More comparable information across regions to support program decisions and reporting.",
    },
    {
      id: "foundations",
      name: "Sports foundations",
      challenge:
        "Evidence of impact across participants, coaches and sites is difficult to compile for donors and boards.",
      system:
        "A participant-tracking and impact-reporting workflow, with safeguarding records handled appropriately.",
      outcome: "More credible, timely impact reporting with less manual compilation.",
    },
    {
      id: "commercial",
      name: "Commercial and sponsorship organizations",
      challenge:
        "Contracted sponsor deliverables are tracked loosely, so proving the value delivered at renewal time is difficult.",
      system:
        "A sponsorship workflow covering inventory, contracted deliverables, fulfilment evidence, sponsor reports and renewal alerts.",
      outcome: "Designed to make delivered sponsor value visible and renewal conversations evidence-based.",
    },
  ],
} as const;

export const process = {
  index: "05",
  label: "How we work",
  annotation: "Discovery → system",
  headline: ["One challenge.", "The right system."],
  supporting:
    "Every engagement is client-specific. Revivo reuses proven technical foundations where appropriate while designing the workflow around your organization.",
  brandLine: "Custom where it matters. Reusable where it makes sense.",
  steps: [
    {
      name: "Discover",
      body: "Understand the problem, users and current process.",
    },
    {
      name: "Define",
      body: "Identify the required data, decisions, workflows and success measures.",
    },
    {
      name: "Prototype",
      body: "Demonstrate the proposed experience before full development.",
    },
    {
      name: "Build and implement",
      body: "Develop, test, integrate and launch the working solution.",
    },
    {
      name: "Improve",
      body: "Support the system, learn from usage and extend it over time.",
    },
  ],
} as const;

export const delivery = {
  index: "06",
  label: "Delivery options",
  annotation: "Customer-shaped. Revivo-built.",
  headline: ["Built for your organization.", "Supported by Revivo."],
  intro:
    "How a solution is branded, owned and delivered is agreed during scoping, based on the architecture, integrations and support each organization needs.",
  options: [
    {
      name: "Revivo-powered",
      body: "A Revivo-branded solution configured around the organization.",
    },
    {
      name: "Powered by Revivo",
      body: "The client’s identity combined with visible Revivo technology.",
    },
    {
      name: "Custom or white-label",
      body: "Custom workflows, integrations and selected white-label delivery where scope and architecture support it.",
    },
    {
      name: "Existing-system integration",
      body: "New intelligence, automation or reporting added to tools the organization already uses.",
    },
  ],
} as const;

export const why = {
  index: "07",
  label: "Why Revivo",
  annotation: "Technology should clarify the next move.",
  headline: ["Sports understanding.", "Systems thinking.", "Practical AI."],
  strengths: [
    {
      name: "Sports-domain understanding",
      body: "We start from how sport actually runs—seasons, squads, members, events and the people responsible for them.",
    },
    {
      name: "Event and operational experience",
      body: "Experience inside live sports operations informs systems that hold up under real deadlines and pressure.",
    },
    {
      name: "Analytics and data capability",
      body: "We structure messy information so it can be measured, compared and trusted.",
    },
    {
      name: "AI and software implementation",
      body: "We build working software—applying AI where it adds value and simpler automation where it does not.",
    },
    {
      name: "Problem-first solution design",
      body: "Every engagement starts with the problem, the users and the decision—not with a technology looking for a use.",
    },
    {
      name: "India-based, internationally applicable",
      body: "Based in India and building for sports and fitness organizations wherever they operate.",
    },
  ],
} as const;

export const founder = {
  index: "08",
  label: "Founder experience",
  name: "Pothen Cherian",
  role: "Founder, Revivo",
  /**
   * To add a real photograph later: place the file in /public (for example
   * /public/founder.jpg) and set photo to { src: "/founder.jpg", alt: "…" }.
   * Never use a generated or stock image here.
   */
  photo: null as null | { src: string; alt: string },
  monogram: "PC",
  lead: "Revivo is founded at the intersection of sports operations, analytics and applied AI.",
  body: "That combination shapes how Revivo works: understand how the work is really done, then build systems that people in sport will actually use.",
  background: [
    "Sports management and sports analytics",
    "ICC Men’s T20 Cricket World Cup operations experience",
    "Experience across US professional and university sports environments",
    "Sports analytics and AI system projects",
    "Athlete-development and wellness technology experience",
    "Practical understanding of operational sports problems",
  ],
  note: "This describes the founder’s individual professional experience. The organizations referenced are not Revivo clients or partners.",
} as const;

export const finalCta = {
  headline: ["What should work better", "in your organization?"],
  body: "Show us the process, bottleneck or decision you want to improve. We will help determine whether AI, automation, analytics—or a simpler system—is the right answer.",
  brandLine: "Bring us the process slowing your organization down.",
} as const;
