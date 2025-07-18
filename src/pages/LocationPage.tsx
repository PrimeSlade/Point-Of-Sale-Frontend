import { fetchLocations } from "@/api/locations";
import AlertBox from "@/components/alertBox/AlertBox";
import DialogButton from "@/components/button/DialogButton";
import LocationForm from "@/components/form/LocationForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import columns from "@/components/table/Columns";
import { DataTable } from "@/components/table/data-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const LocationPage = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: fetchLocations,
    queryKey: ["locations"],
  });

  const [errorOpen, setErrorOpen] = useState(false);

  console.log(error);

  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);

  // const { mutate } = useMutation({
  //   mutationFn:
  // });

  if (error) {
    return (
      // <div className="p-4 bg-red-100 text-red-700 rounded">
      //   Error: {error.message}
      // </div>
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
