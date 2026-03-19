import { type Lang } from "@/data/helpContent";
import { Section, Steps, Sub, Term } from "../HelpPrimitives";

const content = {
  en: {
    title: "Treatments",
    intro:
      "A treatment record links a patient to a doctor for a specific visit. It captures the clinical notes for that encounter and acts as the basis for the invoice.",
    stepsTitle: "How to record a treatment",
    steps: [
      'Go to Treatment and click "Add New Treatment".',
      "Select the patient and the doctor who attended them.",
      "Fill in the diagnosis, treatment description, and any investigation findings.",
      "Save the record. The treatment is now available to attach to an invoice.",
    ],
    fieldsTitle: "Fields",
    fields: [
      { label: "Investigation", desc: "Test results or examination findings (optional)." },
      { label: "Diagnosis",     desc: "The clinical condition or disease identified." },
      { label: "Treatment",     desc: "The treatment plan or procedure carried out." },
    ],
  },
  my: {
    title: "ကုသမှုမှတ်တမ်းများ",
    intro:
      "ကုသမှုမှတ်တမ်းသည် လူနာတစ်ဦးနှင့် ကုသပေးသည့် ဆရာဝန်တို့အကြား ချိတ်ဆက်မှုတစ်ခု ဖြစ်ပါသည်။ ၎င်းတွင် ဆေးဘက်ဆိုင်ရာ မှတ်တမ်းများကို ထည့်သွင်းနိုင်ပြီး ငွေတောင်းခံလွှာများ ပြုလုပ်ရန်အတွက် အခြေခံအချက်အလက်များအဖြစ် အသုံးပြုပါသည်။",
    stepsTitle: "ကုသမှုမှတ်တမ်းတင်ခြင်း လုပ်ငန်းစဉ်",
    steps: [
      '"ကုသမှုများ" (Treatments) ကဏ္ဍသို့ သွားရောက်၍ "ကုသမှုအသစ်ထည့်ရန်" (Add New Treatment) ခလုတ်ကို နှိပ်ပါ။',
      "သက်ဆိုင်ရာ လူနာနှင့် ကုသပေးသည့် ဆရာဝန်တို့ကို မှန်ကန်စွာ ရွေးချယ်ပါ။",
      "ရောဂါရှာဖွေတွေ့ရှိချက် (Diagnosis)၊ ကုသမှုဖော်ပြချက် (Treatment Description) နှင့် စစ်ဆေးမှုရလဒ် (Investigation Findings) များကို ပြည့်စုံစွာ ဖြည့်သွင်းပါ။",
      "မှတ်တမ်းကို သိမ်းဆည်းပါ။ ထိုသို့သိမ်းဆည်းပြီးပါက ငွေတောင်းခံလွှာများနှင့် ချိတ်ဆက်၍ အသုံးပြုနိုင်ပြီ ဖြစ်ပါသည်။",
    ],
    fieldsTitle: "အချက်အလက်များ",
    fields: [
      { label: "Investigation", desc: "စစ်ဆေးမှုရလဒ်များ သို့မဟုတ် ရှာဖွေတွေ့ရှိချက်များ (လိုအပ်ပါက ဖြည့်သွင်းရန်)။" },
      { label: "Diagnosis",     desc: "ဆေးပညာအရ သတ်မှတ်ထားသော ရောဂါရှာဖွေတွေ့ရှိချက် (သို့မဟုတ်) ကျန်းမာရေးအခြေအနေ။" },
      { label: "Treatment",     desc: "ဆောင်ရွက်ပေးခဲ့သည့် ကုသမှုအစီအစဉ် (သို့မဟုတ်) လုပ်ဆောင်ချက်များ။" },
    ],
  },
};

const TreatmentsSection = ({ lang }: { lang: Lang }) => {
  const c = content[lang];
  return (
    <Section id="treatments" title={c.title}>
      <p>{c.intro}</p>

      <Sub title={c.stepsTitle}>
        <Steps items={c.steps} />
      </Sub>

      <Sub title={c.fieldsTitle}>
        <div className="space-y-2">
          {c.fields.map(({ label, desc }) => (
            <Term key={label} label={label}>{desc}</Term>
          ))}
        </div>
      </Sub>
    </Section>
  );
};

export default TreatmentsSection;
