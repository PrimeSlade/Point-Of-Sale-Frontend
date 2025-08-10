import { getDoctors } from "@/api/doctors";
import { getPatients } from "@/api/patients";
import { getTreatmentById } from "@/api/treatments";
import TreatmentForm from "@/components/forms/wrapper/TreatmentForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const TreatmentFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { data: treatmentData, isLoading: isFetchingItem } = useQuery({
    queryKey: ["treatment", id],
    queryFn: () => getTreatmentById(Number(id)),
    enabled: Boolean(id),
  });

  console.log("Fetching");
  console.log(treatmentData?.data.treatment);

  const {
    data: patients,
    isLoading: isFetchingPatients,
    error: fetchPatientError,
  } = useQuery({
    queryFn: getPatients,
    queryKey: ["patients"],
  });

  const {
    data: doctors,
    isLoading: isFetchingDoctors,
    error: fetchDoctorError,
  } = useQuery({
    queryFn: getDoctors,
    queryKey: ["doctors"],
  });

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
