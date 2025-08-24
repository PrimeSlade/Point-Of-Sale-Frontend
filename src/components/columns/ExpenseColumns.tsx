import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { CategoryType, ExpenseType } from "../../types/ExpenseType";
import { formatDate } from "@/utils/formatDate";
import ExpenseForm from "../forms/wrapper/ExpenseForm";
import type { LocationType } from "@/types/LocationType";
import { useAuth } from "@/hooks/useAuth";

type ExpenseColumnsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
  locations: LocationType[];
  categories: CategoryType[];
};

const ExpensesColumns = ({
  onDelete,
  isDeleting,
  locations,
  categories,
}: ExpenseColumnsProps): ColumnDef<ExpenseType>[] => [
  {
    id: "rowIndex",
    header: () => <div className="font-bold ">No</div>,
    cell: ({ row }) => <div className="">{row.index + 1}</div>,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Name</div>,
  },
  {
    id: "category",
    accessorFn: (row) => row.category.name ?? "",
    header: () => <div className="font-bold">Category</div>,
  },
  {
    id: "location",
    accessorFn: (row) => row.location?.name ?? "",
    header: () => <div className="font-bold">Location</div>,
    enableGlobalFilter: true,
    cell: ({ row }) => {
      return row.original.location?.name;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="font-bold">Description</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="font-bold">Amount</div>,
  },
  {
    accessorKey: "date",
    header: () => <div className="font-bold">Date</div>,
    cell: ({ row }) => {
      return formatDate(new Date(row.original.date));
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      const expense = row.original;

      const [alertOpen, setAlertOpen] = useState(false);
      const [isFormOpen, setIsFormOpen] = useState(false);

      const { can } = useAuth();

      return (
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
            title="Confirm Deletion"
            description="Are you sure you want to delete this?"
            onClose={() => setAlertOpen(false)}
            onConfirm={() => onDelete(expense.id!)}
            mode="confirm"
          />
          <ExpenseForm
            data={expense}
            locationData={locations}
            mode="edit"
            open={isFormOpen}
            onClose={setIsFormOpen}
            categoryData={categories}
          />
        </>
      );
    },
  },
];
export default ExpensesColumns;
