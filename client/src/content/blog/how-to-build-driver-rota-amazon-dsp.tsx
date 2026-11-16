export default function HowToBuildDriverRotaAmazonDsp() {
  return (
    <>
      <p>
        For most UK Amazon DSP owners, building the weekly rota is a Sunday task that bleeds into Monday.
        You're cross-referencing a spreadsheet of routes against a WhatsApp thread of availability messages,
        checking who's on annual leave, remembering which drivers have a licence expiry coming up, and trying
        to cover the two routes nobody wants. It shouldn't take three hours. Here's what a well-run rota
        process actually looks like.
      </p>

      <h2>Start with your routes, not your drivers</h2>
      <p>
        The rota exists to cover routes. Before you open the spreadsheet, confirm how many routes you're
        expected to run each day of the coming week — your Amazon station contact will usually confirm
        route allocation by Thursday or Friday. Work from that number outward: how many van drivers do you
        need, what hours do they need to start, and are any routes same-day or micromobility blocks that
        need a different driver type?
      </p>
      <p>
        If you try to build the rota by assigning available drivers first and fitting routes around them,
        you'll consistently undercover your most demanding routes and overcover the quiet ones. Routes are
        the constraint; drivers fill them.
      </p>

      <h2>Collect availability in one place, not across three channels</h2>
      <p>
        The biggest time sink in rota building is chasing availability. Text messages, WhatsApp, the odd
        phone call, a Post-it on the office door — by the time you've heard from everyone, half the replies
        are buried in different threads and you've lost track of who hasn't responded.
      </p>
      <p>
        The fix is to collect availability through a single, structured channel and require drivers to submit
        by a fixed deadline — Wednesday evening works well for the following week. Drivers who miss the
        deadline get assumed unavailable. If that sounds harsh, it isn't: most drivers who miss the deadline
        also miss the quiet slots, and they learn to submit on time after one pay period of lighter work.
      </p>
      <p>
        For e-cargo bike riders, availability collection works differently because riders often work half-days
        — a morning block, an afternoon block, or both. Build your availability form to reflect this, or you'll
        end up calling riders individually to clarify what they meant by "available Tuesday".
      </p>

      <h2>Check compliance before you assign, not after</h2>
      <p>
        A rota that puts a driver with an expired driving licence on the road is worse than a rota with a
        gap in it. Before you finalise any assignment, check:
      </p>
      <ul>
        <li>
          <strong>Driving licence validity</strong> — expiry date and no new endorsements since you last
          checked. DVLA checks are your responsibility as the operator, not the driver's.
        </li>
        <li>
          <strong>Right to work</strong> — if a driver's visa has a time limit, track the expiry date and
          remove them from the rota before it lapses, not after Amazon's audit catches it.
        </li>
        <li>
          <strong>MOT and insurance on any driver-owned vehicle</strong> — less common but relevant if any
          of your drivers use their own van for a route.
        </li>
      </ul>
      <p>
        Doing these checks manually against a spreadsheet, every week, is where compliance gaps appear. A
        missed expiry doesn't show up until something goes wrong. Build the check into the rota process so
        it happens automatically before anyone is confirmed on a route.
      </p>

      <h2>Build a standing rota, then manage exceptions</h2>
      <p>
        Most DSP rotas are roughly 80% the same week to week. The same drivers run the same routes, with
        the same start times. If you're rebuilding from scratch every Sunday, you're doing ten times as much
        work as you need to.
      </p>
      <p>
        Build a standing rota — your default assignments if nothing changes — and then manage it through
        exceptions: annual leave, sick days, route changes from Amazon, driver preferences. The standing
        rota is your base; your weekly job is to apply the delta. This cuts rota-building time significantly
        for a stable, tenured driver team.
      </p>
      <p>
        The standing rota also makes last-minute callouts easier to handle. When a driver goes sick at
        5am, you already know which other drivers run a similar route profile. You're not starting from
        scratch — you're making one swap.
      </p>

      <h2>Communicate the rota in a way drivers can actually see</h2>
      <p>
        Printing the rota and pinning it to the station noticeboard only works if every driver comes to the
        station before their first shift. Van drivers usually do; e-cargo bike riders and drivers starting
        later in the day often don't. A rota that isn't visible to drivers is a rota they'll ignore.
      </p>
      <p>
        Send the confirmed rota directly to drivers — via text, app, or driver portal — before the week
        starts. Include start time, route reference, and any special instructions for that route. If a
        driver doesn't have written confirmation of their assignment, they'll call you on the morning to
        double-check, which is exactly the conversation you're trying to eliminate.
      </p>

      <h2>Build a cover process before you need it</h2>
      <p>
        Last-minute cover is the rota task that always feels like a crisis, but it's the most predictable
        problem in DSP operations. Someone will call off sick. A driver will get stuck in traffic and miss
        the wave. You'll get a route change from Amazon at short notice.
      </p>
      <p>
        Before the week starts, identify your standby pool — drivers who are available but not currently
        assigned — and have their contact details to hand. Some DSPs keep a small buffer of unassigned
        availability specifically for cover; others rely on drivers who have confirmed they're on standby.
        Either approach works, but it has to be decided before 5am, not at 5am.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps is built around the rota process described above. Drivers submit their availability directly
        inside their own driver portal — no WhatsApp threads, no chasing — and last-minute cover is
        reassigned in two taps. The platform covers van drivers and e-cargo bike riders in the same rota
        view, with riders submitting availability per block (morning, afternoon, or both) rather than by the
        full day. Right-to-work, licence and vehicle document expiries are tracked in the same system with
        automatic reminders, so compliance gaps are visible alongside the rota rather than discovered after
        the fact.
      </p>
      <p>
        If you want to see the rota workflow in practice,{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        and we'll walk through it with your driver count and route mix.
      </p>
    </>
  );
}
