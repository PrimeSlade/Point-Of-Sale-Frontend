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
        <div className="mt-3">
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
              <Label htmlFor="r1">Treatment</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="walk-in"
                id="r2"
                className="data-[state=checked]:border-[var(--primary-color)]"
              />
              <Label htmlFor="r2">Walk-In</Label>
            </div>
          </RadioGroup>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceFormField;
