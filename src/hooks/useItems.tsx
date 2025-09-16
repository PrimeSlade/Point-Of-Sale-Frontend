import { useQuery } from "@tanstack/react-query";
import { getItems, getItemById } from "@/api/inventories";

export const useItems = (
  pageIndex: number = 0,
  pageSize: number = 15,
  search: string = "",
  filter: string = "__all",
  shouldFetch: boolean = true
) => {
  return useQuery({
    queryKey: ["items", pageIndex, pageSize, search, filter],
    queryFn: () => getItems(pageIndex, pageSize, search, filter),
    enabled: shouldFetch,
  });
};

export const useItem = (id: number | string | undefined) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(Number(id)),
    enabled: Boolean(id),
  });
};
