import { Link } from "wouter";
import { ArrowRight, Calendar, Smartphone, Bell, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ChatbotWidget from "@/components/ChatbotWidget";
import SeoFaqAccordion from "@/components/SeoFaqAccordion";
import { usePageMeta, faqJsonLd, breadcrumbJsonLd } from "@/hooks/usePageMeta";
import type { Faq } from "@shared/faqs";

const faqs: Faq[] = [
  {
    question: "How do drivers update their availability?",
    answer:
      "Every driver gets a one-tap login link via text. Inside the portal they tick the days they're available, request time off, and flag any route preferences. The office sees availability fill in live as the week takes shape.",
  },
  {
    question: "Can the rota handle Same-Day Delivery routes?",
    answer:
      "Yes — SDD waves are managed separately from standard delivery routes, with their own driver pool and time constraints. Owners running both contract types see everything in one fleet-wide view but the rotas don't mix.",
  },
  {
    question: "What happens when a driver calls off sick at 4 AM?",
    answer:
      "Open DSPOps, see who's already marked themselves available, message them in two taps, and publish the change. Drivers see the update in their portal instantly — no chasing on WhatsApp.",
  },
  {
    question: "Do we have to migrate from our current rota spreadsheet?",
    answer:
      "The team imports your current driver list and recent rota history from CSV during onboarding, so you don't lose what you've already built. Most DSPs are running the live rota inside DSPOps within 20 minutes.",
  },
  {
    question: "Can drivers view the rota offline?",
    answer:
      "The portal is designed to remain usable on patchy signal, so drivers can check their assigned route and start time even when reception is poor at depot or on the road.",
  },
];

const otherPages = [
  { name: "Driver performance tracking", href: "/driver-performance-tracking" },
  { name: "Van inspection app", href: "/van-inspection-app" },
  { name: "Invoicing and payroll support", href: "/dsp-invoicing-payroll" },
  { name: "Compliance tools", href: "/dsp-compliance-tools" },
  { name: "DSP management software overview", href: "/amazon-dsp-management-software" },
];

export default function DspRotaManagement() {
  usePageMeta({
    title: "DSP Rota Management Software | DSPOps",
    description:
      "Driver rota management software for UK Amazon DSPs. Drivers set their own availability in the portal, the rota assembles itself, and last-minute cover is reassigned in two taps.",
    canonicalPath: "/dsp-rota-management",
    jsonLd: [
      faqJsonLd(faqs),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "DSP Rota Management", path: "/dsp-rota-management" },
      ]),
    ],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[68px]">
        <section className="bg-background border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
            <nav aria-label="Breadcrumb" className="text-[12px] text-[#6C6C72] mb-4">
              <Link href="/" className="hover:text-[#111113]">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-[#353538]">DSP Rota Management</span>
            </nav>
            <h1 className="text-[36px] sm:text-[56px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02] max-w-[820px]">
              DSP rota management built for how Amazon DSPs actually run.
            </h1>
            <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[760px]">
              Drivers set their own availability inside the driver portal. The weekly rota assembles itself, and
              last-minute cover is reassigned in two taps. Designed to replace the Excel rota and the 4 AM
              "who can cover?" call.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#book-demo"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-lg text-[15px] font-bold hover:bg-brand-dark transition-colors"
              >
                Book a 20-min demo <ArrowRight size={16} />
              </a>
              <Link
                href="/amazon-dsp-management-software"
                className="inline-flex items-center gap-2 px-5 py-3 text-[#353538] text-[15px] font-semibold hover:text-[#111113] transition-colors"
              >
                See the full platform →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — THE PROBLEM
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                Most DSPs build the rota in Excel on a Friday and chase availability on WhatsApp all weekend.
              </h2>
            </div>
            <div className="text-[16px] text-[#353538] leading-[1.65] space-y-4">
              <p>
                A shared spreadsheet someone overwrites. Versions in the group chat nobody trusts. Friday's rota
                published, Sunday's calls confirmed, Monday's gaps filled at 5 AM. Every week, the same workflow,
                the same wasted hours.
              </p>
              <p>
                The problem isn't the spreadsheet — it's the workflow around it. Without a single place where
                drivers can put their availability and the office can see it filling in, every change needs a
                phone call.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — THE SOLUTION
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1] max-w-[760px]">
              The rota that builds itself.
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Smartphone,
                  title: "Driver self-service availability",
                  body: "Drivers tick their available days, request time off, and flag preferred routes from their portal. The office sees the week fill in live.",
                },
                {
                  icon: Calendar,
                  title: "Auto-assembling weekly view",
                  body: "Standard and Same-Day routes laid out across the week with open slots, clashes and gaps visible at a glance — by the time you publish, it's 90% done.",
                },
                {
                  icon: Bell,
                  title: "Two-tap cover reassignment",
                  body: "Driver off sick? DSPOps already knows who's marked available. Reassign in two taps, publish, and drivers see the update instantly.",
                },
                {
                  icon: RefreshCw,
                  title: "SDD-aware separation",
                  body: "Same-Day Delivery rota is managed separately with its own driver pool and wave timings — never mixed in with standard routes.",
                },
              ].map((it) => (
                <div key={it.title} className="bg-white rounded-[14px] border border-border p-6">
                  <it.icon size={22} className="text-brand" />
                  <h3 className="mt-4 text-[17px] font-bold text-[#111113]">{it.title}</h3>
                  <p className="mt-2 text-[14px] text-[#6C6C72] leading-[1.6]">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
                — HOW IT WORKS
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#111113] tracking-[-0.02em] leading-[1.1]">
                From spreadsheet to self-service in 20 minutes.
              </h2>
              <div className="mt-8 space-y-5">
                {[
                  { step: "01", title: "Import drivers from CSV", body: "Your current driver list is pulled straight from your existing spreadsheet during onboarding." },
                  { step: "02", title: "Drivers log in via the portal", body: "Each driver gets a text with a one-tap login. No app store, no download required." },
                  { step: "03", title: "Drivers set availability themselves", body: "Each driver marks the days they can work, requests holiday and flags route preferences." },
                  { step: "04", title: "Publish the rota in one click", body: "Drag-and-drop to assign — drivers see updates in real time inside the portal." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="text-[20px] font-extrabold text-brand tracking-tight w-[40px] shrink-0">{s.step}</div>
                    <div>
                      <h3 className="text-[16px] font-bold text-[#111113]">{s.title}</h3>
                      <p className="mt-1 text-[14px] text-[#6C6C72] leading-[1.6]">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-b from-background to-border/40 rounded-[16px] border border-border p-6 sm:p-9 flex items-center justify-center">
              <img
                src="/images/rota-phone-v2.png"
                alt="DSPOps DSP rota on a phone"
                loading="lazy"
                className="max-h-[480px] rounded-[22px] shadow-[0_25px_60px_-12px_rgba(17,17,19,0.28)]"
              />
            </div>
          </div>
        </section>

        <section className="bg-background py-16 sm:py-24 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">FAQ</span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#111113] tracking-tight">
                  DSP rota management — common questions.
                </h2>
              </div>
              <SeoFaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>

        <section className="bg-white py-12 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-4">
              — EXPLORE THE PLATFORM
            </div>
            <div className="flex flex-wrap gap-3">
              {otherPages.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-full text-[13px] font-semibold text-[#353538] hover:border-brand hover:text-brand transition-colors"
                >
                  {p.name} <ArrowRight size={12} />
                </Link>
              ))}
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
