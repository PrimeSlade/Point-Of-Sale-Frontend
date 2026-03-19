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
    title: "ဈေးနှုန်းတွက်ချက်ပုံများ",
    intro:
      "ပစ္စည်းဈေးနှုန်းတွေနဲ့ စုစုပေါင်း ကျသင့်ငွေ ဘယ်လိုတွက်ချက်သလဲဆိုတာ သိထားရင် ဘေလ်ထုတ်တဲ့အခါမှာ အမှားအယွင်းမရှိအောင် လုပ်ဆောင်နိုင်ပါတယ်။",
    retailTitle: "ပစ္စည်းလက်လီဈေးနှုန်း (Retail Price) တွက်ပုံ",
    retailPara: (
      <>
        ပစ္စည်းတွေမှာ ပုံသေလက်လီဈေး သတ်မှတ်ထားတာ မရှိပါဘူး။ စနစ်ကနေ ပစ္စည်းရဲ့{" "}
        <strong className="text-[var(--text-primary)]">ဝယ်ဈေး (Purchase Price)</strong>{" "}
        နဲ့ ဘေလ်ထုတ်ပေးတဲ့ ဝန်ထမ်းရဲ့{" "}
        <strong className="text-[var(--text-primary)]">ဈေးတင်နှုန်း (Price Percent)</strong>{" "}
        ပေါ် မူတည်ပြီး ရောင်းဈေးကို တွက်ပေးတာ ဖြစ်ပါတယ်။
      </>
    ),
    retailPost:
      "ဒါကြောင့် ဈေးတင်နှုန်း (Price Percent) မတူတဲ့ ဝန်ထမ်းတွေအလိုက် ပစ္စည်းရောင်းဈေးလည်း ကွဲပြားနိုင်ပါတယ်။ အကယ်လို့ Price Percent ကို 0 လို့ ထားရင်တော့ ဝယ်ဈေးအတိုင်းပဲ ရောင်းမှာဖြစ်ပြီး ဈေးတင်မှာ မဟုတ်ပါဘူး။",
    invoiceTitle: "စုစုပေါင်း ကျသင့်ငွေ (Invoice Total) တွက်ပုံ",
    servicesTitle: "ဝန်ဆောင်မှုများ (Services) အတွက် ဈေးတင်နှုန်း မသက်ရောက်ခြင်း",
    servicesPara:
      "ဝန်ဆောင်မှုဈေးနှုန်းတွေ (ဥပမာ - ဆေးစစ်ခ၊ ဓာတ်ခွဲခ) ကတော့ ဈေးတင်နှုန်း (Price Percent) နဲ့ မဆိုင်ပါဘူး။ သတ်မှတ်ထားတဲ့ ဈေးအတိုင်းပဲ စုစုပေါင်းကျသင့်ငွေ (Sub Total) ထဲကို ပေါင်းထည့်တာ ဖြစ်ပါတယ်။",
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
        <Example lang={lang}>
          Purchase Price = 1,000 MMK, Price Percent = 30%
          <br />
          Retail Price = 1,000 + (1,000 × 30 ÷ 100) = <strong>1,300 MMK</strong>
        </Example>
        <RetailPriceCalc lang={lang} />
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
        <Example lang={lang}>
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
        <InvoiceTotalCalc lang={lang} />
      </Sub>

      <Sub title={c.servicesTitle}>
        <p>{c.servicesPara}</p>
      </Sub>
    </Section>
  );
};

export default FeeCalculationsSection;
