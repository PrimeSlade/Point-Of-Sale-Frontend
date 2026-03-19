import { type Lang } from "@/data/helpContent";
import { Section } from "../HelpPrimitives";

const content = {
  en: {
    title: "Overview",
    intro:
      "This system handles the day-to-day operations of Yaung Ni Oo Hospital — from registering patients and recording treatments to generating invoices and tracking expenses.",
    mapLabel: "Here is a quick map of how everything connects:",
    flow: [
      "Patient",
      " → ",
      "Treatment",
      " (linked to a Doctor) → ",
      "Invoice",
      " (items + services + discounts) → ",
      "Payment recorded",
    ],
    expenses:
      "Expenses and reports are separate from patient billing and are used to track the hospital's own operational costs.",
  },
  my: {
    title: "ခြုံငုံသုံးသပ်ချက်",
    intro:
      "ဒီစနစ်က ရောင်နီဦးဆေးရုံရဲ့ နေ့စဉ်အလုပ်တွေကို စီမံခန့်ခွဲဖို့ ဖြစ်ပါတယ်။ လူနာစာရင်းသွင်းတာ၊ ကုသမှုမှတ်တမ်းတင်တာ၊ ဘေလ် (Invoice) ထုတ်တာနဲ့ အထွေထွေအသုံးစရိတ်တွေကို မှတ်သားတာတွေ လုပ်ဆောင်နိုင်ပါတယ်။",
    mapLabel: "အလုပ်လုပ်ပုံ အဆင့်ဆင့်ကို အောက်မှာ ကြည့်နိုင်ပါတယ် -",
    flow: [
      "လူနာ",
      " → ",
      "ကုသမှုမှတ်တမ်း",
      " (ဆရာဝန်နဲ့ ချိတ်ဆက်မှု) → ",
      "ဘေလ် (Invoice)",
      " (ဆေးဝါး/ပစ္စည်း + ဝန်ဆောင်မှု + လျှော့ဈေး) → ",
      "ငွေပေးချေမှု မှတ်တမ်းတင်ခြင်း",
    ],
    expenses:
      "ကုန်ကျစရိတ်တွေနဲ့ အစီရင်ခံစာတွေက လူနာတွေရဲ့ ဘေလ်ပေးချေမှုနဲ့ မသက်ဆိုင်ပါဘူး။ ဆေးရုံရဲ့ ကိုယ်ပိုင်အသုံးစရိတ်တွေကို ခြေရာခံဖို့အတွက်ပဲ အသုံးပြုတာ ဖြစ်ပါတယ်။",
  },
};

const OverviewSection = ({ lang }: { lang: Lang }) => {
  const c = content[lang];
  return (
    <Section id="overview" title={c.title}>
      <p>{c.intro}</p>
      <p>{c.mapLabel}</p>
      <div className="rounded-lg border border-[var(--border-color)] bg-[var(--background-color)] p-4 text-xs leading-7">
        {c.flow.map((part, i) =>
          i % 2 === 0 ? (
            <span key={i} className="font-semibold text-[var(--text-primary)]">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </div>
      <p>{c.expenses}</p>
    </Section>
  );
};

export default OverviewSection;
