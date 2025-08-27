import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ReusableFormDialog, {
  type FieldType,
  type Types,
} from "../form/ReusableFrom";
import type { User } from "@/types/UserType";
import type { LocationType } from "@/types/LocationType";
import { addUser, editUserById } from "@/api/user";
import type { Role } from "@/types/RoleType";
import { useAuth } from "@/hooks/useAuth";

type UserFormProps = {
  data?: User;
  mode: "create" | "edit";
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  locationData: LocationType[];
  roleData: Role[];
};

const UserForm = ({
  data,
  mode,
  open,
  onClose,
  locationData,
  roleData,
}: UserFormProps) => {
  const queryClient = useQueryClient();

  //useAuth
  const { user } = useAuth();

  //Tanstack
  const {
    mutate: addUserMutate,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data?.message);
      form.reset();
      onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: editUserMutate,
    isPending: isEditing,
    error: editError,
  } = useMutation({
    mutationFn: editUserById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      //if id are the same
      if (data.data.id === user?.id) {
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }
      toast.success(data?.message);
      form.reset();
      onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  //Form
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "User name must be at least 2 characters." })
      .max(50, { message: "User name must be at most 50 characters." }),

    email: z.email({ message: "Please enter a valid email address." }),

    password: z
      .string()
      .min(5, { message: "Password must be at least 6 characters long." }),

    pricePercent: z
      .number({ message: "Price percentage must be a valid number." })
      .min(0, { message: "Price percentage cannot be negative." })
      .max(100, { message: "Price percentage cannot exceed 100%." }),

    locationId: z.number({
      message: "Please select a valid location.",
    }),

    roleId: z.number({
      message: "Please select a valid role.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      email: data?.email ?? "",
      password: "",
      pricePercent: data?.pricePercent ?? undefined,
      locationId: data?.locationId ?? undefined,
      roleId: data?.roleId ?? undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (mode === "create") {
      addUserMutate(values);
    } else {
      editUserMutate({ id: data?.id, ...values });
    }
  };

  const userFields = [
    {
      name: "name",
      label: "User Name",
      placeholder: "Enter user name",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter email address",
      type: "email" as Types,
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      type: "password" as Types,
    },
    {
      name: "pricePercent",
      label: "Price Percentage (%)",
      placeholder: "Enter price percentage",
      type: "number" as Types,
    },
    {
      name: "locationId",
      label: "Location",
      placeholder: "Select a Location",
      fieldType: "select" as FieldType,
      options: locationData.map((l: LocationType) => ({
        value: l.id,
        label: l.name,
      })),
    },
    {
      name: "roleId",
      label: "Role",
      placeholder: "Select a Role",
      fieldType: "select" as FieldType,
      options: roleData.map((r: Role) => ({
        value: r.id,
        label: r.name,
      })),
    },
  ];

  return (
    <ReusableFormDialog
      open={open}
      onClose={onClose}
      title={mode === "create" ? "Add New User" : "Edit User"}
      fields={userFields}
      form={form}
      onSubmit={onSubmit}
      mode={mode}
      isPending={isCreating || isEditing}
    />
  );
};

export default UserForm;
