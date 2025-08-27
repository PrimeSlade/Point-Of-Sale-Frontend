import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2 } from "lucide-react";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types/UserType";
import type { LocationType } from "@/types/LocationType";
import { toUpperCase } from "@/utils/formatText";
import UserForm from "../forms/wrapper/UserForm";
import type { Role } from "@/types/RoleType";

type UserColumnsProps = {
  onDelete: (id: string) => void;
  isDeleting: boolean;
  locations: LocationType[];
  roles: Role[];
};

const UserColumns = ({
  onDelete,
  isDeleting,
  locations,
  roles,
}: UserColumnsProps): ColumnDef<User>[] => [
  {
    id: "rowIndex",
    header: () => <div className="font-bold text-center">No</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Name</div>,
    enableGlobalFilter: true, //default
  },
  {
    accessorKey: "email",
    header: () => <div className="font-bold">Email</div>,
  },
  {
    id: "role",
    accessorFn: (row) => row.role?.name ?? "",
    header: () => <div className="font-bold">Role</div>,
    cell: ({ row }) => {
      return toUpperCase(row.original?.role?.name);
    },
  },
  {
    id: "location",
    accessorFn: (row) => row.location?.name ?? "",
    header: () => <div className="font-bold">Location</div>,
    cell: ({ row }) => {
      return row.original?.location.name;
    },
  },
  {
    accessorKey: "pricePercent",
    header: () => <div className="font-bold">Price Percent</div>,
    cell: ({ row }) => {
      return `${row.original?.pricePercent}%`;
    },
  },

  {
    accessorKey: "action",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;

      const [alertOpen, setAlertOpen] = useState(false);
      const [isFormOpen, setIsFormOpen] = useState(false);

      const { can } = useAuth();

      return (
        <>
          <div className="flex gap-5 items-center">
            {can("update", "User") && (
              <button onClick={() => setIsFormOpen(true)}>
                <PenLine
                  size={20}
                  className="text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] hover:border hover:border-white"
                />
              </button>
            )}
            {can("delete", "User") && (
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
            onConfirm={() => onDelete(user.id)}
            mode="confirm"
          />
          <UserForm
            open={isFormOpen}
            onClose={setIsFormOpen}
            mode="edit"
            locationData={locations}
            roleData={roles}
            data={user}
          />
        </>
      );
    },
  },
];
export default UserColumns;
