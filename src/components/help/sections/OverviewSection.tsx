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
    title: "လုပ်ငန်းစဉ် အကျဉ်းချုပ်",
    intro:
      "ဤစနစ်သည် ရောင်နီဦးဆေးရုံ၏ နေ့စဉ်လုပ်ငန်းဆောင်တာများကို စီမံခန့်ခွဲရန် ဖြစ်ပါသည်။ လူနာမှတ်ပုံတင်ခြင်း၊ ကုသမှုမှတ်တမ်းတင်ခြင်း၊ ငွေတောင်းခံလွှာထုတ်ပေးခြင်းနှင့် ကုန်ကျစရိတ်များအား ခြေရာခံခြင်းတို့ကို ဆောင်ရွက်နိုင်ပါသည်။",
    mapLabel: "လုပ်ငန်းစဉ်များ ချိတ်ဆက်ဆောင်ရွက်ပုံကို အောက်တွင် အကျဉ်းချုပ် ဖော်ပြထားပါသည် -",
    flow: [
      "လူနာ",
      " → ",
      "ကုသမှုမှတ်တမ်း",
      " (ဆရာဝန်နှင့် ချိတ်ဆက်မှု) → ",
      "ငွေတောင်းခံလွှာ",
      " (ဆေးဝါး/ပစ္စည်းများ + ဝန်ဆောင်မှုများ + လျှော့ဈေးများ) → ",
      "ငွေပေးချေမှု မှတ်တမ်းတင်ခြင်း",
    ],
    expenses:
      "ကုန်ကျစရိတ်များနှင့် အစီရင်ခံစာများသည် လူနာ၏ငွေပေးချေမှုများနှင့် သက်ဆိုင်ခြင်းမရှိဘဲ ဆေးရုံ၏ ကိုယ်ပိုင်လုပ်ငန်းစရိတ်များကို ခြေရာခံရန်အတွက်သာ အသုံးပြုပါသည်။",
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
