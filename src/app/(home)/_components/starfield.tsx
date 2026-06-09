// Page-wide animated starfield — same FloatingParticlesBackground module as the VSL page.
// Fixed, pointer-events-none so it sits behind every section without blocking interaction.
//
// Scroll-driven opacity: invisible while the hero owns the viewport, fades in as
// the user scrolls into Pre-Call Steps. Thresholds mirror the VSL page exactly.

"use client";

import { useEffect, useState } from "react";
import FloatingParticlesBackground from "../../(vsl)/_lib/floating-particles-background.js";

export function Starfield() {
  const [opacity, setOpacity] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    function update() {
      const vh = window.innerHeight;
      const start = vh * 1.0;
      const end = vh * 1.4;
      const t = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
      setOpacity(t);
    }
    function onVisibility() {
      setHidden(document.hidden);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const paused = opacity === 0 || hidden || reduceMotion;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        opacity: reduceMotion ? 0 : opacity,
        transition: "opacity 200ms linear",
      }}
    >
      <FloatingParticlesBackground
        particleCount={36}
        particleSize={0.2}
        particleOpacity={0.16}
        glowIntensity={2}
        movementSpeed={0.35}
        mouseInfluence={140}
        mouseGravity="attract"
        gravityStrength={35}
        backgroundColor="transparent"
        particleColor="#e0e0e0"
        paused={paused}
      />
    </div>
  );
}
