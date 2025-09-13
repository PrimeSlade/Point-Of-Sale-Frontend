import type { TreatmentData } from "@/types/TreatmentType";
import { formatDate } from "@/utils/formatDate";

type TreatmentCardProps = {
  data: TreatmentData;
  isSelected: boolean;
  onSelect: (treatment: TreatmentData) => void;
};

const TreatmentCard = ({
  data,
  isSelected = false,
  onSelect,
}: TreatmentCardProps) => {
  const formatted = formatDate(new Date(data.createdAt));

  return (
    <div
      className={`border rounded-lg p-4 shadow hover:shadow-md transition-all cursor-pointer ${
        isSelected
          ? "bg-green-100/60 border-green-300 backdrop-blur-sm"
          : "bg-white hover:bg-gray-50"
      }`}
      onClick={() => onSelect(data)}
    >
      <div className="flex gap-4">
        <div className="flex flex-col gap-3 flex-1">
          <div>
            <div>
              <label
                className={`text-sm ${
                  isSelected ? "text-green-600" : "text-[var(--text-secondary)]"
                }`}
              >
                Patient Name
              </label>
              <div
                className={`font-bold text-lg ${
                  isSelected ? "text-green-700" : ""
                }`}
              >
                {data.patient?.name}
              </div>
            </div>

            <div>
              <label
                className={`text-sm ${
                  isSelected ? "text-green-600" : "text-[var(--text-secondary)]"
                }`}
              >
                Doctor Name
              </label>
              <div
                className={`font-bold ${isSelected ? "text-green-700" : ""}`}
              >
                {data.doctor?.name}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[var(--text-secondary)] text-sm">
              Treatment Date
            </label>
            <div className="font-bold text-[var(--primary-color)]">
              {formatted}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <img
            src="/images/YnoLogo.JPG"
            alt="Yno Logo"
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TreatmentCard;
