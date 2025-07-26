import { deleteItemById, getItems } from "@/api/inventories";
import { fetchLocations } from "@/api/locations";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import ItemColumns from "@/components/columns/ItemColumns";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { DataTable } from "@/components/table/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { PaginationState } from "@tanstack/react-table";

const ItemServicePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [errorOpen, setErrorOpen] = useState(false);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  //TenStack

  //locations
  const { data: locations, error: fetchLocationError } = useQuery({
    queryFn: fetchLocations,
    queryKey: ["locations"],
  });

  //items
  const {
    data,
    isLoading,
    error: fetchItemError,
  } = useQuery({
    queryFn: () =>
      getItems(paginationState.pageIndex + 1, paginationState.pageSize),
    queryKey: ["items", paginationState.pageIndex],
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
  });

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  return (
    <div>
      <Header
        header="Inventory & Services"
        className="text-3xl"
        subHeader="Manage products and services offered"
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
        data={data.data ?? []}
        prompt="Search by item names or category"
        filter={true}
        locations={locations}
        totalPages={data?.meta.totalPages ?? 0}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        pagination={true}
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
