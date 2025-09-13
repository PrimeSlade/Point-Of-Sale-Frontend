import type { TreatmentData } from "@/types/TreatmentType";
import { formatDate } from "@/utils/formatDate";

type TreatmentCardProps = {
  data: TreatmentData;
};

const TreatmentCard = ({ data }: TreatmentCardProps) => {
  const formatted = formatDate(new Date(data.createdAt));

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow bg-white">
      <div className="flex gap-4">
        <div className="flex flex-col gap-3 flex-1">
          <div>
            <div>
              <label className="text-[var(--text-secondary)] text-sm">
                Patient Name
              </label>
              <div className="font-bold text-lg">{data.patient?.name}</div>
            </div>

            <div>
              <label className="text-[var(--text-secondary)] text-sm">
                Doctor Name
              </label>
              <div className="font-bold">{data.doctor?.name}</div>
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
