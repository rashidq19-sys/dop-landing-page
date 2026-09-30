import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionEyebrow from "@/components/home/SectionEyebrow";

const VIDEO_SRC = "/video/dspops-demo.mp4";
const POSTER_SRC = "/video/dspops-demo-poster.webp";

/** Fired by the hero screenshots so a click on them plays this video. */
export const PLAY_DEMO_EVENT = "dspops:play-demo";

/**
 * The promo video, click-to-play. Until someone presses play only the poster
 * image loads (`preload="none"`), so the 6 MB file costs nothing to visitors
 * who scroll past it.
 */
export default function DemoVideoSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => {
      // Playback refused (rare) — native controls are now showing, so they can press play there.
    });
  };

  // dispatchEvent is synchronous, so play() still runs inside the visitor's click
  // and the browser lets it start with sound.
  useEffect(() => {
    const onPlay = () => {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "center" });
      start();
    };
    window.addEventListener(PLAY_DEMO_EVENT, onPlay);
    return () => window.removeEventListener(PLAY_DEMO_EVENT, onPlay);
  }, []);

  return (
    <section id="demo" className="bg-background py-16 sm:py-20 lg:py-[82px] border-b border-border">
      <div ref={ref} className="max-w-[1180px] mx-auto px-5 sm:px-9">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <SectionEyebrow>See it in action</SectionEyebrow>
          <h2 className="mt-3.5 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.06] text-balance text-ink">
            From 05:30 phone call to every driver on the road.
          </h2>
          <p className="mt-3.5 text-[15.5px] sm:text-[17px] text-muted-foreground leading-[1.6] max-w-[62ch]">
            A 90-second look at a DSP morning run on DSPOps — sound on.
          </p>
        </div>

        <div
          className={`relative mt-8 aspect-video rounded-[16px] overflow-hidden border border-border bg-deep shadow-[0_24px_60px_rgba(10,18,53,0.18)] transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            preload="none"
            playsInline
            controls={started}
            className="w-full h-full object-cover"
          >
            Your browser can&rsquo;t play this video.
          </video>

          {!started && (
            <button
              type="button"
              onClick={start}
              aria-label="Play the DSPOps demo video"
              className="group absolute inset-0 flex items-center justify-center bg-deep/25 hover:bg-deep/15 transition-colors"
            >
              <span className="flex items-center gap-3 rounded-full bg-brand text-white pl-4 pr-6 py-3.5 sm:pl-5 sm:pr-7 sm:py-4 text-[15px] sm:text-[17px] font-bold shadow-[0_10px_26px_rgba(37,99,235,0.45)] group-hover:scale-105 transition-transform">
                <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20">
                  <Play size={20} fill="currentColor" aria-hidden="true" className="ml-0.5" />
                </span>
                Watch the demo · 1:39
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
