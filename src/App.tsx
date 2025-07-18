import "./App.css";
import Layout from "@/components/layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import InventoryPage from "./pages/InventoryPage";
import PatientPage from "./pages/PatientPage";
import DoctorPage from "./pages/DoctorPage";
import TreatmentPage from "./pages/TreatmentPage";
import InvoicePage from "./pages/InvoicePage";
import ExpensesPage from "./pages/ExpensesPage";
import ReportPage from "./pages/ReportPage";
import SettingPage from "./pages/SettingPage";
import LocationPage from "./pages/LocationPage";
import UserPage from "./pages/UserPage";
import GeneralPage from "./pages/GeneralPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route path="items" element={<InventoryPage />} />
        <Route path="patients" element={<PatientPage />} />
        <Route path="doctors" element={<DoctorPage />} />
        <Route path="treatments" element={<TreatmentPage />} />
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
  );
}

export default App;
