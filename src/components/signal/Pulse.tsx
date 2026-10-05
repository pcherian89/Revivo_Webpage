import { heartbeatPath } from "@/lib/heartbeat";
import { cn } from "@/lib/cn";

/**
 * A small signal glyph. Quiet = a graphite flatline. Alive = one lime beat
 * (the logo's heartbeat) that draws once each time it becomes active.
 */
export function Pulse({ alive, className }: { alive: boolean; className?: string }) {
  const y = 16;
  return (
    <svg
      viewBox="0 0 64 32"
      aria-hidden="true"
      focusable="false"
      className={cn("h-8 w-16 shrink-0", className)}
    >
      {alive ? (
        <>
          <path
            className="beat-once"
            pathLength={1}
            d={heartbeatPath({ x: 2, y, before: 18, after: 12, scale: 0.36 })}
            fill="none"
            stroke="#CCFF00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="58" cy={y} r="2.5" fill="#CCFF00" />
        </>
      ) : (
        <path d={`M2 ${y} H52`} stroke="#383B37" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}
