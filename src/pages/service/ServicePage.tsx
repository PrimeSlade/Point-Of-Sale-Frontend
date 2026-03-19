import { deleteServiceById } from "@/api/services";
import { useServices } from "@/hooks/useServices";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import { useServiceColumns } from "@/components/columns/ServiceColumns";
import ServiceForm from "@/components/forms/wrapper/ServiceForm";
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

const ServicePage = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  //client side pagination
  const [globalFilter, setGlobalFilter] = useState("");
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  //useAuth
  const { can } = useAuth();

  //tenstack
  const {
    data: services,
    isLoading,
    error: fetchServiceError,
  } = useServices();

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

  const columns = useServiceColumns({
    onDelete: deleteServiceMutate,
    isDeleting,
  });

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  return (
    <div>
      <Header
        header={t("service.management")}
        className="text-3xl"
        subHeader={t("service.subHeader")}
        action={
          <div className="flex gap-2">
            {can("create", "Service") && (
              <DialogButton
                name={t("service.addNew")}
                icon={<Plus />}
                openFrom={() => setIsFormOpen(true)}
              />
            )}
          </div>
        }
      />
      <DataTable
        columns={columns}
        data={services?.data ?? []}
        prompt={t("service.searchPlaceholder")}
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
          title={t("common.error")}
          description={fetchServiceError.message}
          mode={"error"}
        />
      )}
    </div>
  );
};

export default ServicePage;
