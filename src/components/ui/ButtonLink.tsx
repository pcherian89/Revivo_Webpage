import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

/** Simple CTA styling shared with Revivo IQ: condensed, bold, near-square. */
const variants: Record<Variant, string> = {
  primary: "bg-lime text-canvas hover:bg-ink",
  secondary: "border border-line-strong bg-raised/60 text-ink hover:border-lime hover:text-lime",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 font-display text-base font-bold tracking-[0.03em] transition-colors duration-200",
    variants[variant],
    className,
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
    </Link>
  );
}
