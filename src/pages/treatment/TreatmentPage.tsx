import { deleteTreatmentById, getTreatments } from "@/api/treatments";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import TreatmentColumns from "@/components/columns/TreatmentColumns";
import Header from "@/components/header/Header";
import { DataTable } from "@/components/table/data-table";
import useDebounce from "@/hooks/useDebounce";
import type { DateRange } from "@/types/TreatmentType";
import { formatLocalDate } from "@/utils/formatDate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const TreatmentPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [globalFilter, setGlobalFilter] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [date, setDate] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  //delay the serach input in order to prevent server traffic
  const debouncedSearch = useDebounce(globalFilter);

  //reset the page when the search result is displayed
  useEffect(() => {
    setPaginationState((prev) => ({
      ...prev,
      pageIndex: 0, // reset to first page
    }));
    if (debouncedSearch || (data?.startDate && data?.endDate)) {
      setSearchParams({ page: "1" });
    }
  }, [debouncedSearch, date.startDate && date.endDate]);

  //saved the page for reloading
  useEffect(() => {
    setPaginationState((prev) => ({
      ...prev,
      pageIndex: Number(page) - 1,
    }));
  }, []);

  //treatments
  const {
    data,
    isLoading,
    error: fetchTreatmentError,
  } = useQuery({
    queryFn: () =>
      getTreatments(
        paginationState.pageIndex + 1,
        paginationState.pageSize,
        debouncedSearch,
        date.startDate ? formatLocalDate(date.startDate) : undefined,
        date.endDate ? formatLocalDate(date.endDate) : undefined
      ),
    queryKey: [
      "treatments",
      paginationState.pageIndex,
      debouncedSearch,
      date.startDate,
      date.endDate,
    ],
  });

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
            <DialogButton
              name="Register New Treatment"
              openFrom={() => navigate("/dashboard/treatments/add")}
            />
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
        navigateTo="/dashboard/treatments"
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
