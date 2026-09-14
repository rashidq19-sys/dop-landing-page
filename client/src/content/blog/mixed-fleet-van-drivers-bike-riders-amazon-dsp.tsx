export default function MixedFleetVanDriversBikeRidersDsp() {
  return (
    <>
      <p>
        Running van drivers and e-cargo bike riders under one Amazon DSP is operationally more
        complex than running either on its own. The schedules don't work the same way, the
        onboarding checklists are different, the pay structures don't match, and the compliance
        documents don't overlap completely. Most DSP owners try to squeeze both into whatever
        system they already have — a single spreadsheet, a shared WhatsApp group, one rota
        template. That's where the admin chaos comes from.
      </p>
      <p>
        This is a practical guide to what's actually different between the two, and how to manage
        them without running two separate operations side by side.
      </p>

      <h2>The rota problem: vans and riders don't work the same way</h2>
      <p>
        Van drivers work routes — a route assignment with a start time and an end time, typically a
        full day. Riders work blocks — usually a morning block, an afternoon block, or both on the
        same day, with multiple waves running out of a hub. A rider can work only the morning, only
        the afternoon, or back-to-back. A rota built around van shifts cannot express that pattern
        without workarounds.
      </p>
      <p>
        The result is usually a second spreadsheet for riders, which means the office is managing
        two rotas, cross-referencing them for cover gaps, and never quite certain whether someone
        is double-booked or missing from the rota entirely. The moment a rider calls in sick
        twenty minutes before the morning block, you're searching two places for a replacement
        instead of one.
      </p>

      <h2>Onboarding: two different checklists</h2>
      <p>
        Van drivers need a driving licence, a DVLA check, right to work, ID and the usual
        agreements. Riders need right to work, ID, address history, a medical declaration and
        agreements — but no driving licence and no DVLA check. That's not a minor difference.
        Running a DVLA check on someone who doesn't hold a licence wastes time and creates
        confusion about what's actually required.
      </p>
      <p>
        If your onboarding process is one generic template, you're either over-checking riders (and
        asking for documents they don't have) or under-checking van drivers (and missing the
        licence verification that matters for your insurance). Two person types need two onboarding
        checklists.
      </p>
      <p>
        One thing that doesn't change: any rider doing on-foot rounds is onboarded and managed
        exactly like an e-cargo bike rider — same checklist, same block structure, same pay. There
        is no separate process for on-foot rounds; they run through the same rider setup.
      </p>

      <h2>Pay: different structures, different inputs</h2>
      <p>
        Van driver pay typically flows from Amazon's Work Summary Tool — routes run, blocks
        completed, stops delivered. Rider pay is calculated per block. The rates may differ, the
        inputs differ, and the logic is different enough that running both through the same
        spreadsheet usually means custom columns, manual adjustments, and reconciliation errors
        every week.
      </p>
      <p>
        The fix is to be explicit about the separation: treat van driver pay and rider pay as two
        distinct calculations, not one calculation with edge cases bolted on.
      </p>

      <h2>Compliance: same principles, different documents</h2>
      <p>
        For van drivers, compliance means licence expiry, right to work, ID, and vehicle documents
        — MOT, insurance, the daily inspection record. For riders, the licence and DVLA column is
        absent, but right to work, ID expiry, and agreements still apply.
      </p>
      <p>
        A single compliance list that assumes everyone has a driving licence will either show
        permanent gaps for every rider, or require workarounds that make the list harder to read.
        Separating person types in the list avoids the noise while keeping both under the same
        review cycle.
      </p>

      <h2>Communication: briefing a team with two different schedules</h2>
      <p>
        Van drivers typically brief once, at the start of their shift. Riders may check in twice in
        a single day — once before the morning block and once before the afternoon. Some riders work
        only one; some work both. If you're managing both teams on the same WhatsApp group, you're
        either messaging at the wrong time for half the people, or sending everything twice.
      </p>
      <p>
        Wave times for e-cargo bike rounds are typically different from standard van departure
        times, so the pre-wave briefing structure for drivers doesn't translate directly to a
        rider operation. Two short block check-ins — one before the morning wave, one before the
        afternoon — work better than a single briefing that tries to cover everyone at once.
      </p>

      <h2>Making the mixed fleet work: the practical fixes</h2>
      <ul>
        <li>
          <strong>Keep both rotas visible in the same place.</strong> Cross-reference daily for
          cover gaps, not just when someone calls in sick at 5am.
        </li>
        <li>
          <strong>Run separate onboarding processes, treat compliance as one list.</strong>
          Everyone needs right to work, ID and agreements. Van drivers get the licence check on
          top. Riders don't.
        </li>
        <li>
          <strong>Track pay separately by person type.</strong> Don't try to reconcile van driver
          routes and rider blocks in the same formula.
        </li>
        <li>
          <strong>Brief before each wave, not once for everyone.</strong> A pre-block check-in for
          riders and a pre-route briefing for van drivers can run back-to-back and take fifteen
          minutes combined.
        </li>
        <li>
          <strong>Use one phone channel per block, not one channel for the whole DSP.</strong>
          Morning rider messages don't need to reach van drivers, and end-of-day van driver updates
          don't need to land in a rider's phone during their afternoon block.
        </li>
      </ul>

      <h2>How DSPOps handles a mixed fleet</h2>
      <p>
        DSPOps manages van drivers and e-cargo bike riders in the same account. Riders are their
        own person type — their onboarding checklist skips the driving licence and DVLA check while
        keeping right to work, ID, address history, medical declaration and agreements. Their blocks
        (morning, afternoon, or both on the same date) sit in the rota separately from van shift
        patterns. Pay is calculated per block. One compliance list covers both person types, so you
        are not running separate systems side by side or maintaining two spreadsheets that
        periodically fall out of sync.
      </p>
      <p>
        If you're running or about to run both and want to see what the rota looks like in
        practice, you can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we'll walk through the setup live.
      </p>
    </>
  );
}
