import type { LocationType } from "@/types/LocationType";
import type { DoctorData } from "@/types/DoctorType";
import { type Dispatch, type SetStateAction, useMemo } from "react";
import z from "zod";
import ReusableFormDialog, { type FieldType, type Types } from "../form/ReusableFrom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoctor, editDoctorById } from "@/api/doctors";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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

  const formSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, { message: t("doctor.form.nameErrorMin") })
          .max(50, { message: t("doctor.form.nameErrorMax") }),

        email: z.email({ message: t("doctor.form.emailError") }),

        commission: z
          .float64({ message: t("doctor.form.commissionError") })
          .min(0, { message: t("doctor.form.commissionNegative") }),

        address: z.string().optional(),

        description: z.string().optional(),

        locationId: z.number({ message: t("doctor.form.locationError") }),

        phoneNumber: z.string().regex(/^\+?[0-9]{9,15}$/, {
          message: t("doctor.form.phoneError"),
        }),
      }),
    [t]
  );

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
      label: t("doctor.form.nameLabel"),
      placeholder: t("doctor.form.namePlaceholder"),
    },
    {
      name: "email",
      label: t("doctor.form.emailLabel"),
      placeholder: t("doctor.form.emailPlaceholder"),
      type: "email" as Types,
    },
    {
      name: "commission",
      label: t("doctor.form.commissionLabel"),
      placeholder: t("doctor.form.commissionPlaceholder"),
      type: "number" as Types,
    },
    {
      name: "address",
      label: t("doctor.form.addressLabel"),
      placeholder: t("doctor.form.addressPlaceholder"),
      optional: true,
    },
    {
      name: "description",
      label: t("doctor.form.descriptionLabel"),
      placeholder: t("doctor.form.descriptionPlaceholder"),
      optional: true,
    },
    {
      name: "locationId",
      label: t("doctor.form.locationLabel"),
      placeholder: t("doctor.form.locationPlaceholder"),
      fieldType: "select" as FieldType,
      options: locationData!.map((l: LocationType) => ({
        value: l.id,
        label: l.name,
      })),
    },
    {
      name: "phoneNumber",
      label: t("doctor.form.phoneLabel"),
      placeholder: t("doctor.form.phonePlaceholder"),
    },
  ];

  const isPending = isCreating || isEditing;

  return (
    <ReusableFormDialog
      mode={mode}
      open={open}
      onClose={onClose}
      title={mode === "create" ? t("doctor.addNew") : t("doctor.edit")}
      fields={doctorFields}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
};

export default DoctorForm;
