import InvoiceTreatmentBox from "@/components/invoice/InvoiceTreatmentBox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ServiceData } from "@/types/ServiceType";
import { useEffect, useState } from "react";
import { Form, type UseFormReturn } from "react-hook-form";
import type { TreatmentData } from "@/types/TreatmentType";
import PatientCard from "@/components/patient/PatientCard";
import TreatmentDiagnosisBox from "@/components/treatment/TreatmentDiagnosisBox";
import { MultiSelect } from "@/components/ui/multi-select";
import { Controller } from "react-hook-form";
import { useServices } from "@/hooks/useServices";
import { toUpperCase } from "@/utils/formatText";

type InvoiceFormFieldProps<T> = {
  services: ServiceData[] | any;
  form: UseFormReturn<any>;
  onSubmit: (values: T) => void;
  mode?: "create" | "edit";
  isPending?: boolean;
  selectedTreatment: TreatmentData | null;
  onTreatmentSelect: (treatment: TreatmentData | null) => void;
};

const InvoiceFormField = <T,>({
  services,
  form,
  onSubmit,
  mode,
  isPending,
  selectedTreatment,
  onTreatmentSelect,
}: InvoiceFormFieldProps<T>) => {
  const [isTreatment, setIsTreatment] = useState(true);
  const { data: serviceData } = useServices();

  const serviceOptions =
    serviceData?.data.map((data: ServiceData) => ({
      value: data.name,
      label: `${toUpperCase(data.name)} (${data.retailPrice})`,
    })) || [];

  useEffect(() => {
    if (!isTreatment) {
      onTreatmentSelect(null);
    }
  }, [isTreatment, onTreatmentSelect]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-10">
        <div className="mt-3 flex flex-col gap-10">
          <RadioGroup
            value={isTreatment ? "treatment" : "walk-in"}
            onValueChange={(value) =>
              setIsTreatment(value === "treatment" ? true : false)
            }
            className="flex gap-10"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="treatment"
                id="r1"
                className=" data-[state=checked]:border-[var(--primary-color)]"
              />
              <Label htmlFor="r1" className="font-bold">
                Treatment
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="walk-in"
                id="r2"
                className="data-[state=checked]:border-[var(--primary-color)]"
              />
              <Label htmlFor="r2" className="font-bold">
                Walk-In
              </Label>
            </div>
          </RadioGroup>
          {isTreatment && (
            <div className="animate-in slide-in-from-top-2 fade-in duration-300 ease-out">
              <InvoiceTreatmentBox
                selectedTreatment={selectedTreatment}
                onTreatmentSelect={onTreatmentSelect}
              />
            </div>
          )}
          {selectedTreatment && (
            <div className="animate-in slide-in-from-top-2 fade-in duration-300 ease-out space-y-4">
              <PatientCard data={selectedTreatment.patient!} mode="invoice" />
              <TreatmentDiagnosisBox data={selectedTreatment} />
            </div>
          )}

          <div className="flex flex-col gap-3">
            <label className="font-bold text-xl">Services</label>
            <Controller
              control={form.control}
              name="invoiceService"
              render={({ field }) => (
                <MultiSelect
                  options={serviceOptions}
                  onValueChange={(selectedNames) => {
                    const selectedObjects = selectedNames.map((name) =>
                      serviceData?.data.find(
                        (service: ServiceData) => service.name === name
                      )
                    );
                    field.onChange(selectedObjects);
                  }}
                  defaultValue={
                    field.value?.map((service: ServiceData) => service.name) ||
                    []
                  }
                  responsive={true}
                  placeholder="Select services..."
                />
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceFormField;
