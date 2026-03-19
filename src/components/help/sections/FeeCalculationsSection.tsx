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
      "ပစ္စည်းဈေးနှုန်းများ၊ လျှော့ဈေးများနှင့် စုစုပေါင်း ကျသင့်ငွေတွက်ချက်ပုံများကို နားလည်သဘောပေါက်ခြင်းဖြင့် ငွေတောင်းခံလွှာများတွင် အမှားအယွင်းမရှိစေရန် ဆောင်ရွက်နိုင်ပါသည်။",
    retailTitle: "ပစ္စည်း၏ လက်လီဈေးနှုန်း (Retail Price) တွက်ချက်ပုံ",
    retailPara: (
      <>
        ဆေးဝါး/ကုန်ပစ္စည်းများအတွက် ပုံသေလက်လီဈေး သတ်မှတ်ထားခြင်း မရှိပါ။ ယင်းအစား စနစ်သည် ပစ္စည်း၏{" "}
        <strong className="text-[var(--text-primary)]">ဝယ်ယူဈေး (Purchase Price)</strong>{" "}
        နှင့် ငွေတောင်းခံလွှာ ဖန်တီးသူ ဝန်ထမ်း၏{" "}
        <strong className="text-[var(--text-primary)]">ဈေးတင်နှုန်း (Price Percent)</strong>{" "}
        အပေါ် အခြေခံ၍ ရောင်းဈေးကို တွက်ချက်ပါသည်။
      </>
    ),
    retailPost:
      "ဆိုလိုသည်မှာ ဈေးတင်နှုန်း (Price Percent) မတူညီသော ဝန်ထမ်းများအလိုက် တစ်မျိုးတည်းသော ပစ္စည်းအတွက် ရောင်းဈေး ကွဲပြားနိုင်ပါသည်။ အကယ်၍ Price Percent ကို သုည (0) ဟု သတ်မှတ်ပါက ဝယ်ယူဈေးအတိုင်းသာ ရောင်းချမည်ဖြစ်ပြီး ဈေးတင်မှု ရှိမည်မဟုတ်ပါ။",
    invoiceTitle: "စုစုပေါင်း ကျသင့်ငွေ (Invoice Total) တွက်ချက်ပုံ",
    servicesTitle: "ဝန်ဆောင်မှုများ (Services) အတွက် ဈေးတင်နှုန်း (Price Percent) မသက်ဆိုင်ခြင်း",
    servicesPara:
      "ဝန်ဆောင်မှုဈေးနှုန်းများ (ဥပမာ - ဆေးစစ်ခ၊ ဓာတ်ခွဲစမ်းသပ်ခ စသည်) သည် ဈေးတင်နှုန်း (Price Percent) ၏ သက်ရောက်မှု မရှိပါ။ ၎င်းတို့ကို သတ်မှတ်ထားသည့် မူလဈေးနှုန်းအတိုင်းသာ စုစုပေါင်းငွေ (Sub Total) အတွင်းသို့ ပေါင်းထည့်ပါသည်။",
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
