import { addRole, editRoleById } from "@/api/roles";
import type { Permission, Role } from "@/types/RoleType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import RoleFormField from "../form/RoleFromField";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type RoleFormProps = {
  data?: Role;
  permissions: Permission[];
  mode: "create" | "edit";
};

const RoleForm = ({ data, permissions, mode }: RoleFormProps) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  //Tanstack
  const {
    mutate: addRoleMutate,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: addRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      navigate("/dashboard/settings/roles");
      toast.success(data?.message);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: editRoleMutate,
    isPending: isEditing,
    error: editError,
  } = useMutation({
    mutationFn: editRoleById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["me"] }); //fetch the user again for permission if you change your role
      navigate("/dashboard/settings/roles");
      toast.success(data?.message);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  //Form
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Role name must be at least 2 characters." })
      .max(20, { message: "Role name must be at most 20 characters." }),

    permissions: z
      .array(z.object({ id: z.number() }))
      .refine((selectedIds) => selectedIds.some((id) => id), {
        message: "You have to select at least one permission.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      form.reset({
        name: data.name,
        permissions: data.permissions,
      });
    }
  }, [mode, data]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (mode === "create") {
      addRoleMutate(values);
    } else {
      editRoleMutate({ id: data?.id, ...values });
    }
  };

  return (
    <RoleFormField
      permissions={permissions}
      form={form}
      onSubmit={onSubmit}
      mode={mode}
      isPending={isCreating || isEditing}
    />
  );
};

export default RoleForm;
