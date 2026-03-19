import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import type { ItemType } from "@/types/ItemType";
import { useNavigate } from "react-router-dom";
import { smallestUnit } from "@/utils/unitUtils";
import ItemCard from "../item/ItemCard";
import { formatDate } from "@/utils/formatDate";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

type ItemColumnsProps = {
  onDelete: (id: number) => void;
  isDeleting: boolean;
  page: number;
};

export function useItemColumns({
  onDelete,
  isDeleting,
  page,
}: ItemColumnsProps): ColumnDef<ItemType>[] {
  const { t } = useTranslation();

  return [
    {
      id: "rowIndex",
      header: () => <div className="font-bold text-center">{t("column.no")}</div>,
      cell: ({ row }) => (
        <div className="text-center">{page * 15 + row.index + 1}</div>
      ),
      enableGlobalFilter: false,
    },

    {
      accessorKey: "name",
      header: () => <div className="font-bold">{t("column.name")}</div>,
    },
    {
      accessorKey: "category",
      header: () => <div className="font-bold">{t("column.category")}</div>,
    },
    {
      accessorKey: "expiryDate",
      header: () => <div className="font-bold">{t("column.expiryDate")}</div>,
      cell: ({ row }) => {
        const value = row.getValue<string>("expiryDate");
        const date = new Date(value);

        //fn
        const formatted = formatDate(date);

        return <span>{formatted}</span>;
      },
    },
    {
      id: "location",
      accessorFn: (row) => row.location?.name ?? "",
      header: () => <div className="font-bold">{t("column.location")}</div>,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        return row.original.location?.name;
      },
    },
    {
      id: "inStock",
      header: () => <div className="font-bold">{t("column.inStock")}</div>,
      cell: ({ row }) => {
        const itemUnits = row.original.itemUnits;

        const inStock = itemUnits.some((unit) => unit.quantity !== 0);

        return (
          <span
            className={`${
              inStock
                ? "text-[var(--success-color-hover)]"
                : "text-[var(--danger-color)]"
            } font-bold`}
          >
            {inStock ? t("common.yes") : t("common.no")}
          </span>
        );
      },
    },
    {
      accessorKey: "unit",
      header: () => <div className="font-bold">{t("column.unit")}</div>,
      cell: ({ row }) => {
        const itemUnits = row.original.itemUnits;

        const unit = smallestUnit(itemUnits);

        return <span>{unit!.unitType}</span>;
      },
    },
    {
      accessorKey: "price",
      header: () => <div className="font-bold">{t("column.purchasePrice")}</div>,
      cell: ({ row }) => {
        const itemUnits = row.original.itemUnits;

        const unit = smallestUnit(itemUnits);

        return <span>{unit!.purchasePrice}</span>;
      },
    },

    {
      accessorKey: "action",
      header: () => <div className="font-bold">{t("column.actions")}</div>,
      cell: ({ row }) => {
        const item = row.original;

        const [alertOpen, setAlertOpen] = useState(false);

        const navigate = useNavigate();

        const { can } = useAuth();

        return (
          <>
            <div className="flex gap-5 items-center">
              <ItemCard data={item} />
              {can("update", "Item") && (
                <button
                  onClick={() => navigate(`/dashboard/items/edit/${item.id}`)}
                >
                  <PenLine
                    size={20}
                    className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] hover:border hover:border-white"
                  />
                </button>
              )}
              {can("delete", "Item") && (
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
              title={t("common.confirmDeletion")}
              description={t("common.deleteDescription")}
              onClose={() => setAlertOpen(false)}
              onConfirm={() => onDelete(item.id)}
              mode="confirm"
            />
          </>
        );
      },
    },
  ];
}

export default useItemColumns;
