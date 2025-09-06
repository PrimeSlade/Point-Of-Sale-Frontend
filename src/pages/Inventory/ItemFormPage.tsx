import DialogButton from "@/components/button/DialogButton";
import ItemForm from "@/components/forms/wrapper/ItemForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { useItem } from "@/hooks/useItems";
import { useLocations } from "@/hooks/useLocations";
import { useNavigate, useParams } from "react-router-dom";

//used for both create and edit
const ItemFormPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const isEdit = Boolean(id);

  //tenstack
  const { data: itemData, isLoading: item } = useItem(id);
  const {
    data: locationData,
    isLoading: location,
    error: fetchError,
  } = useLocations();

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
