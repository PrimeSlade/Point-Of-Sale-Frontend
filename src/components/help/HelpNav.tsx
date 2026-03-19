import { HELP_NAV } from "@/data/helpContent";

type HelpNavProps = {
  active: string;
  onScrollTo: (id: string) => void;
};

const HelpNav = ({ active, onScrollTo }: HelpNavProps) => (
  <aside className="hidden lg:block">
    <div className="fixed top-8 w-48">
      <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
        On this page
      </p>
      <nav className="flex flex-col">
        {HELP_NAV.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onScrollTo(id)}
            className={`relative flex items-center px-3 py-2 text-left text-xs transition-all ${
              active === id
                ? "font-semibold text-[var(--primary-color)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {active === id && (
              <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-[var(--primary-color)]" />
            )}
            <span
              className={`pl-2 transition-transform ${active === id ? "translate-x-1" : ""}`}
            >
              {label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  </aside>
);

export default HelpNav;
