export default function AmazonDspMarginManagement() {
  return (
    <>
      <p>
        Running an Amazon DSP is a logistics operation with thin tolerances: Amazon sets the delivery
        schedule, the van count, and much of the staffing structure. What you control is cost — and
        how closely your payroll, vehicle, and admin spend tracks what you are actually earning per
        route each week.
      </p>
      <p>
        Most DSP owners understand their scorecard. Fewer have a clear picture of where the money
        goes inside each weekly cycle. This guide covers the financial structure of a UK Amazon DSP
        and the places where operators most commonly lose margin without an obvious alarm going off.
      </p>

      <h2>How DSP revenue is structured</h2>
      <p>
        Amazon pays DSPs a fee for each delivery route operated. The exact rate per route is set in
        your service agreement and is not publicly disclosed. The number of stops, route type
        (standard, same-day), and your performance standing all feed into what you earn from a given
        period's work.
      </p>
      <p>
        Your Cortex scorecard sits alongside those commercial terms in a direct way: sustained
        underperformance affects your standing with Amazon, which in turn affects what you can earn
        and what you risk losing. Treating your scorecard as a financial priority — not just an
        operational one — follows from this directly. A slip from Fantastic Plus to Fantastic is not
        an abstract label change; it is a signal that affects your commercial position with your
        programme manager.
      </p>

      <h2>The four main cost lines</h2>
      <p>
        After Amazon fees come in, most DSP owners find costs group into four categories:
      </p>
      <ul>
        <li>
          <strong>Driver pay</strong> — the largest cost line by a significant margin. Day rates,
          overnight allowances, holiday pay, and any performance top-ups all sit here. On a 30-van
          fleet, a rounding error in the weekly pay run multiplied across fifty drivers compounds
          quickly over a quarter.
        </li>
        <li>
          <strong>Vehicle costs</strong> — lease or hire payments, fuel, servicing, repairs, and
          tyres. The fuel element fluctuates weekly and is often under-tracked between formal cost
          reviews.
        </li>
        <li>
          <strong>Insurance</strong> — fleet hire-and-reward cover, employer's liability, and
          goods-in-transit premiums. Fixed or semi-fixed within a contract year, but important to
          benchmark at renewal.
        </li>
        <li>
          <strong>Admin and overhead</strong> — OSM time, compliance admin, payroll processing, and
          software tools. This category is the easiest to shrink without cutting operational quality,
          and the easiest to undercount because it shows up as staff time rather than an invoice.
        </li>
      </ul>

      <h2>Where operators lose margin without noticing</h2>
      <p>
        The margin leaks that matter most are the ones that recur every week without triggering an
        obvious alarm. Four patterns come up repeatedly:
      </p>
      <ul>
        <li>
          <strong>Over-scheduling.</strong> Drivers on the rota for routes that are not confirmed —
          or confirmed later than the rota was built — create a payroll cost without a corresponding
          route fee. On lighter weeks, a rota built on last week's route count rather than this
          week's confirmed schedule can cost a day's pay per unnecessary driver.
        </li>
        <li>
          <strong>Payroll errors that run for weeks.</strong> A wrong rate, an uncorrected deduction,
          or a late Cortex adjustment not reflected in the pay run each costs the same whether it is
          caught this week or in month three. Manual payroll processes are the most common root
          cause — a calculation done in a spreadsheet gets copied and re-used rather than rebuilt,
          and the error compounds.
        </li>
        <li>
          <strong>Fuel blind spots.</strong> Most DSPs track fuel per refill rather than per route.
          Without a weekly per-van fuel figure, it is hard to identify which vehicles are
          consistently over-consuming and whether the cause is driver behaviour, route length, or a
          mechanical issue that should have gone to the service schedule weeks ago.
        </li>
        <li>
          <strong>Admin time as hidden cost.</strong> An OSM spending several hours a week
          rebuilding the rota and reconciling payroll is costing you management time that could go
          on coaching drivers, running pre-wave briefings, and keeping the Cortex numbers healthy.
          That cost does not appear on an invoice, but it shows up in operational quality over time.
        </li>
      </ul>

      <h2>A weekly financial check that takes under twenty minutes</h2>
      <p>
        A regular financial review does not need to be elaborate. Four questions worth asking every
        Friday:
      </p>
      <ul>
        <li>
          Did routes confirmed match routes rostered — or were drivers scheduled for rounds that
          did not run?
        </li>
        <li>
          Is this week's payroll total consistent with the headcount and rates on record, or is
          there an unexplained variance?
        </li>
        <li>Are any vans showing fuel spend significantly above the fleet average?</li>
        <li>
          Is this week's scorecard trajectory heading for a tier that could affect your commercial
          standing next period?
        </li>
      </ul>
      <p>
        Most DSP owners who run this consistently find it takes less than twenty minutes once the
        data is in one place. The problem is usually getting it there — for operators working across
        a payroll spreadsheet, a Cortex tab, and a separate fuel log, the weekly compilation is the
        job, not the analysis.
      </p>

      <h2>How DSPOps helps</h2>
      <p>
        DSPOps calculates driver pay directly from Amazon's Work Summary Tool, so the weekly pay run
        starts from the same source as the route records rather than being rebuilt manually. Every
        pay line is traceable to a specific route, which makes over-payments and under-payments
        easier to catch before they compound. The rota is built from driver availability submitted
        through the driver portal, so confirmed routes and available drivers are in the same view.
        Amazon scorecard metrics sync into the platform alongside route data, so performance and
        cost information sit together rather than across separate tools.
      </p>
      <p>
        If you would like to see how your operation's numbers look inside DSPOps, you can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we can walk through your fleet size and show you the payroll and performance views with
        your data.
      </p>
    </>
  );
}
