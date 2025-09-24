import { useQuery } from "@tanstack/react-query";
import { getInvoices, getInvoiceById } from "@/api/invoice";

export const useInvoices = (
  pageIndex: number = 0,
  pageSize: number = 15,
  search: string = "",
  startDate?: Date,
  endDate?: Date
) => {
  return useQuery({
    queryKey: ["invoices", pageIndex, pageSize, search, startDate, endDate],
    queryFn: () => getInvoices(pageIndex, pageSize, search, startDate, endDate),
  });
};

export const useInvoice = (id: number | string | undefined) => {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(Number(id)),
    enabled: Boolean(id),
  });
};
