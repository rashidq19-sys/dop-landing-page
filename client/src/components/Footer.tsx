import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dop-logo_ba62af1c.png";

const productLinks = [
  { label: "DSP Management Software", href: "/amazon-dsp-management-software" },
  { label: "Driver Performance", href: "/driver-performance-tracking" },
  { label: "Van Inspection App", href: "/van-inspection-app" },
  { label: "Rota Management", href: "/dsp-rota-management" },
  { label: "Invoicing & Payroll", href: "/dsp-invoicing-payroll" },
  { label: "Compliance Tools", href: "/dsp-compliance-tools" },
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

export default function Footer() {
  return (
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
          <Link href="/" className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="DSPOps" className="w-6 h-6 rounded-md" />
            <span className="font-extrabold text-white tracking-tight text-[15px]">
              DSP<span className="text-brand">Ops</span>
            </span>
          </Link>
          <span>© {new Date().getFullYear()} DSPOps Ltd · Amazon DSP management software for UK Delivery Service Partners</span>
        </div>
      </div>
    </footer>
  );
}
