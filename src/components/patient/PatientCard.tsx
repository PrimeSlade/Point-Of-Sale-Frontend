import type { PatientData } from "@/types/PatientType";
import { Button } from "../ui/button";
import { calcAge, formatDate, formatText } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";

type PatientCardProps = {
  data: PatientData;
};

const PatientCard = ({ data }: PatientCardProps) => {
  const navigate = useNavigate();

  const dob = new Date(data?.dateOfBirth);

  const formatted = formatDate(data?.dateOfBirth);

  const treatments = data?.treatments;

  const lastVisit = treatments?.[0]
    ? formatDate(new Date(treatments[0].createdAt))
    : "No visits yet";

  return (
    <div className="border p-5 rounded-lg h-full shadow">
      <h1 className="font-bold text-xl">Patient Infomation</h1>

      <div className="flex flex-col gap-3 mt-5">
        <div>
          <label htmlFor="phone" className="text-[var(--text-secondary)]">
            Phone
          </label>
          <div id="phone" className="font-bold">
            {data?.phoneNumber.number}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="text-[var(--text-secondary)]">
            Email
          </label>
          <div id="email" className={data?.email === null ? "" : "font-bold"}>
            {data?.email || "No email provided"}
          </div>
        </div>
        <div>
          <label htmlFor="address" className="text-[var(--text-secondary)]">
            Address
          </label>
          <div
            id="address"
            className={
              data?.address === "" || data?.address === null ? "" : "font-bold"
            }
          >
            {data?.address || "No address provided"}
          </div>
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="text-[var(--text-secondary)]">
            Date of Birth
          </label>
          <div id="dateOfBirth">
            <span className="font-bold">{formatted}</span> ({calcAge(dob)})
          </div>
        </div>
        <div>
          <label htmlFor="gender" className="text-[var(--text-secondary)]">
            Gender
          </label>
          <div id="gender" className="font-bold">
            {formatText(data?.gender)}
          </div>
        </div>
        <div>
          <label htmlFor="location" className="text-[var(--text-secondary)]">
            Location
          </label>
          <div id="location" className="font-bold">
            {data?.location.name}
          </div>
        </div>
        <div className="flex">
          <div className="w-30">
            <label
              htmlFor="patientStatus"
              className="text-[var(--text-secondary)]"
            >
              Patient Status
            </label>
            <div id="patientStatus" className="font-bold">
              {formatText(data?.patientStatus)}
            </div>
          </div>
          <div>
            <label
              htmlFor="patientCondtion"
              className="text-[var(--text-secondary)]"
            >
              Patient Condtion
            </label>
            <div id="patientCondtion" className="font-bold">
              {formatText(data?.patientCondition)}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-30">
            <label
              htmlFor="department"
              className="text-[var(--text-secondary)]"
            >
              Department
            </label>
            <div id="department" className="font-bold">
              {formatText(data?.department)}
            </div>
          </div>
          <div>
            <label
              htmlFor="patientType"
              className="text-[var(--text-secondary)]"
            >
              Patient Type(In/Out)
            </label>
            <div id="patientType" className="font-bold">
              {formatText(data?.patientType)}
            </div>
          </div>
        </div>
        <hr className="h-[1px] bg-[var(--text-secondary)] border-0 mt-5" />
        <div className="flex justify-between">
          <div>
            <label
              htmlFor="totalTreatments"
              className="text-[var(--text-secondary)]"
            >
              Total Treatments
            </label>
            <div
              id="totalTreatments"
              className="font-bold text-[var(--primary-color)]"
            >
              {treatments.length}
            </div>
          </div>
          <div>
            <label
              htmlFor="totalTreatments"
              className="text-[var(--text-secondary)]"
            >
              Last Visit
            </label>
            <div id="totalTreatments" className="font-bold ">
              {lastVisit}
            </div>
          </div>
        </div>
        <Button
          className="bg-[var(--success-color)] hover:bg-[var(--success-color-hover)] mt-2"
          onClick={() => navigate("/dashboard/treatments/add")}
        >
          New Treatment
        </Button>
      </div>
    </div>
  );
};

export default PatientCard;
