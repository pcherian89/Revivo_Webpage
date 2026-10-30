"use client";

import { AnimatePresence, m } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { ChallengeAside } from "@/components/scenes/FinalCtaScene";
import { FieldGlyph } from "@/components/signal/SignalGlyph";
import { finalCta, process } from "@/content/home";
import { cn } from "@/lib/cn";
import { conversation } from "./tree-copy";

const EASE = [0.25, 1, 0.5, 1] as const;

/**
 * "Start a conversation": the end of the tree. How Revivo works (four steps on
 * one lit rail), the visitor's signal and the enquiry form, in the same panel
 * shell as the capability details (right panel on desktop, bottom sheet on
 * phones). Escape / backdrop / Close go back one level; focus is trapped.
 */
export function ConversationPanel({
  open,
  isDesktop,
  onClose,
}: {
  open: boolean;
  isDesktop: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          "button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div
            key="talk-backdrop"
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-black/55"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <m.div
            key="talk-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="talk-title"
            className={cn(
              "fixed z-[61] flex flex-col overflow-hidden bg-surface shadow-[0_0_80px_rgb(0_0_0/0.5)]",
              isDesktop
                ? "top-0 right-0 h-[100dvh] w-[52vw] max-w-[50rem] min-w-[34rem] border-l border-line-strong"
                : "inset-x-0 bottom-0 max-h-[94dvh] rounded-t-[14px] border-t border-line-strong",
            )}
            initial={isDesktop ? { x: "100%", opacity: 0.6 } : { y: "100%", opacity: 0.6 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={isDesktop ? { x: "100%", opacity: 0.6 } : { y: "100%", opacity: 0.6 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-3 md:px-10">
              {!isDesktop && (
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-line-strong"
                />
              )}
              <p className="label text-lime">{conversation.label}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 text-muted hover:text-ink"
              >
                <span className="label">Close</span>
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-6 pt-8 pb-12 md:px-10">
              <h2 id="talk-title" className="text-title">
                {finalCta.title}
              </h2>
              <p className="text-lead mt-3 text-muted">{finalCta.support}</p>

              {/* How Revivo works — one lit rail, one short line per step */}
              <div className="mt-8">
                <p className="label text-subtle">{process.title}</p>
                <ol className="mt-4 grid gap-4 sm:grid-cols-2">
                  {process.steps.map((step, i) => (
                    <li key={step.name} className="flex gap-3">
                      <FieldGlyph stage={i} className="mt-0.5 h-6 w-14" />
                      <div>
                        <p className="font-display text-lg font-bold text-ink">{step.name}</p>
                        <p className="text-small text-muted">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <ChallengeAside />

              <div className="mt-10 border-t border-line pt-8">
                <EnquiryForm idPrefix="talk" submitLabel={conversation.submit} />
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
