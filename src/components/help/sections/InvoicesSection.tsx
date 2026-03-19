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
    title: "ငွေတောင်းခံလွှာ",
    intro:
      "ကုသမှုပြီးနောက် ငွေတောင်းခံလွှာ ထုတ်ပေးသည်။ ကုန်ပစ္စည်းများနှင့် ဝန်ဆောင်မှုများ ထည့်သွင်းနိုင်ပြီး ပစ္စည်းတစ်ခုချင်းနှင့် ငွေတောင်းခံလွှာ တစ်ခုလုံးအတွက် လျှော့ဈေး ကောက်ယူနိုင်သည်။",
    stepsTitle: "ငွေတောင်းခံလွှာ ထုတ်ပုံ",
    steps: [
      '"POS / ငွေတောင်းခံလွှာ" သို့ သွားပြီး "ထည့်ရန်" နှိပ်ပါ။',
      "နေရာ ရွေးချယ်ပြီး ကုသမှုနှင့် ချိတ်ဆက်ပါ (သို့မဟုတ် တိုက်ရိုက်လာသော လူနာ အဖြစ် မှတ်ပါ)။",
      "ဘာကုတ်ဖြင့် ကုန်ပစ္စည်းများ ထည့်ပြီး အရေအတွက် သတ်မှတ်ပါ။",
      "ဝန်ဆောင်မှုများ (ဆေးကြည့်ခ၊ ဓာတ်ခွဲမှု စသည်) ထည့်သွင်းပါ။",
      "လိုအပ်ပါက ပစ္စည်းတစ်ခုချင်းအတွက် လျှော့ဈေး ထည့်ပါ။",
      "ငွေတောင်းခံလွှာ တစ်ခုလုံးအတွက် လျှော့ဈေး ထည့်ပါ (ရှိပါက)။",
      "ငွေပေးချေမှု နည်းလမ်း ရွေးချယ်ပြီး မှတ်တမ်းတင်ပါ။",
    ],
    payTitle: "ငွေပေးချေမှု နည်းလမ်းများ",
    payments: [
      { label: "cash",   desc: "ကောင်တာတွင် မြေပြင်ငွေ ပေးချေခြင်း။" },
      { label: "kpay",   desc: "KBZPay မိုဘိုင်းငွေလွှဲ။ ကိုးကားနံပါတ်ကို ဖော်ပြချက်တွင် မှတ်သားပါ။" },
      { label: "wave",   desc: "Wave Money ငွေလွှဲ။ ကိုးကားနံပါတ်ကို ဖော်ပြချက်တွင် မှတ်သားပါ။" },
      { label: "others", desc: "အခြား ငွေပေးချေမှုနည်းလမ်း (ဘဏ်လွှဲ စသည်)။ ဖော်ပြချက်တွင် ရှင်းပြပါ။" },
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
