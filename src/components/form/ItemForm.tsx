import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
import type { CreateItemProps } from "@/types/ItemType";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { fetchLocations } from "@/api/locations";
import type { LocationType } from "@/types/LocationType";

const ItemForm = ({
  open,
  onClose,
  mode,
  name,
  category,
  exp,
  id,
}: CreateItemProps) => {
  //TenStack
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryFn: fetchLocations,
    queryKey: ["locations"],
  });

  // const {
  //   mutate: addLocationMutate,
  //   isPending: isCreating,
  //   error: createError,
  // } = useMutation({
  //   mutationFn: addLocation,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["locations"] }),
  //       form.reset(),
  //       onClose(false);
  //   },
  // });

  // const {
  //   mutate: editLocationMutate,
  //   isPending: isEditing,
  //   error: editError,
  // } = useMutation({
  //   mutationFn: editLocation,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["locations"] }),
  //       form.reset(),
  //       onClose(false);
  //   },
  // });

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
  ];

  //From
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(50, { message: "Name must be at most 50 characters." }),

    category: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(50, { message: "Name must be at most 50 characters." }),

    exp: z.date({
      message: "Expire date is required.",
    }),

    location: z.enum(locationNames, {
      message: "Please select a valid location.",
    }),

    pricePercent: z
      .number()
      .min(0, { message: "Price percent cannot be less than 0%." })
      .max(100, { message: "Price percent cannot exceed 100%." }),

    // unit: z.enum(unitType, {
    //   message: "Plese select a valid unit",
    // }),

    // quantity: z
    //   .number({
    //     message: "Quantity must be a number",
    //   })
    //   .min(1, { message: "Quantity must be at least 1." }),

    // purchasePrice: z.coerce
    //   .number()
    //   .min(0, { message: "Purchase price cannot be negative." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "" || name,
      category: "" || category,
      exp: "" || exp,
      location: "",
      pricePercent: undefined,
      // unit: "",
      // quantity: undefined,
      // purchasePrice: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // if (mode === "create") {
    //   addLocationMutate(values);
    // } else {
    //   editLocationMutate({ id: id!, input: values });
    // }
    console.log(values);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="exp"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
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
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
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
              {/* <FormField
                control={form.control}
                name="unit"
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
              /> */}

              {/* {createError && (
                <div className="text-[var(--danger-color)] text-center font-medium">
                  {createError.message}
                </div>
              )} */}
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="bg-[var(--danger-color)] hover:bg-[var(--danger-color-hover)]"
                    onClick={() => form.reset()}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  //disabled={isCreating}
                  className="bg-[var(--success-color)] hover:bg-[var(--success-color-hover)]"
                >
                  {mode === "create" ? "Add" : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ItemForm;
