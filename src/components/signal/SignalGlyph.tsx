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

/**
 * The field at each stage of the process, in the same 56×24 box as the signal:
 * scattered signals → a pattern found → structure → the connected, live signal.
 */
const STAGES: { dots: [number, number][]; lines?: string }[] = [
  // Discover: scattered signals
  {
    dots: [
      [5, 8],
      [14, 17],
      [22, 6],
      [31, 15],
      [40, 7],
      [50, 16],
    ],
  },
  // Define: a pattern is identified among them
  {
    dots: [
      [5, 6],
      [21, 12],
      [29, 12],
      [37, 12],
      [51, 18],
    ],
    lines: "M 20 6 H 38 A 6 6 0 0 1 44 12 A 6 6 0 0 1 38 18 H 20 A 6 6 0 0 1 14 12 A 6 6 0 0 1 20 6 Z",
  },
  // Prototype: structure appears
  {
    dots: [
      [8, 6],
      [20, 6],
      [32, 6],
      [44, 6],
      [8, 18],
      [20, 18],
      [32, 18],
      [44, 18],
    ],
    lines: "M 8 6 H 44 V 18 H 8 Z M 20 6 V 18 M 32 6 V 18",
  },
];

export function FieldGlyph({
  stage,
  className,
  color = SIGNAL.color,
}: {
  stage: number;
  className?: string;
  color?: string;
}) {
  const s = STAGES[stage];
  if (!s) return <SignalGlyph className={className} color={color} />; // Build: connected and live
  return (
    <svg
      viewBox="0 0 56 24"
      aria-hidden="true"
      focusable="false"
      className={cn("h-6 w-14 shrink-0", className)}
    >
      {s.lines && <path d={s.lines} fill="none" stroke={color} strokeWidth="1.25" strokeLinejoin="round" />}
      {s.dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill={color} />
      ))}
    </svg>
  );
}
