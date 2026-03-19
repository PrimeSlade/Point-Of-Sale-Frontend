import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { CategoryType, ExpenseType } from "../../types/ExpenseType";
import { formatDate } from "@/utils/formatDate";
import ExpenseForm from "../forms/wrapper/ExpenseForm";
import type { LocationType } from "@/types/LocationType";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

type ExpenseColumnsProps = {
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
  locations?: LocationType[];
  categories?: CategoryType[];
  page?: number;
  serverSide?: boolean;
  action?: boolean;
};

export function useExpenseColumns({
  onDelete,
  isDeleting,
  locations,
  categories,
  page,
  action = true,
  serverSide = true,
}: ExpenseColumnsProps): ColumnDef<ExpenseType>[] {
  const { t } = useTranslation();

  return [
    {
      id: "rowIndex",
      header: () => <div className="font-bold text-center">{t("column.no")}</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {serverSide ? page! * 15 + row.index + 1 : row.index + 1}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: () => <div className="font-bold">{t("column.name")}</div>,
      enableGlobalFilter: !serverSide,
    },
    {
      id: "category",
      accessorFn: (row) => row.category.name ?? "",
      header: () => <div className="font-bold">{t("column.category")}</div>,
      enableGlobalFilter: !serverSide,
    },
    {
      id: "location",
      accessorFn: (row) => row.location?.name ?? "",
      header: () => <div className="font-bold">{t("column.location")}</div>,
      enableGlobalFilter: !serverSide,
      cell: ({ row }) => {
        return row.original.location?.name;
      },
    },
    {
      accessorKey: "description",
      header: () => <div className="font-bold">{t("column.description")}</div>,
      enableGlobalFilter: !serverSide,
    },
    {
      accessorKey: "amount",
      header: () => <div className="font-bold">{t("column.amount")}</div>,
      enableGlobalFilter: !serverSide,
    },
    {
      accessorKey: "date",
      header: () => <div className="font-bold">{t("column.date")}</div>,
      cell: ({ row }) => {
        return formatDate(new Date(row.original.date));
      },
      enableGlobalFilter: !serverSide,
    },
    {
      accessorKey: "action",
      header: () => <div className="font-bold">{t("column.actions")}</div>,
      cell: ({ row }) => {
        const expense = row.original;

        const [alertOpen, setAlertOpen] = useState(false);
        const [isFormOpen, setIsFormOpen] = useState(false);

        const { can } = useAuth();

        return (
          <>
            {action && (
              <>
                <div className="flex gap-5 items-center">
                  {can("update", "Expense") && (
                    <button onClick={() => setIsFormOpen(true)}>
                      <PenLine
                        size={20}
                        className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] hover:border hover:border-white"
                      />
                    </button>
                  )}
                  {can("delete", "Expense") && (
                    <button
                      onClick={() => setAlertOpen(true)}
                      disabled={isDeleting}
                    >
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
                  onConfirm={() => onDelete!(expense.id!)}
                  mode="confirm"
                />
                <ExpenseForm
                  data={expense}
                  locationData={locations!}
                  mode="edit"
                  open={isFormOpen}
                  onClose={setIsFormOpen}
                  categoryData={categories!}
                />
              </>
            )}
          </>
        );
      },
    },
  ];
}

export default useExpenseColumns;
