// Step 01 execution point — eyebrow + 1-line directive + the two confirmation CTAs.
// Lifted out of the original hero so the hero can frame the orientation video without
// competing visual weight. No card, no glow — a clean band of typography + CTAs.
// Design system: §17 header rhythm with reduced py-16 (this fold is execution, not headline).

"use client";
import { MessageSquare, MessageCircle } from "lucide-react";
import { CTAButton } from "./cta-button";

const SMS_HREF = "sms:+2633812461?&body=Confirming%20my%20System%20Diagnostic.";
const WA_HREF = "https://wa.me/2633812461?text=Confirming%20my%20System%20Diagnostic.";

export function ConfirmCallSection() {
  return (
    <section className="w-full px-6 pt-4 pb-16">
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center text-center gap-4">

        <p className="text-[11px] font-light tracking-[0.25em] text-[#555555] uppercase">
          Step 01 — Confirm Your Attendance
        </p>

        <p className="text-base md:text-lg text-[#aaaaaa] leading-relaxed max-w-xl">
          Tap a button below and send the prefilled message.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">

          {/* SMS — mobile only */}
          <span className="sm:hidden">
            <CTAButton
              variant="primary"
              onClick={() => { window.location.href = SMS_HREF; }}
            >
              <span className="inline-flex items-center gap-2">
                <MessageSquare size={14} strokeWidth={1.25} />
                Confirm via Text
              </span>
            </CTAButton>
          </span>

          {/* WhatsApp secondary — mobile only (SMS is primary on mobile) */}
          <span className="sm:hidden">
            <CTAButton
              variant="secondary"
              onClick={() => { window.location.href = WA_HREF; }}
            >
              <span className="inline-flex items-center gap-2">
                <MessageCircle size={14} strokeWidth={1.25} />
                Confirm via WhatsApp
              </span>
            </CTAButton>
          </span>

          {/* WhatsApp primary — desktop only (sole CTA above sm breakpoint) */}
          <span className="hidden sm:inline-flex">
            <CTAButton
              variant="primary"
              onClick={() => { window.location.href = WA_HREF; }}
            >
              <span className="inline-flex items-center gap-2">
                <MessageCircle size={14} strokeWidth={1.25} />
                Confirm via WhatsApp
              </span>
            </CTAButton>
          </span>

        </div>

      </div>
    </section>
  );
}
