import { deleteDoctorById } from "@/api/doctors";
import { useLocations } from "@/hooks/useLocations";
import { useDoctors } from "@/hooks/useDoctors";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import { useDoctorColumns } from "@/components/columns/DoctorColumns";
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
import { useTranslation } from "react-i18next";

const DoctorPage = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

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

  const columns = useDoctorColumns({
    onDelete: deleteDoctorMutate,
    isDeleting,
    locations,
  });

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  return (
    <>
      <div>
        <Header
          header={t("doctor.management")}
          className="text-3xl"
          subHeader={t("doctor.subHeader")}
          action={
            <div className="flex gap-2">
              {can("create", "Doctor") && (
                <DialogButton
                  name={t("doctor.addNew")}
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
          prompt={t("doctor.searchPlaceholder")}
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
            title={t("common.error")}
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
