import { Link } from "wouter";
import { ArrowRight, Home as HomeIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta({
    title: "Page not found | DSPOps",
    description: "The page you're looking for doesn't exist. Head back to the DSPOps homepage or book a 20-minute demo.",
    noindex: true,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-[68px]">
        <section className="max-w-[1100px] mx-auto px-4 sm:px-8 py-20 sm:py-28 text-center">
          <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
            — 404
          </div>
          <h1 className="text-[40px] sm:text-[64px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02]">
            Page not found.
          </h1>
          <p className="mt-6 text-[18px] sm:text-[20px] text-[#353538] leading-[1.55] max-w-[640px] mx-auto">
            We couldn't find the page you were looking for. It may have moved, or the link might be wrong.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-lg text-[15px] font-bold hover:bg-brand-dark transition-colors"
            >
              <HomeIcon size={16} /> Go to homepage
            </Link>
            <Link
              href="/#book-demo"
              className="inline-flex items-center gap-2 px-5 py-3 border border-border text-[#111113] rounded-lg text-[15px] font-bold hover:border-brand hover:text-brand transition-colors"
            >
              Book a 20-min demo <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-16 text-left max-w-[760px] mx-auto">
            <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3">
              — POPULAR PAGES
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[15px]">
              <li>
                <Link href="/amazon-dsp-management-software" className="text-[#111113] hover:text-brand font-semibold">
                  Amazon DSP management software →
                </Link>
              </li>
              <li>
                <Link href="/driver-performance-tracking" className="text-[#111113] hover:text-brand font-semibold">
                  Driver performance tracking →
                </Link>
              </li>
              <li>
                <Link href="/van-inspection-app" className="text-[#111113] hover:text-brand font-semibold">
                  Van inspection app →
                </Link>
              </li>
              <li>
                <Link href="/dsp-rota-management" className="text-[#111113] hover:text-brand font-semibold">
                  DSP rota management →
                </Link>
              </li>
              <li>
                <Link href="/dsp-invoicing-payroll" className="text-[#111113] hover:text-brand font-semibold">
                  Invoicing and payroll →
                </Link>
              </li>
              <li>
                <Link href="/dsp-compliance-tools" className="text-[#111113] hover:text-brand font-semibold">
                  DSP compliance tools →
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
