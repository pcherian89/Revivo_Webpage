import { pulse, rhythm, SIGNAL, smoothPath } from "@/lib/signal";
import { cn } from "@/lib/cn";

const D = smoothPath([...rhythm(0, 10, 12, 0.6, 5), ...pulse(26, 12, 0.32).slice(1), { x: 50, y: 12 }]);

/** A small accent of the Revivo Signal (the same pulse shape as the hero). */
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
      <circle cx="53" cy="12" r="2" fill={color} />
    </svg>
  );
}
