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
  id?: number;
  unitType: unitType;
  rate: number;
  quantity: number;
  purchasePrice: number;
};

type Item = {
  name: string;
  category: string;
  expiryDate: Date;
  description?: string;
  locationId: number;
};

type CreateItem = {
  item: Item;
  itemUnits: ItemUnits[];
};

type EditItem = { id: number } & Partial<CreateItem>;

type Location = {
  id: number;
  name: string;
  address: string;
  phoneNumberId: number;
};

type ItemType = {
  id: number;
  name: string;
  category: string;
  expiryDate: Date;
  description?: string;
  locationId: number;
  location: Location;
  itemUnits: ItemUnits[];
};

export type { ItemUnits, CreateItem, EditItem, ItemType, Location };
