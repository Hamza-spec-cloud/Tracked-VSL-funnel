// Step 03 — bring these numbers. Collapsed to a single numbered list (one card).
// Previous variant had 3 primary rows (Calendar / Environment / Numbers) + nested 5-item
// sublist. Per the funnel redesign brief, this fold is now lean, scannable, institutional:
// just the 5 inputs the prospect must have in front of them at call time.
//
// Design system: §17 standard section + §15A weak ambient burgundy oval. Card uses §11a
// GlowingEffect inside bg-[#1a1a1a] elevated surface.

"use client";
import { GlowingEffect } from "./glowing-effect";
import { BurgundyGlow } from "./burgundy-glow";

const NUMBERS: string[] = [
  "Current monthly recurring revenue.",
  "Average deal size and close rate — last two quarters.",
  "Sales cycle length — median first-contact to signed.",
  "Lead source mix — outbound, inbound, referral, paid (rough %).",
  "Stretch target for the next four quarters — and the single biggest constraint blocking it.",
];

export function ShowUpPreparedSection() {
  return (
    <section className="relative w-full px-6 py-24">

      <BurgundyGlow variant="weak" />

      <div className="relative max-w-2xl mx-auto w-full" style={{ zIndex: 1 }}>

        {/* §17 section header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-light tracking-[0.25em] text-[#555555] uppercase mb-4">
            Step 03 — Before The Call
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}
          >
            <span className="text-[#e0e0e0]">Bring </span>
            <span className="text-burgundy italic">These Numbers</span>
          </h2>
          <p className="text-base md:text-lg text-[#aaaaaa] leading-relaxed mt-4">
            The diagnostic is only as sharp as the inputs you bring. Have these
            in front of you when the call starts.
          </p>
        </div>

        {/* Card — §11a GlowingEffect inside, bg-[#1a1a1a] elevated surface */}
        <div
          className="relative w-full bg-[#1a1a1a] p-8 md:p-10"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
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

          <ul className="flex flex-col">
            {NUMBERS.map((line, i) => (
              <li
                key={i}
                className="flex items-baseline gap-5 py-5"
                style={{
                  borderTop:
                    i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-[11px] font-light tracking-[0.25em] text-[#555555] uppercase shrink-0 w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm md:text-base text-[#e0e0e0] leading-relaxed">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
