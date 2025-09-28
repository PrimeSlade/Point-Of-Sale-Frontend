import { deleteExpenseById } from "@/api/expenses";
import { useCategories } from "@/hooks/useCategories";
import { useExpenses } from "@/hooks/useExpenses";
import { useLocations } from "@/hooks/useLocations";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import ExpensesColumns from "@/components/columns/ExpenseColumns";
import ExpenseForm from "@/components/forms/wrapper/ExpenseForm";
import Header from "@/components/header/Header";
import { DataTable } from "@/components/table/data-table";
import { useAuth } from "@/hooks/useAuth";
import useDebounce from "@/hooks/useDebounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const ExpensesPage = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [globalFilter, setGlobalFilter] = useState(
    searchParams.get("search") || ""
  );
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: page - 1 || 0,
    pageSize: 15,
  });

  //delay the search input in order to prevent server traffic
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

      newParams.set("page", String(paginationState.pageIndex + 1));
      return newParams;
    });
  }, [paginationState.pageIndex, debouncedSearch]);

  //tenstack

  //expense
  const {
    data: expenses,
    isLoading: isFetchingExpenses,
    error: fetchExpensesError,
  } = useExpenses(
    Number(searchParams.get("page") || 1),
    paginationState.pageSize,
    searchParams.get("search") || ""
  );

  //location
  const {
    data: locations,
    isLoading: isFetchingLocations,
    error: fetchLocationsError,
  } = useLocations();

  //category
  const {
    data: categories,
    isLoading: isFetchingCategories,
    error: fetchCategoriesError,
  } = useCategories();

  const { mutate: deleteExpenseMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteExpenseById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const fetchError =
    fetchExpensesError || fetchLocationsError || fetchCategoriesError;

  useEffect(() => {
    if (fetchError) {
      setErrorOpen(true);
    }
  }, [fetchError]);

  const columns = ExpensesColumns({
    onDelete: deleteExpenseMutate,
    isDeleting,
    locations,
    categories: categories?.data,
    page: page - 1,
  });

  return (
    <>
      <Header
        header="Expenses"
        className="text-2xl"
        action={
          <>
            {can("create", "Expense") && (
              <DialogButton
                name="Add Expense"
                icon={<Plus />}
                openFrom={() => setIsFormOpen(true)}
              />
            )}
          </>
        }
      />
      <DataTable
        columns={columns}
        data={expenses?.data ?? []}
        prompt="Search by names, descriptions or categories"
        totalPages={expenses?.meta.totalPages ?? 0}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        pagination
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        serverSideSearch
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
      <ExpenseForm
        locationData={locations}
        mode="create"
        open={isFormOpen}
        onClose={setIsFormOpen}
        categoryData={categories?.data}
      />
    </>
  );
};

export default ExpensesPage;
