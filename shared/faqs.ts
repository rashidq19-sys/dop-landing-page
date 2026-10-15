// Single source of truth for FAQs. Used by FAQSection.tsx and Home.tsx (FAQPage JSON-LD).

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Do I need to share driver data for the demo?",
    answer:
      "No. We show a sample depot first. Using your own data is an optional later step once you’ve decided the product is worth exploring.",
  },
  {
    question: "Do I have to move everything at once?",
    answer:
      "No. Onboarding starts with one workflow. Use the demo to discuss a sensible rollout for your depot and what setup it will need.",
  },
  {
    question: "Can drivers use it on their phones?",
    answer:
      "Yes. DSPOps supports iOS, Android and phone browsers. Drivers can access shifts, check-in and other operational information from their phone.",
  },
  {
    question: "What happens after I request a demo?",
    answer:
      "You get a confirmation email, then you can pick a time for your demo from the calendar on the same page.",
  },
  {
    question: "Who is behind DSPOps?",
    answer:
      "DSPOps is operated by Layerform System Limited and was built by a former on-site manager. It is independent and is not affiliated with or endorsed by Amazon.",
  },
];
