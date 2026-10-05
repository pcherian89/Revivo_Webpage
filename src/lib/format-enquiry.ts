import type { ContactInput } from "./contact-schema";

/** Plain-text version of an enquiry — used for the email and the fallback. */
export function formatEnquiry(d: ContactInput) {
  return [
    `Name: ${d.fullName}`,
    `Organization: ${d.organization} (${d.organizationType})`,
    `Email: ${d.email}`,
    `Phone / WhatsApp: ${d.phone || "—"}`,
    "",
    "The challenge:",
    d.challenge,
    "",
    "How it is handled today:",
    d.currentProcess,
  ].join("\n");
}

export function enquirySubject(d: Pick<ContactInput, "organization">) {
  return `Revivo enquiry — ${d.organization || "New organization"}`;
}
