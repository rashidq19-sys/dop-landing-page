export default function DspVehicleInsuranceAmazonDsp() {
  return (
    <>
      <p>
        Insurance is one of those DSP admin tasks that feels settled until it isn't. Most operators
        sort it once at launch, renew on autopilot, and only look closely when something goes wrong
        — a van collision, a driver incident, or an annual audit where Amazon asks for proof of
        cover. The gap between "we have insurance" and "we have the right insurance" is where the
        problems live.
      </p>
      <p>
        Here is what UK DSPs actually need and how to keep it in order.
      </p>

      <h2>Why standard van insurance is not enough</h2>
      <p>
        A standard van insurance policy covers private use or business use for a single owner-driver.
        Once you are employing drivers to carry out deliveries for reward — which describes every
        Amazon DSP — the cover you need is hire-and-reward fleet insurance.
      </p>
      <p>
        The distinction matters because standard commercial van policies routinely exclude delivery
        work. If one of your drivers is involved in an accident while on a route and your policy does
        not carry hire-and-reward cover, the insurer can decline the claim. When you are getting
        insurance quotes, use the term "hire-and-reward fleet insurance" explicitly and make sure the
        policy schedule confirms it covers your drivers carrying out third-party delivery work.
      </p>

      <h2>The four covers a UK DSP needs</h2>
      <p>
        There are four policies a UK DSP should have in place:
      </p>
      <ul>
        <li>
          <strong>Motor fleet insurance (hire-and-reward).</strong> Covers your vans for third-party
          liability — required by law for any vehicle used on UK roads — and typically fire, theft
          and accidental damage. Whether you go third-party only, third-party fire and theft, or
          comprehensive is a cost and risk trade-off you make with your broker.
        </li>
        <li>
          <strong>Goods-in-transit insurance.</strong> Covers parcels in transit against loss or
          damage. Standard motor insurance covers the vehicle, not the cargo. Amazon has its own
          carrier liability structure, but goods-in-transit insurance sits alongside it as your own
          protection.
        </li>
        <li>
          <strong>Employer's liability insurance.</strong> Required by law under the Employers'
          Liability (Compulsory Insurance) Act 1969 for any UK business with employees. The legal
          minimum is £5 million indemnity, though £10 million is standard. A DSP employing delivery
          drivers must have this — it applies to employed staff, not sole contractors.
        </li>
        <li>
          <strong>Public liability insurance.</strong> Covers claims from members of the public for
          property damage or injury caused by your drivers or operations. Not legally required, but
          standard in any DSP contract and essential in practice.
        </li>
      </ul>

      <h2>Named-driver versus any-driver policies</h2>
      <p>
        Once your fleet has more than five or six drivers, the named-driver versus any-driver
        question becomes a real operational decision.
      </p>
      <p>
        Named-driver policies list every driver individually and are usually cheaper per head — but
        every new starter has to be added before they drive. In a high-turnover environment, gaps are
        inevitable unless your onboarding process is reliable.
      </p>
      <p>
        Any-driver policies (covering any driver meeting defined age and experience criteria) are
        operationally simpler: a new driver can start on day one without an additional admin step.
        The trade-off is higher premiums. Most UK DSPs with fifteen or more drivers find any-driver
        policies worth the cost. Below that threshold, named-driver is usually manageable if the
        onboarding checklist is tight.
      </p>

      <h2>Accident reporting: what goes where</h2>
      <p>
        When a van is involved in a collision, you have two parallel obligations: report to your
        insurer (check your policy schedule for the notification window — usually 24 to 48 hours)
        and notify Amazon through your station contact.
      </p>
      <p>
        The most useful thing you can do in the first hour is collect a clear internal incident
        record: what happened, which driver, which vehicle, exact time and location, photos, and
        witness details. This protects both your insurance claim and any conversation with Amazon.
      </p>
      <p>
        Dashcam footage is increasingly expected by UK fleet insurers — some policies discount
        premiums for fitted dashcams, others make them a condition of comprehensive cover. If your
        fleet does not have dashcams, it is worth asking your broker about the requirements before
        the next renewal.
      </p>

      <h2>Managing the renewal cycle</h2>
      <p>
        The most common insurance problem DSPs face is not the wrong policy — it is a policy, MOT,
        or driver document that lapses quietly because no one was tracking it. Individual van
        insurance and MOT dates do not all fall at the same time. One van renews in March, another
        in August. Without something surfacing these in advance, one lapses without anyone noticing.
      </p>
      <p>
        A reliable annual review cycle helps: confirm motor fleet renewal, check MOT dates for every
        van, confirm service intervals are met, and update any named drivers on the policy before
        they drive. If you run named-driver cover, the driver update step should sit inside your
        onboarding checklist, not be remembered separately.
      </p>
      <p>
        The same principle applies to driver documents — right-to-work, driving licence expiry, and
        any other paperwork Amazon requires. Insurance and compliance are managed most easily when
        they sit in the same place, with the same reminder logic, rather than across separate
        spreadsheets and calendar alerts.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps tracks vehicle MOT and insurance expiry dates with automatic reminders before anything
        lapses — alongside driver right-to-work, licence and passport documents — so nothing falls
        through the gap between renewal windows. When Amazon asks for confirmation of cover, the
        record is there with dates and an audit trail. It does not replace your insurance broker, but
        it replaces the spreadsheet where things go wrong quietly.
      </p>
    </>
  );
}
