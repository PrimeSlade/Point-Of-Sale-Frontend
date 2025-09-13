import type { TreatmentData } from "@/types/TreatmentType";
import { formatDate } from "@/utils/formatDate";

type TreatmentDiagnosisBoxProps = {
  data: TreatmentData;
};

const TreatmentDiagnosisBox = ({ data }: TreatmentDiagnosisBoxProps) => {
  const formatted = formatDate(new Date(data.createdAt));

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow bg-white w-full">
      <div className="space-y-4">
        {/* Header */}
        <div className="border-b pb-3">
          <h3 className="text-lg font-semibold text-[var(--primary-color)]">
            Treatment & Diagnosis Details
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Treatment Date: {formatted}
          </p>
        </div>

        {/* Treatment Information */}
        <div className="space-y-3">
          <div>
            <label className="text-[var(--text-secondary)] text-sm font-medium">
              Treatment Description
            </label>
            <div className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md min-h-[60px]">
              <p className="text-sm break-words">
                {data.treatment || "No treatment description provided"}
              </p>
            </div>
          </div>

          <div>
            <label className="text-[var(--text-secondary)] text-sm font-medium">
              Diagnosis
            </label>
            <div className="mt-1 p-3 bg-gray-100 rounded-md min-h-[60px] border border-gray-300">
              <p className="text-sm break-words">
                {data.diagnosis || "No diagnosis provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDiagnosisBox;