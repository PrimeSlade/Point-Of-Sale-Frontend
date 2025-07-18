import Header from "@/components/header/Header";
import SettingNav from "@/components/setting/SettingNav";
import { Outlet } from "react-router-dom";

const SettingPage = () => {
  return (
    <div>
      <Header
        header="Settings"
        className="text-3xl"
        subHeader="Manage clinic settings, locations, and users"
      />
      <SettingNav />
      <Outlet />
    </div>
  );
};

export default SettingPage;
