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
        ဆရာဝန်တစ်ဦးစီရဲ့ Profile မှာ{" "}
        <strong className="text-[var(--text-primary)]">ကော်မရှင် (Commission)</strong> တန်ဖိုး
        သတ်မှတ်ထားပါတယ်။ ဒါက ဆရာဝန်တွေရဲ့ ကုသမှုတွေကနေ ရရှိတဲ့ ဝင်ငွေကို
        တွက်ချက်ဖို့အတွက် ဖြစ်ပါတယ်။
      </>
    ),
    note: "ကော်မရှင် (Commission) က လူနာဆီကနေ ဘေလ်တောင်းတဲ့အထဲမှာ ပါဝင်တာ မဟုတ်ပါဘူး။ ဒါက ဆေးရုံရဲ့ စာရင်းအင်းအတွက် သီးခြား တွက်ချက်တာ ဖြစ်ပါတယ်။ ဆရာဝန်တွေကို ငွေပေးချေဖို့အတွက်ပဲ ဒီတန်ဖိုးကို အစီရင်ခံစာတွေကနေတစ်ဆင့် အသုံးပြုပါတယ်။",
    subTitle: "ကော်မရှင် (Commission) တန်ဖိုးရဲ့ အဓိပ္ပာယ်",
    subPara:
      "ဆရာဝန် Profile မှာရှိတဲ့ ကော်မရှင်က ဆေးရုံရဲ့ မူဝါဒပေါ် မူတည်ပြီး ရာခိုင်နှုန်း ဒါမှမဟုတ် ပမာဏတစ်ခုခု ဖြစ်နိုင်ပါတယ်။ ဘယ်လိုပုံစံနဲ့ တွက်ချက်သလဲဆိုတာကို သက်ဆိုင်ရာ စီမံခန့်ခွဲသူ (Admin) ဆီမှာ မေးမြန်းနိုင်ပါတယ်။",
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
