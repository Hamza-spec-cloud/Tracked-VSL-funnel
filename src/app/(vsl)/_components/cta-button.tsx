"use client";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

// Smoothly scroll to an in-page anchor, re-reading the target's live position every
// frame. The booking fold sits below the `content-visibility: auto` script section, whose
// height is only an estimate (contain-intrinsic-size) until it renders — so a one-shot
// scrollIntoView aims at a stale, too-high position and stops mid-script. By recomputing
// the destination each frame, this follows #book as that section renders and grows, so it
// always finishes on the calendar even if the page hasn't fully laid out yet.
function smoothScrollToAnchor(selector: string) {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;

  const NAV_OFFSET = 80; // clear the fixed HeroNav (matches scroll-padding-top intent)
  const EASE = 0.18;
  const MAX_MS = 4000;

  let cancelled = false;
  const cleanup = () => {
    window.removeEventListener("wheel", onUserScroll);
    window.removeEventListener("touchstart", onUserScroll);
    window.removeEventListener("keydown", onKey);
  };
  const onUserScroll = () => {
    cancelled = true;
    cleanup();
  };
  const onKey = (e: KeyboardEvent) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) {
      onUserScroll();
    }
  };
  window.addEventListener("wheel", onUserScroll, { passive: true });
  window.addEventListener("touchstart", onUserScroll, { passive: true });
  window.addEventListener("keydown", onKey);

  const start = performance.now();
  let lastTargetY = Number.NaN;
  let stableFrames = 0;

  const step = (now: number) => {
    if (cancelled) return;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = Math.min(
      Math.max(target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, 0),
      Math.max(maxScroll, 0)
    );
    const current = window.scrollY;
    const diff = targetY - current;

    window.scrollTo(0, Math.abs(diff) < 1 ? targetY : current + diff * EASE);

    const settled = Math.abs(diff) < 1.5 && Math.abs(targetY - lastTargetY) < 1.5;
    stableFrames = settled ? stableFrames + 1 : 0;
    lastTargetY = targetY;

    if (stableFrames >= 4 || now - start > MAX_MS) {
      window.scrollTo(0, targetY);
      cleanup();
      return;
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

interface CTAButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  // When true, href is treated as an in-page anchor (#id) and the button smooth-scrolls
  // to it instead of routing. globals.css already sets `scroll-behavior: smooth` and
  // `scroll-padding-top: 72px` so scrollIntoView lands correctly under the fixed nav.
  anchor?: boolean;
}

export function CTAButton({ variant, children, onClick, href, anchor }: CTAButtonProps) {
  const router = useRouter();

  useEffect(() => {
    if (href && !anchor) router.prefetch(href);
  }, [href, anchor, router]);
  const ref = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const auraBackground = useMotionTemplate`radial-gradient(
    120px circle at ${mouseX}px ${mouseY}px,
    ${variant === "primary"
      ? "rgba(255,191,0,0.12)"
      : "rgba(255,255,255,0.06)"},
    transparent 80%
  )`;

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleClick() {
    onClick?.();
    if (!href) return;
    if (anchor) {
      smoothScrollToAnchor(href);
      return;
    }
    router.push(href);
  }

  if (variant === "primary") {
    return (
      <motion.button
        ref={ref}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium text-[#121212] bg-[#FFBF00] border-0 cursor-pointer transition-colors duration-300 hover:bg-[#FFD040]"
        style={{
          boxShadow:
            "0 0 25px 4px rgba(255,191,0,0.35), 0 8px 40px -10px rgba(0,0,0,0.8)",
          transition: "box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          if (e.currentTarget) {
            e.currentTarget.style.boxShadow =
              "0 0 45px 10px rgba(255,191,0,0.65), 0 8px 40px -10px rgba(0,0,0,0.8)";
          }
        }}
        onMouseLeave={(e) => {
          if (e.currentTarget) {
            e.currentTarget.style.boxShadow =
              "0 0 25px 4px rgba(255,191,0,0.35), 0 8px 40px -10px rgba(0,0,0,0.8)";
          }
        }}
      >
        {/* Cursor aura overlay — will-change: background keeps it on its own layer */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: auraBackground, willChange: "background" }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden px-6 py-4 text-xs tracking-[0.2em] uppercase font-medium text-[#aaaaaa] bg-white/5 border border-white/10 cursor-pointer backdrop-blur-sm transition-colors duration-300 hover:text-[#e0e0e0] hover:bg-white/10 hover:border-white/20"
      style={{
        boxShadow: "0 8px 40px -10px rgba(0,0,0,0.6)",
      }}
    >
      {/* Cursor aura overlay — will-change: background keeps it on its own layer */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: auraBackground, willChange: "background" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
