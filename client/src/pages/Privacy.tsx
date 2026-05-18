/*
 * Page: Privacy Policy
 * Layout: Same shell as Home — Navbar + content + Footer + ChatbotWidget
 */

import Navbar from "@/components/Navbar";
import PrivacyPage from "@/components/PrivacyPage";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Privacy() {
  usePageMeta({
    title: "Privacy Policy | DSPOps",
    description:
      "DSPOps Privacy Policy. Information on the personal data we collect, how it's used, third-party subprocessors, UK GDPR rights and how to contact us.",
    canonicalPath: "/privacy",
  });

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
