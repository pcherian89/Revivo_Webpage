import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { why } from "@/content/home";

export function WhyRevivo() {
  return (
    <section aria-labelledby="why-heading" className="section-pad border-t border-line bg-raised">
      <div className="container-site">
        <SectionHeader
          index={why.index}
          label={why.label}
          annotation={why.annotation}
          headline={why.headline}
          headingId="why-heading"
        />

        <Reveal>
          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {why.strengths.map((s, i) => (
              <li key={s.name} className="border-t border-line-strong pt-6">
                <p className="text-label text-subtle">0{i + 1}</p>
                <h3 className="mt-4 text-lg font-semibold text-ink">{s.name}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
