import DialogButton from "@/components/button/DialogButton";
import Header from "@/components/header/Header";
import { useState } from "react";

const TreatmentPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <Header
        header="Treatment Management"
        subHeader="All your treatment records, one place"
        className="text-3xl"
        action={
          <div className="flex gap-2">
            <DialogButton
              name="Register New Treatment"
              openFrom={() => setIsFormOpen(true)}
            />
          </div>
        }
      />
    </div>
  );
};

export default TreatmentPage;
