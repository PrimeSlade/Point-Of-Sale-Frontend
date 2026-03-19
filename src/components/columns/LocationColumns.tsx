import type { LocationType } from "@/types/LocationType";
import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import LocationForm from "../forms/wrapper/LocationForm";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

type LocationColumnsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

export function useLocationColumns({
  onDelete,
  isDeleting,
}: LocationColumnsProps): ColumnDef<LocationType>[] {
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
      enableGlobalFilter: true, //default
    },
    {
      id: "phoneNumber",
      accessorFn: (row) => row.phoneNumber?.number ?? "",
      header: () => <div className="font-bold">{t("column.phone")}</div>,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        return row.original.phoneNumber?.number;
      },
    },
    {
      accessorKey: "address",
      header: () => <div className="font-bold">{t("column.address")}</div>,
    },
    {
      accessorKey: "action",
      header: () => <div className="font-bold">{t("column.actions")}</div>,
      cell: ({ row }) => {
        const location = row.original;

        const [alertOpen, setAlertOpen] = useState(false);
        const [isFormOpen, setIsFormOpen] = useState(false);

        const { can } = useAuth();

        return (
          <>
            <div className="flex gap-5 items-center">
              {can("update", "Location") && (
                <button onClick={() => setIsFormOpen(true)}>
                  <PenLine
                    size={20}
                    className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] hover:border hover:border-white"
                  />
                </button>
              )}
              {can("delete", "Location") && (
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
              onConfirm={() => onDelete(location.id)}
              mode="confirm"
            />
            <LocationForm
              open={isFormOpen}
              onClose={setIsFormOpen}
              mode="edit"
              oldName={location.name}
              oldAddress={location.address}
              oldPhoneNumber={location.phoneNumber.number}
              id={location.id}
            />
          </>
        );
      },
    },
  ];
}

export default useLocationColumns;
