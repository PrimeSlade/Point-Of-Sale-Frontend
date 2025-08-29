import { deleteRoleById, getRoles } from "@/api/roles";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import RoleColumns from "@/components/columns/RoleColumns";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { DataTable } from "@/components/table/data-table";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RolePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [errorOpen, setErrorOpen] = useState(false);

  //client side filtering
  const [globalFilter, setGlobalFilter] = useState("");

  //useAuth
  const { can } = useAuth();

  //tenstack

  //roles
  const {
    data: roles,
    isLoading: isFetchingRoles,
    error: fetchRoleError,
  } = useQuery({
    queryFn: getRoles,
    queryKey: ["roles"],
  });

  const { mutate: deleteRoleMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteRoleById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (fetchRoleError) {
      setErrorOpen(true);
    }
  }, [fetchRoleError]);

  if (isFetchingRoles) return <Loading className="h-150" />;

  const columns = RoleColumns({
    onDelete: deleteRoleMutate,
    isDeleting,
  });

  return (
    <div>
      <Header
        header="Roles"
        className="text-2xl"
        action={
          <>
            {can("create", "Role") && (
              <DialogButton
                name="Add Role"
                icon={<Plus />}
                openFrom={() => navigate("/dashboard/settings/roles/add")}
              />
            )}
          </>
        }
      />
      <DataTable
        columns={columns}
        data={roles.data ?? []}
        prompt="Search by names or emails"
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {fetchRoleError && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Error"
          description={fetchRoleError.message}
          mode={"error"}
        />
      )}
    </div>
  );
};

export default RolePage;
