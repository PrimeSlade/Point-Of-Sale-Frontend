import {
  ClipboardPlus,
  Users,
  GraduationCap,
  ReceiptText,
  Settings,
  Box,
  Receipt,
  NotebookPen,
  ChartNoAxesCombined,
  MapPin,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toUpperCase } from "@/utils/formatText";
import { Button } from "../ui/button";
import AlertBox from "../alertBox/AlertBox";
import { useState } from "react";
import useLogout from "@/hooks/useLogout";

// Menu items.
const items = [
  {
    title: "Inventory",
    url: "items",
    icon: Box,
    subject: "Item",
  },
  {
    title: "Service",
    url: "services",
    icon: Receipt,
    subject: "Service",
  },
  {
    title: "Patients",
    url: "patients",
    icon: Users,
    subject: "Patient",
  },
  {
    title: "Doctors",
    url: "doctors",
    icon: GraduationCap,
    subject: "Doctor",
  },
  {
    title: "Treatment",
    url: "treatments",
    icon: ClipboardPlus,
    subject: "Treatment",
  },
  {
    title: "POS/Invoices",
    url: "invoices",
    icon: ReceiptText,
    subject: "Invoice",
  },
  {
    title: "Expenses",
    url: "expenses",
    icon: NotebookPen,
    subject: ["Expense", "Category"],
  },
  {
    title: "Reports",
    url: "reports",
    icon: ChartNoAxesCombined,
    subject: ["Report-Expense", "Report-Invoice"],
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
    subject: ["Location", "User", "Role"],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, can } = useAuth();

  const { logout } = useLogout();

  const [alertOpen, setAlertOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname.startsWith(path)
      ? "bg-[var(--primary-color)] rounded-md hover:bg-[var(--primary-color-hover)]"
      : "";
  };

  const isTextActive = (path: string) => {
    return location.pathname.startsWith(path)
      ? "text-white"
      : "text-[var(--text-primary)]";
  };

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <div className="flex flex-col justify-between h-screen">
            <SidebarGroup>
              <SidebarGroupLabel>
                <div className="mt-40">
                  <div className="text-2xl font-bold text-black">
                    Yaung Ni Oo
                  </div>
                  <div className="mt-3 p-4 border rounded-xl w-55 flex flex-col gap-2 bg-[var(--background-color)] text-base">
                    <div className="flex items-center gap-3 text-[var(--primary-color)]  ">
                      <MapPin size={20} />
                      <span className="font-bold">
                        {toUpperCase(user!.location.name)}
                      </span>
                    </div>
                    <div>{user!.name}</div>
                    <div>{toUpperCase(user!.role.name)}</div>
                  </div>
                </div>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="mt-40 flex gap-3 w-55 mx-auto">
                  {items.map((item) => {
                    if (!can("read", item.subject)) return null;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={`p-6 ${isActive(
                            `/dashboard/${item.url}`
                          )}`}
                        >
                          <Link
                            to={item.url}
                            className={isTextActive(`/dashboard/${item.url}`)}
                          >
                            <item.icon
                              className={isTextActive(`/dashboard/${item.url}`)}
                            />
                            <span
                              className={`text-xl ${isTextActive(
                                `/dashboard/${item.url}`
                              )}`}
                            >
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="w-55 mx-auto">
                  <SidebarMenuItem>
                    <Button
                      className="w-full bg-white hover:bg-[var(--danger-color)] hover:text-white mb-2 text-black border border-[var(--danger-color)] "
                      onClick={() => setAlertOpen(true)}
                    >
                      Log out
                    </Button>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        </SidebarContent>
      </Sidebar>
      <AlertBox
        open={alertOpen}
        title="Confirm Logout"
        description="Are you sure you want to Log out?"
        onClose={() => setAlertOpen(false)}
        onConfirm={logout}
        mode="confirm"
      />
    </>
  );
}
