import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  updated: string;
  intro: ReactNode;
  sections: Array<{ heading: string; body: ReactNode }>;
};

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <article className="container-site pt-32 pb-24 md:pt-40">
      <header className="measure">
        <p className="eyebrow text-muted">Legal</p>
        <h1 className="text-title mt-5">{title}</h1>
        <p className="text-small mt-4 text-subtle">Last updated: {updated}</p>
        <div className="text-lead mt-8 text-muted">{intro}</div>
      </header>

      <div className="measure mt-14">
        {sections.map((s) => (
          <section key={s.heading} className="border-t border-line py-8">
            <h2 className="text-lead font-semibold text-ink">{s.heading}</h2>
            <div className="mt-3 space-y-4 text-muted [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
              {s.body}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
