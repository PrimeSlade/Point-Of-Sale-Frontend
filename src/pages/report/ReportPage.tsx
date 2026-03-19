import Header from "@/components/header/Header";
import NavBar from "@/components/navbar/NavBar";
import { FileText, Wallet } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReportPage = () => {
  const { t } = useTranslation();

  const navItems = [
    {
      name: t("expense.management"),
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
        header={t("report.financialOverview")}
        className="text-3xl"
        subHeader={t("report.subHeader")}
      />
      <NavBar navItems={navItems} />
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default ReportPage;
