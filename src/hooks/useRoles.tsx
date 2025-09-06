import { useQuery } from "@tanstack/react-query";
import { getRoles, getRoleById } from "@/api/roles";
import { getPermissions } from "@/api/permissions";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
};

export const useRole = (id: number | string | undefined) => {
  return useQuery({
    queryKey: ["role", id],
    queryFn: () => getRoleById(Number(id)),
    enabled: Boolean(id),
  });
};

export const usePermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: getPermissions,
  });
};