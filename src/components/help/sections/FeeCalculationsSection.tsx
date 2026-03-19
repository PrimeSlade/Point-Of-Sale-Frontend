import { InvoiceTotalCalc, RetailPriceCalc } from "../HelpCalc";
import { Example, Formula, Section, Sub } from "../HelpPrimitives";

const FeeCalculationsSection = () => (
  <Section id="fee-calculations" title="Fee Calculations">
    <p>
      Understanding how item prices, discounts, and totals are calculated helps
      avoid billing errors.
    </p>

    <Sub title="How item retail price is calculated">
      <p>
        Items do not have a fixed retail price. Instead, the system calculates
        the selling price from the item's{" "}
        <strong className="text-[var(--text-primary)]">purchase price</strong>{" "}
        and the{" "}
        <strong className="text-[var(--text-primary)]">Price Percent</strong>{" "}
        set on the staff member creating the invoice.
      </p>
      <Formula>
        Retail Price = Purchase Price + (Purchase Price × Price Percent ÷ 100)
      </Formula>
      <Example>
        Purchase Price = 1,000 MMK, Price Percent = 30%
        <br />
        Retail Price = 1,000 + (1,000 × 30 ÷ 100) = <strong>1,300 MMK</strong>
      </Example>
      <RetailPriceCalc />
      <p>
        This means different staff members with different Price Percent values
        will generate different retail prices for the same item. A Price Percent
        of 0 charges the purchase price with no markup.
      </p>
    </Sub>

    <Sub title="How the invoice total is calculated">
      <Formula>
        Sub Total = Σ (Retail Price × Quantity) + Σ Service Prices
        <br />
        Total Item Discount = Σ (Item Discount Amount × Quantity)
        <br />
        <strong>Total Amount = Sub Total − Total Item Discount − Invoice Discount</strong>
      </Formula>
      <Example>
        2 items at 1,300 MMK each + 1 service at 5,000 MMK
        <br />
        Sub Total = (1,300 × 2) + 5,000 = <strong>7,600 MMK</strong>
        <br />
        Item discount = 200 MMK on each item → Total Item Discount = 400 MMK
        <br />
        Invoice discount = 600 MMK
        <br />
        Total Amount = 7,600 − 400 − 600 = <strong>6,600 MMK</strong>
      </Example>
      <InvoiceTotalCalc />
    </Sub>

    <Sub title="Services are not affected by Price Percent">
      <p>
        Service prices (consultation fees, lab tests, etc.) are fixed and do
        not go through the Price Percent calculation. They are added to the sub
        total at their exact retail price.
      </p>
    </Sub>
  </Section>
);

export default FeeCalculationsSection;
