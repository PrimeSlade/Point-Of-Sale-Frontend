import { addService, editServiceById } from "@/api/services";
import type { ServiceData } from "@/types/ServiceType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ReusableFormDialog, { type Types } from "../form/ReusableFrom";

type ServiceFormProps = {
  data?: ServiceData;
  mode: "create" | "edit";
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

const ServiceForm = ({ data, mode, open, onClose }: ServiceFormProps) => {
  const queryClient = useQueryClient();
  //Tenstack
  const {
    mutate: addServiceMutate,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: addService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success(data?.message);
      form.reset();
      onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: editServiceMutate,
    isPending: isEditing,
    error: editError,
  } = useMutation({
    mutationFn: editServiceById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success(data?.message);
      form.reset(), onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  //From
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Service name must be at least 2 characters." })
      .max(50, { message: "Service name must be at most 50 characters." }),

    retailPrice: z
      .number()
      .min(0, { message: "Reatail price cannot be negative." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      retailPrice: data?.retailPrice ?? undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (mode === "create") {
      addServiceMutate(values);
    } else {
      editServiceMutate({ id: data?.id, ...values });
    }
  };

  const ServiceFields = [
    {
      name: "name",
      label: "Service Name",
      placeholder: "Enter service name",
    },
    {
      name: "retailPrice",
      label: "Retail Price",
      placeholder: "Enter retail price",
      type: "number" as Types,
    },
  ];

  return (
    <ReusableFormDialog
      open={open}
      onClose={onClose}
      title="Add New Service"
      fields={ServiceFields}
      form={form}
      onSubmit={onSubmit}
      mode={mode}
      isPending={isCreating || isEditing}
    />
  );
};

export default ServiceForm;
