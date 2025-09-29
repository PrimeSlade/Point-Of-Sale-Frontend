import { useQuery } from "@tanstack/react-query";
import { getExpenses, getReportExpenses } from "@/api/expenses";

export const useExpenses = (
  pageIndex: number = 0,
  pageSize: number = 15,
  search: string = "",
  startDate?: Date,
  endDate?: Date,
  filter?: string
) => {
  return useQuery({
    queryKey: ["expenses", pageIndex, pageSize, search, startDate, endDate, filter],
    queryFn: () => getExpenses(pageIndex, pageSize, search, startDate, endDate, filter),
  });
};

export const useReportExpenses = (startDate?: Date, endDate?: Date) => {
  return useQuery({
    queryKey: ["expenses", startDate, endDate],
    queryFn: () => getReportExpenses(startDate!, endDate!),
    enabled: Boolean(startDate && endDate),
  });
};