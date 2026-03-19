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
        ဆရာဝန်တစ်ဦးစီ၏ ကိုယ်ရေးအချက်အလက် (Profile) တွင်{" "}
        <strong className="text-[var(--text-primary)]">ကော်မရှင် (Commission)</strong> တန်ဖိုး
        သတ်မှတ်ထားရှိပါသည်။ ၎င်းသည် ဆရာဝန်တစ်ဦး၏ ကုသမှုများမှ ရရှိသည့် ဝင်ငွေကို
        တွက်ချက်ရန်အတွက် အခြေခံအချက်အလက်တစ်ခု ဖြစ်ပါသည်။
      </>
    ),
    note: "ကော်မရှင် (Commission) သည် လူနာ၏ ငွေတောင်းခံလွှာမှ အလိုအလျောက် နုတ်ယူခြင်းမျိုး မဟုတ်ဘဲ ဆေးရုံ၏ ပြည်တွင်းငွေစာရင်းတွင်သာ သီးခြားကိုင်တွယ်ခြင်း ဖြစ်ပါသည်။ ဘဏ္ဍာရေးဌာနသည် ဆရာဝန်များအား ငွေပေးချေမှုများ ပြုလုပ်ရန်အတွက် ဤကော်မရှင်တန်ဖိုးကို အစီရင်ခံစာများမှတစ်ဆင့် တွက်ချက်အသုံးပြုပါသည်။",
    subTitle: "ကော်မရှင် (Commission) တန်ဖိုး၏ အဓိပ္ပာယ်",
    subPara:
      "ဆရာဝန်၏ ကိုယ်ရေးအချက်အလက်တွင် ဖော်ပြထားသော ကော်မရှင် (Commission) သည် ဆေးရုံ၏ ငွေကြေးဆိုင်ရာ မူဝါဒများအရ ရာခိုင်နှုန်း (သို့မဟုတ်) သတ်မှတ်ထားသော ပမာဏတစ်ခုခု ဖြစ်နိုင်ပါသည်။ ၎င်းသည် စုစုပေါင်း ကျသင့်ငွေ၏ ရာခိုင်နှုန်း ဖြစ်သလား (သို့မဟုတ်) ကုသမှုတစ်ခုချင်းအလိုက် သတ်မှတ်ထားသော ပမာဏဖြစ်သလား ဆိုသည်ကို သက်ဆိုင်ရာ စီမံခန့်ခွဲသူ (Administrator) ထံတွင် မေးမြန်းအတည်ပြုနိုင်ပါသည်။",
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
