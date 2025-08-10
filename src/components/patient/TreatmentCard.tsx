import type { PatientData } from "@/types/PatientType";
import CustomAccordion from "../accordion/CustomAccordion";

type TreatmentCardProps = {
  data: PatientData;
};

const TreatmentCard = ({ data }: TreatmentCardProps) => {
  console.log(data);
  return (
    <div className="border rounded-lg h-full shadow">
      <h1 className="font-bold text-xl p-5">Treatment History</h1>
      <hr />
      <div className="px-5">
        {data.treatments.length >= 1 ? (
          <CustomAccordion data={data} />
        ) : (
          <p className="text-[var(--text-secondary)] mt-5">
            No treatments found. Once treatments are added, they’ll appear here.
          </p>
        )}
      </div>
    </div>
  );
};

export default TreatmentCard;
