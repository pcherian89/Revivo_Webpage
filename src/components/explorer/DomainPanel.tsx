"use client";

import { AnimatePresence, m } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { explorer, zones } from "@/content/explorer";
import { cn } from "@/lib/cn";

type Props = {
  selection: { zone: number; cap: number } | null;
  isDesktop: boolean;
  onClose: (restoreFocus?: boolean) => void;
  onSwitch: (cap: number) => void;
  onDiscuss: (capName: string) => void;
};

const EASE = [0.25, 1, 0.5, 1] as const;

/**
 * Capability detail. Desktop: a panel sliding in from the right (~46vw) with the
 * page still visible behind. Mobile: a bottom sheet. Escape, backdrop click and
 * the close button all close it; focus is trapped inside and restored after.
 * Choosing another capability replaces the content instead of stacking panels.
 */
export function DomainPanel({ selection, isDesktop, onClose, onSwitch, onDiscuss }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = Boolean(selection);

  // Lock page scroll (scrollbar-gutter keeps the page from shifting), trap focus, Escape to close.
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
        panelRef.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])"),
      );
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

  const zone = selection ? zones[selection.zone] : null;
  const cap = zone && selection ? zone.capabilities[selection.cap] : null;
  const L = explorer.panelLabels;

  return (
    <AnimatePresence>
      {open && zone && cap && selection && (
        <>
          <m.div
            key="backdrop"
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-black/55"
            onClick={() => onClose()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <m.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="domain-panel-title"
            className={cn(
              "fixed z-[61] flex flex-col overflow-hidden bg-surface shadow-[0_0_80px_rgb(0_0_0/0.5)]",
              isDesktop
                ? "top-0 right-0 h-[100dvh] w-[46vw] max-w-[44rem] min-w-[30rem] border-l border-line-strong"
                : "inset-x-0 bottom-0 max-h-[92dvh] rounded-t-[14px] border-t border-line-strong",
            )}
            initial={isDesktop ? { x: "100%", opacity: 0.6 } : { y: "100%", opacity: 0.6 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={isDesktop ? { x: "100%", opacity: 0.6 } : { y: "100%", opacity: 0.6 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-3 md:px-10">
              {!isDesktop && (
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-line-strong"
                />
              )}
              <p className="label text-subtle">{zone.name}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => onClose()}
                className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xs text-muted hover:text-ink"
              >
                <span className="label">Close</span>
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-6 pt-8 pb-10 md:px-10">
              <AnimatePresence mode="wait" initial={false}>
                <m.article
                  key={cap.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 id="domain-panel-title" className="text-subtitle text-ink">
                    {cap.name}
                  </h2>

                  <dl className="mt-8 space-y-7">
                    <div>
                      <dt className="label text-subtle">{L.problem}</dt>
                      <dd className="text-lead mt-2 text-ink">{cap.problem}</dd>
                    </div>
                    <div>
                      <dt className="label text-subtle">{L.build}</dt>
                      <dd className="mt-3">
                        <ul className="space-y-2.5">
                          {cap.build.map((b) => (
                            <li key={b} className="flex gap-3 text-muted">
                              <span aria-hidden="true" className="mt-[0.6rem] h-px w-4 shrink-0 bg-lime" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        {cap.note && <p className="text-small mt-3 text-subtle">{cap.note}</p>}
                      </dd>
                    </div>
                    <div>
                      <dt className="label text-lime">{L.outcome}</dt>
                      <dd className="mt-2 text-ink">{cap.outcome}</dd>
                    </div>
                    <div className="grid gap-7 sm:grid-cols-2">
                      <div>
                        <dt className="label text-subtle">{L.organizations}</dt>
                        <dd className="mt-2 text-muted">{cap.organizations.join(" · ")}</dd>
                      </div>
                      <div>
                        <dt className="label text-subtle">{L.decisionMaker}</dt>
                        <dd className="mt-2 text-muted">{cap.decisionMaker}</dd>
                      </div>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={() => onDiscuss(cap.name)}
                    className="group mt-9 inline-flex min-h-12 items-center gap-2.5 rounded-xs bg-lime px-7 font-display text-[1.0625rem] font-bold tracking-[0.03em] text-canvas transition-colors hover:bg-ink"
                  >
                    {L.cta}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </button>

                  <p className="text-small mt-6 text-subtle">{explorer.qualifier}</p>
                </m.article>
              </AnimatePresence>

              {/* Switch to another capability in this zone (replaces the panel content) */}
              <nav
                aria-label={`Other capabilities in ${zone.name}`}
                className="mt-10 border-t border-line pt-6"
              >
                <p className="label text-subtle">Also in {zone.name}</p>
                <ul className="mt-2">
                  {zone.capabilities.map((c, j) =>
                    j === selection.cap ? null : (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() => {
                            onSwitch(j);
                            requestAnimationFrame(() => closeRef.current?.focus());
                          }}
                          className="flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left text-muted hover:text-lime"
                        >
                          {c.name}
                          <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
