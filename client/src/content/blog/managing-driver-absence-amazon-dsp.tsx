export default function ManagingDriverAbsenceAmazonDsp() {
  return (
    <>
      <p>
        A driver calling in sick at 5am is one of the most disruptive events an Amazon DSP can face. Routes need
        covering, your OSM needs to know, and if you can't find cover fast, DCR takes a hit before the wave has even
        started. Most DSPs patch this problem informally — a WhatsApp group for standby drivers, a mental shortlist of
        people who'll take extra shifts — but once your fleet reaches ten vans or more, that approach stops scaling.
      </p>

      <h2>Why absences hit DSPs harder than most businesses</h2>
      <p>
        Amazon's daily delivery model runs on tight timing and full route deployment. A driver who doesn't show means
        either a route runs short-staffed, packages are redistributed across other drivers at the last minute, or stops
        don't complete. Unlike a retail or warehouse environment where you can absorb one missing person across a large
        team, DSP routes are individual: every van represents its own workload, and a missing driver creates a visible
        gap in the day's plan.
      </p>
      <p>
        The downstream effects compound quickly. Incomplete routes drag DCR. Drivers absorbing redistributed stops often
        run later into the evening, increasing the risk of failed deliveries and DNR claims. And an OSM firefighting a
        cover problem at 5:30am instead of running the briefing sets the whole wave up poorly before it begins.
      </p>

      <h2>Build a standby pool — deliberately, not informally</h2>
      <p>
        Every DSP with five or more vans should have a named list of standby drivers who have explicitly agreed to take
        short-notice shifts. This is not the same as a casual "who's available?" message to the group chat — it is a
        formal agreement, tracked in your rota system, with each standby driver confirming their availability window
        each week.
      </p>
      <p>
        A workable target is standby coverage for 10–15% of your deployed routes on any given day. For a DSP running
        fifteen vans, that means two confirmed standby drivers who can be called at short notice.
      </p>
      <ul>
        <li>
          <strong>Talk directly to drivers who want more hours.</strong> Standby pools work when the drivers in them
          actually want extra shifts, not when they've been added to a list without a real conversation.
        </li>
        <li>
          <strong>Agree a response window.</strong> If you call at 5am, you need a yes or no within 30 minutes. An
          unanswered callout is not a standby — it is a gap.
        </li>
        <li>
          <strong>Track reliability.</strong> Log every time a standby driver doesn't respond to a callout. Two
          consecutive non-responses and they are not a reliable standby regardless of what they said at induction.
        </li>
      </ul>

      <h2>Set a callout notification window — and enforce it</h2>
      <p>
        The later you find out a driver is absent, the fewer options you have. Every DSP should have a written callout
        policy: drivers must notify the team before a defined time — for example, by 4:30am for a 6am start. Anything
        after that threshold is treated as an unauthorised absence for rota purposes.
      </p>
      <p>
        This policy only works if you enforce it consistently. The first time a late callout goes without consequence,
        the informal norm becomes "call whenever." Over time the notification window creeps forward, and by the time
        you notice, you are routinely getting 5:50am messages for a 6am wave with no time to arrange cover.
      </p>
      <p>
        Communicate the callout policy during driver induction and reinforce it in morning briefings. Brief conversations
        about the standard — not disciplinary, just visible — keep the expectation clear.
      </p>

      <h2>Track every absence and look for patterns</h2>
      <p>
        A single absence is a difficult morning. A pattern of absences is a management problem that deserves a proper
        response.
      </p>
      <p>
        Log every callout with the date, driver, reason given, and whether cover was found. Review the data monthly.
        The patterns worth looking for:
      </p>
      <ul>
        <li>
          Specific drivers who call in repeatedly on Mondays, after Bank Holidays, or on longer routes — often a sign
          the role or schedule isn't working for them.
        </li>
        <li>
          Absences that cluster around particular shift patterns — early starts, split days, or back-to-back long
          routes — which may point to a rota design problem rather than individual driver behaviour.
        </li>
        <li>
          Drivers who are reliable in summer but frequently absent in winter — relevant for resourcing and advance
          planning around the peak period.
        </li>
      </ul>
      <p>
        Repeated absences from the same driver warrant a return-to-work conversation. Not necessarily a disciplinary
        one — often there is a scheduling or route issue that is fixable. But surface it early rather than letting the
        pattern run for months while DCR takes the hit.
      </p>

      <h2>Design your rota to absorb one absence without a crisis</h2>
      <p>
        The rota itself can be the first line of defence. DSPs that run every single van every single day have no
        slack — one absent driver creates an immediate problem with no obvious solution. DSPs that keep a buffer
        position in the rota can absorb the first absence without a standby callout at all.
      </p>
      <p>
        The practical approach: roster one more driver per day than the minimum routes require, and assign that driver as
        a flex position. They take the first available route, cover any callout that comes in before dispatch, or assist
        with van loading. The cost is one driver's daily hours; the payoff is a calmer morning and more consistent DCR
        across the week.
      </p>
      <p>
        On days when no absence occurs, the flex driver becomes your insurance on the most demanding route of the day —
        not wasted capacity.
      </p>

      <h2>How DSPOps helps</h2>
      <p>
        DSPOps gives your OSM a live view of the day's rota — who's confirmed, who's marked absent, and which routes
        need cover. Standby drivers' weekly availability is tracked alongside the main rota, so finding cover is a
        lookup rather than a phone-around through contacts. Absence history is logged automatically, so monthly pattern
        reviews are a report, not a reconstruction from memory and WhatsApp scrollback.
      </p>
      <p>
        If absence management is eating your OSM's first hour every time it happens,{" "}
        <a href="/#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we will show you what the callout workflow looks like inside DSPOps.
      </p>
    </>
  );
}
