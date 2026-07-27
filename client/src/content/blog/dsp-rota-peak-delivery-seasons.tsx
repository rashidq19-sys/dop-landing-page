export default function DspRotaPeakDeliverySeasons() {
  return (
    <>
      <p>
        Peak delivery seasons — Christmas, Prime Day, Black Friday — are the weeks that define a DSP's year.
        Stop counts climb, temporary drivers join the fleet, and the station moves faster than your normal
        processes can keep up with. Most rota problems that emerge during peak aren't caused by the extra
        volume itself. They're caused by the fact that the operator was still running the same rota process
        they use in a quiet week in March.
      </p>
      <p>
        Planning your driver rota for peak requires a different approach from the standard week. Here is what
        that looks like in practice.
      </p>

      <h2>Build your headcount plan six to eight weeks out</h2>
      <p>
        Amazon will usually give you volume guidance several weeks before a peak period. The moment that
        guidance arrives, run a headcount gap analysis against your current active roster. If you expect to
        cover 20% more routes, you need 20% more available drivers — accounting for your usual absence rate,
        not just your payroll headcount.
      </p>
      <p>
        Most DSPs underestimate how many of their "active" drivers are unavailable on any given week once
        you factor in holidays, planned absences, and drivers who have quietly stepped back their availability.
        Build your peak roster from confirmed availability, not from total headcount.
      </p>
      <ul>
        <li>
          Count the drivers who are available for all five days of your peak window — these are your backbone.
        </li>
        <li>
          Count drivers who are available for three or four days — plan their routes on days they're confirmed.
        </li>
        <li>
          Identify the gap and start the recruitment or agency process before you need those drivers, not
          the week before peak starts.
        </li>
      </ul>

      <h2>Temporary and agency drivers: compliance before they touch a route</h2>
      <p>
        Bringing in temporary or agency drivers at pace is where compliance exposure spikes. Right-to-work
        documents, driving licence checks, and station induction records need to be completed before a driver
        is assigned a route — regardless of how short-staffed you are on the day.
      </p>
      <p>
        The risk is real. An unverified driver on a route is not just an Amazon audit issue; it is a potential
        liability if there is an incident. Build a checklist that every temporary driver must pass before their
        first shift, and assign someone — not yourself — to own that gate during peak.
      </p>
      <ul>
        <li>Right-to-work document verified and photographed</li>
        <li>UK driving licence checked and category confirmed (B for standard vans)</li>
        <li>Licence expiry date logged</li>
        <li>Station walkthrough completed with a senior driver or OSM</li>
        <li>Mentor app installed and login confirmed</li>
        <li>Emergency contact details collected</li>
      </ul>

      <h2>Adjust your rota structure for higher stop density</h2>
      <p>
        Peak routes carry more stops, which means longer active time and more fatigue by the end of the wave.
        A rota that works in a standard week — where drivers are finishing by 17:00 — may push drivers into
        evening or night delivery windows during peak.
      </p>
      <p>
        Look at the previous year's peak data (or your busiest recent week) and map where routes overran.
        Routes that consistently ran late were either over-stopped, assigned to drivers with lower completion
        rates, or covering areas with higher access difficulty. Peak is the wrong time to discover this for
        the first time.
      </p>
      <p>
        Consider splitting your drivers into A and B shifts during very high-volume periods, with staggered
        start times so the station isn't processing every van simultaneously. This also gives you more
        flexibility if late Cortex data changes stop allocations after initial briefing.
      </p>

      <h2>Protect your daily van inspection process</h2>
      <p>
        Van inspections are the first process to get skipped when the morning is rushed and there are twenty
        drivers ready to go. During peak, that is exactly when you need them most: more vans in service means
        more chances for a fault to go unnoticed, and a breakdown mid-wave during December is not a recoverable
        situation the same way it is in July.
      </p>
      <p>
        Assign specific inspection slots — five minutes per van, done before briefing begins — so inspections
        run in parallel with loading rather than after it. If you have more vans than your OSM can check solo,
        train two senior drivers to complete the walkaround and submit the photo record, with the OSM
        spot-checking three or four per day.
      </p>

      <h2>Communicate rota changes faster than normal</h2>
      <p>
        During peak, the rota changes more frequently than usual: absences, late arrivals, last-minute volume
        spikes, and drivers finishing early or late all create adjustments that need to reach the right people
        quickly. If your current process for communicating rota changes is a group WhatsApp, it works —
        until the group has forty people and messages get buried before they're read.
      </p>
      <p>
        Separate operational rota messages from general driver communication. Drivers should receive their own
        schedule directly — when they're working, which route, what start time — rather than having to read
        through a group thread to find their own shift. This also reduces the number of "what time am I in
        tomorrow?" calls your OSM fields on the evening before a peak day.
      </p>

      <h2>Run a post-peak review before the next one</h2>
      <p>
        Every peak season surfaces gaps in your process that a normal week does not. Temporary drivers who
        nearly made it through compliance checks without one document. A route that overran three times in a
        row because the stop count was too high for the area. An OSM who was fielding rota queries when they
        should have been running briefings.
      </p>
      <p>
        Write these down — even just a brief list in a shared doc — within two weeks of peak ending, while
        they're fresh. DSPs who do this consistently find that each peak season gets operationally smoother,
        because they are not rediscovering the same problems they had the year before.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps gives you a live view of your driver roster — availability, compliance status, licence expiry
        dates, and shift assignments — so your OSM can build and adjust the peak rota from a single screen
        rather than across multiple spreadsheets and WhatsApp threads. Temporary drivers are added to the
        system with a compliance checklist attached, so nothing gets skipped under pressure.
      </p>
      <p>
        If you are heading into a peak period and want to see how DSPOps handles rota management and driver
        compliance tracking, you can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we'll walk through your current setup and show you what changes.
      </p>
    </>
  );
}
