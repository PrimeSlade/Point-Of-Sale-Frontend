import type { ItemHistoryDetail } from "@/types/ItemType";
import React from "react";

type ItemHistoryDetailsCardProp = {
  detail: ItemHistoryDetail;
};

const renderFieldChange = (
  oldVal: string | number,
  newVal: string | number
) => {
  if (oldVal === newVal) {
    return <span className="text-gray-700 font-medium">{newVal}</span>;
  }

  const isIncrease = Number(newVal) > Number(oldVal);
  const colorClass = isIncrease ? "text-green-600" : "text-red-600";

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400 line-through text-sm">{oldVal}</span>
      <span className={`font-semibold ${colorClass}`}>{newVal}</span>
    </div>
  );
};

const ItemHistroyDetailsCard = ({ detail }: ItemHistoryDetailsCardProp) => {
  return (
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
        {renderFieldChange(detail.oldQuantity, detail.newQuantity)}
      </td>
      <td className="py-3 px-3">
        {renderFieldChange(detail.oldPurchasePrice, detail.newPurchasePrice)}
      </td>
    </tr>
  );
};

export default ItemHistroyDetailsCard;
