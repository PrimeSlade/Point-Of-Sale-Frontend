import Header from "@/components/header/Header";
import NavBar from "@/components/navbar/NavBar";
import { DollarSign, Layers } from "lucide-react";
import { Outlet } from "react-router-dom";

const ExpenseMainPage = () => {
  const navItems = [
    { name: "Expense", path: "dashboard", icon: <DollarSign /> },
    { name: "Category", path: "category", icon: <Layers /> },
  ];

  return (
    <div>
      <Header
        header="Expense Dashboard"
        className="text-3xl"
        subHeader="Monitor additional expenses for smooth operations"
      />
      <NavBar navItems={navItems} path="expenses" />
      <Outlet />
    </div>
  );
};

export default ExpenseMainPage;
