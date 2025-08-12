import type { PatientData } from "@/types/PatientType";
import PersonSelector from "./PersonSelector";
import type { DoctorData } from "@/types/DoctorType";

type PatientDoctorFormProps<T> = {
  title: string;
  btnLabel: string;
  dialogTitle: string;
  placeholder: string;
  data: T[];
  setSelectedPerson: React.Dispatch<React.SetStateAction<T | null>>;
  selectedPerson: T | null;
  type: "Doctor" | "Patient";
};

const PatientDoctorForm = <T extends PatientData | DoctorData>({
  title,
  btnLabel,
  dialogTitle,
  placeholder,
  setSelectedPerson,
  data,
  selectedPerson,
  type,
}: PatientDoctorFormProps<T>) => {
  return (
    <div className="border rounded-xl p-5 flex flex-col gap-3 shadow min-h-45">
      <div>
        <span className="font-bold">{title}</span>
        <span className="text-[var(--danger-color)]">*</span>
      </div>
      <div>
        <PersonSelector
          btnLabel={btnLabel}
          dialogTitle={dialogTitle}
          placeholder={placeholder}
          setSelectedPerson={setSelectedPerson}
          data={data}
          selectedPerson={selectedPerson}
          type={type}
        />
      </div>
    </div>
  );
};

export default PatientDoctorForm;
