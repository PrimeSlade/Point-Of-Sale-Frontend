import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import Header from "@/components/header/Header";
import ItemHistoryCard from "@/components/item/ItemHistoryCard";
import Loading from "@/components/loading/Loading";
import { useItemHistory } from "@/hooks/useItems";
import type { ItemHistory } from "@/types/ItemType";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ItemHistoryPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [errorOpen, setErrorOpen] = useState(false);

  const { data, isLoading, error } = useItemHistory(Number(id));

  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  console.log(data);

  return (
    <>
      <Header
        header="Inventory History"
        className="text-3xl"
        subHeader={`Item ID: #${id}`}
        action={
          <DialogButton
            name="Back to Inventory Page"
            openFrom={() => navigate("/dashboard/items")}
          />
        }
      />

      <div className="mt-20 border rounded-md p-5 h-160 overflow-y-scroll">
        {data.data.map((history: ItemHistory) => (
          <ItemHistoryCard key={history.id} history={history} />
        ))}
      </div>
      {error && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Error"
          description={error.message}
          mode={"error"}
        />
      )}
    </>
  );
};

export default ItemHistoryPage;
