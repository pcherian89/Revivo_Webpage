import { z } from "zod";
import { organizationTypes } from "@/content/enquiry";

/**
 * One schema validates the enquiry in the browser (instant feedback)
 * and again on the server (the real safeguard).
 */
export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name.").max(120, "Please shorten your name."),
  organization: z.string().trim().min(2, "Please enter your organization’s name.").max(160),
  organizationType: z.enum(organizationTypes, { error: "Please choose the closest option." }),
  challenge: z
    .string()
    .trim()
    .min(15, "Please describe the challenge in a sentence or two.")
    .max(2000, "Please keep this under 2,000 characters."),
  currentProcess: z
    .string()
    .trim()
    .min(5, "Please tell us briefly how it is handled today.")
    .max(1500, "Please keep this under 1,500 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(200)
    .pipe(z.email("Please enter a valid email, e.g. name@organization.com.")),
  phone: z
    .string()
    .trim()
    .max(40, "Please shorten the number.")
    .regex(/^[+()\d\s.-]*$/, "Use digits, spaces and + ( ) - only."),
  consent: z.literal(true, { error: "Please confirm so we can reply to you." }),
  /** Honeypot — hidden from people, often filled by bots. Must stay empty. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
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
