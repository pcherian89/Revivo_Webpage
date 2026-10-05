import Link from "next/link";
import type { ReactNode } from "react";
import { RevivoLogo } from "@/components/brand/RevivoLogo";
import { contactConfig, siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-raised">
      <div className="container-site py-12 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" aria-label="Revivo, home" className="inline-flex min-h-11 items-center text-ink">
              <RevivoLogo title="" className="h-7 w-auto" />
            </Link>
            <p className="text-small mt-4 text-subtle">{siteConfig.positioning}</p>
          </div>

          <ul className="text-small flex flex-col gap-1 md:items-end">
            {contactConfig.email && (
              <li>
                <FooterLink href={`mailto:${contactConfig.email}`}>{contactConfig.email}</FooterLink>
              </li>
            )}
            {contactConfig.phone && (
              <li>
                <FooterLink href={contactConfig.phoneHref}>{contactConfig.phone}</FooterLink>
              </li>
            )}
            {contactConfig.whatsapp && (
              <li>
                <FooterLink href={contactConfig.whatsapp} external>
                  WhatsApp
                </FooterLink>
              </li>
            )}
            <li>
              {contactConfig.linkedin ? (
                <FooterLink href={contactConfig.linkedin} external>
                  LinkedIn
                </FooterLink>
              ) : (
                <span className="inline-flex min-h-11 items-center text-subtle">LinkedIn — coming soon</span>
              )}
            </li>
          </ul>
        </div>

        <div className="text-small mt-10 flex flex-col gap-2 text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Custom AI solutions for sport.
          </p>
          <ul className="flex gap-6">
            <li>
              <FooterLink href="/privacy">Privacy</FooterLink>
            </li>
            <li>
              <FooterLink href="/terms">Terms</FooterLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const className =
    "inline-flex min-h-11 items-center text-muted transition-colors duration-200 hover:text-ink";
  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
