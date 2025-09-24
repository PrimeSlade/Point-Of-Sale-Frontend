import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/api/expenses";

export const useExpenses = (
  pageIndex: number = 0,
  pageSize: number = 15,
  search: string = "",
  startDate?: Date,
  endDate?: Date
) => {
  return useQuery({
    queryKey: ["expenses", pageIndex, pageSize, search, startDate, endDate],
    queryFn: () => getExpenses(pageIndex, pageSize, search, startDate, endDate),
  });
};