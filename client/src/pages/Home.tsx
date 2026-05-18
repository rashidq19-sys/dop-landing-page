import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ReplacesSection from "@/components/ReplacesSection";
import FeaturesSection from "@/components/FeaturesSection";
import SEOOverviewSection from "@/components/SEOOverviewSection";
import WhatYouGetSection from "@/components/WhatYouGetSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Home() {
  usePageMeta({
    title: "Amazon DSP Management Software UK | DSPOps",
    description:
      "Manage Amazon DSP scheduling, driver performance, van inspections, invoicing and compliance from one platform. Built for UK Delivery Service Partners.",
    canonicalPath: "/",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <ReplacesSection />
        <FeaturesSection />
        <SEOOverviewSection />
        <WhatYouGetSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
