// Single source of truth for FAQs. Used by FAQSection.tsx and Home.tsx (FAQPage JSON-LD).

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "How long does setup take?",
    answer:
      "Most DSPs are live in 20 minutes. We import your drivers from a CSV, connect your Cortex scorecard feed, and generate driver portal logins automatically. Priority onboarding sessions are included on Professional and Enterprise plans.",
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
      "No app store, no download. Drivers get a login link via text and access the portal from any phone's browser. It works offline too — they can mark vans, submit damage, check rota without signal.",
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
      "We upgrade you mid-month and prorate the difference. No per-driver fees, ever — you just move to the next tier when you hit the driver limit.",
  },
];
