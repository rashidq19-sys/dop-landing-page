// Single source of truth for FAQs. Used by FAQSection.tsx and Home.tsx (FAQPage JSON-LD).

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "How long does setup take?",
    answer:
      "Most DSPs are running their first dispatch within 20 minutes. We import your drivers from a spreadsheet, connect your Cortex scorecard feed, and generate driver logins automatically. A full depot — every driver onboarded and using the app daily — typically settles within a week. Priority onboarding sessions are included on Professional and Enterprise plans.",
  },
  {
    question: "Does it work with Amazon Cortex?",
    answer:
      "Yes — live two-way sync. Scorecards, delivery progress, and route data flow into DSPOps automatically. No more manual re-keying, no more 'why is my score wrong?' calls.",
  },
  {
    question: "We run Same-Day Delivery. Is that supported?",
    answer:
      "Yes — SDD is a first-class module, not an afterthought. You get a separate wave view for same-day routes, tighter SLA timers, late-stop alerts, and SDD-specific payroll rates. Owners running both standard and SDD contracts see everything in one fleet-wide dashboard.",
  },
  {
    question: "Do drivers need to install anything?",
    answer:
      "DSPOps is on the App Store and Google Play, and drivers can also just open it in their phone's browser — whichever suits them. They get a login link by text either way, and it works offline: they can submit van checks, report damage and check their rota without signal.",
  },
  {
    question: "Can I cancel my other tools immediately?",
    answer:
      "Usually yes. DSPOps replaces rota spreadsheets, WhatsApp driver groups, van inspection apps, and most payroll sheets. We migrate historical data in your first week so you lose nothing.",
  },
  {
    question: "Is it GDPR compliant?",
    answer:
      "Yes — UK-hosted, GDPR-compliant. Driver data stays in the UK. We sign DPAs and provide audit logs for all data access.",
  },
  {
    question: "What if my fleet grows past a tier?",
    answer:
      "We upgrade you mid-month and prorate the difference. Starter and Professional have no per-driver fees — you simply move to the next tier when you hit the driver limit. Past 100 drivers you move to Enterprise, which is priced per active driver at a rate agreed with you, billed on a minimum of 100 drivers a month.",
  },
];
