import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { ItemType } from "@/types/ItemType";
import { formatDate } from "@/utils/formatData";
import { Eye } from "lucide-react";

type ItemCardProps = {
  data: ItemType;
};

const ItemCard = ({ data }: ItemCardProps) => {
  const formatted = formatDate(data.expiryDate);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Eye
            size={20}
            className="text-[var(--success-color)] hover:text-[var(--success-color-hover)] hover:border hover:border-white"
          />
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-y-3 p-5">
            <h1 className="font-bold text-[var(--text-secondary)]">Item</h1>
            <h1 className="font-bold text-[var(--text-secondary)]">Category</h1>
            <h1 className="font-bold text-[var(--text-secondary)]">
              Expire Date
            </h1>

            <div className="col-span-3 grid grid-cols-3 rounded-md border bg-[var(--background-color)]">
              <div className="px-3 py-2">{data.name}</div>
              <div className="px-3 py-2">{data.category}</div>
              <div className="px-3 py-2">{formatted}</div>
            </div>

            <h1 className="font-bold text-[var(--text-secondary)]">
              Unit Types
            </h1>
            <h1 className="font-bold text-[var(--text-secondary)]">Quantity</h1>
            <h1 className="font-bold text-[var(--text-secondary)]">
              Purchase Price
            </h1>

            {data.itemUnits.map((d, index) => (
              <div className="col-span-3 grid grid-cols-3" key={index}>
                <div className="px-3 py-2 border rounded-l-md bg-[var(--background-color)]">
                  {d.unitType}
                </div>
                <div className="px-3 py-2 border bg-[var(--background-color)]">
                  {d.quantity}
                </div>
                <div className="px-3 py-2 border rounded-r-md bg-[var(--background-color)]">
                  {d.purchasePrice}
                </div>
              </div>
            ))}

            <div className="cols-span-3 flex flex-col gap-2">
              <h1 className="font-bold text-[var(--text-secondary)]">
                Location
              </h1>
              <div className="px-3 py-1 border rounded-md bg-[var(--background-color)]">
                {data.location.name}
              </div>
            </div>

            {data.description && (
              <div className="col-span-3 flex flex-col gap-3">
                <h1 className="font-bold text-[var(--text-secondary)]">
                  Description
                </h1>
                <div className="px-3 py-1 border rounded-md bg-[var(--background-color)]">
                  {data.description}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ItemCard;
