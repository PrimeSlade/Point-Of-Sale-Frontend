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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { LocationType } from "@/types/LocationType";
import Loading from "../loading/Loading";
import PaginationBtn from "./PaginationBtn";
import { useNavigate } from "react-router-dom";
import FilterBtn from "./FilterBtn";

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
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: serverSideSearch ? undefined : getFilteredRowModel(), //won't be needed for serverside
    manualPagination: true,
    manualFiltering: serverSideSearch,
    pageCount: totalPages,
    state: {
      pagination: paginationState,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    // onPaginationChange: setPaginationState,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;
      setPaginationState?.(newState);
      navigate(`/dashboard/items?page=${newState.pageIndex + 1}`);
    },
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
          <FilterBtn
            table={table}
            locations={locations}
            serverSideSearch
            setColumnFilters={setColumnFilters}
          />
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
