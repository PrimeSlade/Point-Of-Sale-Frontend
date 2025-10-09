import type { LocationType } from "./LocationType";
import type { ServiceData } from "./ServiceType";
import type { TreatmentData } from "./TreatmentType";

type PaymentMethod = "kpay" | "wave" | "cash" | "others";

type InvoiceItem = {
  id: number;
  barcode: string;
  itemName: string;
  quantity: number;
  retailPrice: number;
  discountPrice?: number;
  unitType: string;
};

type InvoiceItemForm = Omit<InvoiceItem, "id" | "retailPrice"> & {
  purchasePrice: number;
};

type Invoice = {
  id: number;
  locationId: number;
  treatmentId: number;
  totalAmount: number;
  totalItemDiscount: number;
  discountAmount: number;
  paymentMethod: PaymentMethod;
  paymentDescription?: string;
  note?: string;
  invoiceItems: InvoiceItem[];
  invoiceServices?: ServiceData[];
  createdAt: string;
  location: LocationType;
  treatment: TreatmentData;
};

type InvoiceForm = {
  id?: number;
  locationId: number;
  treatmentId?: number;
  discountAmount?: number;
  paymentMethod: string;
  paymentDescription?: string;
  note?: string;
  invoiceItems: InvoiceItemForm[];
  invoiceServices?: ServiceData[];
};

export type {
  Invoice,
  InvoiceForm,
  InvoiceItem,
  InvoiceItemForm,
  PaymentMethod,
};
