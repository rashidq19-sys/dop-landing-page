// Blog post registry. The `body` field references a component that renders
// the article body. Components live in client/src/content/blog/.
// When adding posts, also add an entry to client/public/sitemap.xml.

import type { ComponentType } from "react";
import ImproveCortexScorecard from "@/content/blog/improve-amazon-cortex-scorecard";
import AmazonCortexDcrScore from "@/content/blog/amazon-cortex-dcr-score";
import OnboardNewDriversAmazonDsp from "@/content/blog/how-to-onboard-new-drivers-amazon-dsp";
import ReduceDriverTurnoverAmazonDsp from "@/content/blog/reduce-driver-turnover-amazon-dsp";
import VanInspectionComplianceAmazonDsp from "@/content/blog/van-inspection-compliance-amazon-dsp";
import AmazonDspDriverBriefings from "@/content/blog/amazon-dsp-driver-briefings";
import DspRightToWorkLicenceChecks from "@/content/blog/dsp-right-to-work-licence-checks";
import ManageFuelVehicleCostsAmazonDsp from "@/content/blog/manage-fuel-vehicle-costs-amazon-dsp";
import ReduceDnrAmazonDsp from "@/content/blog/reduce-dnr-amazon-dsp";
import DspPayrollCortexLateChanges from "@/content/blog/dsp-payroll-cortex-late-changes";
import DspRotaPeakDeliverySeasons from "@/content/blog/dsp-rota-peak-delivery-seasons";

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle?: string; // overrides title in the <title> tag when set; title is always the H1
  description: string;
  excerpt: string;
  date: string; // ISO date
  readingMinutes: number;
  Body: ComponentType;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "dsp-rota-peak-delivery-seasons",
    title: "How to manage your DSP driver rota during Amazon peak delivery seasons",
    description:
      "How UK Amazon DSP owners can prepare their driver rota, staffing levels, and compliance checks for Amazon peak delivery seasons like Christmas and Prime Day.",
    excerpt:
      "Peak seasons mean more routes, more temporary drivers, and less time to fix mistakes. Here is how to build a rota process that holds up when the volume spikes.",
    date: "2026-07-27",
    readingMinutes: 5,
    Body: DspRotaPeakDeliverySeasons,
  },
  {
    slug: "dsp-payroll-cortex-late-changes",
    title: "How to handle DSP payroll when Cortex data changes late",
    description:
      "How UK Amazon DSP owners can protect their payroll process when Cortex stop credits and DNR reversals arrive after payroll has already been calculated and paid.",
    excerpt:
      "Cortex data does not always finalise when you expect it — and if your pay structure is tied to performance metrics, a late change means drivers were paid the wrong amount. Here is how to handle it.",
    date: "2026-07-20",
    readingMinutes: 5,
    Body: DspPayrollCortexLateChanges,
  },
  {
    slug: "reduce-dnr-amazon-dsp",
    title: "How to reduce DNRs at an Amazon DSP",
    description:
      "How UK Amazon DSP owners can identify the root causes of DNR claims, investigate driver patterns, and reduce Delivered Not Received rates on their Cortex scorecard.",
    excerpt:
      "A DNR means a customer says their parcel never arrived — even though Cortex says it was delivered. Here is how to investigate the patterns and fix the habits before they compound.",
    date: "2026-07-13",
    readingMinutes: 5,
    Body: ReduceDnrAmazonDsp,
  },
  {
    slug: "manage-fuel-vehicle-costs-amazon-dsp",
    title: "Managing fuel and vehicle costs as a UK Amazon DSP",
    description:
      "How UK Amazon DSP owners can track and reduce fleet running costs — from per-van fuel efficiency to preventive maintenance and peak-season readiness.",
    excerpt:
      "Fuel and vehicle costs are the second-largest DSP expense after payroll, but most operators only review them when it's too late. Here is how to stay ahead of them.",
    date: "2026-07-08",
    readingMinutes: 5,
    Body: ManageFuelVehicleCostsAmazonDsp,
  },
  {
    slug: "dsp-right-to-work-licence-checks",
    title: "Managing right-to-work checks and licence expiry for DSP drivers",
    description:
      "How UK Amazon DSP owners can track driver right-to-work documents and driving licence expiry dates — before they become an audit or insurance problem.",
    excerpt:
      "A lapsed visa or expired driving licence sitting unnoticed on your rota is a compliance exposure most DSPs only discover too late. Here is how to stay ahead of it.",
    date: "2026-06-29",
    readingMinutes: 5,
    Body: DspRightToWorkLicenceChecks,
  },
  {
    slug: "amazon-dsp-driver-briefings",
    title: "How to run effective driver briefings before a delivery wave",
    description:
      "How UK Amazon DSP owners can run a 10-minute pre-wave driver briefing that improves POD, CC, and DCR — without adding more meetings to the day.",
    excerpt:
      "Most DSP driver briefings are rushed and generic. A ten-minute structured briefing with yesterday's Cortex data does more for your scorecard than any retraining session.",
    date: "2026-06-22",
    readingMinutes: 5,
    Body: AmazonDspDriverBriefings,
  },
  {
    slug: "van-inspection-compliance-amazon-dsp",
    title: "Van inspection compliance: what Amazon audits and what DSPs miss",
    description:
      "What Amazon checks in a van inspection audit, where UK DSPs fall short on vehicle compliance, and how to build a daily walkaround routine that holds up under scrutiny.",
    excerpt:
      "Van inspections feel administrative until the day they aren't. Here is what Amazon audits, where most DSPs have gaps, and how to build a process that actually holds up.",
    date: "2026-06-15",
    readingMinutes: 5,
    Body: VanInspectionComplianceAmazonDsp,
  },
  {
    slug: "reduce-driver-turnover-amazon-dsp",
    title: "How to reduce driver turnover at an Amazon DSP",
    description:
      "Practical steps UK Amazon DSP owners can take to reduce driver churn — from structured 90-day onboarding to rota visibility and daily performance feedback.",
    excerpt:
      "Driver turnover is one of the most expensive problems a DSP can face. Here are the operational changes that keep drivers around long-term.",
    date: "2026-06-08",
    readingMinutes: 5,
    Body: ReduceDriverTurnoverAmazonDsp,
  },
  {
    slug: "how-to-onboard-new-drivers-amazon-dsp",
    title: "How to onboard new drivers at an Amazon DSP",
    description:
      "A step-by-step guide to onboarding new Amazon DSP drivers in the UK — right-to-work checks, licence verification, station induction, and the two-week follow-up routine.",
    excerpt:
      "Most DSP driver problems start in week one. Here is the compliance checklist and two-week routine that turns new starters into consistent performers.",
    date: "2026-06-01",
    readingMinutes: 5,
    Body: OnboardNewDriversAmazonDsp,
  },
  {
    slug: "amazon-cortex-dcr-score",
    title: "What is a good Amazon Cortex DCR score, and how do you improve it?",
    metaTitle: "Amazon Cortex DCR Score: What's Good and How to Improve It",
    description:
      "What DCR means on your Amazon Cortex scorecard, what counts as a good score, and the exact steps UK DSPs use to push it higher.",
    excerpt:
      "Your Amazon Cortex DCR score defines your week. Here's what counts as a good score, why it drops, and the per-driver playbook to fix it fast.",
    date: "2026-05-29",
    readingMinutes: 7,
    Body: AmazonCortexDcrScore,
  },
  {
    slug: "improve-amazon-cortex-scorecard",
    title: "How to improve your Amazon Cortex scorecard",
    description:
      "A practical guide for DSP owners on lifting DCR, DPMO, DNRs, POD, CC, and CDF — week by week.",
    excerpt:
      "Every Amazon DSP owner stares at the Cortex scorecard on Monday. Here's the per-metric playbook to actually move the numbers.",
    date: "2026-05-18",
    readingMinutes: 7,
    Body: ImproveCortexScorecard,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
