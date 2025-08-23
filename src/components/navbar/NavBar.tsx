import { NavLink } from "react-router-dom";

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

type NavBarProps = {
  navItems: NavItem[];
};

const NavBar = ({ navItems }: NavBarProps) => {
  return (
    <nav>
      <ul className="flex gap-20 border-b mt-10">
        {navItems.map((item, i) => (
          <li key={i}>
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `flex gap-2 pb-3 font-bold ${
                  isActive
                    ? "text-[var(--primary-color)] border-b-2 border-b-[var(--primary-color)]"
                    : ""
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
