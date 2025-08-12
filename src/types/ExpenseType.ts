import type { LocationType } from "./LocationType";

type CategoryType = {
  id?: number;
  name: string;
  description?: string;
  locationId: number;
  createdAt: Date;
  location: LocationType;
};

type CategoryForm = {
  id?: number;
  name: string;
  description?: string;
  locationId: number;
};

export type { CategoryType, CategoryForm };
