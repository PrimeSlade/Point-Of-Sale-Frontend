import { Link, useLocation } from "react-router-dom";

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

type NavBarProps = {
  navItems: NavItem[];
  path: string;
};

const NavBar = ({ navItems, path }: NavBarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path)
      ? "text-[var(--primary-color)] border-b-2 border-b-[var(--primary-color)]"
      : "";
  };

  return (
    <nav>
      <ul className="flex gap-20 border-b mt-10">
        {navItems.map((item, i) => (
          <li key={i}>
            <Link
              to={item.path}
              className={`flex gap-2 pb-3 font-bold ${isActive(
                `/dashboard/${path}/${item.path}`
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

export default NavBar;
