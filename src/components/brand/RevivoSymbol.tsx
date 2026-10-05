import { cn } from "@/lib/cn";

/**
 * Original Revivo symbol: three signal lines converge on a core and leave as
 * one structured output — the idea behind the whole site, in 24px.
 */
export function RevivoSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      <path
        d="M2.5 4.5 L11 12 M2.5 12 H11 M2.5 19.5 L11 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path d="M15 12 H21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <rect x="10" y="9" width="6" height="6" transform="rotate(45 13 12)" fill="#CCFF00" />
    </svg>
  );
}
