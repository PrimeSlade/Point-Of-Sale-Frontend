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
      "ကုသမှုမှတ်တမ်းဆိုတာ လူနာတစ်ဦးနဲ့ ကုသပေးတဲ့ ဆရာဝန်ကို ချိတ်ဆက်ပေးတာ ဖြစ်ပါတယ်။ ဆေးမှတ်တမ်းတွေကို ဒီမှာ ထည့်သွင်းနိုင်ပြီး၊ ဒါက ဘေလ် (Invoice) ထုတ်ဖို့အတွက် အခြေခံအချက်အလက်တွေ ဖြစ်ပါတယ်။",
    stepsTitle: "ကုသမှုမှတ်တမ်းသွင်းနည်း",
    steps: [
      '"ကုသမှုများ" (Treatments) ကိုသွားပြီး "ကုသမှုအသစ်ထည့်ရန်" (Add New Treatment) ကို နှိပ်ပါ။',
      "လူနာနဲ့ ကုသပေးတဲ့ ဆရာဝန်ကို ရွေးချယ်ပါ။",
      "ရောဂါအဖြေ (Diagnosis)၊ ကုသမှုဖော်ပြချက် (Treatment) နဲ့ စစ်ဆေးမှုရလဒ် (Investigation) တွေကို ဖြည့်ပါ။",
      "မှတ်တမ်းကို သိမ်းဆည်းလိုက်ပါ။ ဒါဆိုရင် ဘေလ် (Invoice) နဲ့ ချိတ်ဆက်ပြီး အသုံးပြုလို့ ရပါပြီ။",
    ],
    fieldsTitle: "အချက်အလက်များ",
    fields: [
      { label: "Investigation", desc: "စစ်ဆေးမှုရလဒ်တွေ ဒါမှမဟုတ် တွေ့ရှိချက်တွေ (ရှိရင် ဖြည့်ဖို့)။" },
      { label: "Diagnosis",     desc: "တွေ့ရှိရတဲ့ ရောဂါအမည် ဒါမှမဟုတ် ကျန်းမာရေးအခြေအနေ။" },
      { label: "Treatment",     desc: "လုပ်ဆောင်ပေးခဲ့တဲ့ ကုသမှုအစီအစဉ် ဒါမှမဟုတ် လုပ်ဆောင်ချက်တွေ။" },
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
