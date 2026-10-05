import { cn } from "@/lib/cn";

/**
 * A point on the signal map. `anchor` names it for the SVG connectors. The
 * anchor box is a fixed size so lines always meet the node's exact centre;
 * the selected state changes fill and size (never colour alone).
 */
export function SignalNode({
  anchor,
  state,
  className,
}: {
  anchor: string;
  state: "on" | "dim" | "off";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      data-anchor={anchor}
      className={cn("relative z-10 flex size-4 shrink-0 items-center justify-center", className)}
    >
      <span
        className={cn(
          "block rounded-full transition-all duration-300",
          state === "on" && "size-3.5 bg-lime shadow-[0_0_0_5px_rgb(204_255_0/0.14)]",
          state === "dim" && "size-2.5 border border-lime/60 bg-canvas",
          state === "off" && "size-2.5 border border-line-strong bg-canvas",
        )}
      />
    </span>
  );
}
