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

  //From
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Category name must be at least 2 characters." })
      .max(50, { message: "Category name must be at most 50 characters." }),

    description: z.string().optional(),

    locationId: z.number({
      message: "Please select a valid location.",
    }),

    categoryId: z.number({
      message: "Please select a valid category.",
    }),

    amount: z
      .number({ message: "Please enter a valid amount." })
      .min(0, { message: "Purchase price cannot be negative." }),

    date: z.date({
      message: "Date is required.",
    }),
  });

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
      label: "Name",
      placeholder: "Enter expense",
    },
    {
      name: "categoryId",
      label: "Category",
      placeholder: "Select a Category",
      fieldType: "select" as FieldType,
      options: categoryData?.map((l: CategoryType) => ({
        value: l.id,
        label: l.name,
      })),
    },
    {
      name: "amount",
      label: "Amount",
      placeholder: "Enter amount",
      type: "number" as Types,
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Enter description",
      optional: true,
    },
    {
      name: "locationId",
      label: "Location",
      placeholder: "Select a Location",
      fieldType: "select" as FieldType,
      options: locationData?.map((l: LocationType) => ({
        value: l.id,
        label: l.name,
      })),
    },
    {
      name: "date",
      label: "Date",
      placeholder: "Select a Date",
      fieldType: "date" as FieldType,
    },
  ];

  return (
    <ReusableFormDialog
      open={open}
      onClose={onClose}
      title="Add New Category"
      fields={ExpenseFields}
      form={form}
      onSubmit={onSubmit}
      mode={mode}
      isPending={isCreating || isEditing}
    />
  );
};

export default ExpenseForm;
