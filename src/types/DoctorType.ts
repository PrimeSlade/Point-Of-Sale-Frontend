type Doctor = {
  id?: string;
  name: string;
  email: string;
  commission: string; // you can use `number` if it's numeric: number;
  address: string;
  description: string;
  locationId: number;
  phoneNumberId: number;
};

export type { Doctor };
