import { useState } from "react";
import {
  type FieldArrayWithId,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ItemAutocomplete from "./ItemAutocomplete";
import type { ItemType } from "@/types/ItemType";
import { useAuth } from "@/hooks/useAuth";
import { calculatePriceWithIncrease } from "@/utils/calcPrice";
import { Button } from "../ui/button";

type InvoiceItemRowProps<T extends FieldValues> = {
  form: UseFormReturn<any>;
  index: number;
  fieldId: string;
  fields: FieldArrayWithId<T>[];
  onRemoveField: (index: number) => void;
};

const InvoiceItemRow = <T extends FieldValues>({
  form,
  index,
  fieldId,
  onRemoveField,
  fields,
}: InvoiceItemRowProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

  const { user } = useAuth();

  const handleItemSelect = (item: ItemType | null) => {
    setSelectedItem(item);

    //might not be needed
    // form.setValue(`invoiceItems.${index}.itemName`, item?.name);
  };

  const handleUnitSelect = (selectedUnitType: string, field: any) => {
    field.onChange(selectedUnitType);

    const selectedUnit = selectedItem?.itemUnits?.find(
      (unit) => unit.unitType === selectedUnitType
    );

    if (selectedUnit && selectedItem) {
      form.setValue(`invoiceItems.${index}.itemId`, selectedItem!.id);
      form.setValue(`invoiceItems.${index}.quantity`, selectedUnit.quantity);
      form.setValue(
        `invoiceItems.${index}.purchasePrice`,
        selectedUnit.purchasePrice
      );
    }
  };

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-6 gap-0 border-b border-[var(--border-color)] last:border-b-0"
      key={fieldId}
    >
      <div className="p-3 border-r border-[var(--border-color)]">
        <FormField
          control={form.control}
          name={`invoiceItems.${index}.itemName`}
          render={({ field }) => (
            <FormItem>
              <ItemAutocomplete
                value={field.value || ""}
                onChange={(value) => {
                  field.onChange(value);
                }}
                field={field}
                onItemSelect={handleItemSelect}
                placeholder="Search items..."
                className="shadow-none p-3"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="p-3 border-r border-[var(--border-color)]">
        <FormField
          control={form.control}
          name={`invoiceItems.${index}.unitType`}
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value}
                onValueChange={(value) => handleUnitSelect(value, field)}
                disabled={!selectedItem?.itemUnits}
              >
                <FormControl>
                  <SelectTrigger className="shadow-none p-3 w-full">
                    <SelectValue
                      placeholder={`${
                        selectedItem?.itemUnits
                          ? "Select a Type"
                          : "No Unit Type"
                      }`}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectedItem?.itemUnits?.map((d, i) => (
                    <SelectItem value={d.unitType} key={i}>
                      {d.unitType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="p-3 border-r border-[var(--border-color)]">
        <FormField
          control={form.control}
          name={`invoiceItems.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Quantity"
                  type="number"
                  className="no-spinner shadow-none p-3"
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
      <div className="p-3 border-r border-[var(--border-color)]">
        <FormField
          control={form.control}
          name={`invoiceItems.${index}.purchasePrice`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Purchase Price"
                  type="number"
                  className="no-spinner shadow-none p-3"
                  {...field}
                  value={calculatePriceWithIncrease(
                    field.value,
                    user!.pricePercent
                  )}
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
      <div className="p-3 border-r border-[var(--border-color)]">
        <FormField
          control={form.control}
          name={`invoiceItems.${index}.discountPrice`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Discount Price"
                  type="number"
                  className="no-spinner shadow-none p-3"
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
      <div className="p-3 flex justify-center items-center">
        <Button
          type="button"
          onClick={() => onRemoveField(index)}
          disabled={fields.length <= 1}
          className="bg-[var(--danger-color)] hover:bg-[var(--danger-color-hover)] text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-[120px]"
          size="sm"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default InvoiceItemRow;
