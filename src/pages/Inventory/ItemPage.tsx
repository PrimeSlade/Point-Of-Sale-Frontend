import { deleteItemById, getItems } from "@/api/inventories";
import { getLocations } from "@/api/locations";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import ItemColumns from "@/components/columns/ItemColumns";
import Header from "@/components/header/Header";
import { DataTable } from "@/components/table/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import type { PaginationState } from "@tanstack/react-table";
import useDebounce from "@/hooks/useDebounce";

const ItemServicePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  //serverside pagination, searching and filtering
  const [globalFilter, setGlobalFilter] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [columnFilters, setColumnFilters] = useState("");

  //delay the serach input in order to prevent server traffic
  const debouncedSearch = useDebounce(globalFilter);

  //reset the page when the search result is displayed
  useEffect(() => {
    setPaginationState((prev) => ({
      ...prev,
      pageIndex: 0, // reset to first page
    }));
  }, [debouncedSearch, columnFilters]);

  //saved the page for reloading
  useEffect(() => {
    setPaginationState((prev) => ({
      ...prev,
      pageIndex: Number(page) - 1,
    }));
  }, []);

  //TenStack
  //locations
  const { data: locations, error: fetchLocationError } = useQuery({
    queryFn: getLocations,
    queryKey: ["locations"],
  });

  //items
  const {
    data,
    isLoading,
    error: fetchItemError,
  } = useQuery({
    queryFn: () =>
      getItems(
        paginationState.pageIndex + 1,
        paginationState.pageSize,
        debouncedSearch,
        columnFilters
      ),
    queryKey: [
      "items",
      paginationState.pageIndex,
      debouncedSearch,
      columnFilters,
    ],
  });

  const { mutate: deleteItemMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteItemById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  //error
  const error = fetchItemError || fetchLocationError;

  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);

  //column
  const columns = ItemColumns({
    onDelete: deleteItemMutate,
    isDeleting,
    page: paginationState.pageIndex,
  });

  return (
    <div>
      <Header
        header="Inventory"
        className="text-3xl"
        subHeader="Manage products"
        action={
          <div className="flex gap-2">
            <DialogButton
              name="Add Item"
              icon={<Plus />}
              openFrom={() => navigate("/dashboard/items/add")}
            />
          </div>
        }
      />
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        prompt="Search by item names or category"
        filter
        locations={locations}
        totalPages={data?.meta.totalPages ?? 0}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        pagination
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        setColumnFilters={setColumnFilters}
        serverSideSearch
      />
      {error && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Error"
          description={error.message}
          mode={"error"}
        />
      )}
    </div>
  );
};

export default ItemServicePage;
