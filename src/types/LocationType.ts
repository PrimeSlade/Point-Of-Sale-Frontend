type LocationType = {
  id: number;
  name: string;
  address: string;
  phoneNumberId: number;
  phoneNumber: PhoneNumber;
};

type PhoneNumber = {
  id: number;
  number: string;
  createdAt: string;
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

export type { LocationType, AddLocation, EditLocation, PhoneNumber };
