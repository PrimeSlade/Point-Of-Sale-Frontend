import DialogButton from "@/components/button/DialogButton";
import Header from "@/components/header/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemServicePage = () => {
  const navigate = useNavigate();

  const [isItemFormOpen, setIsItemFormOpen] = useState(false);

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
    </div>
  );
};

export default ItemServicePage;
