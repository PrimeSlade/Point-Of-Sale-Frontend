import { getDoctors } from "@/api/doctors";
import { getPatients } from "@/api/patients";
import TreatmentForm from "@/components/forms/wrapper/TreatmentForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { useQuery } from "@tanstack/react-query";

const TreatmentFormPage = () => {
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

  const isLoading = isFetchingPatients || isFetchingDoctors;

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  return (
    <>
      <Header
        header="Treatment Creation"
        className="text-3xl"
        subHeader="Create new treatments"
      />
      <TreatmentForm
        patientData={patients?.data}
        doctorData={doctors?.data}
        mode="create"
      />
    </>
  );
};

export default TreatmentFormPage;
