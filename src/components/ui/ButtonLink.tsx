import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "quiet";

const variants: Record<Variant, string> = {
  primary:
    "min-h-12 rounded-full bg-lime px-6 text-canvas font-semibold hover:bg-ink transition-colors duration-200",
  quiet: "min-h-12 px-1 text-ink font-medium hover:text-lime transition-colors duration-200",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn("group inline-flex items-center justify-center gap-2.5 text-base", variants[variant], className);
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
