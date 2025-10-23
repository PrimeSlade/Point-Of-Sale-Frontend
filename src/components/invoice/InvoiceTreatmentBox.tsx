import { usePatients } from "@/hooks/usePatients";
import { useDoctors } from "@/hooks/useDoctors";
import { useLocations } from "@/hooks/useLocations";
import { useTreatmentsByCursor } from "@/hooks/useTreatments";
import { useEffect, useState } from "react";
import AutocompleteInput from "./AutocompleteInput";
import LocationFilter from "./LocationFilter";
import TreatmentCard from "./TreatmentCard";
import useDebounce from "@/hooks/useDebounce";
import { useAuth } from "@/hooks/useAuth";
import type { TreatmentData } from "@/types/TreatmentType";
import { useInView } from "react-intersection-observer";
import TreatmentCardSkeleton from "./TreatmentCardSkeleton";

type InvoiceTreatmentBoxProps = {
  selectedTreatment: TreatmentData | null;
  onTreatmentSelect: (treatment: TreatmentData | null) => void;
};

export type SelectedItems = {
  patient: string;
  doctor: string;
  location: string;
};

const InvoiceTreatmentBox = ({
  selectedTreatment,
  onTreatmentSelect,
}: InvoiceTreatmentBoxProps) => {
  // Fetch data with custom hooks
  const { data: patientData, isLoading: isLoadingPatients } = usePatients();
  const { data: doctorData, isLoading: isLoadingDoctors } = useDoctors();
  const { data: locationData, isLoading: isLoadingLocations } = useLocations();

  //Main
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    patient: "",
    doctor: "",
    location: "",
  });

  const patientNameDebounce = useDebounce(selectedItems.patient, 500) ?? "";
  const doctorNameDebounce = useDebounce(selectedItems.doctor, 500) ?? "";

  const { user } = useAuth();
  const { ref, inView } = useInView();

  const action = user!.role.permissions![0].action;

  const {
    data: treatmentData,
    isFetchingNextPage,
    hasNextPage,
    isLoading: isLoadingTreatments,
    refetch,
    fetchNextPage,
  } = useTreatmentsByCursor(
    15,
    patientNameDebounce,
    doctorNameDebounce,
    selectedItems?.location
  );

  useEffect(() => {
    if (patientNameDebounce || doctorNameDebounce || selectedItems.location) {
      refetch();
      onTreatmentSelect(null);
    }
  }, [
    patientNameDebounce,
    doctorNameDebounce,
    refetch,
    selectedItems.location,
  ]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  const data = treatmentData?.pages.flatMap((page) => page.data) || [];

  const handleTreatmentSelect = (treatment: TreatmentData) => {
    if (onTreatmentSelect) {
      // Toggle selection - if already selected, deselect
      if (selectedTreatment?.id === treatment.id) {
        onTreatmentSelect(null);
      } else {
        onTreatmentSelect(treatment);
      }
    }
  };

  if (isLoadingPatients || isLoadingDoctors || isLoadingLocations) return null;

  return (
    <div className="border p-5 shadow rounded-xl h-100 overflow-auto">
      <div className="flex gap-3">
        <AutocompleteInput
          labelName="Patient"
          setSelectedItems={setSelectedItems}
          type="patient"
          data={patientData?.data ?? []}
        />
        <AutocompleteInput
          labelName="Doctor"
          setSelectedItems={setSelectedItems}
          type="doctor"
          data={doctorData?.data ?? []}
        />
        {action === "manage" && (
          <LocationFilter
            locations={locationData}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        )}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {isLoadingTreatments ? (
          Array.from({ length: 9 }).map((_, index) => (
            <TreatmentCardSkeleton key={index} />
          ))
        ) : data.length === 0 ? (
          <div className="col-span-3 flex items-center justify-center h-64">
            <div className="text-center text-gray-500">
              <div className="text-lg font-medium mb-2">
                No treatments found
              </div>
            </div>
          </div>
        ) : (
          data?.map((treatment: TreatmentData) => (
            <TreatmentCard
              key={treatment.id}
              data={treatment}
              isSelected={selectedTreatment?.id === treatment.id}
              onSelect={handleTreatmentSelect}
            />
          ))
        )}
        {isFetchingNextPage &&
          Array.from({ length: 6 }).map((_, index) => (
            <TreatmentCardSkeleton key={index} />
          ))}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default InvoiceTreatmentBox;
