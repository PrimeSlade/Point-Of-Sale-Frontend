import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFieldArray } from "react-hook-form";
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
import { addInvoice } from "@/api/invoice";
import { useAuth } from "@/hooks/useAuth";

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

  //user
  const { user } = useAuth();

  //Form
  const itemUnitSchema = z.object({
    id: z.number(),

    itemName: z.string().min(2, { message: "Please select an item." }),

    quantity: z
      .number({
        message: "Quantity must be a number.",
      })
      .int({ message: "Quantity must be a whole number." })
      .min(1, { message: "Quantity must be at least 1." }),

    purchasePrice: z
      .number({ message: "Purchase price required." })
      .min(0, { message: "Purchase price cannot be negative." }),

    discountPrice: z
      .number()
      .min(0, { message: "Discount price cannot be negative." })
      .optional(),

    unitType: z.enum(unitType, {
      message: "Please select a valid unit type.",
    }),
  });

  const formSchema = z.object({
    treatmentId: z.number().optional(),

    locationId: z.number({
      message: "Please select a valid location.",
    }),

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

    invoiceServices: z
      .array(
        z.object({ id: z.number(), name: z.string(), retailPrice: z.number() })
      )
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      treatmentId: undefined,
      locationId: user?.locationId,
      discountAmount: 0,
      paymentMethod: "" as PaymentMethod,
      paymentDescription: "",
      note: "",
      invoiceItems: [
        {
          id: undefined,
          itemName: "",
          quantity: undefined,
          purchasePrice: undefined,
          discountPrice: 0,
          unitType: undefined,
        },
      ],
      invoiceServices: [],
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

  //Tenstack
  const { mutate: addInvoiceMutate, isPending: isCreating } = useMutation({
    mutationFn: addInvoice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success(data?.message);
      form.reset();
      navigate("/dashboard/invoices");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addInvoiceMutate(values);
  };

  //for units
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invoiceItems",
  });

  const handleAddField = () => {
    append({
      id: undefined as any,
      itemName: "",
      quantity: undefined as any,
      purchasePrice: undefined as any,
      discountPrice: 0,
      unitType: undefined as any,
    });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

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
        isTreatment={isTreatment}
        isPending={isCreating}
        onSubmit={onSubmit}
        serviceData={serviceData}
        locationData={locationData}
        fields={fields}
        onAddField={handleAddField}
        onRemoveField={handleRemoveField}
      />
    </div>
  );
};

export default InvoiceForm;
