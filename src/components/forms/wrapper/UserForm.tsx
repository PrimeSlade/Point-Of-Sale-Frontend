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
import { addUser, editUserById } from "@/api/users";
import type { Role } from "@/types/RoleType";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
      .min(2, { message: t("form.user.error.name_min") })
      .max(50, { message: t("form.user.error.name_max") }),

    email: z.email({ message: t("form.user.error.email_invalid") }),

    password: z
      .string()
      .min(5, { message: t("form.user.error.password_min") }),

    pricePercent: z
      .number({ message: t("form.user.error.price_percent_invalid") })
      .min(0, { message: t("form.user.error.price_percent_negative") })
      .max(100, { message: t("form.user.error.price_percent_max") }),

    locationId: z.number({
      message: t("form.user.error.location_required"),
    }),

    roleId: z.number({
      message: t("form.user.error.role_required"),
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
      label: t("form.user.name_label"),
      placeholder: t("form.user.name_placeholder"),
    },
    {
      name: "email",
      label: t("form.user.email_label"),
      placeholder: t("form.user.email_placeholder"),
      type: "email" as Types,
    },
    {
      name: "password",
      label: t("form.user.password_label"),
      placeholder: t("form.user.password_placeholder"),
      type: "password" as Types,
    },
    {
      name: "pricePercent",
      label: t("form.user.price_percent_label"),
      placeholder: t("form.user.price_percent_placeholder"),
      type: "number" as Types,
    },
    {
      name: "locationId",
      label: t("form.user.location_label"),
      placeholder: t("form.user.location_placeholder"),
      fieldType: "select" as FieldType,
      options: locationData.map((l: LocationType) => ({
        value: l.id,
        label: l.name,
      })),
    },
    {
      name: "roleId",
      label: t("form.user.role_label"),
      placeholder: t("form.user.role_placeholder"),
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
      title={mode === "create" ? t("form.user.add_title") : t("form.user.edit_title")}
      fields={userFields}
      form={form}
      onSubmit={onSubmit}
      mode={mode}
      isPending={isCreating || isEditing}
    />
  );
};

export default UserForm;
