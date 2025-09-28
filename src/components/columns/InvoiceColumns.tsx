import type { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { Invoice } from "@/types/InvoiceType";
import { formatDate } from "@/utils/formatDate";
import { useAuth } from "@/hooks/useAuth";
import { generateInvoiceId } from "@/utils/formatText";

type InvoiceColumsProps = {
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
  page: number;
  action?: boolean;
};

const InvoiceColumns = ({
  onDelete,
  isDeleting,
  page,
  action = true,
}: InvoiceColumsProps): ColumnDef<Invoice>[] => [
  {
    id: "rowIndex",
    header: () => <div className="font-bold text-center">No</div>,
    cell: ({ row }) => (
      <div className="text-center">{page * 15 + row.index + 1}</div>
    ),
  },
  {
    id: "invoiceId",
    header: () => <div className="font-bold">Invoice ID</div>,
    cell: ({ row }) => {
      return generateInvoiceId(row.original.id, row.original.location.name);
    },
  },
  {
    id: "patientName",
    header: () => <div className="font-bold">Patient Name</div>,
    cell: ({ row }) => {
      return row.original?.treatment?.patient!.name ?? "Walk-in customer";
    },
  },
  {
    id: "location",
    header: () => <div className="font-bold">Location</div>,
    cell: ({ row }) => {
      return row.original.location.name;
    },
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="font-bold">Total Amount</div>,
  },
  {
    accessorKey: "paymentMethod",
    header: () => <div className="font-bold">Payment Method</div>,
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
      const invoice = row.original;

      const [alertOpen, setAlertOpen] = useState(false);

      const { can } = useAuth();

      return (
        <>
          {action && (
            <>
              <div className="flex gap-5 items-center">
                {can("delete", "Invoice") && (
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
                title="Confirm Deletion"
                description="Are you sure you want to delete this?"
                onClose={() => setAlertOpen(false)}
                onConfirm={() => onDelete!(invoice.id)}
                mode="confirm"
              />
            </>
          )}
        </>
      );
    },
  },
];
export default InvoiceColumns;
