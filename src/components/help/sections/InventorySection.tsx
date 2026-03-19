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
    ["pkg",   "ထုပ် / Package"],
    ["box",   "အသေတ္တာ / Carton"],
    ["strip", "ဆေးပြားဖျာ / Blister strip"],
    ["btl",   "ဆေးဘူး (အရည်)"],
    ["amp",   "ဆေးထိုးဘူး / Ampoule"],
    ["tube",  "ဆေးသုတ် Tube"],
    ["sac",   "ဆေးမှုန့်အိတ် / Sachet"],
    ["cap",   "ဆေးကြည် / Capsule"],
    ["tab",   "ဆေးပြား / Tablet"],
    ["pcs",   "အစိတ်အပိုင်း / Pieces"],
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
      "ကုန်ပစ္စည်းများသည် ဆေးဝါးနှင့် သုံးစွဲရန် ပစ္စည်းများကို ကိုယ်စားပြုသည်။ ပစ္စည်းတစ်ခုချင်းတွင် ယူနစ်အမျိုးအစားများ (ဥပမာ — box တွင် strip၊ strip တွင် tablet) ရှိနိုင်ပြီး ဝယ်ယူဈေးနှင့် အရေအတွက်ကို ယူနစ်တစ်ခုချင်းအလိုက် ခြေရာခံသည်။",
    unitsTitle: "ယူနစ် အမျိုးအစားများ",
    expiryTitle: "သက်တမ်းကုန်ဆုံးရက်",
    expiryPara:
      "ပစ္စည်းတစ်ခုချင်းအတွက် သက်တမ်းကုန်ဆုံးရက် မှတ်တမ်းတင်သည်။ သက်တမ်းကုန်ဆုံးနီးပါး သို့မဟုတ် ကုန်ဆုံးသော ပစ္စည်းများကို ငွေတောင်းခံလွှာများတွင် ထည့်သွင်းမိမည်ကို ရှောင်ရှားရန် စစ်ဆေး ဖယ်ရှားသင့်သည်။",
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
