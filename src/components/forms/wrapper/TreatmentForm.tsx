import { addTreatment, editTreatmentById } from "@/api/treatments";
import CustomTextarea from "@/components/textarea/TreatmentTextarea";
import PatientDoctorForm from "@/components/treatment/PatientDoctorForm";
import PatientInfo from "@/components/treatment/PatientInfo";
import { Button } from "@/components/ui/button";
import type { DoctorData } from "@/types/DoctorType";
import type { PatientData } from "@/types/PatientType";
import type { TreatmentData } from "@/types/TreatmentType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
import { useTranslation } from "react-i18next";

type TreatmentFormProps = {
  treatmentData?: TreatmentData;
  patientData?: PatientData[];
  doctorData?: DoctorData[];
  mode: "create" | "edit";
};

const TreatmentForm = ({
  patientData,
  doctorData,
  mode,
  treatmentData,
}: TreatmentFormProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(
    null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorData | null>(null);

  //zod - defined inside component via useMemo so it can access t()
  const formSchema = useMemo(
    () =>
      z.object({
        investigation: z.string().optional(),
        diagnosis: z.string().optional(),
        treatment: z
          .string()
          .min(5, {
            message: t("treatment.form.treatmentErrorMin"),
          })
          .max(300, {
            message: t("treatment.form.treatmentErrorMax"),
          }),
      }),
    [t]
  );

  //tenstack
  const {
    mutate: addTreatmentMutate,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: addTreatment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
      toast.success(data?.message);
      form.reset();
      navigate("/dashboard/treatments");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: editTreatmentMutate,
    isPending: isEditing,
    error: editError,
  } = useMutation({
    mutationFn: editTreatmentById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
      toast.success(data?.message);
      form.reset();
      navigate("/dashboard/treatments");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diagnosis: "",
      treatment: "",
      investigation: "",
    },
  });

  //to keep data up to date
  useEffect(() => {
    if (treatmentData) {
      setSelectedPatient(treatmentData?.patient || null);
      setSelectedDoctor(treatmentData?.doctor || null);

      form.reset({
        diagnosis: treatmentData.diagnosis,
        treatment: treatmentData.treatment,
        investigation: treatmentData.investigation || "",
      });
    }
  }, [treatmentData]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedPatient || !selectedDoctor) {
      toast.error(t("treatment.form.errorSelectBoth"));
      return;
    }

    const data = {
      patientId: selectedPatient!.id as number,
      doctorId: selectedDoctor!.id as string, // Assert that selectedDoctor is not null or undefined
      ...values,
    };

    if (mode === "create") {
      addTreatmentMutate(data);
    } else {
      editTreatmentMutate({ id: treatmentData?.id, ...data });
    }
  };

  return (
    <div className="grid grid-cols-3 gap-x-5 mt-5 gap-y-5">
      <div className="col-span-2">
        <PatientDoctorForm<PatientData>
          title={t("treatment.form.selectPatient")}
          btnLabel={t("treatment.form.clickToSelectPatient")}
          dialogTitle={t("treatment.form.dialogSelectPatient")}
          placeholder={t("treatment.form.searchByName")}
          setSelectedPerson={setSelectedPatient}
          data={patientData ?? []}
          selectedPerson={selectedPatient}
          type="Patient"
        />
      </div>
      <div>
        <PatientInfo data={selectedPatient} />
      </div>
      <div className="col-span-2">
        <PatientDoctorForm<DoctorData>
          title={t("treatment.form.assignDoctor")}
          btnLabel={t("treatment.form.clickToSelectDoctor")}
          dialogTitle={t("treatment.form.dialogSelectDoctor")}
          placeholder={t("treatment.form.searchByName")}
          setSelectedPerson={setSelectedDoctor}
          data={doctorData ?? []}
          selectedPerson={selectedDoctor}
          type="Doctor"
        />
      </div>
      {/* FormProvider - A React context provider from React Hook Form that shares form state across nested components without prop drilling, commonly used for complex forms, reusable form components, and custom form libraries like shadcn/ui. */}
      <div className="col-span-2">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="border rounded-xl shadow p-5 flex flex-col gap-3"
          >
            <CustomTextarea
              label="investigation"
              placeholder={t("treatment.form.investigationPlaceholder")}
              title={t("treatment.form.investigationLabel")}
              form={form}
              name="investigation"
              optional
            />
            <CustomTextarea
              label="diagnosis"
              placeholder={t("treatment.form.diagnosisPlaceholder")}
              title={t("treatment.form.diagnosisLabel")}
              form={form}
              name="diagnosis"
              optional
            />
            <CustomTextarea
              label="treatment"
              placeholder={t("treatment.form.treatmentPlaceholder")}
              title={t("treatment.form.treatmentLabel")}
              form={form}
              name="treatment"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-60 flex bg-[var(--success-color)] hover:bg-[var(--success-color-hover)]"
              >
                {mode === "create"
                  ? t("treatment.form.createBtn")
                  : t("treatment.form.updateBtn")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default TreatmentForm;
