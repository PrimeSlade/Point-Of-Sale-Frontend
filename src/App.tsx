import Layout from "@/components/layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import NestedLayout from "./components/layout/NestedLayout";
import LoginPage from "./pages/auth/LoginPage";
import DoctorPage from "./pages/DoctorPage";
import CategoryPage from "./pages/expense/CategoryPage";
import ExpenseMainPage from "./pages/expense/ExpenseMainPage";
import ExpensesPage from "./pages/expense/ExpensesPage";
import ItemFormPage from "./pages/inventory/ItemFormPage";
import ItemServicePage from "./pages/inventory/ItemPage";
import InvoiceFormPage from "./pages/invoice/InvoiceFormPage";
import InvoicePage from "./pages/invoice/InvoicePage";
import PatientDetailsPage from "./pages/patient/PatientDetailsPage";
import PatientPage from "./pages/patient/PatientPage";
import ReportPage from "./pages/report/ReportPage";
import ServicePage from "./pages/service/ServicePage";
import GeneralPage from "./pages/setting/GeneralPage";
import LocationPage from "./pages/setting/LocationPage";
import RoleFormPage from "./pages/setting/RoleFormPage";
import RolePage from "./pages/setting/RolePage";
import SettingPage from "./pages/setting/SettingPage";
import UserPage from "./pages/setting/UserPage";
import TreatmentFormPage from "./pages/treatment/TreatmentFormPage";
import TreatmentPage from "./pages/treatment/TreatmentPage";
import InvoiceReportPage from "./pages/report/InvoiceReportPage";
import ExpenseReportPage from "./pages/report/ExpenseReportPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route path="items" element={<NestedLayout />}>
            <Route index element={<ItemServicePage />} />
            <Route path="add" element={<ItemFormPage />} />
            <Route path="edit/:id" element={<ItemFormPage />} />
          </Route>
          <Route path="services" element={<ServicePage />} />
          <Route path="patients" element={<PatientPage />} />
          <Route path="patients/:id" element={<PatientDetailsPage />} />
          <Route path="doctors" element={<DoctorPage />} />
          <Route path="treatments" element={<NestedLayout />}>
            <Route index element={<TreatmentPage />} />
            <Route path="add" element={<TreatmentFormPage />} />
            <Route path="edit/:id" element={<TreatmentFormPage />} />
          </Route>
          <Route path="invoices" element={<NestedLayout />}>
            <Route index element={<InvoicePage />} />
            <Route path="add" element={<InvoiceFormPage />} />
            <Route path="edit/:id" element={<InvoiceFormPage />} />
          </Route>
          <Route path="expenses" element={<ExpenseMainPage />}>
            <Route path="" element={<ExpensesPage />} />
            <Route path="category" element={<CategoryPage />} />
          </Route>
          <Route path="reports" element={<ReportPage />}>
            <Route path="invoices" element={<InvoiceReportPage />} />
            <Route path="expenses" element={<ExpenseReportPage />} />
          </Route>
          <Route path="settings" element={<SettingPage />}>
            {/* Need to handle this */}
            <Route index element={<Navigate to="locations" replace />} />
            <Route path="locations" element={<LocationPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="roles" element={<RolePage />} />
            <Route path="roles/add" element={<RoleFormPage />} />
            <Route path="roles/edit/:id" element={<RoleFormPage />} />
            <Route path="general" element={<GeneralPage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster richColors />
    </>
  );
}

export default App;
