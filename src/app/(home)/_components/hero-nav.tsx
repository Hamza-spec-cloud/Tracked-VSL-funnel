// Adapted from Funnel V2 hero-nav. Post-booking variant: logo + centered amber-haloed warning.
// Tokens: bg-black/30 + backdrop-blur(12px) per §8, border-b rgba(255,255,255,0.06) per §1,
// shadow-nav per §5, GlowingEffect canonical config per §11a.
//
// Warning treatment (Loop 2 / Loop 3 override):
//   - Optically centered relative to the full nav width via absolute positioning, so the
//     logo on the left does not push the warning off-center.
//   - FULL AMBER TAKEOVER — text color, icon stroke, AND glow halo are all amber #FFBF00.
//     This is an explicit deviation from the design-system rule reserving amber for
//     primary CTAs and play-button glow (DESIGN-Funnel.md §1.10), authorized by direct
//     user override. The warning must dominate the nav as a luminous orange directive.
//     Do NOT "normalize" this back to burgundy — it is the sole authorized amber
//     appearance outside CTAs.

import Link from "next/link";
import { SmartImage } from "./smart-image";
import { GlowingEffect } from "./glowing-effect";

export function HeroNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-black/30 border-b border-white/[0.06] shadow-[0_2px_40px_-10px_rgba(0,0,0,0.8)]">
      <div className="relative overflow-hidden">
        <GlowingEffect
          disabled={false}
          borderWidth={1}
          spread={60}
          proximity={80}
          inactiveZone={0}
        />
        {/* Amber warning — centered absolutely so the logo position is unaffected */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 5 }}
        >
          <span
            style={{
              color: "#FFBF00",
              fontSize: "11px",
              fontWeight: 300,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              textShadow:
                "0 0 8px rgba(255,191,0,0.35), 0 0 22px rgba(255,191,0,0.14), 0 0 55px rgba(255,191,0,0.06)",
            }}
          >
            COMPLETE ALL STEPS BELOW TO HOLD YOUR DIAGNOSTIC
          </span>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center">
          <Link href="/" className="relative z-10 flex items-center gap-3 no-underline shrink-0">
            <SmartImage
              src="/home/logo.png"
              alt="Arysn logo"
              width={26}
              height={26}
              sizes="26px"
              className="shrink-0"
              style={{ mixBlendMode: "screen" }}
              priority
            />
            <span className="text-sm font-light tracking-[0.25em] text-[#e0e0e0] uppercase">
              Arysn
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
