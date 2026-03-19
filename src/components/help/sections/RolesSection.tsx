import { type Lang } from "@/data/helpContent";
import { Example, Section, Sub, Term } from "../HelpPrimitives";

const content = {
  en: {
    title: "Roles & Access",
    intro:
      "Every staff account is assigned a role. The role controls which parts of the system the user can see and what actions they can take.",
    rolesTitle: "How roles work",
    rolesPara:
      'A role is a named set of permissions (e.g. "Cashier", "Receptionist", "Admin"). When a user is assigned a role, they inherit all the permissions defined on it. Menu items and action buttons are automatically hidden if the user\'s role does not have the required permission.',
    permTitle: "Permission structure",
    permIntro: "Each permission is a combination of an action and a subject:",
    perms: [
      { label: "read",   desc: "View lists and details." },
      { label: "create", desc: "Add new records." },
      { label: "update", desc: "Edit existing records." },
      { label: "delete", desc: "Remove records." },
    ],
    permSubjects:
      "Subjects include: Patient, Doctor, Treatment, Invoice, Item, Service, Expense, Category, Location, User, Role, Report-Invoice, Report-Expense.",
    priceTitle: "Price Percent on user accounts",
    pricePara: (
      <>
        Each staff user has a{" "}
        <strong className="text-[var(--text-primary)]">Price Percent</strong>{" "}
        value that controls the markup applied when they create an invoice. This
        is set by an administrator under Settings → Users.
      </>
    ),
    example: (
      <>
        A receptionist with Price Percent = 50 will bill items at purchase price + 50%.
        <br />
        An admin with Price Percent = 100 will bill items at purchase price + 100% (double the cost).
        <br />
        Price Percent = 0 means the item is billed at exactly its purchase price.
      </>
    ),
  },
  my: {
    title: "အခန်းကဏ္ဍနှင့် ခွင့်ပြုချက်များ",
    intro:
      "ဝန်ထမ်းအကောင့်တိုင်းတွင် အခန်းကဏ္ဍ (Role) တစ်ခုစီ သတ်မှတ်ထားရှိပါသည်။ ထိုအခန်းကဏ္ဍသည် ဝန်ထမ်းတစ်ဦးအနေဖြင့် စနစ်၏ မည်သည့်အပိုင်းများကို ကြည့်ရှုနိုင်ပြီး မည်သည့်လုပ်ဆောင်ချက်များကို ဆောင်ရွက်နိုင်သည်ဆိုသည်ကို ထိန်းချုပ်ပေးပါသည်။",
    rolesTitle: "အခန်းကဏ္ဍ (Role) များ အလုပ်လုပ်ပုံ",
    rolesPara:
      'အခန်းကဏ္ဍ (Role) ဆိုသည်မှာ ခွင့်ပြုချက်များ (ဥပမာ - "ငွေကိုင်"၊ "ဧည့်ကြို"၊ "စီမံခန့်ခွဲသူ") ကို အစုအဖွဲ့တစ်ခုအဖြစ် အမည်ပေးထားခြင်း ဖြစ်ပါသည်။ ဝန်ထမ်းတစ်ဦးအား အခန်းကဏ္ဍတစ်ခု သတ်မှတ်ပေးလိုက်ပါက ၎င်းအခန်းကဏ္ဍတွင် ပါဝင်သော ခွင့်ပြုချက်အားလုံးကို အလိုအလျောက် ရရှိမည် ဖြစ်ပါသည်။ အကယ်၍ ဝန်ထမ်း၏ အခန်းကဏ္ဍတွင် လိုအပ်သော ခွင့်ပြုချက်မရှိပါက သက်ဆိုင်ရာ မီနူးများနှင့် ခလုတ်များကို မြင်တွေ့ရမည် မဟုတ်ပါ။',
    permTitle: "ခွင့်ပြုချက် (Permissions) များ၏ ဖွဲ့စည်းပုံ",
    permIntro: "ခွင့်ပြုချက်တစ်ခုစီတွင် လုပ်ဆောင်ချက် (Action) နှင့် လုပ်ဆောင်မည့်အရာ (Subject) တို့ ပေါင်းစပ်ပါဝင်ပါသည် -",
    perms: [
      { label: "read",   desc: "စာရင်းများနှင့် အသေးစိတ်အချက်အလက်များကို ကြည့်ရှုနိုင်ခြင်း။" },
      { label: "create", desc: "မှတ်တမ်းအသစ်များကို ဖြည့်သွင်းနိုင်ခြင်း။" },
      { label: "update", desc: "ရှိပြီးသား မှတ်တမ်းများကို ပြန်လည်ပြင်ဆင်နိုင်ခြင်း။" },
      { label: "delete", desc: "မှတ်တမ်းများကို ဖျက်သိမ်းနိုင်ခြင်း။" },
    ],
    permSubjects:
      "လုပ်ဆောင်မည့်အရာ (Subjects) များတွင် လူနာ၊ ဆရာဝန်၊ ကုသမှု၊ ငွေတောင်းခံလွှာ၊ ဆေးဝါး/ပစ္စည်း၊ ဝန်ဆောင်မှု၊ ကုန်ကျစရိတ်၊ အမျိုးအစား၊ နေရာ၊ အသုံးပြုသူ၊ အခန်းကဏ္ဍ၊ ငွေတောင်းခံလွှာအစီရင်ခံစာ နှင့် ကုန်ကျစရိတ်အစီရင်ခံစာ တို့ ပါဝင်ပါသည်။",
    priceTitle: "ဝန်ထမ်းအကောင့်ရှိ ဈေးတင်နှုန်း (Price Percent)",
    pricePara: (
      <>
        ဝန်ထမ်းတစ်ဦးစီတွင်{" "}
        <strong className="text-[var(--text-primary)]">ဈေးတင်နှုန်း (Price Percent)</strong>{" "}
        တန်ဖိုး သတ်မှတ်ထားရှိပါသည်။ ၎င်းသည် ငွေတောင်းခံလွှာ ပြုလုပ်ချိန်တွင် ပစ္စည်းဈေးနှုန်းများအပေါ် မည်မျှဈေးတင်မည်ကို ထိန်းချုပ်ပေးခြင်း ဖြစ်ပါသည်။ ဤတန်ဖိုးကို စီမံခန့်ခွဲသူ (Administrator) မှ Settings → Users ကဏ္ဍတွင် သတ်မှတ်ပေးနိုင်ပါသည်။
      </>
    ),
    example: (
      <>
        ဥပမာ - ဈေးတင်နှုန်း (Price Percent) ၅၀ (50) ရှိသော ဝန်ထမ်းသည် ပစ္စည်းကို ဝယ်ယူဈေး + ၅၀% ဖြင့် ရောင်းချမည် ဖြစ်ပါသည်။
        <br />
        ဈေးတင်နှုန်း (Price Percent) ၁၀၀ (100) ရှိသော ဝန်ထမ်းသည် ပစ္စည်းကို ဝယ်ယူဈေး + ၁၀၀% (ဝယ်ယူဈေး၏ နှစ်ဆ) ဖြင့် ရောင်းချမည် ဖြစ်ပါသည်။
        <br />
        ဈေးတင်နှုန်း (Price Percent) သုည (0) ရှိပါက ပစ္စည်းကို ဝယ်ယူဈေးအတိုင်းသာ ရောင်းချမည်ဖြစ်ပြီး ဈေးတင်မှု ရှိမည်မဟုတ်ပါ။
      </>
    ),
  },
};

const RolesSection = ({ lang }: { lang: Lang }) => {
  const c = content[lang];
  return (
    <Section id="roles" title={c.title}>
      <p>{c.intro}</p>

      <Sub title={c.rolesTitle}>
        <p>{c.rolesPara}</p>
      </Sub>

      <Sub title={c.permTitle}>
        <p>{c.permIntro}</p>
        <div className="space-y-2">
          {c.perms.map(({ label, desc }) => (
            <Term key={label} label={label}>{desc}</Term>
          ))}
        </div>
        <p className="mt-2">{c.permSubjects}</p>
      </Sub>

      <Sub title={c.priceTitle}>
        <p>{c.pricePara}</p>
        <Example lang={lang}>{c.example}</Example>
      </Sub>
    </Section>
  );
};

export default RolesSection;
