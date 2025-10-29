import { Input } from "@/components/ui/input";
import React from "react";
import type { DateRange } from "@/types/TreatmentType";
import FilterByDate from "@/components/table/FilterByDate";

type ItemSearchFilterProps = {
  onSearchChange: (searchTerm: string) => void;
  setDate: React.Dispatch<React.SetStateAction<DateRange>>;
  date: DateRange;
  currentSearchTerm: string;
};

const ItemSearchFilter = ({
  onSearchChange,
  date,
  setDate,
  currentSearchTerm,
}: ItemSearchFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center">
      <Input
        className="mt-5 w-80"
        placeholder="Search by user name..."
        value={currentSearchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="flex gap-3 mt-5 ml-auto">
        <FilterByDate date={date} setDate={setDate} serverSideSearch={false} />
      </div>
    </div>
  );
};

export default ItemSearchFilter;
