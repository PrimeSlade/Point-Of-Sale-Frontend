import useDebounce from "@/hooks/useDebounce";
import type { DateRange } from "@/types/TreatmentType";
import { formatDateForURL, parseDateFromURL } from "@/utils/formatDate";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataTable } from "../table/data-table";
import { useLocations } from "@/hooks/useLocations";

type ReportDataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  prompt: string;
  showTotalAmount?: boolean;
  totalAmount: number;
};

const ReportDataTable = <TData, TValue>({
  columns,
  data,
  totalPages,
  prompt,
  showTotalAmount,
  totalAmount,
}: ReportDataTableProps<TData, TValue>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: Number(page) - 1 || 0,
    pageSize: 15,
  });

  const [globalFilter, setGlobalFilter] = useState(
    searchParams.get("search") || ""
  );
  const [columnFilters, setColumnFilters] = useState(
    searchParams.get("filter") || ""
  );
  const [date, setDate] = useState<DateRange>({
    startDate: parseDateFromURL(searchParams.get("startDate")),
    endDate: parseDateFromURL(searchParams.get("endDate")),
  });

  //delay the serach input in order to prevent server traffic
  const debouncedSearch = useDebounce(globalFilter);

  //sync pagination, search, and date changes to URL params
  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (debouncedSearch) {
        newParams.set("search", debouncedSearch);
      } else {
        newParams.delete("search");
      }

      if (date.startDate && date.endDate) {
        newParams.set("startDate", formatDateForURL(date.startDate));
        newParams.set("endDate", formatDateForURL(date.endDate));
      } else {
        newParams.delete("startDate");
        newParams.delete("endDate");
      }

      if (columnFilters && columnFilters !== "__all") {
        newParams.set("filter", columnFilters);
      } else {
        newParams.delete("filter");
      }

      newParams.set("page", String(paginationState.pageIndex + 1));
      return newParams;
    });
  }, [paginationState.pageIndex, debouncedSearch, date, columnFilters]);

  const { data: locations } = useLocations();

  return (
    <div>
      <DataTable
        columns={columns}
        data={data ?? []}
        prompt={prompt}
        totalPages={totalPages ?? 0}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        pagination
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        serverSideSearch
        filterByDate
        locations={locations}
        date={date}
        setDate={setDate}
        filter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        showTotalAmount={showTotalAmount}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default ReportDataTable;
