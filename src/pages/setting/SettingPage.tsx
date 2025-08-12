import Header from "@/components/header/Header";
import NavBar from "@/components/navbar/NavBar";
import { AlignJustify, MapPin, Users } from "lucide-react";
import { Outlet } from "react-router-dom";

const SettingPage = () => {
  const navItems = [
    { name: "Locations", path: "locations", icon: <MapPin /> },
    { name: "Users", path: "users", icon: <Users /> },
    { name: "General", path: "general", icon: <AlignJustify /> },
  ];

  return (
    <div>
      <Header
        header="Settings"
        className="text-3xl"
        subHeader="Manage clinic settings, locations, and users"
      />
      <NavBar navItems={navItems} path="settings" />
      <Outlet />
    </div>
  );
};

export default SettingPage;
