import { type Lang } from "@/data/helpContent";
import { InvoiceTotalCalc, RetailPriceCalc } from "../HelpCalc";
import { Example, Formula, Section, Sub } from "../HelpPrimitives";

const content = {
  en: {
    title: "Fee Calculations",
    intro:
      "Understanding how item prices, discounts, and totals are calculated helps avoid billing errors.",
    retailTitle: "How item retail price is calculated",
    retailPara: (
      <>
        Items do not have a fixed retail price. Instead, the system calculates
        the selling price from the item's{" "}
        <strong className="text-[var(--text-primary)]">purchase price</strong>{" "}
        and the{" "}
        <strong className="text-[var(--text-primary)]">Price Percent</strong>{" "}
        set on the staff member creating the invoice.
      </>
    ),
    retailPost:
      "This means different staff members with different Price Percent values will generate different retail prices for the same item. A Price Percent of 0 charges the purchase price with no markup.",
    invoiceTitle: "How the invoice total is calculated",
    servicesTitle: "Services are not affected by Price Percent",
    servicesPara:
      "Service prices (consultation fees, lab tests, etc.) are fixed and do not go through the Price Percent calculation. They are added to the sub total at their exact retail price.",
  },
  my: {
    title: "ကြေးနှုန်း တွက်ချက်မှု",
    intro:
      "ပစ္စည်းဈေးနှုန်းများ၊ လျှော့ဈေးများနှင့် စုစုပေါင်းတွက်ချက်ပုံများကို နားလည်ခြင်းဖြင့် ငွေတောင်းခံလွှာ အမှားများကို ရှောင်ကွင်းနိုင်သည်။",
    retailTitle: "ပစ္စည်း လက်လီဈေးနှုန်း တွက်ချက်ပုံ",
    retailPara: (
      <>
        ပစ္စည်းများတွင် သတ်မှတ်ထားသော လက်လီဈေး မရှိပါ။ ယင်းအစား စနစ်သည် ပစ္စည်း၏{" "}
        <strong className="text-[var(--text-primary)]">ဝယ်ယူဈေး</strong>{" "}
        နှင့် ငွေတောင်းခံလွှာ ဖန်တီးသူ ဝန်ထမ်း၏{" "}
        <strong className="text-[var(--text-primary)]">Price Percent</strong>{" "}
        မှ ရောင်းဈေး တွက်ချက်သည်။
      </>
    ),
    retailPost:
      "ဆိုလိုသည်မှာ Price Percent ကွဲပြားသော ဝန်ထမ်းများသည် တစ်ဆောင်တည်းသော ပစ္စည်းအတွက် ဈေးနှုန်း ကွဲပြားနိုင်သည်။ Price Percent = 0 ဆိုပါက ဝယ်ဈေးဖြင့် ထည့်သည်၊ ဈေးတင်မှု မရှိပါ။",
    invoiceTitle: "ငွေတောင်းခံလွှာ စုစုပေါင်း တွက်ချက်ပုံ",
    servicesTitle: "ဝန်ဆောင်မှုများသည် Price Percent ကို မမှီ",
    servicesPara:
      "ဝန်ဆောင်မှုဈေးနှုန်းများ (ဆေးကြည့်ခ၊ ဓာတ်ခွဲမှု စသည်) သည် Price Percent ၏ သက်ရောက်မှု မရှိပါ။ ယင်းတို့ကို မူလဈေးနှုန်းဖြင့် Sub Total ထဲ ထည့်သည်။",
  },
};

const FeeCalculationsSection = ({ lang }: { lang: Lang }) => {
  const c = content[lang];
  return (
    <Section id="fee-calculations" title={c.title}>
      <p>{c.intro}</p>

      <Sub title={c.retailTitle}>
        <p>{c.retailPara}</p>
        <Formula>
          Retail Price = Purchase Price + (Purchase Price × Price Percent ÷ 100)
        </Formula>
        <Example>
          Purchase Price = 1,000 MMK, Price Percent = 30%
          <br />
          Retail Price = 1,000 + (1,000 × 30 ÷ 100) = <strong>1,300 MMK</strong>
        </Example>
        <RetailPriceCalc />
        <p>{c.retailPost}</p>
      </Sub>

      <Sub title={c.invoiceTitle}>
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

      <Sub title={c.servicesTitle}>
        <p>{c.servicesPara}</p>
      </Sub>
    </Section>
  );
};

export default FeeCalculationsSection;
