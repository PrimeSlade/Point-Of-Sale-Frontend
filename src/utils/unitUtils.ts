import type { ItemUnits } from "@/types/ItemType";

export const unitType = [
  "pkg", // package (could be similar to box)
  "box", // biggest container
  "strip", // strip of tablets (multiple tabs)
  "btl", // bottle
  "amp", // ampoule (small liquid container)
  "tube", // tube
  "sac", // sachet (small packet)
  "cap", // capsule (single dose)
  "tab", // tablet (single dose)
  "pcs", // pieces (single items)
] as const;

//map
const unitRank = Object.fromEntries(unitType.map((u, i) => [u, i])); //HashMap

const smallestUnit = (units: ItemUnits[]) => {
  return [...units]
    .sort((a, b) => unitRank[a.unitType] - unitRank[b.unitType])
    .at(-1);
};

export { smallestUnit };
