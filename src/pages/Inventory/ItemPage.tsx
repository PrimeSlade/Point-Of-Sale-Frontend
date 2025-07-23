import { deleteItem, getItems } from "@/api/inventories";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import ItemColumns from "@/components/columns/ItemColumns";
import Header from "@/components/header/Header";
import { DataTable } from "@/components/table/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemServicePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isItemFormOpen, setIsItemFormOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  //TenStack
  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryFn: getItems,
    queryKey: ["items"],
  });

  useEffect(() => {
    if (fetchError) {
      setErrorOpen(true);
    }
  }, [fetchError]);

  const { mutate: deleteItemMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  console.log(data);

  const columns = ItemColumns({
    onDelete: deleteItemMutate,
    isDeleting,
  });

  return (
    <div>
      <Header
        header="Inventory & Services"
        className="text-3xl"
        subHeader="Manage products and services offered"
        action={
          <div className="flex gap-2">
            <DialogButton
              name="Items"
              openFrom={() => navigate("/dashboard/items/add")}
            />
            <DialogButton
              name="Services"
              openFrom={() => setIsItemFormOpen(true)}
            />
          </div>
        }
      />
      <DataTable columns={columns} data={data ?? []} />
      {fetchError && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Error"
          description={fetchError.message}
          mode={"error"}
        />
      )}
    </div>
  );
};

export default ItemServicePage;
