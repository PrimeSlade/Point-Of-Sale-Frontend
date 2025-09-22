import type { LocationType } from "./LocationType";
import type { ServiceData } from "./ServiceType";
import type { TreatmentData } from "./TreatmentType";

type PaymentMethod = "kpay" | "wave" | "cash" | "others";

type InvoiceItem = {
  id: number;
  itemName: string;
  quantity: number;
  purchasePrice: number;
  discountPrice?: number;
  unitType: string;
};

type Invoice = {
  id: number;
  locationId: number;
  treatmentId: number;
  totalAmount: number;
  discountAmount: number;
  paymentMethod: PaymentMethod;
  paymentDescription?: string;
  note?: string;
  invoiceItems: InvoiceItem[];
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
  invoiceItems: InvoiceItem[];
  invoiceServices?: ServiceData[];
};

export type { Invoice, InvoiceForm, InvoiceItem, PaymentMethod };
