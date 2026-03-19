import { type Lang } from "@/data/helpContent";
import { Section, Sub } from "../HelpPrimitives";

const content = {
  en: {
    title: "Doctor Commission",
    intro: (
      <>
        Each doctor has a{" "}
        <strong className="text-[var(--text-primary)]">Commission</strong> value
        on their profile. This is a reference figure used to calculate how much
        the doctor earns from treatments they perform.
      </>
    ),
    note: "Commission is not automatically deducted from the patient's invoice — it is a separate internal accounting figure. Your hospital's finance team uses it to calculate doctor payouts from the reports.",
    subTitle: "What the commission value means",
    subPara:
      "The commission number stored on a doctor's profile represents a percentage or fixed rate as defined by your hospital's billing policy. Ask your administrator to confirm whether it is a percentage of invoice total or a fixed amount per treatment.",
  },
  my: {
    title: "ဆရာဝန် ကော်မရှင်",
    intro: (
      <>
        ဆရာဝန်တစ်ဦးစီ၏ ပရိုဖိုင်တွင်{" "}
        <strong className="text-[var(--text-primary)]">Commission</strong> တန်ဖိုး
        ရှိသည်။ ၎င်းသည် ဆရာဝန်တစ်ဦးထမ်းဆောင်သော ကုသမှုများမှ ရရှိသည့် ဝင်ငွေကို
        တွက်ချက်ရန် ကိုးကားချက် ဖြစ်သည်။
      </>
    ),
    note: "Commission သည် လူနာ၏ ငွေတောင်းခံလွှာမှ အလိုအလျောက် နုတ်ယူခြင်း မဟုတ်ပါ — ၎င်းသည် ဆေးရုံ၏ ငွေကြေးစာရင်းတွင် သီးခြား ကိုင်တွယ်သည်။ ဘဏ္ဍာရေးဌာနသည် ဆရာဝန်ငွေပေးချေမှုများ တွက်ချက်ရန် ဤတန်ဖိုးကို အစီရင်ခံစာများမှ အသုံးပြုသည်။",
    subTitle: "Commission တန်ဖိုး ဆိုသည်မှာ",
    subPara:
      "ဆရာဝန် ပရိုဖိုင်တွင် သိမ်းဆည်းသော Commission သည် ဆေးရုံ၏ ငွေကြေးမူဝါဒ အရ ရာခိုင်နှုန်း သို့မဟုတ် သတ်မှတ်ဈေးနှုန်းဖြင့် ဖော်ပြသည်။ ငွေတောင်းခံလွှာ စုစုပေါင်း၏ ရာခိုင်နှုန်းဟုတ်မဟုတ် (သို့) ကုသမှုတစ်ခုလျှင် သတ်မှတ်ငွေဟုတ်မဟုတ် သင့် စီမံခန့်ခွဲသူထံ မေးမြန်းနိုင်သည်။",
  },
};

const CommissionSection = ({ lang }: { lang: Lang }) => {
  const c = content[lang];
  return (
    <Section id="commission" title={c.title}>
      <p>{c.intro}</p>
      <p>{c.note}</p>
      <Sub title={c.subTitle}>
        <p>{c.subPara}</p>
      </Sub>
    </Section>
  );
};

export default CommissionSection;
