import Link from "next/link";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { contactConfig, siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-raised">
      <div className="container-site py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Wordmark />
            <p className="text-display-md mt-10 text-ink">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-md text-sm text-muted">
              Custom AI, data and automation systems for gyms, academies, teams, leagues, events, federations
              and sponsorship organizations.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="text-label mb-4 text-subtle">Company</p>
            <ul className="space-y-1 text-sm">
              <li>
                <FooterLink href="/#what-we-build">What we build</FooterLink>
              </li>
              <li>
                <FooterLink href="/#how-we-work">How we work</FooterLink>
              </li>
              <li>
                <FooterLink href="/#about">About</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="text-label mb-4 text-subtle">Connect</p>
            <ul className="space-y-1 text-sm">
              {contactConfig.email && (
                <li>
                  <FooterLink href={`mailto:${contactConfig.email}`}>{contactConfig.email}</FooterLink>
                </li>
              )}
              <li>
                {contactConfig.linkedin ? (
                  <FooterLink href={contactConfig.linkedin} external>
                    LinkedIn
                  </FooterLink>
                ) : (
                  <span className="inline-flex min-h-11 items-center text-subtle">
                    LinkedIn — coming soon
                  </span>
                )}
              </li>
              <li className="pt-2 text-muted">{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {siteConfig.descriptor}.
          </p>
          <ul className="flex gap-6">
            <li>
              <FooterLink href="/privacy" small>
                Privacy
              </FooterLink>
            </li>
            <li>
              <FooterLink href="/terms" small>
                Terms
              </FooterLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  external,
  small,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  small?: boolean;
}) {
  const className = `inline-flex min-h-11 items-center transition-colors duration-200 hover:text-ink ${
    small ? "text-subtle" : "text-muted"
  }`;
  if (external || href.startsWith("mailto:")) {
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
