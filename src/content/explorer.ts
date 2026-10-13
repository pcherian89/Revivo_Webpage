/**
 * DOMAIN EXPLORER CONTENT — the single source for the four solution areas and
 * their sixteen capabilities. The signal map, the HTML index, the detail panels
 * and the search-engine data all read from this file, so labels stay consistent.
 *
 * These are illustrative capabilities Revivo can configure and build — never
 * describe them as finished products, and never claim an AI function or
 * integration already exists. People stay responsible for approvals and decisions.
 *
 * Related Revivo products are linked to capabilities in `src/content/products.ts`,
 * not here, so unannounced products never reach the page.
 */

export type Capability = {
  id: string;
  name: string;
  /** One line shown under the name in the explorer */
  short: string;
  /** A recognisable real-world problem */
  problem: string;
  /** The proposed system and its practical features, in plain English (workflows + automation) */
  build: string;
  /** Two or three specific, realistic examples of AI assistance */
  ai: readonly string[];
  /** The practical improvement — never a promised result */
  benefit: string;
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
    "Revivo combines easy-to-use workflows, automation that removes repetitive tasks and AI that helps people decide. Activate the layer, choose an area, then a capability to see what Revivo could build.",
  layer: {
    name: "Revivo Intelligence Layer",
    detail: "Workflows · automation · AI assistance",
    activate: "Tap to activate",
    chooseZone: "Choose an area",
    chooseCap: "Choose a capability",
  },
  qualifier:
    "Illustrative possibilities. Every Revivo system is designed around the client’s workflows, users, data and objectives.",
  panelLabels: {
    problem: "The problem",
    build: "What Revivo can build",
    ai: "How AI helps",
    aiNote: "AI prepares and suggests. Your team reviews, approves and decides.",
    benefit: "The benefit",
    cta: "Discuss this challenge",
  },
} as const;

export const zones: readonly Zone[] = [
  {
    id: "events-operations",
    name: "Events & Operations",
    summary: "Plan events, organise teams and manage everyday sports operations.",
    capabilities: [
      {
        id: "event-planning-coordination",
        name: "Event Planning & Coordination",
        short: "Manage event plans, tasks, committees, deadlines and progress in one place.",
        problem:
          "Event plans live in spreadsheets, email threads and group chats, so committees lose track of who owns each task and deadlines slip without anyone noticing.",
        build:
          "An event workspace to build plans from templates, assign tasks to committees and people, set deadlines and follow progress on one timeline. Automatic reminders chase overdue tasks.",
        ai: [
          "Turn meeting notes into action items with suggested owners and dates.",
          "Draft a starting plan based on past events of a similar size.",
          "Prepare a weekly progress summary that highlights risks to the timeline.",
        ],
        benefit:
          "Organisers can see what is done, what is late and who is responsible, without chasing updates through chats and spreadsheets.",
      },
      {
        id: "venue-facility-management",
        name: "Venue & Facility Management",
        short: "Organise bookings, maintenance, equipment and facility schedules.",
        problem:
          "Bookings, maintenance requests and equipment checks are handled by phone, paper and separate calendars, leading to double bookings, missed repairs and unused space.",
        build:
          "A facility system with a shared booking calendar, a simple maintenance request form, an equipment register with condition history and inspection checklists. Booking confirmations and servicing reminders go out automatically.",
        ai: [
          "Sort incoming maintenance requests by urgency for the facility manager to confirm.",
          "Spot booking patterns, such as regularly unused slots or peak-time clashes.",
          "Suggest inspection and servicing schedules based on how spaces and equipment are used.",
        ],
        benefit:
          "Managers can share space fairly, deal with urgent repairs first and know the condition of every key asset.",
      },
      {
        id: "registration-administration",
        name: "Registration & Administration",
        short: "Manage registrations, documents, eligibility checks and approvals.",
        problem:
          "Registrations arrive through forms, emails and paper, and staff spend hours checking documents, confirming eligibility and chasing missing information.",
        build:
          "Online registration with clear forms, document upload, eligibility rules, an approval workflow and a live status for every application. Applicants receive automatic updates and reminders about anything missing.",
        ai: [
          "Read uploaded documents and pre-fill key details for staff to confirm.",
          "Flag incomplete or inconsistent applications before they reach a reviewer.",
          "Answer common applicant questions using the organisation’s own rules.",
        ],
        benefit:
          "Staff spend less time on data entry and follow-up, and applicants always know where their registration stands.",
      },
      {
        id: "staff-volunteer-management",
        name: "Staff & Volunteer Management",
        short: "Assign responsibilities, manage shifts and track attendance.",
        problem:
          "Staff and volunteer details, availability and shifts sit in separate lists and chat groups, so gaps and no-shows often appear only on the day.",
        build:
          "A system to register people, record skills and accreditations, assign roles, publish shift rosters and check attendance on the day. Shift confirmations and reminders are sent automatically.",
        ai: [
          "Suggest shift assignments that match skills, availability and fair workloads.",
          "Highlight shifts at risk of being understaffed so coordinators can act early.",
          "Draft role briefings for each shift from the event plan.",
        ],
        benefit:
          "Coordinators can see who is confirmed, qualified and present for every shift, with fewer calls and messages.",
      },
    ],
  },
  {
    id: "growth-engagement",
    name: "Growth & Engagement",
    summary: "Promote events, engage audiences and manage commercial activities.",
    capabilities: [
      {
        id: "social-media-campaigns",
        name: "Social Media & Campaign Management",
        short: "Plan campaigns, coordinate posts, manage approvals and track results.",
        problem:
          "Campaign plans, content approvals and performance reports are spread across spreadsheets, messaging apps and social media accounts.",
        build:
          "A platform to plan campaigns, manage content calendars, assign responsibilities, approve posts and view performance across connected accounts.",
        ai: [
          "Draft campaign plans and post ideas for your team to edit.",
          "Suggest improvements to captions and content before approval.",
          "Identify engagement patterns and prepare performance summaries for review.",
        ],
        benefit:
          "Teams can coordinate campaigns more easily, reduce repetitive work and understand what is performing well.",
      },
      {
        id: "sponsorship-management",
        name: "Sponsorship Management",
        short: "Manage sponsor opportunities, commitments, activations and reports.",
        problem:
          "Sponsor prospects, contract commitments and proof of delivery are kept in different files, so proposals take too long and showing sponsors their value is difficult.",
        build:
          "A sponsorship workspace to track prospects and proposals, record what each contract promises, schedule activations and store photos, figures and other evidence against each commitment. Renewal dates trigger reminders.",
        ai: [
          "Draft tailored proposals from your available inventory and a prospect’s interests.",
          "Check delivered activations against contract commitments and flag gaps.",
          "Prepare sponsor reports from the collected evidence for your team to review.",
        ],
        benefit:
          "Teams can deliver what was promised, report it clearly and go into renewal conversations with evidence ready.",
      },
      {
        id: "fan-engagement-ticketing",
        name: "Fan Engagement & Ticketing",
        short: "Understand audiences, manage engagement campaigns and analyse attendance.",
        problem:
          "Ticket sales, fan contacts and campaign results are held in separate systems, so messages go to everyone and attendance is hard to predict.",
        build:
          "A connected view of ticket sales and fan contacts, with audience groups, email and messaging campaigns, and attendance reports for every fixture or event. Reminders and follow-ups can run automatically.",
        ai: [
          "Group fans by behaviour, such as first-time buyers or lapsed season-ticket holders.",
          "Forecast likely attendance from past sales, fixtures and timing.",
          "Suggest which audiences to target and draft messages for review.",
        ],
        benefit:
          "Teams can send more relevant messages, plan promotion and staffing with better information and see what drives attendance.",
      },
      {
        id: "membership-customer-management",
        name: "Membership & Customer Management",
        short: "Track enquiries, memberships, renewals and customer engagement.",
        problem:
          "Enquiries and trial members are followed up inconsistently, renewal dates are missed and it is hard to tell which members are losing interest.",
        build:
          "A membership system to record enquiries, follow each lead through to sign-up, manage memberships and renewals, and keep a history of every conversation. Follow-up tasks and renewal reminders are created automatically.",
        ai: [
          "Highlight members whose attendance or engagement is dropping, for staff to contact.",
          "Suggest the next follow-up step for each enquiry or trial member.",
          "Draft personalised welcome and renewal messages for staff to send.",
        ],
        benefit:
          "Fewer enquiries slip through, renewals are handled on time and staff can reach members before they leave.",
      },
    ],
  },
  {
    id: "athletes-performance",
    name: "Athletes & Performance",
    summary: "Support athlete development, training, performance and future opportunities.",
    capabilities: [
      {
        id: "athlete-management-development",
        name: "Athlete Management & Development",
        short: "Maintain athlete profiles, assessments, development plans and progress records.",
        problem:
          "Athlete information is scattered across notebooks, spreadsheets and messages, so development is hard to follow across seasons or when an athlete changes coach or squad.",
        build:
          "One profile per athlete holding assessments, goals, development plans, coach notes and progress records, with controls over who can see what. Review dates and missing assessments prompt reminders.",
        ai: [
          "Summarise an athlete’s progress across assessments and coach notes.",
          "Draft development goals from assessment results for the coach to adjust.",
          "Compare results with the athlete’s own earlier records and highlight changes.",
        ],
        benefit:
          "Coaches and staff share a clear, long-term picture of each athlete, while coaches make every development decision.",
      },
      {
        id: "training-performance-monitoring",
        name: "Training & Performance Monitoring",
        short: "Plan training, track workloads and review performance over time.",
        problem:
          "Training plans, session records and results are kept in different apps and notebooks, so coaches struggle to see whether training is going to plan.",
        build:
          "A tool to plan training cycles and sessions, log completed sessions and workloads, record test and match results, and view trends across weeks and seasons. Athletes get session reminders and quick logging forms.",
        ai: [
          "Highlight where completed training differs from the plan, for the coach to review.",
          "Summarise weekly training load and performance trends in plain language.",
          "Suggest session adjustments within limits the coach sets.",
        ],
        benefit:
          "Coaches spend less time collating records and more time coaching, with a clearer picture behind each training decision.",
      },
      {
        id: "video-analysis-scouting",
        name: "Video Analysis & Scouting",
        short: "Organise match footage, review performances and support recruitment decisions.",
        problem:
          "Match footage, scouting reports and player data live in different places, so clips take too long to find and shortlisted players are hard to compare.",
        build:
          "A video library with structured tagging, clip collections for players and opponents, standard scouting report templates and shortlists that bring reports, data and video together.",
        ai: [
          "Make footage searchable through tags and transcribed commentary.",
          "Summarise several scouting reports on a player into one overview.",
          "Compare shortlisted players on the criteria your staff agree.",
        ],
        benefit:
          "Analysts and scouts can find the right footage faster, and recruitment decisions rest on consistent, well-organised evidence.",
        note: "Automated player tracking from video (computer vision) is scoped as a pilot or R&D engagement.",
      },
      {
        id: "athlete-career-welfare",
        name: "Athlete Career & Welfare",
        short: "Manage career opportunities, scholarships and athlete support processes.",
        problem:
          "Athletes miss scholarships and career openings because information is scattered, and welfare support requests are handled informally with little follow-up.",
        build:
          "A portal where athletes keep a verified sports CV, find and apply for scholarships and opportunities, and request support, while staff follow each application and welfare case through clear, confidential steps.",
        ai: [
          "Match athletes with scholarships and opportunities that fit their profile.",
          "Help athletes draft CVs and application statements for staff to check.",
          "Point athletes to the right support using the organisation’s own guidance.",
        ],
        benefit:
          "Athletes can see more suitable opportunities, and staff can make sure every support request is followed up.",
      },
    ],
  },
  {
    id: "management-reporting",
    name: "Management & Reporting",
    summary: "Track programmes, bring information together and make informed decisions.",
    capabilities: [
      {
        id: "dashboards-reporting",
        name: "Dashboards & Reporting",
        short: "View progress, deadlines, performance and important updates in one place.",
        problem:
          "Information sits across spreadsheets, systems and messages, so reports are rebuilt by hand every month and leaders rarely have a current view.",
        build:
          "Dashboards that bring data from your existing tools together, show progress, deadlines and key figures for each team, and produce recurring reports automatically on a set schedule.",
        ai: [
          "Write plain-language summaries of what has changed since the last report.",
          "Answer questions about your data, such as “Which programmes are behind schedule?”",
          "Highlight unusual figures or approaching deadlines that need attention.",
        ],
        benefit:
          "Leaders get an up-to-date view without waiting for manual reports, and teams spend less time compiling spreadsheets.",
      },
      {
        id: "sports-programme-management",
        name: "Sports Programme Management",
        short: "Track initiatives, participation, activities, milestones and outcomes.",
        problem:
          "Programmes run across many sites, coaches and partners that report in different formats, so it is hard to know who is taking part and what is on track.",
        build:
          "A programme system to plan initiatives and milestones, record sessions and attendance at each site, track who takes part and follow progress. Coaches log sessions from their phones, and missing records trigger reminders.",
        ai: [
          "Turn session notes and coach feedback into a short programme update.",
          "Highlight sites where participation or delivery is falling behind.",
          "Spot gaps in reach, such as age groups or areas with low take-up.",
        ],
        benefit:
          "Programme managers can see who they reach and where help is needed, without collecting updates by hand.",
      },
      {
        id: "funding-impact-reporting",
        name: "Funding & Impact Reporting",
        short: "Monitor grants, spending, deliverables and programme results.",
        problem:
          "Grant conditions, budgets, deliverables and evidence for funders are tracked separately, so reporting is slow and spending is hard to link to results.",
        build:
          "A funding tracker for applications, grant conditions, budgets and spending, deliverables and reporting deadlines, with evidence such as photos, attendance and participant stories stored against each grant.",
        ai: [
          "Draft funder reports from programme data and collected evidence.",
          "Check spending and deliverables against grant conditions and flag gaps.",
          "Help prepare new applications from earlier proposals and results.",
        ],
        benefit:
          "Teams can meet reporting deadlines with less effort and show funders clearly how money was used and what it achieved.",
      },
      {
        id: "governance-compliance",
        name: "Governance & Compliance",
        short: "Organise policies, compliance checks, safeguarding and reporting responsibilities.",
        problem:
          "Policies are hard to find, compliance tasks depend on memory and safeguarding concerns are recorded inconsistently, leaving gaps when it matters most.",
        build:
          "A governance hub with a searchable policy library, compliance calendars and checklists, confidential concern reporting and case records with controlled access. Due dates for checks and training trigger reminders.",
        ai: [
          "Answer policy questions in plain language, with a link to the source document.",
          "Draft compliance checklists from your policies for review.",
          "Suggest categories for incoming reports so the designated officer can prioritise.",
        ],
        benefit:
          "People can find the right policy quickly, responsibilities are not forgotten and every concern reaches the right person.",
      },
    ],
  },
];

/** Every capability with its area, in display order (for indexes and search-engine data). */
export const allCapabilities = zones.flatMap((zone) =>
  zone.capabilities.map((capability) => ({ zone, capability })),
);
