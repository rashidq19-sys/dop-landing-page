export default function ReduceDnrAmazonDsp() {
  return (
    <>
      <p>
        A DNR — Delivered Not Received — is a claim from a customer who says their parcel never arrived,
        even though your driver marked it delivered in the app. Every one goes against your Cortex scorecard,
        and unlike DPMO or DCR, DNR feels impossible to defend: you have a GPS pin and a photo, but the
        customer insists they never got it.
      </p>
      <p>
        The reality is that most DSPs carry a small number of drivers responsible for the majority of their
        DNR claims — and the patterns are findable if you know where to look. Here is how to investigate,
        spot the root causes, and put habits in place that reduce the rate before it moves your weekly status.
      </p>

      <h2>What a DNR actually represents</h2>
      <p>
        Amazon counts a DNR when a customer contacts support to say a package was never received and Amazon's
        investigation cannot definitively verify the delivery. That investigation looks at the photo, the GPS
        pin relative to the delivery address, and the time of day. When the evidence is weak — blurry photo,
        pin 30 metres from the door, delivery at dusk — the claim is upheld.
      </p>
      <p>
        The claim doesn't always mean theft or dishonesty. It often means a package left in the wrong place
        (communal hallway, beside a neighbour's door), a photo that doesn't show the front door or parcel
        together, or a drop that happened at the wrong address entirely. The driver may have genuinely
        believed they delivered correctly.
      </p>

      <h2>Where DNRs actually come from</h2>
      <p>
        When you pull 30 days of DNR claims and sort by driver, the same patterns appear at almost every DSP:
      </p>
      <ul>
        <li>
          <strong>Photo quality.</strong> The delivery photo shows the parcel on the ground but not the door,
          or shows the door but not the parcel. Amazon's system can't confirm the location, and neither can
          the customer. Low POD compliance and high DNR almost always track together.
        </li>
        <li>
          <strong>Safe-place drops without contact.</strong> A driver leaves a parcel behind a bin or in a
          porch without calling or messaging the customer. The customer doesn't know to look there, and the
          Contact Compliance log shows no attempt.
        </li>
        <li>
          <strong>Wrong-address deliveries.</strong> Particularly on long residential roads or estates where
          house numbers jump or repeat across blocks. The GPS pin shows the driver was close to the right
          address, but not at it.
        </li>
        <li>
          <strong>End-of-wave pressure.</strong> Drivers running late in the final hour make faster drops
          with weaker evidence. DNR rates on routes that consistently finish late are higher than the same
          driver's average on an on-time day.
        </li>
      </ul>

      <h2>How to investigate a DNR spike</h2>
      <p>
        When your DNR score moves week-on-week, the fastest path to the cause is a driver-level breakdown.
        Pull the claims from the last two to four weeks and look at three things:
      </p>
      <ul>
        <li>
          <strong>Which drivers are over-represented?</strong> If two or three names appear on more than
          half the claims, that's your starting point — not a fleet-wide process problem.
        </li>
        <li>
          <strong>What time of day did the deliveries happen?</strong> A cluster of late-afternoon or
          evening drops in autumn and winter often points to lighting — photos taken in low light that
          fail Amazon's evidence check.
        </li>
        <li>
          <strong>What does the CC log say?</strong> For each claim where the delivery was a safe-place
          or non-answer drop, did the driver attempt contact? If not, that's a Contact Compliance gap
          feeding directly into DNR.
        </li>
      </ul>
      <p>
        The conversation with the driver is easier when you have specifics — date, stop, what the photo
        shows, whether a contact was logged. "You had three DNR claims last month" is hard to act on.
        "These two drops had no customer contact and the photos don't show the door" is something a driver
        can actually change.
      </p>

      <h2>Preventive habits that reduce DNR over time</h2>
      <p>
        Process changes that have a consistent impact at DSPs managing their DNR well:
      </p>
      <ul>
        <li>
          <strong>Train the photo standard explicitly.</strong> The delivery photo should show the parcel
          and a fixed reference point — the door number, the letterbox, a distinctive feature of the
          property — in the same frame. A photo that could be any doorstep won't defend a claim.
        </li>
        <li>
          <strong>Make contact before any safe-place drop.</strong> If the customer doesn't answer and
          the driver plans to leave the parcel somewhere, the contact attempt needs to happen first — and
          it needs to be logged. Drivers who are consistent on this almost never appear in DNR reports.
        </li>
        <li>
          <strong>Watch the routes that finish late.</strong> End-of-wave drops carry higher risk. If a
          route is consistently running over by an hour, the answer is a route adjustment, not coaching
          the same driver to rush less while also taking better photos.
        </li>
        <li>
          <strong>Surface DNR claims to drivers within 48 hours.</strong> The driver who got a claim on
          Monday's run will have no memory of the specific stop by Friday's debrief. Reviewing claims
          quickly — before the details are gone — is the difference between a useful conversation and
          a shrug.
        </li>
      </ul>

      <h2>Using your morning briefing to manage DNR</h2>
      <p>
        DNR reduction doesn't require a separate programme — it fits into your existing morning briefing
        if you have the right data in front of you. Two minutes on photo quality expectations, a mention
        of any outstanding claims from the previous day, and a reminder about contact compliance for
        safe-place drops is enough. Done consistently, over three to four weeks, the rate comes down.
      </p>
      <p>
        What kills the briefing isn't lack of discipline — it's arriving without the data. If your OSM
        is pulling claim information from three different Cortex views before the van keys go out, the
        briefing starts late and skips the detail. The drivers who need the feedback most don't get it.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps pulls your Cortex DNR data down per driver and surfaces it in a single view alongside
        POD compliance and Contact Compliance — the two metrics that most predict whether a claim gets
        upheld. Your OSM can see yesterday's at-risk drops before the morning briefing, and drivers
        can see their own running totals so the feedback loop doesn't wait until Monday.
      </p>
      <p>
        If you want to see what your fleet's DNR exposure looks like inside DSPOps, you can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we'll load your station's data during the call.
      </p>
    </>
  );
}
