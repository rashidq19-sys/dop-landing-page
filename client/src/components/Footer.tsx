import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dop-logo_ba62af1c.png";

const productLinks = [
  { label: "Rota", href: "/features/rota" },
  { label: "Payroll", href: "/features/payroll" },
  { label: "Scorecard", href: "/features/scorecard" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "#" },
  { label: "Security", href: "#" },
];

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
                  <Link href={l.href} className="text-[#94A3B8] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-white text-[12px] font-semibold uppercase tracking-[0.1em] mb-3">Resources</div>
            <ul className="space-y-2">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("/") && !l.href.includes("#") ? (
                    <Link href={l.href} className="text-[#94A3B8] hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="text-[#94A3B8] hover:text-white transition-colors">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-white text-[12px] font-semibold uppercase tracking-[0.1em] mb-3">Legal</div>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className="text-[#94A3B8] hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="text-[#94A3B8] hover:text-white transition-colors">
                      {l.label}
                    </a>
                  )}
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
          <span>© {new Date().getFullYear()} DSPOps Ltd · Operations platform for UK Amazon DSPs</span>
        </div>
      </div>
    </footer>
  );
}
