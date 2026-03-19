import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { LocationType } from "@/types/LocationType";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type {
  FieldArrayWithId,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { formatDate } from "@/utils/formatDate";
import { useTranslation } from "react-i18next";

export const unitType = [
  "pkg",
  "box",
  "strip",
  "btl",
  "amp",
  "tube",
  "sac",
  "cap",
  "tab",
  "pcs",
] as const;

type InventoryItemFormProps<T extends FieldValues> = {
  form: UseFormReturn<any>;
  onSubmit: (values: T) => void;
  fields: FieldArrayWithId<T>[];
  locationData: LocationType[];
  isPending: boolean;
  mode?: "create" | "edit";
};

const InventoryItemForm = <T extends FieldValues>({
  form,
  onSubmit,
  fields,
  locationData,
  isPending,
  mode,
}: InventoryItemFormProps<T>) => {
  const { t } = useTranslation();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full lg:w-[80%] mx-auto lg:mt-20 lg:border rounded-2xl lg:shadow p-4 md:p-10"
      >
        <div className="flex flex-col gap-6 min-w-[600px] lg:min-w-0">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>
                      {t("form.inventory.itemName")}
                      <span className="text-[var(--danger-color)]">*</span>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.inventory.itemName")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>
                      {t("form.inventory.category")}
                      <span className="text-[var(--danger-color)]">*</span>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.inventory.category")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>
                      {t("form.inventory.expiryDate")}
                      <span className="text-[var(--danger-color)]">*</span>
                    </span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value)
                          ) : (
                            <span>{t("common.pickDate")}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        captionLayout="dropdown"
                        fromYear={1900}
                        toYear={new Date().getFullYear() + 10}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>
                      {t("common.location")}
                      <span className="text-[var(--danger-color)]">*</span>
                    </span>
                  </FormLabel>
                  <Select
                    value={field.value?.toString() ?? ""}
                    onValueChange={(val) => {
                      field.onChange(Number(val));
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("common.selectLocation")} />
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common.description")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("common.description")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Units */}
          {fields.map((unitField, index) => (
            <div className="grid grid-cols-4 gap-3" key={unitField.id}>
              <FormField
                control={form.control}
                name={`itemUnits.${index}.unitType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>
                        {t("form.inventory.unitType")}
                        <span className="text-[var(--danger-color)]">*</span>
                      </span>
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className=" w-full min-w-[100px]">
                          <SelectValue placeholder={t("form.inventory.selectUnitType")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {unitType?.map((d, i) => (
                          <SelectItem value={d} key={i}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`itemUnits.${index}.rate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>
                        {t("form.inventory.rate")}
                        <span className="text-[var(--danger-color)]">*</span>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.inventory.rate")}
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
              />
              <FormField
                control={form.control}
                name={`itemUnits.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>
                        {t("common.quantity")}
                        <span className="text-[var(--danger-color)]">*</span>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("common.quantity")}
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
              />
              <FormField
                control={form.control}
                name={`itemUnits.${index}.purchasePrice`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>
                        {t("form.inventory.purchasePrice")}
                        <span className="text-[var(--danger-color)]">*</span>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("common.price")}
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
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-[var(--success-color)] hover:bg-[var(--success-color-hover)]"
          >
            {mode === "create" ? t("action.add") : t("action.saveChanges")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InventoryItemForm;
