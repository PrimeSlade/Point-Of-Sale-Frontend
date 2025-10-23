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
  isTreatment: boolean;
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
  isTreatment,
}: InvoiceFormFieldProps<T>) => {
  const serviceOptions =
    serviceData?.map((data: ServiceData) => ({
      value: data.name,
      label: `${toUpperCase(data.name)} (${data.retailPrice})`,
    })) || [];

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
            {isTreatment && (
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
            )}
          </div>
        </div>

        <div className="border border-[var(--border-color)] rounded-lg overflow-x-auto shadow">
          <div className="grid min-w-270 grid-cols-6 gap-0 bg-[var(--primary-color)] border-b border-[var(--border-color)]">
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
            <div className="p-3 font-semibold text-white border-r border-[var(--border-color)]">
              Discount Price
            </div>
            <div className="p-3 font-semibold text-white text-center">
              Action
            </div>
          </div>

          {fields.map((unitField, index) => (
            <InvoiceItemRow
              key={unitField.id}
              form={form}
              index={index}
              fieldId={unitField.id}
              onRemoveField={onRemoveField}
              fields={fields}
            />
          ))}

          <div className="p-3 bg-[var(--background-color)] flex justify-end gap-3 min-w-270">
            <Button
              type="button"
              onClick={onAddField}
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white cursor-pointer min-w-20"
              size="sm"
            >
              Add
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
