export default function AmazonDspDriverTrainingRequirements() {
  return (
    <>
      <p>
        One of the fastest ways to put your Amazon DSP at risk is to send a driver onto the road before they
        are properly trained — and to have no record proving they were. Amazon requires operators to demonstrate
        training compliance, DVSA rules impose their own obligations on you as a vehicle operator, and an
        insurance claim that surfaces a gap in your records can cost far more than the training itself would have.
      </p>
      <p>
        This guide covers what UK Amazon DSP owners need to cover before a driver does their first shift,
        and what records to keep.
      </p>

      <h2>What Amazon requires before a driver goes live</h2>
      <p>
        Before a new driver is assigned to routes, Amazon expects operators to confirm three things are in place:
      </p>
      <ul>
        <li>
          <strong>Right-to-Work check completed and on file.</strong> This is the legal minimum to employ
          anyone in the UK. For Amazon DSPs it must be done before day one — not during the first week. Acceptable
          documents depend on the applicant's status (UK/Irish citizen, settled status, visa holder), and
          the check is on the operator, not Amazon. A driver who starts before a valid RTW check is in place
          is a compliance exposure regardless of how good their Cortex numbers turn out to be.
        </li>
        <li>
          <strong>Driving licence verified as valid and in-date.</strong> UK Amazon DSPs need to hold a copy
          of each driver's licence, and it must be a valid, current licence for the category of vehicle they
          will drive. Licence expiry is easy to miss when it happens months after onboarding — build an expiry
          tracker from day one, not when you need to renew.
        </li>
        <li>
          <strong>Mentor app training completed.</strong> Amazon requires drivers to have completed the Mentor
          safe-driving onboarding before going on-route. Operators are responsible for making sure new starters
          have done this — it is not something Amazon checks on your behalf. A driver who goes live without
          completing Mentor onboarding both creates a safety risk and can produce Safety events before you
          even know there is a problem.
        </li>
      </ul>

      <h2>DVSA obligations: walkaround check competency</h2>
      <p>
        As a vehicle operator, you are responsible under DVSA rules for ensuring every driver is competent to
        carry out a daily walkaround check. This is not just a formality: if a driver causes or is involved
        in an incident and it comes out that they were not trained to identify vehicle defects, your insurance
        and your operating status are both at risk.
      </p>
      <p>
        In practice this means:
      </p>
      <ul>
        <li>
          A walkthrough of what a correct walkaround covers — tyres, lights, mirrors, wipers, cab and load
          security, any visible damage.
        </li>
        <li>
          A supervised check on the first day, so the driver knows what to look for and what to report.
        </li>
        <li>
          A clear defect-reporting process: who they tell, how quickly, and what happens if the van cannot
          go out.
        </li>
      </ul>
      <p>
        Keep a record of this training. A signed note in the driver's file, or a brief checklist the driver
        signs, is enough — but have something. If DVSA or your insurer asks whether you trained drivers to
        inspect their vehicles, "we talked them through it" is a weaker answer than a signed record.
      </p>

      <h2>Manual handling and load security</h2>
      <p>
        These two areas come up repeatedly in Amazon operational reviews and in insurance claims, but many
        operators do not cover them formally during driver induction.
      </p>
      <p>
        <strong>Manual handling</strong> training for DSP drivers is about safe lifting technique for parcels
        of varying weights — back injuries on-route are one of the more common driver claims, and a failure
        to train is a failure to meet your duty of care as an employer. This does not need to be a lengthy
        session: a 10-minute induction covering posture, two-person lifts for heavy items, and when not to
        attempt a delivery alone covers the core. Keep a record.
      </p>
      <p>
        <strong>Load security</strong> means drivers understanding that packages must be properly stowed
        before the van moves — not shifting around in the back, not stacked against doors that might open
        on a turn. Load security failures cause DPMO events (damaged parcels) and they can cause accidents.
        Cover it at induction and revisit it when you get a cluster of damage-related DPMO.
      </p>

      <h2>Driver briefing records and how long to keep them</h2>
      <p>
        Any briefing that happens before or during the first week — walkaround training, Mentor guidance,
        manual handling — should be recorded with the date, what was covered, and the driver's signature or
        acknowledgement. For ongoing briefings, a brief log is enough: date, topic, who attended.
      </p>
      <p>
        A reasonable minimum is to keep driver training and briefing records for the duration of employment
        plus two years. Employment tribunal claims and civil insurance claims both have limitation periods,
        and records that have been deleted before a claim lands leave you with nothing to defend yourself.
        Your contracts with Amazon may specify longer retention periods — check them and apply whichever is
        longer.
      </p>

      <h2>Building a process instead of a checklist</h2>
      <p>
        A training checklist signed on day one and filed away is better than nothing. But the operations
        that hold up under Amazon audit and DVSA scrutiny are the ones where training is a process, not a
        document event: induction covers the right topics, records are stored against the driver's file,
        licence expiry is tracked forward so it does not go unnoticed mid-employment, and RTW documents are
        reviewed when visas or permits are due to change.
      </p>
      <p>
        The bottleneck for most DSPs is not knowing what to do — it is having a system that does not let
        things slip. A driver's passport expires nine months after they join. A visa is due for renewal in
        fourteen months. Without a tracker that surfaces those dates automatically, the first you hear about
        it is when something has already lapsed.
      </p>

      <h2>How DSPOps helps</h2>
      <p>
        DSPOps tracks the compliance documents every UK DSP needs on file for each driver: Right-to-Work
        evidence, driving licence expiry, passport and other ID, with automatic reminders before anything
        lapses. When a document is approaching expiry, it appears in the office dashboard and the driver
        receives a notification in their portal. The same audit log that covers document access is available
        to export if Amazon or an auditor asks for evidence. The compliance side of driver onboarding —
        making sure the right documents are in place, that nothing expires unnoticed, and that the record
        is there when you need it — is handled in one place.
      </p>
    </>
  );
}
