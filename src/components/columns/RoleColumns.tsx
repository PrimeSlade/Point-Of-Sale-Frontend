import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toUpperCase } from "@/utils/formatText";
import type { Role } from "@/types/RoleType";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type RoleColumnsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

export function useRoleColumns({
  onDelete,
  isDeleting,
}: RoleColumnsProps): ColumnDef<Role>[] {
  const { t } = useTranslation();

  return [
    {
      id: "rowIndex",
      header: () => <div className="font-bold">{t("column.no")}</div>,
      cell: ({ row }) => <div>{row.index + 1}</div>,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "name",
      header: () => <div className="font-bold">{t("column.roleName")}</div>,
      cell: ({ row }) => {
        return toUpperCase(row.original?.name);
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="font-bold">{t("column.date")}</div>,
      cell: ({ row }) => {
        return formatDate(new Date(row.original.createdAt!));
      },
    },

    {
      accessorKey: "action",
      header: () => <div className="font-bold">{t("column.actions")}</div>,
      cell: ({ row }) => {
        const role = row.original;
        const navigate = useNavigate();

        const [alertOpen, setAlertOpen] = useState(false);

        const { can } = useAuth();

        return (
          <>
            <div className="flex gap-5 items-center">
              {can("update", "Role") && (
                <button
                  onClick={() =>
                    navigate(`/dashboard/settings/roles/edit/${role.id}`)
                  }
                >
                  <PenLine
                    size={20}
                    className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] hover:border hover:border-white"
                  />
                </button>
              )}
              {can("delete", "Role") && (
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
              onConfirm={() => onDelete(role.id)}
              mode="confirm"
            />
          </>
        );
      },
    },
  ];
}

export default useRoleColumns;
