type CreateItemProps = {
  id?: number;
  name?: string;
  category?: string;
  exp?: Date;
  itemUnits: ItemUnits;
  mode: "create" | "edit";
};

type ItemUnits = {
  unit: string;
  quantity: number;
  purchasePrice: number;
};

export type { CreateItemProps, ItemUnits };
