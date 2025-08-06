import "./App.css";
import Layout from "@/components/layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import LoginPage from "./pages/LoginPage";
import PatientPage from "./pages/patient/PatientPage";
import DoctorPage from "./pages/DoctorPage";
import TreatmentPage from "./pages/treatment/TreatmentPage";
import InvoicePage from "./pages/InvoicePage";
import ExpensesPage from "./pages/ExpensesPage";
import ReportPage from "./pages/ReportPage";
import SettingPage from "./pages/setting/SettingPage";
import LocationPage from "./pages/setting/LocationPage";
import UserPage from "./pages/setting/UserPage";
import GeneralPage from "./pages/setting/GeneralPage";
import ItemServicePage from "./pages/inventory/ItemPage";
import ItemFormPage from "./pages/inventory/ItemFormPage";
import ServicePage from "./pages/service/ServicePage";
import PatientDetailsPage from "./pages/patient/PatientDetailsPage";
import NestedLayout from "./components/layout/NestedLayout";
import TreatmentFormPage from "./pages/treatment/TreatmentFormPage";

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
          </Route>
          <Route path="invoices" element={<InvoicePage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="settings" element={<SettingPage />}>
            <Route index element={<Navigate to="locations" replace />} />
            <Route path="locations" element={<LocationPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="general" element={<GeneralPage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster richColors />
    </>
  );
}

export default App;
