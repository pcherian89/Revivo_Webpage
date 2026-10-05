import type { ContactInput } from "./contact-schema";

/** Plain-text version of an enquiry — used for the email and the fallback. */
export function formatEnquiry(d: ContactInput) {
  return [
    `Name: ${d.fullName}`,
    `Work email: ${d.email}`,
    `Phone: ${d.phone || "—"}`,
    `Organization: ${d.organization}`,
    `Organization type: ${d.organizationType}`,
    `Country: ${d.country}`,
    "",
    "What process or decision is not working?",
    d.problem,
    "",
    "How is it managed today?",
    d.currentProcess,
    "",
    "Who would use the solution?",
    d.users,
    "",
    "What outcome are you trying to achieve?",
    d.outcome,
    "",
    `Approximate timeline: ${d.timeline}`,
    `Approximate budget: ${d.budget || "—"}`,
    `Preferred next step: ${d.nextStep}`,
  ].join("\n");
}

export function enquirySubject(d: Pick<ContactInput, "organization" | "nextStep">) {
  return `Revivo enquiry — ${d.organization || "New organization"} (${d.nextStep || "General enquiry"})`;
}
