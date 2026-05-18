export default function ImproveCortexScorecard() {
  return (
    <>
      <p>
        Every Amazon DSP owner has the same Monday morning ritual: open Cortex, look at the weekly scorecard,
        and try to work out which driver, which route, or which day dragged the numbers. If your status moved
        from Fantastic Plus to Fantastic — or worse, from Fantastic to Great — you've got a week to figure out
        what broke and prove you can fix it.
      </p>
      <p>
        The good news: scorecards almost always slip for predictable, fixable reasons. Below is the per-metric
        playbook we see working with UK Amazon DSPs.
      </p>

      <h2>What the Amazon Cortex scorecard actually measures</h2>
      <p>
        The Cortex DA scorecard rolls six core metrics into a weekly status banner (Fantastic Plus, Fantastic,
        Great, Fair, Poor). Each metric is a leading indicator of how well your fleet executed against Amazon's
        promise to the customer. Understanding them in plain English is the first step:
      </p>
      <ul>
        <li>
          <strong>DCR (Delivery Completion Rate)</strong> — the share of assigned stops that were actually
          completed. Misses come from undelivered packages, returns to station, and incomplete waves.
        </li>
        <li>
          <strong>DPMO (Defects Per Million Opportunities)</strong> — physical defects: damages, missing
          items, wrong addresses, lost packages. Counted per million stops, so even small absolute numbers
          move the metric.
        </li>
        <li>
          <strong>DNR (Delivered Not Received)</strong> — customer-reported claims that a package was marked
          delivered but never arrived. Often tied to specific drivers or specific addresses.
        </li>
        <li>
          <strong>POD (Photo on Delivery)</strong> — compliance with the photo-on-delivery requirement for
          drop-offs. Low POD scores almost always cluster around a small number of drivers.
        </li>
        <li>
          <strong>CC (Contact Compliance)</strong> — drivers using the Mentor app to contact customers when
          deliveries can't complete. Skipped contacts compound into DNR and DCR misses downstream.
        </li>
        <li>
          <strong>CDF (Customer Delivery Feedback)</strong> — direct customer feedback rolled up into a score.
          Soft signal but it correlates tightly with CC and POD.
        </li>
      </ul>

      <h2>Why scorecards drift, even when nothing has obviously gone wrong</h2>
      <p>
        Most DSPs we talk to don't have a "bad fleet" problem. They have a visibility problem. You see the
        weekly scorecard on Monday — but the events that produced it happened across hundreds of stops, on
        ten different routes, over seven days. By the time you're trying to fix it, the people involved have
        forgotten the specifics.
      </p>
      <p>
        The structural fix is to look at metrics live, per driver, mid-week — not as a summary after the fact.
        The tactical fixes below assume you can.
      </p>

      <h2>DCR — lift it with route-handoff discipline</h2>
      <p>
        DCR drops happen on the routes that finish late, run out of time, or get returned partially complete.
        Two interventions:
      </p>
      <ul>
        <li>
          Track planned vs actual finish times per route. Routes that consistently finish in the red are
          either over-stopped or assigned to drivers who need a route swap.
        </li>
        <li>
          Cut "return to station with packages" events. When a driver is on track to RTS with parcels, get
          them on the phone before the end of the wave — almost always you can either reroute the remaining
          stops or get them a one-hour extension.
        </li>
      </ul>

      <h2>DPMO — fix the upstream van check, not the downstream defect</h2>
      <p>
        Most DPMO defects you can prevent — damaged parcels, wrong-address attempts, missing items — trace
        back to two events: a sloppy van load and an unchecked van. Both are upstream of dispatch.
      </p>
      <p>
        A daily van inspection with photos (yes, every day) catches the small issues that turn into customer
        complaints by Friday. And a pre-departure check on package counts catches the missing-item DPMO hits
        before the van leaves the station. The drivers who skip these checks are usually the drivers driving
        your DPMO.
      </p>

      <h2>DNR — investigate every claim, even when it feels unfair</h2>
      <p>
        DNRs feel like the metric you can't control, but the patterns are obvious once you look. Claims tend
        to cluster around three things: specific drivers, specific addresses, and specific times of day
        (usually evening drops in low-light conditions). Pull the last 30 days of DNR claims, sort by driver,
        and the top two names will almost always be over-represented. That's where the conversation starts.
      </p>

      <h2>POD — make it visible to drivers daily, not weekly</h2>
      <p>
        POD compliance is the easiest metric to fix because it's a behaviour, not a skill. The drivers with
        low POD scores almost always know exactly which photos they skipped — they just don't see the
        consequence until your Monday meeting. Surface every driver's personal POD score back to them
        daily, on their phone, and the metric moves within two weeks.
      </p>

      <h2>CC — train it as a habit, not a one-off briefing</h2>
      <p>
        Contact Compliance is about drivers actually using the Mentor app's contact buttons when they can't
        complete a delivery. The fix is repetition: review CC misses in the morning huddle, the same way you
        review safety. After three weeks of consistent feedback, drivers internalise it.
      </p>

      <h2>CDF — the lagging indicator that confirms the rest is working</h2>
      <p>
        Customer Delivery Feedback rises automatically when POD and CC rise. There's no separate lever for it.
        If the other five metrics are improving and CDF isn't, look at handover quality — are drivers leaving
        packages in places customers don't expect, or rushing the doorstep interaction.
      </p>

      <h2>The Monday-to-Friday review rhythm</h2>
      <p>
        Owners who consistently hit Fantastic Plus run the same loop:
      </p>
      <ul>
        <li>
          <strong>Monday:</strong> review the previous week's scorecard with the OSM and identify the one or
          two metrics most at risk.
        </li>
        <li>
          <strong>Tuesday–Thursday:</strong> short morning huddles focused on yesterday's actual driver-level
          numbers, not the fleet average.
        </li>
        <li>
          <strong>Friday:</strong> a quick scan of the week's trajectory — escalations for any driver
          consistently below standard, recognition for the top performers.
        </li>
      </ul>
      <p>
        The thing that breaks this loop, every time, is data. If your OSM is rebuilding metric tables in Excel
        every morning instead of running the huddle, the loop dies by Wednesday.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps connects to Amazon Cortex and pulls every scorecard metric in live, per driver and per route.
        Your OSM opens the dashboard, sees the three drivers most likely to drag this week's score, and runs
        the huddle in two minutes. Drivers see their own metrics inside the driver portal — the ones who care
        about being top of the leaderboard self-correct without a meeting.
      </p>
      <p>
        If you want to see what your DSP's scorecard looks like inside DSPOps, you can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we'll set up your data live during the call.
      </p>
    </>
  );
}
