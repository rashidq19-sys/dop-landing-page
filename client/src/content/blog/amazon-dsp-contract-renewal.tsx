export default function AmazonDspContractRenewal() {
  return (
    <>
      <p>
        Most Amazon DSP owners don't think seriously about their contract renewal until the
        conversation with their Station Operations Manager is already scheduled. By that point, the
        preparation window has largely closed. The evidence Amazon needs — scorecard trends over
        months, not just last week's snapshot, compliance records with no gaps, van inspection logs
        — either exists already or it doesn't. You can't backfill it in two weeks.
      </p>
      <p>
        This guide explains what Amazon evaluates in a DSP contract review, what documentation is
        typically expected, and how to build the audit trail that makes renewal straightforward
        rather than stressful.
      </p>

      <h2>What a DSP contract renewal actually involves</h2>
      <p>
        Amazon's agreements with DSPs are renewed periodically, with reviews that vary by region
        and station. The process is not a single conversation — it's an evaluation of whether your
        DSP meets Amazon's standards across multiple dimensions: delivery performance, compliance,
        driver stability, and operational maturity.
      </p>
      <p>
        The review typically involves your Delivery Station Manager and sometimes Amazon's field
        team. Expect to discuss Cortex scorecard performance over the review period, your driver
        records, van inspection compliance, and how your business has responded to previous
        concerns. The operators who handle this calmly are the ones who have been tracking these
        things routinely — not the ones who've spent the previous fortnight hunting for emails and
        screenshots.
      </p>

      <h2>The metrics that matter most</h2>
      <p>
        Your Cortex scorecard is the most visible data point in any renewal discussion. Amazon
        looks at your composite status over the review period — not just whether you're Fantastic
        Plus this week, but whether your performance has been stable or trending upward over several
        months.
      </p>
      <p>
        The metrics that carry the most weight are those Amazon can directly tie to customer
        experience: DCR (whether your routes complete), DNR (whether customers report missing
        parcels), DPMO (physical defects), and CDF (customer satisfaction). A single difficult week
        matters far less than a pattern of misses.
      </p>
      <p>
        The harder situation is an operator who is technically hitting thresholds but whose trend
        has been declining over two quarters. Moving from Fantastic Plus to Fantastic to Great
        signals a management problem even if the numbers are still in range. Amazon notices the
        direction, not just the snapshot.
      </p>

      <h2>Compliance is a non-negotiable</h2>
      <p>
        Delivery performance gets most of the attention, but compliance is where renewal reviews
        can surprise operators. Amazon expects your right-to-work records to be current for every
        driver on your rota. A driver who passed their check at onboarding but whose visa has since
        expired is your legal exposure, not Amazon's — and gaps in your records signal that your
        compliance process isn't active.
      </p>
      <p>
        The same applies to driving licences. An expired licence sitting unnoticed on your active
        driver list tells Amazon that you're not monitoring your own compliance. MOT and insurance
        expiry on your vans is a similar test — a vehicle on road after its MOT expired is a
        problem regardless of whether it caused an incident.
      </p>
      <p>
        The paper trail Amazon will expect includes: up-to-date right-to-work records for every
        driver (including any visa expiry dates), current driving licence checks, van inspection
        records for the review period, and evidence that your response to compliance gaps is timely.
      </p>

      <h2>Driver stability signals operational health</h2>
      <p>
        Amazon pays attention to driver turnover and absence rates even if these aren't directly
        scored on Cortex. High turnover typically correlates with lower scorecard performance —
        newer drivers are more likely to generate DPMO events and lower POD compliance — but it
        also signals that your operation is harder to manage at scale.
      </p>
      <p>
        An operator who has the same core driver pool they had twelve months ago, with a handful
        of well-onboarded new starters, presents a fundamentally different picture to one who turns
        over half their fleet every quarter. Stability is a proxy for operational maturity.
      </p>

      <h2>What to have ready before the conversation</h2>
      <p>
        When your SOM asks how you're managing a particular area, the right answer is a document
        or a screen — not a verbal assurance. Operators who make good impressions in renewal
        discussions tend to have:
      </p>
      <ul>
        <li>
          <strong>Scorecard trend data</strong> covering the review period, not just the most
          recent week
        </li>
        <li>
          <strong>A complete compliance register</strong> with expiry dates — current, not
          reconstructed
        </li>
        <li>
          <strong>Daily van inspection logs</strong> for the review period, with photos
        </li>
        <li>
          <strong>Incident and damage reports</strong> with outcomes documented
        </li>
        <li>
          <strong>Payroll records</strong> traceable to routes and Cortex data
        </li>
      </ul>
      <p>
        None of this requires a filing system built from scratch. It requires having a process in
        place early enough that the records have accumulated by the time you need them.
      </p>

      <h2>Building the audit trail early</h2>
      <p>
        The operators who are least prepared for a contract review are almost always the ones who
        built their compliance and record-keeping processes reactively — after an incident, after a
        near-miss, or after hearing that a review was coming. The ones who are best prepared ran the
        same routine every week whether or not anything was pressing.
      </p>
      <p>
        That means daily van walkarounds logged with photos, not occasional spot checks. It means
        driving licence and right-to-work expiry dates tracked proactively, with reminders before
        anything lapses. And it means reviewing your Cortex trend weekly, so you know your
        trajectory six weeks before it becomes visible to Amazon.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps tracks Cortex scorecard metrics per driver so your trend data is always current —
        not something you rebuild from weekly exports before a meeting. Right-to-work, driving
        licence, and vehicle MOT and insurance expiry dates generate automatic reminders, so nothing
        lapses unnoticed. Daily van inspection logs with photos and video build an audit trail
        whether or not you're expecting a review. And payroll records are calculated from Amazon's
        Work Summary Tool with every line traceable to a route.
      </p>
      <p>
        The goal is a system where renewal preparation is a two-hour review of existing records —
        not a two-week reconstruction project. If you'd like to see how it works for your DSP, you
        can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        and we'll walk through your data live on the call.
      </p>
    </>
  );
}
