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
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import type { ItemType, ItemUnits } from "@/types/ItemType";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { LocationType } from "@/types/LocationType";
import { useFieldArray } from "react-hook-form";
import { addItem, editItemById } from "@/api/inventories";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import InventoryItemForm from "../form/InventoryItemForm";

type ItemFormProps = {
  itemData?: ItemType;
  locationData?: any;
  mode: "create" | "edit";
};

const ItemForm = ({ mode, itemData, locationData }: ItemFormProps) => {
  //TenStack
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //Enum
  const locationNames = locationData
    ? locationData.map((d: LocationType) => d.name)
    : ["Location"];

  const unitType = [
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
      .min(2, { message: "Item name must be at least 2 characters." })
      .max(50, { message: "Item name must be at most 50 characters." }),

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

    description: z.string().optional(),

    itemUnits: z.array(subUnitSchema).length(3, {
      message: "You must provide exactly 3 units.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      expiryDate: undefined,
      description: "",
      locationId: itemData?.location.name || "",
      itemUnits: [
        { unitType: undefined, quantity: undefined, purchasePrice: undefined },
        { unitType: undefined, quantity: undefined, purchasePrice: undefined },
        { unitType: undefined, quantity: undefined, purchasePrice: undefined },
      ],
    },
  });

  useEffect(() => {
    if (mode === "edit" && itemData) {
      form.reset({
        name: itemData.name,
        category: itemData.category,
        expiryDate: itemData.expiryDate
          ? new Date(itemData.expiryDate)
          : undefined,
        description: itemData.description,
        locationId: itemData.location.name,
        itemUnits: itemData.itemUnits,
      });
    }
  }, [mode, itemData]);

  //Tenstack
  const {
    mutate: addItemMutate,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: addItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success(data?.message);
      form.reset();
      navigate("/dashboard/items");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: editItemMutate,
    isPending: isEditing,
    error: editError,
  } = useMutation({
    mutationFn: editItemById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.removeQueries({ queryKey: ["item", itemData!.id] });
      toast.success(data?.message);
      form.reset();
      navigate("/dashboard/items");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { itemUnits, ...item } = values;

    //convert location name to id
    const { id } = locationData.find(
      (d: LocationType) => d.name === item.locationId
    )!;

    item.locationId = id;

    if (mode === "create") {
      addItemMutate({ item, itemUnits });
    } else {
      const itemUnits = itemData?.itemUnits?.map((item: ItemUnits, index) => {
        const newValue = values?.itemUnits[index];
        return {
          id: item.id,
          unitType: newValue?.unitType,
          quantity: newValue?.quantity,
          purchasePrice: newValue?.purchasePrice,
        };
      });

      editItemMutate({ id: itemData!.id, item, itemUnits });
    }
  };

  //for units
  const { fields } = useFieldArray({
    control: form.control,
    name: "itemUnits",
  });

  return (
    <InventoryItemForm
      form={form}
      onSubmit={onSubmit}
      fields={fields}
      locationData={locationData}
      isPending={isCreating || isEditing}
      mode={mode}
    />
  );
};

export default ItemForm;
