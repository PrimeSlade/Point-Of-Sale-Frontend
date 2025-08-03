import type { LocationType } from "@/types/LocationType";
import type { PatientData } from "@/types/PatientType";
import { type Dispatch, type SetStateAction } from "react";
import z from "zod";
import ReusableFormDialog, { type FieldType } from "../form/ReusableFrom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPatient, editPatientById } from "@/api/patients";
import { toast } from "sonner";

type PatientFormProps = {
  data?: PatientData;
  locationData?: any;
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

  //Enum
  const locationNames = locationData
    ? locationData.map((d: LocationType) => d.name)
    : ["Location"];

  //From
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(50, { message: "Name must be at most 50 characters." }),

    gender: z.enum(gender, {
      message: "Please select a gender.",
    }),

    dateOfBirth: z.date({
      message: "Date of birth is required.",
    }),

    address: z.string().optional(),

    patientStatus: z.enum(patientStatus, {
      message: "Please select a valid patient status.",
    }),

    patientCondition: z.enum(patientCondition, {
      message: "Please select a valid patient condition.",
    }),

    patientType: z.enum(patientType, {
      message: "Please select a valid patient type.",
    }),

    department: z.enum(department, {
      message: "Please select a department.",
    }),

    locationId: z.enum(locationNames, {
      message: "Please select a location.",
    }),

    phoneNumber: z.string().regex(/^\+?[0-9]{9,15}$/, {
      message:
        "Phone number must contain only digits and be 9–15 characters long.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      gender: data?.gender ?? undefined,
      dateOfBirth: data ? new Date(data?.dateOfBirth) : undefined,
      address: data?.address ?? "",
      patientStatus: data?.patientStatus ?? undefined,
      patientCondition: data?.patientCondition ?? undefined,
      patientType: data?.patientType ?? undefined,
      department: data?.department ?? undefined,
      locationId: data?.location?.name ?? "",
      phoneNumber: data?.phoneNumber?.number ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { id } = locationData.find(
      (d: LocationType) => d.name === values.locationId
    )!;

    values.locationId = id;

    if (mode === "create") {
      addPatientMutate(values);
    } else {
      editPatientMutate({ id: data!.id, ...values });
    }
  };

  const patientField = [
    {
      name: "name",
      label: "Patient Name",
      placeholder: "Enter a patient name",
    },
    { name: "address", label: "Address", placeholder: "Enter address" },
    {
      name: "gender",
      label: "Gender",
      placeholder: "Select a Gender",
      fieldType: "select" as FieldType,
      options: toOptions(gender),
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      placeholder: "Select a Birthdate",
      fieldType: "date" as FieldType,
    },
    {
      name: "patientStatus",
      label: "Patient Status",
      placeholder: "Select a Status",
      fieldType: "select" as FieldType,
      options: toOptions(patientStatus),
    },
    {
      name: "patientCondition",
      label: "Patient Condition",
      placeholder: "Select a Condition",
      fieldType: "select" as FieldType,
      options: toOptions(patientCondition),
    },
    {
      name: "patientType",
      label: "Patient Type",
      placeholder: "Select a Type",
      fieldType: "select" as FieldType,
      options: toOptions(patientType),
    },
    {
      name: "department",
      label: "Department",
      placeholder: "Select a Department",
      fieldType: "select" as FieldType,
      options: toOptions(department),
    },
    {
      name: "locationId",
      label: "Location",
      placeholder: "Select a Location",
      fieldType: "select" as FieldType,
      options: locationNames.map((l: string) => ({ value: l, label: l })),
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
      title="Add New Patient"
      fields={patientField}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
};

export default PatientForm;
