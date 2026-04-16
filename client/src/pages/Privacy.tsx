/*
 * Page: Privacy Policy
 * Layout: Same shell as Home — Navbar + content + Footer + ChatbotWidget
 */

import Navbar from "@/components/Navbar";
import PrivacyPage from "@/components/PrivacyPage";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PrivacyPage />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
