import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function Blog() {
  usePageMeta({
    title: "DSPOps Blog — Practical guides for UK Amazon DSPs",
    description:
      "Practical guides on Amazon Cortex, DSP operations, payroll, rota management and same-day delivery — written for UK DSP owners.",
    canonicalPath: "/blog",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[68px]">
        {/* Header */}
        <section className="bg-background border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-4">
              — DSPOPS BLOG
            </div>
            <h1 className="text-[36px] sm:text-[56px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02] max-w-[820px]">
              Practical guides for UK Amazon DSPs.
            </h1>
            <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[700px]">
              Plain-English playbooks on Cortex, scorecards, rota management, payroll, and same-day delivery —
              written for the people actually running DSPs.
            </p>
          </div>
        </section>

        {/* Post list */}
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-background rounded-[16px] border border-border p-6 sm:p-8 hover:border-brand transition-colors"
                >
                  <div className="flex items-center gap-3 text-[12px] text-[#6C6C72] uppercase tracking-[0.1em]">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span>·</span>
                    <span>{post.readingMinutes} min read</span>
                  </div>
                  <h2 className="mt-3 text-[24px] sm:text-[30px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.15] group-hover:text-brand transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[16px] text-[#353538] leading-[1.6]">{post.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-brand">
                    Read article <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
