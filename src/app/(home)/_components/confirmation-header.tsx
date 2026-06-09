// Repurposed: new hero. The orientation VSL lives inside this fold; the confirmation
// buttons that used to live here now have their own micro-section (ConfirmCallSection).
// Design system: §17 standard section + §15A weak ambient burgundy oval + §4 max-w-5xl
// container so the inner VSL (max-w-4xl) fits without overflow.

import { WistiaPlayer } from "./wistia-player";

export function ConfirmationHeader() {
  return (
    <section className="relative w-full px-6 pt-20 pb-12">

      <div
        className="relative max-w-5xl mx-auto w-full flex flex-col items-center text-center gap-5"
        style={{ zIndex: 1 }}
      >

        {/* Eyebrow — institutional directive */}
        <p className="text-[11px] font-light tracking-[0.25em] text-[#555555] uppercase">
          Action Required
        </p>

        {/* H1 split — primary #e0e0e0 + .text-burgundy italic on the warning half.
            Loop 2: stepped down a second time (text-3xl md:text-4xl lg:text-5xl) so more of
            the orientation VSL is visible above the fold on standard desktop viewports.
            Loop 2: em-dash → comma for sharper directive cadence. */}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight max-w-4xl"
          style={{ textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}
        >
          <span className="text-[#e0e0e0]">Your System Diagnostic Is Scheduled, </span>
          <span className="text-burgundy italic">But Not Yet Confirmed.</span>
        </h1>

        {/* Subtext — max-w-xl reading column per §4 */}
        <p className="text-base md:text-lg text-[#aaaaaa] leading-relaxed max-w-xl">
          Watch the video below — it walks you through every step you must
          complete before your call.
        </p>

        {/* Orientation VSL — glow is positioned inside the player wrapper so its centre
            locks to the player's centre regardless of section height or text reflow. */}
        <div className="relative w-full max-w-[911px] mx-auto mt-4">
          {/* Burgundy glow centred exactly on the player — extends beyond bounds via
              negative insets so the ellipse reads as a wide halo, not a tight disc. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-20%",
              right: "-20%",
              top: "-50%",
              bottom: "-50%",
              background:
                "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(184,54,90,0.26) 0%, rgba(184,54,90,0.10) 55%, transparent 100%)",
              filter: "blur(100px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <WistiaPlayer mediaId="4lwhy77yue" />
        </div>

      </div>
    </section>
  );
}
