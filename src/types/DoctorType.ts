import type { Location } from "./ItemType";
import type { PhoneNumber } from "./LocationType";

type DoctorFormData = {
  id?: string;
  name: string;
  email: string;
  commission: number;
  address: string;
  description: string;
  locationId: number;
  phoneNumber: string;
};

type DoctorData = {
  id?: string;
  name: string;
  email: string;
  commission: number;
  address: string;
  description: string;
  locationId: number;
  location: Location;
  phoneNumberId: number;
  phoneNumber: PhoneNumber;
};

export type { DoctorFormData, DoctorData };
