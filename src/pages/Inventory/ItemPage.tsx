import { deleteItem, getItems } from "@/api/inventories";
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

const ItemServicePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isItemFormOpen, setIsItemFormOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

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
    queryFn: getItems,
    queryKey: ["items"],
  });

  const { mutate: deleteItemMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
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

  if (isLoading) return <Loading className="h-150" />;

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
        data={data ?? []}
        prompt="Search by item names or category"
        filter={true}
        locations={locations}
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
