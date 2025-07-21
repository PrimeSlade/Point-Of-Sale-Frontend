import DialogButton from "@/components/button/DialogButton";
import ItemForm from "@/components/form/ItemForm";
import Header from "@/components/header/Header";
import { Plus } from "lucide-react";
import { useState } from "react";

const InventoryPage = () => {
  const [isItemFormOpen, setIsItemFormOpen] = useState(false);

  return (
    <>
      <div>
        <Header
          header="Inventory & Services"
          className="text-3xl"
          subHeader="Manage products and services offered"
          action={
            <div className="flex gap-2">
              <DialogButton
                name="Items"
                openFrom={() => setIsItemFormOpen(true)}
              />
              <DialogButton
                name="Services"
                openFrom={() => setIsItemFormOpen(true)}
              />
            </div>
          }
        />
      </div>
      <ItemForm
        open={isItemFormOpen}
        onClose={setIsItemFormOpen}
        mode="create"
      />
    </>
  );
};

export default InventoryPage;
