import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatChangesSection from "@/components/home/WhatChangesSection";
import PlatformSection from "@/components/home/PlatformSection";
import EssentialsSection from "@/components/home/EssentialsSection";
import DriverAppSection from "@/components/home/DriverAppSection";
import PricingSection from "@/components/PricingSection";
import SEOOverviewSection from "@/components/SEOOverviewSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { usePageMeta, faqJsonLd } from "@/hooks/usePageMeta";
import { faqs } from "@shared/faqs";

export default function Home() {
  usePageMeta({
    title: "DSPOps — Amazon DSP Management Platform for UK Delivery Service Partners",
    description:
      "Run your Amazon DSP from one screen. DSPOps brings rota, driver performance, van inspections, payroll and compliance into a single UK-built platform. 7-day free trial.",
    canonicalPath: "/",
    jsonLd: faqJsonLd(faqs),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Light / navy / light / navy — the rhythm that separates "what it does"
            from "what it changes" without needing a divider between every block. */}
        <HeroSection />
        <WhatChangesSection />
        <PlatformSection />
        <EssentialsSection />
        <DriverAppSection />
        <PricingSection />
        <SEOOverviewSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
