type InvoiceItem = {
  itemId: number;
  itemName: string;
  quantity: number;
  purchasePrice: number;
  discountPrice: number;
  unitType: string;
};

type Invoice = {
  id: string;
  locationId: number;
  treatmentId: number;
  totalAmount: number;
  discountAmount: number;
  paymentMethod: string;
  paymentDescription?: string;
  note?: string;
  invoiceItems: InvoiceItem[];
  createdAt: string;
};

type InvoiceForm = {
  id?: string;
  locationId: number;
  treatmentId: number;
  totalAmount: number;
  discountAmount: number;
  paymentMethod: string;
  paymentDescription?: string;
  note?: string;
  invoiceItems: InvoiceItem[];
};

export type { Invoice, InvoiceForm, InvoiceItem };
