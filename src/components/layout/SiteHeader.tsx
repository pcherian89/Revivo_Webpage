"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RevivoLogo } from "@/components/brand/RevivoLogo";
import { buttonClasses } from "@/components/ui/ButtonLink";
import { navLinks, primaryCta, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import type { PrototypeNavEntry } from "@/content/prototype-nav";

/** Opening a capability from the menu: the explorer listens and opens it, even when already on /home. */
function openCapability(id: string) {
  if (window.location.pathname === "/home")
    window.dispatchEvent(new CustomEvent("revivo:open-capability", { detail: id }));
}

export function SiteHeader({ prototypes = [] }: { prototypes?: readonly PrototypeNavEntry[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Transparent over the hero, refined dark surface once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Mobile menu: lock page scroll, close on Escape, keep Tab inside the menu.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current || !toggleRef.current) return;
      const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a[href]")];
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
    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) close(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ease-out",
          solid ? "border-line bg-canvas" : "border-transparent bg-transparent",
        )}
      >
        <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link href="/home" className="inline-flex min-h-11 items-center text-ink" aria-label="Revivo, home">
            <RevivoLogo title="" className="h-[26px] w-auto" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {prototypes.length > 0 && (
                <li>
                  <PrototypesMenu entries={prototypes} />
                </li>
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Link
                href={primaryCta.href}
                className={buttonClasses("primary", "min-h-10 px-5 text-[0.9375rem]")}
              >
                {primaryCta.label}
              </Link>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X aria-hidden="true" className="size-6" />
              ) : (
                <Menu aria-hidden="true" className="size-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: the header's backdrop blur would otherwise
          become the containing block for this fixed panel and collapse it. */}
      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-canvas lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label="Mobile" className="container-site flex min-h-full flex-col py-8">
              <ul className="border-t border-line">
                {navLinks.map((link) => (
                  <li key={link.href} className="border-b border-line">
                    <Link
                      href={link.href}
                      onClick={() => close(false)}
                      className="flex min-h-16 items-center justify-between gap-4 text-ink"
                    >
                      <span className="text-subtitle">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {prototypes.length > 0 && (
                <div className="mt-8">
                  <p className="label text-subtle">Prototypes</p>
                  <ul className="mt-2">
                    {prototypes.map((p) => (
                      <li key={p.capabilityId}>
                        <Link
                          href={p.href}
                          onClick={() => {
                            close(false);
                            openCapability(p.capabilityId);
                          }}
                          className="flex min-h-14 flex-col justify-center py-2 text-ink"
                        >
                          <span className="font-medium">{p.capabilityName}</span>
                          <span className="text-small text-muted">{p.productName} · prototype</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                href={primaryCta.href}
                onClick={() => close(false)}
                className={buttonClasses("primary", "mt-8 w-full")}
              >
                {primaryCta.label}
              </Link>
              <p className="text-small mt-auto pt-10 text-subtle">{siteConfig.positioning}</p>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * "Prototypes" in the desktop navigation: a disclosure (click or tap, never hover) listing each prototype under
 * the capability it belongs to. A link opens that capability in the explorer, where the panel offers the prototype.
 * Built on <details> so it also opens without JavaScript; Escape and clicking outside close it.
 */
function PrototypesMenu({ entries }: { entries: readonly PrototypeNavEntry[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const onDoc = (e: Event) => {
      const el = ref.current;
      if (el?.open && !el.contains(e.target as Node)) el.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      const el = ref.current;
      if (e.key === "Escape" && el?.open) {
        el.open = false;
        el.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("focusin", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("focusin", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <details ref={ref} className="group/proto relative">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink group-open/proto:text-ink [&::-webkit-details-marker]:hidden">
        Prototypes
        <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open/proto:rotate-180" />
      </summary>
      <div className="absolute top-full right-0 z-50 mt-2 w-80 rounded-xl border border-line bg-surface p-2 shadow-2xl">
        <ul>
          {entries.map((p) => (
            <li key={p.capabilityId}>
              <Link
                href={p.href}
                onClick={() => {
                  if (ref.current) ref.current.open = false;
                  openCapability(p.capabilityId);
                }}
                className="flex min-h-14 flex-col justify-center rounded-lg px-3 py-2 text-ink transition-colors hover:bg-raised focus-visible:bg-raised"
              >
                <span className="font-medium">{p.capabilityName}</span>
                <span className="text-small text-muted">{p.productName} · prototype</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-small border-t border-line px-3 pt-2 pb-1 text-subtle">
          Each prototype sits inside a capability. Fictional data only.
        </p>
      </div>
    </details>
  );
}
