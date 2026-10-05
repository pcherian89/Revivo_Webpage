import { z } from "zod";
import { budgets, nextSteps, organizationTypes, timelines } from "@/content/contact";

/**
 * One schema validates the enquiry in the browser (instant feedback)
 * and again on the server (the real safeguard).
 */
export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120, "Please shorten your name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .max(200, "Please shorten your email address.")
    .pipe(z.email("Please enter a valid email address, e.g. name@organization.com.")),
  phone: z
    .string()
    .trim()
    .max(40, "Please shorten the phone number.")
    .regex(/^[+()\d\s.-]*$/, "Use digits, spaces and + ( ) - only."),
  organization: z.string().trim().min(2, "Please enter your organization’s name.").max(160),
  organizationType: z.enum(organizationTypes, { error: "Please choose the closest organization type." }),
  country: z.string().trim().min(2, "Please enter your country.").max(80),
  problem: z
    .string()
    .trim()
    .min(20, "Please describe the process or decision in a sentence or two (at least 20 characters).")
    .max(3000, "Please keep this under 3,000 characters."),
  currentProcess: z
    .string()
    .trim()
    .min(10, "Please tell us briefly how it is handled today (at least 10 characters).")
    .max(2000, "Please keep this under 2,000 characters."),
  users: z
    .string()
    .trim()
    .min(3, "Please tell us who would use the solution.")
    .max(1000, "Please keep this under 1,000 characters."),
  outcome: z
    .string()
    .trim()
    .min(10, "Please describe the outcome you want (at least 10 characters).")
    .max(2000, "Please keep this under 2,000 characters."),
  timeline: z.enum(timelines, { error: "Please choose an approximate timeline." }),
  budget: z.union([z.enum(budgets), z.literal("")]),
  nextStep: z.enum(nextSteps, { error: "Please choose a preferred next step." }),
  consent: z.literal(true, { error: "Please confirm so we can use these details to respond." }),
  /** Honeypot — hidden from people, often filled by bots. Must stay empty. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactResponse =
  | { ok: true }
  | {
      ok: false;
      code: "invalid" | "not_configured" | "send_failed" | "bad_request";
      fieldErrors?: Partial<Record<ContactField, string>>;
    };

/** First error message per field, for display next to each input. */
export function toFieldErrors(error: z.ZodError): Partial<Record<ContactField, string>> {
  const out: Partial<Record<ContactField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
