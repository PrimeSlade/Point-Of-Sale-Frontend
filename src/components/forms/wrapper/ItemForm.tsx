import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ItemType, ItemUnits } from "@/types/ItemType";
import { useFieldArray } from "react-hook-form";
import { addItem, editItemById } from "@/api/inventories";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import InventoryItemForm from "../form/InventoryItemForm";
import { useTranslation } from "react-i18next";

type ItemFormProps = {
  itemData?: ItemType;
  locationData?: any;
  mode: "create" | "edit";
};

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

const ItemForm = ({ mode, itemData, locationData }: ItemFormProps) => {
  const { t } = useTranslation();
  //TenStack
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //Form
  const subUnitSchema = z.object({
    unitType: z.enum(unitType, {
      message: t("form.item.error.unit_required"),
    }),

    rate: z.number({
      message: t("form.item.error.rate_number"),
    }),

    quantity: z
      .number({
        message: t("form.item.error.quantity_number"),
      })
      .int({ message: t("form.item.error.quantity_whole") })
      .min(0, { message: t("form.item.error.quantity_negative") }),

    purchasePrice: z
      .number()
      .min(0, { message: t("form.item.error.price_negative") }),
  });

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: t("form.item.error.name_min") })
      .max(50, { message: t("form.item.error.name_max") }),

    category: z
      .string()
      .min(2, { message: t("form.item.error.category_min") })
      .max(50, { message: t("form.item.error.category_max") }),

    expiryDate: z.date({
      message: t("form.item.error.expiry_date_required"),
    }),

    locationId: z.number({
      message: t("form.item.error.location_required"),
    }),

    description: z.string().optional(),

    itemUnits: z.array(subUnitSchema).length(3, {
      message: t("form.item.error.units_length"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      expiryDate: undefined,
      description: "",
      locationId: itemData?.location.id ?? undefined,
      itemUnits: [
        {
          unitType: undefined,
          rate: undefined,
          quantity: undefined,
          purchasePrice: undefined,
        },
        {
          unitType: undefined,
          rate: undefined,
          quantity: undefined,
          purchasePrice: undefined,
        },
        {
          unitType: undefined,
          rate: undefined,
          quantity: undefined,
          purchasePrice: undefined,
        },
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
        locationId: itemData.location.id,
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
      //queryClient.invalidateQueries({ queryKey: ["item", itemData!.id] }); //won't be needed for now since I am not staying in this page after edited
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
          rate: newValue?.rate,
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
