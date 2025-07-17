import { AlignJustify, MapPin, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SettingNav = () => {
  const navItems = [
    { name: "Locations", path: "locations", icon: <MapPin /> },
    { name: "Users", path: "users", icon: <Users /> },
    { name: "General", path: "general", icon: <AlignJustify /> },
  ];

  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path)
      ? "text-[var(--primary-color)] border-b-2 border-b-[var(--primary-color)]"
      : "";
  };

  return (
    <nav>
      <ul className="flex gap-20 border-b mt-10">
        {navItems.map((item) => (
          <li>
            <Link
              to={item.path}
              className={`flex gap-2 pb-3 font-bold ${isActive(
                `/dashboard/settings/${item.path}`
              )}`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SettingNav;
