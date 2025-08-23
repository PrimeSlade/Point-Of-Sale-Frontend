import type { Location } from "./ItemType";
import type { Role } from "./RoleType";

type User = {
  id: string;
  name: string;
  email: string;
  pricePercent: number;
  locationId: number;
  roleId: number;
  role: Role;
  location: Location;
};

export type { User };
