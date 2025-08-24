import { deleteCategoryById, getCategories } from "@/api/categories";
import { getLocations } from "@/api/locations";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import CategoryColumns from "@/components/columns/CategoryColumns";
import CategoryForm from "@/components/forms/wrapper/CategoryForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { DataTable } from "@/components/table/data-table";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CategoryPage = () => {
  const queryClient = useQueryClient();

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
  } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });

  const {
    data: locations,
    isLoading: isFetchingLocations,
    error: fetchLocationsError,
  } = useQuery({
    queryFn: getLocations,
    queryKey: ["locations"],
  });

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

  if (isLoading) return <Loading className="h-150" />;

  const columns = CategoryColumns({
    onDelete: deleteCategoryMutate,
    isDeleting,
    locations,
  });

  return (
    <>
      <Header
        header="Categories"
        className="text-2xl"
        action={
          <>
            {can("create", "Category") && (
              <DialogButton
                name="Add Category"
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
        prompt="Search by names"
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
          title="Error"
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
