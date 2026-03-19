import { deleteCategoryById } from "@/api/categories";
import { useCategories } from "@/hooks/useCategories";
import { useLocations } from "@/hooks/useLocations";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import { useCategoryColumns } from "@/components/columns/CategoryColumns";
import CategoryForm from "@/components/forms/wrapper/CategoryForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { DataTable } from "@/components/table/data-table";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const CategoryPage = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  //client side filtering
  const [globalFilter, setGlobalFilter] = useState("");
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  //useAuth
  const { can } = useAuth();

  //tenstack
  const {
    data: categories,
    isLoading: isFetchingCategories,
    error: fetchCategoriesError,
  } = useCategories();

  const {
    data: locations,
    isLoading: isFetchingLocations,
    error: fetchLocationsError,
  } = useLocations();

  const { mutate: deleteCategoryMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteCategoryById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const isLoading = isFetchingCategories || isFetchingLocations;
  const fetchError = fetchCategoriesError || fetchLocationsError;

  useEffect(() => {
    if (fetchError) {
      setErrorOpen(true);
    }
  }, [fetchError]);

  const columns = useCategoryColumns({
    onDelete: deleteCategoryMutate,
    isDeleting,
    locations,
  });

  if (isLoading) return <Loading className="h-150" />;

  return (
    <>
      <Header
        header={t("category.management")}
        className="text-2xl"
        action={
          <>
            {can("create", "Category") && (
              <DialogButton
                name={t("category.addNew")}
                icon={<Plus />}
                openFrom={() => setIsFormOpen(true)}
              />
            )}
          </>
        }
      />
      <DataTable
        columns={columns}
        data={categories.data ?? []}
        prompt={t("category.searchPlaceholder")}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        pagination
        paginationState={paginationState}
        setPaginationState={setPaginationState}
      />
      {fetchError && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title={t("common.error")}
          description={fetchError.message}
          mode={"error"}
        />
      )}
      <CategoryForm
        locationData={locations}
        mode="create"
        open={isFormOpen}
        onClose={setIsFormOpen}
      />
    </>
  );
};

export default CategoryPage;
