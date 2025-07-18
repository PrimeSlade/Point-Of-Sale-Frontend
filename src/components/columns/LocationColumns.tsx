import type { LocationType } from "@/types/LocationType";
import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";

const LocationColumns = (
  mutate: (id: number) => void,
  isPending: boolean
): ColumnDef<LocationType>[] => [
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Name</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div className="font-bold">Phone Number</div>,
    cell: ({ row }) => {
      return row.original.phoneNumber?.number;
    },
  },
  {
    accessorKey: "address",
    header: () => <div className="font-bold">Address</div>,
  },
  {
    accessorKey: "action",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      const location = row.original;

      return (
        <>
          <div className="flex gap-5 items-center">
            <button>
              <PenLine
                size={20}
                className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] hover:border hover:border-white"
              />
            </button>
            <button onClick={() => mutate(location.id)} disabled={isPending}>
              <Trash2
                size={20}
                className="text-[var(--danger-color)] hover:text-[var(--danger-color-hover)] hover:border hover:border-white"
              />
            </button>
          </div>
        </>
      );
    },
  },
];
export default LocationColumns;
