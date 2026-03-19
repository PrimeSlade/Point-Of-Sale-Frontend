import { Section, Sub, Steps, Term } from "../HelpPrimitives";

const PatientsSection = () => (
  <Section id="patients" title="Patients">
    <p>
      Every person receiving care must be registered as a patient before a
      treatment can be created for them.
    </p>

    <Sub title="How to register a patient">
      <Steps
        items={[
          'Go to Patients and click "Add New Patient".',
          "Enter their name, phone number, date of birth, and gender.",
          "Select their department, status, type, and condition.",
          "Assign the location (branch) they are visiting.",
          'Click "Add" to save.',
        ]}
      />
    </Sub>

    <Sub title="Patient Status">
      <div className="space-y-2">
        <Term label="new_patient">First-time visit. No prior history in the system.</Term>
        <Term label="follow_up">Returning for a follow-up related to a previous treatment.</Term>
        <Term label="post_op">
          Attending post-operative recovery or monitoring visits after surgery.
        </Term>
      </div>
    </Sub>

    <Sub title="Patient Type">
      <div className="space-y-2">
        <Term label="in">In-patient — admitted and staying in the hospital overnight or longer.</Term>
        <Term label="out">Out-patient — visits for the day and leaves without being admitted.</Term>
      </div>
    </Sub>

    <Sub title="Patient Condition">
      <div className="space-y-2">
        <Term label="disable">
          Patient has a registered disability. May affect pricing or care protocols.
        </Term>
        <Term label="pregnant_woman">
          Patient is currently pregnant. Some procedures or medications may be restricted.
        </Term>
      </div>
    </Sub>

    <Sub title="Departments">
      <div className="space-y-2">
        <Term label="og">Obstetrics & Gynaecology — maternal care, pregnancy, women's health.</Term>
        <Term label="oto">Otolaryngology (ENT) — ear, nose, and throat.</Term>
        <Term label="surgery">General Surgery — surgical procedures and post-op care.</Term>
        <Term label="general">General Medicine — patients not under a specialist.</Term>
      </div>
    </Sub>
  </Section>
);

export default PatientsSection;
