import { useState, useEffect } from "react";

interface IPhoneMockupProps {
  images: { src: string; label: string }[];
  autoPlay?: boolean;
  interval?: number;
}

export default function IPhoneMockup({
  images,
  autoPlay = true,
  interval = 3000,
}: IPhoneMockupProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* iPhone frame */}
      <div className="relative mx-auto" style={{ width: 280 }}>
        {/* Outer shell */}
        <div className="relative rounded-[3rem] border-[6px] border-gray-900 bg-gray-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden">
          {/* Notch / Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[90px] h-[25px] bg-gray-900 rounded-b-2xl" />

          {/* Screen */}
          <div className="relative bg-white rounded-[2.4rem] overflow-hidden" style={{ aspectRatio: "9/19.5" }}>
            {images.map((img, i) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.label}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Home indicator bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/60 rounded-full z-20" />
      </div>

      {/* Dot indicators + labels */}
      <div className="flex items-center gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              i === active
                ? "bg-brand text-white shadow-sm"
                : "bg-slate-100 text-muted-foreground hover:bg-slate-200"
            }`}
          >
            {img.label}
          </button>
        ))}
      </div>
    </div>
  );
}
