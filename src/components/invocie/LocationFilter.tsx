import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectedItems } from "./InvoieTreatmentBox";
import type { LocationType } from "@/types/LocationType";

interface LocationFilterProps {
  locations: LocationType[] | undefined;
  selectedItems: SelectedItems;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItems>>;
}

const LocationFilter = ({
  locations,
  selectedItems,
  setSelectedItems,
}: LocationFilterProps) => {
  const handleLocationChange = (locationName: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      location: locationName,
    }));
  };

  return (
    <div>
      <label
        htmlFor="patient-search"
        className="text-sm font-medium text-gray-700"
      >
        Location
      </label>
      <Select
        value={selectedItems.location || ""}
        onValueChange={handleLocationChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a location" />
        </SelectTrigger>
        <SelectContent>
          {locations?.map((location) => (
            <SelectItem key={location.id} value={location.name}>
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocationFilter;
