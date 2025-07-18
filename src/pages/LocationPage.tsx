import { deleteLocation, fetchLocations } from "@/api/locations";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import LocationForm from "@/components/form/LocationForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import LocationColumns from "@/components/columns/locationColumns";
import { DataTable } from "@/components/table/data-table";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const LocationPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryFn: fetchLocations,
    queryKey: ["locations"],
  });

  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);

  const { mutate: deleteLocationMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });

  const columns = LocationColumns({
    onDelete: deleteLocationMutate,
    isDeleting,
  });

  if (error) {
    return (
      <AlertBox
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        title="Error"
        description={error.message}
        mode={"error"}
      />
    );
  }

  if (isLoading) return <Loading className="h-150" />;

  return (
    <div>
      <Header
        header="Locations"
        className="text-2xl"
        action={
          <DialogButton
            name="Add Location"
            icon={<Plus />}
            form={<LocationForm />}
          />
        }
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default LocationPage;
