const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dop-logo_ba62af1c.png";

export default function Footer() {
  return (
    <footer className="bg-[#111113] py-10 border-t border-white/6">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#94A3B8] font-sans">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="DSPOps" className="w-6 h-6 rounded-md" />
            <span className="font-extrabold text-white tracking-tight text-[15px]">DSP<span className="text-brand">Ops</span></span>
          </a>
          <span>© {new Date().getFullYear()} DSPOps Ltd</span>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          {[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "#" },
            { label: "Security", href: "#" },
            { label: "support@dspops.app", href: "mailto:support@dspops.app" },
          ].map(l => (
            <a key={l.label} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
