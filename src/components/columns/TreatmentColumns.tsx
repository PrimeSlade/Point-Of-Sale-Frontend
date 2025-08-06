import type { ColumnDef } from "@tanstack/react-table";
import { Eye, PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import { getLocations } from "@/api/locations";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import type { TreatmentData } from "@/types/TreatmentType";
import { calcAge, formatDate } from "@/utils/formatData";

type TreatmentColumsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
  page: number;
};

const TreatmentColumns = ({
  onDelete,
  isDeleting,
  page,
}: TreatmentColumsProps): ColumnDef<TreatmentData>[] => [
  {
    id: "rowIndex",
    header: () => <div className="font-bold text-center">No</div>,
    cell: ({ row }) => (
      <div className="text-center">{page * 15 + row.index + 1}</div>
    ),
    enableGlobalFilter: false,
  },
  {
    id: "name",
    header: () => <div className="font-bold">Name</div>,
    cell: ({ row }) => {
      return row.original.patient?.name;
    },
  },
  {
    id: "age",
    header: () => <div className="font-bold">Age</div>,
    cell: ({ row }) => {
      return calcAge(new Date(row.original.patient?.dateOfBirth!));
    },
  },
  {
    id: "phoneNumber",
    header: () => <div className="font-bold">Phone Number</div>,
    cell: ({ row }) => {
      return row.original.patient?.phoneNumber?.number;
    },
  },
  {
    id: "doctorName",
    header: () => <div className="font-bold">Doctor Name</div>,
    cell: ({ row }) => {
      return row.original.doctor?.name;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="font-bold">Date</div>,
    cell: ({ row }) => (
      <div>{formatDate(new Date(row.original.createdAt))}</div>
    ),
  },
  {
    accessorKey: "action",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      const patient = row.original;

      const [alertOpen, setAlertOpen] = useState(false);
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
            <button>
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
        </>
      );
    },
  },
];
export default TreatmentColumns;
