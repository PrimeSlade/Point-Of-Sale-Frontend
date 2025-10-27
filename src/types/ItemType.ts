import type { User } from "./UserType";

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
  barcode: string;
  name: string;
  category: string;
  expiryDate: Date;
  description?: string;
  locationId: number;
  location: Location;
  itemUnits: ItemUnits[];
};

type ItemHistoryDetail = {
  id: number;
  oldUnitType: string;
  newUnitType: string;
  oldRate: number;
  newRate: number;
  oldQuantity: number;
  newQuantity: number;
  oldPurchasePrice: number;
  newPurchasePrice: number;
  itemHistoryId: number;
};

type InventoryAction = "edit" | "import" | string;

type ItemHistory = {
  id: number;
  userName: string;
  createdAt: string; // ISO date string
  action: InventoryAction;
  userId: string;
  itemId: number;
  itemHistoryDetails: ItemHistoryDetail[];
  user: User;
};

export type {
  ItemUnits,
  CreateItem,
  EditItem,
  ItemType,
  Location,
  ItemHistory,
};
