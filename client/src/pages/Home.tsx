import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ReplacesSection from "@/components/ReplacesSection";
import AudiencesSection from "@/components/AudiencesSection";
import FeaturesSection from "@/components/FeaturesSection";
import DriverPortalSection from "@/components/DriverPortalSection";
import CostCalculatorSection from "@/components/CostCalculatorSection";
import WhatYouGetSection from "@/components/WhatYouGetSection";
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
        <HeroSection />
        <ReplacesSection />
        <AudiencesSection />
        <FeaturesSection />
        <DriverPortalSection />
        <CostCalculatorSection />
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
