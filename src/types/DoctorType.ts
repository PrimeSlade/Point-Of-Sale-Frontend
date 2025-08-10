import type { PhoneNumber } from "./LocationType";

type DoctorData = {
  id?: string;
  name: string;
  email: string;
  commission: string; // you can use `number` if it's numeric: number;
  address: string;
  description: string;
  locationId: number;
  phoneNumberId: number;
  phoneNumber: PhoneNumber;
};

export type { DoctorData };
