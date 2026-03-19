import { type Lang } from "@/data/helpContent";
import { Section, Sub, Term } from "../HelpPrimitives";

const units = {
  en: [
    ["pkg",   "Package"],
    ["box",   "Box / Carton"],
    ["strip", "Blister strip"],
    ["btl",   "Bottle (liquid)"],
    ["amp",   "Ampoule (injectable)"],
    ["tube",  "Tube (topical)"],
    ["sac",   "Sachet (powder)"],
    ["cap",   "Capsule"],
    ["tab",   "Tablet"],
    ["pcs",   "Pieces (misc.)"],
  ],
  my: [
    ["pkg",   "အထုပ် (Package)"],
    ["box",   "ဖာ/ဘူး (Box/Carton)"],
    ["strip", "ကတ် (Strip)"],
    ["btl",   "ပုလင်း (Bottle)"],
    ["amp",   "ဆေးထိုးပြွန်/ဆေးပုလင်းငယ် (Ampoule)"],
    ["tube",  "ပြွန် (Tube)"],
    ["sac",   "အိတ်ငယ် (Sachet)"],
    ["cap",   "ဆေးတောင့် (Capsule)"],
    ["tab",   "ဆေးပြား (Tablet)"],
    ["pcs",   "ခု/ခုရေ (Pieces)"],
  ],
} as const;

const content = {
  en: {
    title: "Inventory",
    intro:
      "Inventory items represent physical medicines and consumables in stock. Each item can have multiple unit types (e.g. a box contains strips, a strip contains tablets) with individual purchase prices and quantities tracked per unit.",
    unitsTitle: "Unit types",
    expiryTitle: "Expiry dates",
    expiryPara:
      "Expiry dates are recorded per item. Items that are close to or past expiry should be reviewed and removed from active stock to avoid being added to invoices.",
  },
  my: {
    title: "ကုန်ပစ္စည်းစာရင်း",
    intro:
      "ကုန်ပစ္စည်းစာရင်း (Inventory) တွင် ဆေးဝါးများနှင့် ဆေးရုံသုံးပစ္စည်းများကို မှတ်တမ်းတင်ထားရှိပါသည်။ ပစ္စည်းတစ်ခုချင်းစီတွင် ယူနစ်အမျိုးအစားများ (ဥပမာ - ဘူးအတွင်း ကတ်များ၊ ကတ်အတွင်း ဆေးပြားများ) ခွဲခြားထားရှိနိုင်ပြီး ဝယ်ယူဈေးနှင့် အရေအတွက်များကို ယူနစ်တစ်ခုချင်းအလိုက် စနစ်တကျ ခြေရာခံနိုင်ပါသည်။",
    unitsTitle: "ယူနစ်အမျိုးအစားများ (Unit Types)",
    expiryTitle: "သက်တမ်းကုန်ဆုံးရက်များ (Expiry Dates)",
    expiryPara:
      "ကုန်ပစ္စည်းတစ်ခုချင်းစီအတွက် သက်တမ်းကုန်ဆုံးရက်များကို မှတ်တမ်းတင်ထားရှိပါသည်။ သက်တမ်းကုန်ဆုံးရန် နီးကပ်နေသော (သို့မဟုတ်) သက်တမ်းကုန်ဆုံးသွားသော ပစ္စည်းများကို ငွေတောင်းခံလွှာများတွင် မှားယွင်းထည့်သွင်းမိခြင်း မရှိစေရန်အတွက် ပုံမှန်စစ်ဆေးဖယ်ရှားရန် လိုအပ်ပါသည်။",
  },
};

const InventorySection = ({ lang }: { lang: Lang }) => {
  const c = content[lang];
  return (
    <Section id="inventory" title={c.title}>
      <p>{c.intro}</p>

      <Sub title={c.unitsTitle}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
          {units[lang].map(([code, label]) => (
            <Term key={code} label={code}>{label}</Term>
          ))}
        </div>
      </Sub>

      <Sub title={c.expiryTitle}>
        <p>{c.expiryPara}</p>
      </Sub>
    </Section>
  );
};

export default InventorySection;
