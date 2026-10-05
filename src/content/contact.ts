/** Contact page copy and form options. */

export const contactPage = {
  label: "Tell us the problem",
  headline: ["Discuss a sports problem", "with us."],
  intro:
    "You do not need to arrive with a technical specification. Tell us what is not working, how it is handled today and what a better outcome would look like.",
  expectations: [
    {
      title: "We read every enquiry",
      body: "A person at Revivo reviews what you send—no automated sales sequence.",
    },
    {
      title: "We reply with questions first",
      body: "Usually to understand the workflow, users and data before suggesting anything.",
    },
    { title: "We may suggest something simpler", body: "If AI is not the right answer, we will say so." },
  ],
  privacyNote:
    "Please do not include sensitive personal, medical or athlete-identifying information in this form.",
} as const;

export const organizationTypes = [
  "Gym or fitness business",
  "Sports academy",
  "Team or club",
  "League or tournament",
  "Event or venue",
  "Federation or governing body",
  "Government sports program",
  "Sports foundation",
  "Commercial or sponsorship organization",
  "Other",
] as const;

export const timelines = [
  "As soon as possible",
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Exploring for now",
] as const;

export const budgets = [
  "Not sure yet",
  "Under US$5,000 (or equivalent)",
  "US$5,000–15,000 (or equivalent)",
  "US$15,000–50,000 (or equivalent)",
  "Over US$50,000 (or equivalent)",
  "Prefer to discuss",
] as const;

export const nextSteps = [
  "Discovery conversation",
  "Prototype discussion",
  "Pilot partnership",
  "General enquiry",
] as const;
