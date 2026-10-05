"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RevivoLogo } from "@/components/brand/RevivoLogo";
import { buttonClasses } from "@/components/ui/ButtonLink";
import { navLinks, primaryCta, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
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
          solid ? "border-line bg-canvas/95 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link href="/" className="inline-flex min-h-11 items-center text-ink" aria-label="Revivo, home">
            <RevivoLogo title="" className="h-[26px] w-auto" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
              <Link
                href={primaryCta.href}
                onClick={() => close(false)}
                className={buttonClasses("primary", "mt-8 w-full")}
              >
                {primaryCta.label}
              </Link>
              <p className="text-small mt-auto pt-10 text-subtle">{siteConfig.location}</p>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
