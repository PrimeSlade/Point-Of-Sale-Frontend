import type { ItemHistory } from "@/types/ItemType";
import { formatDate } from "@/utils/formatDate";
import { Clock, Layers, User } from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toUpperCase as toFirstUpperCase } from "@/utils/formatText";

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
    <Accordion type="single" collapsible className="mb-4">
      <AccordionItem
        value={history.id.toString()}
        className="bg-white rounded-lg shadow border"
      >
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <div className="flex items-start justify-between w-full pr-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="flex gap-2">
                  <span className="font-semibold  text-gray-900">
                    {history.userName}
                  </span>

                  <span className="text-gray-500">
                    ({toFirstUpperCase(history.user.role.name)})
                  </span>
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {formatDate(new Date(history?.createdAt), true)}
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
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ItemHistoryCard;
