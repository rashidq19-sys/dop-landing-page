export default function ReduceMentorSafetyEventsAmazonDsp() {
  return (
    <>
      <p>
        Mentor safety scores sit quietly next to your Cortex numbers until the week they don't. A cluster of
        speeding events, a hard-braking spike, or two seatbelt violations in the same wave and suddenly your
        Safety score is dragging your overall status down — and the DSP down the road is winning routes you
        used to run.
      </p>
      <p>
        The good news is that safety events are the most fixable thing on your scorecard. They are behaviours,
        not skills. Once you show drivers what they did, on which street, at what speed, the numbers move
        within two weeks. Here is how UK DSP owners we work with actually do it.
      </p>

      <h2>What Mentor is actually measuring</h2>
      <p>
        Amazon's FICO Safe Driving Score inside the Mentor app blends five behaviours into a single 0–850 score
        per driver, rolled up into your DSP-level Safety metric on Cortex:
      </p>
      <ul>
        <li>
          <strong>Speeding</strong> — sustained travel above the posted limit. On UK routes this is almost
          always the biggest single drag on the score.
        </li>
        <li>
          <strong>Harsh braking</strong> — deceleration events above Amazon's threshold, usually from tailgating
          or last-second junction decisions.
        </li>
        <li>
          <strong>Harsh acceleration</strong> — quick throttle inputs, often from drivers rushing between stops
          on a tight route.
        </li>
        <li>
          <strong>Cornering</strong> — lateral G-force events, typically on roundabouts and tight residential
          turns.
        </li>
        <li>
          <strong>Distracted driving</strong> — phone handling detected while the van is moving. The single
          highest-weighted event in the score.
        </li>
      </ul>
      <p>
        Backup events, seatbelt use, and Sign & Safety violations sit alongside these as separate compliance
        items — they don't feed the FICO score directly but they do hit your overall Safety status on the DSP
        scorecard.
      </p>

      <h2>Why safety scores drift, even with experienced drivers</h2>
      <p>
        The pattern we see is almost universal. A DSP hits Fantastic on safety for a stretch, then a peak wave
        comes in, routes get longer, one or two drivers start pushing to finish on time — and by Friday the
        cohort average has dropped ten points. Nobody drove dangerously on purpose. They ran out of buffer.
      </p>
      <p>
        The other silent driver is unaddressed repeat behaviour. Most DSPs review safety weekly, in a group
        setting, using cohort averages. Individual drivers with genuinely problematic scores get lost in the
        average and never see a specific piece of feedback about a specific event.
      </p>

      <h2>Speeding — the fastest metric to fix</h2>
      <p>
        Speeding events cluster around three things: dual carriageways between drops, downhill sections on
        residential routes, and drivers running late trying to make the last hour. All three are visible in the
        event log with street name and speed attached.
      </p>
      <ul>
        <li>
          Pull the last 14 days of speeding events, sort by driver, and identify the top two. In almost every
          DSP those two names account for 40–60% of all events.
        </li>
        <li>
          Show each driver their own top three streets and the recorded speed against the limit. Specifics move
          behaviour; generic "please slow down" briefings do not.
        </li>
        <li>
          For drivers running late as the cause, the fix is upstream — an OSM call an hour before wave close to
          rebalance stops rather than letting the driver push their speed to finish.
        </li>
      </ul>

      <h2>Harsh braking and acceleration — coach the anticipation, not the pedal</h2>
      <p>
        Harsh braking is a following-distance problem 90% of the time. A driver too close to the vehicle in
        front has to react rather than anticipate. Show the driver the timestamp and the road, and the
        conversation writes itself.
      </p>
      <p>
        Harsh acceleration usually pairs with speeding — the same driver rushing between stops on a route with
        tight interval times. The two metrics almost always move together, so fixing one lifts both.
      </p>

      <h2>Distracted driving — non-negotiable, coach on day one</h2>
      <p>
        Distracted driving events are the highest-weighted item in the FICO score and the biggest liability
        exposure your DSP carries. A single sustained event can drop a driver's individual score by 30–50
        points, and repeated events on the same driver are grounds for removal from route.
      </p>
      <p>
        Two operational habits move this metric:
      </p>
      <ul>
        <li>
          A phone-mount policy that is checked at the van walkaround. The van does not leave the station
          without the driver's phone in the mount.
        </li>
        <li>
          Any distracted event triggers a same-day conversation. Not a Monday briefing item — a same-day one.
          Drivers who see the event flagged immediately treat it as serious; drivers who see it three days
          later treat it as noise.
        </li>
      </ul>

      <h2>Backup events and seatbelt violations — the two compliance items DSPs miss</h2>
      <p>
        These don't feed FICO but they do feed your DSP-level Safety metric and, more importantly, they surface
        in Amazon audits. Backup events happen when a driver reverses in a way that triggers the camera —
        usually reversing off a driveway they should have turned around on. Seatbelt violations happen in the
        first 30 seconds after the driver hops back in the van at a stop and pulls off without buckling up.
      </p>
      <p>
        Both are addressable with two lines in the morning briefing: "no reverse-off driveways today" and
        "belt on before the handbrake comes off." Repetition is what makes them stick.
      </p>

      <h2>The two-week feedback rhythm that actually moves the score</h2>
      <p>
        DSPs that hold Fantastic on Safety run the same loop:
      </p>
      <ul>
        <li>
          <strong>Daily:</strong> a two-minute glance at yesterday's Mentor events, sorted by driver. Any
          driver with a distracted event or three-plus speeding events gets a same-day conversation.
        </li>
        <li>
          <strong>Weekly:</strong> a one-on-one with the two lowest-scoring drivers, showing them their own
          events with street names and timestamps.
        </li>
        <li>
          <strong>Every fortnight:</strong> a leaderboard shared with the whole fleet showing the top five and
          bottom five FICO scores. Drivers who care about being top of the leaderboard self-correct without a
          meeting.
        </li>
      </ul>
      <p>
        The thing that kills this rhythm is data access. If your OSM has to log into Mentor separately for each
        driver, the loop dies inside a week.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps pulls every driver's Mentor and Cortex data into one dashboard, sorted by driver and by event
        type. Your OSM opens it, sees the two drivers with distracted-driving events yesterday, and books the
        five-minute conversation before the next wave. Drivers see their own FICO score and event history
        inside the driver portal, and the top-of-leaderboard drivers self-correct.
      </p>
      <p>
        If you want to see what your DSP's safety data looks like inside DSPOps, you can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we'll set up your data live during the call.
      </p>
    </>
  );
}
