import { addService, editServiceById } from "@/api/services";
import type { ServiceData } from "@/types/ServiceType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ReusableFormDialog, { type Types } from "../form/ReusableFrom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

type ServiceFormProps = {
  data?: ServiceData;
  mode: "create" | "edit";
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

const ServiceForm = ({ data, mode, open, onClose }: ServiceFormProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

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

  //Form schema
  const formSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, { message: t("form.service.error.name_min") })
          .max(100, { message: t("form.service.error.name_max") }),

        retailPrice: z
          .number()
          .min(0, { message: t("form.service.error.price_negative") }),
      }),
    [t]
  );

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
      label: t("form.service.name_label"),
      placeholder: t("form.service.name_placeholder"),
    },
    {
      name: "retailPrice",
      label: t("form.service.price_label"),
      placeholder: t("form.service.price_placeholder"),
      type: "number" as Types,
    },
  ];

  return (
    <ReusableFormDialog
      open={open}
      onClose={onClose}
      title={t("form.service.add_title")}
      fields={ServiceFields}
      form={form}
      onSubmit={onSubmit}
      mode={mode}
      isPending={isCreating || isEditing}
    />
  );
};

export default ServiceForm;
