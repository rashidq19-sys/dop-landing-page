const PORTAL_SCREENS = [
  { src: "/images/portal/home.jpeg", label: "Deployment", desc: "Wave, route, van, cage — every morning, clearly laid out." },
  { src: "/images/portal/rota.jpeg", label: "Availability", desc: "Drivers set their own rota. OSM locks it when ready." },
  { src: "/images/portal/scorecards.jpeg", label: "Scorecards", desc: "Cortex metrics live. Drivers see their score — fewer calls." },
  { src: "/images/portal/invoice.jpeg", label: "Payslips", desc: "Auto-generated. PDF download. Zero questions." },
];

export default function DriverPortalSection() {
  return (
    <section id="driver-portal" className="bg-background py-[70px] sm:py-[100px] border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold text-brand uppercase tracking-[0.14em] mb-3.5">— DRIVER PORTAL</div>
          <div className="flex items-end justify-between gap-10 flex-wrap">
            <h2 className="text-[32px] sm:text-[52px] font-extrabold text-[#111113] tracking-[-0.035em] leading-[1.02]">In every driver&apos;s pocket. Included in every plan.</h2>
            <p className="text-[17px] text-[#6C6C72] leading-[1.55] max-w-[420px]">
              Drivers self-serve their rota, payslips, scorecards, and van inspections — so your OSM stops being a help desk.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-[18px]">
          {PORTAL_SCREENS.map((s, i) => (
            <div key={s.label} className="bg-white rounded-[20px] p-3 sm:p-6 flex flex-col items-center gap-3 sm:gap-[18px] border border-border">
              <img src={s.src} className="w-full max-w-[210px] rounded-[18px] shadow-[0_20px_40px_-10px_rgba(17,17,19,0.18)]" alt={s.label} />
              <div className="text-center">
                <div className="text-[10px] text-[#6C6C72] uppercase tracking-[0.12em]">0{i + 1}</div>
                <div className="text-[15px] sm:text-[18px] font-bold text-[#111113] mt-1 tracking-[-0.015em]">{s.label}</div>
                <div className="text-[13px] text-[#6C6C72] mt-1.5 leading-[1.5]">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
