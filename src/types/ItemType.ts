type ItemFormProps = {
  id?: number;
  oldName?: string;
  oldCategory?: string;
  oldExpiryDate?: Date;
  oldDescription?: string;
  oldPricePercent?: number;
  oldItemUnits?: ItemUnits;
  mode: "create" | "edit";
};

type ItemUnits = {
  unitType: string;
  quantity: number;
  purchasePrice: number;
};

type Item = {
  name: string;
  category: string;
  expiryDate: Date;
  description?: string;
  pricePercent: number;
  locationId: number;
};

type Location = {
  id: number;
  name: string;
  address: string;
  phoneNumberId: number;
};

type CreateItem = {
  item: Item;
  itemUnits: ItemUnits[];
};

type ItemColumnsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

type ReturnedItemType = Item & {
  location: Location;
};

export type {
  ItemFormProps,
  ItemUnits,
  ItemColumnsProps,
  CreateItem,
  ReturnedItemType,
};
