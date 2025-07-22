import DialogButton from "@/components/button/DialogButton";
import ItemForm from "@/components/form/ItemForm";
import Header from "@/components/header/Header";
import { useNavigate } from "react-router-dom";

const AddItemPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        header="Add Item"
        className="text-3xl mb-5"
        subHeader=""
        action={
          <DialogButton
            name="Back to Inventory Page"
            openFrom={() => navigate("/dashboard/items")}
          />
        }
      />
      <ItemForm mode={"create"} />
    </div>
  );
};

export default AddItemPage;
