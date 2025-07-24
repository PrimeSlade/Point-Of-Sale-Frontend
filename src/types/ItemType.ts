type ItemFormProps = {
  id?: number;
  oldName?: string;
  oldCategory?: string;
  oldExpiryDate?: Date;
  oldDescription?: string;
  oldPricePercent?: number;
  oldItemUnits?: ItemUnits[];
  oldLocation?: string;
  mode: "create" | "edit";
};

type unitType =
  | "btl"
  | "amp"
  | "tube"
  | "strip"
  | "cap"
  | "pcs"
  | "sac"
  | "box"
  | "pkg"
  | "tab";

type ItemUnits = {
  unitType: unitType;
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
  id: number;
  location: Location;
};

export type {
  ItemFormProps,
  ItemUnits,
  ItemColumnsProps,
  CreateItem,
  ReturnedItemType,
};
