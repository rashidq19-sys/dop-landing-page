export default function ImproveAmazonCortexDpmoScore() {
  return (
    <>
      <p>
        DPMO is the Cortex metric that feels the least fair. A driver misses a scan, a parcel
        arrives damaged, a customer disputes a delivery — and suddenly your Defects Per Million
        Opportunities number has moved. Counted per million stops, even five or six defects on a
        100-stop fleet can shift your weekly status from Fantastic to Great.
      </p>
      <p>
        The good news is that DPMO is almost entirely preventable. Most defects trace back to the
        same small set of habits and the same small number of drivers. Here is how to find them and
        fix them before Monday's scorecard.
      </p>

      <h2>What DPMO measures and how it is calculated</h2>
      <p>
        DPMO in the Cortex context counts physical delivery defects: damaged or missing items,
        wrong-address attempts logged as exceptions, lost packages, and — depending on your Amazon
        programme — certain scan compliance failures. The figure is normalised to a per-million-stop
        scale so that a small DSP and a large one can be compared fairly. The practical effect for a
        small fleet is that a very small number of incidents can produce a very large DPMO number.
      </p>
      <p>
        The threshold for each Cortex tier varies and can change between programme periods. What
        matters operationally is the trend: a rising DPMO mid-week is a signal to act immediately,
        not to wait for the final weekly number.
      </p>

      <h2>The defect types that move DPMO most</h2>
      <p>
        Most DPMO events fall into three categories. Understanding which category is driving your
        number tells you where to intervene.
      </p>
      <ul>
        <li>
          <strong>Package damage at delivery.</strong> A parcel arrives with visible damage and the
          customer records it. Often linked to van loading — parcels stacked badly or unprotected
          during the route. The van check before dispatch is the upstream fix, not the driver
          conversation after the fact.
        </li>
        <li>
          <strong>Address and access exceptions.</strong> A stop marked as undeliverable due to an
          address problem, gate code, or refused access can register as a defect depending on how it
          is logged. Drivers who log exceptions inconsistently, or who skip the contact attempt,
          create these at a higher rate than they realise.
        </li>
        <li>
          <strong>Missing and lost items.</strong> A package leaves the station but does not arrive.
          Could be a van loading error, a parcel left at the wrong address, or a scan that does not
          match the actual delivery. These are the hardest to investigate retrospectively, which is
          exactly why preventing them upstream matters.
        </li>
      </ul>

      <h2>Finding your highest-DPMO drivers before the scorecard lands</h2>
      <p>
        The weekly Cortex scorecard tells you what happened. It does not tell you which driver
        caused it. Waiting for the Monday number means you are always reacting to the previous week
        rather than preventing the current one.
      </p>
      <p>
        Pull your defect events mid-week — by Wednesday at the latest — and sort them by driver.
        In most DSPs, two or three drivers account for the majority of DPMO events over any given
        four-week period. Those names are where your coaching time goes. The rest of the fleet is
        either consistent or the occasional outlier you address individually.
      </p>

      <h2>The van check connection</h2>
      <p>
        Most damage defects are preventable before the van leaves the station. A pre-departure
        walkaround that checks parcel condition, load security, and package counts will catch the
        majority of defect-producing events before they become customer complaints. A driver who
        does this every morning — not just when reminded — will almost always have a lower DPMO
        than one who skips it.
      </p>
      <p>
        The return check matters equally. A van that comes back with unchecked condition, no
        end-of-shift photos, and no note of anything unusual cannot be properly cleared for the
        next morning. The condition report at end-of-shift is what closes the loop between the
        driver and the office and keeps damage events from being disputed weeks later.
      </p>

      <h2>Closing the feedback gap</h2>
      <p>
        Drivers cannot correct behaviour they do not know is causing problems. A DPMO event that
        surfaces in Monday's scorecard, for a delivery that happened the previous Tuesday, is seven
        days of missed coaching. The feedback gap is the main reason DPMO stays sticky even after
        you have identified the right drivers.
      </p>
      <p>
        The fix is a short, daily loop: look at the previous day's defect events in the morning
        briefing, name the driver and the stop, and agree a concrete change. Done consistently over
        two weeks, the numbers move. Skip it for three days running and the pattern re-establishes
        itself.
      </p>

      <h2>The morning after a red DPMO week</h2>
      <p>
        When the scorecard lands red on DPMO, the first thirty minutes matter. Work through these
        in order:
      </p>
      <ul>
        <li>
          Pull the individual defect events for the week, sorted by driver. Identify the top two
          contributors.
        </li>
        <li>
          For each event, check the stop detail: what was the parcel type, what was the logged
          reason, was a contact attempt made. Look for patterns across the same driver across
          multiple days, not just their single worst event.
        </li>
        <li>
          Schedule a one-to-one with each high-DPMO driver within 24 hours — not a group briefing.
          The conversation is about the specific events, not general standards.
        </li>
        <li>
          Confirm the van check process was followed for the affected routes. If the pre-departure
          check was skipped, that is the root cause to address first.
        </li>
        <li>
          Set a mid-week checkpoint: look at the same drivers' defect events by Wednesday to confirm
          the pattern has changed. If it hasn't, move to a formal performance conversation.
        </li>
      </ul>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps pulls Amazon scorecard data into the platform and breaks it down per driver and per
        route — including DPMO. Instead of waiting for Monday's number, your OSM can see which
        drivers are accumulating defect events mid-week and run the morning briefing with the right
        data. Drivers see their own performance in the driver portal, so the drivers with the
        highest DPMO are aware of their standing without needing a separate conversation to prompt
        it. The van inspection tool records daily walkarounds with photos from any phone, giving
        you an audit trail of every pre-departure check.
      </p>
      <p>
        If you want to see what your DPMO breakdown looks like inside DSPOps, you can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we'll set up your data live during the call.
      </p>
    </>
  );
}
