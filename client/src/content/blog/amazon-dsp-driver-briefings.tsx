export default function AmazonDspDriverBriefings() {
  return (
    <>
      <p>
        Most DSP driver briefings are rushed — a few words before the van doors close, a reminder
        to take photos on every drop, then out the gate. By 9 AM the fleet is on the road and the
        OSM is already firefighting yesterday's problems instead of preventing today's.
      </p>
      <p>
        The pre-wave briefing is the cheapest performance management tool a DSP owner has. Done
        consistently, with the right data, it moves Cortex metrics faster than any retraining
        programme or policy memo. Done badly — or skipped — and the same problems repeat week
        after week.
      </p>

      <h2>Why the briefing matters more than most owners realise</h2>
      <p>
        Amazon's scorecard metrics — DCR, POD, CC, DNR — are measured daily, but they're shaped
        in the thirty minutes before drivers leave the station. A driver who understands exactly
        why their POD compliance matters, and who hears from their manager every morning that it's
        being tracked, makes different decisions on the road.
      </p>
      <p>
        Feedback loops in Amazon's system are long. Drivers often don't see the consequence of a
        missed contact attempt or a skipped delivery photo until the scorecard drops the following
        Monday. The morning briefing closes that loop the same day — before a problem compounds
        across a full week of routes.
      </p>

      <h2>What to cover in ten minutes or less</h2>
      <p>
        Effective briefings are short and specific. A ten-minute structure that works in practice:
      </p>
      <ul>
        <li>
          <strong>Safety update (1–2 minutes):</strong> one specific road condition, weather note,
          or incident from the previous day — not a generic "drive safely." Specific details are
          memorable; vague reminders are not.
        </li>
        <li>
          <strong>Yesterday's metric call-outs (3–4 minutes):</strong> name the two or three
          drivers whose POD, CC, or DCR numbers were below standard, and address it directly.
          Drivers who are never named take shortcuts; drivers who expect to be named don't.
        </li>
        <li>
          <strong>Address flags (2–3 minutes):</strong> any stops that generated DNR claims or
          customer complaints in the past week. Routes repeat — the same problematic addresses
          come up again. Flag them before drivers load, not after they've already attempted the
          drop.
        </li>
        <li>
          <strong>Route or staffing changes (1–2 minutes):</strong> cover-driver assignments,
          route swaps, any late changes to the wave. Unclear handovers are a common source of
          RTS events and missed stops.
        </li>
      </ul>

      <h2>The data you need before you can brief properly</h2>
      <p>
        The briefing is only as useful as the information behind it. An OSM going into a morning
        huddle without per-driver metrics from the previous day is guessing — and drivers know it.
      </p>
      <p>
        Before the briefing starts, you need to know: which drivers had POD compliance below
        threshold yesterday, which routes had CC misses, and whether any DNR flags landed
        overnight. If gathering that information takes thirty minutes of pulling Cortex exports
        and rebuilding spreadsheets, the briefing either gets skipped or happens without the
        numbers.
      </p>
      <p>
        This is the operational case for live driver-level data your OSM can open in thirty
        seconds. The briefing should take ten minutes. Finding the data to run it shouldn't take
        longer than that.
      </p>

      <h2>How to brief drivers who aren't at the station</h2>
      <p>
        Many DSPs run split shifts, use remote loading points, or have a portion of the fleet that
        doesn't come through the main station before dispatch. The briefing still matters — it just
        changes format.
      </p>
      <p>
        A WhatsApp voice note sent before drivers leave home is a pragmatic substitute. Keep it
        under ninety seconds: one safety note, two metric call-outs from yesterday, and any
        address flags relevant to that driver's area. Written briefing notes work too, but they
        get skimmed — a voice message is harder to ignore.
      </p>
      <p>
        For drivers you know won't engage on their own, a short video call just before dispatch
        achieves the same outcome and gives you the chance to confirm they understood. Fifteen
        minutes spent on this is worth more than thirty minutes managing a DNR claim in the
        afternoon.
      </p>

      <h2>Building the habit: the ten-week arc</h2>
      <p>
        The first week of consistent briefings feels awkward. Drivers aren't used to being named
        in front of their colleagues, and managers feel uncomfortable delivering direct feedback
        to a group. Push through it — the discomfort is doing the work.
      </p>
      <p>
        By week three, drivers start self-correcting before you call them out. By week six, the
        best performers are coming to the briefing early because they want to hear where they
        rank. By week ten, the briefing is part of the station's culture, and skipping it feels
        wrong to everyone — not just the manager.
      </p>
      <p>
        The one thing that kills the habit before it takes root: running a briefing without data.
        If the OSM has nothing specific to say — no driver names, no metric numbers — the session
        becomes a pep talk. Drivers tune it out within a week, and the habit never forms.
      </p>

      <h2>Where DSPOps fits in</h2>
      <p>
        DSPOps pulls the previous day's Cortex data — POD compliance, CC rates, DNR flags — into
        a single dashboard your OSM can open on a tablet while drivers are loading. Every metric
        is broken down by driver, so the names and numbers are in front of you before the briefing
        starts. No rebuilding spreadsheets, no waiting for a Cortex export to arrive.
      </p>
      <p>
        If you want to see how it looks in practice,{" "}
        <a href="#book-demo" className="text-brand font-semibold hover:underline">
          book a 20-minute demo
        </a>{" "}
        — we'll walk through a live briefing flow using your own station's data.
      </p>
    </>
  );
}
