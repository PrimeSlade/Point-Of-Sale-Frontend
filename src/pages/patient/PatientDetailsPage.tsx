import { usePatient } from "@/hooks/usePatients";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Loading from "@/components/loading/Loading";
import AlertBox from "@/components/alertBox/AlertBox";
import Header from "@/components/header/Header";
import PatientCard from "@/components/patient/PatientCard";
import TreatmentCard from "@/components/patient/TreatmentCard";

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [errorOpen, setErrorOpen] = useState(false);

  //tenstack
  const {
    data: patient,
    isLoading: isFetchingPatient,
    error: fetchPatientError,
  } = usePatient(id);

  if (isFetchingPatient)
    return <Loading className="flex justify-center h-screen items-center" />;

  return (
    <>
      <Header
        header={patient?.data?.name}
        className="text-3xl"
        subHeader="Patient Profile"
      />
      <div className="grid grid-cols-3 gap-5 h-180 mt-5">
        <div className="col-span-1">
          <PatientCard data={patient.data} />
        </div>
        <div className="col-span-2">
          <TreatmentCard data={patient.data} />
        </div>
      </div>

      {fetchPatientError && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Error"
          description={fetchPatientError.message}
          mode={"error"}
        />
      )}
    </>
  );
};

export default PatientDetailsPage;
