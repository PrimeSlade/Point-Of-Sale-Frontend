import type { LocationType } from "./LocationType";

type CategoryType = {
  id: number;
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

type ExpenseType = {
  id: number;
  name: string;
  amount: number;
  date: Date;
  description: string;
  locationId: number;
  categoryId: number;
  location: LocationType;
  category: CategoryType;
};

type ExpenseForm = {
  id?: number;
  name: string;
  amount: number;
  date: Date;
  description?: string;
  categoryId: number;
  locationId: number;
};

export type { CategoryType, CategoryForm, ExpenseType, ExpenseForm };
