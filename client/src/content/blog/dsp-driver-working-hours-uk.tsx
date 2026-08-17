export default function DspDriverWorkingHoursUk() {
  return (
    <>
      <p>
        Working hours compliance is one of those legal obligations that DSP owners know exists but rarely
        have a clean process for managing. The rules come from the Working Time Regulations 1998, and they
        apply to every driver on your rota — whether they're permanent, casual, or agency. Getting it wrong
        exposes you to HMRC enforcement, civil claims, and — in the case of an accident — serious liability.
        Getting it right is mostly a matter of knowing what you're tracking and building it into your rota
        process before it becomes an issue.
      </p>

      <h2>What the Working Time Regulations actually require</h2>
      <p>
        The core rules for your drivers are straightforward in principle, even if they're fiddly in practice:
      </p>
      <ul>
        <li>
          <strong>48-hour average working week</strong> — calculated over a 17-week reference period (not per
          week). A driver can do more than 48 hours in a busy week provided the average over the reference
          window stays below the limit.
        </li>
        <li>
          <strong>11 hours rest between shifts</strong> — mandatory. A driver who finishes at 22:00 cannot
          start before 09:00 the following morning. Amazon's station start times often push hard against this.
        </li>
        <li>
          <strong>24-hour rest in any 7-day period</strong> — or 48 hours in a 14-day period. Most DSPs
          achieve this naturally because drivers don't work seven days straight, but it becomes relevant
          during peak and when using drivers across multiple roles.
        </li>
        <li>
          <strong>20-minute break for any shift over 6 hours</strong> — unpaid is fine; the break must be
          uninterrupted. Loading time at the station counts as work.
        </li>
        <li>
          <strong>Night worker limit of 8 hours in any 24-hour period on average</strong> — a night worker
          is anyone who regularly works at least three hours between 23:00 and 06:00. Most Amazon evening
          routes end by 22:00 so this rarely applies, but it's worth checking your shift data.
        </li>
      </ul>

      <h2>The opt-out agreement</h2>
      <p>
        Drivers can individually opt out of the 48-hour limit by signing a written opt-out agreement. This
        does not override the rest requirements — the 11-hour gap between shifts applies regardless. Most
        DSPs ask drivers to sign an opt-out during the onboarding process, which is fine, but the opt-out
        must be voluntary and drivers can withdraw it with 7 days' notice (or longer if specified in the
        agreement, up to 3 months).
      </p>
      <p>
        Keep a signed copy of every opt-out on file and record it in your HR system. If you ever face a
        driver grievance or an HMRC working time audit, you will need to produce these.
      </p>

      <h2>Record-keeping requirements</h2>
      <p>
        You are legally required to keep adequate records to show compliance. The regulations don't specify
        an exact format — they require records sufficient to demonstrate that working time limits are being
        met. In practice, this means:
      </p>
      <ul>
        <li>
          Shift start and end times per driver, per day — logged and retained for at least two years.
        </li>
        <li>
          A record of which drivers have signed opt-out agreements.
        </li>
        <li>
          Any instances where a driver approached or exceeded the 48-hour average, and what action was taken.
        </li>
      </ul>
      <p>
        If your drivers clock in and out at the station, that data can serve as your record — but you need to
        be able to retrieve and analyse it by driver, not just see it in aggregate.
      </p>

      <h2>Where DSPs commonly go wrong</h2>
      <p>
        The most common compliance failures aren't deliberate — they're structural. A few patterns we see
        repeatedly:
      </p>
      <ul>
        <li>
          <strong>Covering absences with whoever is available</strong> — a driver who worked a long wave on
          Thursday gets called in for Friday morning because someone called out sick. No one checks the rest
          gap because the callout happens at 05:30 and there's no system flagging it.
        </li>
        <li>
          <strong>Ignoring agency drivers</strong> — agency workers brought in for peak are still covered by
          the Working Time Regulations. The agency has its own obligations, but you share liability as the
          end user. Their hours need to be tracked just like your permanent staff.
        </li>
        <li>
          <strong>Treating loading and debrief time as off the clock</strong> — time spent loading the van at
          the station and completing the end-of-wave debrief is working time. It doesn't disappear because
          it's not on the road.
        </li>
        <li>
          <strong>Not reviewing the 17-week rolling average</strong> — the average drifts during peak periods
          and nobody notices until a driver has been over 48 hours for six weeks straight.
        </li>
      </ul>

      <h2>Building compliance into your rota process</h2>
      <p>
        The practical fix is to treat hours compliance as a rota constraint, not an afterthought. Before
        finalising any week's schedule, check three things:
      </p>
      <ul>
        <li>
          Is every driver's planned shift at least 11 hours after their previous finish time? Flag any breach
          before the rota is published, not after.
        </li>
        <li>
          Does every driver with a shift longer than 6 hours have a break scheduled in the plan — and is
          someone tracking that it's actually taken?
        </li>
        <li>
          For drivers without an opt-out, is this week's planned total, when added to the rolling 17-week
          average, going to push the average over 48 hours?
        </li>
      </ul>
      <p>
        None of these checks are complex. The problem is they require data — actual hours per driver, not
        planned hours — and most DSPs don't have that in a format they can query quickly when they're
        building next week's rota at 10pm on a Sunday.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps tracks shift times, break records, and rolling hours per driver automatically — so when you
        open the rota builder, the system flags any driver who is approaching their rest limit or whose
        17-week average is heading toward the 48-hour cap. Callout replacements get the same check in real
        time: if a last-minute swap would break a rest gap, it shows up before the driver is confirmed, not
        at the debrief.
      </p>
      <p>
        If you'd like to see how working hours compliance sits alongside rota management and Cortex data in
        a single view, you can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we'll walk through your current setup and show you where the gaps typically are.
      </p>
    </>
  );
}
