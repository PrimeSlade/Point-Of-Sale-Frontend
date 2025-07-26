import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { ItemColumnsProps, ItemType } from "@/types/ItemType";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { smallestUnit } from "@/utils/unitUtils";

const ItemColumns = ({
  onDelete,
  isDeleting,
}: ItemColumnsProps): ColumnDef<ItemType>[] => [
  {
    id: "rowIndex",
    header: () => <div className="font-bold text-center">No</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    enableGlobalFilter: false,
  },

  {
    accessorKey: "name",
    header: () => <div className="font-bold">Name</div>,
    enableGlobalFilter: true, //default
  },
  {
    accessorKey: "category",
    header: () => <div className="font-bold">Category</div>,
    enableGlobalFilter: true,
  },
  {
    accessorKey: "expiryDate",
    header: () => <div className="font-bold">Expiry Date</div>,
    cell: ({ row }) => {
      const value = row.getValue<string>("expiryDate");
      const date = new Date(value);

      //fn
      const formatted = format(date, "P");

      return <span>{formatted}</span>;
    },
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
    accessorKey: "unit",
    header: () => <div className="font-bold">Unit</div>,
    cell: ({ row }) => {
      const itemUnits = row.original.itemUnits;

      const unit = smallestUnit(itemUnits);

      return <span>{unit!.unitType}</span>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="font-bold">Purchase Price</div>,
    cell: ({ row }) => {
      const itemUnits = row.original.itemUnits;

      const unit = smallestUnit(itemUnits);

      return <span>{unit!.purchasePrice}</span>;
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      const item = row.original;

      const [alertOpen, setAlertOpen] = useState(false);
      const [isFormOpen, setIsFormOpen] = useState(false);

      const navigate = useNavigate();

      return (
        <>
          <div className="flex gap-5 items-center">
            <button
              onClick={() => navigate(`/dashboard/items/edit/${item.id}`)}
            >
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
            onConfirm={() => onDelete(item.id)}
            mode="confirm"
          />
        </>
      );
    },
  },
];
export default ItemColumns;
