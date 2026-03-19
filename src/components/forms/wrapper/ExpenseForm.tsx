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
import type { CategoryType, ExpenseType } from "@/types/ExpenseType";
import type { LocationType } from "@/types/LocationType";
import { addExpense, editExpenseById } from "@/api/expenses";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

type ExpenseFormProps = {
  data?: ExpenseType;
  mode: "create" | "edit";
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  locationData: LocationType[];
  categoryData: CategoryType[];
};

const ExpenseForm = ({
  data,
  mode,
  open,
  onClose,
  locationData,
  categoryData,
}: ExpenseFormProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  //Tenstack
  const {
    mutate: addExpenseMutate,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: addExpense,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success(data?.message);
      form.reset();
      onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: editExpenseMutate,
    isPending: isEditing,
    error: editError,
  } = useMutation({
    mutationFn: editExpenseById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
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
          .min(2, { message: t("form.expense.error.name_min") })
          .max(50, { message: t("form.expense.error.name_max") }),

        description: z.string().optional(),

        locationId: z.number({
          message: t("form.expense.error.location_required"),
        }),

        categoryId: z.number({
          message: t("form.expense.error.category_required"),
        }),

        amount: z
          .number({ message: t("form.expense.error.amount_invalid") })
          .min(0, { message: t("form.expense.error.amount_negative") }),

        date: z.date({
          message: t("form.expense.error.date_required"),
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
      categoryId: data?.categoryId ?? undefined,
      amount: Number(data?.amount) ?? undefined,
      date: data?.date ? new Date(data?.date) : undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (mode === "create") {
      addExpenseMutate(values);
    } else {
      editExpenseMutate({ id: data?.id, ...values });
    }
  };

  const ExpenseFields = [
    {
      name: "name",
      label: t("form.expense.label.name"),
      placeholder: t("form.expense.placeholder.name"),
    },
    {
      name: "categoryId",
      label: t("form.expense.label.category"),
      placeholder: t("common.action.select_category"),
      fieldType: "select" as FieldType,
      options: categoryData?.map((l: CategoryType) => ({
        value: l.id,
        label: l.name,
      })),
    },
    {
      name: "amount",
      label: t("form.expense.label.amount"),
      placeholder: t("form.expense.placeholder.amount"),
      type: "number" as Types,
    },
    {
      name: "description",
      label: t("form.expense.label.description"),
      placeholder: t("form.expense.placeholder.description"),
      optional: true,
    },
    {
      name: "locationId",
      label: t("form.expense.label.location"),
      placeholder: t("common.action.select_location"),
      fieldType: "select" as FieldType,
      options: locationData?.map((l: LocationType) => ({
        value: l.id,
        label: l.name,
      })),
    },
    {
      name: "date",
      label: t("form.expense.label.date"),
      placeholder: t("common.pickDate"),
      fieldType: "date" as FieldType,
    },
  ];

  const title =
    mode === "create"
      ? t("form.expense.create_title")
      : t("form.expense.edit_title");

  return (
    <ReusableFormDialog
      open={open}
      onClose={onClose}
      title={title}
      fields={ExpenseFields}
      form={form}
      onSubmit={onSubmit}
      mode={mode}
      isPending={isCreating || isEditing}
    />
  );
};

export default ExpenseForm;
