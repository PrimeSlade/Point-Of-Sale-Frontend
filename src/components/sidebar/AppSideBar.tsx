import {
  ClipboardPlus,
  Users,
  GraduationCap,
  ReceiptText,
  Settings,
  Box,
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

// Menu items.
const items = [
  {
    title: "Inventory",
    url: "items",
    icon: Box,
  },
  {
    title: "Patients",
    url: "patients",
    icon: Users,
  },
  {
    title: "Doctors",
    url: "doctors",
    icon: GraduationCap,
  },
  {
    title: "POS/Treatment",
    url: "treatments",
    icon: ClipboardPlus,
  },
  {
    title: "Invoices",
    url: "invoices",
    icon: ReceiptText,
  },
  {
    title: "Expenses",
    url: "expenses",
    icon: NotebookPen,
  },
  {
    title: "Report",
    url: "report",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="mt-40">
              <div className="text-2xl font-bold text-black">Yaung Ni Oo</div>
              <div className="mt-3 p-4 border rounded-xl w-55 flex flex-col gap-2 bg-[var(--background-color)] text-base">
                <div className="flex items-center gap-3 text-[var(--primary-color)]  ">
                  <MapPin size={20} />
                  <span className="font-bold">Clinic</span>
                </div>
                <div>Zin Min Paing</div>
                <div>Admin</div>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-40 flex gap-3 w-55 mx-auto ">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`p-6 ${isActive(`/dashboard/${item.url}`)}`}
                  >
                    <Link to={item.url}>
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
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
