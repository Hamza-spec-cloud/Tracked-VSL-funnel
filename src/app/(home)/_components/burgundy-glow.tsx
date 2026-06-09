// Reusable burgundy radial-glow primitives. Maps directly to DESIGN-Funnel.md §15 patterns.
// Use behind sections to bleed brand color through the graphite floor.
// Variant A (weak)   — ambient section glow, 0.18 burgundy, blur 100px
// Variant A (strong) — heavy ambient (TrioSection-style), 0.34 burgundy, blur 130px
// Variant B (power)  — viewport-centered closing-fold glow, 0.28 → 0.08 → transparent, blur 120px
//
// Parent must be `relative` and must NOT clip overflow.

type Variant = "weak" | "whisper" | "nano" | "strong" | "power" | "hero";

const STYLES: Record<Variant, React.CSSProperties> = {
  // §15A — Ambient oval (weak). Height 130% lets the glow bleed slightly into the immediate
  // spacer for soft section-to-section transitions, but not so far that it tints distant
  // sections (e.g. the 3 pre-call asset viewports).
  weak: {
    position: "absolute",
    left: "-5%",
    width: "110%",
    top: "50%",
    transform: "translateY(-50%)",
    height: "130%",
    background:
      "radial-gradient(ellipse 80% 55% at 50% 50%, rgba(184,54,90,0.18) 0%, transparent 100%)",
    filter: "blur(100px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  // Nano — minimal central hint, used in the VSL hero where a full glow would
  // compete with the player. Smaller ellipse, reduced opacity, tighter footprint.
  nano: {
    position: "absolute",
    left: "15%",
    width: "70%",
    top: "50%",
    transform: "translateY(-50%)",
    height: "70%",
    background:
      "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(184,54,90,0.13) 0%, transparent 100%)",
    filter: "blur(120px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  // Whisper — atmosphere-only fill at lower opacity than weak.
  // For surfaces where burgundy should hint at warmth without dominating
  // (e.g. the VSL hero fold once the figure-of-merit moved off-headline).
  whisper: {
    position: "absolute",
    left: "-5%",
    width: "110%",
    top: "50%",
    transform: "translateY(-50%)",
    height: "130%",
    background:
      "radial-gradient(ellipse 80% 55% at 50% 50%, rgba(184,54,90,0.10) 0%, transparent 100%)",
    filter: "blur(110px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  // §15A — Ambient oval (strong)
  strong: {
    position: "absolute",
    left: "-15%",
    width: "130%",
    top: "50%",
    transform: "translateY(-50%)",
    height: "100%",
    background:
      "radial-gradient(ellipse 90% 55% at 50% 50%, rgba(192,44,82,0.34) 0%, transparent 100%)",
    filter: "blur(130px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  // Hero glow — wide flat disc (92% page width, 65% section height) with a brighter centre.
  // Sits behind the pre-call hero fold. Intentionally narrower than the page so it reads
  // as a bounded halo rather than a full-bleed wash.
  hero: {
    position: "absolute",
    left: "4%",
    width: "92%",
    top: "50%",
    transform: "translateY(-50%)",
    height: "65%",
    background:
      "radial-gradient(ellipse 90% 50% at 50% 50%, rgba(184,54,90,0.26) 0%, rgba(184,54,90,0.10) 55%, transparent 100%)",
    filter: "blur(100px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  // §15B — Power glow (closing fold)
  power: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(1100px, 95vw)",
    height: "min(700px, 65vh)",
    background:
      "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(184,54,90,0.28) 0%, rgba(184,54,90,0.08) 50%, transparent 100%)",
    filter: "blur(120px)",
    pointerEvents: "none",
    zIndex: 0,
  },
};

export function BurgundyGlow({ variant = "weak" }: { variant?: Variant }) {
  return <div aria-hidden="true" style={STYLES[variant]} />;
}
