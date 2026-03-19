import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TreatmentData } from "@/types/TreatmentType";
import { calcAge, formatDate } from "@/utils/formatDate";
import TreatmentCard from "../treatment/TreatmentCard";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

type TreatmentColumsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
  page: number;
};

export function useTreatmentColumns({
  onDelete,
  isDeleting,
  page,
}: TreatmentColumsProps): ColumnDef<TreatmentData>[] {
  const { t } = useTranslation();

  return [
    {
      id: "rowIndex",
      header: () => <div className="font-bold text-center">{t("column.no")}</div>,
      cell: ({ row }) => (
        <div className="text-center">{page * 15 + row.index + 1}</div>
      ),
      enableGlobalFilter: false,
    },
    {
      id: "name",
      header: () => <div className="font-bold">{t("column.name")}</div>,
      cell: ({ row }) => {
        return row.original.patient?.name;
      },
    },
    {
      id: "age",
      header: () => <div className="font-bold">Age</div>,
      cell: ({ row }) => {
        return calcAge(new Date(row.original.patient?.dateOfBirth!));
      },
    },
    {
      id: "phoneNumber",
      header: () => <div className="font-bold">{t("column.phone")}</div>,
      cell: ({ row }) => {
        return row.original.patient?.phoneNumber?.number;
      },
    },
    {
      id: "doctorName",
      header: () => <div className="font-bold">{t("column.doctorName")}</div>,
      cell: ({ row }) => {
        return row.original.doctor?.name;
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="font-bold">{t("column.date")}</div>,
      cell: ({ row }) => (
        <div>{formatDate(new Date(row.original.createdAt))}</div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="font-bold">{t("column.actions")}</div>,
      cell: ({ row }) => {
        const treatment = row.original;

        const [alertOpen, setAlertOpen] = useState(false);
        const navigate = useNavigate();

        const { can } = useAuth();

        return (
          <>
            <div className="flex gap-5 items-center">
              <TreatmentCard data={treatment} />
              {can("update", "Treatment") && (
                <button
                  onClick={() =>
                    navigate(`/dashboard/treatments/edit/${treatment.id}`)
                  }
                >
                  <PenLine
                    size={20}
                    className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] hover:border hover:border-white"
                  />
                </button>
              )}
              {can("delete", "Treatment") && (
                <button onClick={() => setAlertOpen(true)} disabled={isDeleting}>
                  <Trash2
                    size={20}
                    className="text-[var(--danger-color)] hover:text-[var(--danger-color-hover)] hover:border hover:border-white"
                  />
                </button>
              )}
            </div>
            <AlertBox
              open={alertOpen}
              title={t("common.confirmDeletion")}
              description={t("common.deleteDescription")}
              onClose={() => setAlertOpen(false)}
              onConfirm={() => onDelete(treatment.id!)}
              mode="confirm"
            />
          </>
        );
      },
    },
  ];
}

export default useTreatmentColumns;
