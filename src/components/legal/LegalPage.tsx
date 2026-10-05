import type { ReactNode } from "react";

type LegalPageProps = {
  label: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: Array<{ heading: string; body: ReactNode }>;
};

export function LegalPage({ label, title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className="pt-16 lg:pt-[4.5rem]">
      <article className="container-site py-14 md:py-20">
        <header className="max-w-3xl">
          <p className="text-label text-subtle">{label}</p>
          <h1 className="text-display-lg mt-6">{title}</h1>
          <p className="text-label mt-6 text-subtle">Last updated: {updated}</p>
          <div className="text-lead mt-8 text-muted">{intro}</div>
        </header>

        <div className="mt-14 max-w-3xl border-t border-line">
          {sections.map((s, i) => (
            <section key={s.heading} className="border-b border-line py-8">
              <h2 className="flex items-baseline gap-4 text-lg font-semibold text-ink">
                <span className="text-label text-lime">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[0.975rem] leading-relaxed text-muted [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
