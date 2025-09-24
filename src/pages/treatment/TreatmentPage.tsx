import { deleteTreatmentById } from "@/api/treatments";
import { useTreatments } from "@/hooks/useTreatments";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import TreatmentColumns from "@/components/columns/TreatmentColumns";
import Header from "@/components/header/Header";
import { DataTable } from "@/components/table/data-table";
import { useAuth } from "@/hooks/useAuth";
import useDebounce from "@/hooks/useDebounce";
import type { DateRange } from "@/types/TreatmentType";
import { formatDateForURL, parseDateFromURL } from "@/utils/formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const TreatmentPage = () => {
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

  //sync pagination and search changes to URL params
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

  //treatments
  const {
    data,
    isLoading,
    error: fetchTreatmentError,
  } = useTreatments(
    Number(searchParams.get("page") || 1),
    paginationState.pageSize,
    searchParams.get("search") || "",
    parseDateFromURL(searchParams.get("startDate")),
    parseDateFromURL(searchParams.get("endDate"))
  );

  const { mutate: deleteTreatmentMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteTreatmentById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (fetchTreatmentError) {
      setErrorOpen(true);
    }
  }, [fetchTreatmentError]);

  const columns = TreatmentColumns({
    onDelete: deleteTreatmentMutate,
    isDeleting,
    page: paginationState.pageIndex,
  });

  return (
    <div>
      <Header
        header="Treatment Management"
        subHeader="All your treatment records, one place"
        className="text-3xl"
        action={
          <div className="flex gap-2">
            {can("create", "Treatment") && (
              <DialogButton
                name="Register New Treatment"
                openFrom={() => navigate("/dashboard/treatments/add")}
              />
            )}
          </div>
        }
      />
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        prompt="Search by patient names, age or doctor names"
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
      {fetchTreatmentError && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Error"
          description={fetchTreatmentError.message}
          mode={"error"}
        />
      )}
    </div>
  );
};

export default TreatmentPage;
