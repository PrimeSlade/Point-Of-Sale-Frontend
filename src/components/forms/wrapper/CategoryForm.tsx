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
  });

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
      label: "Service Name",
      placeholder: "Enter service name",
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
      options: locationData.map((l: LocationType) => ({
        value: l.id,
        label: l.name,
      })),
    },
  ];

  return (
    <ReusableFormDialog
      open={open}
      onClose={onClose}
      title="Add New Category"
      fields={CategoryFields}
      form={form}
      onSubmit={onSubmit}
      mode={mode}
      isPending={isCreating || isEditing}
    />
  );
};

export default CategoryForm;
