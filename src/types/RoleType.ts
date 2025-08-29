type Role = {
  id: number;
  name: string;
  createdAt?: Date;
  permissions?: Permission[];
};

type RoleForm = Omit<Role, "id" | "permissions"> & {
  id?: number;
  permissions: { id: number }[];
};

type Permission = {
  id: number;
  action: string;
  subject: string;
};

export type { Role, Permission, RoleForm };
