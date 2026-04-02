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
import HowItWorksSection from "@/components/HowItWorksSection";
import MorningStoryboardSection from "@/components/MorningStoryboardSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import CostCalculatorSection from "@/components/CostCalculatorSection";
import VideoSection from "@/components/VideoSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

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
        {/* 6. How It Works */}
        <HowItWorksSection />
        {/* 7. A Morning With DSPOps */}
        <MorningStoryboardSection />
        {/* 8. Before vs After */}
        <BeforeAfterSection />
        {/* 9. Cost Calculator */}
        <CostCalculatorSection />
        {/* 10. Video Demo */}
        <VideoSection />
        {/* 11. Pricing */}
        <PricingSection />
        {/* 12. FAQ */}
        <FAQSection />
        {/* 13. Final CTA */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
