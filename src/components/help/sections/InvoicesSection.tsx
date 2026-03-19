import { type Lang } from "@/data/helpContent";
import { Section, Steps, Sub, Term } from "../HelpPrimitives";

const content = {
  en: {
    title: "Invoices & Billing",
    intro:
      "Invoices are created after a treatment. You can add inventory items and services to the invoice, apply per-item discounts, and then apply a final invoice-level discount before recording payment.",
    stepsTitle: "How to create an invoice",
    steps: [
      'Go to POS / Invoices and click "Add".',
      "Select the location and link the treatment (or mark it as a walk-in).",
      "Add inventory items by barcode and set quantities.",
      "Add any services (consultation fees, lab tests, etc.).",
      "Apply per-item discount amounts if needed.",
      "Apply an overall invoice discount if applicable.",
      "Select the payment method and record payment.",
    ],
    payTitle: "Payment methods",
    payments: [
      { label: "cash",   desc: "Physical cash paid at the counter." },
      { label: "kpay",   desc: "KBZPay mobile transfer. Note the reference number in the description field." },
      { label: "wave",   desc: "Wave Money transfer. Note the reference number in the description field." },
      { label: "others", desc: "Any other method (bank transfer, etc.). Describe it in the payment description." },
    ],
  },
  my: {
    title: "ဘေလ်နှင့် ငွေပေးချေခြင်း",
    intro:
      "ကုသမှုပြီးရင် ဘေလ် (Invoice) ထုတ်ပေးရပါမယ်။ ဆေးဝါးတွေနဲ့ ဝန်ဆောင်မှုတွေကို ထည့်သွင်းနိုင်ပြီး၊ ပစ္စည်းတစ်ခုချင်းအလိုက် ဒါမှမဟုတ် ဘေလ်တစ်ခုလုံးအတွက် လျှော့ဈေး (Discount) တွေ ပေးလို့ ရပါတယ်။",
    stepsTitle: "ဘေလ်ထုတ်နည်း",
    steps: [
      '"POS / ငွေတောင်းခံလွှာ" (Invoices) ကိုသွားပြီး "ထည့်ရန်" (Add) ကို နှိပ်ပါ။',
      "နေရာ (Location) ကိုရွေးပြီး ကုသမှုမှတ်တမ်းနဲ့ ချိတ်ဆက်ပါ (ဒါမှမဟုတ် တိုက်ရိုက်လာပြတဲ့ လူနာအဖြစ် သတ်မှတ်ပါ)။",
      "ဘာကုတ် (Barcode) နဲ့ ဆေးဝါး/ကုန်ပစ္စည်းတွေ ထည့်ပြီး အရေအတွက် သတ်မှတ်ပါ။",
      "ဝန်ဆောင်မှုတွေ (ဥပမာ - ဆေးစစ်ခ၊ ဓာတ်ခွဲခ) ကို ထည့်ပါ။",
      "လိုအပ်ရင် ပစ္စည်းတစ်ခုချင်းစီအတွက် လျှော့ဈေး (Item Discount) တွေ ထည့်ပါ။",
      "ဘေလ်တစ်ခုလုံးအတွက် လျှော့ဈေး (Overall Discount) ကိုလည်း လိုအပ်ရင် ထည့်ပါ။",
      "ငွေပေးချေမှုနည်းလမ်းကို ရွေးပြီး မှတ်တမ်းတင်လိုက်ပါ။",
    ],
    payTitle: "ငွေပေးချေမှု နည်းလမ်းများ (Payment Methods)",
    payments: [
      { label: "cash",   desc: "ကောင်တာမှာ လက်ငင်းငွေသားနဲ့ ပေးချေခြင်း။" },
      { label: "kpay",   desc: "KBZPay နဲ့ ငွေလွှဲခြင်း။ ကိုးကားနံပါတ် (Ref Number) ကို ဖော်ပြချက် (Description) မှာ မှတ်ထားပါ။" },
      { label: "wave",   desc: "Wave Money နဲ့ ငွေလွှဲခြင်း။ ကိုးကားနံပါတ် (Ref Number) ကို ဖော်ပြချက် (Description) မှာ မှတ်ထားပါ။" },
      { label: "others", desc: "အခြား ငွေပေးချေမှုနည်းလမ်းများ (ဘဏ်လွှဲ စသည်)။ အသေးစိတ်ကို ဖော်ပြချက် (Description) မှာ ရေးသားပါ။" },
    ],
  },
};

const InvoicesSection = ({ lang }: { lang: Lang }) => {
  const c = content[lang];
  return (
    <Section id="invoices" title={c.title}>
      <p>{c.intro}</p>

      <Sub title={c.stepsTitle}>
        <Steps items={c.steps} />
      </Sub>

      <Sub title={c.payTitle}>
        <div className="space-y-2">
          {c.payments.map(({ label, desc }) => (
            <Term key={label} label={label}>{desc}</Term>
          ))}
        </div>
      </Sub>
    </Section>
  );
};

export default InvoicesSection;
