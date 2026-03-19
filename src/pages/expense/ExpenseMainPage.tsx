import Header from "@/components/header/Header";
import NavBar from "@/components/navbar/NavBar";
import { DollarSign, Layers } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ExpenseMainPage = () => {
  const { t } = useTranslation();

  const navItems = [
    {
      name: t("expense.management"),
      path: "expenses",
      icon: <DollarSign />,
      subject: "Expense",
    },
    {
      name: t("category.management"),
      path: "categories",
      icon: <Layers />,
      subject: "Category",
    },
  ];

  return (
    <div>
      <Header
        header={t("expense.management")}
        className="text-3xl"
        subHeader="Monitor additional expenses for smooth operations"
      />
      <NavBar navItems={navItems} />
      <Outlet />
    </div>
  );
};

export default ExpenseMainPage;
