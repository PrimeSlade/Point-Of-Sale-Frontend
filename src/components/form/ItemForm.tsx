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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { EditItemUnits, ItemFormProps } from "@/types/ItemType";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { fetchLocations } from "@/api/locations";
import type { LocationType } from "@/types/LocationType";
import { useFieldArray } from "react-hook-form";
import { addItem, editItemById } from "@/api/inventories";
import { useNavigate } from "react-router-dom";

const ItemForm = ({
  mode,
  oldName,
  oldCategory,
  oldExpiryDate,
  itemId,
  oldItemUnits,
  oldPricePercent,
  oldDescription,
  oldLocation,
}: ItemFormProps) => {
  //TenStack
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryFn: fetchLocations,
    queryKey: ["locations"],
  });

  //Enum
  const locationNames = data
    ? data.map((d: LocationType) => d.name)
    : ["Location"];

  const unitType = [
    "btl",
    "amp",
    "tube",
    "strip",
    "cap",
    "pcs",
    "sac",
    "box",
    "pkg",
    "tab",
  ] as const;

  //Form
  const subUnitSchema = z.object({
    unitType: z.enum(unitType, {
      message: "Plese select a valid unit",
    }),

    quantity: z
      .number({
        message: "Quantity must be a number",
      })
      .int({ message: "Quantity must be a whole number" })
      .min(1, { message: "Quantity must be at least 1." }),

    purchasePrice: z
      .number()
      .min(0, { message: "Purchase price cannot be negative." }),
  });

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(50, { message: "Name must be at most 50 characters." }),

    category: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(50, { message: "Name must be at most 50 characters." }),

    expiryDate: z.date({
      message: "Expire date is required.",
    }),

    locationId: z.enum(locationNames, {
      message: "Please select a valid location.",
    }),

    pricePercent: z
      .number()
      .min(0, { message: "Price percent cannot be less than 0%." })
      .max(100, { message: "Price percent cannot exceed 100%." }),

    description: z.string().optional(),

    itemUnits: z.array(subUnitSchema).length(3, {
      message: "You must provide exactly 3 units.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: oldName || "",
      category: oldCategory || "",
      expiryDate: oldExpiryDate || undefined,
      locationId: oldLocation || "",
      pricePercent: oldPricePercent || undefined,
      description: oldDescription || "",
      itemUnits: oldItemUnits || [
        {
          unitType: undefined,
          quantity: undefined,
          purchasePrice: undefined,
        },
        {
          unitType: undefined,
          quantity: undefined,
          purchasePrice: undefined,
        },
        {
          unitType: undefined,
          quantity: undefined,
          purchasePrice: undefined,
        },
      ],
    },
  });

  //Tenstack
  const {
    mutate: addItemMutate,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      form.reset();
      navigate("/dashboard/items");
    },
  });

  const {
    mutate: editItemMutate,
    isPending: isEditing,
    error: editError,
  } = useMutation({
    mutationFn: editItemById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      form.reset();
      navigate("/dashboard/items");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { itemUnits, ...item } = values;

    //convert location name to id
    const { id } = data.find((d: LocationType) => d.name === item.locationId);
    item.locationId = id;

    if (mode === "create") {
      addItemMutate({ item, itemUnits });
    } else {
      const itemUnits = oldItemUnits?.map((item: EditItemUnits, index) => {
        const newValue = values?.itemUnits[index];
        return {
          id: item.id,
          unitType: newValue?.unitType,
          quantity: newValue?.quantity,
          purchasePrice: newValue?.purchasePrice,
        };
      });

      editItemMutate({ id: itemId!, item, itemUnits });
    }
  };

  console.log(oldItemUnits);

  const error = createError || editError;

  //for units
  const { fields } = useFieldArray({
    control: form.control,
    name: "itemUnits",
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[80%] mx-auto mt-20 border rounded-2xl shadow p-10"
        >
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Item Name" {...field} />
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
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Category" {...field} />
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
                    <FormLabel>Expire Date</FormLabel>
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
                              format(field.value, "P")
                            ) : (
                              <span>Pick a date</span>
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
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.map((d: LocationType) => (
                          <SelectItem value={d.name} key={d.id}>
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
                name="pricePercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Percent %</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Price Percent"
                        type="number"
                        className="no-spinner"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Units */}
            {fields.map((field, index) => (
              <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                key={field.id}
              >
                <FormField
                  control={form.control}
                  name={`itemUnits.${index}.unitType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Types</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" w-full min-w-[150px]">
                            <SelectValue placeholder="Select a Type" />
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
                  name={`itemUnits.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantitiy</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Quantity"
                          type="number"
                          className="no-spinner"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
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
                      <FormLabel>Purchase Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Price"
                          type="number"
                          className="no-spinner"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
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

          {error && (
            <div className="text-[var(--danger-color)] text-center font-medium">
              {error.message}
            </div>
          )}
          <div className="flex gap-3 justify-end">
            <Button
              type="submit"
              disabled={isCreating}
              className="bg-[var(--success-color)] hover:bg-[var(--success-color-hover)]"
            >
              {mode === "create" ? "Add" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ItemForm;
