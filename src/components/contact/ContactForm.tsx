"use client";

import { AlertCircle, ArrowRight, Check, ChevronDown, Copy, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode, type RefObject } from "react";
import { contactConfig } from "@/config/site";
import { budgets, contactPage, nextSteps, organizationTypes, timelines } from "@/content/contact";
import {
  contactSchema,
  toFieldErrors,
  type ContactField,
  type ContactInput,
  type ContactResponse,
} from "@/lib/contact-schema";
import { enquirySubject, formatEnquiry } from "@/lib/format-enquiry";
import { cn } from "@/lib/cn";

type FormValues = {
  [K in Exclude<ContactField, "consent">]-?: string;
} & { consent: boolean };

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "fallback"; reason: "not_configured" | "send_failed" | "network" };

const EMPTY: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  organizationType: "",
  country: "",
  problem: "",
  currentProcess: "",
  users: "",
  outcome: "",
  timeline: "",
  budget: "",
  nextStep: "",
  consent: false,
  website: "",
};

const FIELD_ORDER: ContactField[] = [
  "fullName",
  "email",
  "phone",
  "organization",
  "organizationType",
  "country",
  "problem",
  "currentProcess",
  "users",
  "outcome",
  "timeline",
  "budget",
  "nextStep",
  "consent",
];

const LABELS: Record<Exclude<ContactField, "website">, string> = {
  fullName: "Full name",
  email: "Work email",
  phone: "Phone number",
  organization: "Organization name",
  organizationType: "Organization type",
  country: "Country",
  problem: "What process or decision is not working?",
  currentProcess: "How is it managed today?",
  users: "Who would use the solution?",
  outcome: "What outcome are you trying to achieve?",
  timeline: "Approximate timeline",
  budget: "Approximate budget",
  nextStep: "Preferred next step",
  consent: "Consent",
};

export function ContactForm({ defaultNextStep = "" }: { defaultNextStep?: string }) {
  const [values, setValues] = useState<FormValues>({ ...EMPTY, nextStep: defaultNextStep });
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const set =
    (field: keyof FormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      setValues((v) => ({ ...v, [field]: value }));
      // Clear an error as soon as the field becomes valid.
      if (errors[field]) {
        const result = contactSchema.shape[field].safeParse(value);
        if (result.success)
          setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
          });
      }
    };

  const validateField = (field: ContactField) => () => {
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
    if (status.kind === "submitting") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error));
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setShowSummary(false);
    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;

      if (data?.ok) {
        setStatus({ kind: "success" });
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (data && !data.ok && data.code === "invalid" && data.fieldErrors) {
        setErrors(data.fieldErrors);
        setShowSummary(true);
        setStatus({ kind: "idle" });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      setStatus({
        kind: "fallback",
        reason: data && !data.ok && data.code === "not_configured" ? "not_configured" : "send_failed",
      });
    } catch {
      setStatus({ kind: "fallback", reason: "network" });
    }
    requestAnimationFrame(() => fallbackRef.current?.focus());
  }

  if (status.kind === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className="border border-line bg-raised p-6 md:p-10" role="status">
        <p className="text-label flex items-center gap-3 text-lime">
          <Check aria-hidden="true" className="size-4" /> Enquiry sent
        </p>
        <h2 className="text-display-md mt-6">Thank you. We have your problem.</h2>
        <p className="measure mt-4 text-muted">
          We will review what you shared and reply to <span className="text-ink">{values.email}</span>,
          usually with a few questions about the workflow, users and data.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink hover:text-lime"
        >
          Back to the homepage <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((f) => errors[f]);
  const submitting = status.kind === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="form-required-note" className="space-y-14">
      <p id="form-required-note" className="text-sm text-muted">
        Fields marked <span className="text-ink">optional</span> can be left blank. Everything else is
        required.
      </p>

      {showSummary && errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-summary-title"
          className="border border-amber/60 bg-raised p-5"
        >
          <p id="error-summary-title" className="flex items-center gap-2 font-semibold text-ink">
            <AlertCircle aria-hidden="true" className="size-4 text-amber" />
            Please check {errorList.length === 1 ? "1 field" : `${errorList.length} fields`}
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#field-${f}`} className="text-muted underline underline-offset-4 hover:text-ink">
                  {f === "website" ? "" : LABELS[f]}: {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot — invisible to people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="field-website">Leave this field empty</label>
        <input
          id="field-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={set("website")}
        />
      </div>

      <FormGroup index="01" title="About you">
        <div className="grid gap-6 md:grid-cols-2">
          <TextInput
            field="fullName"
            autoComplete="name"
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
          <TextInput
            field="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
          <TextInput
            field="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            optional
            hint="Include your country code."
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
          <TextInput
            field="organization"
            autoComplete="organization"
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
          <SelectInput
            field="organizationType"
            options={organizationTypes}
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
          <TextInput
            field="country"
            autoComplete="country-name"
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
        </div>
      </FormGroup>

      <FormGroup index="02" title="The problem" note={contactPage.privacyNote}>
        <div className="grid gap-6">
          <TextArea
            field="problem"
            rows={5}
            hint="For example: a report that takes days to compile, or a decision made without the right information."
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
          <TextArea
            field="currentProcess"
            rows={4}
            hint="Spreadsheets, WhatsApp groups, paper, existing software—whatever is used today."
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
          <TextArea
            field="users"
            rows={3}
            hint="For example: coaches, front-desk staff, event managers, athletes, owners."
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
          <TextArea
            field="outcome"
            rows={4}
            hint="What would be different if this worked well?"
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
        </div>
      </FormGroup>

      <FormGroup index="03" title="Timing and next step">
        <div className="grid gap-6 md:grid-cols-2">
          <SelectInput
            field="timeline"
            options={timelines}
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
          <SelectInput
            field="budget"
            options={budgets}
            optional
            values={values}
            errors={errors}
            onChange={set}
            onBlur={validateField}
          />
        </div>

        <fieldset
          id="field-nextStep"
          className="mt-8"
          aria-describedby={errors.nextStep ? "error-nextStep" : undefined}
          aria-invalid={errors.nextStep ? true : undefined}
        >
          <legend className="mb-3 text-sm font-semibold text-ink">{LABELS.nextStep}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {nextSteps.map((opt) => {
              const checked = values.nextStep === opt;
              return (
                <label
                  key={opt}
                  className={cn(
                    "flex min-h-14 cursor-pointer items-center gap-3 border px-4 py-3 text-[0.95rem] transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lime",
                    checked
                      ? "border-lime bg-surface text-ink"
                      : "border-line-strong text-muted hover:border-ink hover:text-ink",
                  )}
                >
                  <input
                    type="radio"
                    name="nextStep"
                    value={opt}
                    checked={checked}
                    onChange={set("nextStep")}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center border",
                      checked ? "border-lime bg-lime" : "border-subtle",
                    )}
                  >
                    {checked && <span className="size-1.5 bg-canvas" />}
                  </span>
                  {opt}
                </label>
              );
            })}
          </div>
          <FieldError field="nextStep" errors={errors} />
        </fieldset>

        <div className="mt-8">
          <label htmlFor="field-consent" className="flex cursor-pointer items-start gap-3 text-sm text-muted">
            <input
              id="field-consent"
              type="checkbox"
              checked={values.consent}
              onChange={set("consent")}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "error-consent" : undefined}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[#ccff00]"
            />
            <span>
              I agree that Revivo may use these details to respond to my enquiry, as described in the{" "}
              <Link href="/privacy" className="text-ink underline underline-offset-4 hover:text-lime">
                privacy policy
              </Link>
              .
            </span>
          </label>
          <FieldError field="consent" errors={errors} />
        </div>
      </FormGroup>

      {status.kind === "fallback" && (
        <Fallback reason={status.reason} values={values} containerRef={fallbackRef} />
      )}

      <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-subtle" aria-live="polite">
          {submitting ? "Sending your enquiry…" : ""}
        </p>
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xs bg-lime px-6 text-sm font-semibold tracking-[0.08em] text-canvas uppercase transition-colors duration-200 hover:bg-ink disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />{" "}
              Sending
            </>
          ) : (
            <>
              Send enquiry <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------------ */

function Fallback({
  reason,
  values,
  containerRef,
}: {
  reason: "not_configured" | "send_failed" | "network";
  values: FormValues;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [copied, setCopied] = useState(false);
  const data = values as unknown as ContactInput;
  const text = formatEnquiry(data);
  const subject = enquirySubject(data);
  // Keep mailto links within safe length limits; the full text can be copied.
  const body =
    text.length > 1800 ? `${text.slice(0, 1800)}\n\n[Enquiry shortened — full text copied separately]` : text;
  const mailto = contactConfig.email
    ? `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : "";

  const title =
    reason === "not_configured"
      ? "Online sending isn’t available yet — your answers are safe."
      : "We couldn’t send your enquiry — your answers are safe.";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${text}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div ref={containerRef} tabIndex={-1} role="alert" className="border border-amber/60 bg-raised p-6">
      <p className="flex items-center gap-2 font-semibold text-ink">
        <AlertCircle aria-hidden="true" className="size-4 text-amber" />
        {title}
      </p>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        {contactConfig.email ? (
          <>
            Please send it directly by email to{" "}
            <a href={`mailto:${contactConfig.email}`} className="text-ink underline underline-offset-4">
              {contactConfig.email}
            </a>
            . The button below opens your email app with everything you wrote already filled in.
          </>
        ) : (
          <>
            Please copy your enquiry below and keep it — our direct email address will be published on this
            page shortly.
          </>
        )}
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        {mailto && (
          <a
            href={mailto}
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-lime px-5 text-sm font-semibold tracking-[0.08em] text-canvas uppercase hover:bg-ink"
          >
            <Mail aria-hidden="true" className="size-4" /> Email your enquiry
          </a>
        )}
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-12 items-center justify-center gap-2 border border-line-strong px-5 text-sm font-semibold tracking-[0.08em] text-ink uppercase hover:border-ink"
        >
          {copied ? (
            <Check aria-hidden="true" className="size-4 text-lime" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
          {copied ? "Copied" : "Copy enquiry text"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? "Enquiry text copied to clipboard." : ""}
      </p>
    </div>
  );
}

function FormGroup({
  index,
  title,
  note,
  children,
}: {
  index: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="w-full">
        <span className="flex items-center gap-3 border-t border-line pt-4">
          <span className="text-label text-lime">{index}</span>
          <span className="text-label text-subtle">{title}</span>
        </span>
      </legend>
      {note && <p className="mt-4 max-w-2xl text-sm text-muted">{note}</p>}
      <div className="mt-6">{children}</div>
    </fieldset>
  );
}

type InputBaseProps = {
  field: Exclude<ContactField, "consent" | "website" | "nextStep">;
  values: FormValues;
  errors: Partial<Record<ContactField, string>>;
  onChange: (
    field: keyof FormValues,
  ) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (field: ContactField) => () => void;
  optional?: boolean;
  hint?: string;
};

const controlClass =
  "w-full rounded-xs border bg-surface px-4 text-base text-ink placeholder:text-subtle transition-colors duration-200 focus:border-lime focus-visible:outline-none";

function describedBy(field: ContactField, hint?: string, error?: string) {
  return (
    [hint ? `hint-${field}` : null, error ? `error-${field}` : null].filter(Boolean).join(" ") || undefined
  );
}

function FieldLabel({ field, optional }: { field: ContactField; optional?: boolean }) {
  return (
    <label htmlFor={`field-${field}`} className="mb-2 block text-sm font-semibold text-ink">
      {field === "website" ? "" : LABELS[field]}
      {optional && <span className="ml-2 font-normal text-subtle">optional</span>}
    </label>
  );
}

function FieldHint({ field, hint }: { field: ContactField; hint?: string }) {
  if (!hint) return null;
  return (
    <p id={`hint-${field}`} className="mb-2 text-sm text-subtle">
      {hint}
    </p>
  );
}

function FieldError({
  field,
  errors,
}: {
  field: ContactField;
  errors: Partial<Record<ContactField, string>>;
}) {
  if (!errors[field]) return null;
  return (
    <p id={`error-${field}`} className="mt-2 flex items-start gap-2 text-sm text-amber">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>{errors[field]}</span>
    </p>
  );
}

function TextInput({
  field,
  values,
  errors,
  onChange,
  onBlur,
  optional,
  hint,
  type = "text",
  autoComplete,
  inputMode,
}: InputBaseProps & {
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
}) {
  const error = errors[field];
  return (
    <div>
      <FieldLabel field={field} optional={optional} />
      <FieldHint field={field} hint={hint} />
      <input
        id={`field-${field}`}
        name={field}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={values[field]}
        onChange={onChange(field)}
        onBlur={onBlur(field)}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(field, hint, error)}
        className={cn(controlClass, "min-h-12", error ? "border-amber" : "border-line-strong")}
      />
      <FieldError field={field} errors={errors} />
    </div>
  );
}

function TextArea({
  field,
  values,
  errors,
  onChange,
  onBlur,
  optional,
  hint,
  rows = 4,
}: InputBaseProps & { rows?: number }) {
  const error = errors[field];
  return (
    <div>
      <FieldLabel field={field} optional={optional} />
      <FieldHint field={field} hint={hint} />
      <textarea
        id={`field-${field}`}
        name={field}
        rows={rows}
        value={values[field]}
        onChange={onChange(field)}
        onBlur={onBlur(field)}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(field, hint, error)}
        className={cn(
          controlClass,
          "resize-y py-3 leading-relaxed",
          error ? "border-amber" : "border-line-strong",
        )}
      />
      <FieldError field={field} errors={errors} />
    </div>
  );
}

function SelectInput({
  field,
  values,
  errors,
  onChange,
  onBlur,
  optional,
  hint,
  options,
}: InputBaseProps & { options: readonly string[] }) {
  const error = errors[field];
  return (
    <div>
      <FieldLabel field={field} optional={optional} />
      <FieldHint field={field} hint={hint} />
      <div className="relative">
        <select
          id={`field-${field}`}
          name={field}
          value={values[field]}
          onChange={onChange(field)}
          onBlur={onBlur(field)}
          required={!optional}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(field, hint, error)}
          className={cn(
            controlClass,
            "min-h-12 appearance-none pr-10",
            error ? "border-amber" : "border-line-strong",
          )}
        >
          <option value="">{optional ? "Select (optional)…" : "Select…"}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle"
        />
      </div>
      <FieldError field={field} errors={errors} />
    </div>
  );
}
