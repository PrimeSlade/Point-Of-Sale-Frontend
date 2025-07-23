import type { LocationColumnsProps, LocationType } from "@/types/LocationType";
import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import LocationForm from "../form/LocationForm";

const LocationColumns = ({
  onDelete,
  isDeleting,
}: LocationColumnsProps): ColumnDef<LocationType>[] => [
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Name</div>,
    enableGlobalFilter: true, //default
  },
  {
    id: "phoneNumber",
    accessorFn: (row) => row.phoneNumber?.number ?? "",
    header: () => <div className="font-bold">Phone Number</div>,
    enableGlobalFilter: true,
    cell: ({ row }) => {
      return row.original.phoneNumber?.number;
    },
  },
  {
    accessorKey: "address",
    header: () => <div className="font-bold">Address</div>,
  },
  {
    accessorKey: "action",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      const location = row.original;

      const [alertOpen, setAlertOpen] = useState(false);
      const [isFormOpen, setIsFormOpen] = useState(false);

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
export default LocationColumns;
