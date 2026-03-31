/*
 * Design: Clean Logistics Blueprint
 * Video: Large centered video player with glowing amber border
 * Dark navy background for contrast
 * Now uses the real demo video created from app screenshots
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play } from "lucide-react";
import { useState, useRef } from "react";

const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dashboard_274ee24f.webp";
const VIDEO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dop-demo-video_421046f0.mp4";

export default function VideoSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    // Small delay to let the video element render
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const handleVideoEnd = () => {
    setPlaying(false);
  };

  return (
    <section
      id="demo-video"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/cta-bg-iTRQFNjxE444sjVTvXHPEt.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy/90" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 lg:mb-16 transition-all duration-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            See It In Action
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Watch how DSPOps transforms<br className="hidden sm:block" /> your daily operations
          </h2>
          <p className="mt-4 text-lg text-white/60">
            A quick walkthrough of the platform's key features and how they save you time.
          </p>
        </div>

        {/* Video Player */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"
          }`}
        >
          <div className="relative rounded-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(230,126,34,0.3)] border border-amber/20">
            {!playing ? (
              <div className="relative group cursor-pointer" onClick={handlePlay}>
                {/* Thumbnail */}
                <img
                  src={DASHBOARD_IMG}
                  alt="DOP Platform Demo"
                  className="w-full opacity-80"
                />
                <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/30 transition-colors" />
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-amber flex items-center justify-center shadow-[0_0_40px_rgba(230,126,34,0.5)] group-hover:scale-110 transition-transform duration-300">
                    <Play size={32} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 rounded-md text-xs text-white font-medium">
                  0:42
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-navy">
                <video
                  ref={videoRef}
                  src={VIDEO_URL}
                  controls
                  autoPlay
                  onEnded={handleVideoEnd}
                  className="w-full h-full"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>

        {/* Video Chapter Markers */}
        <div
          className={`mt-12 grid grid-cols-3 lg:grid-cols-3 gap-6 max-w-3xl mx-auto transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { label: "Dashboard & Scheduling", time: "0:03" },
            { label: "Fleet & Compliance", time: "0:19" },
            { label: "Reports & Payroll", time: "0:31" },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-amber/30 transition-colors cursor-pointer"
              onClick={() => {
                if (videoRef.current) {
                  const [min, sec] = item.time.split(":").map(Number);
                  videoRef.current.currentTime = min * 60 + sec;
                  if (!playing) handlePlay();
                }
              }}
            >
              <span className="text-xs text-amber font-mono">{item.time}</span>
              <p className="text-sm text-white font-medium mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
