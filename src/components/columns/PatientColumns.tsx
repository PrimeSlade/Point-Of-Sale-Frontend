import type { ColumnDef } from "@tanstack/react-table";
import { Eye, PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { PatientData } from "@/types/PatientType";
import PatientForm from "../forms/wrapper/PatientForm";
import { useNavigate } from "react-router-dom";
import { calcAge } from "@/utils/formatDate";
import type { LocationType } from "@/types/LocationType";

type PatientColumnsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
  locations: LocationType[];
};

const PatientColumns = ({
  onDelete,
  isDeleting,
  locations,
}: PatientColumnsProps): ColumnDef<PatientData>[] => [
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
    id: "age",
    header: () => <div className="font-bold">Age</div>,
    cell: ({ row }) => {
      return calcAge(new Date(row.original.dateOfBirth));
    },
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

      const navigate = useNavigate();

      return (
        <>
          <div className="flex gap-5 items-center">
            <button
              onClick={() => navigate(`/dashboard/patients/${patient.id}`)}
            >
              <Eye
                size={20}
                className="text-[var(--success-color)] hover:text-[var(--success-color-hover)] hover:border hover:border-white"
              />
            </button>
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
            locationData={locations}
          />
        </>
      );
    },
  },
];
export default PatientColumns;
