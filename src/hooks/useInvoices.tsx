import { useQuery } from "@tanstack/react-query";
import { getInvoices, getInvoiceById, getReportInvoices } from "@/api/invoice";

export const useInvoices = (
  pageIndex: number = 0,
  pageSize: number = 15,
  search: string = "",
  startDate?: Date,
  endDate?: Date,
  filter?: string
) => {
  return useQuery({
    queryKey: [
      "invoices",
      pageIndex,
      pageSize,
      search,
      startDate,
      endDate,
      filter,
    ],
    queryFn: () =>
      getInvoices(pageIndex, pageSize, search, startDate, endDate, filter),
  });
};

export const useInvoice = (id: number | string | undefined) => {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(Number(id)),
    enabled: Boolean(id),
  });
};

export const useReportInvoices = (startDate?: Date, endDate?: Date) => {
  return useQuery({
    queryKey: ["invoices", startDate, endDate],
    queryFn: () => getReportInvoices(startDate!, endDate!),
    enabled: Boolean(startDate && endDate),
  });
};
