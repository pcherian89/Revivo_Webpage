import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { panelImage } from "@/content/pilot-images";
import { impact } from "@/content/impact";

export const metadata: Metadata = {
  title: { absolute: "Revivo Impact — sports funding prototype | Revivo" },
  description: impact.description,
  alternates: { canonical: "/impact" },
  openGraph: {
    url: "/impact",
    title: "Revivo Impact — sports funding prototype",
    description: impact.description,
  },
};

/**
 * Revivo Impact: the clickable prototype behind Funding, Grants & Programmes (same pattern as /pathway).
 * Frames the prototype before a visitor opens it; never presented as a deployed product or client work.
 */
export default function ImpactPage() {
  const img = panelImage("funding-impact-reporting", "management-reporting");
  return (
    <article className="pt-28 pb-20 md:pt-36">
      <header className="container-site grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
        <div>
          <p className="label text-subtle">
            <Link href="/home#funding-impact-reporting" className="hover:text-ink">
              {impact.eyebrow}
            </Link>
          </p>
          <h1 className="text-hero mt-4 leading-[0.92]">
            Revivo <span className="text-lime">Impact</span>
          </h1>
          <p className="text-lead measure mt-6 text-muted">{impact.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/impact/demo"
              target="_blank"
              rel="noopener"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-6 font-display text-lg font-bold tracking-[0.03em] text-ink transition-colors hover:border-lime hover:text-lime"
            >
              Try the prototype
              <ArrowUpRight aria-hidden="true" className="size-5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <Link
              href="/home#start"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 font-display text-lg font-bold tracking-[0.03em] text-canvas transition-colors hover:bg-ink"
            >
              Start a conversation
              <ArrowRight
                aria-hidden="true"
                className="size-5 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <p className="text-small mt-4 text-subtle">{impact.demoNote}</p>
        </div>
        {img && (
          <div className="pathway-photo relative aspect-[16/9] w-full">
            <Image
              src={img.src}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="photo object-cover"
              style={{ "--tone": img.tone } as CSSProperties}
            />
          </div>
        )}
      </header>

      <section aria-labelledby="impact-how" className="container-site mt-20 md:mt-28">
        <p className="label text-subtle">How it works</p>
        <h2 id="impact-how" className="text-title mt-3 max-w-3xl">
          {impact.howTitle}
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {impact.stages.map((s, i) => (
            <li key={s.name} className="border-t border-line pt-5">
              <span className="font-display text-sm font-bold text-lime">0{i + 1}</span>
              <h3 className="text-subtitle mt-2 text-ink">{s.name}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid gap-6 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h3 className="text-subtitle text-ink">{impact.alsoTitle}</h3>
          <ul className="space-y-3">
            {impact.also.map((a) => (
              <li key={a} className="flex gap-3 text-muted">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-lime" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="impact-safe"
        className="container-site mt-20 grid gap-10 md:mt-28 lg:grid-cols-2"
      >
        <div>
          <p className="label text-subtle">Safeguards</p>
          <h2 id="impact-safe" className="text-title mt-3">
            {impact.safeTitle}
          </h2>
        </div>
        <ul className="space-y-4">
          {impact.safeguards.map((g) => (
            <li key={g} className="flex gap-3 text-ink">
              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-lime" />
              {g}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="impact-about" className="container-site mt-20 md:mt-28">
        <div className="rounded-2xl border border-line bg-raised p-6 md:p-10">
          <h2 id="impact-about" className="text-subtitle text-ink">
            About this prototype
          </h2>
          <div className="measure mt-3 space-y-3 text-muted">
            {impact.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <a
            href="/impact/demo"
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-ink hover:text-lime"
          >
            Try the prototype <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </section>
    </article>
  );
}
