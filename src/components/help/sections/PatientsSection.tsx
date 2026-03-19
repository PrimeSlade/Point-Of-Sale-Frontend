import { type Lang } from "@/data/helpContent";
import { Section, Steps, Sub, Term } from "../HelpPrimitives";

const content = {
  en: {
    title: "Patients",
    intro:
      "Every person receiving care must be registered as a patient before a treatment can be created for them.",
    regTitle: "How to register a patient",
    steps: [
      'Go to Patients and click "Add New Patient".',
      "Enter their name, phone number, date of birth, and gender.",
      "Select their department, status, type, and condition.",
      "Assign the location (branch) they are visiting.",
      'Click "Add" to save.',
    ],
    statusTitle: "Patient Status",
    status: [
      { label: "new_patient", desc: "First-time visit. No prior history in the system." },
      { label: "follow_up",   desc: "Returning for a follow-up related to a previous treatment." },
      { label: "post_op",     desc: "Attending post-operative recovery or monitoring visits after surgery." },
    ],
    typeTitle: "Patient Type",
    types: [
      { label: "in",  desc: "In-patient — admitted and staying in the hospital overnight or longer." },
      { label: "out", desc: "Out-patient — visits for the day and leaves without being admitted." },
    ],
    condTitle: "Patient Condition",
    conditions: [
      { label: "disable",         desc: "Patient has a registered disability. May affect pricing or care protocols." },
      { label: "pregnant_woman",  desc: "Patient is currently pregnant. Some procedures or medications may be restricted." },
    ],
    deptTitle: "Departments",
    depts: [
      { label: "og",      desc: "Obstetrics & Gynaecology — maternal care, pregnancy, women's health." },
      { label: "oto",     desc: "Otolaryngology (ENT) — ear, nose, and throat." },
      { label: "surgery", desc: "General Surgery — surgical procedures and post-op care." },
      { label: "general", desc: "General Medicine — patients not under a specialist." },
    ],
  },
  my: {
    title: "လူနာစာရင်းသွင်းခြင်း",
    intro:
      "ကုသမှုမှတ်တမ်းတွေ မလုပ်ခင်မှာ လူနာကို စနစ်ထဲမှာ အရင်ဆုံး စာရင်းသွင်းထားဖို့ လိုပါတယ်။",
    regTitle: "လူနာစာရင်းသွင်းနည်း",
    steps: [
      '"လူနာများ" (Patients) ကိုသွားပြီး "လူနာအသစ်ထည့်ရန်" (Add New Patient) ကို နှိပ်ပါ။',
      "လူနာရဲ့ အမည်၊ ဖုန်းနံပါတ်၊ မွေးသက္ကရာဇ်နဲ့ ကျား/မ ကို ဖြည့်ပါ။",
      "ဌာန၊ လူနာအခြေအနေ၊ အမျိုးအစားနဲ့ ကျန်းမာရေးအခြေအနေတွေကို ရွေးချယ်ပါ။",
      "လူနာပြသတဲ့ နေရာ (သို့မဟုတ်) ဌာနခွဲကို သတ်မှတ်ပေးပါ။",
      '"ထည့်ရန်" (Add) ကို နှိပ်ပြီး သိမ်းဆည်းလိုက်ပါ။',
    ],
    statusTitle: "လူနာအခြေအနေ (Patient Status)",
    status: [
      { label: "new_patient", desc: "ဆေးရုံကို ပထမဆုံးအကြိမ် လာပြတာဖြစ်ပြီး စနစ်ထဲမှာ မှတ်တမ်းမရှိသေးတဲ့ အခြေအနေ။" },
      { label: "follow_up",   desc: "အရင်ကုသမှုတွေနဲ့ ပတ်သက်ပြီး ပြန်ပြဖို့ ချိန်းထားတဲ့ အခြေအနေ။" },
      { label: "post_op",     desc: "ခွဲစိတ်ပြီးနောက်ပိုင်း ပြန်လည်စစ်ဆေးဖို့ လာပြတဲ့ အခြေအနေ။" },
    ],
    typeTitle: "လူနာအမျိုးအစား (Patient Type)",
    types: [
      { label: "in",  desc: "အတွင်းလူနာ - ဆေးရုံမှာ တက်ရောက်ကုသနေတဲ့ လူနာ။" },
      { label: "out", desc: "ပြင်ပလူနာ - ဆေးရုံတက်ဖို့မလိုဘဲ နေ့ချင်းပြန် လာပြတဲ့ လူနာ။" },
    ],
    condTitle: "ကျန်းမာရေးအခြေအနေ (Patient Condition)",
    conditions: [
      { label: "disable",        desc: "မသန်စွမ်းအဖြစ် စာရင်းသွင်းထားတဲ့ လူနာဖြစ်ပြီး၊ ဒါက ကုသမှုစရိတ် ဒါမှမဟုတ် ပြုစုပုံအပေါ် သက်ရောက်မှု ရှိနိုင်ပါတယ်။" },
      { label: "pregnant_woman", desc: "ကိုယ်ဝန်ဆောင်လူနာဖြစ်ပြီး၊ အချို့သော ကုသမှုတွေနဲ့ ဆေးဝါးတွေအတွက် ကန့်သတ်ချက်တွေ ရှိနိုင်ပါတယ်။" },
    ],
    deptTitle: "ဌာနများ (Departments)",
    depts: [
      { label: "og",      desc: "သားဖွားနှင့် မီးယပ်ဌာန (OG) - မိခင်ကျန်းမာရေး၊ ကိုယ်ဝန်ဆောင်မှုနဲ့ အမျိုးသမီးကျန်းမာရေးဆိုင်ရာ ကုသမှုတွေ။" },
      { label: "oto",     desc: "နား၊ နှာခေါင်း၊ လည်ချောင်းဌာန (ENT) - နား၊ နှာခေါင်းနဲ့ လည်ချောင်းဆိုင်ရာ ကုသမှုတွေ။" },
      { label: "surgery", desc: "အထွေထွေခွဲစိတ်ကုသမှုဌာန - ခွဲစိတ်ကုသမှုတွေနဲ့ ခွဲစိတ်ပြီးနောက်ပိုင်း ပြုစုစောင့်ရှောက်မှုတွေ။" },
      { label: "general", desc: "အထွေထွေရောဂါကုသမှုဌာန - အထူးကုမလိုတဲ့ အထွေထွေဝေဒနာရှင်တွေအတွက်။" },
    ],
  },
};

const PatientsSection = ({ lang }: { lang: Lang }) => {
  const c = content[lang];
  return (
    <Section id="patients" title={c.title}>
      <p>{c.intro}</p>

      <Sub title={c.regTitle}>
        <Steps items={c.steps} />
      </Sub>

      <Sub title={c.statusTitle}>
        <div className="space-y-2">
          {c.status.map(({ label, desc }) => (
            <Term key={label} label={label}>{desc}</Term>
          ))}
        </div>
      </Sub>

      <Sub title={c.typeTitle}>
        <div className="space-y-2">
          {c.types.map(({ label, desc }) => (
            <Term key={label} label={label}>{desc}</Term>
          ))}
        </div>
      </Sub>

      <Sub title={c.condTitle}>
        <div className="space-y-2">
          {c.conditions.map(({ label, desc }) => (
            <Term key={label} label={label}>{desc}</Term>
          ))}
        </div>
      </Sub>

      <Sub title={c.deptTitle}>
        <div className="space-y-2">
          {c.depts.map(({ label, desc }) => (
            <Term key={label} label={label}>{desc}</Term>
          ))}
        </div>
      </Sub>
    </Section>
  );
};

export default PatientsSection;
