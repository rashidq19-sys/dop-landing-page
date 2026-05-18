import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ChatbotWidget from "@/components/ChatbotWidget";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Link } from "wouter";
import { Calendar, Smartphone, RefreshCw, Bell, ArrowRight } from "lucide-react";

export default function FeatureRota() {
  usePageMeta({
    title: "Rota management for Amazon DSPs | DSPOps",
    description:
      "Stop building your rota in a spreadsheet. DSPOps lets drivers choose their availability from their own portal — it syncs straight to your weekly rota with no chasing required.",
    canonicalPath: "/features/rota",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[68px]">
        {/* Hero */}
        <section className="bg-background border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-4">
              — ROTA MODULE
            </div>
            <h1 className="text-[36px] sm:text-[56px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02] max-w-[820px]">
              Rota management built for how Amazon DSPs actually run.
            </h1>
            <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[760px]">
              Most DSP owners still build the rota in Excel on a Friday night, then spend the weekend chasing drivers
              on WhatsApp to confirm. DSPOps flips that around — drivers update their own availability inside the
              driver portal, and the rota assembles itself.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#book-demo"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-lg text-[15px] font-bold hover:bg-brand-dark transition-colors"
              >
                Book a 20-min demo <ArrowRight size={16} />
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 text-[#353538] text-[15px] font-semibold hover:text-[#111113] transition-colors"
              >
                See the full platform →
              </Link>
            </div>
          </div>
        </section>

        {/* Screenshot + lead copy */}
        <section className="bg-white py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                The weekly rota that builds itself.
              </h2>
              <p className="mt-5 text-[16px] text-[#353538] leading-[1.65]">
                Every driver gets their own login. Inside the portal they tick which days they're available, request
                time off, and flag the routes they prefer. As the week fills in, you see it live — open slots, gaps,
                clashes — all in one view. By the time you sit down to publish, the rota is 90% done.
              </p>
              <p className="mt-4 text-[16px] text-[#353538] leading-[1.65]">
                When a driver calls off sick at 4 AM, you don't dig through Excel and a group chat. You open DSPOps,
                see who's already marked themselves available, message them in two taps, and publish the update —
                drivers see the change in their portal instantly.
              </p>
            </div>
            <div className="bg-gradient-to-b from-background to-border/40 rounded-[16px] border border-border p-6 sm:p-9 flex items-center justify-center">
              <img
                src="/images/rota-phone-v2.png"
                alt="DSPOps rota on a phone"
                className="max-h-[480px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]"
              />
            </div>
          </div>
        </section>

        {/* What it replaces */}
        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — WHAT IT REPLACES
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1] max-w-[700px]">
              No more Excel, no more WhatsApp chaos.
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Calendar,
                  title: "Excel rota spreadsheet",
                  body: "The shared file someone always overwrites. Versions in the WhatsApp group nobody trusts. Gone.",
                },
                {
                  icon: Smartphone,
                  title: "Driver WhatsApp groups",
                  body: "Stop screenshotting tomorrow's routes into a chat with 30 drivers. The portal pushes it straight to their phones.",
                },
                {
                  icon: Bell,
                  title: "4 AM 'who can cover?' calls",
                  body: "DSPOps already knows who's available. Reassign in two taps and every driver sees the update live.",
                },
              ].map((it) => (
                <div
                  key={it.title}
                  className="bg-white rounded-[14px] border border-border p-6 shadow-[0_1px_2px_rgba(17,17,19,0.04)]"
                >
                  <it.icon size={22} className="text-brand" />
                  <h3 className="mt-4 text-[17px] font-bold text-[#111113]">{it.title}</h3>
                  <p className="mt-2 text-[14px] text-[#6C6C72] leading-[1.6]">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — HOW IT WORKS
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1] max-w-[700px]">
              From spreadsheet to self-service in 20 minutes.
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                {
                  step: "01",
                  title: "Import drivers from CSV",
                  body: "We pull your current driver list straight from your existing spreadsheet — names, contact details, contract type.",
                },
                {
                  step: "02",
                  title: "Drivers log in via the portal",
                  body: "Every driver gets a text with a one-tap login. They open it on their phone, no app download required.",
                },
                {
                  step: "03",
                  title: "Drivers set availability themselves",
                  body: "Inside the portal each driver marks the days they can work, requests holiday, and flags route preferences.",
                },
                {
                  step: "04",
                  title: "Publish the rota in one click",
                  body: "You see every day, every wave, every driver. Drag-and-drop to assign — drivers see updates in real time.",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-5">
                  <div className="text-[24px] font-extrabold text-brand tracking-tight w-[44px] shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#111113]">{s.title}</h3>
                    <p className="mt-2 text-[15px] text-[#353538] leading-[1.6]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SDD support */}
        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — SDD-READY
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Same-Day rotas, separately managed.
              </h2>
              <p className="mt-5 text-[16px] text-[#353538] leading-[1.65]">
                If you run both standard and Same-Day Delivery contracts, you know mixing them in the same rota is a
                disaster. DSPOps gives SDD its own wave view, its own driver pool, and its own time constraints —
                without forcing you to manage two systems. Everything still rolls up into one fleet-wide dashboard.
              </p>
              <div className="mt-6 flex items-center gap-3 text-[14px] text-[#6C6C72]">
                <RefreshCw size={16} className="text-brand" />
                <span>Standard and SDD waves are tracked separately — no overlap, no chaos.</span>
              </div>
            </div>
            <div className="bg-white rounded-[16px] border border-border p-6">
              <div className="text-[12px] text-[#6C6C72] uppercase tracking-[0.1em]">TIME SAVED</div>
              <div className="text-[44px] font-extrabold text-[#111113] tracking-[-0.02em] mt-1">~9 hours / week</div>
              <p className="mt-3 text-[14px] text-[#6C6C72] leading-[1.6]">
                Average rota-building time reported by DSPOps customers vs. their previous Excel + WhatsApp workflow.
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
