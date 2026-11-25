/**
 * DOMAIN EXPLORER CONTENT — the single source for the four solution areas and
 * their twelve capabilities (3 per area; owner decision, Nov 2026, written in plain everyday English). The signal map, the HTML index, the detail panels
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
  /** Who it is for, shown in the panel as "For: …" (≤8 words) */
  audience: string;
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
    "Revivo builds simple tools, automation that saves time and AI that helps people decide. Tap the layer, choose an area, then choose a capability to see what Revivo could build for you.",
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
    cta: "Discuss this with us",
  },
} as const;

export const zones: readonly Zone[] = [
  {
    id: "athletes-performance",
    name: "Athletes & Performance",
    summary: "Find young talent, support training and help athletes plan their future.",
    capabilities: [
      {
        id: "talent-identification-development",
        name: "Talent Identification & Development",
        short: "Run talent programmes with family consent, from the first test to long-term development.",
        audience: "Federations, academies, schools and clubs",
        problem:
          "Talented young people are missed because each school, club and region tests differently. Results sit in spreadsheets, and families rarely hear what happens next or why.",
        build:
          "Set up a programme for any sport and age group. No test starts without recorded consent. Coaches enter agreed test results on a phone, compared with others the same age. Staff review referrals, plan development, retest later and update families through their own page.",
        ai: [
          "Flag missing, repeated or unusual results for a second person to check.",
          "Write simple result summaries for families, in their language, for staff to approve.",
          "Suggest sports to try from a young person’s results, with reasons, for coaches to consider.",
        ],
        benefit:
          "Young people are tested the same way wherever they live. Families understand each step, and staff make every selection and referral decision.",
        note: "Tests and selection rules are set by the client’s experts. Results show current performance, not future potential.",
      },
      {
        id: "training-performance-monitoring",
        name: "Training, Video & Scouting",
        short: "Plan training, log sessions, organise match video and compare players for recruitment.",
        audience: "Clubs, academies, gyms and national teams",
        problem:
          "Training plans, session logs, match video and scouting reports sit in different apps and notebooks. Coaches cannot easily see if training is on track, and finding clips takes too long.",
        build:
          "Coaches plan training and record each session and workload. Athletes get reminders and log sessions quickly. Analysts keep match video in one library, with tags and clip lists. Scouts use one report form, and shortlists bring reports, results and video together.",
        ai: [
          "Show where completed training differs from the plan, for the coach to review.",
          "Make match video searchable by tags and spoken commentary.",
          "Combine several scouting reports on a player into one short summary for staff.",
        ],
        benefit:
          "Coaches and scouts spend less time searching through files. Each training and recruitment decision rests on clear, well-organised records, and staff still decide.",
        note: "Automated player tracking from video (computer vision) is scoped as a pilot or R&D engagement.",
      },
      {
        id: "athlete-career-welfare",
        name: "Athlete Support & Careers",
        short: "Help athletes find opportunities, build a sports CV and ask for support.",
        audience: "Federations, universities, clubs and athlete associations",
        problem:
          "Athletes miss jobs, study places and other openings because information is scattered. Requests for personal support are handled informally, and often nobody follows up.",
        build:
          "A personal page where athletes keep a sports CV checked by staff, find jobs, courses and other openings, and ask for support. Staff follow each application and support request through clear, private steps, with reminders for each next step.",
        ai: [
          "Suggest jobs, courses and openings that match an athlete’s profile.",
          "Help athletes draft CVs and application letters for staff to check.",
          "Point athletes to the right help using the organisation’s own guidance.",
        ],
        benefit:
          "Athletes see more openings that suit them, and staff can follow every support request through to the end.",
      },
    ],
  },
  {
    id: "growth-engagement",
    name: "Growth & Engagement",
    summary: "Reach fans, work with sponsors and stay close to members.",
    capabilities: [
      {
        id: "fan-engagement-ticketing",
        name: "Fans, Media & Campaigns",
        short: "Plan campaigns, approve posts, reach the right fans and understand ticket sales.",
        audience: "Clubs, leagues, events, venues and media teams",
        problem:
          "Campaign plans, post approvals, ticket sales and fan contacts sit in separate apps and chats. Messages go to everyone, and it is hard to see what brings people in.",
        build:
          "One place to plan campaigns, keep a content calendar, assign tasks and approve posts. Ticket sales and fan contacts sit together, so teams can group fans, send emails and messages, and see attendance for every match or event. Reminders go out automatically.",
        ai: [
          "Draft campaign ideas, posts and captions for your team to edit and approve.",
          "Group fans by behaviour, such as first-time buyers or fans who stopped coming.",
          "Estimate likely attendance from past sales, fixtures and timing.",
        ],
        benefit:
          "Teams spend less time chasing approvals, send messages that suit each group of fans and see more clearly what brings people in.",
      },
      {
        id: "sponsorship-management",
        name: "Sponsorship & Partnerships",
        short: "Track sponsor deals, deliver what each contract promises and report back clearly.",
        audience: "Clubs, leagues, events and sports businesses",
        problem:
          "Possible sponsors, contract promises and proof of delivery are kept in different files. Proposals take too long, and showing sponsors what they received is difficult.",
        build:
          "Track possible sponsors, partners and proposals in one place. Record what each contract promises, plan each sponsor activity, and store photos, figures and other proof against each promise. Reminders go out before renewal dates.",
        ai: [
          "Draft proposals that link what you offer to each sponsor’s interests.",
          "Check delivered activities against contract promises and flag anything missing.",
          "Prepare sponsor reports from the collected proof for your team to review.",
        ],
        benefit:
          "Teams can deliver what was promised, report it clearly and start renewal talks with proof ready.",
      },
      {
        id: "membership-customer-management",
        name: "Membership & Customers",
        short: "Follow up enquiries, manage memberships and renewals, and stay in touch with members.",
        audience: "Gyms, clubs, academies and sports centres",
        problem:
          "Staff follow up enquiries and trial members in different ways, or not at all. Renewal dates are missed, and it is hard to tell which members are losing interest.",
        build:
          "A membership system to record enquiries, follow each person from first contact to sign-up, manage memberships and renewals, and keep a history of every conversation. Follow-up tasks and renewal reminders are created automatically.",
        ai: [
          "Show members whose visits are dropping, so staff can get in touch.",
          "Suggest the next step for each enquiry or trial member.",
          "Draft personal welcome and renewal messages for staff to send.",
        ],
        benefit:
          "Staff can follow up every enquiry, handle renewals on time and contact members before they leave.",
      },
    ],
  },
  {
    id: "events-operations",
    name: "Events & Operations",
    summary: "Run events, register people and manage venues day to day.",
    capabilities: [
      {
        id: "event-planning-coordination",
        name: "Events, Staff & Volunteers",
        short: "Plan events, share out tasks, build shift rosters and see who turned up.",
        audience: "Event organisers, federations, leagues and community programmes",
        problem:
          "Event plans, staff lists and volunteer shifts live in spreadsheets and group chats. Nobody is sure who is responsible for each task, and gaps or no-shows appear only on the day.",
        build:
          "Build event plans from templates, give tasks and deadlines to committees and people, and follow progress on one timeline. Register staff and volunteers, record their skills and qualifications, publish shift rosters and check attendance on the day. Reminders go out automatically.",
        ai: [
          "Turn meeting notes into tasks, with suggested people and deadlines.",
          "Suggest shifts that match skills, availability and a fair share of work.",
          "Highlight late tasks and shifts that may be short of people.",
        ],
        benefit:
          "Organisers can see what is done, what is late and who is on each shift, without chasing updates through chats.",
      },
      {
        id: "registration-administration",
        name: "Registration & Eligibility",
        short: "Take registrations online, check documents and eligibility, and let staff approve each one.",
        audience: "Federations, leagues, tournaments and school competitions",
        problem:
          "Registrations arrive by form, email and paper. Staff spend hours checking documents, confirming who is eligible and chasing missing information.",
        build:
          "Online registration with clear forms, document upload and eligibility rules your organisation sets. Each application moves through set approval steps and shows a live status. Applicants get automatic updates and reminders about anything missing.",
        ai: [
          "Read uploaded documents and fill in key details for staff to confirm.",
          "Flag incomplete or mismatched applications before a reviewer sees them.",
          "Answer common applicant questions using the organisation’s own rules.",
        ],
        benefit:
          "Staff spend less time typing and chasing, and applicants can always see where their registration stands.",
      },
      {
        id: "venue-facility-management",
        name: "Venues & Facilities",
        short: "Manage bookings, repairs, equipment checks and facility schedules in one place.",
        audience: "Venues, sports centres, schools and local councils",
        problem:
          "Bookings, repair requests and equipment checks are handled by phone, paper and separate calendars. This leads to double bookings, missed repairs and unused space.",
        build:
          "A shared booking calendar, a simple form to report repairs, a list of equipment with its condition history, and inspection checklists. Booking confirmations and servicing reminders go out automatically.",
        ai: [
          "Sort repair requests by urgency for the facility manager to confirm.",
          "Spot booking patterns, such as slots that often go unused or peak-time clashes.",
          "Suggest inspection and servicing dates based on how spaces and equipment are used.",
        ],
        benefit:
          "Managers can share space fairly, deal with urgent repairs first and know the condition of key equipment.",
      },
    ],
  },
  {
    id: "management-reporting",
    name: "Funding & Governance",
    summary: "Manage funding and programmes, report clearly and keep good governance.",
    capabilities: [
      {
        id: "funding-impact-reporting",
        name: "Funding, Grants & Programmes",
        short: "Run grants and scholarships, follow programme delivery and report to funders.",
        audience: "Foundations, CSR teams, governments and community programmes",
        problem:
          "Grant rules, budgets, scholarships and programme records sit in separate files, and each site reports in its own way. Reporting is slow, and spending is hard to link to what was delivered.",
        build:
          "Open grant and scholarship rounds through a shared link. Staff review and decide on applications. Record budgets, payments and spending against each award. Coaches log sessions and attendance at each site, with photos and stories stored as evidence. Reminders come before report deadlines.",
        ai: [
          "Draft funder reports from programme records and evidence, for staff to check.",
          "Check spending and delivery against grant conditions and flag gaps.",
          "Show sites or groups where attendance is falling behind.",
        ],
        benefit:
          "Teams can meet report deadlines with less effort and show funders clearly how money was spent and what was delivered.",
      },
      {
        id: "dashboards-reporting",
        name: "Dashboards & Reporting",
        short: "See progress, deadlines and key numbers in one place, with regular reports.",
        audience: "Leagues, federations, sports businesses and government departments",
        problem:
          "Information sits across spreadsheets, systems and messages. Reports are rebuilt by hand every month, and leaders rarely see an up-to-date picture.",
        build:
          "Dashboards that bring data from your existing tools together and show progress, deadlines and key numbers for each team. The system produces regular reports automatically, on a schedule you set.",
        ai: [
          "Write plain-language summaries of what has changed since the last report.",
          "Answer questions about your data, such as “Which programmes are behind schedule?”",
          "Highlight unusual numbers or close deadlines that need attention.",
        ],
        benefit:
          "Leaders get an up-to-date view without waiting for reports, and teams spend less time building spreadsheets.",
      },
      {
        id: "governance-compliance",
        name: "Governance & Safeguarding",
        short: "Keep policies easy to find, track checks and handle safeguarding concerns with care.",
        audience: "Federations, clubs, schools and national sports bodies",
        problem:
          "Policies are hard to find, checks and training depend on memory, and safeguarding concerns are recorded in different ways. This leaves gaps when it matters most.",
        build:
          "A searchable policy library, a calendar and checklists for required checks, a private way to report a concern, and case records only the right people can open. Reminders go out before checks and training are due.",
        ai: [
          "Answer policy questions in plain language, with a link to the source document.",
          "Draft checklists from your policies for staff to review.",
          "Suggest a category for each new report, so the safeguarding lead can set priorities.",
        ],
        benefit:
          "People find the right policy quickly, reminders help keep checks on time, and each concern goes to the named person.",
      },
    ],
  },
];

/** Every capability with its area, in display order (for indexes and search-engine data). */
export const allCapabilities = zones.flatMap((zone) =>
  zone.capabilities.map((capability) => ({ zone, capability })),
);

/** Capability ids retired when 16 became 12 (Nov 2026) → the capability that replaced them. */
export const retiredCapabilityIds: Record<string, string> = {
  "video-analysis-scouting": "training-performance-monitoring",
  "social-media-campaigns": "fan-engagement-ticketing",
  "staff-volunteer-management": "event-planning-coordination",
  "sports-programme-management": "funding-impact-reporting",
};
