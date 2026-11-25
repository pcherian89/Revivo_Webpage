import { zones } from "./explorer";
import { products } from "./products";

/** One entry in the header's "Prototypes" menu: the capability first, the prototype underneath. */
export type PrototypeNavEntry = {
  capabilityId: string;
  capabilityName: string;
  productName: string;
  href: string;
};

/**
 * "Prototypes" menu entries, in explorer order. Each opens its home capability in the explorer
 * (`/home#<capability-id>`), where the panel offers the prototype. Server-side only: hidden products never ship.
 */
export function prototypeNavEntries(): PrototypeNavEntry[] {
  const order = zones.flatMap((z) => z.capabilities);
  return products
    .filter((p) => p.showcase && p.href && p.prototype)
    .map((p) => {
      const home = p.capabilities[0];
      const cap = order.find((c) => c.id === home);
      return {
        capabilityId: home,
        capabilityName: cap?.name ?? home,
        productName: p.name,
        href: `/home#${home}`,
      };
    })
    .sort(
      (a, b) =>
        order.findIndex((c) => c.id === a.capabilityId) - order.findIndex((c) => c.id === b.capabilityId),
    );
}
