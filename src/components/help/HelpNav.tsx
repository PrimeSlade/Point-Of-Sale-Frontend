import { HELP_NAV, type Lang } from "@/data/helpContent";

type HelpNavProps = {
  active: string;
  lang: Lang;
  onScrollTo: (id: string) => void;
};

const HelpNav = ({ active, lang, onScrollTo }: HelpNavProps) => (
  <aside className="hidden lg:block">
    <div className="fixed top-8 w-48">
      <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
        {lang === "en" ? "On this page" : "ဤစာမျက်နှာတွင်"}
      </p>
      <nav className="flex flex-col">
        {HELP_NAV.map(({ id, en, my }) => (
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
              {lang === "en" ? en : my}
            </span>
          </button>
        ))}
      </nav>
    </div>
  </aside>
);

export default HelpNav;
