import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { ServiceData } from "@/types/ServiceType";
import ServiceForm from "../forms/wrapper/ServiceForm";
import { useAuth } from "@/hooks/useAuth";

type ServiceColumnsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

const ServiceColumns = ({
  onDelete,
  isDeleting,
}: ServiceColumnsProps): ColumnDef<ServiceData>[] => [
  {
    id: "rowIndex",
    header: () => <div className="font-bold ">No</div>,
    cell: ({ row }) => <div className="">{row.index + 1}</div>,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Name</div>,
    enableGlobalFilter: true, //default
  },

  {
    accessorKey: "retailPrice",
    header: () => <div className="font-bold">Retail Price</div>,
    enableGlobalFilter: false, //default
  },
  {
    accessorKey: "action",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      const service = row.original;

      const [alertOpen, setAlertOpen] = useState(false);
      const [isFormOpen, setIsFormOpen] = useState(false);

      const { can } = useAuth();

      return (
        <>
          <div className="flex gap-5 items-center">
            {can("update", "Service") && (
              <button onClick={() => setIsFormOpen(true)}>
                <PenLine
                  size={20}
                  className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] hover:border hover:border-white"
                />
              </button>
            )}
            {can("delete", "Service") && (
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
            onConfirm={() => onDelete(service.id!)}
            mode="confirm"
          />
          <ServiceForm
            data={service}
            mode="edit"
            open={isFormOpen}
            onClose={setIsFormOpen}
          />
        </>
      );
    },
  },
];
export default ServiceColumns;
