import { Resend } from "resend";
import { contactSchema, toFieldErrors, type ContactResponse } from "@/lib/contact-schema";
import { enquirySubject, formatEnquiry } from "@/lib/format-enquiry";

const MAX_BODY_BYTES = 20_000;

function json(body: ContactResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, code: "bad_request" }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "bad_request" }, 400);
  }

  // Honeypot: pretend success so bots learn nothing, but send nothing.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return json({ ok: true }, 200);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, code: "invalid", fieldErrors: toFieldErrors(parsed.error) }, 422);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Not an error the visitor caused: the browser shows a direct-email fallback
    // with their answers preserved, so nothing is silently lost.
    console.warn(
      "[contact] Email delivery is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).",
    );
    return json({ ok: false, code: "not_configured" }, 503);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      replyTo: parsed.data.email,
      subject: enquirySubject(parsed.data),
      text: formatEnquiry(parsed.data),
    });
    if (error) {
      console.error("[contact] Resend rejected the message:", error.name);
      return json({ ok: false, code: "send_failed" }, 502);
    }
  } catch (err) {
    console.error("[contact] Sending failed:", err instanceof Error ? err.name : "unknown error");
    return json({ ok: false, code: "send_failed" }, 502);
  }

  return json({ ok: true }, 200);
}
