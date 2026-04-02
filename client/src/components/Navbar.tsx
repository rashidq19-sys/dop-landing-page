/*
 * Design: Clean Logistics Blueprint — Dark navy + Blue brand
 * Navbar: Sticky, transparent-to-white on scroll
 * Logo: Truck icon from brand assets
 * Color: Navy text, blue accent for CTA
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dop-logo_ba62af1c.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src={LOGO_URL}
              alt="DSP Operations Platform"
              className="w-9 h-9 rounded-lg"
            />
            <span className="text-navy font-bold text-lg tracking-tight">
              DSP<span className="text-brand">Ops</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy/70 hover:text-navy transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#book-demo"
              className="text-sm font-medium text-navy/70 hover:text-navy transition-colors px-4 py-2"
            >
              Book Demo
            </a>
            <a
              href="#pricing"
              className="text-sm font-semibold text-white bg-brand hover:bg-brand-dark transition-colors px-5 py-2.5 rounded-lg"
            >
              Get Early Access
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-navy"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-navy/70 hover:text-navy hover:bg-slate-light rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-border mt-3">
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center text-sm font-semibold text-white bg-brand hover:bg-brand-dark transition-colors px-5 py-2.5 rounded-lg"
              >
                Get Early Access
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
