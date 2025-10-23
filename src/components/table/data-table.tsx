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
import ExcelBtn from "./ExcelBtn";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  prompt: string;
  filter?: boolean;
  pagination?: boolean;
  excel?: boolean;
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
  serverSidePagination?: boolean;
  columnFilters?: string;
  setColumnFilters?: React.Dispatch<React.SetStateAction<string>>;
  filterByDate?: boolean;
  date?: DateRange;
  setDate?: React.Dispatch<React.SetStateAction<DateRange>>;
  showTotalAmount?: boolean;
  totalAmount?: number;
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
  excel = false,
  globalFilter,
  setGlobalFilter,
  columnFilters,
  setColumnFilters,
  filterByDate,
  date,
  setDate,
  showTotalAmount = false,
  totalAmount,
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
        }
      : setPaginationState,
  });

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center py-4 gap-3">
        <div className="w-130 flex gap-3">
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
            />
          )}
        </div>
        {filterByDate && date && setDate && (
          <div className="lg:ml-auto">
            <FilterByDate
              date={date}
              setDate={setDate}
              table={table}
              serverSideSearch={serverSideSearch}
            />
          </div>
        )}
        {excel && (
          <div className="lg:ml-auto">
            <ExcelBtn />
          </div>
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
        {showTotalAmount && (
          <div className="flex border-t">
            <div className="p-2 px-5 font-bold w-[75%] border-r">
              Total Amount
            </div>
            <div className="p-2 w-[20%] font-bold">{totalAmount ?? 0}</div>
          </div>
        )}
      </div>
      {pagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <PaginationBtn table={table} />
        </div>
      )}
    </div>
  );
}
