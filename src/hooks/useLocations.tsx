import { useQuery } from "@tanstack/react-query";
import { getLocations } from "@/api/locations";

export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });
};