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
    title: "အကျဉ်းချုပ်",
    intro:
      "ဤစနစ်သည် ရောင်နီဦး ဆေးရုံ၏ နေ့စဉ်လုပ်ငန်းများကို စီမံသည် — လူနာ မှတ်ပုံတင်ခြင်းနှင့် ကုသမှု မှတ်တမ်းတင်ခြင်းမှ ငွေတောင်းခံလွှာ ထုတ်ပေးခြင်းနှင့် ကုန်ကျစရိတ် ခြေရာခံခြင်းအထိ။",
    mapLabel: "အောက်ပါသည် ဆက်စပ်မှုများကို အကျဉ်းချုပ် ဖော်ပြသည်-",
    flow: [
      "လူနာ",
      " → ",
      "ကုသမှု",
      " (ဆရာဝန်နှင့် ချိတ်ဆက်) → ",
      "ငွေတောင်းခံလွှာ",
      " (ပစ္စည်း + ဝန်ဆောင်မှု + လျှော့ဈေး) → ",
      "ငွေပေးချေမှု မှတ်တမ်းတင်",
    ],
    expenses:
      "ကုန်ကျစရိတ်နှင့် အစီရင်ခံစာများသည် လူနာ ငွေပေးချေမှုနှင့် သီးခြားဖြစ်ပြီး ဆေးရုံ၏ ကိုယ်ပိုင် လုပ်ငန်းစရိတ်များကို ခြေရာခံရန် အသုံးပြုသည်။",
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
