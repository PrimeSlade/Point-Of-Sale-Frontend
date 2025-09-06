import { useQuery } from "@tanstack/react-query";
import { getPatients, getPatientById } from "@/api/patients";

export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
};

export const usePatient = (id: number | string | undefined) => {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatientById(Number(id)),
    enabled: Boolean(id),
  });
};