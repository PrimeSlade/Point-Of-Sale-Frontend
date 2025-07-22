import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const InventoryPage = () => {
  const [isItemFormOpen, setIsItemFormOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default InventoryPage;
