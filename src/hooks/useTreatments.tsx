import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getTreatments,
  getTreatmentById,
  getTreatmentByCursor,
} from "@/api/treatments";

export const useTreatments = (
  pageIndex: number = 0,
  pageSize: number = 15,
  search: string = "",
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    queryKey: ["treatments", pageIndex, pageSize, search, startDate, endDate],
    queryFn: () =>
      getTreatments(pageIndex, pageSize, search, startDate, endDate),
  });
};

export const useTreatment = (id: number | string | undefined) => {
  return useQuery({
    queryKey: ["treatment", id],
    queryFn: () => getTreatmentById(Number(id)),
    enabled: Boolean(id),
  });
};

export const useTreatmentsByCursor = (
  limit: 15,
  patientName: string = "",
  doctorName: string = "",
  location: string = ""
) => {
  return useInfiniteQuery({
    queryKey: ["treatments", location, patientName, doctorName, limit],
    queryFn: ({ pageParam }) =>
      getTreatmentByCursor(pageParam, limit, patientName, doctorName, location),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta?.nextCursor,
  });
};
