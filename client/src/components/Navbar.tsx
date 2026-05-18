import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import SignInModal from "./SignInModal";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dop-logo_ba62af1c.png";

const featuresMenu: { label: string; href: string; desc: string }[] = [
  { label: "Driver Performance", href: "/driver-performance-tracking", desc: "Cortex scorecard, per driver and per route" },
  { label: "Van Inspections", href: "/van-inspection-app", desc: "Daily van checks with photos and video" },
  { label: "Rota Management", href: "/dsp-rota-management", desc: "Driver self-service availability and cover" },
  { label: "Invoicing & Payroll", href: "/dsp-invoicing-payroll", desc: "Pay calculated from Amazon Cortex" },
  { label: "Compliance Tools", href: "/dsp-compliance-tools", desc: "Right-to-Work, licences, GDPR" },
  { label: "Platform Overview", href: "/amazon-dsp-management-software", desc: "How DSPOps fits together" },
];

const topLinks = [
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog", internal: true },
  { label: "Contact", href: "mailto:support@dspops.app" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (featuresRef.current && !featuresRef.current.contains(e.target as Node)) {
        setFeaturesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/90 backdrop-blur-[12px] border-b border-border" : "bg-transparent"
    }`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="DSPOps" className="w-9 h-9 rounded-lg" />
            <span className="text-[#111113] font-bold text-lg tracking-tight">
              DSP<span className="text-brand">Ops</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-[26px] text-sm font-medium text-[#353538]">
            <Link href="/" className="hover:text-[#111113] transition-colors">
              Home
            </Link>
            {/* Features dropdown */}
            <div ref={featuresRef} className="relative">
              <button
                onClick={() => setFeaturesOpen((v) => !v)}
                onMouseEnter={() => setFeaturesOpen(true)}
                aria-expanded={featuresOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1 hover:text-[#111113] transition-colors"
              >
                Features
                <ChevronDown size={14} className={`transition-transform ${featuresOpen ? "rotate-180" : ""}`} />
              </button>
              {featuresOpen && (
                <div
                  onMouseLeave={() => setFeaturesOpen(false)}
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-[340px] bg-white rounded-[12px] border border-border shadow-[0_20px_50px_-12px_rgba(17,17,19,0.18)] p-2"
                >
                  {featuresMenu.map((f) => (
                    <Link
                      key={f.href}
                      href={f.href}
                      onClick={() => setFeaturesOpen(false)}
                      className="block px-3 py-2.5 rounded-lg hover:bg-background transition-colors"
                      role="menuitem"
                    >
                      <div className="text-[14px] font-semibold text-[#111113]">{f.label}</div>
                      <div className="text-[12px] text-[#6C6C72] mt-0.5">{f.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {topLinks.map((l) =>
              l.internal ? (
                <Link key={l.href} href={l.href} className="hover:text-[#111113] transition-colors">
                  {l.label}
                </Link>
              ) : (
                <a key={l.href + l.label} href={l.href} className="hover:text-[#111113] transition-colors">
                  {l.label}
                </a>
              )
            )}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button onClick={() => setSignInOpen(true)} className="text-sm font-medium text-[#353538] hover:text-[#111113] transition-colors px-2">Sign in</button>
            <a href="/#book-demo" className="px-4 py-[9px] bg-[#111113] text-white rounded-lg text-sm font-semibold hover:bg-[#353538] transition-colors">
              Book demo →
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close menu" : "Open menu"} className="lg:hidden p-2 text-[#111113]">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {signInOpen && <SignInModal onClose={() => setSignInOpen(false)} />}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border px-4 py-4 space-y-1 max-h-[calc(100vh-68px)] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 text-sm font-medium text-[#353538] hover:text-[#111113] hover:bg-background rounded-lg transition-colors"
          >
            Home
          </Link>
          <div className="border-t border-border my-2" />
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6C6C72]">
            Features
          </div>
          {featuresMenu.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-[#353538] hover:text-[#111113] hover:bg-background rounded-lg transition-colors"
            >
              {f.label}
            </Link>
          ))}
          <div className="border-t border-border my-2" />
          {topLinks.map((l) =>
            l.internal ? (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-[#353538] hover:text-[#111113] hover:bg-background rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href + l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-[#353538] hover:text-[#111113] hover:bg-background rounded-lg transition-colors"
              >
                {l.label}
              </a>
            )
          )}
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <button onClick={() => { setMobileOpen(false); setSignInOpen(true); }}
              className="block w-full text-center text-sm font-medium text-[#353538] hover:text-[#111113] px-5 py-2.5 rounded-lg transition-colors">
              Sign in
            </button>
            <a href="/#book-demo" onClick={() => setMobileOpen(false)}
              className="block w-full text-center text-sm font-semibold text-white bg-[#111113] px-5 py-2.5 rounded-lg">
              Book demo →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
