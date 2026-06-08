// Terminal booking fold — replaces the script's closing CTA button with the embedded
// Cal.com Constraint Review calendar. Sits inside a #0d0d0d container with the same
// deep-stacked shadow + 1px white/0.08 border the VSL player uses, wrapped in the
// canonical GlowingEffect so the silver mouse-tracked corona reads on the booking
// surface itself. Power-glow §15B halos the whole fold.
//
// Anchor target — id="book". The hero CTA smooth-scrolls here via the CTAButton anchor
// prop; scroll-mt-24 offsets the fixed nav.

import { BurgundyGlow } from "./burgundy-glow";
import { GlowingEffect } from "./glowing-effect";
import { CalEmbed } from "./cal-embed";

export function VSLBooking() {
  return (
    <section
      id="book"
      className="relative w-full px-4 md:px-6 pt-12 pb-32 scroll-mt-24"
    >
      <BurgundyGlow variant="power" />

      <div
        className="relative max-w-5xl mx-auto w-full flex flex-col items-center"
        style={{ zIndex: 1 }}
      >
        {/* Heading stack */}
        <div className="max-w-3xl w-full flex flex-col items-center text-center gap-6">
          <p className="text-[11px] font-light tracking-[0.25em] text-[#555555] uppercase">
            Final Step
          </p>

          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[#e0e0e0] leading-[1.1] max-w-3xl"
          >
            Three Signed Retainers. Every Quarter.{" "}
            <span className="text-burgundy italic">Guaranteed.</span>
          </h2>

          <p className="text-base md:text-lg text-[#aaaaaa] leading-relaxed max-w-xl">
            Select a time below. The Contract Review Meeting verifies your numbers,
            confirms scope, and finalizes the agreement.
          </p>
        </div>

        {/* Calendar container — VSL-player shadow stack + 1px chrome + GlowingEffect */}
        <div
          className="relative mt-12 w-full max-w-4xl h-[80dvh] md:h-[624px] border border-white/[0.08] bg-[#0d0d0d] px-2 md:px-[1cm] py-[0.25cm] overflow-hidden"
          style={{
            boxShadow:
              "0 40px 120px 0px rgba(0,0,0,1), 0 0 60px 10px rgba(0,0,0,0.8)",
          }}
        >
          <GlowingEffect
            disabled={false}
            borderWidth={1}
            spread={80}
            proximity={100}
            inactiveZone={0}
            movementDuration={1.5}
          />
          <CalEmbed />
        </div>
      </div>
    </section>
  );
}
