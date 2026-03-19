import type { LocationType } from "@/types/LocationType";
import type { PatientData } from "@/types/PatientType";
import { type Dispatch, type SetStateAction, useMemo } from "react";
import z from "zod";
import ReusableFormDialog, { type FieldType } from "../form/ReusableFrom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPatient, editPatientById } from "@/api/patients";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type PatientFormProps = {
  data?: PatientData;
  locationData?: LocationType[];
  mode: "create" | "edit";
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

const gender = ["male", "female"] as const;
const patientStatus = ["new_patient", "follow_up", "post_op"] as const;
const patientCondition = ["disable", "pregnant_woman"] as const;
const department = ["og", "oto", "surgery", "general"] as const;
const patientType = ["in", "out"] as const;

const toOptions = (arr: readonly string[]) => {
  return arr.map((value) => ({
    value,
    label: value
      .split("_")
      .map((v) => v[0].toUpperCase() + v.slice(1))
      .join(" "),
  }));
};

const PatientForm = ({
  data,
  mode,
  open,
  onClose,
  locationData,
}: PatientFormProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  //Tenstack
  const {
    mutate: addPatientMutate,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: addPatient,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success(data?.message);
      form.reset();
      onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: editPatientMutate,
    isPending: isEditing,
    error: editError,
  } = useMutation({
    mutationFn: editPatientById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success(data?.message);
      form.reset();
      onClose(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  //Form
  const formSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, { message: t("form.patient.error.name_min") })
          .max(50, { message: t("form.patient.error.name_max") }),

        gender: z.enum(gender, {
          message: t("form.patient.error.gender_required"),
        }),

        email: z.email().optional(),

        dateOfBirth: z.date({
          message: t("form.patient.error.dob_required"),
        }),

        address: z.string().optional(),

        patientStatus: z.enum(patientStatus, {
          message: t("form.patient.error.status_required"),
        }),

        patientCondition: z.enum(patientCondition, {
          message: t("form.patient.error.condition_required"),
        }),

        patientType: z.enum(patientType, {
          message: t("form.patient.error.type_required"),
        }),

        department: z.enum(department, {
          message: t("form.patient.error.department_required"),
        }),

        locationId: z.number({
          message: t("form.patient.error.location_required"),
        }),

        phoneNumber: z.string().regex(/^\+?[0-9]{9,15}$/, {
          message: t("form.patient.error.phone_invalid"),
        }),
      }),
    [t]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      gender: data?.gender ?? undefined,
      email: data?.email ?? "",
      dateOfBirth: data?.dateOfBirth ? new Date(data?.dateOfBirth) : undefined,
      address: data?.address ?? "",
      patientStatus: data?.patientStatus ?? undefined,
      patientCondition: data?.patientCondition ?? undefined,
      patientType: data?.patientType ?? undefined,
      department: data?.department ?? undefined,
      locationId: data?.location?.id ?? undefined,
      phoneNumber: data?.phoneNumber?.number ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (mode === "create") {
      addPatientMutate(values);
    } else {
      editPatientMutate({ id: data!.id, ...values });
    }
  };

  const patientField = [
    {
      name: "name",
      label: t("form.patient.label.name"),
      placeholder: t("form.patient.placeholder.name"),
    },
    {
      name: "address",
      label: t("form.patient.label.address"),
      placeholder: t("form.patient.placeholder.address"),
      optional: true,
    },
    {
      name: "email",
      label: t("form.patient.label.email"),
      placeholder: t("form.patient.placeholder.email"),
    },
    {
      name: "gender",
      label: t("form.patient.label.gender"),
      placeholder: t("common.action.select_gender"),
      fieldType: "select" as FieldType,
      options: toOptions(gender),
    },
    {
      name: "dateOfBirth",
      label: t("form.patient.label.dob"),
      placeholder: t("form.patient.placeholder.dob"),
      fieldType: "date" as FieldType,
    },
    {
      name: "patientStatus",
      label: t("form.patient.label.status"),
      placeholder: t("common.action.select_status"),
      fieldType: "select" as FieldType,
      options: toOptions(patientStatus),
    },
    {
      name: "patientCondition",
      label: t("form.patient.label.condition"),
      placeholder: t("common.action.select_condition"),
      fieldType: "select" as FieldType,
      options: toOptions(patientCondition),
    },
    {
      name: "patientType",
      label: t("form.patient.label.type"),
      placeholder: t("common.action.select_type"),
      fieldType: "select" as FieldType,
      options: toOptions(patientType),
    },
    {
      name: "department",
      label: t("form.patient.label.department"),
      placeholder: t("common.action.select_department"),
      fieldType: "select" as FieldType,
      options: toOptions(department),
    },
    {
      name: "locationId",
      label: t("form.patient.label.location"),
      placeholder: t("common.action.select_location"),
      fieldType: "select" as FieldType,
      options: locationData!.map((l: LocationType) => ({
        value: l.id,
        label: l.name,
      })),
    },
    {
      name: "phoneNumber",
      label: t("form.patient.label.phone"),
      placeholder: t("form.patient.placeholder.phone"),
    },
  ];

  const isPending = isCreating || isEditing;

  return (
    <ReusableFormDialog
      mode={mode}
      open={open}
      onClose={onClose}
      title={mode === "create" ? t("form.patient.create_title") : t("form.patient.edit_title")}
      fields={patientField}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
};

export default PatientForm;
