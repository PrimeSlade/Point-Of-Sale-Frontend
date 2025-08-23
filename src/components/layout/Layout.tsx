import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "../sidebar/AppSideBar";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Loading from "../loading/Loading";

export default function Layout() {
  const { open } = useSidebar();

  const width = () => {
    return open ? " md:w-[60%] lg:w-[75%]" : "w-[90%]";
  };

  const { isLoading } = useAuth();

  if (isLoading)
    return (
      <Loading className="flex justify-center h-screen items-center w-[100%]" />
    );

  return (
    <>
      <AppSidebar />
      <SidebarTrigger className="mt-2" />
      <div className={`mx-auto ${width()}`}>
        <Outlet />
      </div>
    </>
  );
}
