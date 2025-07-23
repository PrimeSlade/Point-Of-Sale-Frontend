import type { Dispatch, SetStateAction } from "react";

type LocationType = {
  id: number;
  name: string;
  address: string;
  phoneNumberId: number;
  phoneNumber: {
    id: number;
    number: string;
    createdAt: string;
  };
};

type AddLocation = {
  name: string;
  address: string;
  phoneNumber: string;
};

type EditLocation = {
  id: number;
  input: AddLocation;
};

type LocationColumnsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

type CreateLocationProps = {
  id?: number;
  oldName?: string;
  oldAddress?: string;
  oldPhoneNumber?: string;
  mode: "create" | "edit";
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

export type {
  LocationType,
  AddLocation,
  LocationColumnsProps,
  CreateLocationProps,
  EditLocation,
};
