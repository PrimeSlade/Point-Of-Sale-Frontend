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
import type { Invoice, PaymentMethod } from "@/types/InvoiceType";
import InvoiceFormField from "../form/InvoiceFormField";

type InvoiceFormProps = {
  invoiceData?: Invoice;
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

const paymentMethod = ["kpay", "wave", "cash", "others"] as const;

const InvoiceForm = ({ invoiceData, locationData, mode }: InvoiceFormProps) => {
  //TenStack
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //Form
  const itemUnitSchema = z.object({
    itemName: z
      .string()
      .min(2, { message: "Item name must be at least 2 characters." }),

    quantity: z
      .number({
        message: "Quantity must be a number",
      })
      .int({ message: "Quantity must be a whole number" })
      .min(1, { message: "Quantity must be at least 1." }),

    purchasePrice: z
      .number()
      .min(0, { message: "Purchase price cannot be negative." }),

    discountPrice: z
      .number()
      .min(0, { message: "Discount price cannot be negative." })
      .optional(),

    unitType: z.enum(unitType, {
      message: "Please select a valid unit type",
    }),
  });

  const formSchema = z.object({
    treatmentId: z.number({}).optional(),

    locationId: z.number({
      message: "Please select a valid location.",
    }),

    totalAmount: z
      .number()
      .min(0, { message: "Total amount cannot be negative." }),

    discountAmount: z
      .number()
      .min(0, { message: "Discount amount cannot be negative." })
      .optional(),

    paymentMethod: z.enum(paymentMethod, {
      message: "Please select a valid payment method.",
    }),

    paymentDescription: z.string().optional(),

    note: z.string().optional(),

    invoiceItems: z.array(itemUnitSchema).min(1, {
      message: "You must provide at least 1 item.",
    }),

    invoiceService: z
      .array(
        z.object({ id: z.number(), name: z.string(), retailPrice: z.number() })
      )
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      treatmentId: undefined,
      locationId: undefined,
      totalAmount: undefined,
      discountAmount: undefined,
      paymentMethod: "" as PaymentMethod,
      paymentDescription: "",
      note: "",
      invoiceItems: [
        {
          itemName: "",
          quantity: undefined,
          purchasePrice: undefined,
          discountPrice: undefined,
          unitType: undefined,
        },
      ],
      invoiceService: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <InvoiceFormField
      services={[]}
      form={form}
      mode={mode}
      isPending={false}
      onSubmit={onSubmit}
    />
  );
};

export default InvoiceForm;
