import type { LocationType } from "@/types/LocationType";
import type { DoctorData } from "@/types/DoctorType";
import { type Dispatch, type SetStateAction } from "react";
import z from "zod";
import ReusableFormDialog, { type FieldType, type Types } from "../form/ReusableFrom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoctor, editDoctorById } from "@/api/doctors";
import { toast } from "sonner";

type DoctorFormProps = {
  data?: DoctorData;
  locationData?: LocationType[];
  mode: "create" | "edit";
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

const DoctorForm = ({
  data,
  mode,
  open,
  onClose,
  locationData,
}: DoctorFormProps) => {
  const queryClient = useQueryClient();

  const {
    mutate: addDoctorMutate,
    isPending: isCreating,
  } = useMutation({
    mutationFn: addDoctor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success(data?.message);
      form.reset();
      onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: editDoctorMutate,
    isPending: isEditing,
  } = useMutation({
    mutationFn: editDoctorById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success(data?.message);
      form.reset();
      onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(50, { message: "Name must be at most 50 characters." }),

    email: z.email({ message: "Please enter a valid email address." }),

    commission: z
      .number({ message: "Commission must be a valid number." })
      .min(0, { message: "Commission cannot be negative." }),

    address: z.string().optional(),

    description: z.string().optional(),

    locationId: z.number({ message: "Please select a valid location." }),

    phoneNumber: z.string().regex(/^\+?[0-9]{9,15}$/, {
      message:
        "Phone number must contain only digits and be 9–15 characters long.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      email: data?.email ?? "",
      commission: data?.commission ?? undefined,
      address: data?.address ?? "",
      description: data?.description ?? "",
      locationId: data?.location?.id ?? undefined,
      phoneNumber: data?.phoneNumber?.number ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (mode === "create") {
      addDoctorMutate(values);
    } else {
      editDoctorMutate({ id: data!.id, ...values });
    }
  };

  const doctorFields = [
    {
      name: "name",
      label: "Doctor Name",
      placeholder: "Enter doctor name",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter doctor email",
      type: "email" as Types,
    },
    {
      name: "commission",
      label: "Commission (%)",
      placeholder: "Enter commission percentage",
      type: "number" as Types,
    },
    {
      name: "address",
      label: "Address",
      placeholder: "Enter address",
      optional: true,
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
      options: locationData!.map((l: LocationType) => ({
        value: l.id,
        label: l.name,
      })),
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter phone number",
    },
  ];

  const isPending = isCreating || isEditing;

  return (
    <ReusableFormDialog
      mode={mode}
      open={open}
      onClose={onClose}
      title={mode === "create" ? "Add New Doctor" : "Edit Doctor"}
      fields={doctorFields}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
};

export default DoctorForm;
