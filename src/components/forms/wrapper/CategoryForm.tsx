import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ReusableFormDialog, { type FieldType } from "../form/ReusableFrom";
import type { CategoryType } from "@/types/ExpenseType";
import type { LocationType } from "@/types/LocationType";
import { addCategory, editCategoryById } from "@/api/categories";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

type CategoryFormProps = {
  data?: CategoryType;
  mode: "create" | "edit";
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  locationData: LocationType[];
};

const CategoryForm = ({
  data,
  mode,
  open,
  onClose,
  locationData,
}: CategoryFormProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  //Tenstack
  const {
    mutate: addCategoryMutate,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: addCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data?.message);
      form.reset();
      onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: editCategoryMutate,
    isPending: isEditing,
    error: editError,
  } = useMutation({
    mutationFn: editCategoryById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data?.message);
      form.reset();
      onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  //Form schema
  const formSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, { message: t("form.category.error.name_min") })
          .max(50, { message: t("form.category.error.name_max") }),

        description: z.string().optional(),

        locationId: z.number({
          message: t("form.category.error.location_required"),
        }),
      }),
    [t]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      description: data?.description ?? "",
      locationId: data?.locationId ?? undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (mode === "create") {
      addCategoryMutate(values);
    } else {
      editCategoryMutate({ id: data?.id, ...values });
    }
  };

  const CategoryFields = [
    {
      name: "name",
      label: t("form.category.label.name"),
      placeholder: t("form.category.placeholder.name"),
    },
    {
      name: "description",
      label: t("form.category.label.description"),
      placeholder: t("form.category.placeholder.description"),
      optional: true,
    },
    {
      name: "locationId",
      label: t("form.category.label.location"),
      placeholder: t("common.action.select_location"),
      fieldType: "select" as FieldType,
      options: locationData.map((l: LocationType) => ({
        value: l.id,
        label: l.name,
      })),
    },
  ];

  const title =
    mode === "create"
      ? t("form.category.create_title")
      : t("form.category.edit_title");

  return (
    <ReusableFormDialog
      open={open}
      onClose={onClose}
      title={title}
      fields={CategoryFields}
      form={form}
      onSubmit={onSubmit}
      mode={mode}
      isPending={isCreating || isEditing}
    />
  );
};

export default CategoryForm;
