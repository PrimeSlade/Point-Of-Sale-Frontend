import { type Lang } from "@/data/helpContent";

export const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className="scroll-mt-8 border-b border-[var(--border-color)] py-12 first:pt-0 last:border-0"
  >
    <h2 className="mb-6 text-xl font-bold text-[var(--text-primary)]">
      {title}
    </h2>
    <div className="space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
      {children}
    </div>
  </section>
);

export const Sub = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mt-8">
    <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">
      {title}
    </h3>
    <div className="space-y-2">{children}</div>
  </div>
);

export const Formula = ({ children }: { children: React.ReactNode }) => (
  <div className="my-3 rounded-lg border border-[var(--border-color)] bg-[var(--background-color)] px-4 py-3 font-mono text-xs leading-6 text-[var(--text-primary)]">
    {children}
  </div>
);

export const Example = ({
  lang = "en",
  children,
}: {
  lang?: Lang;
  children: React.ReactNode;
}) => (
  <div className="my-4 overflow-hidden rounded-lg border border-[var(--border-color)]">
    <div className="flex items-center gap-1.5 border-b border-[var(--border-color)] bg-[var(--primary-color)] px-3 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
      <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-white/80">
        {lang === "en" ? "Example" : "ဥပမာအနေနဲ့"}
      </span>
    </div>
    <div className="bg-[var(--primary-bg)] px-4 py-3 text-xs leading-7 text-[var(--text-primary)]">
      {children}
    </div>
  </div>
);

export const Steps = ({ items }: { items: string[] }) => (
  <ol className="space-y-2">
    {items.map((step, i) => (
      <li key={i} className="flex gap-3">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--primary-color)] text-[10px] font-bold text-white">
          {i + 1}
        </span>
        <span>{step}</span>
      </li>
    ))}
  </ol>
);

export const Term = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex gap-3">
    <code className="mt-0.5 shrink-0 rounded border border-[var(--border-color)] bg-[var(--background-color)] px-1.5 py-0.5 text-xs font-medium text-[var(--text-primary)]">
      {label}
    </code>
    <span>{children}</span>
  </div>
);
