import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/api/doctors";

export const useDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
};