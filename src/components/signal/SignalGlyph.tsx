import { pulseSegment, SIGNAL } from "@/lib/signal";
import { cn } from "@/lib/cn";

const S = 0.34;
const D = `M 1 12 H ${26 - 34 * S}${pulseSegment(26, 12, S)} H 46`;

/** A small accent of the Revivo Signal: the same straight line and pulse as the hero. */
export function SignalGlyph({ className, color = SIGNAL.color }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 56 24"
      aria-hidden="true"
      focusable="false"
      className={cn("h-6 w-14 shrink-0", className)}
    >
      <path
        d={D}
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="52" cy="12" r="2" fill={color} />
    </svg>
  );
}
