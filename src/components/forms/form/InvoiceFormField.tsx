import type { ServiceData } from "@/types/ServiceType";
import {
  Form,
  type FieldArrayWithId,
  type FieldValues,
  type UseFormReturn,
  type UseFieldArrayReturn,
} from "react-hook-form";
import { MultiSelect } from "@/components/ui/multi-select";
import { Controller } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { unitType } from "./InventoryItemForm";

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

  return (
    <Form {...form}>
      <div className="space-y-5 mb-5">
        <div className="mt-3 flex flex-row gap-3">
          <div className="flex flex-col gap-1 w-1/2">
            <Controller
              control={form.control}
              name="locationId"
              render={({ field, fieldState }) => (
                <>
                  <label
                    className={`text-md font-semibold ${
                      fieldState.error ? "text-[var(--danger-color)]" : ""
                    }`}
                  >
                    Invoice Location
                    <span className="text-[var(--danger-color)]">*</span>
                  </label>
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(val) =>
                      field.onChange(val ? Number(val) : 0)
                    }
                  >
                    <SelectTrigger
                      className={`w-full ${
                        fieldState.error
                          ? "border-[var(--danger-color)] focus:border-[var(--danger-color)] focus:ring-[var(--danger-color)]"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Select a Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationData?.map((d: LocationType) => (
                        <SelectItem value={String(d.id)} key={d.id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-sm text-[var(--danger-color)]">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <Controller
              control={form.control}
              name="invoiceService"
              render={({ field }) => (
                <>
                  <label className="text-md font-semibold">Services</label>
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
                </>
              )}
            />
          </div>
        </div>

        <div className="border border-[var(--border-color)] rounded-lg overflow-hidden shadow">
          {/* Table Header */}
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
              Purchase Price
            </div>
            <div className="p-3 font-semibold text-white">Discount Price</div>
          </div>

          {/* Table Rows */}
          {fields.map((unitField, index) => (
            <div
              className="grid grid-cols-1 lg:grid-cols-5 gap-0 border-b border-[var(--border-color)] last:border-b-0"
              key={unitField.id}
            >
              <div className="p-3 border-r border-[var(--border-color)]">
                <Controller
                  control={form.control}
                  name={`invoiceItems.${index}.itemName`}
                  render={({ field }) => (
                    <Input
                      placeholder="Item Name"
                      {...field}
                      className="border-0 shadow-none p-3"
                    />
                  )}
                />
              </div>
              <div className="p-3 border-r border-[var(--border-color)]">
                <Controller
                  control={form.control}
                  name={`invoiceItems.${index}.unitType`}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="border-0 shadow-none p-3 w-full">
                        <SelectValue placeholder="Select a Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {unitType?.map((d, i) => (
                          <SelectItem value={d} key={i}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="p-3 border-r border-[var(--border-color)]">
                <Controller
                  control={form.control}
                  name={`invoiceItems.${index}.quantity`}
                  render={({ field }) => (
                    <Input
                      placeholder="Quantity"
                      type="number"
                      className="no-spinner border-0 shadow-none p-3"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  )}
                />
              </div>
              <div className="p-3 border-r border-[var(--border-color)]">
                <Controller
                  control={form.control}
                  name={`invoiceItems.${index}.purchasePrice`}
                  render={({ field }) => (
                    <Input
                      placeholder="Purchase Price"
                      type="number"
                      className="no-spinner border-0 shadow-none p-3"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  )}
                />
              </div>
              <div className="p-3">
                <Controller
                  control={form.control}
                  name={`invoiceItems.${index}.discountPrice`}
                  render={({ field }) => (
                    <Input
                      placeholder="Discount Price"
                      type="number"
                      className="no-spinner border-0 shadow-none p-3"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  )}
                />
              </div>
            </div>
          ))}

          {/* Table Footer with Add/Remove Buttons */}
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
