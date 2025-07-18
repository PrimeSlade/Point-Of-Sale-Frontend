import type { HeaderProps } from "@/types/HeaderType";

const Header = ({ header, subHeader, action, className = "" }: HeaderProps) => {
  return (
    <div className="mt-5 flex justify-between">
      <div className="">
        <h1 className={`font-bold ${className}`}>{header}</h1>
        <p className="text-sm text-[var(--text-secondary)]">{subHeader}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default Header;
