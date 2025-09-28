import Header from "@/components/header/Header";
import NavBar from "@/components/navbar/NavBar";
import { FileText, Wallet } from "lucide-react";
import { Outlet } from "react-router-dom";

const ReportPage = () => {
  const navItems = [
    {
      name: "Expenses",
      path: "expenses",
      icon: <Wallet />,
      subject: "Expense",
    },
    {
      name: "Invoices",
      path: "invoices",
      icon: <FileText />,
      subject: "Invoice",
    },
  ];

  return (
    <div>
      <Header
        header="Financial Overview Reports"
        className="text-3xl"
        subHeader="Manage operational costs and billing efficiently"
      />
      <NavBar navItems={navItems} />
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default ReportPage;
