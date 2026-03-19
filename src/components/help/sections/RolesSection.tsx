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
      "ဝန်ထမ်းတစ်ဦးစီအတွက် အခန်းကဏ္ဍ (Role) တစ်ခု သတ်မှတ်ထားပါတယ်။ ဒီ Role က စနစ်ရဲ့ ဘယ်အပိုင်းတွေကို ကြည့်နိုင်သလဲ၊ ဘာတွေ လုပ်နိုင်သလဲဆိုတာကို ထိန်းချုပ်ပေးတာ ဖြစ်ပါတယ်။",
    rolesTitle: "Role တွေ ဘယ်လို အလုပ်လုပ်သလဲ",
    rolesPara:
      'Role ဆိုတာ ခွင့်ပြုချက်တွေကို အစုအဖွဲ့တစ်ခုအနေနဲ့ အမည်ပေးထားတာ ဖြစ်ပါတယ် (ဥပမာ - "ငွေကိုင်"၊ "ဧည့်ကြို"၊ "စီမံခန့်ခွဲသူ")။ ဝန်ထမ်းတစ်ဦးကို Role တစ်ခု သတ်မှတ်ပေးလိုက်ရင် အဲဒီ Role မှာပါတဲ့ ခွင့်ပြုချက်အားလုံးကို ရရှိမှာ ဖြစ်ပါတယ်။ အကယ်လို့ ဝန်ထမ်းရဲ့ Role မှာ ခွင့်ပြုချက် မရှိရင်တော့ သက်ဆိုင်ရာ ခလုတ်တွေ ဒါမှမဟုတ် မီနူးတွေကို မြင်ရမှာ မဟုတ်ပါဘူး။',
    permTitle: "ခွင့်ပြုချက် (Permissions) များ",
    permIntro: "ခွင့်ပြုချက်တစ်ခုမှာ လုပ်ဆောင်ချက် (Action) နဲ့ လုပ်ဆောင်မယ့်အရာ (Subject) တွေ ပါဝင်ပါတယ် -",
    perms: [
      { label: "read",   desc: "စာရင်းတွေနဲ့ အချက်အလက်တွေကို ကြည့်ရှုနိုင်ခြင်း။" },
      { label: "create", desc: "မှတ်တမ်းအသစ်တွေ ထည့်သွင်းနိုင်ခြင်း။" },
      { label: "update", desc: "ရှိပြီးသား မှတ်တမ်းတွေကို ပြန်ပြင်နိုင်ခြင်း။" },
      { label: "delete", desc: "မှတ်တမ်းတွေကို ဖျက်နိုင်ခြင်း။" },
    ],
    permSubjects:
      "လုပ်ဆောင်မယ့်အရာ (Subjects) တွေထဲမှာ လူနာ၊ ဆရာဝန်၊ ကုသမှု၊ ဘေလ်၊ ဆေးဝါး၊ ဝန်ဆောင်မှု၊ ကုန်ကျစရိတ်၊ နေရာ၊ အသုံးပြုသူ စတာတွေ ပါဝင်ပါတယ်။",
    priceTitle: "ဈေးတင်နှုန်း (Price Percent)",
    pricePara: (
      <>
        ဝန်ထမ်းတစ်ဦးစီမှာ{" "}
        <strong className="text-[var(--text-primary)]">ဈေးတင်နှုန်း (Price Percent)</strong>{" "}
        တန်ဖိုး ရှိပါတယ်။ ဒါက ဘေလ်ထုတ်တဲ့အခါမှာ ပစ္စည်းဈေးနှုန်းပေါ်မှာ ဘယ်လောက် ဈေးတင်မလဲဆိုတာကို သတ်မှတ်တာ ဖြစ်ပါတယ်။ ဒီတန်ဖိုးကို Admin ကနေ Settings → Users မှာ သတ်မှတ်ပေးနိုင်ပါတယ်။
      </>
    ),
    example: (
      <>
        ဥပမာ - Price Percent = 50 ရှိတဲ့ ဝန်ထမ်းက ပစ္စည်းကို ဝယ်ဈေး + ၅၀% နဲ့ ရောင်းမှာ ဖြစ်ပါတယ်။
        <br />
        Price Percent = 100 ရှိတဲ့ ဝန်ထမ်းကတော့ ဝယ်ဈေးရဲ့ နှစ်ဆ (ဝယ်ဈေး + ၁၀၀%) နဲ့ ရောင်းမှာ ဖြစ်ပါတယ်။
        <br />
        Price Percent = 0 ဆိုရင်တော့ ဝယ်ဈေးအတိုင်းပဲ ဘေလ်ထုတ်မှာ ဖြစ်ပြီး ဈေးတင်မှာ မဟုတ်ပါဘူး။
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
