import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Full-screen viewer for the product screenshots. Separate from Lightbox.tsx,
 * which embeds a YouTube player and takes a video id.
 *
 * Portalled to document.body: every caller sits inside a section that may
 * establish its own stacking or transform context, and a `fixed` overlay
 * rendered inside a transformed ancestor is confined to that ancestor's box
 * rather than the viewport.
 */
export default function ScreenshotLightbox({
  src,
  alt,
  onClose,
}: {
  src: string | null;
  alt?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [src, onClose]);

  if (!src) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Screenshot"}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-deep/95 p-4 sm:p-8 cursor-zoom-out"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X size={18} />
      </button>
      <img
        src={src}
        alt={alt || ""}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[92vh] rounded-xl shadow-2xl cursor-default"
      />
    </div>,
    document.body,
  );
}
