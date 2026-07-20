export default function DspPayrollCortexLateChanges() {
  return (
    <>
      <p>
        Amazon Cortex data does not always finalise on the day you expect it. Stops get credited or
        removed after an investigation closes. DNR claims are reversed. A driver's route gets
        retroactively adjusted. If your payroll is tied to Cortex numbers — pay-per-stop, bonus
        thresholds, weekly metrics — a late change means your drivers were paid the wrong amount,
        and now you have to work out what to do about it.
      </p>
      <p>
        For UK DSPs running weekly payroll, this creates a recurring decision: do you pay on the
        data you have, knowing it might shift? Or do you hold payroll back and risk a late payment?
        Neither option is great. But there are ways to reduce how often you end up in that position.
      </p>

      <h2>Why Cortex data changes after the week closes</h2>
      <p>
        Amazon does not treat a delivery week as closed the moment the last van returns. Several
        processes run after dispatch that can move the numbers:
      </p>
      <ul>
        <li>
          <strong>DNR investigations:</strong> a customer raises a Delivered Not Received claim a
          day or two after delivery. If the investigation finds the driver did deliver correctly, the
          DNR is reversed — but not always before you've already exported the week's data.
        </li>
        <li>
          <strong>Stop credits and adjustments:</strong> routes are sometimes adjusted centrally if
          Amazon identifies a systemic problem at the station. Credits can appear or disappear days
          after the affected shift.
        </li>
        <li>
          <strong>Metric rescoring:</strong> some Cortex metrics, particularly CDF (Customer
          Delivery Feedback), lag behind the delivery date because they rely on customers completing
          a survey. Scores visible on Thursday for Monday's deliveries are still provisional.
        </li>
        <li>
          <strong>Manual overrides:</strong> OSMs can sometimes request corrections that affect
          your weekly numbers. These typically appear in Cortex within 48–72 hours.
        </li>
      </ul>
      <p>
        None of this is unusual — it is just how the platform works. The problem is that most DSPs
        design their payroll process as though the numbers are final when they print them.
      </p>

      <h2>Which parts of payroll are most exposed</h2>
      <p>
        Not every pay element is affected equally. Fixed hourly pay, guaranteed shift minimums, and
        mileage allowances are immune to Cortex changes. The elements that create risk are:
      </p>
      <ul>
        <li>
          <strong>Performance bonuses</strong> tied to scorecard status (e.g. a weekly top-up for
          drivers on Fantastic Plus routes).
        </li>
        <li>
          <strong>Pay-per-stop top-ups</strong> where drivers earn above a base rate once they
          exceed a stop threshold — any stop credit or removal moves the line.
        </li>
        <li>
          <strong>Metric-based deductions</strong> — some DSPs apply clawback rules for drivers
          below a certain DPMO or DNR level. If the metric improves after payroll runs, the
          deduction was wrong.
        </li>
      </ul>
      <p>
        If none of your pay elements depend on Cortex metrics, this problem largely disappears. But
        most DSPs running competitive pay structures will have at least one element that does.
      </p>

      <h2>Building a payroll cut-off process that accounts for late data</h2>
      <p>
        The simplest fix is to deliberately delay your payroll snapshot. Instead of locking
        Cortex numbers on Sunday night for Monday payroll, move the snapshot to Tuesday morning.
        This gives most DNR reversals and stop adjustments time to settle, without pushing your pay
        date back in a way that affects drivers.
      </p>
      <p>
        A few practical rules:
      </p>
      <ul>
        <li>
          Set a fixed weekly snapshot time — the same day and hour every week. Consistency matters
          more than which day you choose. Drivers need to trust that the number you pay them matches
          a specific moment in Cortex, not a vague "whatever it said at the time."
        </li>
        <li>
          Document the snapshot time in your pay policy so drivers know when the window closes. If
          a DNR is reversed after snapshot time, explain that it applies to next week's calculation,
          not this one.
        </li>
        <li>
          If you spot a significant data change after snapshot but before payment runs, have a
          defined threshold for acting — for example, any change that affects a driver's gross pay
          by more than £20 is worth correcting before payment; smaller differences are tracked and
          offset the following week.
        </li>
      </ul>

      <h2>What to do when data changes after you have already paid</h2>
      <p>
        Even with a Tuesday snapshot, you will occasionally pay on numbers that later change. The
        right approach depends on direction:
      </p>
      <ul>
        <li>
          <strong>You underpaid a driver</strong> (e.g. a DNR was reversed and they should have
          hit a bonus threshold) — make it right in next week's payroll. Document it, tell the
          driver explicitly, and process it as a separate line item so there is no ambiguity about
          what it relates to.
        </li>
        <li>
          <strong>You overpaid a driver</strong> (e.g. stop credits were removed after payment ran)
          — this is more sensitive. You cannot legally deduct wages without consent in the UK
          without a prior written agreement. The cleanest path is a salary advance agreement signed
          on contract, which allows future-week offsets. If you do not have one, you are relying on
          the driver agreeing to a voluntary deduction.
        </li>
      </ul>
      <p>
        Sorting out overpayment situations after the fact is frustrating. The contractual fix —
        an advance clause that allows future-week offsets — is worth adding before you need it.
        Speak to an employment solicitor about the right wording.
      </p>

      <h2>Communicating Cortex-linked pay to drivers</h2>
      <p>
        Many DSP payroll disputes are not really about the money — they are about the driver not
        understanding why their pay changed week to week. If a driver expects the same amount every
        Friday and gets something different, the first call you receive is going to be difficult.
      </p>
      <p>
        The simplest prevention is a weekly pay breakdown: a short message or portal entry that
        shows each driver their base pay, stop count, any metric-linked adjustment, and the Cortex
        snapshot date it was calculated from. Drivers who understand their own numbers rarely
        dispute the maths. Drivers who receive an unexplained figure and have to ask what happened
        are the ones who erode trust and eventually leave.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps calculates payroll directly from Cortex data and lets you set a fixed snapshot time
        for each week. When Cortex updates after your snapshot, the change is flagged — you can
        choose to apply it to the current cycle or carry it forward. Drivers see their own
        breakdown inside the driver portal: stops delivered, metric status, pay calculation. No
        more payroll disputes driven by drivers not knowing how the number was produced.
      </p>
      <p>
        If late Cortex data is causing you problems at payroll time, you can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we will walk through your current pay structure and show you how the snapshot workflow
        handles it.
      </p>
    </>
  );
}
