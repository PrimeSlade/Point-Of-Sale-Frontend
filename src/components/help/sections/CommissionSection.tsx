import { Section, Sub } from "../HelpPrimitives";

const CommissionSection = () => (
  <Section id="commission" title="Doctor Commission">
    <p>
      Each doctor has a{" "}
      <strong className="text-[var(--text-primary)]">Commission</strong> value
      on their profile. This is a reference figure used to calculate how much
      the doctor earns from treatments they perform.
    </p>
    <p>
      Commission is not automatically deducted from the patient's invoice — it
      is a separate internal accounting figure. Your hospital's finance team
      uses it to calculate doctor payouts from the reports.
    </p>

    <Sub title="What the commission value means">
      <p>
        The commission number stored on a doctor's profile represents a
        percentage or fixed rate as defined by your hospital's billing policy.
        Ask your administrator to confirm whether it is a percentage of invoice
        total or a fixed amount per treatment.
      </p>
    </Sub>
  </Section>
);

export default CommissionSection;
