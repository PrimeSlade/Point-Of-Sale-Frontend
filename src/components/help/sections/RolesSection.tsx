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
    title: "အခန်းကဏ္ဍနှင့် ခွင့်ပြုချက်",
    intro:
      "ဝန်ထမ်းတိုင်း အကောင့်တွင် အခန်းကဏ္ဍ (Role) တစ်ခု သတ်မှတ်ထားသည်။ ထို Role သည် ဝန်ထမ်း မည်သည့်အပိုင်းကို ကြည့်ရှုနိုင်ကြောင်းနှင့် မည်သည့် လုပ်ဆောင်ချက်များ ပြုနိုင်ကြောင်းကို ထိန်းချုပ်သည်။",
    rolesTitle: "Role အလုပ်လုပ်ပုံ",
    rolesPara:
      'Role ဆိုသည်မှာ ခွင့်ပြုချက်များ (ဥပမာ — "Cashier"၊ "Receptionist"၊ "Admin") ၏ အမည်ရှိသော အစုအဝေးဖြစ်သည်။ ဝန်ထမ်းတစ်ဦး ထို Role ရရှိသောအခါ Role ပေါ်ရှိ ခွင့်ပြုချက်အားလုံးကို အလိုအလျောက် ဆက်ခံသည်။ ဝန်ထမ်း၏ Role တွင် လိုအပ်သော ခွင့်ပြုချက်မရှိပါက မီနူးများနှင့် ခလုတ်များ အလိုအလျောက် ဝှက်မြုပ်သွားမည်ဖြစ်သည်။',
    permTitle: "ခွင့်ပြုချက် ဖွဲ့စည်းပုံ",
    permIntro: "ခွင့်ပြုချက်တစ်ခုစီသည် လုပ်ဆောင်ချက်နှင့် ဘာသာရပ်ကို ပေါင်းစပ်ထားသည်-",
    perms: [
      { label: "read",   desc: "စာရင်းများနှင့် အသေးစိတ်ကို ကြည့်ရှုနိုင်ခြင်း။" },
      { label: "create", desc: "မှတ်တမ်းအသစ်များ ထည့်သွင်းနိုင်ခြင်း။" },
      { label: "update", desc: "ရှိပြီးသား မှတ်တမ်းများ ပြင်ဆင်နိုင်ခြင်း။" },
      { label: "delete", desc: "မှတ်တမ်းများ ဖျက်နိုင်ခြင်း။" },
    ],
    permSubjects:
      "ဘာသာရပ်များတွင် ပါဝင်သည်- Patient, Doctor, Treatment, Invoice, Item, Service, Expense, Category, Location, User, Role, Report-Invoice, Report-Expense။",
    priceTitle: "ဝန်ထမ်းအကောင့်ရှိ Price Percent",
    pricePara: (
      <>
        ဝန်ထမ်းတစ်ဦးစီတွင်{" "}
        <strong className="text-[var(--text-primary)]">Price Percent</strong>{" "}
        တန်ဖိုးရှိသည်။ ၎င်းသည် ငွေတောင်းခံလွှာ ဖန်တီးသောအခါ ပစ္စည်းဈေး တင်မှုကို
        ထိန်းချုပ်သည်။ Settings → Users တွင် စီမံခန့်ခွဲသူမှ သတ်မှတ်ပေးသည်။
      </>
    ),
    example: (
      <>
        Price Percent = 50 ရှိသော လက်ခံဌာန ဝန်ထမ်းသည် ပစ္စည်းကို ဝယ်ဈေး + ၅၀% ဖြင့် ရောင်းချမည်။
        <br />
        Price Percent = 100 ရှိသော Admin သည် ပစ္စည်းကို ဝယ်ဈေး + ၁၀၀% (နှစ်ဆ) ဖြင့် ရောင်းချမည်။
        <br />
        Price Percent = 0 ဆိုပါက ပစ္စည်းကို ဝယ်ဈေးအတိုင်း ငွေတောင်းခံမည်၊ ဈေးတင်မှု မရှိပါ။
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
        <Example>{c.example}</Example>
      </Sub>
    </Section>
  );
};

export default RolesSection;
