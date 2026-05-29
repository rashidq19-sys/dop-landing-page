// Blog post registry. The `body` field references a component that renders
// the article body. Components live in client/src/content/blog/.
// When adding posts, also add an entry to client/public/sitemap.xml.

import type { ComponentType } from "react";
import ImproveCortexScorecard from "@/content/blog/improve-amazon-cortex-scorecard";
import AmazonCortexDcrScore from "@/content/blog/amazon-cortex-dcr-score";

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
