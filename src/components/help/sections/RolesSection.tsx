import { Example, Section, Sub, Term } from "../HelpPrimitives";

const RolesSection = () => (
  <Section id="roles" title="Roles & Access">
    <p>
      Every staff account is assigned a role. The role controls which parts of
      the system the user can see and what actions they can take.
    </p>

    <Sub title="How roles work">
      <p>
        A role is a named set of permissions (e.g. "Cashier", "Receptionist",
        "Admin"). When a user is assigned a role, they inherit all the
        permissions defined on it. Menu items and action buttons are
        automatically hidden if the user's role does not have the required
        permission.
      </p>
    </Sub>

    <Sub title="Permission structure">
      <p>Each permission is a combination of an action and a subject:</p>
      <div className="space-y-2">
        <Term label="read">View lists and details.</Term>
        <Term label="create">Add new records.</Term>
        <Term label="update">Edit existing records.</Term>
        <Term label="delete">Remove records.</Term>
      </div>
      <p className="mt-2">
        Subjects include: Patient, Doctor, Treatment, Invoice, Item, Service,
        Expense, Category, Location, User, Role, Report-Invoice, Report-Expense.
      </p>
    </Sub>

    <Sub title="Price Percent on user accounts">
      <p>
        Each staff user has a{" "}
        <strong className="text-[var(--text-primary)]">Price Percent</strong>{" "}
        value that controls the markup applied when they create an invoice. This
        is set by an administrator under Settings → Users.
      </p>
      <Example>
        A receptionist with Price Percent = 50 will bill items at purchase price + 50%.
        <br />
        An admin with Price Percent = 100 will bill items at purchase price + 100%
        (double the cost).
        <br />
        Price Percent = 0 means the item is billed at exactly its purchase price.
      </Example>
    </Sub>
  </Section>
);

export default RolesSection;
