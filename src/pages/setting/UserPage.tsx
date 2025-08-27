import { getLocations } from "@/api/locations";
import { getRoles } from "@/api/role";
import { deleteUserById, getUsers } from "@/api/user";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import UserColumns from "@/components/columns/UserColumns";
import UserForm from "@/components/forms/wrapper/UserForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { DataTable } from "@/components/table/data-table";
import { useAuth } from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserPage = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const navigate = useNavigate();

  //client side filtering
  const [globalFilter, setGlobalFilter] = useState("");

  //useAuth
  const { user, can } = useAuth();
  const { logout } = useLogout();

  //tenstack;
  const {
    data: users,
    isLoading: isFetchingUsers,
    error: fetchUserError,
  } = useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
  });

  const {
    data: locations,
    isLoading: isFetchingLocations,
    error: fetchLocationError,
  } = useQuery({
    queryFn: getLocations,
    queryKey: ["locations"],
  });

  const {
    data: roles,
    isLoading: isFetchingRoles,
    error: fetchRoleError,
  } = useQuery({
    queryFn: getRoles,
    queryKey: ["roles"],
  });

  const { mutate: deleteUserMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteUserById,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (data.data.id === user!.id) {
        setTimeout(() => {
          logout();
          navigate("/");
        }, 3000);
      }
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const fetchError = fetchLocationError || fetchUserError || fetchRoleError;
  const isLoading = isFetchingLocations || isFetchingUsers || isFetchingRoles;

  useEffect(() => {
    if (fetchError) {
      setErrorOpen(true);
    }
  }, [fetchError]);

  if (isLoading) return <Loading className="h-150" />;

  const columns = UserColumns({
    onDelete: deleteUserMutate,
    isDeleting,
    locations,
    roles: roles.data,
  });

  return (
    <div>
      <Header
        header="Locations"
        className="text-2xl"
        action={
          <>
            {can("create", "User") && (
              <DialogButton
                name="Add User"
                icon={<Plus />}
                openFrom={() => setIsFormOpen(true)}
              />
            )}
          </>
        }
      />
      <DataTable
        columns={columns}
        data={users.data ?? []}
        prompt="Search by names or emails"
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {fetchError && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Error"
          description={fetchError.message}
          mode={"error"}
        />
      )}
      <UserForm
        open={isFormOpen}
        onClose={setIsFormOpen}
        mode="create"
        locationData={locations}
        roleData={roles.data}
      />
    </div>
  );
};

export default UserPage;
