import DialogButton from "@/components/button/DialogButton";
import ItemForm from "@/components/form/ItemForm";
import Header from "@/components/header/Header";
import { Plus } from "lucide-react";

const InventoryPage = () => {
  return (
    <div>
      <Header
        header="Inventory & Services"
        className="text-3xl"
        subHeader="Manage products and services offered"
        action={<DialogButton name="Add Item" icon={<Plus />} />}
      />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, id nam
        harum nihil est ad itaque dolorum earum mollitia ullam rerum! Magni
        quibusdam totam doloribus ullam, rerum fugiat facere quia.
      </p>
    </div>
  );
};

export default InventoryPage;
