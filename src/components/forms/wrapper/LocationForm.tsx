import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { addLocation, editLocation } from "@/api/locations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ReusableFormDialog, { type types } from "../form/ReusableFrom";
import type { Dispatch, SetStateAction } from "react";

type CreateLocationProps = {
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
}: CreateLocationProps) => {
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
      .min(2, { message: "Name must be at least 2 characters." })
      .max(50, { message: "Name must be at most 50 characters." }),

    address: z
      .string()
      .min(2, { message: "Address must be at least 2 characters." })
      .max(50, { message: "Address must be at most 50 characters." }),

    phoneNumber: z.string().regex(/^\+?[0-9]{9,15}$/, {
      message:
        "Phone number must contain only digits and be 9–15 characters long.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "" || oldName,
      address: "" || oldAddress,
      phoneNumber: "" || oldPhoneNumber,
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
      label: "Location Name",
      placeholder: "Enter location name",
    },
    { name: "address", label: "Address", placeholder: "Enter address" },
    {
      name: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter phone number",
      type: "tel" as types,
    },
  ];

  return (
    <ReusableFormDialog
      open={open}
      onClose={onClose}
      title="Add New Location"
      fields={locationFields}
      form={form}
      onSubmit={onSubmit}
      mode={mode}
      isPending={isCreating || isEditing}
    />
  );
};

export default LocationForm;
