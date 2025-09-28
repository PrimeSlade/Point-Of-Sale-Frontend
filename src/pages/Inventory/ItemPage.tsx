import { deleteItemById } from "@/api/inventories";
import { useItems } from "@/hooks/useItems";
import { useLocations } from "@/hooks/useLocations";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import ItemColumns from "@/components/columns/ItemColumns";
import Header from "@/components/header/Header";
import { DataTable } from "@/components/table/data-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import type { PaginationState } from "@tanstack/react-table";
import useDebounce from "@/hooks/useDebounce";
import { useAuth } from "@/hooks/useAuth";

const ItemServicePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [errorOpen, setErrorOpen] = useState(false);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: page - 1 || 0,
    pageSize: 15,
  });

  //serverside pagination, searching and filtering
  const [globalFilter, setGlobalFilter] = useState(
    searchParams.get("search") || ""
  );
  const [columnFilters, setColumnFilters] = useState(
    searchParams.get("filter") || ""
  );

  //delay the serach input in order to prevent server traffic
  const debouncedSearch = useDebounce(globalFilter);

  //useAuth
  const { can } = useAuth();

  //sync pagination changes to URL params
  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (debouncedSearch) {
        newParams.set("search", debouncedSearch);
      } else {
        newParams.delete("search");
      }
      if (columnFilters && columnFilters !== "__all") {
        newParams.set("filter", columnFilters);
      } else {
        newParams.delete("filter");
      }

      newParams.set("page", String(paginationState.pageIndex + 1));
      return newParams;
    });
  }, [paginationState.pageIndex, debouncedSearch, columnFilters]);

  //TenStack
  //locations
  const { data: locations, error: fetchLocationError } = useLocations();

  //items
  const {
    data,
    isLoading,
    error: fetchItemError,
  } = useItems(
    paginationState.pageIndex + 1,
    paginationState.pageSize,
    searchParams.get("search") || "",
    searchParams.get("filter") || ""
  );

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
    page: page - 1,
  });

  return (
    <div>
      <Header
        header="Inventory"
        className="text-3xl"
        subHeader="Manage products"
        action={
          <div className="flex gap-2">
            {can("create", "Item") && (
              <DialogButton
                name="Add Item"
                icon={<Plus />}
                openFrom={() => navigate("/dashboard/items/add")}
              />
            )}
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
        columnFilters={columnFilters}
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
