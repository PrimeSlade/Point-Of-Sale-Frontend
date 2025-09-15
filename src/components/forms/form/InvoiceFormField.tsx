import type { ServiceData } from "@/types/ServiceType";
import {
  Form,
  type FieldArrayWithId,
  type FieldValues,
  type UseFormReturn,
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
};

const InvoiceFormField = <T extends FieldValues>({
  form,
  onSubmit,
  mode,
  isPending,
  serviceData,
  locationData,
  fields,
}: InvoiceFormFieldProps<T>) => {
  const serviceOptions =
    serviceData?.map((data: ServiceData) => ({
      value: data.name,
      label: `${toUpperCase(data.name)} (${data.retailPrice})`,
    })) || [];

  return (
    <Form {...form}>
      <div className="space-y-4 mb-10">
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
                    Location
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
                <div>
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
                </div>
              )}
            />
          </div>
        </div>
        {fields.map((unitField, index) => (
          <div
            className="grid grid-cols-1 lg:grid-cols-4 gap-3"
            key={unitField.id}
          >
            <Controller
              control={form.control}
              name={`invoiceItems.${index}.itemName`}
              render={({ field }) => (
                <div>
                  <label className="text-md">Name</label>
                  <Input placeholder="Item Name" {...field} />
                </div>
              )}
            />
            <Controller
              control={form.control}
              name={`invoiceItems.${index}.unitType`}
              render={({ field }) => (
                <div>
                  <label>
                    <span>
                      Unit Type
                      <span className="text-[var(--danger-color)]">*</span>
                    </span>
                  </label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className=" w-full min-w-[150px]">
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
                </div>
              )}
            />

            {/* <FormField
              control={form.control}
              name={`itemUnits.${index}.rate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>
                      Rate
                      <span className="text-[var(--danger-color)]">*</span>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rate"
                      type="number"
                      className="no-spinner"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Controller
              control={form.control}
              name={`itemUnits.${index}.quantity`}
              render={({ field }) => (
                <div>
                  <label>
                    <span>
                      Quantity
                      <span className="text-[var(--danger-color)]">*</span>
                    </span>
                  </label>

                  <Input
                    placeholder="Quantity"
                    type="number"
                    className="no-spinner"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />
                </div>
              )}
            />
            <Controller
              control={form.control}
              name={`itemUnits.${index}.quantity`}
              render={({ field }) => (
                <div>
                  <label>
                    <span>
                      Price
                      <span className="text-[var(--danger-color)]">*</span>
                    </span>
                  </label>

                  <Input
                    placeholder="Quantity"
                    type="number"
                    className="no-spinner"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />
                </div>
              )}
            />
            {/* <FormField
              control={form.control}
              name={`itemUnits.${index}.purchasePrice`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>
                      Purchase Price
                      <span className="text-[var(--danger-color)]">*</span>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Price"
                      type="number"
                      className="no-spinner"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          disabled={isPending}
          onClick={form.handleSubmit(onSubmit)}
          className="bg-[var(--success-color)] hover:bg-[var(--success-color-hover)]"
        >
          {mode === "create" ? "Generate Invoice" : "Update Invoice"}
        </Button>
      </div>
    </Form>
  );
};

export default InvoiceFormField;
