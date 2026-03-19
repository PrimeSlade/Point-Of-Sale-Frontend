import { Section, Sub, Steps, Term } from "../HelpPrimitives";

const TreatmentsSection = () => (
  <Section id="treatments" title="Treatments">
    <p>
      A treatment record links a patient to a doctor for a specific visit. It
      captures the clinical notes for that encounter and acts as the basis for
      the invoice.
    </p>

    <Sub title="How to record a treatment">
      <Steps
        items={[
          'Go to Treatment and click "Add New Treatment".',
          "Select the patient and the doctor who attended them.",
          "Fill in the diagnosis, treatment description, and any investigation findings.",
          "Save the record. The treatment is now available to attach to an invoice.",
        ]}
      />
    </Sub>

    <Sub title="Fields">
      <div className="space-y-2">
        <Term label="Investigation">Test results or examination findings (optional).</Term>
        <Term label="Diagnosis">The clinical condition or disease identified.</Term>
        <Term label="Treatment">The treatment plan or procedure carried out.</Term>
      </div>
    </Sub>
  </Section>
);

export default TreatmentsSection;
