import type { HeaderProps } from "@/types/HeaderType";

const Header = ({ header, subHeader, action }: HeaderProps) => {
  return (
    <div className="mt-5 flex justify-between">
      <div className="">
        <h1 className="font-bold text-3xl">{header}</h1>
        <p className="text-sm text-[var(--text-secondary)]">{subHeader}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default Header;
