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
};

const FilterBtn = <TData,>({
  table,
  setColumnFilters,
  serverSideSearch,
  locations,
  columnFilters,
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
          table.setPageIndex(0);
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
