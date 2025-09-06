import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/api/expenses";

export const useExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });
};