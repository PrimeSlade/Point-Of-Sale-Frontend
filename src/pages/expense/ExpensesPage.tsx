import { getCategories } from "@/api/categories";
import { deleteExpenseById, getExpenses } from "@/api/expenses";
import { getLocations } from "@/api/locations";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import ExpensesColumns from "@/components/columns/ExpenseColumns";
import ExpenseForm from "@/components/forms/wrapper/ExpenseForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { DataTable } from "@/components/table/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ExpensesPage = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  //client side filtering
  const [globalFilter, setGlobalFilter] = useState("");
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  //tenstack

  //expense
  const {
    data: expenses,
    isLoading: isFetchingExpenses,
    error: fetchExpensesError,
  } = useQuery({
    queryFn: getExpenses,
    queryKey: ["expenses"],
  });

  //location
  const {
    data: locations,
    isLoading: isFetchingLocations,
    error: fetchLocationsError,
  } = useQuery({
    queryFn: getLocations,
    queryKey: ["locations"],
  });

  //category
  const {
    data: categories,
    isLoading: isFetchingCategories,
    error: fetchCategoriesError,
  } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });

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

  const isLoading =
    isFetchingExpenses || isFetchingLocations || isFetchingCategories;
  const fetchError =
    fetchExpensesError || fetchLocationsError || fetchCategoriesError;

  useEffect(() => {
    if (fetchError) {
      setErrorOpen(true);
    }
  }, [fetchError]);

  if (isLoading) return <Loading className="h-150" />;

  const columns = ExpensesColumns({
    onDelete: deleteExpenseMutate,
    isDeleting,
    locations,
    categories: categories?.data,
  });

  return (
    <>
      <Header
        header="Expenses"
        className="text-2xl"
        action={
          <DialogButton
            name="Add Expense"
            icon={<Plus />}
            openFrom={() => setIsFormOpen(true)}
          />
        }
      />
      <DataTable
        columns={columns}
        data={expenses.data ?? []}
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
