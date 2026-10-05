import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { RevivoSymbol } from "./RevivoSymbol";

type WordmarkProps = {
  className?: string;
  /** Show the "AI SYSTEMS FOR SPORT" descriptor next to the name */
  withDescriptor?: boolean;
  href?: string;
};

export function Wordmark({ className, withDescriptor = true, href = "/" }: WordmarkProps) {
  return (
    <Link href={href} className={cn("group inline-flex min-h-11 items-center gap-3 text-ink", className)}>
      <RevivoSymbol className="size-6" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.375rem] font-semibold tracking-[0.16em]">
          {siteConfig.wordmark}
        </span>
        {withDescriptor && (
          <span className="mt-1 font-mono text-[0.625rem] tracking-[0.18em] text-subtle uppercase">
            {siteConfig.descriptor}
          </span>
        )}
      </span>
      <span className="sr-only">— home</span>
    </Link>
  );
}
