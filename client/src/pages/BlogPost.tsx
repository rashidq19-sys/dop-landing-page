import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ChatbotWidget from "@/components/ChatbotWidget";
import NotFound from "@/pages/NotFound";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowLeft } from "lucide-react";
import { getPost } from "@/data/blogPosts";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = params.slug ? getPost(params.slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const { Body } = post;

  return <BlogPostBody post={post} Body={Body} />;
}

function BlogPostBody({
  post,
  Body,
}: {
  post: NonNullable<ReturnType<typeof getPost>>;
  Body: React.ComponentType;
}) {
  usePageMeta({
    title: `${post.title} | DSPOps`,
    description: post.description,
    canonicalPath: `/blog/${post.slug}`,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[68px]">
        <article className="bg-white">
          <div className="max-w-[760px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#6C6C72] hover:text-[#111113] transition-colors mb-8"
            >
              <ArrowLeft size={14} /> All articles
            </Link>

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
            <h1 className="mt-3 text-[36px] sm:text-[48px] font-extrabold text-[#111113] tracking-[-0.03em] leading-[1.1]">
              {post.title}
            </h1>

            <div
              className="
                mt-10 text-[17px] leading-[1.75] text-[#353538]
                [&_h2]:text-[26px] [&_h2]:font-extrabold [&_h2]:text-[#111113] [&_h2]:tracking-[-0.02em] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-[1.2]
                [&_h3]:text-[20px] [&_h3]:font-bold [&_h3]:text-[#111113] [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:mb-5
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-2
                [&_li]:marker:text-brand
                [&_strong]:text-[#111113] [&_strong]:font-bold
                [&_a]:text-brand [&_a]:font-semibold hover:[&_a]:underline
              "
            >
              <Body />
            </div>
          </div>
        </article>

        <CTASection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
