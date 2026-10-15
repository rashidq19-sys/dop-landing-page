import { Link } from "wouter";

// The dark variant carries a white "DSP" — the standard lockup's is black and
// would disappear against this footer.
import { LOGO_DARK_BG } from "@/lib/brandAssets";

const productLinks = [
  { label: "DSP Management Software", href: "/amazon-dsp-management-software" },
  { label: "Driver Performance", href: "/driver-performance-tracking" },
  { label: "Van Inspection App", href: "/van-inspection-app" },
  { label: "Rota Management", href: "/dsp-rota-management" },
  { label: "Invoicing & Payroll", href: "/dsp-invoicing-payroll" },
  { label: "Compliance Tools", href: "/dsp-compliance-tools" },
  { label: "Micromobility", href: "/micromobility-delivery-software" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Book a demo", href: "/#book-demo" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const internal = href.startsWith("/") && !href.includes("#") && !href.startsWith("mailto:");
  const cls = "text-[#94A3B8] hover:text-white transition-colors";
  return internal ? (
    <Link href={href} className={cls}>
      {label}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {label}
    </a>
  );
}

// For people who already use DSPOps and landed on the marketing site looking for
// the app. The navbar "Sign in" opens a lead-capture modal, so this is the real way in.
function ExistingCustomerStrip() {
  const btn =
    "inline-flex items-center justify-center rounded-xl border border-[#D5DDE8] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0A1235] hover:border-[#006AE1] hover:text-[#006AE1] transition-colors";
  return (
    <section className="bg-[#EAF3FD] font-sans">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-9 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="font-display text-[22px] sm:text-[24px] font-bold text-[#0A1235] tracking-[-0.01em]">
            Already part of a DSP using DSPOps?
          </h2>
          <p className="mt-1 text-[15px] text-[#4B5563]">Go straight to your account or get the driver app.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="https://app.dspops.app" className={btn}>
            Log in to your account
          </a>
          <Link href="/download" className={btn}>
            Get the driver app
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <>
    <ExistingCustomerStrip />
    <footer className="bg-[#111113] border-t border-white/6 font-sans">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10 text-[13px]">
          <div>
            <div className="text-white text-[12px] font-semibold uppercase tracking-[0.1em] mb-3">Product</div>
            <ul className="space-y-2">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <NavLink {...l} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-white text-[12px] font-semibold uppercase tracking-[0.1em] mb-3">Resources</div>
            <ul className="space-y-2">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <NavLink {...l} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-white text-[12px] font-semibold uppercase tracking-[0.1em] mb-3">Legal</div>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <NavLink {...l} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-white text-[12px] font-semibold uppercase tracking-[0.1em] mb-3">Contact</div>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@dspops.app" className="text-[#94A3B8] hover:text-white transition-colors break-all">
                  support@dspops.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/6 text-[13px] text-[#94A3B8]">
          <Link href="/" className="flex items-center">
            <img src={LOGO_DARK_BG} alt="DSPOps" className="h-7 w-auto" />
          </Link>
          <span>© {new Date().getFullYear()} Layerform System Limited, trading as DSPOps · Amazon DSP management software for UK Delivery Service Partners</span>
        </div>

        {/* Substantiation for the time-saved figures and the roadmap badge, plus the
            trademark notice. Every claim these qualify appears on the homepage. */}
        <p className="mt-5 text-[11.5px] leading-[1.6] text-[#6B7A99] max-w-[95ch]">
          Product screens show DSPOps running a demonstration fleet with sample data. Time savings
          are estimates based on what operators using DSPOps report; your results will vary.
          The live check-in map and arrival ETA are in development and not available today. Amazon, Amazon Cortex and
          Delivery Service Partner are trademarks of Amazon.com, Inc. DSPOps is an independent
          product and is not affiliated with or endorsed by Amazon.
        </p>
      </div>
    </footer>
    </>
  );
}
