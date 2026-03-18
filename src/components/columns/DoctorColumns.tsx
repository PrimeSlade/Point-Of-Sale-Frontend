import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { DoctorData } from "@/types/DoctorType";
import DoctorForm from "../forms/wrapper/DoctorForm";
import type { LocationType } from "@/types/LocationType";
import { useAuth } from "@/hooks/useAuth";

type DoctorColumnsProps = {
  onDelete: (id: string) => void;
  isDeleting: boolean;
  locations: LocationType[];
};

const DoctorColumns = ({
  onDelete,
  isDeleting,
  locations,
}: DoctorColumnsProps): ColumnDef<DoctorData>[] => [
  {
    id: "rowIndex",
    header: () => <div className="font-bold text-center">No</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Name</div>,
    enableGlobalFilter: true,
  },
  {
    accessorKey: "email",
    header: () => <div className="font-bold">Email</div>,
    enableGlobalFilter: true,
  },
  {
    id: "phoneNumber",
    accessorFn: (row) => row.phoneNumber?.number ?? "",
    header: () => <div className="font-bold">Phone Number</div>,
    cell: ({ row }) => row.original.phoneNumber?.number,
    enableGlobalFilter: true,
  },
  {
    accessorKey: "commission",
    header: () => <div className="font-bold">Commission</div>,
    cell: ({ row }) => `${row.original.commission}%`,
    enableGlobalFilter: false,
  },
  {
    id: "location",
    accessorFn: (row) => row.location?.name ?? "",
    header: () => <div className="font-bold">Location</div>,
    cell: ({ row }) => row.original.location?.name,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "address",
    header: () => <div className="font-bold">Address</div>,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "action",
    header: () => <div className="font-bold">Actions</div>,
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
            title="Confirm Deletion"
            description="Are you sure you want to delete this?"
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

export default DoctorColumns;
