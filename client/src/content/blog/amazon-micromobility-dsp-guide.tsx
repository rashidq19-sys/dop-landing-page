export default function AmazonMicromobilityDspGuide() {
  return (
    <>
      <p>
        For most of the last decade, running an Amazon DSP meant running vans. One vehicle type, one
        licence check, one insurance policy, one pay structure. That assumption is quietly breaking.
        Amazon is pushing hard into micromobility — electric cargo bikes, on-foot rounds and
        pushcart deliveries operating out of small urban hubs — and the DSPs delivering that work
        are the same DSPs already running van routes.
      </p>
      <p>
        If micromobility has arrived at your station, or you have been told it is coming, the
        operational question is not whether you can recruit riders. It is whether your back office
        can handle two completely different kinds of round without collapsing into a second set of
        spreadsheets. Here is what the programme actually looks like, and what changes on your side.
      </p>

      <h2>What micromobility actually means at Amazon</h2>
      <p>
        "Micromobility" is Amazon's umbrella term for delivery that does not involve a van. In the
        UK it covers three formats:
      </p>
      <ul>
        <li>
          <strong>Electric cargo bikes</strong> — four-wheeled e-assist cargo cycles carrying a
          sealed load box, running short high-density rounds out of a city-centre hub. They use cycle
          lanes and bus lanes, and they are exempt from congestion and clean-air charging.
        </li>
        <li>
          <strong>On-foot rounds (walkers)</strong> — delivery associates working a tight postcode
          radius on foot with a wheeled cart, restocked through the day from a van parked nearby or
          from the hub itself.
        </li>
        <li>
          <strong>Micromobility hubs</strong> — small inner-city depots that replace the traditional
          out-of-town delivery station for that catchment. Vehicles are charged and loaded there, and
          rounds are shorter and repeated more often across a day.
        </li>
      </ul>
      <p>
        Amazon has framed the rollout as part of a five-year £300 million investment in
        electrifying and decarbonising its UK transport network. By 2025 the company reported around
        a dozen UK micromobility hubs across cities including London, Manchester, Glasgow, Belfast
        and Norwich, sitting within a wider network of more than 40 hub cities across the UK and
        Europe, with further hubs announced for 2026. Amazon has said e-cargo bikes and on-foot
        delivery are expected to account for millions of UK deliveries a year, with a heavy
        concentration inside London's Ultra Low Emission Zone.
      </p>
      <p>
        The part that matters for you: Amazon does not run these rounds itself. Delivery Service
        Partners do. The same DSP structure, the same weekly scorecard relationship, the same
        contract model — with a workforce that does not hold a van key.
      </p>

      <h2>Why a bike round is not a small van round</h2>
      <p>
        The instinct when micromobility lands is to treat riders as drivers with a different
        vehicle. That is the mistake that generates the admin mess three months later. The two
        operations differ on nearly every axis your back office touches.
      </p>
      <ul>
        <li>
          <strong>Shift shape.</strong> A van round is one long deployment. A cargo bike round is
          typically shorter and repeated — a rider may run two or three loops back through the hub in
          a shift. Your rota needs to express a shift made of multiple rounds, not one wave.
        </li>
        <li>
          <strong>Headcount density.</strong> A hub replaces van capacity with more people on smaller
          vehicles. The same parcel volume needs more bodies, more rota lines and more availability
          management, in a smaller geography.
        </li>
        <li>
          <strong>Pay basis.</strong> Van drivers are commonly paid per day or per route. Riders and
          walkers are far more often hourly or per-round, sometimes with a different rate for
          on-foot versus cycle work, and frequently on shorter or more flexible shifts. One pay rule
          cannot cover both.
        </li>
        <li>
          <strong>Compliance set.</strong> No driving licence check, no MOT, no motor insurance, no
          DVLA record — but you pick up cycle maintenance and safety checks, PPE and helmet
          compliance, and public liability considerations for on-foot work. Right-to-work checks
          apply identically to every worker regardless of mode.
        </li>
        <li>
          <strong>The deployment unit changes.</strong> A van round is driver + van + cage. A cycle
          round is rider + bike + load box. A walking round is associate + cart. Anything that
          assumes a vehicle registration in the middle of that record starts to break.
        </li>
      </ul>

      <h2>Where it goes wrong: the second-system problem</h2>
      <p>
        Almost every DSP that takes on micromobility work does the same thing in month one. The van
        operation stays in whatever system it already uses, and the bike and walker teams go into a
        new spreadsheet, because nothing in the existing setup has a field for a rider.
      </p>
      <p>
        That works until it does not, and it usually fails in one of four places:
      </p>
      <ul>
        <li>
          <strong>Payroll.</strong> Two pay runs, two sets of rules, two chances to get someone's
          hours wrong. Mixed workers — a rider covering a van shift, or a driver picking up a
          walking round in peak — end up manually reconciled, which is exactly where errors live.
        </li>
        <li>
          <strong>Compliance visibility.</strong> Right-to-work expiry sits in the van system for
          drivers and in a spreadsheet for riders. Nobody has one screen showing every worker whose
          documents lapse this month, so one eventually slips through.
        </li>
        <li>
          <strong>Availability.</strong> Riders and drivers submit availability into different
          places, so no one can see total staffed capacity for next Tuesday across both operations.
        </li>
        <li>
          <strong>Performance.</strong> Amazon scores the DSP. If half your operation reports into a
          separate system, you cannot see your own numbers in one place — but Amazon still sees one
          you.
        </li>
      </ul>
      <p>
        The cost is not really the spreadsheet. It is that your OSM now spends the first hour of
        every morning stitching two pictures together before they can make a single decision.
      </p>

      <h2>What you actually need to run a mixed fleet</h2>
      <p>
        The goal is one operation with three modes in it, not two operations sharing a building.
        Practically, that means five things:
      </p>
      <ul>
        <li>
          <strong>A worker record that is not vehicle-shaped.</strong> Mode — van, cycle, on-foot —
          should be an attribute of the round, not a hard-coded assumption baked into the record.
          Workers who do both should be one person, not two entries.
        </li>
        <li>
          <strong>Rota that understands multiple rounds per shift</strong> and can staff a hub and a
          station on the same screen, with one view of who is available.
        </li>
        <li>
          <strong>Deployment that assigns the right kit.</strong> A bike and a load box, or a cart,
          allocated the same way a van and a cage are — so the morning board is complete rather than
          partly on paper.
        </li>
        <li>
          <strong>Pay rules per mode.</strong> Hourly for walkers, per-round for riders, per-route
          for drivers — calculated from the same timesheet source, into one pay run.
        </li>
        <li>
          <strong>One compliance list.</strong> Every worker, every document, every expiry date, one
          screen, regardless of what they deliver on.
        </li>
      </ul>

      <h2>Getting ahead of it before the work lands</h2>
      <p>
        If micromobility has not reached your station yet, it is worth doing three things now while
        there is no time pressure:
      </p>
      <ul>
        <li>
          Check whether your current setup can express a worker without a driving licence at all. If
          a licence is a required field, you will be pasting placeholder data into it within a week
          of your first rider starting.
        </li>
        <li>
          Decide your pay structure for riders and walkers before you recruit, not after. Retro-fixing
          a rate you have already advertised is the fastest route to a grievance.
        </li>
        <li>
          Write the compliance list for non-driving staff now — right to work, PPE, cycle safety
          check, training sign-off — so onboarding day one is a checklist rather than an improvisation.
        </li>
      </ul>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps runs micromobility teams alongside your van routes, in the same system. Riders and
        walkers sit on the same deployment board, the same rota, the same morning check-in and the
        same driver app as your van drivers — so you are not running a second operation in parallel.
        It can be switched on per company when the work actually starts.
      </p>
      <p>
        The distinction that matters is that each mode is handled on its own terms inside that one
        system. Cycle and on-foot rounds are their own round types, not vans with the wrong label.
        Rotas can staff a hub and a station together while still reflecting that a rider's shift is
        built from several rounds. Pay rules are set per mode, so hourly walkers, per-round riders
        and per-route drivers all calculate correctly from one timesheet into one pay run. Deployment
        assigns the right kit to the right person. And right-to-work and document expiry sit on a
        single compliance list covering every worker, whether they hold a van key or a bike lock.
      </p>
      <p>
        Amazon's performance data comes into DSPOps for the whole operation, so your scorecard
        picture is one picture — which is how Amazon sees you anyway.
      </p>
      <p>
        If micromobility is landing at your station and you would rather not stand up a second
        system for it, you can{" "}
        <a href="/#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we will set your own operation up live during the call.
      </p>
    </>
  );
}
