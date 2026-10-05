import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "text";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-xs px-6 text-sm font-semibold uppercase tracking-[0.08em] transition-[background-color,color,border-color] duration-200 ease-out";

const variants: Record<Variant, string> = {
  primary: "bg-lime text-canvas hover:bg-ink",
  secondary: "border border-line-strong text-ink hover:border-ink",
  text: "min-h-11 px-0 text-ink hover:text-lime",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** Show the trailing arrow (default true) */
  arrow?: boolean;
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  arrow = true,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      )}
    </Link>
  );
}
