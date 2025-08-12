import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { CategoryType } from "../../types/ExpenseType";
import { formatDate } from "@/utils/formatDate";
import { getLocations } from "@/api/locations";
import Loading from "../loading/Loading";
import { useQuery } from "@tanstack/react-query";
import CategoryForm from "../forms/wrapper/CategoryForm";

type CategoryColumnsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

const CategoryColumn = ({
  onDelete,
  isDeleting,
}: CategoryColumnsProps): ColumnDef<CategoryType>[] => [
  {
    id: "rowIndex",
    header: () => <div className="font-bold ">No</div>,
    cell: ({ row }) => <div className="">{row.index + 1}</div>,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Category</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="font-bold">Description</div>,
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
    accessorKey: "createdAt",
    header: () => <div className="font-bold">Date</div>,
    cell: ({ row }) => {
      return formatDate(new Date(row.original.createdAt));
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      const category = row.original;

      const [alertOpen, setAlertOpen] = useState(false);
      const [isFormOpen, setIsFormOpen] = useState(false);

      const {
        data: locations,
        isLoading: isFetchingLocations,
        error: fetchError,
      } = useQuery({
        queryFn: getLocations,
        queryKey: ["locations"],
      });

      if (isFetchingLocations)
        return (
          <Loading className="flex justify-center h-screen items-center" />
        );

      return (
        <>
          <div className="flex gap-5 items-center">
            <button onClick={() => setIsFormOpen(true)}>
              <PenLine
                size={20}
                className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] hover:border hover:border-white"
              />
            </button>
            <button onClick={() => setAlertOpen(true)} disabled={isDeleting}>
              <Trash2
                size={20}
                className="text-[var(--danger-color)] hover:text-[var(--danger-color-hover)] hover:border hover:border-white"
              />
            </button>
          </div>
          <AlertBox
            open={alertOpen}
            title="Confirm Deletion"
            description="Are you sure you want to delete this?"
            onClose={() => setAlertOpen(false)}
            onConfirm={() => onDelete(category.id!)}
            mode="confirm"
          />
          <CategoryForm
            data={category}
            locationData={locations}
            mode="edit"
            open={isFormOpen}
            onClose={setIsFormOpen}
          />
        </>
      );
    },
  },
];
export default CategoryColumn;
