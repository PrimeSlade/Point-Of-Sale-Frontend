import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import Header from "@/components/header/Header";
import ItemHistoryCard from "@/components/item/ItemHistoryCard";
import ItemSearchFilter from "@/components/item/ItemSearchFilter";
import Loading from "@/components/loading/Loading";
import { useItemHistory } from "@/hooks/useItems";
import type { ItemHistory } from "@/types/ItemType";
import type { DateRange } from "@/types/TreatmentType";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ItemHistoryPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [errorOpen, setErrorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
  });

  const { data, isLoading, error } = useItemHistory(Number(id));

  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  const filteredData =
    data?.data.filter((history: ItemHistory) => {
      const matchesSearchTerm = history.user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      //Date filtering part
      const historyDate = new Date(history.createdAt);

      // Determine if date filtering should be applied
      const shouldApplyDateFilter = dateRange.startDate && dateRange.endDate;

      let matchesStartDate = true;
      let matchesEndDate = true;

      if (shouldApplyDateFilter) {
        matchesStartDate = historyDate >= dateRange.startDate!;

        let adjustedEndDate = new Date(dateRange.endDate!);
        adjustedEndDate.setHours(23, 59, 59, 999);
        matchesEndDate = historyDate <= adjustedEndDate;
      }

      return matchesSearchTerm && matchesStartDate && matchesEndDate;
    }) || [];

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
      <ItemSearchFilter
        onSearchChange={setSearchTerm}
        date={dateRange}
        setDate={setDateRange}
        currentSearchTerm={searchTerm}
      />
      <div className="mt-5 border rounded-md p-5 h-160 overflow-y-scroll">
        {filteredData.length > 0 ? (
          filteredData.map((history: ItemHistory) => (
            <ItemHistoryCard key={history.id} history={history} />
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-gray-600 font">No history found</p>
          </div>
        )}
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
