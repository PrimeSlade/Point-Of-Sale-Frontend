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

type LocationColumnsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

type CreateLocationProps = {
  onCreate: (data: AddLocation) => void;
  isCreating: boolean;
};

export type {
  LocationType,
  AddLocation,
  LocationColumnsProps,
  CreateLocationProps,
};
