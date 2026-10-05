import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { founder } from "@/content/home";

export function FounderSection() {
  return (
    <section aria-labelledby="founder-heading" className="section-pad border-t border-line">
      <div className="container-site">
        <div className="mb-10 flex items-center justify-between gap-6 border-t border-line pt-4 md:mb-14">
          <p className="text-label text-subtle">
            <span className="text-lime">{founder.index}</span> / {founder.label}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <FounderVisual />
          </Reveal>

          <div className="lg:col-span-7">
            <h2 id="founder-heading" className="text-display-lg">
              {founder.name}
            </h2>
            <p className="text-label mt-3 text-subtle">{founder.role}</p>

            <p className="text-lead measure mt-8 text-ink">{founder.lead}</p>
            <p className="measure mt-4 text-muted">{founder.body}</p>

            <h3 className="text-label mt-10 text-subtle">Background</h3>
            <ul className="mt-4 grid gap-x-8 border-t border-line sm:grid-cols-2">
              {founder.background.map((item) => (
                <li
                  key={item}
                  className="flex min-h-12 items-start gap-3 border-b border-line py-3 text-[0.95rem] text-ink"
                >
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-lime" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-xl text-xs leading-relaxed text-subtle">{founder.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Real photograph when configured; otherwise an abstract typographic panel. */
function FounderVisual() {
  if (founder.photo) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden border border-line bg-raised">
        <Image
          src={founder.photo.src}
          alt={founder.photo.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover grayscale"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="bg-tech-grid relative flex aspect-[4/5] max-h-[34rem] w-full flex-col justify-between overflow-hidden border border-line bg-raised p-6"
    >
      <div className="text-label flex justify-between text-subtle">
        <span>Founder / 01</span>
        <span>Revivo</span>
      </div>
      <p className="font-display text-[clamp(7rem,5rem+10vw,13rem)] leading-none font-semibold tracking-tight text-line-strong">
        {founder.monogram}
        <span className="text-lime">.</span>
      </p>
      <div className="text-label flex justify-between border-t border-line pt-3 text-subtle">
        <span>Operations</span>
        <span>Analytics</span>
        <span>Applied AI</span>
      </div>
    </div>
  );
}
