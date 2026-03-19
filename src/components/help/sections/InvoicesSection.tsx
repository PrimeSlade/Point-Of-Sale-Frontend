import { Section, Sub, Steps, Term } from "../HelpPrimitives";

const InvoicesSection = () => (
  <Section id="invoices" title="Invoices & Billing">
    <p>
      Invoices are created after a treatment. You can add inventory items and
      services to the invoice, apply per-item discounts, and then apply a final
      invoice-level discount before recording payment.
    </p>

    <Sub title="How to create an invoice">
      <Steps
        items={[
          'Go to POS / Invoices and click "Add".',
          "Select the location and link the treatment (or mark it as a walk-in).",
          "Add inventory items by barcode and set quantities.",
          "Add any services (consultation fees, lab tests, etc.).",
          "Apply per-item discount amounts if needed.",
          "Apply an overall invoice discount if applicable.",
          "Select the payment method and record payment.",
        ]}
      />
    </Sub>

    <Sub title="Payment methods">
      <div className="space-y-2">
        <Term label="cash">Physical cash paid at the counter.</Term>
        <Term label="kpay">
          KBZPay mobile transfer. Note the reference number in the description field.
        </Term>
        <Term label="wave">
          Wave Money transfer. Note the reference number in the description field.
        </Term>
        <Term label="others">
          Any other method (bank transfer, etc.). Describe it in the payment description.
        </Term>
      </div>
    </Sub>
  </Section>
);

export default InvoicesSection;
