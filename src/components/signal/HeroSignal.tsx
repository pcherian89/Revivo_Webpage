import { heartbeatPath, LOGO } from "@/lib/heartbeat";

/**
 * The hero signal: a quiet graphite flatline that comes alive as one lime
 * heartbeat — the Revivo logo's own shape — and lands on the dot.
 * Pure SVG + CSS (no JavaScript); its resting state is the finished signal.
 */
export function HeroSignal() {
  const scale = 1.55;
  const lead = 28;
  const beatW = LOGO.beatWidth * scale;
  const amp = LOGO.amplitude * scale;
  const tail = 30;
  const dotGap = 22;
  const width = lead + beatW + tail + dotGap + 8;
  const height = amp * 2 + 8;
  const y = height / 2;
  const d = heartbeatPath({ x: 0, y, before: lead, after: tail, scale });

  return (
    <div aria-hidden="true" className="pointer-events-none relative flex w-full items-center">
      {/* Quiet flatline */}
      <span className="signal-flat block h-0.5 flex-1 bg-line-strong" />
      {/* Soft light behind the beat */}
      <span className="signal-glow absolute right-[6%] h-40 w-72 rounded-full bg-[radial-gradient(closest-side,rgb(204_255_0/0.10),transparent)] md:right-[10%]" />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="relative h-auto w-[clamp(9rem,26vw,13rem)] shrink-0 overflow-visible"
      >
        <path
          className="signal-beat"
          pathLength={1}
          d={d}
          fill="none"
          stroke="#CCFF00"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="signal-dot" cx={lead + beatW + tail + dotGap} cy={y} r="4.5" fill="#CCFF00" />
      </svg>
      <span className="block w-[6%] md:w-[10%]" />
    </div>
  );
}
