import DialogButton from "@/components/button/DialogButton";
import Header from "@/components/header/Header";
import { Plus } from "lucide-react";
import { useState } from "react";

const ExpensesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  //tenstack

  return (
    <Header
      header="Expenses"
      className="text-2xl"
      action={
        <DialogButton
          name="Add Expense"
          icon={<Plus />}
          openFrom={() => setIsFormOpen(true)}
        />
      }
    />
  );
};

export default ExpensesPage;
