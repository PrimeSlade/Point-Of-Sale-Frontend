import TreatmentBox from "@/components/invocie/InvoieTreatmentBox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ServiceData } from "@/types/ServiceType";
import { useState } from "react";
import { Form, type UseFormReturn } from "react-hook-form";

type InvoiceFormFieldProps<T> = {
  services: ServiceData[] | any;
  form: UseFormReturn<any>;
  onSubmit: (values: T) => void;
  mode?: "create" | "edit";
  isPending?: boolean;
};

const InvoiceFormField = <T,>({
  services,
  form,
  onSubmit,
  mode,
  isPending,
}: InvoiceFormFieldProps<T>) => {
  const [isTreatment, setIsTreatment] = useState(true);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <TreatmentBox />
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default InvoiceFormField;
