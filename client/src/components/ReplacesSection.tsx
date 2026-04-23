"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// ── Artifact definitions ──────────────────────────────────────────
const ARTIFACTS = [
  { kind: "whatsapp", x: -10, y: 10, rot: -7, z: 1 },
  { kind: "excel", x: 210, y: 40, rot: 4, z: 2 },
  { kind: "postit", x: 90, y: 180, rot: -3, z: 3 },
  { kind: "invoice", x: 280, y: 220, rot: 6, z: 4 },
  { kind: "scorecard", x: 30, y: 340, rot: -4, z: 5 },
] as const;

const COLLAPSE_X = 520;
const COLLAPSE_Y = 220;

// ── Per-artifact animated wrapper ─────────────────────────────────
function ArtifactWrapper({
  artifact,
  index,
  ease,
  children,
}: {
  artifact: (typeof ARTIFACTS)[number];
  index: number;
  ease: MotionValue<number>;
  children: React.ReactNode;
}) {
  const artP = useTransform(ease, (e: number) =>
    Math.max(0, Math.min(1, (e - index * 0.08) / 0.6))
  );
  const left = useTransform(artP, (p: number) => artifact.x + (COLLAPSE_X - artifact.x) * p);
  const top = useTransform(artP, (p: number) => artifact.y + (COLLAPSE_Y - artifact.y) * p);
  const rotate = useTransform(artP, (p: number) => artifact.rot * (1 - p));
  const opacity = useTransform(artP, (p: number) => Math.max(0, 1 - p * 1.15));
  const scale = useTransform(artP, (p: number) => 1 - p * 0.5);

  return (
    <motion.div style={{ position: "absolute", left, top, rotate, opacity, scale, zIndex: artifact.z }}>
      {children}
    </motion.div>
  );
}

// ── Artifact content components ───────────────────────────────────
function WhatsAppMock() {
  return (
    <div className="w-[280px] bg-[#ECE5DD] rounded-[10px] border border-border overflow-hidden shadow-[0_8px_20px_-8px_rgba(17,17,19,0.18)]">
      <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#075E54] text-white">
        <div className="w-[30px] h-[30px] rounded-full bg-[#25D366] flex items-center justify-center text-[11px] font-bold">DG</div>
        <div>
          <div className="text-[13px] font-semibold leading-tight">Drivers Group</div>
          <div className="text-[10px] opacity-75 mt-0.5">19 members · online</div>
        </div>
        <div className="ml-auto text-sm opacity-85">⋮</div>
      </div>
      <div className="p-3 space-y-[5px]">
        <div className="bg-white text-[#111113] px-[10px] py-1.5 rounded-lg text-xs max-w-[85%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">Can&apos;t make it, kids sick 🤒</div>
        <div className="bg-white text-[#111113] px-[10px] py-1.5 rounded-lg text-xs max-w-[70%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">Who&apos;s taking CA_R07??</div>
        <div className="bg-[#DCF8C6] text-[#111113] px-[10px] py-1.5 rounded-lg text-xs max-w-[55%] ml-auto shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">Van 4 flat tyre</div>
        <div className="text-[10px] text-[#25D366] font-bold text-right mt-2">+ 47 unread</div>
      </div>
    </div>
  );
}

function ExcelMock() {
  const rows = [
    ["Name", "Mon", "Tue", "Wed", "Thu"],
    ["A.Scott", "07:00", "07:00", "OFF", "07:00"],
    ["M.Okoye", "07:00", "#REF!", "07:00", "07:00"],
    ["P.Mehta", "OFF", "07:00", "07:00", "OFF"],
    ["J.Callahan", "07:00", "07:00", "07:00", "07:00"],
  ];
  return (
    <div className="w-[340px] bg-white border border-border rounded-[4px] overflow-hidden shadow-[0_8px_20px_-8px_rgba(17,17,19,0.18)]">
      <div className="bg-[#217346] px-[10px] py-1.5 text-[11px] text-white font-semibold flex items-center gap-2">
        <div className="w-4 h-4 bg-white text-[#217346] rounded-[2px] flex items-center justify-center text-[11px] font-black">X</div>
        rota_v17_FINAL_USE_THIS.xlsx
        <span className="ml-auto opacity-80">— Excel</span>
      </div>
      <div className="text-[10px]">
        {rows.map((row, ri) => (
          <div key={ri} className="grid border-b border-[#EEE] last:border-0" style={{ gridTemplateColumns: "28px repeat(4, 1fr)" }}>
            <div className="bg-[#F7F6F2] px-1.5 py-[5px] text-[#6C6C72] border-r border-[#EEE] text-center">{ri + 1}</div>
            {row.map((cell, ci) => (
              <div key={ci} className={`px-1.5 py-[5px] border-r border-[#EEE] last:border-0 font-mono ${
                cell === "#REF!" ? "text-red-600 bg-red-50" : ri === 0 ? "font-semibold text-[#353538]" : "text-[#111113]"
              }`}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PostItMock() {
  return (
    <div className="w-[180px] bg-[#FDE68A] p-4 shadow-[0_8px_20px_-8px_rgba(17,17,19,0.18)]" style={{ fontFamily: '"Comic Sans MS", cursive', fontSize: 18, lineHeight: 1.3, color: "#1F1F1F" }}>
      Samsara login<br />
      <span style={{ textDecoration: "line-through", opacity: 0.6 }}>drivers2024</span><br />
      <span style={{ fontWeight: 700, color: "#DC2626" }}>Dr1vers!25</span><br />
      <span style={{ fontSize: 13, opacity: 0.7 }}>(ask Mike?)</span>
    </div>
  );
}

function InvoiceMock() {
  return (
    <div className="w-[240px] bg-white border border-border overflow-hidden shadow-[0_8px_20px_-8px_rgba(17,17,19,0.18)] relative">
      <div className="bg-[#00D639] px-[14px] py-2 flex items-center gap-2">
        <span className="text-[13px] font-black text-[#00261C]">Sage</span>
        <span className="text-[9px] text-[#00261C] opacity-70 tracking-[0.1em] uppercase font-semibold">Payroll</span>
      </div>
      <div className="p-4">
        <div className="text-[9px] tracking-[0.14em] text-[#6C6C72] uppercase">Invoice #P-1427</div>
        <div className="text-[15px] font-bold text-[#111113] mt-1">Week 14 Payroll</div>
        <div className="mt-2.5 text-[11px] text-[#353538] space-y-1">
          <div>22 drivers · 1,732 hrs</div>
          <div>Overtime adj: <span className="text-red-600 font-bold">± £340?</span></div>
          <div className="font-bold text-[#111113] mt-1.5">£17,340</div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2.5 text-[28px] text-red-600/30 font-extrabold rotate-[-15deg] tracking-[0.1em]">RE-DO</div>
    </div>
  );
}

function ScorecardMock() {
  return (
    <div className="w-[260px] bg-white border border-border overflow-hidden shadow-[0_8px_20px_-8px_rgba(17,17,19,0.18)]">
      <div className="bg-[#232F3E] px-[14px] py-2 flex items-center gap-2">
        <span className="text-[12px] font-bold text-white">Cortex</span>
        <div className="w-px h-[10px] bg-white/25" />
        <span className="text-[10px] text-[#FF9900] font-semibold tracking-[0.08em] uppercase">Driver Scorecard</span>
      </div>
      <div className="p-3.5">
        <div className="text-[9px] tracking-[0.14em] text-[#6C6C72] uppercase mb-2">Week 14 · Printed</div>
        <div className="grid grid-cols-2 gap-1.5 text-xs text-[#353538]">
          <div>Delivered</div><div className="font-bold text-[#111113] tabular-nums text-right">98.2%</div>
          <div>DCR</div><div className="font-bold text-[#111113] tabular-nums text-right">94.1%</div>
          <div>On-time</div><div className="font-bold text-amber-700 tabular-nums text-right">91.4%</div>
        </div>
        <div className="mt-2.5 text-[11px] text-red-600 italic">&quot;why is mine wrong again?&quot; — James</div>
      </div>
    </div>
  );
}

// ── DSPOps result panel row (extracted to avoid hooks-in-map rule) ──
function DSPOpsPanelRow({
  row,
  ease,
  index,
}: {
  row: { k: string; v: string; sub: string; color: string };
  ease: MotionValue<number>;
  index: number;
}) {
  const rowOpacity = useTransform(ease, (e: number) =>
    Math.max(0, Math.min(1, (e - 0.3 - index * 0.08) / 0.25))
  );
  const rowX = useTransform(ease, (e: number) =>
    `${(1 - Math.max(0, Math.min(1, (e - 0.3 - index * 0.08) / 0.25))) * 12}px`
  );
  return (
    <motion.div
      style={{ opacity: rowOpacity, translateX: rowX }}
      className="grid grid-cols-[110px_1fr_auto] gap-4 items-center pb-3.5 border-b border-[#EFEFEB] last:border-0 last:pb-0"
    >
      <div className="text-[11px] font-semibold text-[#6C6C72] uppercase tracking-[0.1em]">{row.k}</div>
      <div>
        <div className="text-[15px] font-bold text-[#111113] tracking-[-0.01em]">{row.v}</div>
        <div className="text-[12px] text-[#6C6C72] mt-0.5">{row.sub}</div>
      </div>
      <div className={`w-2 h-2 rounded-full ${row.color}`} />
    </motion.div>
  );
}

// ── DSPOps result panel (right side, fades in as chaos collapses) ──
function DSPOpsPanel({ ease }: { ease: MotionValue<number> }) {
  const translateY = useTransform(ease, (e: number) => `${(1 - e) * 20}px`);
  const scale = useTransform(ease, (e: number) => 0.97 + e * 0.03);
  const opacity = useTransform(ease, (e: number) => 0.6 + e * 0.4);

  const rows = [
    { k: "Messages", v: "3 flagged", sub: "WhatsApp feed merged", color: "bg-brand" },
    { k: "Rota", v: "Auto-rebuilt", sub: "2 reassignments done", color: "bg-emerald-600" },
    { k: "Van checks", v: "21 / 22", sub: "Van 4 flagged by Priya", color: "bg-amber-500" },
    { k: "Payroll", v: "Week 14 ready", sub: "Export in 1 click", color: "bg-[#353538]" },
    { k: "Scorecards", v: "Live from Cortex", sub: "Drivers can see own", color: "bg-brand-dark" },
  ];

  return (
    <motion.div style={{ translateY, scale, opacity }}
      className="bg-white rounded-[16px] border border-border shadow-[0_30px_60px_-20px_rgba(17,17,19,0.12)] overflow-hidden">
      {/* chrome */}
      <div className="px-[18px] py-3 border-b border-border flex items-center gap-2.5 bg-background">
        <div className="w-[22px] h-[22px] rounded-[6px] bg-[#111113] text-white flex items-center justify-center text-[11px] font-extrabold tracking-[-0.05em]">D</div>
        <div className="text-[13px] font-bold text-[#111113]">DSPOps · Morning</div>
        <div className="ml-auto flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Live · 06:42
        </div>
      </div>
      {/* rows */}
      <div className="p-6 flex flex-col gap-3.5">
        {rows.map((row, i) => (
          <DSPOpsPanelRow key={row.k} row={row} ease={ease} index={i} />
        ))}
      </div>
      {/* footer */}
      <div className="px-6 py-3 bg-[#111113] text-white flex items-center justify-between text-[12px]">
        <span className="font-semibold">5 tools → 1 screen → 1 login</span>
        <span className="opacity-70">Monday handled by 07:00</span>
      </div>
    </motion.div>
  );
}

// ── Progress arrow (middle column) ────────────────────────────────
function ProgressArrow({ ease }: { ease: MotionValue<number> }) {
  const lineHeight = useTransform(ease, (e: number) => e * 170);
  return (
    <div className="h-full flex flex-col items-center justify-center gap-3">
      <div className="text-[10px] font-bold text-[#6C6C72] tracking-[0.2em] uppercase" style={{ writingMode: "vertical-rl" as React.CSSProperties["writingMode"], transform: "rotate(180deg)" }}>DSPOps</div>
      <svg width="40" height="180" viewBox="0 0 40 180" style={{ overflow: "visible" }}>
        <line x1="20" y1="0" x2="20" y2="170" stroke="#E6E6E3" strokeWidth="2" />
        <motion.line x1="20" y1="0" x2="20" y2={lineHeight as unknown as number} stroke="#2563EB" strokeWidth="2" />
      </svg>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────
export default function ReplacesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawProgress = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const ease = useTransform(rawProgress, (p: number) =>
    1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3)
  );

  return (
    <section ref={sectionRef} className="bg-background py-[140px] border-b border-border overflow-hidden relative">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#E6E6E3 1px, transparent 1px), linear-gradient(90deg, #E6E6E3 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-8 relative">
        {/* Section header */}
        <div className="mb-[72px]">
          <div className="text-[12px] font-semibold text-[#6C6C72] uppercase tracking-[0.2em] mb-5 flex items-center gap-3">
            <span className="w-7 h-px bg-[#111113]" />
            CHAPTER 01 · The morning you lose
          </div>
          <h2 className="font-sans text-[72px] lg:text-[108px] font-extrabold text-[#111113] tracking-[-0.045em] leading-[0.92] max-w-[1100px]">
            Five apps.<br />
            <span className="relative inline-block">
              Three WhatsApps.
              <svg className="absolute left-[-8px] bottom-[-14px]" style={{ width: "calc(100% + 16px)", height: 20 }} viewBox="0 0 600 20" preserveAspectRatio="none">
                <path d="M5 12 Q 150 3, 300 10 T 595 11" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            <span className="italic font-medium text-[#353538]">One printer that jams.</span>
          </h2>
          <div className="mt-10 grid grid-cols-[1fr_auto_1fr] gap-12 items-start max-w-[1100px]">
            <p className="text-[18px] text-[#353538] leading-[1.55] max-w-[460px]">
              Before 9 AM on a Monday your OSM has switched apps seventeen times, typed the same driver&apos;s name into four different spreadsheets, and answered the phone while doing both.
            </p>
            <div className="self-stretch w-px bg-border" />
            <div>
              <div className="text-[68px] font-extrabold text-[#111113] tracking-[-0.04em] leading-[0.95] tabular-nums">
                32<span className="text-[28px] font-semibold text-[#6C6C72] tracking-normal"> hrs/wk</span>
              </div>
              <div className="text-[14px] text-[#6C6C72] mt-2.5 max-w-[320px] leading-[1.5]">
                lost per station to the pile below. Unbilled. Uncharted. Just… Tuesday.
              </div>
            </div>
          </div>
        </div>

        {/* Animation stage: chaos → order */}
        <div className="grid mb-24" style={{ gridTemplateColumns: "1fr 60px 1fr", alignItems: "center", minHeight: 560 }}>
          {/* LEFT: artifact pile */}
          <div style={{ position: "relative", height: 520 }}>
            <div className="absolute top-[-24px] left-0 text-[11px] font-bold text-red-600 tracking-[0.18em] uppercase">Before · 06:42 MON</div>
            {ARTIFACTS.map((a, i) => (
              <ArtifactWrapper key={i} artifact={a} index={i} ease={ease}>
                {a.kind === "whatsapp" && <WhatsAppMock />}
                {a.kind === "excel" && <ExcelMock />}
                {a.kind === "postit" && <PostItMock />}
                {a.kind === "invoice" && <InvoiceMock />}
                {a.kind === "scorecard" && <ScorecardMock />}
              </ArtifactWrapper>
            ))}
          </div>

          {/* MIDDLE: progress arrow */}
          <ProgressArrow ease={ease} />

          {/* RIGHT: DSPOps panel */}
          <div className="relative">
            <div className="absolute top-[-24px] right-0 text-[11px] font-bold text-brand tracking-[0.18em] uppercase">After · One screen</div>
            <DSPOpsPanel ease={ease} />
          </div>
        </div>

        {/* Payoff band */}
        <div className="bg-[#111113] text-white rounded-[20px] px-[52px] py-12 grid gap-9 relative overflow-hidden"
          style={{ gridTemplateColumns: "1.4fr 1px 1fr 1px 1fr" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative">
            <div className="text-[11px] font-bold text-brand-light tracking-[0.22em] uppercase mb-3.5 flex items-center gap-2.5">
              <span className="w-6 h-px bg-brand-light" /> So, Monday becomes…
            </div>
            <div className="flex items-baseline gap-2.5">
              <div className="text-[80px] lg:text-[120px] font-extrabold tracking-[-0.05em] leading-[0.85] tabular-nums">+£13,400</div>
              <div className="text-[22px] text-white/55 font-medium">/yr</div>
            </div>
            <p className="text-[15px] text-white/70 mt-4 max-w-[440px] leading-[1.55]">
              saved on duplicate tools plus OSM hours clawed back from re-keying.{" "}
              <a href="#calculator" className="text-brand-light underline font-semibold">Run your own numbers →</a>
            </p>
          </div>
          <div className="self-stretch bg-white/12" />
          <div className="relative">
            <div className="text-[11px] font-bold text-white/50 tracking-[0.22em] uppercase mb-3.5">Payback</div>
            <div className="text-[68px] font-extrabold tracking-[-0.04em] leading-[0.9]">~3 wks</div>
            <p className="text-[13px] text-white/60 mt-3.5 leading-[1.5]">Break-even on Professional for most DSPs.</p>
          </div>
          <div className="self-stretch bg-white/12" />
          <div className="relative">
            <div className="text-[11px] font-bold text-white/50 tracking-[0.22em] uppercase mb-3.5">Logins · bills</div>
            <div className="text-[68px] font-extrabold tracking-[-0.04em] leading-[0.9]">5 <span className="text-brand-light">→</span> 1</div>
            <p className="text-[13px] text-white/60 mt-3.5 leading-[1.5]">One platform, one invoice, one login.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
