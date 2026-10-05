import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  index?: string;
  label: string;
  annotation?: string;
  headline: readonly string[];
  headingId: string;
  children?: ReactNode;
  className?: string;
};

/**
 * The consistent technical header used by every homepage section:
 * a thin divider, a mono index/label, an optional annotation on the right,
 * then one dominant headline.
 */
export function SectionHeader({
  index,
  label,
  annotation,
  headline,
  headingId,
  children,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("mb-12 md:mb-16", className)}>
      <div className="mb-8 flex items-center justify-between gap-6 border-t border-line pt-4 md:mb-12">
        <p className="text-label text-subtle">
          {index && <span className="text-lime">{index}</span>}
          {index && <span aria-hidden="true"> / </span>}
          {label}
        </p>
        {annotation && (
          <p className="text-label hidden text-subtle md:block" aria-hidden="true">
            {annotation}
          </p>
        )}
      </div>
      <h2 id={headingId} className="text-display-lg max-w-5xl text-balance">
        {headline.map((line, i) => (
          <span key={line} className={cn("block", i > 0 && "text-muted")}>
            {line}
          </span>
        ))}
      </h2>
      {children}
    </header>
  );
}
