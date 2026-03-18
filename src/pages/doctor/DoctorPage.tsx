import { deleteDoctorById } from "@/api/doctors";
import { useLocations } from "@/hooks/useLocations";
import { useDoctors } from "@/hooks/useDoctors";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import DoctorColumns from "@/components/columns/DoctorColumns";
import DoctorForm from "@/components/forms/wrapper/DoctorForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { DataTable } from "@/components/table/data-table";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DoctorPage = () => {
  const queryClient = useQueryClient();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const [globalFilter, setGlobalFilter] = useState("");
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  const { can } = useAuth();

  const {
    data: doctors,
    isLoading: isFetchingDoctors,
    error: fetchDoctorError,
  } = useDoctors();

  const {
    data: locations,
    isLoading: isFetchingLocations,
    error: fetchLocationError,
  } = useLocations();

  const { mutate: deleteDoctorMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteDoctorById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const isLoading = isFetchingDoctors || isFetchingLocations;

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  const columns = DoctorColumns({
    onDelete: deleteDoctorMutate,
    isDeleting,
    locations,
  });

  return (
    <>
      <div>
        <Header
          header="Doctor Management"
          className="text-3xl"
          subHeader="Manage doctor records and information"
          action={
            <div className="flex gap-2">
              {can("create", "Doctor") && (
                <DialogButton
                  name="Add New Doctor"
                  icon={<Plus />}
                  openFrom={() => setIsFormOpen(true)}
                />
              )}
            </div>
          }
        />
        <DataTable
          columns={columns}
          data={doctors?.data ?? []}
          prompt="Search by names, emails or phone numbers"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          pagination
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
        {fetchDoctorError && (
          <AlertBox
            open={errorOpen}
            onClose={() => setErrorOpen(false)}
            title="Error"
            description={fetchDoctorError.message}
            mode={"error"}
          />
        )}
      </div>
      <DoctorForm
        locationData={locations}
        mode="create"
        open={isFormOpen}
        onClose={setIsFormOpen}
      />
    </>
  );
};

export default DoctorPage;
