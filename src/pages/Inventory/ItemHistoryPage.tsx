import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import Header from "@/components/header/Header";
import ItemHistoryCard from "@/components/item/ItemHistoryCard";
import Loading from "@/components/loading/Loading";
import { useItemHistory } from "@/hooks/useItems";
import type { ItemHistory } from "@/types/ItemType";
import { Package } from "lucide-react";
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
        subHeader="Track all item movements and updates"
        action={
          <DialogButton
            name="Back to Inventory Page"
            openFrom={() => navigate("/dashboard/items")}
          />
        }
      />
      <div className="mx-auto mt-5">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-[var(--primary-color)]" />
              <div>
                <p className="text-sm text-gray-500">Item ID: #{id}</p>
              </div>
            </div>
            {/* <div className="flex gap-2">
              {['ALL', 'CREATED', 'UPDATED', 'DELETED'].map(action => (
                <button
                  key={action}
                  onClick={() => setFilterAction(action)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterAction === action
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div> */}
          </div>
        </div>
      </div>
      {data.data.map((history: ItemHistory) => (
        <ItemHistoryCard key={history.id} history={history} />
      ))}
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
