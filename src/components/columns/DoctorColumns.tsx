import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { DoctorData } from "@/types/DoctorType";
import DoctorForm from "../forms/wrapper/DoctorForm";
import type { LocationType } from "@/types/LocationType";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

type DoctorColumnsProps = {
  onDelete: (id: string) => void;
  isDeleting: boolean;
  locations: LocationType[];
};

export function useDoctorColumns({
  onDelete,
  isDeleting,
  locations,
}: DoctorColumnsProps): ColumnDef<DoctorData>[] {
  const { t } = useTranslation();

  return [
    {
      id: "rowIndex",
      header: () => <div className="font-bold text-center">{t("column.no")}</div>,
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "name",
      header: () => <div className="font-bold">{t("column.name")}</div>,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "email",
      header: () => <div className="font-bold">{t("column.email")}</div>,
      enableGlobalFilter: true,
    },
    {
      id: "phoneNumber",
      accessorFn: (row) => row.phoneNumber?.number ?? "",
      header: () => <div className="font-bold">{t("column.phone")}</div>,
      cell: ({ row }) => row.original.phoneNumber?.number,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "commission",
      header: () => <div className="font-bold">{t("column.commission")}</div>,
      cell: ({ row }) => `${row.original.commission}%`,
      enableGlobalFilter: false,
    },
    {
      id: "location",
      accessorFn: (row) => row.location?.name ?? "",
      header: () => <div className="font-bold">{t("column.location")}</div>,
      cell: ({ row }) => row.original.location?.name,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "address",
      header: () => <div className="font-bold">{t("column.address")}</div>,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "action",
      header: () => <div className="font-bold">{t("column.actions")}</div>,
      cell: ({ row }) => {
        const doctor = row.original;

        const [alertOpen, setAlertOpen] = useState(false);
        const [isFormOpen, setIsFormOpen] = useState(false);

        const { can } = useAuth();

        return (
          <>
            <div className="flex gap-5 items-center">
              {can("update", "Doctor") && (
                <button onClick={() => setIsFormOpen(true)}>
                  <PenLine
                    size={20}
                    className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] hover:border hover:border-white"
                  />
                </button>
              )}
              {can("delete", "Doctor") && (
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
              onConfirm={() => onDelete(doctor.id!)}
              mode="confirm"
            />
            <DoctorForm
              mode="edit"
              data={doctor}
              open={isFormOpen}
              onClose={setIsFormOpen}
              locationData={locations}
            />
          </>
        );
      },
    },
  ];
}

export default useDoctorColumns;
