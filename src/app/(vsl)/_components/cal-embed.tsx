// Mounts the Cal.com inline embed for the Constraint Review calendar.
// Snippet (origin + namespace + calLink + brand color) supplied by user — preserved verbatim.
// React-StrictMode-safe: a module-level guard prevents the bootstrap script from being
// appended twice. Subsequent mounts only re-run the inline + ui calls so the calendar
// renders into our container.

"use client";
import { useEffect, useRef, useState } from "react";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalFn>;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

let bootstrapped = false;

function bootstrap() {
  if (bootstrapped || typeof window === "undefined") return;
  bootstrapped = true;

  // Verbatim bootstrap from the user-supplied Cal.com embed snippet.
  (function (C: Window, A: string, L: string) {
    const p = function (a: CalFn, ar: IArguments | unknown[]) {
      a.q = a.q || [];
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function (...args: unknown[]) {
        const cal = C.Cal as CalFn;
        // eslint-disable-next-line prefer-rest-params
        const ar: IArguments = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).setAttribute("src", A);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function (...inner: unknown[]) {
            p(api as CalFn, inner);
          } as CalFn;
          const namespace = ar[1] as string;
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns = cal.ns || {};
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace] as unknown[]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
        void args;
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  window.Cal!("init", "constraint-review", { origin: "https://app.cal.com" });
}

export function CalEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Defer the embed.js bootstrap until the booking fold (bottom of /vsl) is near
    // the viewport, so the third-party script never competes with initial load. The
    // container reserves a fixed height upstream, so this causes no layout shift.
    let done = false;
    const init = () => {
      if (done) return;
      done = true;

      bootstrap();
      const Cal = window.Cal;
      if (!Cal || !Cal.ns) return;
      const ns = Cal.ns["constraint-review"];
      if (!ns) return;

      ns("inline", {
        elementOrSelector: "#my-cal-inline-constraint-review",
        config: {
          layout: "month_view",
          // Boolean (not the string "true") so Cal reliably renders the compact,
          // phone-friendly slots view on small screens instead of a squeezed month grid.
          useSlotsViewOnSmallScreen: true,
          theme: "auto",
        },
        calLink: "ryan-el-ghoul-houo4g/constraint-review",
      });

      ns("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#B8365A" },
          dark: { "cal-brand": "#B8365A" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      // Fade the skeleton out once the embed has had a moment to paint its iframe,
      // so the handoff from placeholder to live calendar is seamless.
      window.setTimeout(() => setReady(true), 1200);
    };

    // Primary trigger: render the moment the fold approaches the viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          init();
          io.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    io.observe(el);

    // Fallback warm-up: on a calm/idle main thread, render the calendar ahead of time
    // so it is already live before the user ever scrolls down. Never competes with the
    // critical VSL load (only fires once the thread is idle); init() is guarded so this
    // and the observer can't double-init. typeof guard keeps a real fallback for
    // browsers without requestIdleCallback (older Safari).
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idleHandle = hasIdle
      ? window.requestIdleCallback(() => init(), { timeout: 4000 })
      : window.setTimeout(init, 2500);

    return () => {
      io.disconnect();
      if (hasIdle) window.cancelIdleCallback(idleHandle as number);
      else window.clearTimeout(idleHandle as number);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Branded skeleton — shown until the Cal iframe paints, so the booking box is
          never an empty void. On-brand tracked label (matches the section eyebrow), no
          border-radius so it survives the global `* { border-radius:0 }` rule.
          Pointer-events off so it never blocks the live embed. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: ready ? 0 : 1, background: "#0d0d0d" }}
      >
        <span
          className="text-[11px] font-light tracking-[0.25em] text-[#555555] uppercase"
          style={{ animation: "cal-skeleton-pulse 1.6s ease-in-out infinite" }}
        >
          Preparing Calendar
        </span>
        <style>{`@keyframes cal-skeleton-pulse { 0%,100% { opacity: 0.35 } 50% { opacity: 0.8 } }`}</style>
      </div>

      <div
        ref={ref}
        id="my-cal-inline-constraint-review"
        className="relative"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
      />
    </div>
  );
}
