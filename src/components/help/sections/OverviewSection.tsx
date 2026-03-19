import { Section } from "../HelpPrimitives";

const OverviewSection = () => (
  <Section id="overview" title="Overview">
    <p>
      This system handles the day-to-day operations of Yaung Ni Oo Hospital —
      from registering patients and recording treatments to generating invoices
      and tracking expenses.
    </p>
    <p>Here is a quick map of how everything connects:</p>
    <div className="rounded-lg border border-[var(--border-color)] bg-[var(--background-color)] p-4 text-xs leading-7">
      <span className="font-semibold text-[var(--text-primary)]">Patient</span>
      {" → "}
      <span className="font-semibold text-[var(--text-primary)]">Treatment</span>
      {" (linked to a Doctor) → "}
      <span className="font-semibold text-[var(--text-primary)]">Invoice</span>
      {" (items + services + discounts) → "}
      <span className="font-semibold text-[var(--text-primary)]">Payment recorded</span>
    </div>
    <p>
      Expenses and reports are separate from patient billing and are used to
      track the hospital's own operational costs.
    </p>
  </Section>
);

export default OverviewSection;
