import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { process } from "@/content/home";

export function ProcessSection() {
  return (
    <section
      id="how-we-work"
      aria-labelledby="process-heading"
      className="section-pad border-t border-line bg-raised"
    >
      <div className="container-site">
        <SectionHeader
          index={process.index}
          label={process.label}
          annotation={process.annotation}
          headline={process.headline}
          headingId="process-heading"
        />

        <Reveal>
          <ol className="grid border-l border-line-strong lg:grid-cols-5 lg:border-t lg:border-l-0">
            {process.steps.map((step, i) => (
              <li key={step.name} className="relative pb-10 pl-8 last:pb-0 lg:pt-10 lg:pr-8 lg:pb-0 lg:pl-0">
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 -left-[5px] size-[9px] lg:top-[-5px] lg:left-0 ${
                    i === 0 ? "bg-lime" : "border border-ink bg-raised"
                  }`}
                />
                <p className="text-label text-lime">0{i + 1}</p>
                <h3 className="text-display-md mt-3">{step.name}</h3>
                <p className="mt-3 max-w-xs text-[0.95rem] text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-16 grid gap-6 border-t border-line pt-8 md:mt-20 lg:grid-cols-12">
          <p className="text-lead text-ink lg:col-span-7">{process.supporting}</p>
          <p className="text-label text-subtle lg:col-span-4 lg:col-start-9 lg:text-right">
            {process.brandLine}
          </p>
        </div>
      </div>
    </section>
  );
}
