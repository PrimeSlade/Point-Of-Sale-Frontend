import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Table } from "@tanstack/react-table";
import type { LocationType } from "@/types/LocationType";

type Props<TData> = {
  table: Table<TData>;
  setColumnFilters?: React.Dispatch<React.SetStateAction<string>>;
  serverSideSearch?: boolean;
  locations?: LocationType[];
  columnFilters?: string;
  setSearchParams?: (
    value: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)
  ) => void;
  setPaginationState?: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
};

const FilterBtn = <TData,>({
  table,
  setColumnFilters,
  serverSideSearch,
  locations,
  columnFilters,
  setSearchParams,
  setPaginationState,
}: Props<TData>) => {
  return (
    <Select
      value={
        serverSideSearch
          ? columnFilters || "__all"
          : (table.getColumn("location")?.getFilterValue() as string) || "__all"
      }
      onValueChange={(value) => {
        if (serverSideSearch) {
          setColumnFilters?.(value);

          //Reset pagination to first page
          setPaginationState?.((prev) => ({
            ...prev,
            pageIndex: 0,
          }));

          // table.setPageIndex(0);

          // Update URL params directly
          setSearchParams?.((prev) => {
            const newParams = new URLSearchParams(prev);
            if (value && value !== "__all") {
              newParams.set("filter", value);
            } else {
              newParams.delete("filter");
            }
            newParams.set("page", "1");
            return newParams;
          });
        }

        //set input lv value
        table
          .getColumn("location")
          ?.setFilterValue(value === "__all" ? undefined : value);
      }}
    >
      <SelectTrigger className="ml-auto">
        <SelectValue placeholder="Select location" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="__all">All Locations</SelectItem>
        {locations?.map((loc: any) => (
          <SelectItem key={loc.name} value={loc.name}>
            {loc.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterBtn;
