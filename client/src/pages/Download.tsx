/*
 * Page: Smart App Download Redirect
 * Detects Android/iOS and redirects to the correct app store.
 * Desktop visitors see a "use your phone" message.
 */

import { useEffect, useState } from "react";

const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.dspoperations.portal&pcampaignid=web_share";
const APP_STORE =
  "https://apps.apple.com/gb/app/dop-portal/id6757966156";

type Platform = "android" | "ios" | "desktop";

function detectPlatform(): Platform {
  const ua = navigator.userAgent || navigator.vendor || "";
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  return "desktop";
}

export default function Download() {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    const detected = detectPlatform();
    setPlatform(detected);

    if (detected === "android") {
      window.location.href = PLAY_STORE;
    } else if (detected === "ios") {
      window.location.href = APP_STORE;
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] px-6">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663388555786/8DtwBuanmPJ74yjYc3B4WU/dop-logo_ba62af1c.png"
            alt="DOP Portal"
            className="w-10 h-10 rounded-lg"
          />
          <span className="text-[#0F1B2D] font-bold text-xl tracking-tight">
            DSP<span className="text-[#2563EB]">Ops</span>
          </span>
        </div>

        {platform === null && (
          <p className="text-[#0F1B2D] text-lg font-medium">
            Detecting your device…
          </p>
        )}

        {(platform === "android" || platform === "ios") && (
          <>
            <h1 className="text-[#0F1B2D] text-2xl font-bold mb-3">
              Redirecting to the store…
            </h1>
            <p className="text-[#0F1B2D]/60 text-base mb-8">
              If you're not redirected automatically,{" "}
              <a
                href={platform === "android" ? PLAY_STORE : APP_STORE}
                className="text-[#2563EB] underline font-medium"
              >
                tap here
              </a>
              .
            </p>
          </>
        )}

        {platform === "desktop" && (
          <>
            <h1 className="text-[#0F1B2D] text-2xl font-bold mb-3">
              Open this link on your phone
            </h1>
            <p className="text-[#0F1B2D]/60 text-base">
              This download link is designed for mobile devices. Please open it
              on your Android or iPhone to download the DOP Portal app.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
