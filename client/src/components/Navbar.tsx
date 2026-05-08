import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import SignInModal from "./SignInModal";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dop-logo_ba62af1c.png";

const navLinks: { label: string; href: string }[] = [
  { label: "Platform", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "mailto:support@dspops.app" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/90 backdrop-blur-[12px] border-b border-border" : "bg-transparent"
    }`}>
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="DSPOps" className="w-9 h-9 rounded-lg" />
            <span className="text-[#111113] font-bold text-lg tracking-tight">
              DSP<span className="text-brand">Ops</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-[30px] text-sm font-medium text-[#353538]">
            {navLinks.map(l => <a key={l.href + l.label} href={l.href} className="hover:text-[#111113] transition-colors">{l.label}</a>)}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button onClick={() => setSignInOpen(true)} className="text-sm font-medium text-[#353538] hover:text-[#111113] transition-colors px-2">Sign in</button>
            <a href="#book-demo" className="px-4 py-[9px] bg-[#111113] text-white rounded-lg text-sm font-semibold hover:bg-[#353538] transition-colors">
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
        <div className="lg:hidden bg-white border-t border-border px-4 py-4 space-y-1">
          {navLinks.map(l => (
            <a key={l.href + l.label} href={l.href} onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-[#353538] hover:text-[#111113] hover:bg-background rounded-lg transition-colors">
              {l.label}
            </a>
          ))}
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <button onClick={() => { setMobileOpen(false); setSignInOpen(true); }}
              className="block w-full text-center text-sm font-medium text-[#353538] hover:text-[#111113] px-5 py-2.5 rounded-lg transition-colors">
              Sign in
            </button>
            <a href="#book-demo" onClick={() => setMobileOpen(false)}
              className="block w-full text-center text-sm font-semibold text-white bg-[#111113] px-5 py-2.5 rounded-lg">
              Book demo →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
