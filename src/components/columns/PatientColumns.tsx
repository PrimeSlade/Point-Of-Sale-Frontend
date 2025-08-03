import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { PatientData } from "@/types/PatientType";
import PatientForm from "../forms/wrapper/PatientForm";
import { fetchLocations } from "@/api/locations";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading/Loading";

type PatientColumsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

const PatientColums = ({
  onDelete,
  isDeleting,
}: PatientColumsProps): ColumnDef<PatientData>[] => [
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
    id: "phoneNumber",
    accessorFn: (row) => row.phoneNumber?.number ?? "",
    header: () => <div className="font-bold">Phone Number</div>,
    cell: ({ row }) => {
      return row.original.phoneNumber?.number;
    },
    enableGlobalFilter: true, //default
  },
  {
    accessorKey: "department",
    header: () => <div className="font-bold">Department</div>,
    enableGlobalFilter: true, //default
  },
  {
    accessorKey: "address",
    header: () => <div className="font-bold">Address</div>,
    enableGlobalFilter: false, //default
  },
  {
    accessorKey: "action",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      const patient = row.original;

      const [alertOpen, setAlertOpen] = useState(false);
      const [isFormOpen, setIsFormOpen] = useState(false);

      const {
        data: locationData,
        isLoading: isFetchingLocations,
        error: fetchError,
      } = useQuery({
        queryFn: fetchLocations,
        queryKey: ["locations"],
      });

      if (isFetchingLocations) return <Loading className="h-150" />;

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
            onConfirm={() => onDelete(patient.id!)}
            mode="confirm"
          />
          <PatientForm
            mode="edit"
            data={patient}
            open={isFormOpen}
            onClose={setIsFormOpen}
            locationData={locationData}
          />
        </>
      );
    },
  },
];
export default PatientColums;
