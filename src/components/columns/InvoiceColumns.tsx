import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Invoice } from "@/types/InvoiceType";
import { formatDate } from "@/utils/formatDate";
import { useAuth } from "@/hooks/useAuth";

type InvoiceColumsProps = {
  onDelete: (id: string) => void;
  isDeleting: boolean;
  page: number;
};

const InvoiceColumns = ({
  onDelete,
  isDeleting,
  page,
}: InvoiceColumsProps): ColumnDef<Invoice>[] => [
  {
    id: "rowIndex",
    header: () => <div className="font-bold text-center">No</div>,
    cell: ({ row }) => (
      <div className="text-center">{page * 15 + row.index + 1}</div>
    ),
    enableGlobalFilter: false,
  },
  {
    id: "treatmentId",
    header: () => <div className="font-bold">Treatment ID</div>,
    cell: ({ row }) => {
      return row.original.treatmentId;
    },
  },
  {
    id: "totalAmount",
    header: () => <div className="font-bold">Total Amount</div>,
    cell: ({ row }) => {
      return `$${row.original.totalAmount.toFixed(2)}`;
    },
  },
  {
    id: "paymentMethod",
    header: () => <div className="font-bold">Payment Method</div>,
    cell: ({ row }) => {
      return row.original.paymentMethod;
    },
  },
  {
    id: "discountAmount",
    header: () => <div className="font-bold">Discount</div>,
    cell: ({ row }) => {
      return `$${row.original.discountAmount.toFixed(2)}`;
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
      const invoice = row.original;

      const [alertOpen, setAlertOpen] = useState(false);
      const navigate = useNavigate();

      const { can } = useAuth();

      return (
        <>
          <div className="flex gap-5 items-center">
            {can("update", "Invoice") && (
              <button
                onClick={() =>
                  navigate(`/dashboard/invoices/edit/${invoice.id}`)
                }
              >
                <PenLine
                  size={20}
                  className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] hover:border hover:border-white"
                />
              </button>
            )}
            {can("delete", "Invoice") && (
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
            onConfirm={() => onDelete(invoice.id)}
            mode="confirm"
          />
        </>
      );
    },
  },
];
export default InvoiceColumns;
