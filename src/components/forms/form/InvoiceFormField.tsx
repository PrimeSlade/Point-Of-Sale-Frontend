import type { ServiceData } from "@/types/ServiceType";
import {
  type FieldArrayWithId,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { toUpperCase } from "@/utils/formatText";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LocationType } from "@/types/LocationType";
import InvoiceItemRow from "@/components/invoice/InvoiceItemRow";
import { useEffect } from "react";
import PaymentCard from "@/components/invoice/PaymentCard";

type InvoiceFormFieldProps<T extends FieldValues> = {
  form: UseFormReturn<any>;
  fields: FieldArrayWithId<T>[];
  onSubmit: (values: T) => void;
  mode?: "create" | "edit";
  isPending?: boolean;
  serviceData?: ServiceData[];
  locationData?: LocationType[];
  onAddField: () => void;
  onRemoveField: (index: number) => void;
};

const InvoiceFormField = <T extends FieldValues>({
  form,
  onSubmit,
  mode,
  isPending,
  serviceData,
  locationData,
  fields,
  onAddField,
  onRemoveField,
}: InvoiceFormFieldProps<T>) => {
  const serviceOptions =
    serviceData?.map((data: ServiceData) => ({
      value: data.name,
      label: `${toUpperCase(data.name)} (${data.retailPrice})`,
    })) || [];

  useEffect(() => {
    const currentFormItems = form.getValues("invoiceItems") || [];
    //to prevent data inconsistency clena up after each row operation
    if (currentFormItems.length > fields.length) {
      // Items were removed, update form to match current fields
      const updatedItems = currentFormItems.slice(0, fields.length);
      form.setValue("invoiceItems", updatedItems);
    }
  }, [fields.length, form]);

  return (
    <Form {...form}>
      <div className="space-y-5 mb-5">
        <div className="mt-3 flex flex-row gap-3">
          <div className="flex flex-col gap-1 w-1/2">
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">
                    <span>
                      Invoice Location
                      <span className="text-[var(--danger-color)]">*</span>
                    </span>
                  </FormLabel>

                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(val) =>
                      field.onChange(val ? Number(val) : 0)
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="w-full" size="md">
                        <SelectValue placeholder="Select a Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locationData?.map((d: LocationType) => (
                        <SelectItem value={String(d.id)} key={d.id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <FormField
              control={form.control}
              name="invoiceServices"
              render={({ field }) => (
                <FormItem>
                  <label className="text-md font-semibold">Services</label>
                  <FormControl>
                    <MultiSelect
                      options={serviceOptions}
                      onValueChange={(selectedNames) => {
                        const selectedObjects = selectedNames.map((name) =>
                          serviceData?.find(
                            (service: ServiceData) => service.name === name
                          )
                        );
                        field.onChange(selectedObjects);
                      }}
                      defaultValue={
                        field.value?.map(
                          (service: ServiceData) => service.name
                        ) || []
                      }
                      responsive={true}
                      placeholder="Select services..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border border-[var(--border-color)] rounded-lg overflow-hidden shadow">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-[var(--primary-color)] border-b border-[var(--border-color)]">
            <div className="p-3 font-semibold text-white border-r border-[var(--border-color)]">
              Name
            </div>
            <div className="p-3 font-semibold text-white border-r border-[var(--border-color)]">
              Unit Type
            </div>
            <div className="p-3 font-semibold text-white border-r border-[var(--border-color)]">
              Quantity
            </div>
            <div className="p-3 font-semibold text-white border-r border-[var(--border-color)]">
              Retail Price
            </div>
            <div className="p-3 font-semibold text-white">Discount Price</div>
          </div>

          {fields.map((unitField, index) => (
            <InvoiceItemRow
              key={unitField.id}
              form={form}
              index={index}
              fieldId={unitField.id}
            />
          ))}

          <div className="p-3 bg-[var(--background-color)] flex justify-end gap-3">
            <Button
              type="button"
              onClick={onAddField}
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white cursor-pointer"
              size="sm"
            >
              Add
            </Button>
            <Button
              type="button"
              onClick={() => onRemoveField(fields.length - 1)}
              disabled={fields.length <= 1}
              className="bg-[var(--danger-color)] hover:bg-[var(--danger-color-hover)] text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              size="sm"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      <PaymentCard form={form} />
      <div className="flex justify-end gap-3 mb-5">
        <Button
          type="button"
          disabled={isPending}
          onClick={form.handleSubmit(onSubmit)}
          className="bg-[var(--success-color)] hover:bg-[var(--success-color-hover)] cursor-pointer"
        >
          {mode === "create" ? "Generate Invoice" : "Update Invoice"}
        </Button>
      </div>
    </Form>
  );
};

export default InvoiceFormField;
