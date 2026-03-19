import { Section, Sub, Term } from "../HelpPrimitives";

const UNITS: [string, string][] = [
  ["pkg", "Package"],
  ["box", "Box / Carton"],
  ["strip", "Blister strip"],
  ["btl", "Bottle (liquid)"],
  ["amp", "Ampoule (injectable)"],
  ["tube", "Tube (topical)"],
  ["sac", "Sachet (powder)"],
  ["cap", "Capsule"],
  ["tab", "Tablet"],
  ["pcs", "Pieces (misc.)"],
];

const InventorySection = () => (
  <Section id="inventory" title="Inventory">
    <p>
      Inventory items represent physical medicines and consumables in stock.
      Each item can have multiple unit types (e.g. a box contains strips, a
      strip contains tablets) with individual purchase prices and quantities
      tracked per unit.
    </p>

    <Sub title="Unit types">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
        {UNITS.map(([code, label]) => (
          <Term key={code} label={code}>
            {label}
          </Term>
        ))}
      </div>
    </Sub>

    <Sub title="Expiry dates">
      <p>
        Expiry dates are recorded per item. Items that are close to or past
        expiry should be reviewed and removed from active stock to avoid being
        added to invoices.
      </p>
    </Sub>
  </Section>
);

export default InventorySection;
