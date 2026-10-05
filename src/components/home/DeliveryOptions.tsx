import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { delivery } from "@/content/home";

export function DeliveryOptions() {
  return (
    <section aria-labelledby="delivery-heading" className="section-pad border-t border-line">
      <div className="container-site">
        <SectionHeader
          index={delivery.index}
          label={delivery.label}
          annotation={delivery.annotation}
          headline={delivery.headline}
          headingId="delivery-heading"
        >
          <p className="text-lead measure mt-6 text-muted md:mt-8">{delivery.intro}</p>
        </SectionHeader>

        <Reveal>
          <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
            {delivery.options.map((option, i) => (
              <li key={option.name} className="bg-canvas p-6 md:p-10">
                <p className="text-label text-subtle">
                  <span className="text-lime">0{i + 1}</span> / Delivery
                </p>
                <h3 className="text-display-md mt-6">{option.name}</h3>
                <p className="mt-4 max-w-md text-[0.95rem] text-muted">{option.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
