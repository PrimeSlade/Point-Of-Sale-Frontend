import { deleteInvoiceById } from "@/api/invoice";
import { useInvoices } from "@/hooks/useInvoices";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import InvoiceColumns from "@/components/columns/InvoiceColumns";
import Header from "@/components/header/Header";
import { DataTable } from "@/components/table/data-table";
import { useAuth } from "@/hooks/useAuth";
import useDebounce from "@/hooks/useDebounce";
import type { DateRange } from "@/types/TreatmentType";
import {
  formatDateForURL,
  parseDateFromURL,
  formatLocalDate,
} from "@/utils/formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const InvoicePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [globalFilter, setGlobalFilter] = useState(
    searchParams.get("search") || ""
  );
  const [errorOpen, setErrorOpen] = useState(false);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: Number(page) - 1 || 0,
    pageSize: 15,
  });
  const [date, setDate] = useState<DateRange>({
    startDate: parseDateFromURL(searchParams.get("startDate")),
    endDate: parseDateFromURL(searchParams.get("endDate")),
  });

  //delay the serach input in order to prevent server traffic
  const debouncedSearch = useDebounce(globalFilter);

  //useAuth
  const { can } = useAuth();

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

      newParams.set("page", String(paginationState.pageIndex + 1));
      return newParams;
    });
  }, [paginationState.pageIndex, debouncedSearch, date]);

  //invoices
  const {
    data,
    isLoading,
    error: fetchInvoiceError,
  } = useInvoices(
    paginationState.pageIndex + 1,
    paginationState.pageSize,
    searchParams.get("search") || "",
    date.startDate ? formatLocalDate(date.startDate) : undefined,
    date.endDate ? formatLocalDate(date.endDate) : undefined
  );

  const { mutate: deleteInvoiceMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteInvoiceById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (fetchInvoiceError) {
      setErrorOpen(true);
    }
  }, [fetchInvoiceError]);

  const columns = InvoiceColumns({
    onDelete: deleteInvoiceMutate,
    isDeleting,
    page: paginationState.pageIndex,
  });

  return (
    <div>
      <Header
        header="Invoice"
        className="text-3xl"
        subHeader="Manage invoices and items"
        action={
          <div className="flex gap-2">
            {can("create", "Invoice") && (
              <DialogButton
                name="Generate Invoice"
                icon={<Plus />}
                openFrom={() => navigate("/dashboard/invoices/add")}
              />
            )}
          </div>
        }
      />
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        prompt="Search by patient names"
        totalPages={data?.meta.totalPages ?? 0}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        pagination
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        serverSideSearch
        filterByDate
        date={date}
        setDate={setDate}
      />
      {fetchInvoiceError && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Error"
          description={fetchInvoiceError.message}
          mode={"error"}
        />
      )}
    </div>
  );
};

export default InvoicePage;
