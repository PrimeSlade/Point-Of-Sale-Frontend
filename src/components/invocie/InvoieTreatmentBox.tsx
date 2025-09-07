import { usePatients } from "@/hooks/usePatients";
import { useDoctors } from "@/hooks/useDoctors";
import { useLocations } from "@/hooks/useLocations";
import { useTreatments } from "@/hooks/useTreatments";
import { useState } from "react";
import type { PatientData } from "@/types/PatientType";
import type { DoctorData } from "@/types/DoctorType";
import AutocompleteInput from "./AutocompleteInput";
import LocationFilter from "./LocationFilter";
import Loading from "../loading/Loading";

type InvoiceTreatmentBoxProps = {};

export type SelectedItems = {
  patient: PatientData | null;
  doctor: DoctorData | null;
  location: string | null;
};
const InvoieTreatmentBox = ({}: InvoiceTreatmentBoxProps) => {
  // Fetch data with custom hooks
  const { data: patientData, isLoading: isLoadingPatients } = usePatients();
  const { data: doctorData, isLoading: isLoadingDoctors } = useDoctors();
  const { data: locationData, isLoading: isLoadingLocations } = useLocations();
  //const { data: treatmentData } = useTreatments();

  //Main
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    patient: null,
    doctor: null,
    location: null,
  });

  console.log(selectedItems);

  if (isLoadingPatients || isLoadingDoctors || isLoadingLocations) return null;

  return (
    <div className="border p-5 shadow rounded-xl">
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
        <LocationFilter
          locations={locationData}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </div>
  );
};

export default InvoieTreatmentBox;
