"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GlowingEffect } from "./glowing-effect";

interface WistiaPlayerProps {
  mediaId?: string;
  overlaySize?: { width: number; height: number };
}

// Cast to bypass TypeScript's unknown-element check for the <wistia-player> web component.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WistiaEl = "wistia-player" as any;

// Module-level — shared across all WistiaPlayer instances on the same page.
// Ensures only one Wistia video plays at a time regardless of which instance fires play.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const liveVideos = new Set<any>();

export function WistiaPlayer({ mediaId, overlaySize = { width: 110, height: 40 } }: WistiaPlayerProps) {
  useEffect(() => {
    if (!mediaId) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry: { handle: any } = { handle: null };
    (window as any)._wq = (window as any)._wq || [];
    (window as any)._wq.push({
      id: mediaId,
      onReady: (video: any) => {
        entry.handle = video;
        liveVideos.add(video);
        video.bind("play", () => {
          liveVideos.forEach(other => { if (other !== video) other.pause(); });
        });
      },
    });
    return () => { if (entry.handle) liveVideos.delete(entry.handle); };
  }, [mediaId]);

  if (!mediaId) {
    return (
      <div className="relative w-full overflow-hidden border border-white/[0.08] shadow-[0_40px_120px_0px_rgba(0,0,0,1),0_0_60px_10px_rgba(0,0,0,0.8)]">
        <GlowingEffect
          disabled={false}
          borderWidth={1}
          spread={80}
          proximity={100}
          inactiveZone={0}
          movementDuration={1.5}
        />
        <div className="relative aspect-video bg-[#0d0d0d] overflow-hidden flex items-center justify-center">
          <p className="text-[#555555] text-xs tracking-[0.3em] font-light uppercase">
            Video Coming Soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://fast.wistia.com/player.js"
        strategy="afterInteractive"
      />
      <Script
        src={`https://fast.wistia.com/embed/${mediaId}.js`}
        strategy="afterInteractive"
        type="module"
      />
      {/* Swatch placeholder renders before the custom element is defined (script not yet loaded) */}
      <style dangerouslySetInnerHTML={{ __html: `
        wistia-player[media-id='${mediaId}']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
      ` }} />
      <div className="relative w-full overflow-hidden border border-white/[0.08] shadow-[0_40px_120px_0px_rgba(0,0,0,1),0_0_60px_10px_rgba(0,0,0,0.8)]">
        <GlowingEffect
          disabled={false}
          borderWidth={1}
          spread={80}
          proximity={100}
          inactiveZone={0}
          movementDuration={1.5}
        />
        <div className="relative bg-[#0d0d0d] overflow-hidden">
          <WistiaEl
            media-id={mediaId}
            aspect="1.7777777777777777"
            style={{ width: "100%", display: "block" }}
          />
          {/* Opaque rectangle covering the Wistia logo in the bottom-right control bar.
              pointerEvents:all blocks clicks on the logo link beneath. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: overlaySize.width,
              height: overlaySize.height,
              background: "#0d0d0d",
              zIndex: 10,
              pointerEvents: "all",
              cursor: "default",
            }}
          />
        </div>
      </div>
    </>
  );
}
