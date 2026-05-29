export default function AmazonCortexDcrScore() {
  return (
    <>
      <p>
        If you manage a UK Amazon DSP, your Amazon Cortex DCR score is the metric that can define
        your entire week. A single bad day — a wave that ran over time, a batch of returns, a driver
        who went off-route — shows up on Monday as a percentage drop that feels impossible to trace.
        This guide explains exactly what DCR measures, what separates a Fantastic score from a Fair
        one, the most common reasons it falls, and the specific steps you can take to push it back up
        before the next weekly scorecard lands.
      </p>

      <h2>What DCR actually measures — and why Amazon weights it so heavily</h2>
      <p>
        DCR stands for Delivery Completion Rate. It measures the share of your assigned stops that
        were actually delivered successfully during the wave. If your driver was allocated 120 stops
        and completed 117, their DCR for that route is 97.5%.
      </p>
      <p>
        Amazon weights DCR heavily because it is the most direct proxy for customer promise
        fulfilment. Every stop that does not complete either generates a redelivery attempt (which
        costs Amazon money), a customer complaint (which increases your DNR exposure), or a returned
        parcel (which the customer must then chase). Across a fleet of ten drivers doing six days a
        week, even a 1% DCR miss compounds quickly.
      </p>
      <p>
        DCR is calculated weekly across your entire DA fleet. It does not average out neatly — a
        single driver completing three short waves with several missed stops can pull down a fleet
        that is otherwise performing well. That is why understanding DCR at the individual driver and
        route level matters far more than watching the fleet headline figure alone.
      </p>

      <h2>What a good Amazon Cortex DCR score looks like</h2>
      <p>
        Amazon's Cortex scoring bands work roughly as follows (exact thresholds vary by programme and
        region, but UK brackets align broadly with these figures):
      </p>
      <ul>
        <li>
          <strong>Fantastic Plus:</strong> DCR at or above 98.0%
        </li>
        <li>
          <strong>Fantastic:</strong> DCR between 96.5% and 97.9%
        </li>
        <li>
          <strong>Great:</strong> DCR between 95.0% and 96.4%
        </li>
        <li>
          <strong>Fair:</strong> DCR between 90.0% and 94.9%
        </li>
        <li>
          <strong>Poor:</strong> DCR below 90.0%
        </li>
      </ul>
      <p>
        Most DSPs aiming for Fantastic Plus need every driver consistently above 97%. That sounds
        achievable until you factor in long days, Same-Day Delivery waves, bad weather, and the
        occasional driver who ends a shift early.
      </p>
      <p>
        The target to aim for is not 96% — it is 98% and above, because that is the buffer that
        absorbs your worst-performing route on your worst day of the week and still keeps you in the
        top band. Anything below 95% starts to attract attention from your Station Operations Manager
        and can affect your zone and route allocation in subsequent weeks.
      </p>

      <h2>The five most common reasons DCR drops</h2>
      <p>
        Understanding why DCR falls is the first step to fixing it. These are the five patterns seen
        most often across UK DSPs:
      </p>
      <ul>
        <li>
          <strong>Waves that run over time.</strong> When a driver has 130 stops and a 10-hour
          shift, the maths do not work. Stops that cannot be completed before the wave closes
          automatically count against DCR. Over-loading happens when route planning does not account
          for realistic completion rates, traffic density, or stop complexity.
        </li>
        <li>
          <strong>Returns to station with packages.</strong> If a driver ends the day with
          undelivered parcels rather than attempting every stop, those count directly against DCR.
          This is often a discipline issue, but it can also be a training one — drivers who do not
          understand the consequence of leaving stops undelivered will repeat the behaviour.
        </li>
        <li>
          <strong>Failed attempts at problem addresses.</strong> Some addresses generate repeated
          failures — gated properties, businesses that close early, access codes that do not work.
          Each failed attempt on an address that was never going to be deliverable drags the score
          without the driver doing anything wrong.
        </li>
        <li>
          <strong>Same-Day Delivery (SDD) wave compression.</strong> SDD waves have tighter time
          windows and less tolerance for exceptions. A driver handling both standard and SDD on the
          same day is more likely to leave stops incomplete because of the competing time pressure.
        </li>
        <li>
          <strong>Inexperienced drivers on dense urban routes.</strong> New drivers in city centres
          take longer to locate addresses, struggle with access, and are more likely to miss difficult
          deliveries. Assigning newer drivers to routes with a high stop density and tight timing is a
          reliable way to pull DCR down.
        </li>
      </ul>

      <h2>A per-driver playbook to fix it this week</h2>
      <p>
        DCR improvement happens at the driver level, not the fleet level. Here is the sequence that
        works:
      </p>
      <p>
        Pull the last four weeks of DCR data for every driver individually. Sort it lowest to highest.
        The bottom three or four drivers will almost always account for more than half of your DCR
        gap. That is where to focus first.
      </p>
      <p>
        For each driver below 96%, work through these steps:
      </p>
      <ul>
        <li>
          <strong>Identify the specific routes or waves where they missed.</strong> Was it the same
          route each time? If so, the route is likely over-stopped, not the driver.
        </li>
        <li>
          <strong>Check whether incomplete stops fell at the start or end of the wave.</strong>{" "}
          Late-day misses suggest a time management issue. Early misses point to address-level
          problems.
        </li>
        <li>
          <strong>Reroute or rebalance if the route itself is the problem.</strong> Some routes
          genuinely cannot be completed in the time window allocated. No amount of driver coaching
          fixes a structural mismatch.
        </li>
        <li>
          <strong>Run a one-to-one conversation — not a group briefing.</strong> Drivers respond
          differently when they see their own score rather than the fleet average. A targeted
          conversation about their specific numbers lands differently from a Monday morning
          announcement about DCR being down.
        </li>
      </ul>
      <p>
        Track progress daily through the week. By Thursday you will know whether the changes are
        working or whether a different intervention is needed before Monday's scorecard.
      </p>

      <h2>How to spot a falling DCR before the weekly scorecard lands</h2>
      <p>
        The weekly scorecard is a lagging indicator. By Monday, the damage is already done. DSPs that
        consistently hit Fantastic Plus have real-time or daily visibility into the signals that
        predict DCR — not the score itself, but the events that produce it.
      </p>
      <p>
        Indicators to watch mid-week:
      </p>
      <ul>
        <li>
          <strong>Waves closing with packages still on the van.</strong> If your OSM can see at 4 pm
          that a driver has 15 stops remaining with 45 minutes of wave time left, intervention is
          still possible — a phone call, a route swap, a time extension request to the station.
        </li>
        <li>
          <strong>Return-to-station (RTS) events.</strong> Every RTS event with packages still on
          board is a direct DCR miss. Each one should generate an alert the same day so it can be
          investigated and addressed before it happens again the next morning.
        </li>
        <li>
          <strong>Incomplete-stop patterns clustering around specific drivers.</strong> One driver
          missing five stops across three days is a different problem from three drivers missing two
          stops each. The former needs an individual intervention; the latter probably needs a route
          or timing review.
        </li>
      </ul>
      <p>
        Linking your Cortex data to a live{" "}
        <a href="/driver-performance-tracking">driver performance tracking</a> tool is what separates
        reactive Monday reviews from proactive Wednesday fixes. The DSPs that hold Fantastic Plus week
        after week are not lucky — they see the problem on Wednesday and resolve it before the wave
        closes.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>What is a good DCR score on Amazon Cortex?</h3>
      <p>
        A DCR of 98% or above puts you in the Fantastic Plus band, which is the target for DSPs who
        want maximum flexibility on route awards and zone allocation. Fantastic (96.5%–97.9%) is
        acceptable but leaves no buffer for a difficult week. Anything below 95% (Great band or
        lower) starts to attract scrutiny from your Station Operations Manager and can affect future
        route and zone assignments.
      </p>

      <h3>Why is my DCR low even when my drivers are completing their routes?</h3>
      <p>
        DCR misses do not always mean drivers are skipping stops deliberately. Common hidden causes
        include waves timed too tightly so late stops close before they can be completed, Same-Day
        Delivery schedule pressure bleeding into standard routes, and problem addresses that generate
        automatic fails regardless of how many attempts are made. Check your incomplete stops at the
        route level rather than the fleet level to find the pattern — it is nearly always
        concentrated on a small number of routes or drivers.
      </p>

      <h3>How often does DCR update in Amazon Cortex?</h3>
      <p>
        Amazon Cortex updates its DA scorecard metrics weekly. The scorecard visible on Monday
        reflects activity from the previous week (typically Monday to Sunday). There is no live DCR
        figure within Cortex itself, which is why DSPs who need intra-week visibility have to pull
        metrics via a connected tool rather than waiting for the weekly reset. By the time you see a
        low score in Cortex, you are already a week behind.
      </p>

      <h3>Does one driver's low DCR affect my whole fleet score?</h3>
      <p>
        Yes. DCR is calculated across your entire DA fleet. A single driver completing three partial
        waves in a week can pull your fleet DCR down by 0.5–1.0 percentage points depending on fleet
        size. This is why per-driver visibility matters more than the headline fleet average — the
        fleet number hides the individual contributors.
      </p>

      <h3>Can I dispute a DCR miss if the stop was undeliverable?</h3>
      <p>
        In some cases, yes. Amazon allows exception requests for certain stop types — gated
        properties, incorrect addresses supplied by the customer, and customer cancellations. The
        process varies by station, but your Station Operations Manager is the first contact. Document
        the specific stop details and the reason for non-completion at the time it happens, not after
        the scorecard has landed — retrospective disputes are harder to support without same-day
        evidence.
      </p>

      <p>
        If you want daily DCR visibility without rebuilding your tracking in spreadsheets, DSPOps
        connects to Amazon Cortex and surfaces every driver's completion rate mid-wave — not after
        Monday's scorecard. It is{" "}
        <a href="/amazon-dsp-management-software">
          Amazon DSP management software
        </a>{" "}
        built specifically for UK operators, with a 14-day free trial and no credit card required.
      </p>
    </>
  );
}
