import { VturbPlayer } from "./vturb-player";
import { BurgundyGlow } from "./burgundy-glow";
import { CTAButton } from "./cta-button";
import { BeamsBackground } from "./beams-background-dynamic";

export function VSLHero() {
  return (
    <section className="relative w-full px-6 pt-20 pb-12 bg-[#121212] overflow-hidden">
      <BurgundyGlow variant="nano" />

      {/* Mist — full-section backdrop, z:0 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <BeamsBackground className="!min-h-0 h-full" />
      </div>

      {/* Top veil — covers from top of section down through the subheadline.
          Gradient stays solid for most of its height so the mist fully
          disappears before the headline, then fades to transparent just
          above the player. Same z-index as mist but later in DOM = on top. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "46%",
          background: "linear-gradient(to bottom, #121212 0%, #121212 70%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* Bottom veil — mirrors the top, fades the mist out below the player */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "18%",
          background: "linear-gradient(to top, #121212 0%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* Content — z:1 sits above both the mist and the veils */}
      <div
        className="relative max-w-5xl mx-auto w-full flex flex-col items-center text-center gap-5"
        style={{ zIndex: 1 }}
      >
        <p className="text-[11px] font-light tracking-[0.25em] text-[#555555] uppercase">
          For 500k &ndash; $3M/yr CPA, FP&amp;A &amp; Fractional CFO Firms
        </p>

        <h1 className="text-[26px] md:text-[32px] lg:text-[41px] font-semibold leading-[1.05] tracking-tight max-w-5xl">
          <span className="text-[#e0e0e0]">
            We Put 3 Signed Advisory Clients On Your Books Every 90 Days&hellip;{" "}
          </span>
          <span className="text-burgundy italic">Or You Don&rsquo;t Pay</span>
        </h1>

        <p className="text-[17px] md:text-[19px] text-[#e0e0e0] font-light tracking-tight max-w-2xl">
          We rebuild the single thing that decides whether a stranger ever becomes a client. Then we build the demand system around it. Either it puts ready-to-sign advisory retainers on your calendar every 90 days, or you pay nothing.
        </p>

        <div className="w-full max-w-[911px] mx-auto mt-4 mb-4">
          <VturbPlayer />
        </div>

        <CTAButton variant="primary" href="#book" anchor>
          Access Implementation Protocol
        </CTAButton>
      </div>
    </section>
  );
}
