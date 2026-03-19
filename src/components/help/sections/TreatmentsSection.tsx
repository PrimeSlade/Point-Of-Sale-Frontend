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
    title: "ကုသမှုများ",
    intro:
      "ကုသမှုမှတ်တမ်းသည် လူနာတစ်ဦးနှင့် ဆရာဝန်တစ်ဦးကို သက်ဆိုင်ရာ ကုသမှုတစ်ခုအတွက် ချိတ်ဆက်သည်။ ဆေးဖတ်မှတ်တမ်းများ ထည့်သွင်းနိုင်ပြီး ငွေတောင်းခံလွှာ၏ အခြေခံ ဖြစ်သည်။",
    stepsTitle: "ကုသမှု မှတ်တမ်းတင်ပုံ",
    steps: [
      '"ကုသမှုများ" သို့ သွားပြီး "ကုသမှုအသစ် ထည့်ရန်" ကို နှိပ်ပါ။',
      "လူနာနှင့် ကုသပေးသော ဆရာဝန်ကို ရွေးချယ်ပါ။",
      "ရောဂါရှာဖွေတွေ့ရှိချက်၊ ကုသမှုဖော်ပြချက်နှင့် စစ်ဆေးမှုရလဒ်များ ဖြည့်သွင်းပါ။",
      "မှတ်တမ်းကို သိမ်းဆည်းပါ။ ယခုမှစ၍ ငွေတောင်းခံလွှာနှင့် ချိတ်ဆက်ရန် အသုံးပြုနိုင်သည်။",
    ],
    fieldsTitle: "ကွင်းများ",
    fields: [
      { label: "Investigation", desc: "စစ်ဆေးမှုရလဒ်များ သို့မဟုတ် စစ်ဆေးတွေ့ရှိချက်များ (ရွေးချယ်၍ ဖြည့်နိုင်သည်)။" },
      { label: "Diagnosis",     desc: "ဆေးပညာအရ သတ်မှတ်ထားသော ရောဂါ သို့မဟုတ် ကျန်းမာရေး အခြေအနေ။" },
      { label: "Treatment",     desc: "ဆောင်ရွက်သည့် ကုသမှု အစီအစဉ် သို့မဟုတ် လုပ်ဆောင်ချက်။" },
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
