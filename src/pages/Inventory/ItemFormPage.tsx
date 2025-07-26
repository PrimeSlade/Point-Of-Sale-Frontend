import { getItemById } from "@/api/inventories";
import { fetchLocations } from "@/api/locations";
import DialogButton from "@/components/button/DialogButton";
import ItemForm from "@/components/form/ItemForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const ItemFormPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const isEdit = Boolean(id);

  const { data: itemData, isLoading: item } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(Number(id)),
    enabled: Boolean(id),
  });

  const {
    data: locationData,
    isLoading: location,
    error: fetchError,
  } = useQuery({
    queryFn: fetchLocations,
    queryKey: ["locations"],
  });

  const isLoading = item || location;

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  return (
    <div>
      <Header
        header={!isEdit ? "Add Item" : "Edit Item"}
        className="text-3xl mb-5"
        subHeader=""
        action={
          <DialogButton
            name="Back to Inventory Page"
            openFrom={() => navigate("/dashboard/items")}
          />
        }
      />
      <ItemForm
        mode={isEdit ? "edit" : "create"}
        itemData={itemData}
        locationData={locationData}
      />
    </div>
  );
};

export default ItemFormPage;
