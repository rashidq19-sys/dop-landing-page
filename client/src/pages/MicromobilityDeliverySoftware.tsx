import { Link } from "wouter";
import { ArrowRight, Bike, Clock, ShieldCheck, PoundSterling } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ChatbotWidget from "@/components/ChatbotWidget";
import SeoFaqAccordion from "@/components/SeoFaqAccordion";
import { usePageMeta, faqJsonLd, breadcrumbJsonLd } from "@/hooks/usePageMeta";
import type { Faq } from "@shared/faqs";

const faqs: Faq[] = [
  {
    question: "Does DSPOps support e-cargo bike riders?",
    answer:
      "Yes. DSPOps manages e-cargo bike riders as their own person type, with blocks, availability, pay and compliance managed alongside the rest of your operation.",
  },
  {
    question: "What about on-foot delivery rounds?",
    answer:
      "On-foot couriers are managed as Riders in DSPOps, using the same onboarding, blocks, availability and pay as e-cargo bike riders. They are not a separate person type.",
  },
  {
    question: "Can a rider work a morning and an afternoon block on the same day?",
    answer:
      "Yes. Morning and afternoon blocks can sit on the same date, so a rider can work only the morning, only the afternoon, or both.",
  },
  {
    question: "What changes in onboarding for a rider?",
    answer:
      "Rider onboarding does not require a driving licence or DVLA check. Right to work, ID, address history, medical declaration and agreements remain part of the vetting process.",
  },
  {
    question: "Can one DSP run vans, riders and same-day delivery in the same account?",
    answer:
      "Yes. DSPOps keeps one compliance list and one rota for vans, bikes and on-foot rounds. Same-day delivery is managed alongside them in its own separate wave view.",
  },
];

const otherPages = [
  { name: "Driver performance tracking", href: "/driver-performance-tracking" },
  { name: "Van inspection app", href: "/van-inspection-app" },
  { name: "DSP rota management", href: "/dsp-rota-management" },
  { name: "Invoicing and payroll support", href: "/dsp-invoicing-payroll" },
  { name: "Compliance tools", href: "/dsp-compliance-tools" },
  { name: "DSP management software overview", href: "/amazon-dsp-management-software" },
];

export default function MicromobilityDeliverySoftware() {
  usePageMeta({
    title: "Micromobility Delivery Management Software | DSPOps",
    description:
      "Micromobility delivery software for Amazon DSPs running e-cargo bikes. Manage rider onboarding, morning and afternoon blocks, availability, pay and compliance in DSPOps.",
    canonicalPath: "/micromobility-delivery-software",
    jsonLd: [
      faqJsonLd(faqs),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Micromobility Delivery Software", path: "/micromobility-delivery-software" },
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
              <span className="text-[#353538]">Micromobility Delivery Software</span>
            </nav>
            <h1 className="text-[36px] sm:text-[56px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02] max-w-[820px]">
              Micromobility delivery software for Amazon DSPs running e-cargo bikes.
            </h1>
            <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[760px]">
              Manage riders, e-cargo bike delivery blocks, availability, pay and compliance in one place. DSPOps gives
              Amazon micromobility DSPs a rota built around the way their riders actually work.
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
                Van-shaped rota software cannot express how micromobility teams work.
              </h2>
            </div>
            <div className="text-[16px] text-[#353538] leading-[1.65] space-y-4">
              <p>
                Micromobility DSPs run 3–4 hour blocks with two or three waves a day, and most riders work more than
                one block. A person can work a morning and an afternoon block on the same date, but a van-only rota
                cannot express that pattern.
              </p>
              <p>
                Rider management software needs to make those blocks visible without splitting the operation apart.
                For a fuller overview of the Amazon micromobility DSP model, read our <Link href="/blog/amazon-micromobility-dsp-guide" className="text-brand hover:text-brand-dark transition-colors">Amazon micromobility DSP guide</Link>.
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
              One rota for vans, bikes and on-foot delivery rounds.
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Bike,
                  title: "Riders as their own person type",
                  body: "Manage e-cargo bike riders as Riders, with the information and rota structure their work needs.",
                },
                {
                  icon: Clock,
                  title: "Morning and afternoon blocks",
                  body: "Riders submit their own per-block availability, whether they can work the morning, afternoon or both.",
                },
                {
                  icon: ShieldCheck,
                  title: "Licence-free rider onboarding",
                  body: "No driving licence or DVLA check for Riders, while right to work, ID and the rest of the vetting stack remain.",
                },
                {
                  icon: PoundSterling,
                  title: "Per-block pay and shared compliance",
                  body: "Pay is calculated per block, and one compliance list covers vans, bikes and on-foot rounds.",
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
                Put your rider operation on the same rota as the rest of your DSP.
              </h2>
              <div className="mt-8 space-y-5">
                {[
                  { step: "01", title: "Onboard riders without a driving licence", body: "Complete right to work, ID, address history, medical declaration and agreements without a DVLA check." },
                  { step: "02", title: "Create morning and afternoon blocks", body: "Lay out the blocks riders can work on each date, including a morning, an afternoon or both." },
                  { step: "03", title: "Riders submit per-block availability", body: "Each Rider uses the driver portal to tell the office which blocks they can work." },
                  { step: "04", title: "Manage alongside same-day delivery", body: "Keep standard vans, riders and on-foot rounds in one rota, while same-day delivery stays in its separate wave view." },
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
                alt="DSPOps rota on a phone"
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
                  Micromobility delivery software — common questions.
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
