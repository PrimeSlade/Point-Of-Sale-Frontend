import DialogButton from "@/components/button/DialogButton";
import LocationForm from "@/components/form/LocationForm";

import Header from "@/components/header/Header";
import { Plus } from "lucide-react";

const LocationPage = () => {
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
    </div>
  );
};

export default LocationPage;
