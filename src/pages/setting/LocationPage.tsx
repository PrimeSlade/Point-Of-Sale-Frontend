import { deleteLocation, fetchLocations } from "@/api/locations";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import LocationForm from "@/components/forms/wrapper/LocationForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import LocationColumns from "@/components/columns/LocationColumns";
import { DataTable } from "@/components/table/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LocationPage = () => {
  const queryClient = useQueryClient();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");

  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryFn: fetchLocations,
    queryKey: ["locations"],
  });

  useEffect(() => {
    if (fetchError) {
      setErrorOpen(true);
    }
  }, [fetchError]);

  const { mutate: deleteLocationMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteLocation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const columns = LocationColumns({
    onDelete: deleteLocationMutate,
    isDeleting,
  });

  if (isLoading) return <Loading className="h-150" />;

  return (
    <>
      <div>
        <Header
          header="Locations"
          className="text-2xl"
          action={
            <DialogButton
              name="Add Location"
              icon={<Plus />}
              openFrom={() => setIsFormOpen(true)}
            />
          }
        />
        <DataTable
          columns={columns}
          data={data ?? []}
          prompt="Search by names or phone numbers"
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
      </div>
      <LocationForm open={isFormOpen} onClose={setIsFormOpen} mode="create" />
    </>
  );
};

export default LocationPage;
