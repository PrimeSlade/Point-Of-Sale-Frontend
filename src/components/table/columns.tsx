import type { LocationType } from "@/types/LocationType";
import type { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<LocationType>[] = [
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
    cell: ({ row }) => {},
  },
];

export default columns;
