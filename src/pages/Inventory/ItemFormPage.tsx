import { getItemById } from "@/api/inventories";
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

  const { data, isLoading } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(Number(id)),
    enabled: Boolean(id),
  });

  if (isLoading) return <Loading className="h-150" />;

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
        oldName={data?.name}
        oldCategory={data?.category}
        oldExpiryDate={data?.expiryDate}
        oldDescription={data?.description}
        oldPricePercent={data?.pricePercent}
        itemId={data?.id}
        oldLocation={data?.location.name}
        oldItemUnits={data?.itemUnits}
      />
    </div>
  );
};

export default ItemFormPage;
