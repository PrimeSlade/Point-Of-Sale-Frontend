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
    title: "လူနာမှတ်ပုံတင်ခြင်း",
    intro:
      "လူနာတစ်ဦးအတွက် ကုသမှုမှတ်တမ်းများ မပြုလုပ်မီ ၎င်းအား လူနာစာရင်းတွင် ကြိုတင်မှတ်ပုံတင်ထားရှိရမည် ဖြစ်ပါသည်။",
    regTitle: "လူနာမှတ်ပုံတင်ခြင်း လုပ်ငန်းစဉ်",
    steps: [
      '"လူနာများ" (Patients) ကဏ္ဍသို့ သွားရောက်၍ "လူနာအသစ်ထည့်ရန်" (Add New Patient) ခလုတ်ကို နှိပ်ပါ။',
      "လူနာ၏ အမည်၊ ဖုန်းနံပါတ်၊ မွေးသက္ကရာဇ်နှင့် ကျား/မ (လိင်) တို့ကို ပြည့်စုံစွာ ဖြည့်သွင်းပါ။",
      "သက်ဆိုင်ရာ ဌာန၊ လူနာအခြေအနေ၊ အမျိုးအစားနှင့် ကျန်းမာရေးအခြေအနေများကို မှန်ကန်စွာ ရွေးချယ်ပါ။",
      "လူနာပြသသည့် နေရာ (သို့မဟုတ်) ဌာနခွဲကို သတ်မှတ်ပေးပါ။",
      '"ထည့်ရန်" (Add) ခလုတ်ကို နှိပ်၍ အချက်အလက်များကို သိမ်းဆည်းပါ။',
    ],
    statusTitle: "လူနာ၏ အခြေအနေ (Patient Status)",
    status: [
      { label: "new_patient", desc: "ဆေးရုံသို့ ပထမဆုံးအကြိမ် လာရောက်ပြသသော လူနာဖြစ်ပြီး စနစ်အတွင်း ယခင်မှတ်တမ်းများ မရှိသေးသော အခြေအနေ။" },
      { label: "follow_up",   desc: "ယခင်ကုသမှုများနှင့် ဆက်စပ်၍ ပြန်လည်ပြသရန် ချိန်းဆိုထားသော အခြေအနေ။" },
      { label: "post_op",     desc: "ခွဲစိတ်ကုသမှု ခံယူပြီးနောက် နောက်ဆက်တွဲ စောင့်ကြည့်စစ်ဆေးမှုများအတွက် လာရောက်ပြသခြင်း။" },
    ],
    typeTitle: "လူနာအမျိုးအစား (Patient Type)",
    types: [
      { label: "in",  desc: "အတွင်းလူနာ - ဆေးရုံတွင် တစ်ည (သို့မဟုတ်) တစ်ညထက်ပို၍ တက်ရောက်ကုသမှု ခံယူနေသော လူနာ။" },
      { label: "out", desc: "ပြင်ပလူနာ - ဆေးရုံတက်ရောက်ရန် မလိုဘဲ နေ့ချင်းပြန် လာရောက်ပြသသော လူနာ။" },
    ],
    condTitle: "ကျန်းမာရေးအခြေအနေ (Patient Condition)",
    conditions: [
      { label: "disable",        desc: "မသန်စွမ်းအဖြစ် မှတ်ပုံတင်ထားသော လူနာဖြစ်ပြီး ၎င်းအခြေအနေသည် ကုသမှုစရိတ် (သို့မဟုတ်) ပြုစုစောင့်ရှောက်မှု နည်းလမ်းများအပေါ် သက်ရောက်မှု ရှိနိုင်ပါသည်။" },
      { label: "pregnant_woman", desc: "ကိုယ်ဝန်ဆောင်လူနာဖြစ်ပြီး ၎င်းအခြေအနေအရ အချို့သော ကုသမှုများ (သို့မဟုတ်) ဆေးဝါးများအပေါ် ကန့်သတ်ချက်များ ရှိနိုင်ပါသည်။" },
    ],
    deptTitle: "ဌာနများ (Departments)",
    depts: [
      { label: "og",      desc: "သားဖွားနှင့် မီးယပ်ဌာန (OG) - မိခင်နှင့် ကလေးကျန်းမာရေး၊ ကိုယ်ဝန်ဆောင်မှုနှင့် အမျိုးသမီးကျန်းမာရေးဆိုင်ရာ ကုသမှုများ။" },
      { label: "oto",     desc: "နား၊ နှာခေါင်း၊ လည်ချောင်းဌာန (ENT) - နား၊ နှာခေါင်းနှင့် လည်ချောင်းဆိုင်ရာ ကုသမှုများ။" },
      { label: "surgery", desc: "အထွေထွေခွဲစိတ်ကုသမှုဌာန - ခွဲစိတ်ကုသမှုများနှင့် ခွဲစိတ်ပြီးနောက်ပိုင်း ပြုစုစောင့်ရှောက်မှုများ။" },
      { label: "general", desc: "အထွေထွေရောဂါကုသမှုဌာန - အထူးကုဆရာဝန်နှင့် ပြသရန်မလိုသော အထွေထွေဝေဒနာရှင်များအတွက်။" },
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
