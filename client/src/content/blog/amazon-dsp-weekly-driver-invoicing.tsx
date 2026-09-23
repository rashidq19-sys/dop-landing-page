export default function AmazonDspWeeklyDriverInvoicing() {
  return (
    <>
      <p>
        Every week, every driver at your DSP needs an invoice that is right first time. Get one line
        wrong and you lose the Monday morning to a phone call, a screenshot, and a driver who now trusts
        every future invoice a little less. Get the whole run wrong and you are rebuilding forty invoices
        by hand on a Sunday night.
      </p>
      <p>
        Weekly driver invoicing is not complicated, but it has a lot of moving parts: day rates,
        same-day rates, bonuses, deductions, and a week of Amazon data that has to line up with your own
        rota. Here is how to run it as a repeatable process rather than a weekly scramble.
      </p>

      <h2>What a weekly driver invoice needs to show</h2>
      <p>
        A good driver invoice answers the driver's questions before they ask them. At minimum, each one
        should include:
      </p>
      <ul>
        <li>
          <strong>The invoice period and a unique reference</strong> — so the driver, you and your
          accountant are all talking about the same week.
        </li>
        <li>
          <strong>One line per day worked</strong>, with the date and the route or block, and the rate
          applied to it.
        </li>
        <li>
          <strong>Same-day work shown separately</strong> from standard routes, at its own rate. Mixing
          them into one total is the fastest way to start an argument.
        </li>
        <li>
          <strong>Bonuses itemised</strong>, with what they were earned for — not a single lump
          labelled "bonus".
        </li>
        <li>
          <strong>Deductions itemised</strong>, each with a reason the driver will recognise.
        </li>
        <li>
          <strong>A clear total</strong> and the date it will be paid.
        </li>
      </ul>
      <p>
        If you run e-cargo bike riders as well as van drivers, the same principle applies: a rider's
        invoice should show each block they worked, not a day total that hides whether they did the
        morning, the afternoon, or both.
      </p>

      <h2>The weekly invoicing run, step by step</h2>
      <p>
        The DSPs that invoice without drama run the same sequence every week, on the same day:
      </p>
      <ul>
        <li>
          <strong>Close the week.</strong> Pick a fixed point after the Amazon week ends and stick to it.
          Invoicing from a half-finished week guarantees corrections.
        </li>
        <li>
          <strong>Get the week's Amazon data.</strong> This is your record of what was actually worked —
          routes, days and same-day work — and it is the only source of truth drivers will accept in a
          dispute.
        </li>
        <li>
          <strong>Check it against your rota.</strong> Anyone on the rota but missing from Amazon's data,
          or the other way round, needs an answer before an invoice goes out. Late swaps and cover shifts
          are the usual cause.
        </li>
        <li>
          <strong>Apply rates, bonuses and deductions.</strong> Standard and same-day at their own rates;
          bonuses only where the threshold was genuinely met; deductions only where they are documented.
        </li>
        <li>
          <strong>Review the exceptions, not every line.</strong> Look hard at anything unusual — a
          total well above or below that driver's normal week, a new deduction, a first invoice for a new
          starter.
        </li>
        <li>
          <strong>Issue, export, pay.</strong> Send each driver their invoice, send your accountant one
          consolidated file, and pay on the date you promised.
        </li>
      </ul>

      <h2>Where weekly invoices usually go wrong</h2>
      <p>
        Most invoice errors are not maths errors. They are data-matching errors that happen before any
        calculation starts:
      </p>
      <ul>
        <li>
          <strong>Rekeying.</strong> Every time a figure is copied from one screen into a spreadsheet,
          there is a chance it is copied wrong. Across forty drivers and seven days, that chance becomes
          a certainty.
        </li>
        <li>
          <strong>The wrong rate on same-day work.</strong> Same-day routes paid at the standard rate
          (or the reverse) is one of the most common complaints, and one of the easiest to prevent if
          same-day work is kept separate from the start.
        </li>
        <li>
          <strong>Late changes to the rota.</strong> A driver who covered a shift at 6am on Thursday is
          often missing from the spreadsheet that was built on Monday.
        </li>
        <li>
          <strong>Undocumented deductions.</strong> A deduction that the driver first hears about on
          their invoice will be disputed, whatever the rights and wrongs.
        </li>
      </ul>

      <h2>Deductions: evidence first, invoice second</h2>
      <p>
        Deductions cause more invoice disputes than everything else put together. The rule is simple:
        no deduction appears on an invoice unless the driver has already been told about it and you can
        show the evidence. For van damage, that means the start-of-shift and end-of-shift van checks with
        photos. For anything else, a written record the driver has seen. If you cannot show why a
        deduction is there, take it off and deal with it separately.
      </p>

      <h2>Handling a disputed invoice</h2>
      <p>
        When a driver challenges a number, the fastest resolution is to show them the line, the date,
        the route and the Amazon record behind it. That conversation takes two minutes if every line on
        the invoice traces back to a source, and an afternoon if it does not. Keep past invoices where
        drivers can find them themselves — most "what was I paid for?" questions are really "can I see
        last month's invoice?".
      </p>
      <p>
        If you issue invoices on your drivers' behalf rather than receiving invoices from them, check with
        your accountant that the right paperwork is in place with each driver. It is a one-off job, and
        far easier to sort before a query than after one.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps calculates driver pay from Amazon's Work Summary Tool data, so every line traces back to
        a route. Upload the week's report and DSPOps generates every driver's invoice — day rates,
        same-day rates, bonuses and deductions — then sends it to each driver in the app and gives you a
        clean export for your accountant. Drivers can download their past invoices themselves, and
        riders are paid per block, so a mixed fleet goes through the same weekly run.
      </p>
      <p>
        If your weekly invoicing still means a Sunday night with a spreadsheet, you can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we'll walk through a weekly invoice run with you on the call.
      </p>
    </>
  );
}
