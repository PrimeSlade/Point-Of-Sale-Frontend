import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import type {
  ColumnFiltersState,
  FilterFn,
  OnChangeFn,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { LocationType } from "@/types/LocationType";
import { Button } from "../ui/button";
import Loading from "../loading/Loading";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  prompt: string;
  filter?: boolean;
  pagination?: boolean;
  locations?: LocationType[];
  totalPages?: number;
  paginationState?: {
    pageIndex: number;
    pageSize: number;
  };
  setPaginationState?: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  serverSideSearch?: boolean;
  isLoading?: boolean;
  columnFilters?: string;
  setColumnFilters?: React.Dispatch<React.SetStateAction<string>>;
}

const globalFuzzyFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const value = row.getValue(columnId);
  return String(value).toLowerCase().includes(filterValue.toLowerCase());
};

export function DataTable<TData, TValue>({
  columns,
  data,
  prompt,
  filter,
  locations,
  totalPages,
  paginationState,
  setPaginationState,
  pagination = false,
  serverSideSearch = false,
  globalFilter,
  setGlobalFilter,
  isLoading,
  setColumnFilters,
}: DataTableProps<TData, TValue>) {
  console.log(serverSideSearch);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: serverSideSearch ? undefined : getFilteredRowModel(), //won't be needed for serverside
    globalFilterFn: serverSideSearch ? undefined : globalFuzzyFilter,
    manualPagination: true,
    manualFiltering: serverSideSearch,
    pageCount: totalPages,
    state: {
      pagination: paginationState,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPaginationState,
    // (updater) => {
    //   const newState =
    //     typeof updater === "function"
    //       ? updater(table.getState().pagination)
    //       : updater;
    //   setPaginationState?.(newState);
    // },
  });

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder={prompt}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        {/* undefined for no filtering */}
        {filter && (
          <Select
            value={
              (table.getColumn("location")?.getFilterValue() as string) ||
              "__all"
            }
            onValueChange={(value) => {
              if (serverSideSearch) {
                setColumnFilters?.(value);
              }
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
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
