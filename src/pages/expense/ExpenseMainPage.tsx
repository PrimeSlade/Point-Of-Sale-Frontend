import Header from "@/components/header/Header";
import NavBar from "@/components/navbar/NavBar";
import { DollarSign, Layers } from "lucide-react";
import { Outlet } from "react-router-dom";

const ExpenseMainPage = () => {
  const navItems = [
    {
      name: "Expense",
      path: "expenses",
      icon: <DollarSign />,
      subject: "Expense",
    },
    {
      name: "Category",
      path: "categories",
      icon: <Layers />,
      subject: "Category",
    },
  ];

  return (
    <div>
      <Header
        header="Expense Dashboard"
        className="text-3xl"
        subHeader="Monitor additional expenses for smooth operations"
      />
      <NavBar navItems={navItems} />
      <Outlet />
    </div>
  );
};

export default ExpenseMainPage;
