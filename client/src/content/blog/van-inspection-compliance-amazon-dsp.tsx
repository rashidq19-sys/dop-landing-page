export default function VanInspectionComplianceAmazonDsp() {
  return (
    <>
      <p>
        Van inspections are one of those tasks that feel administrative until the day they aren't. A tyre blowout
        on the A-road, a brake fault flagged by Amazon's audit team, or a driver involved in a minor collision in
        a vehicle with a pre-existing dent that nobody documented — suddenly your compliance record becomes the
        most important thing in the building. For UK Amazon DSP owners, daily vehicle checks are not optional.
        They are a contractual obligation, a legal requirement under road traffic law, and one of the cleaner ways
        to protect both your drivers and your DA agreement.
      </p>
      <p>
        The problem is that most DSPs know this in principle but have gaps in practice. Paper logs get lost.
        Drivers tick boxes without looking. Faults get reported verbally and never actioned. By the time an
        Amazon ops audit lands or a vehicle goes off the road, the record is incomplete and the liability is yours.
        Here is what Amazon actually checks, where DSPs typically fall short, and how to build a process that
        holds up.
      </p>

      <h2>What Amazon checks during a vehicle compliance audit</h2>
      <p>
        Amazon's operations team and Delivery Service Partner support managers periodically review vehicle
        compliance as part of broader DA performance checks. The specific items vary, but auditors consistently
        look at:
      </p>
      <ul>
        <li>
          <strong>Daily walkaround inspection records</strong> — evidence that a pre-departure check was completed
          by the driver for each vehicle, each day. Missing dates are an immediate flag.
        </li>
        <li>
          <strong>Fault reporting and resolution logs</strong> — if a driver reported a fault, what was done
          about it and when? Unresolved faults left on vehicles are serious.
        </li>
        <li>
          <strong>Tyre condition and tread depth records</strong> — both the inspection log and the physical
          tyres must match. Auditors will check the vehicle as well as the paperwork.
        </li>
        <li>
          <strong>Brake and lighting checks</strong> — walkaround logs that consistently show lights and brakes
          as "pass" with no variation across months raise questions about whether checks are genuine.
        </li>
        <li>
          <strong>Vehicle damage records</strong> — pre-existing dents, scrapes, and mirror damage must be
          documented. If damage appears in a collision report that was never on the inspection record,
          it implies drivers were not conducting proper checks.
        </li>
      </ul>

      <h2>Where DSPs typically fall short</h2>
      <p>
        The most common gap is not that DSPs skip inspections entirely — it is that inspections happen without
        documentation, or documentation exists but is incomplete, inconsistent, or inaccessible.
      </p>
      <ul>
        <li>
          <strong>Paper logs left in the van.</strong> A logbook that lives in the glovebox works fine until
          you need to pull a specific date's inspection to respond to an audit request. Finding a specific
          sheet from six weeks ago, across a fleet of twelve vans, takes time you don't have.
        </li>
        <li>
          <strong>No photos.</strong> Written tick-box records alone do not prove condition. A photo taken
          at the start of each shift, time-stamped and linked to the driver and vehicle, is the closest
          thing to an audit-proof record.
        </li>
        <li>
          <strong>Fault reporting that relies on memory.</strong> Drivers report faults at the end of a nine-hour
          shift, often verbally to an OSM who is handling five other things. By the next morning, the fault
          is forgotten or the wrong van gets flagged.
        </li>
        <li>
          <strong>No clear pass/fail criteria.</strong> "Checked tyres" means different things to different
          drivers. Without a defined checklist — minimum tread depth, what counts as reportable damage — results
          vary wildly across your fleet.
        </li>
      </ul>

      <h2>Building a daily pre-departure routine that actually sticks</h2>
      <p>
        The operational pattern that works is simple: make the walkaround a gate to dispatch, not an afterthought.
        A driver who cannot show a completed inspection does not leave the yard. When it is enforced consistently
        in the first week, drivers do not test it in week two.
      </p>
      <p>
        The checklist itself should take no more than three to four minutes and cover: tyres (condition and
        pressure), lights (all round), brakes (foot and handbrake), mirrors, wipers, bodywork damage, and
        cargo door operation. For electric vehicles, add charge level. The key is that the result is recorded
        digitally, with a photo, before the engine starts. Paper can be signed in ten seconds in the van at
        the end of the day; a timestamped mobile entry cannot.
      </p>

      <h2>What to do when a driver reports a fault</h2>
      <p>
        Every fault report needs three things: an immediate decision (is the vehicle safe to dispatch?), a
        maintenance action with a named owner and a date, and a closed loop confirming the fault was resolved.
        If your process only has the first step, faults are reported but not fixed. If you have all three
        logged in one place, an auditor asking "what happened with the nearside mirror on van 7 on the 3rd?"
        gets an answer in thirty seconds.
      </p>
      <p>
        Keep vehicles with outstanding safety-critical faults off the road. The pressure to put every van
        out during peak weeks is real, but dispatching a vehicle with a known braking issue is not a
        compliance risk — it is a criminal liability if something goes wrong.
      </p>

      <h2>Keeping records that hold up under scrutiny</h2>
      <p>
        DVSA guidance and Amazon's own compliance expectations both point in the same direction: digital,
        timestamped, driver-linked records are far stronger than paper ones. At minimum you want:
      </p>
      <ul>
        <li>A record for every vehicle, every operational day</li>
        <li>Photographic evidence attached to the record</li>
        <li>Any reported faults linked through to resolution</li>
        <li>Records retained for at least twelve months</li>
      </ul>
      <p>
        If you are using a shared spreadsheet or paper logbook today, the question is not whether it will
        fail an audit — it is when. Digital records are retrievable, searchable, and do not depend on a
        driver remembering to fill in the sheet before handing the keys back.
      </p>

      <h2>How DSPOps can help</h2>
      <p>
        DSPOps includes a built-in van inspection app that lets drivers complete daily walkaround checks
        on their phone, with photos, before each shift. Faults are flagged immediately to the OSM,
        tracked through to resolution, and stored in a searchable log against the vehicle and driver.
        When an audit request comes in, you pull the date range and export — no digging through glovebox
        folders.
      </p>
      <p>
        If your current inspection process relies on paper or verbal reporting, it's worth seeing what a
        digital record looks like for your fleet.{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          Book a 20-minute demo
        </a>{" "}
        and we'll walk through the inspection workflow live.
      </p>
    </>
  );
}
