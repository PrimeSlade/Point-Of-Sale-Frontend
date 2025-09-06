import TreatmentForm from "@/components/forms/wrapper/TreatmentForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { useDoctors } from "@/hooks/useDoctors";
import { usePatients } from "@/hooks/usePatients";
import { useTreatment } from "@/hooks/useTreatments";
import { useParams } from "react-router-dom";

const TreatmentFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { data: treatmentData, isLoading: isFetchingItem } = useTreatment(id);

  console.log("Fetching");
  console.log(treatmentData?.data.treatment);

  const {
    data: patients,
    isLoading: isFetchingPatients,
    error: fetchPatientError,
  } = usePatients();

  const {
    data: doctors,
    isLoading: isFetchingDoctors,
    error: fetchDoctorError,
  } = useDoctors();

  const isLoading = isFetchingPatients || isFetchingDoctors || isFetchingItem;

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  return (
    <>
      <Header
        header={isEdit ? "Edit Treatment" : "Treatment Creation"}
        className="text-3xl"
        subHeader={
          isEdit ? "Modify existing treatment details" : "Create new treatments"
        }
      />
      <TreatmentForm
        patientData={patients?.data}
        doctorData={doctors?.data}
        mode={isEdit ? "edit" : "create"}
        treatmentData={treatmentData?.data}
      />
    </>
  );
};

export default TreatmentFormPage;
