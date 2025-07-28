import DialogButton from "@/components/button/DialogButton";
import Header from "@/components/header/Header";
import { Plus } from "lucide-react";
import { useState } from "react";

const ServicePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div>
      <Header
        header="Service"
        className="text-3xl"
        subHeader="Manage services"
        action={
          <div className="flex gap-2">
            <DialogButton
              name="Add Service"
              icon={<Plus />}
              openFrom={() => setIsFormOpen(true)}
            />
          </div>
        }
      />
    </div>
  );
};

export default ServicePage;
