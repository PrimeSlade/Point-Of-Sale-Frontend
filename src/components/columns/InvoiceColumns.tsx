import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { Invoice } from "@/types/InvoiceType";
import { formatDate } from "@/utils/formatDate";
import { useAuth } from "@/hooks/useAuth";
import { generateInvoiceId } from "@/utils/formatText";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type InvoiceColumsProps = {
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
  page?: number;
  serverSide?: boolean;
  action?: boolean;
};

export function useInvoiceColumns({
  onDelete,
  isDeleting,
  page,
  action = true,
  serverSide = true,
}: InvoiceColumsProps): ColumnDef<Invoice>[] {
  const { t } = useTranslation();

  return [
    {
      id: "rowIndex",
      header: () => <div className="font-bold text-center">{t("column.no")}</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {serverSide ? page! * 15 + row.index + 1 : row.index + 1}
        </div>
      ),
    },
    {
      id: "invoiceId",
      header: () => <div className="font-bold">{t("column.invoiceId")}</div>,
      cell: ({ row }) => {
        return generateInvoiceId(row.original.id, row.original.location.name);
      },
    },
    {
      id: "patientName",
      accessorFn: (row) => row.treatment?.patient!.name ?? "",
      header: () => <div className="font-bold">{t("column.patientName")}</div>,
      cell: ({ row }) => {
        return row.original?.treatment?.patient!.name ?? t("common.walkIn");
      },
      enableGlobalFilter: !serverSide,
    },
    {
      id: "location",
      accessorFn: (row) => row.location.name,
      header: () => <div className="font-bold">{t("column.location")}</div>,
      cell: ({ row }) => {
        return row.original.location.name;
      },
      enableGlobalFilter: !serverSide,
    },
    {
      accessorKey: "totalAmount",
      header: () => <div className="font-bold">{t("column.totalAmount")}</div>,
      enableGlobalFilter: !serverSide,
    },
    {
      accessorKey: "paymentMethod",
      header: () => <div className="font-bold">{t("column.paymentMethod")}</div>,
      enableGlobalFilter: !serverSide,
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="font-bold">{t("column.date")}</div>,
      cell: ({ row }) => (
        <div>{formatDate(new Date(row.original.createdAt))}</div>
      ),
      enableGlobalFilter: !serverSide,
    },
    {
      accessorKey: "action",
      header: () => <div className="font-bold">{t("column.actions")}</div>,
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
              title={t("common.confirmDeletion")}
              description={t("common.deleteDescription")}
              onClose={() => setAlertOpen(false)}
              onConfirm={() => onDelete!(invoice.id)}
              mode="confirm"
            />
          </>
        );
      },
    },
  ];
}

export default useInvoiceColumns;
