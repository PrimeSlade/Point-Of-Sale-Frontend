import { useQuery } from "@tanstack/react-query";
import { getTreatments, getTreatmentById } from "@/api/treatments";

export const useTreatments = (
  pageIndex: number = 0,
  pageSize: number = 15,
  search: string = "",
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    queryKey: ["treatments", pageIndex, pageSize, search, startDate, endDate],
    queryFn: () => getTreatments(pageIndex, pageSize, search, startDate, endDate),
  });
};

export const useTreatment = (id: number | string | undefined) => {
  return useQuery({
    queryKey: ["treatment", id],
    queryFn: () => getTreatmentById(Number(id)),
    enabled: Boolean(id),
  });
};