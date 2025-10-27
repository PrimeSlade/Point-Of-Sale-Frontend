import type { ItemHistory } from "@/types/ItemType";
import { formatDate } from "@/utils/formatDate";
import { Clock, Layers } from "lucide-react";
import React from "react";

type InventoryAction = "EDIT" | "IMPORT";

type ItemHistoryCardProps = {
  history: ItemHistory;
};

const ItemHistoryCard = ({ history }: ItemHistoryCardProps) => {
  const getActionBadge = (action: InventoryAction) => {
    const styles: Record<InventoryAction, string> = {
      EDIT: "font-bold text-[var(--primary-color)] border border-[var(--primary-color)]",
      IMPORT:
        "font-bold text-[var(--success-color)] border border-[var(--success-color)]",
    };
    return styles[action];
  };

  const renderFieldChange = (
    oldVal: string | number,
    newVal: string | number,
    isPrice = false
  ) => {
    if (oldVal === newVal || (isPrice && Number(oldVal) === Number(newVal))) {
      return <span className="text-gray-700 font-medium">{newVal}</span>;
    }

    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-400 line-through text-sm">{oldVal}</span>
        <span className="text-gray-900 font-semibold">{newVal}</span>
      </div>
    );
  };

  return (
    <div className="mb-5">
      <div className="bg-white rounded-lg shadow border transition-shadow overflow-hidden">
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold text-gray-900">{history.userName}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {formatDate(new Date(history?.createdAt))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {history.itemHistoryDetails.length > 1 && (
              <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                <Layers className="w-3 h-3" />
                {history.itemHistoryDetails.length} Units
              </span>
            )}
            <span
              className={`px-3 py-1 rounded text-xs font-semibold ${getActionBadge(
                history.action.toUpperCase() as InventoryAction
              )}`}
            >
              {history.action.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Unit Type Changes Table */}
        <div className="px-6 pb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {history.itemHistoryDetails.length === 0 ? (
                  <div className="text-gray-600">
                    Did not change Unit Type, Rate, Quantity and Purchase Price
                  </div>
                ) : (
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Unit Type
                    </th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Purchase Price
                    </th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.itemHistoryDetails.map((detail) => (
                  <tr
                    key={detail.id}
                    className="hover:bg-gray-50 transition-colors bg-blue-50/30"
                  >
                    <td className="py-3 px-3">
                      {detail.oldUnitType !== detail.newUnitType ? (
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-sm font-medium uppercase line-through">
                            {detail.oldUnitType}
                          </span>
                          <span className="px-2 py-1 rounded text-sm font-semibold uppercase">
                            {detail.newUnitType}
                          </span>
                        </div>
                      ) : (
                        <span className="px-2 py- rounded text-sm font-medium uppercase">
                          {detail.newUnitType}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {renderFieldChange(detail.oldRate, detail.newRate)}
                    </td>
                    <td className="py-3 px-3">
                      {renderFieldChange(
                        detail.oldQuantity,
                        detail.newQuantity
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {renderFieldChange(
                        detail.oldPurchasePrice,
                        detail.newPurchasePrice,
                        true
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemHistoryCard;
