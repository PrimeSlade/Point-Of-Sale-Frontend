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
    ["box",   "ဘူး (Box/Carton)"],
    ["strip", "ကတ် (Strip)"],
    ["btl",   "ပုလင်း (Bottle)"],
    ["amp",   "ဆေးထိုးပြွန် (Ampoule)"],
    ["tube",  "ပြွန် (Tube)"],
    ["sac",   "အိတ်ငယ် (Sachet)"],
    ["cap",   "ဆေးတောင့် (Capsule)"],
    ["tab",   "ဆေးပြား (Tablet)"],
    ["pcs",   "ခု/အရေအတွက် (Pieces)"],
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
      "ဒီမှာ ဆေးဝါးတွေနဲ့ ဆေးရုံသုံးပစ္စည်းတွေကို မှတ်တမ်းတင်ထားပါတယ်။ ပစ္စည်းတစ်ခုစီမှာ ယူနစ်အမျိုးအစားတွေ (ဥပမာ - ဘူးထဲမှာ ကတ်တွေ၊ ကတ်ထဲမှာ ဆေးပြားတွေ) ခွဲခြားထားနိုင်ပြီး၊ ဝယ်ဈေးနဲ့ အရေအတွက်တွေကို ယူနစ်အလိုက် ခြေရာခံနိုင်ပါတယ်။",
    unitsTitle: "ယူနစ်အမျိုးအစားများ (Unit Types)",
    expiryTitle: "သက်တမ်းကုန်ဆုံးရက်များ (Expiry Dates)",
    expiryPara:
      "ပစ္စည်းတစ်ခုစီအတွက် သက်တမ်းကုန်ဆုံးရက်တွေကို မှတ်တမ်းတင်ထားပါတယ်။ သက်တမ်းကုန်ခါနီး ဒါမှမဟုတ် ကုန်သွားတဲ့ ပစ္စည်းတွေကို ဘေလ်ထဲ မှားမထည့်မိအောင် ပုံမှန် စစ်ဆေးပေးဖို့ လိုပါတယ်။",
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
