import { createContext, type ReactNode } from "react";
import { AbilityBuilder, PureAbility } from "@casl/ability";
import type { Permission } from "@/types/RoleType";
import type { User } from "@/types/UserType";
import { useMe } from "@/hooks/useUsers";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: unknown;
  can: (action: string, subject: string | string[]) => boolean;
  ability: PureAbility;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading, error } = useMe();

  const ability = new PureAbility(
    user?.role.permissions?.map((p: Permission) => ({
      action: p.action,
      subject: p.subject,
    }))
  );

  const can = (action: string, subject: string | string[]) => {
    //if ararys, check with some
    if (Array.isArray(subject)) {
      return subject.some((s) => {
        if (s.includes("-")) {
          const parts = s.split("-");
          // User needs permission for ALL parts of a compound subject
          return parts.every((part) => ability.can(action, part));
        }
        return ability.can(action, s);
      });
    }
    return ability.can(action, subject);
  };

  return (
    <AuthContext value={{ user: user ?? null, isLoading, error, can, ability }}>
      {children}
    </AuthContext>
  );
};
