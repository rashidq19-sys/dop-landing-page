/**
 * The small labelled marker above every section heading — a dot, the label, and
 * a dashed run-off, echoing a route line. `onDark` switches it for the navy
 * sections; the dashed rule is decorative and hidden from assistive tech.
 */
export default function SectionEyebrow({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.15em] ${
        onDark ? "text-[#8FB0FF]" : "text-brand"
      }`}
    >
      <span
        aria-hidden="true"
        className={`w-[9px] h-[9px] rounded-full shrink-0 ${
          onDark ? "bg-[#8FB0FF] ring-4 ring-[#8FB0FF]/20" : "bg-brand ring-4 ring-brand/12"
        }`}
      />
      {children}
      <span
        aria-hidden="true"
        className={`hidden sm:block w-20 border-t-2 border-dashed ${
          onDark ? "border-[#8FB0FF]/35" : "border-brand/30"
        }`}
      />
    </div>
  );
}
