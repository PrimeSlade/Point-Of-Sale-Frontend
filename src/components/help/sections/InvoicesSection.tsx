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
    title: "ငွေတောင်းခံလွှာနှင့် ငွေပေးချေမှု",
    intro:
      "ကုသမှုပြီးဆုံးပါက ငွေတောင်းခံလွှာ (Invoice) ကို ထုတ်ပေးရပါမည်။ ၎င်းတွင် ဆေးဝါး/ပစ္စည်းများနှင့် ဝန်ဆောင်မှုများကို ထည့်သွင်းနိုင်ပြီး ပစ္စည်းတစ်ခုချင်းအလိုက် သော်လည်းကောင်း၊ စုစုပေါင်း ငွေတောင်းခံလွှာတစ်ခုလုံးအတွက် သော်လည်းကောင်း လျှော့ဈေး (Discount) များ သတ်မှတ်ပေးနိုင်ပါသည်။",
    stepsTitle: "ငွေတောင်းခံလွှာထုတ်ပေးခြင်း လုပ်ငန်းစဉ်",
    steps: [
      '"POS / ငွေတောင်းခံလွှာ" (Invoices) ကဏ္ဍသို့ သွားရောက်၍ "ထည့်ရန်" (Add) ခလုတ်ကို နှိပ်ပါ။',
      "သက်ဆိုင်ရာ နေရာ (Location) ကို ရွေးချယ်ပြီး ကုသမှုမှတ်တမ်းနှင့် ချိတ်ဆက်ပါ (သို့မဟုတ် တိုက်ရိုက်လာရောက်ပြသသော လူနာအဖြစ် သတ်မှတ်ပါ)။",
      "ဘာကုတ် (Barcode) အသုံးပြု၍ ဆေးဝါး/ကုန်ပစ္စည်းများ ထည့်သွင်းပြီး အရေအတွက်ကို သတ်မှတ်ပါ။",
      "ဝန်ဆောင်မှုများ (ဥပမာ - ဆေးစစ်ခ၊ ဓာတ်ခွဲစမ်းသပ်ခ စသည်) ကို ထည့်သွင်းပါ။",
      "လိုအပ်ပါက ပစ္စည်းတစ်ခုချင်းအလိုက် လျှော့ဈေး (Item Discount) များကို ထည့်သွင်းပါ။",
      "စုစုပေါင်း ငွေတောင်းခံလွှာတစ်ခုလုံးအတွက် လျှော့ဈေး (Overall Discount) ကို လိုအပ်ပါက ထည့်သွင်းပါ။",
      "ငွေပေးချေမှုနည်းလမ်းကို ရွေးချယ်ပြီး မှတ်တမ်းတင် သိမ်းဆည်းပါ။",
    ],
    payTitle: "ငွေပေးချေမှု နည်းလမ်းများ (Payment Methods)",
    payments: [
      { label: "cash",   desc: "ကောင်တာတွင် လက်ငင်းငွေသားဖြင့် ပေးချေခြင်း။" },
      { label: "kpay",   desc: "KBZPay မိုဘိုင်းငွေလွှဲစနစ်။ ကိုးကားနံပါတ် (Reference Number) ကို ဖော်ပြချက် (Description) ကွက်လပ်တွင် မှတ်သားထားပါ။" },
      { label: "wave",   desc: "Wave Money မိုဘိုင်းငွေလွှဲစနစ်။ ကိုးကားနံပါတ် (Reference Number) ကို ဖော်ပြချက် (Description) ကွက်လပ်တွင် မှတ်သားထားပါ။" },
      { label: "others", desc: "အခြားသော ငွေပေးချေမှုနည်းလမ်းများ (ဥပမာ - ဘဏ်ငွေလွှဲ စသည်)။ ငွေပေးချေမှုအကြောင်းအရာကို ဖော်ပြချက် (Description) ကွက်လပ်တွင် ရှင်းလင်းစွာ ရေးသားပါ။" },
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
