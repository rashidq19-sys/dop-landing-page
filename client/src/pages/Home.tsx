/*
 * Design: Clean Logistics Blueprint — Swiss Design meets SaaS
 * Page: Landing page with all 14 sections assembled per redesign spec
 * Typography: DM Sans throughout
 * Colors: Off-white bg, navy text, blue brand accents
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemsSection from "@/components/ProblemsSection";
import OwnerSection from "@/components/OwnerSection";
import OSMSection from "@/components/OSMSection";
import DriverPortalSection from "@/components/DriverPortalSection";
import NewFeaturesSection from "@/components/NewFeaturesSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* 1. Hero + Trust Bar */}
        <HeroSection />
        {/* 2. Problems */}
        <ProblemsSection />
        {/* 3. For DSP Owners */}
        <OwnerSection />
        {/* 4. For OSMs */}
        <OSMSection />
        {/* 5. Driver Portal */}
        <DriverPortalSection />
        {/* 6. New Features */}
        <NewFeaturesSection />
        {/* 7. Features */}
        <FeaturesSection />
        {/* 8. How It Works */}
        <HowItWorksSection />
        {/* 9. Before & After */}
        <BeforeAfterSection />
        {/* 10. Pricing */}
        <PricingSection />
        {/* 11. FAQ */}
        <FAQSection />
        {/* 12. Final CTA */}
        <CTASection />
      </main>
      <Footer />
      {/* Floating chatbot widget — outside main, fixed position overlay */}
      <ChatbotWidget />
    </div>
  );
}
