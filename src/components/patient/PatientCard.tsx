import type { PatientData } from "@/types/PatientType";
import { Button } from "../ui/button";
import { calcAge, formatDate, formatText } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type PatientCardProps = {
  data: PatientData;
  mode?: "patient" | "invoice";
};

const PatientCard = ({ data, mode = "patient" }: PatientCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const dob = new Date(data?.dateOfBirth);

  const formatted = formatDate(data?.dateOfBirth);

  const treatments = data?.treatments;

  const lastVisit = treatments?.[0]
    ? formatDate(new Date(treatments[0].createdAt))
    : t("patient.noVisits");

  return (
    <div className="border p-5 rounded-lg h-full shadow">
      <h1 className="font-bold text-xl">{t("patient.info")}</h1>

      <div
        className={`${
          mode === "invoice" ? "grid grid-cols-3" : "flex flex-col"
        }  gap-3 mt-5`}
      >
        {mode === "invoice" && (
          <div>
            <label htmlFor="phone" className="text-[var(--text-secondary)]">
              {t("patient.name")}
            </label>
            <div id="phone" className="font-bold">
              {data?.name}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="phone" className="text-[var(--text-secondary)]">
            {t("patient.phone")}
          </label>
          <div id="phone" className="font-bold">
            {data?.phoneNumber.number}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="text-[var(--text-secondary)]">
            {t("patient.email")}
          </label>
          <div id="email" className={data?.email === null ? "" : "font-bold"}>
            {data?.email || t("patient.noEmail")}
          </div>
        </div>
        <div>
          <label htmlFor="address" className="text-[var(--text-secondary)]">
            {t("patient.address")}
          </label>
          <div
            id="address"
            className={
              data?.address === "" || data?.address === null ? "" : "font-bold"
            }
          >
            {data?.address || t("patient.noAddress")}
          </div>
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="text-[var(--text-secondary)]">
            {t("patient.dob")}
          </label>
          <div id="dateOfBirth">
            <span className="font-bold">{formatted}</span> ({calcAge(dob)})
          </div>
        </div>
        <div>
          <label htmlFor="gender" className="text-[var(--text-secondary)]">
            {t("patient.gender")}
          </label>
          <div id="gender" className="font-bold">
            {formatText(data?.gender)}
          </div>
        </div>
        <div>
          <label htmlFor="location" className="text-[var(--text-secondary)]">
            {t("patient.location")}
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
              {t("patient.status")}
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
              {t("patient.condition")}
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
              {t("patient.department")}
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
              {t("patient.type")}
            </label>
            <div id="patientType" className="font-bold">
              {formatText(data?.patientType)}
            </div>
          </div>
        </div>
        {mode === "patient" && (
          <>
            <hr className="h-[1px] bg-[var(--text-secondary)] border-0 mt-5" />
            <div className="flex justify-between">
              <div>
                <label
                  htmlFor="totalTreatments"
                  className="text-[var(--text-secondary)]"
                >
                  {t("patient.totalTreatments")}
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
                  {t("patient.lastVisit")}
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
              {t("patient.newTreatment")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
