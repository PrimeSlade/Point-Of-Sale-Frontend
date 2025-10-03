import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { Invoice } from "@/types/InvoiceType";
import { formatDate } from "@/utils/formatDate";
import { useAuth } from "@/hooks/useAuth";
import { generateInvoiceId } from "@/utils/formatText";
import { useNavigate } from "react-router-dom";

type InvoiceColumsProps = {
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
  page?: number;
  serverSide?: boolean;
  action?: boolean;
};

const InvoiceColumns = ({
  onDelete,
  isDeleting,
  page,
  action = true,
  serverSide = true,
}: InvoiceColumsProps): ColumnDef<Invoice>[] => [
  {
    id: "rowIndex",
    header: () => <div className="font-bold text-center">No</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {serverSide ? page! * 15 + row.index + 1 : row.index + 1}
      </div>
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
    accessorFn: (row) => row.treatment?.patient!.name ?? "",
    header: () => <div className="font-bold">Patient Name</div>,
    cell: ({ row }) => {
      return row.original?.treatment?.patient!.name ?? "Walk-in customer";
    },
    enableGlobalFilter: !serverSide,
  },
  {
    id: "location",
    accessorFn: (row) => row.location.name,
    header: () => <div className="font-bold">Location</div>,
    cell: ({ row }) => {
      return row.original.location.name;
    },
    enableGlobalFilter: !serverSide,
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="font-bold">Total Amount</div>,
    enableGlobalFilter: !serverSide,
  },
  {
    accessorKey: "paymentMethod",
    header: () => <div className="font-bold">Payment Method</div>,
    enableGlobalFilter: !serverSide,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="font-bold">Date</div>,
    cell: ({ row }) => (
      <div>{formatDate(new Date(row.original.createdAt))}</div>
    ),
    enableGlobalFilter: !serverSide,
  },
  {
    accessorKey: "action",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      const invoice = row.original;

      const navigate = useNavigate();

      const [alertOpen, setAlertOpen] = useState(false);

      const { can } = useAuth();

      return (
        <>
          <div className="flex gap-5 items-center">
            <button
              onClick={() => navigate(`/dashboard/invoices/${invoice.id}`)}
            >
              <Eye
                size={20}
                className="text-[var(--success-color)] hover:text-[var(--success-color-hover)] hover:border hover:border-white"
              />
            </button>
            {action && (
              <>
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
              </>
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
      );
    },
  },
];
export default InvoiceColumns;
