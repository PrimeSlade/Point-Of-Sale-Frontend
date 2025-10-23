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
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import PublicRoute from "./routes/PublicRoute";
import ItemServicePage from "./pages/Inventory/ItemPage";
import ItemFormPage from "./pages/Inventory/ItemFormPage";
import { lazy, Suspense } from "react";
import Loading from "./components/loading/Loading";
import DynamicIndex from "./routes/DynamicIndex";

// Lazy load PDF-heavy page
const InvoiceDetailsPage = lazy(
  () => import("./pages/invoice/InvoiceDetailsPage")
);

// Define main dashboard pages
const dashboardPages = [
  {
    title: "Inventory",
    url: "items",
    subject: "Item",
  },
  {
    title: "Service",
    url: "services",
    subject: "Service",
  },
  {
    title: "Patients",
    url: "patients",
    subject: "Patient",
  },
  {
    title: "Doctors",
    url: "doctors",
    subject: "Doctor",
  },
  {
    title: "Treatment",
    url: "treatments",
    subject: "Treatment",
  },
  {
    title: "POS/Invoices",
    url: "invoices",
    subject: "Invoice",
  },
  {
    title: "Expenses",
    url: "finance",
    subject: ["Expense", "Category"],
  },
  {
    title: "Reports",
    url: "reports",
    subject: ["Report-Expense", "Report-Invoice"],
  },
  {
    title: "Settings",
    url: "settings",
    subject: ["Location", "User", "Role"],
  },
];

// Finance sub-pages
const financePages = [
  {
    title: "Expenses",
    url: "expenses",
    subject: "Expense",
  },
  {
    title: "Categories",
    url: "categories",
    subject: "Category",
  },
];

// Reports sub-pages
const reportPages = [
  {
    title: "Expense Reports",
    url: "expenses",
    subject: "Expense",
  },
  {
    title: "Invoice Reports",
    url: "invoices",
    subject: "Invoice",
  },
];

// Settings sub-pages
const settingPages = [
  {
    title: "Locations",
    url: "locations",
    subject: "Location",
  },
  {
    title: "Users",
    url: "users",
    subject: "User",
  },
  {
    title: "Roles",
    url: "roles",
    subject: "Role",
  },
];

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<DynamicIndex url="dashboard" pages={dashboardPages} />}
          />
          <Route
            path="items"
            element={
              <ProtectedRoute action="read" subject={["Item"]}>
                <NestedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ItemServicePage />} />
            <Route
              path="add"
              element={
                <ProtectedRoute action="create" subject={["Item"]}>
                  <ItemFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit/:id"
              element={
                <ProtectedRoute action="update" subject={["Item"]}>
                  <ItemFormPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="services"
            element={
              <ProtectedRoute action="read" subject={["Service"]}>
                <ServicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="patients"
            element={
              <ProtectedRoute action="read" subject={["Patient"]}>
                <PatientPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="patients/:id"
            element={
              <ProtectedRoute action="read" subject={["Patient"]}>
                <PatientDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="doctors"
            element={
              <ProtectedRoute action="read" subject={["Doctor"]}>
                <DoctorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="treatments"
            element={
              <ProtectedRoute action="read" subject={["Treatment"]}>
                <NestedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TreatmentPage />} />
            <Route
              path="add"
              element={
                <ProtectedRoute action="create" subject={["Treatment"]}>
                  <TreatmentFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit/:id"
              element={
                <ProtectedRoute action="update" subject={["Treatment"]}>
                  <TreatmentFormPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="invoices"
            element={
              <ProtectedRoute action="read" subject={["Invoice"]}>
                <NestedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<InvoicePage />} />
            <Route
              path="add"
              element={
                <ProtectedRoute action="create" subject={["Invoice"]}>
                  <InvoiceFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute action="read" subject={["Invoice"]}>
                  <Suspense
                    fallback={
                      <Loading className="flex justify-center h-screen items-center" />
                    }
                  >
                    <InvoiceDetailsPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="finance"
            element={
              <ProtectedRoute action="read" subject={["Expense", "Category"]}>
                <ExpenseMainPage />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <DynamicIndex url="dashboard/finance" pages={financePages} />
              }
            />
            <Route
              path="expenses"
              element={
                <ProtectedRoute action="read" subject={["Expense"]}>
                  <ExpensesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="categories"
              element={
                <ProtectedRoute action="read" subject={["Category"]}>
                  <CategoryPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="reports"
            element={
              <ProtectedRoute
                action="read"
                subject={["Report-Expense", "Report-Invoice"]}
              >
                <ReportPage />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <DynamicIndex url="dashboard/reports" pages={reportPages} />
              }
            />
            <Route
              path="invoices"
              element={
                <ProtectedRoute action="read" subject={["Report-Invoice"]}>
                  <InvoiceReportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="expenses"
              element={
                <ProtectedRoute action="read" subject={["Report-Expense"]}>
                  <ExpenseReportPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="settings"
            element={
              <ProtectedRoute
                action="read"
                subject={["Location", "User", "Role"]}
              >
                <SettingPage />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <DynamicIndex url="dashboard/settings" pages={settingPages} />
              }
            />
            <Route
              path="locations"
              element={
                <ProtectedRoute action="read" subject={["Location"]}>
                  <LocationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute action="read" subject={["User"]}>
                  <UserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="roles"
              element={
                <ProtectedRoute action="read" subject={["Role"]}>
                  <RolePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="roles/add"
              element={
                <ProtectedRoute action="create" subject={["Role"]}>
                  <RoleFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="roles/edit/:id"
              element={
                <ProtectedRoute action="update" subject={["Role"]}>
                  <RoleFormPage />
                </ProtectedRoute>
              }
            />
            {/* <Route path="general" element={<GeneralPage />} /> */}
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster richColors />
    </>
  );
}

export default App;
