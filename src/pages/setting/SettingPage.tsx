import Header from "@/components/header/Header";
import NavBar from "@/components/navbar/NavBar";
import { AlignJustify, MapPin, UserCheck, Users } from "lucide-react";
import { Outlet } from "react-router-dom";

const SettingPage = () => {
  const navItems = [
    {
      name: "Locations",
      path: "locations",
      icon: <MapPin />,
      subject: "Location",
    },
    { name: "Users", path: "users", icon: <Users />, subject: "User" },
    { name: "Roles", path: "roles", icon: <UserCheck />, subject: "Role" },
    {
      name: "General",
      path: "general",
      icon: <AlignJustify />,
      subject: "all",
    },
  ];

  return (
    <div>
      <Header
        header="Settings"
        className="text-3xl"
        subHeader="Manage clinic settings, locations, and users"
      />
      <NavBar navItems={navItems} />
      <Outlet />
    </div>
  );
};

export default SettingPage;
