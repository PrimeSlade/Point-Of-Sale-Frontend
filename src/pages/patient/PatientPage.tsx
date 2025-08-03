import { fetchLocations } from "@/api/locations";
import { deletePatientById, fetchPatients } from "@/api/patients";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import PatientColums from "@/components/columns/PatientColumns";
import PatientForm from "@/components/forms/wrapper/PatientForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { DataTable } from "@/components/table/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PatientPage = () => {
  const queryClient = useQueryClient();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  const {
    data: patients,
    isLoading: isFetchingPatients,
    error: fetchPatientError,
  } = useQuery({
    queryFn: fetchPatients,
    queryKey: ["patients"],
  });

  const {
    data: locations,
    isLoading: isFetchingLocations,
    error: fetchLocationError,
  } = useQuery({
    queryFn: fetchLocations,
    queryKey: ["locations"],
  });

  const { mutate: deletePatientMutate, isPending: isDeleting } = useMutation({
    mutationFn: deletePatientById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const columns = PatientColums({
    onDelete: deletePatientMutate,
    isDeleting,
  });

  const isLoading = isFetchingPatients || isFetchingLocations;

  if (isLoading) return <Loading className="h-150" />;

  return (
    <>
      <div>
        <Header
          header="Patient Management"
          className="text-3xl"
          subHeader="Manage patient records and information"
          action={
            <div className="flex gap-2">
              <DialogButton
                name="Add New Patient"
                icon={<Plus />}
                openFrom={() => setIsFormOpen(true)}
              />
            </div>
          }
        />
        <DataTable
          columns={columns}
          data={patients.data ?? []}
          prompt="Search by names or phone numbers"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          pagination
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
        {fetchPatientError && (
          <AlertBox
            open={errorOpen}
            onClose={() => setErrorOpen(false)}
            title="Error"
            description={fetchPatientError.message}
            mode={"error"}
          />
        )}
      </div>
      <PatientForm
        data={patients?.data}
        locationData={locations}
        mode="create"
        open={isFormOpen}
        onClose={setIsFormOpen}
      />
    </>
  );
};

export default PatientPage;
