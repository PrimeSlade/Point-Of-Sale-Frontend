import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ItemType, ItemUnits } from "@/types/ItemType";
import { useFieldArray } from "react-hook-form";
import { addItem, editItemById } from "@/api/inventories";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { Invoice, PaymentMethod } from "@/types/InvoiceType";
import type { TreatmentData } from "@/types/TreatmentType";
import InvoiceFormField from "../form/InvoiceFormField";
import InvoiceTreatmentBox from "@/components/invoice/InvoiceTreatmentBox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PatientCard from "@/components/patient/PatientCard";
import TreatmentDiagnosisBox from "@/components/treatment/TreatmentDiagnosisBox";
import type { ServiceData } from "@/types/ServiceType";
import type { LocationType } from "@/types/LocationType";

type InvoiceFormProps = {
  invoiceData?: Invoice;
  mode: "create" | "edit";
  serviceData?: ServiceData[];
  locationData?: LocationType[];
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

const InvoiceForm = ({
  mode,
  invoiceData,
  serviceData,
  locationData,
}: InvoiceFormProps) => {
  //TenStack
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //Treatment Selection State
  const [selectedTreatment, setSelectedTreatment] =
    useState<TreatmentData | null>(invoiceData?.treatment || null);
  const [isTreatment, setIsTreatment] = useState(true);

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
    treatmentId: z.number().optional(),

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

  // Update form when treatment is selected
  useEffect(() => {
    if (selectedTreatment) {
      form.setValue("treatmentId", selectedTreatment.id);
    } else {
      form.setValue("treatmentId", undefined);
    }
  }, [selectedTreatment, form]);

  // Clear treatment selection when switching to walk-in
  useEffect(() => {
    if (!isTreatment) {
      setSelectedTreatment(null);
    }
  }, [isTreatment]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  //for units
  const { fields } = useFieldArray({
    control: form.control,
    name: "invoiceItems",
  });

  return (
    <div className="space-y-10">
      <RadioGroup
        value={isTreatment ? "treatment" : "walk-in"}
        onValueChange={(value) =>
          setIsTreatment(value === "treatment" ? true : false)
        }
        className="flex gap-10"
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem
            value="treatment"
            id="r1"
            className=" data-[state=checked]:border-[var(--primary-color)]"
          />
          <Label htmlFor="r1" className="font-bold">
            Treatment
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem
            value="walk-in"
            id="r2"
            className="data-[state=checked]:border-[var(--primary-color)]"
          />
          <Label htmlFor="r2" className="font-bold">
            Walk-In
          </Label>
        </div>
      </RadioGroup>
      {isTreatment && (
        <div className="animate-in slide-in-from-top-2 fade-in duration-300 ease-out">
          <InvoiceTreatmentBox
            selectedTreatment={selectedTreatment}
            onTreatmentSelect={setSelectedTreatment}
          />
        </div>
      )}
      {selectedTreatment && (
        <div className="animate-in slide-in-from-top-2 fade-in duration-300 ease-out space-y-4">
          <PatientCard data={selectedTreatment.patient!} mode="invoice" />
          <TreatmentDiagnosisBox data={selectedTreatment} />
        </div>
      )}

      <InvoiceFormField
        form={form}
        mode={mode}
        isPending={false}
        onSubmit={onSubmit}
        serviceData={serviceData}
        locationData={locationData}
        fields={fields}
      />
    </div>
  );
};

export default InvoiceForm;
