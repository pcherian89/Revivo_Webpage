"use client";

import { AlertCircle, ArrowRight, Check, ChevronDown, Copy, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode, type RefObject } from "react";
import { RevivoLogo } from "@/components/brand/RevivoLogo";
import { contactConfig } from "@/config/site";
import { enquiry, organizationTypes } from "@/content/enquiry";
import {
  contactSchema,
  toFieldErrors,
  type ContactField,
  type ContactInput,
  type ContactResponse,
} from "@/lib/contact-schema";
import { enquirySubject, formatEnquiry } from "@/lib/format-enquiry";
import { cn } from "@/lib/cn";

type Values = { [K in Exclude<ContactField, "consent">]-?: string } & { consent: boolean };
type Errors = Partial<Record<ContactField, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "fallback"; reason: "not_configured" | "failed" };

const EMPTY: Values = {
  fullName: "",
  organization: "",
  organizationType: "",
  challenge: "",
  currentProcess: "",
  email: "",
  phone: "",
  consent: false,
  website: "",
};

const LABELS: Record<Exclude<ContactField, "website">, string> = {
  fullName: "Your name",
  organization: "Organization",
  organizationType: "Type of organization",
  challenge: "What has gone quiet, or needs to work better?",
  currentProcess: "How is it handled today?",
  email: "Email",
  phone: "Phone or WhatsApp",
  consent: "Consent",
};

const ORDER: ContactField[] = [
  "fullName",
  "organization",
  "organizationType",
  "challenge",
  "currentProcess",
  "email",
  "phone",
  "consent",
];

/** The short, problem-led enquiry. Used on the homepage (scene 5) and /contact. */
export function EnquiryForm({ idPrefix = "enquiry" }: { idPrefix?: string }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const fid = (f: ContactField) => `${idPrefix}-${f}`;

  const focusLater = (ref: RefObject<HTMLElement | null>) =>
    requestAnimationFrame(() => ref.current?.focus());

  const onChange =
    (field: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      setValues((v) => ({ ...v, [field]: value }));
      if (errors[field] && contactSchema.shape[field].safeParse(value).success) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  const onBlur = (field: ContactField) => () => {
    const result = contactSchema.shape[field].safeParse(values[field]);
    setErrors((prev) => {
      const next = { ...prev };
      if (result.success) delete next[field];
      else next[field] = result.error.issues[0]?.message;
      return next;
    });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error));
      setShowSummary(true);
      focusLater(summaryRef);
      return;
    }

    setErrors({});
    setShowSummary(false);
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;
      if (data?.ok) {
        setStatus({ kind: "sent" });
        focusLater(sentRef);
        return;
      }
      if (data && !data.ok && data.code === "invalid" && data.fieldErrors) {
        setErrors(data.fieldErrors);
        setShowSummary(true);
        setStatus({ kind: "idle" });
        focusLater(summaryRef);
        return;
      }
      setStatus({
        kind: "fallback",
        reason: data && !data.ok && data.code === "not_configured" ? "not_configured" : "failed",
      });
    } catch {
      setStatus({ kind: "fallback", reason: "failed" });
    }
    focusLater(fallbackRef);
  }

  if (status.kind === "sent") {
    return (
      <div ref={sentRef} tabIndex={-1} role="status" className="py-4">
        <RevivoLogo variant="mark" title="" className="h-auto w-14" />
        <p className="text-subtitle mt-6 text-ink">Thank you. We have your challenge.</p>
        <p className="measure mt-3 text-muted">
          We’ll read it properly and reply to <span className="text-ink">{values.email}</span>—usually with a
          few questions about how the work happens today.
        </p>
      </div>
    );
  }

  const errorList = ORDER.filter((f) => errors[f]);
  const sending = status.kind === "sending";
  const field = { values, errors, onChange, onBlur, fid };

  return (
    <form noValidate onSubmit={onSubmit} className="relative">
      {showSummary && errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby={`${idPrefix}-summary`}
          className="mb-10 border-l-2 border-amber pl-4"
        >
          <p id={`${idPrefix}-summary`} className="flex items-center gap-2 font-medium text-ink">
            <AlertCircle aria-hidden="true" className="size-4 text-amber" />
            Please check {errorList.length === 1 ? "1 field" : `${errorList.length} fields`}
          </p>
          <ul className="text-small mt-2 space-y-1">
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#${fid(f)}`} className="text-muted underline underline-offset-4 hover:text-ink">
                  {f === "website" ? "" : LABELS[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot — hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={fid("website")}>Leave this field empty</label>
        <input
          id={fid("website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={onChange("website")}
        />
      </div>

      <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
        <Field {...field} name="fullName" autoComplete="name" />
        <Field {...field} name="organization" autoComplete="organization" />
        <SelectField {...field} name="organizationType" className="md:col-span-2" />
        <Field
          {...field}
          name="challenge"
          multiline
          rows={4}
          className="md:col-span-2"
          hint={enquiry.privacyNote}
        />
        <Field {...field} name="currentProcess" multiline rows={3} className="md:col-span-2" />
        <Field {...field} name="email" type="email" autoComplete="email" inputMode="email" />
        <Field {...field} name="phone" type="tel" autoComplete="tel" inputMode="tel" optional />
      </div>

      <div className="mt-8">
        <label
          htmlFor={fid("consent")}
          className="text-small flex cursor-pointer items-start gap-3 text-muted"
        >
          <input
            id={fid("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={onChange("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${fid("consent")}-error` : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[#ccff00]"
          />
          <span>
            Revivo may use these details to reply to me, as described in the{" "}
            <Link href="/privacy" className="text-ink underline underline-offset-4 hover:text-lime">
              privacy policy
            </Link>
            .
          </span>
        </label>
        <FieldError id={`${fid("consent")}-error`} message={errors.consent} />
      </div>

      {status.kind === "fallback" && (
        <Fallback reason={status.reason} values={values} containerRef={fallbackRef} />
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-lime px-7 text-base font-semibold text-canvas transition-colors duration-200 hover:bg-ink disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? (
            <Loader2 aria-hidden="true" className="size-5 animate-spin motion-reduce:animate-none" />
          ) : (
            <RevivoLogo variant="mark" title="" markColor="#0A0B0A" className="h-auto w-8" />
          )}
          {sending ? "Sending…" : enquiry.submit}
        </button>
        <p className="text-small text-subtle" aria-live="polite">
          {sending ? "Sending your challenge…" : "A person reads every message."}
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------------ */

type FieldBase = {
  values: Values;
  errors: Errors;
  onChange: (
    f: keyof Values,
  ) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (f: ContactField) => () => void;
  fid: (f: ContactField) => string;
  className?: string;
  hint?: string;
  optional?: boolean;
};

type TextName = "fullName" | "organization" | "challenge" | "currentProcess" | "email" | "phone";

const control =
  "w-full border-0 border-b bg-transparent px-0 text-base text-ink placeholder:text-subtle transition-colors duration-200 focus:border-lime focus:outline-none focus-visible:outline-none";

function Label({ htmlFor, name, optional }: { htmlFor: string; name: ContactField; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-small block font-medium text-muted">
      {name === "website" ? "" : LABELS[name]}
      {optional && <span className="ml-2 font-normal text-subtle">optional</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-small mt-2 flex items-start gap-2 text-amber">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

function describedBy(...ids: Array<string | false | undefined>) {
  return ids.filter(Boolean).join(" ") || undefined;
}

function Field({
  name,
  values,
  errors,
  onChange,
  onBlur,
  fid,
  className,
  hint,
  optional,
  multiline,
  rows = 3,
  type = "text",
  autoComplete,
  inputMode,
}: FieldBase & {
  name: TextName;
  multiline?: boolean;
  rows?: number;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel";
}) {
  const id = fid(name);
  const error = errors[name];
  const common = {
    id,
    name,
    value: values[name],
    onChange: onChange(name),
    onBlur: onBlur(name),
    required: !optional,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(hint && `${id}-hint`, error && `${id}-error`),
    className: cn(control, error ? "border-amber" : "border-line-strong"),
  };
  return (
    <div className={className}>
      <Label htmlFor={id} name={name} optional={optional} />
      {multiline ? (
        <textarea
          {...common}
          rows={rows}
          className={cn(common.className, "mt-2 resize-y py-2 leading-relaxed")}
        />
      ) : (
        <input
          {...common}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={cn(common.className, "mt-1 min-h-11 py-2")}
        />
      )}
      {hint && (
        <p id={`${id}-hint`} className="text-small mt-2 text-subtle">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function SelectField({
  name,
  values,
  errors,
  onChange,
  onBlur,
  fid,
  className,
}: FieldBase & { name: "organizationType" }) {
  const id = fid(name);
  const error = errors[name];
  return (
    <div className={className}>
      <Label htmlFor={id} name={name} />
      <div className="relative mt-1">
        <select
          id={id}
          name={name}
          value={values[name]}
          onChange={onChange(name)}
          onBlur={onBlur(name)}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            control,
            "min-h-11 appearance-none py-2 pr-8",
            values[name] ? "" : "text-subtle",
            error ? "border-amber" : "border-line-strong",
          )}
        >
          <option value="">Choose the closest…</option>
          {organizationTypes.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-subtle"
        />
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function Fallback({
  reason,
  values,
  containerRef,
}: {
  reason: "not_configured" | "failed";
  values: Values;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [copied, setCopied] = useState(false);
  const data = values as unknown as ContactInput;
  const text = formatEnquiry(data);
  const subject = enquirySubject(data);
  const body =
    text.length > 1800 ? `${text.slice(0, 1800)}\n\n[Shortened — full text copied separately]` : text;
  const mailto = contactConfig.email
    ? `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${text}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div ref={containerRef} tabIndex={-1} role="alert" className="mt-10 border-l-2 border-amber pl-4">
      <p className="flex items-center gap-2 font-medium text-ink">
        <AlertCircle aria-hidden="true" className="size-4 text-amber" />
        {reason === "not_configured"
          ? "Online sending isn’t switched on yet—your answers are safe."
          : "We couldn’t send that—your answers are safe."}
      </p>
      <p className="text-small mt-2 max-w-xl text-muted">
        {contactConfig.email ? (
          <>
            Email them to{" "}
            <a href={`mailto:${contactConfig.email}`} className="text-ink underline underline-offset-4">
              {contactConfig.email}
            </a>{" "}
            —the button below fills everything in for you.
          </>
        ) : (
          <>Copy your answers and keep them; our direct email address will be published here shortly.</>
        )}
      </p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {mailto && (
          <ActionLink href={mailto} icon={<Mail aria-hidden="true" className="size-4" />}>
            Email your challenge
          </ActionLink>
        )}
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 items-center gap-2 font-medium text-ink hover:text-lime"
        >
          {copied ? (
            <Check aria-hidden="true" className="size-4 text-lime" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
          {copied ? "Copied" : "Copy your answers"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? "Your answers were copied to the clipboard." : ""}
      </p>
    </div>
  );
}

function ActionLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <a href={href} className="inline-flex min-h-11 items-center gap-2 font-medium text-ink hover:text-lime">
      {icon}
      {children}
      <ArrowRight aria-hidden="true" className="size-4" />
    </a>
  );
}
