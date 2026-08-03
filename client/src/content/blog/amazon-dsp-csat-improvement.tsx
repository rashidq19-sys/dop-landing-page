export default function AmazonDspCsatImprovement() {
  return (
    <>
      <p>
        Customer satisfaction at an Amazon DSP is one of those metrics that feels outside your control — because
        you're not there when the driver drops the parcel. But the Customer Delivery Feedback (CDF) score on your
        Cortex scorecard is almost entirely driven by things that happen in the last ninety seconds of each delivery:
        where the package is left, whether a photo is taken, and how the driver behaves if something goes wrong.
        That means it's very much within your control — if you know what to look for.
      </p>

      <h2>What CDF actually measures</h2>
      <p>
        Amazon collects post-delivery feedback from a sample of customers after each wave. The questions typically
        cover whether the package arrived in good condition, whether it was left in a sensible place, and whether
        the driver behaved professionally. Those responses roll up into your CDF score on the Cortex DA scorecard.
      </p>
      <p>
        Because CDF is based on a sample, a small number of poor deliveries can move the metric significantly.
        One driver with consistently careless doorstep behaviour can drag your fleet's CDF in a way that's invisible
        until it shows up in Monday's scorecard. That's why driver-level visibility matters more than the fleet
        average.
      </p>

      <h2>POD compliance is the single biggest driver of CSAT</h2>
      <p>
        Customers who receive a photo confirmation after their delivery report far higher satisfaction than those who
        don't. The photo does two things: it confirms the parcel arrived safely, and it tells the customer exactly
        where it was left. Without it, "where's my parcel" contacts rise — and those contacts generate negative
        feedback, even when the driver completed the delivery correctly.
      </p>
      <p>
        The fix for low POD compliance is simple but requires consistency: surface each driver's daily POD rate
        back to them — on their phone, before the next wave. Drivers who see their own numbers self-correct
        quickly. Those who don't are the ones who need a direct conversation.
      </p>

      <h2>Safe place choices are a bigger factor than most operators realise</h2>
      <p>
        "Left in a safe place" is an option, not an instruction. When drivers leave parcels in inconsistent
        locations — behind a bin one day, in a porch the next, at the side gate without a photo — customers
        become anxious and confused. That anxiety translates directly into lower satisfaction scores.
      </p>
      <ul>
        <li>
          Brief drivers to use the same safe place per address each time where possible, and to photograph it
          in a way that clearly shows the location in relation to the property.
        </li>
        <li>
          Remind drivers that the purpose of the safe place photo is customer reassurance — it's not a
          box-ticking exercise.
        </li>
        <li>
          Flag recurring "no safe place" returns on specific addresses so drivers know in advance and can
          attempt a neighbour drop instead of returning empty-handed.
        </li>
      </ul>

      <h2>Contact compliance when deliveries can't complete</h2>
      <p>
        When a driver can't deliver — the gate is locked, the customer didn't respond to the intercom, there's
        nowhere safe to leave it — the moment they call the customer through Mentor rather than silently returning
        the parcel is where CSAT is won or lost. Customers who receive a call, even an unsuccessful one, report
        meaningfully higher satisfaction than those who get an unexpected "attempted delivery" notification with
        no explanation.
      </p>
      <p>
        This is partly a training issue and partly a habit issue. Include contact compliance misses in your morning
        briefing — not as a reprimand, but as a reminder that those calls directly affect how customers rate
        the service. Most drivers, once they understand the link, make the call.
      </p>

      <h2>Reviewing customer feedback without demoralising the team</h2>
      <p>
        Negative feedback can be demotivating if it lands as criticism without context. The most effective way
        to use it is to share specific examples — anonymised where possible — and focus the conversation on the
        decision the driver made, not the driver themselves.
      </p>
      <ul>
        <li>
          Pick one example of a below-average delivery per week and talk through it in the morning huddle:
          what happened, what a better outcome would have looked like, and whether anything in the day's
          prep could have prevented it.
        </li>
        <li>
          Equally, pick one example of high-scoring feedback and make it explicit what the driver did well.
          Recognition is more powerful than correction at building a culture where CDF is taken seriously.
        </li>
        <li>
          Resist the urge to review multiple examples in one session — it becomes overwhelming and the team
          stops engaging. One good, one bad, every day, is a compounding rhythm.
        </li>
      </ul>

      <h2>The driver-level pattern you're probably missing</h2>
      <p>
        Fleet-average CDF is a starting point, not an action. The metric that actually drives improvement is CDF
        at driver level, reviewed mid-week while the deliveries are still recent enough to discuss. In most DSPs,
        the bottom ten percent of drivers by CDF account for a disproportionate share of the negative customer
        feedback. Coaching those specific drivers — individually, with their own data — moves the metric faster
        than any fleet-wide retraining.
      </p>
      <p>
        Equally, the top performers are worth understanding. What are your highest-scoring drivers doing
        differently at the doorstep? In most cases it comes down to pace — they're not rushing the handover,
        they photograph clearly, and they make contact when they need to. Those habits can be taught.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps pulls CDF alongside all other Cortex scorecard metrics at driver level, updated throughout the
        week rather than waiting for Monday's summary. Your OSM can see which drivers are trending down before
        the week is over, run a targeted briefing, and track whether it lands — all without rebuilding
        spreadsheets.
      </p>
      <p>
        If you want to see what driver-level CDF visibility looks like in practice,{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        and we'll walk through your DSP's data live.
      </p>
    </>
  );
}
