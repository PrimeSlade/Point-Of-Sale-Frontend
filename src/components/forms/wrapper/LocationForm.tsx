import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { addLocation, editLocation } from "@/api/locations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ReusableFormDialog, { type Types } from "../form/ReusableFrom";
import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

type LocationFormProps = {
  id?: number;
  oldName?: string;
  oldAddress?: string;
  oldPhoneNumber?: string;
  mode: "create" | "edit";
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

const LocationForm = ({
  open,
  onClose,
  mode,
  oldName,
  oldAddress,
  oldPhoneNumber,
  id,
}: LocationFormProps) => {
  const { t } = useTranslation();
  //TenStack
  const queryClient = useQueryClient();

  const {
    mutate: addLocationMutate,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: addLocation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["locations"] }),
        toast.success(data?.message);
      form.reset(), onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: editLocationMutate,
    isPending: isEditing,
    error: editError,
  } = useMutation({
    mutationFn: editLocation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["locations"] }),
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
      .min(2, { message: t("form.location.error.name_min") })
      .max(50, { message: t("form.location.error.name_max") }),

    address: z
      .string()
      .min(2, { message: t("form.location.error.address_min") })
      .max(50, { message: t("form.location.error.address_max") }),

    phoneNumber: z.string().regex(/^\+?[0-9]{9,15}$/, {
      message: t("form.location.error.phone_invalid"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: oldName ?? "",
      address: oldAddress ?? "",
      phoneNumber: oldPhoneNumber ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (mode === "create") {
      addLocationMutate(values);
    } else {
      editLocationMutate({ id: id!, input: values });
    }
  };

  const locationFields = [
    {
      name: "name",
      label: t("form.location.name_label"),
      placeholder: t("form.location.name_placeholder"),
    },
    {
      name: "address",
      label: t("form.location.address_label"),
      placeholder: t("form.location.address_placeholder"),
    },
    {
      name: "phoneNumber",
      label: t("form.location.phone_label"),
      placeholder: t("form.location.phone_placeholder"),
    },
  ];

  return (
    <ReusableFormDialog
      open={open}
      onClose={onClose}
      title={t("form.location.add_title")}
      fields={locationFields}
      form={form}
      onSubmit={onSubmit}
      mode={mode}
      isPending={isCreating || isEditing}
    />
  );
};

export default LocationForm;
