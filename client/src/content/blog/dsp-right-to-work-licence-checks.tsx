export default function DspRightToWorkLicenceChecks() {
  return (
    <>
      <p>
        Right-to-work compliance and driving licence validity are two of those admin areas that sit quietly in
        the background — until they don't. A driver whose visa expired in March is still on your rota. A licence
        that hit 12 points two weeks ago is still out on the road. You find out because someone flags it, or
        worse, because an audit does.
      </p>
      <p>
        As a UK Amazon DSP owner, the legal responsibility for both checks sits entirely with you. This post
        covers what you need to collect, how to track expiry dates before they become an emergency, and what to
        do when something lapses mid-employment.
      </p>

      <h2>Why right-to-work compliance is your problem, not Amazon's</h2>
      <p>
        Amazon station managers will ask to see your compliance records during a DA audit, and an expired
        document will flag. But the legal exposure is yours as the employer. Under UK law, employers who fail to
        conduct right-to-work checks correctly can face significant civil penalties — and in some cases, criminal
        liability — if they knowingly employ someone without the right to work in the UK.
      </p>
      <p>
        The checks themselves are not complex. The problem most DSPs have is not knowing what to collect — it is
        having no central record of what was collected and when it expires.
      </p>

      <h2>What documents you actually need to collect</h2>
      <p>
        Right-to-work checks under UK law fall into two categories.
      </p>
      <ul>
        <li>
          <strong>List A documents</strong> — indefinite right to work. A UK or Irish passport, a UK birth
          certificate combined with a National Insurance reference, or a Biometric Residence Permit showing
          indefinite leave to remain. Once you have checked and copied these, you have a statutory excuse for
          the life of the employment. No follow-up check needed.
        </li>
        <li>
          <strong>List B documents</strong> — time-limited right to work. A Biometric Residence Permit with an
          expiry date, a visa vignette, or an eVisa share code. These require a repeat check before the expiry
          date. If the driver only has a digital eVisa, they must generate a new share code for each check — a
          photo of a previous document is not sufficient.
        </li>
      </ul>
      <p>
        For every driver, you should hold a clear scan or photocopy of the document, the date the check was
        carried out, and — for time-limited documents — when the next check is due.
      </p>

      <h2>The driving licence check is separate</h2>
      <p>
        Right-to-work and driving licence validity are two different checks. A driver can have indefinite leave
        to remain and a licence that expired last month, or one that crossed 12 penalty points three weeks ago.
        You need both checks in place.
      </p>
      <p>
        DVLA's View Driving Licence service lets you verify any UK licence online using the driver's licence
        number and National Insurance number. The driver must consent, but a check every six months is
        reasonable — and you should record both the date of each check and the result. The things to track per
        driver:
      </p>
      <ul>
        <li>
          <strong>Photocard expiry date</strong> — the photocard and any paper counterpart carry different
          dates; track the photocard.
        </li>
        <li>
          <strong>Penalty point total</strong> — and the dates on which existing endorsements expire, because
          a driver who gains points mid-employment can tip over the legal limit without anyone noticing.
        </li>
        <li>
          <strong>Licence categories</strong> — confirm the driver holds the correct entitlement for the class
          of vehicle they are driving.
        </li>
      </ul>

      <h2>Building an expiry-tracking system that actually works</h2>
      <p>
        The failure mode most DSPs fall into is a spreadsheet nobody updates and an expectation that drivers
        will self-report. Neither is reliable, and neither gives you the early warning you need to act before
        something lapses.
      </p>
      <p>
        A working expiry system needs three things:
      </p>
      <ul>
        <li>
          <strong>A single record per driver</strong> — one place where every document and expiry date is
          stored, accessible to the OSM without hunting through email threads or paper files.
        </li>
        <li>
          <strong>Automated alerts at 60, 30, and 7 days</strong> — sixty days gives you time to ask the driver
          to renew before anything lapses. Thirty days is when you should have a confirmed renewal date. Seven
          days is the escalation point.
        </li>
        <li>
          <strong>A named owner for each alert</strong> — an alert that goes to a shared inbox and no one person
          is responsible for is the same as no alert at all.
        </li>
      </ul>

      <h2>What to do when a document lapses mid-employment</h2>
      <p>
        If a driver's right-to-work document expires and they cannot provide a valid renewal, you must stop them
        working. Continuing to employ them after the expiry date invalidates the statutory excuse you built when
        you did the original check.
      </p>
      <p>
        For driving licences, the line is clearer still: an expired or disqualified licence means they cannot
        legally drive. Any delivery they complete while unlicensed puts your insurance at risk and exposes your
        DA account.
      </p>
      <p>
        The conversation is uncomfortable but necessary. Suspend them from the rota, document it in writing, and
        reinstate them as soon as they provide updated paperwork. Most drivers with a lapsed licence have simply
        forgotten to renew — a prompt, not a dismissal, is usually all that is needed.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps stores every driver's document and licence expiry dates in a central compliance dashboard. When a
        visa, Biometric Residence Permit, or driving licence photocard is approaching expiry, it surfaces as a
        flagged task for your OSM — with enough lead time to chase the driver before anything lapses. You can
        see the current compliance status of your whole fleet in one view, rather than hoping a spreadsheet cell
        hasn't been quietly out of date for months.
      </p>
      <p>
        If you want to see how DSPOps handles driver compliance tracking, you can{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we will walk through your fleet's setup live on the call.
      </p>
    </>
  );
}
