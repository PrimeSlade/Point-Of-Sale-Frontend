import { usePermissions, useRole } from "@/hooks/useRoles";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import RoleForm from "@/components/forms/wrapper/RoleForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RoleFormPage = () => {
  const navigate = useNavigate();

  const [errorOpen, setErrorOpen] = useState(false);

  const { id } = useParams();
  const isEdit = Boolean(id);

  //tenstack
  const {
    data: role,
    isLoading: isFetchingRole,
    error: fetchRoleError,
  } = useRole(id);

  const {
    data: permissions,
    isLoading: isFetchingPermissions,
    error: fetchPermissionError,
  } = usePermissions();

  const fetchError = fetchPermissionError || fetchRoleError;
  const isLoading = isFetchingPermissions || isFetchingRole;

  useEffect(() => {
    if (fetchError) {
      setErrorOpen(true);
    }
  }, [fetchError]);

  if (isLoading) return <Loading className="h-150" />;

  return (
    <div>
      <Header
        header="Add Role"
        className="text-2xl"
        action={
          <DialogButton
            name="Back to Role Page"
            openFrom={() => navigate("/dashboard/settings/roles")}
          />
        }
      />
      <RoleForm
        mode={isEdit ? "edit" : "create"}
        data={role?.data}
        permissions={permissions.data}
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
    </div>
  );
};

export default RoleFormPage;
