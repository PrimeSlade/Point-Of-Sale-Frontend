import { deleteServiceById, getServices } from "@/api/services";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import ServiceColumns from "@/components/columns/ServiceColumns";
import ServiceForm from "@/components/forms/wrapper/ServiceForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { DataTable } from "@/components/table/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ServicePage = () => {
  const queryClient = useQueryClient();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  //client side pagination
  const [globalFilter, setGlobalFilter] = useState("");
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  //tenstack
  const {
    data: services,
    isLoading,
    error: fetchServiceError,
  } = useQuery({
    queryFn: getServices,
    queryKey: ["services"],
  });

  const { mutate: deleteServiceMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteServiceById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const columns = ServiceColumns({
    onDelete: deleteServiceMutate,
    isDeleting,
  });

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  return (
    <div>
      <Header
        header="Service"
        className="text-3xl"
        subHeader="Manage services"
        action={
          <div className="flex gap-2">
            <DialogButton
              name="Add Service"
              icon={<Plus />}
              openFrom={() => setIsFormOpen(true)}
            />
          </div>
        }
      />
      <DataTable
        columns={columns}
        data={services?.data ?? []}
        prompt="Search by names"
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        pagination
        paginationState={paginationState}
        setPaginationState={setPaginationState}
      />
      <ServiceForm open={isFormOpen} onClose={setIsFormOpen} mode="create" />
      {fetchServiceError && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Error"
          description={fetchServiceError.message}
          mode={"error"}
        />
      )}
    </div>
  );
};

export default ServicePage;
