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
    title: "လူနာများ",
    intro:
      "ကုသမှု မှတ်တမ်းတင်နိုင်ရန် လူနာအဖြစ် ကြိုတင်မှတ်ပုံတင်ထားရမည်။",
    regTitle: "လူနာ မှတ်ပုံတင်ပုံ",
    steps: [
      '"လူနာများ" သို့ သွားပြီး "လူနာအသစ် ထည့်ရန်" ကို နှိပ်ပါ။',
      "နာမည်၊ ဖုန်းနံပါတ်၊ မွေးသက္ကရာဇ်နှင့် ကျား/မ ဖြည့်သွင်းပါ။",
      "ဌာန၊ အခြေအနေ၊ အမျိုးအစားနှင့် ကျန်းမာရေးအခြေအနေ ရွေးချယ်ပါ။",
      "သက်ဆိုင်ရာ နေရာ (ဌာနခွဲ) သတ်မှတ်ပါ။",
      '"ထည့်ရန်" နှိပ်၍ သိမ်းဆည်းပါ။',
    ],
    statusTitle: "လူနာ အခြေအနေ",
    status: [
      { label: "new_patient", desc: "ပထမဆုံး လာရောက်စစ်ဆေးသော လူနာ။ စနစ်တွင် ယခင်မှတ်တမ်း မရှိသေးပါ။" },
      { label: "follow_up",   desc: "ယခင် ကုသမှုနှင့် ဆက်စပ်၍ ပြန်လည် လာရောက်ခြင်း။" },
      { label: "post_op",     desc: "ခွဲစိတ်မှုပြီးနောက် နောက်ဆက်တွဲ စောင့်ကြည့်မှုအတွက် လာရောက်ခြင်း။" },
    ],
    typeTitle: "လူနာ အမျိုးအစား",
    types: [
      { label: "in",  desc: "ဆေးရုံ တက်ရောက် — တစ်ညသို့မဟုတ် ထိုထက်ပိုကြာ ဆေးရုံတွင် နေထိုင်သည်။" },
      { label: "out", desc: "ဆေးရုံ မတက်ဘဲ — နေ့ချင်းပြန် ကုသမှုခံယူ၍ ပြန်သွားသည်။" },
    ],
    condTitle: "ကျန်းမာရေး အခြေအနေ",
    conditions: [
      { label: "disable",        desc: "မသန်မစွမ်း မှတ်ပုံတင်ထားသော လူနာ။ ဈေးနှုန်း သို့မဟုတ် စောင့်ရှောက်မှုနည်းစနစ်ကို သက်ရောက်နိုင်သည်။" },
      { label: "pregnant_woman", desc: "ကိုယ်ဝန်ဆောင် လူနာ။ အချို့ ကုသနည်းများ သို့မဟုတ် ဆေးဝါးများ ကန့်သတ်ချက် ရှိနိုင်သည်။" },
    ],
    deptTitle: "ဌာနများ",
    depts: [
      { label: "og",      desc: "မီးဖွားဂိုဏ်း (OG) — မိခင်ကျန်းမာရေး၊ ကိုယ်ဝန်ဆောင်မှု၊ အမျိုးသမီး ကျန်းမာရေး။" },
      { label: "oto",     desc: "နားနှင့်လည်ချောင်း (ENT) — နား၊ နှာ နှင့် လည်ချောင်း။" },
      { label: "surgery", desc: "အထွေထွေ ခွဲစိတ်ဌာန — ခွဲစိတ်မှုများနှင့် ခွဲစိတ်ပြီးနောက် စောင့်ရှောက်မှု။" },
      { label: "general", desc: "အထွေထွေ ဆေးဌာန — အထူးကု ဆရာဝန်မလိုသော လူနာများ။" },
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
