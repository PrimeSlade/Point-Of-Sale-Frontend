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
  prompt: string;
  showTotalAmount?: boolean;
  totalAmount: number;
};

const ReportDataTable = <TData, TValue>({
  columns,
  data,
  prompt,
  showTotalAmount,
  totalAmount,
}: ReportDataTableProps<TData, TValue>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState("");

  const [date, setDate] = useState<DateRange>({
    startDate: parseDateFromURL(searchParams.get("startDate")),
    endDate: parseDateFromURL(searchParams.get("endDate")),
  });

  //sync pagination, search, and date changes to URL params
  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (date.startDate && date.endDate) {
        newParams.set("startDate", formatDateForURL(date.startDate));
        newParams.set("endDate", formatDateForURL(date.endDate));
      } else {
        newParams.delete("startDate");
        newParams.delete("endDate");
      }

      return newParams;
    });
  }, [paginationState.pageIndex, date]);

  const { data: locations } = useLocations();

  return (
    <div>
      <DataTable
        columns={columns}
        data={data ?? []}
        prompt={prompt}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        pagination
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        locations={locations}
        filter
        filterByDate
        date={date}
        setDate={setDate}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        showTotalAmount={showTotalAmount}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default ReportDataTable;
