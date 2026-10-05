/**
 * DOMAIN EXPLORER CONTENT — the single source for the four solution zones and
 * their sixteen capabilities. The signal map, the HTML index and the detail
 * panels all read from this file, so labels always stay consistent.
 *
 * These are illustrative capabilities Revivo can configure and build — never
 * describe them as finished products. Outcomes are "designed to", not promises.
 */

export type Capability = {
  id: string;
  name: string;
  /** One concise statement of the client's problem */
  problem: string;
  /** Three to five representative capabilities or workflows */
  build: readonly string[];
  /** One outcome-focused statement (never a guarantee) */
  outcome: string;
  /** Optional scoping note, e.g. for R&D-level work */
  note?: string;
};

export type Zone = {
  id: string;
  name: string;
  summary: string;
  capabilities: readonly Capability[];
};

export const explorer = {
  title: "Explore the signal.",
  intro:
    "One intelligence layer connects four areas of sport. Activate it, choose an area, then a capability to see what Revivo could build.",
  layer: {
    name: "Revivo Intelligence Layer",
    detail: "AI · data · automation · decision support",
    activate: "Tap to activate",
    chooseZone: "Choose an area",
    chooseCap: "Choose a capability",
  },
  qualifier:
    "Illustrative possibilities. Every Revivo system is designed around the client’s workflows, users, data and objectives.",
  converge: "Built around your challenge",
  panelLabels: {
    problem: "Common problem",
    build: "What Revivo could build",
    outcome: "Potential outcome",
    cta: "Discuss this challenge",
  },
} as const;

export const zones: readonly Zone[] = [
  {
    id: "operations",
    name: "Operations & Infrastructure",
    summary: "Events, venues, administration and the people who run them.",
    capabilities: [
      {
        id: "event-venue-operations",
        name: "Event and venue operations",
        problem:
          "Event days run on scattered rosters, accreditation spreadsheets, radio calls and chat groups—so readiness is unclear and reporting starts from scratch afterwards.",
        build: [
          "Staff scheduling and role assignment",
          "Accreditation status and access lists",
          "Match-day readiness checklists by area",
          "Incident logging with clear escalation routes",
          "Automated post-event reporting",
        ],
        outcome:
          "Designed to give organizers one connected picture on event day and a far shorter path to the post-event report.",
      },
      {
        id: "facility-asset-management",
        name: "Facility and asset management",
        problem:
          "Maintenance requests arrive by phone and message, equipment goes untracked, and bookings rarely reflect how spaces are really used.",
        build: [
          "Maintenance intake and prioritization",
          "Equipment and asset register with condition history",
          "Booking and space-utilization insight",
          "Inspection checklists and reports",
        ],
        outcome:
          "Designed to surface urgent maintenance first and give managers clearer visibility of assets and space.",
      },
      {
        id: "registration-administration",
        name: "Registration and administration",
        problem:
          "Registrations, documents, fees and schedules are handled across forms, spreadsheets and messages, creating delays and endless follow-up.",
        build: [
          "Online registration and eligibility capture",
          "Document verification workflow",
          "Fee and payment-status tracking",
          "Scheduling and allocation",
          "Automated participant and parent communication",
        ],
        outcome:
          "Designed to cut manual administration and show staff exactly where every application stands.",
      },
      {
        id: "workforce-volunteers",
        name: "Workforce and volunteer coordination",
        problem:
          "Recruiting, credentialing, training and rostering staff and volunteers happens in separate lists, so gaps only appear on the day.",
        build: [
          "Recruitment and application screening",
          "Credential and training-compliance tracking",
          "Shift allocation and confirmations",
          "Attendance and deployment reporting",
        ],
        outcome: "Designed to show who is qualified, confirmed and available before a shift begins.",
      },
    ],
  },
  {
    id: "revenue",
    name: "Revenue & Engagement",
    summary: "Sponsors, fans, content and members—the commercial engine of sport.",
    capabilities: [
      {
        id: "sponsorship-intelligence",
        name: "Sponsorship intelligence",
        problem:
          "Inventory, contracted deliverables and activation evidence live in different files, so proposals are slow and sponsor value is hard to prove.",
        build: [
          "Prospect research and proposal support",
          "Inventory and rights tracking",
          "Contracted deliverable tracking",
          "Activation evidence capture",
          "Sponsor-ready ROI reporting",
        ],
        outcome: "Designed to make delivered value visible and renewal conversations evidence-based.",
      },
      {
        id: "fan-ticket-intelligence",
        name: "Fan and ticket intelligence",
        problem:
          "Ticketing and fan data sit in separate systems, so campaigns stay broad, attendance is hard to forecast and pricing relies on instinct.",
        build: [
          "Attendance forecasting",
          "Fan segmentation",
          "Personalized campaign support",
          "Ticket-pricing recommendations for human review",
        ],
        outcome:
          "Designed to support better-targeted campaigns and more informed attendance and ticketing decisions.",
      },
      {
        id: "content-media-workflows",
        name: "Content and media workflows",
        problem:
          "Match recaps, player graphics, social copy and sponsor content are produced by hand, and approvals slow everything down.",
        build: [
          "Recaps drafted from approved match data",
          "Templated player and result graphics",
          "Social copy drafts for review",
          "Sponsor-branded content variations",
          "Approval workflow with brand controls",
        ],
        outcome: "Designed to help teams publish faster while every asset stays approved and on-brand.",
      },
      {
        id: "membership-intelligence",
        name: "Membership and fitness-business intelligence",
        problem:
          "Leads pass between staff, trials go unfollowed, and nobody can say who earned a membership—or which members are about to leave.",
        build: [
          "Lead ownership with time-stamped journeys",
          "Staff-contribution tracking",
          "Trial follow-up prompts",
          "Commission attribution on agreed rules",
          "Renewal and retention-risk signals",
        ],
        outcome:
          "Designed to give owners a fair record of contribution and earlier sight of members at risk.",
      },
    ],
  },
  {
    id: "performance",
    name: "Athlete Development & Performance",
    summary: "From first assessment to career—development made visible.",
    capabilities: [
      {
        id: "athlete-management",
        name: "Athlete management and development",
        problem:
          "Check-ins, training logs and recovery notes are scattered, so staff struggle to see availability or long-term development.",
        build: [
          "Wellness check-ins",
          "Training and workload logs",
          "Recovery summaries",
          "Availability tracking and staff alerts",
          "Long-term development view",
        ],
        outcome:
          "Designed to give staff one shared view of each athlete, with practitioners making every decision.",
      },
      {
        id: "video-performance-analysis",
        name: "Video and performance analysis",
        problem:
          "Footage piles up faster than analysts can tag it, so clips, opposition reports and match summaries arrive too late to use.",
        build: [
          "Structured tagging and event-coding workflows",
          "Player clip libraries",
          "Opposition and match report templates",
          "Searchable footage archive",
        ],
        outcome: "Designed to turn footage into decision-ready clips and reports sooner.",
        note: "Advanced computer-vision analysis is scoped as a pilot or R&D engagement.",
      },
      {
        id: "talent-recruitment",
        name: "Talent identification and recruitment",
        problem:
          "Scouting reports, data and video live in different places, making players hard to compare and shortlists hard to justify.",
        build: [
          "Standardized scouting reports",
          "Player comparison on agreed criteria",
          "Shortlist creation and review",
          "Searchable talent pool",
          "Evidence verification",
        ],
        outcome: "Designed to make recruitment decisions more consistent and better evidenced.",
      },
      {
        id: "athlete-career-welfare",
        name: "Athlete career and welfare",
        problem:
          "Athletes lack verified profiles and clear routes to scholarships, careers and welfare support.",
        build: [
          "Verified athlete profiles",
          "Sports CV creation",
          "Scholarship and college matching",
          "Career-planning support",
          "Access to welfare resources",
        ],
        outcome:
          "Designed to connect athletes with suitable opportunities and the right support at the right time.",
      },
    ],
  },
  {
    id: "governance",
    name: "Governance & Impact",
    summary: "Safeguarding, participation and the evidence that sport changes lives.",
    capabilities: [
      {
        id: "safeguarding-compliance",
        name: "Safeguarding and compliance",
        problem:
          "Concerns are hard to raise safely, cases are tracked inconsistently, and policies are difficult to find when they matter most.",
        build: [
          "Anonymous and confidential reporting",
          "Case categorization and routing",
          "Policy search assistant",
          "Escalation with controlled access",
          "Risk-oversight reporting",
        ],
        outcome: "Designed to make concerns easier to raise and every case routed and recorded responsibly.",
      },
      {
        id: "community-participation",
        name: "Community and participation programmes",
        problem:
          "Programmes struggle to see who they reach, whether inclusion goals are met and where delivery needs help.",
        build: [
          "Participation tracking",
          "Reach and inclusion monitoring",
          "Delivery visibility by site",
          "Outcome tracking",
        ],
        outcome: "Designed to show who programmes reach and where additional support is needed.",
      },
      {
        id: "programme-grant-impact",
        name: "Programme and grant impact",
        problem:
          "Evidence for funders is gathered by hand from many sources, so outcomes are hard to measure and programmes hard to compare.",
        build: [
          "Evidence-collection workflows",
          "Outcome-measurement frameworks",
          "Funder-ready reporting",
          "Cross-programme comparison",
        ],
        outcome: "Designed to connect activity to outcomes and make funder reporting far less manual.",
      },
      {
        id: "organizational-intelligence",
        name: "Organizational and programme intelligence",
        problem:
          "Information is spread across spreadsheets and messaging tools, reports are rebuilt every month, and leaders lack a clear view.",
        build: [
          "Connected organizational data",
          "Automated recurring reports",
          "Leadership summaries",
          "Alerts for decisions that need attention",
        ],
        outcome: "Designed to give leadership a timely view and surface the decisions that need attention.",
      },
    ],
  },
];
