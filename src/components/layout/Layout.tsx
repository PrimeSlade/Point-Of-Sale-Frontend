import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "../sidebar/AppSideBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const { open } = useSidebar();

  const width = () => {
    return open ? "w-[75%]" : "w-[90%]";
  };

  return (
    <>
      <AppSidebar />
      <SidebarTrigger className="mt-2" />
      <div className={`ml-5 ${width()}`}>
        <Outlet />
      </div>
    </>
  );
}
