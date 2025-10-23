import type { PatientData } from "@/types/PatientType";
import { formatText } from "@/utils/formatDate";

type PatientInfoProps = {
  data: PatientData | null;
};

const fields = [
  { key: "patientStatus", label: "Patient Status" },
  { key: "patientCondition", label: "Patient Condition" },
  { key: "department", label: "Department" },
  { key: "patientType", label: "IN/OUT Patient" },
];

const PatientInfo = ({ data }: PatientInfoProps) => {
  return (
    <div className="border rounded-xl p-5 flex flex-col gap-2 shadow h-45 min-w-80">
      <div className="font-bold">PatientInfo</div>
      {data ? (
        <div className="grid grid-cols-2 gap-3">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label htmlFor={key} className="text-[var(--text-secondary)]">
                {label}
              </label>
              <div id={key} className="font-bold">
                {formatText(String(data[key as keyof PatientData]))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[var(--text-secondary)]">
          Select patient to see patient info
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
