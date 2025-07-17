import Header from "@/components/header/Header";
import SettingNav from "@/components/setting/SettingNav";
import { Outlet } from "react-router-dom";

const SettingPage = () => {
  return (
    <div>
      <Header
        header="Settings"
        subHeader="Manage clinic settings, locations, and users"
      />
      <div className="w-full">
        <SettingNav />
      </div>
      <Outlet />
    </div>
  );
};

export default SettingPage;
