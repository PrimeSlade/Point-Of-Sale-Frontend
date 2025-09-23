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
import type { LocationType } from "@/types/LocationType";
import PaginationBtn from "./PaginationBtn";
import FilterBtn from "./FilterBtn";
import type { DateRange } from "@/types/TreatmentType";
import FilterByDate from "./FilterByDate";

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
  columnFilters?: string;
  setColumnFilters?: React.Dispatch<React.SetStateAction<string>>;
  filterByDate?: boolean;
  date?: DateRange;
  setDate?: React.Dispatch<React.SetStateAction<DateRange>>;
  setSearchParams?: (
    value: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)
  ) => void;
}

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
  columnFilters,
  setColumnFilters,
  filterByDate,
  date,
  setDate,
  setSearchParams,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    getFilteredRowModel: serverSideSearch ? undefined : getFilteredRowModel(), //won't be needed for serverside
    manualPagination: serverSideSearch,
    manualFiltering: serverSideSearch,
    pageCount: totalPages,
    state: {
      pagination: paginationState,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: serverSideSearch
      ? (updater) => {
          const newState =
            typeof updater === "function"
              ? updater(table.getState().pagination)
              : updater;
          setPaginationState?.(newState);

          //For pagination
          setSearchParams?.((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", String(newState.pageIndex + 1));
            return newParams;
          });
        }
      : setPaginationState,
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder={prompt}
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
            if (serverSideSearch) {
              // Reset to first page when search changes
              table.setPageIndex(0);
            }
          }}
          className="max-w-sm"
        />
        {/* undefined for no filtering */}
        {filter && (
          <FilterBtn
            table={table}
            locations={locations}
            serverSideSearch
            setColumnFilters={setColumnFilters}
            columnFilters={columnFilters}
            setSearchParams={setSearchParams}
            setPaginationState={setPaginationState}
          />
        )}
        {filterByDate && date && setDate && (
          <FilterByDate date={date} setDate={setDate} />
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
          <PaginationBtn table={table} />
        </div>
      )}
    </div>
  );
}
