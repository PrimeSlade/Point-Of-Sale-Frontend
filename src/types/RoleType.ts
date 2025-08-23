type Role = {
  id: number;
  name: string;
  permissions: Permission[];
};

type Permission = {
  id: number;
  action: string;
  subject: string;
  roleId: number;
};

export type { Role, Permission };
