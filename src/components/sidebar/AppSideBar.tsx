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
  BookOpen,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const NAV_ITEMS = [
  { titleKey: "sidebar.inventory", url: "items", icon: Box, subject: "Item" },
  { titleKey: "sidebar.service", url: "services", icon: Receipt, subject: "Service" },
  { titleKey: "sidebar.patients", url: "patients", icon: Users, subject: "Patient" },
  { titleKey: "sidebar.doctors", url: "doctors", icon: GraduationCap, subject: "Doctor" },
  { titleKey: "sidebar.treatment", url: "treatments", icon: ClipboardPlus, subject: "Treatment" },
  { titleKey: "sidebar.invoices", url: "invoices", icon: ReceiptText, subject: "Invoice" },
  { titleKey: "sidebar.expenses", url: "finance", icon: NotebookPen, subject: ["Expense", "Category"] },
  { titleKey: "sidebar.reports", url: "reports", icon: ChartNoAxesCombined, subject: ["Report-Expense", "Report-Invoice"] },
  { titleKey: "sidebar.settings", url: "settings", icon: Settings, subject: ["Location", "User", "Role"] },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, can } = useAuth();
  const { logout } = useLogout();
  const { t } = useTranslation();
  const [alertOpen, setAlertOpen] = useState(false);
  const [lang, setLang] = useState(i18n.language === "my" ? "my" : "en");

  const switchLang = (l: "en" | "my") => {
    i18n.changeLanguage(l);
    localStorage.setItem("lang", l);
    setLang(l);
  };

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
              <div className="mt-5">
                <div className="flex items-center justify-between px-4">
                  <div className="text-2xl font-bold text-black">
                    Yaung Ni Oo
                  </div>
                  <SidebarTrigger />
                </div>
                <div className="mx-auto mt-3 p-4 border rounded-xl w-55 flex flex-col gap-2 bg-[var(--background-color)] text-base">
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

              <SidebarGroupContent>
                <SidebarMenu className="flex gap-3 w-55 mx-auto mt-3">
                  {NAV_ITEMS.map((item) => {
                    if (!can("read", item.subject)) return null;
                    return (
                      <SidebarMenuItem key={item.titleKey}>
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
                              {t(item.titleKey)}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`p-6 ${isActive("/dashboard/help")}`}
                    >
                      <Link
                        to="help"
                        className={isTextActive("/dashboard/help")}
                      >
                        <BookOpen
                          className={isTextActive("/dashboard/help")}
                        />
                        <span
                          className={`text-xl ${isTextActive("/dashboard/help")}`}
                        >
                          {t("sidebar.help")}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="w-55 mx-auto">
                  <SidebarMenuItem>
                    <div className="flex overflow-hidden rounded-lg border border-[var(--border-color)] mb-2">
                      {(["en", "my"] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => switchLang(l)}
                          className={`flex-1 py-1 text-xs font-medium transition-colors ${
                            lang === l
                              ? "bg-[var(--primary-color)] text-white"
                              : "bg-white text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          {l === "en" ? "EN" : "မြန်မာ"}
                        </button>
                      ))}
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Button
                      className="w-full bg-white hover:bg-[var(--danger-color)] hover:text-white mb-2 text-black border border-[var(--danger-color)] "
                      onClick={() => setAlertOpen(true)}
                    >
                      {t("sidebar.logout")}
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
        title={t("sidebar.confirmLogout")}
        description={t("sidebar.logoutDescription")}
        onClose={() => setAlertOpen(false)}
        onConfirm={logout}
        mode="confirm"
      />
    </>
  );
}
