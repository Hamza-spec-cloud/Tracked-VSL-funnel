// 3-step intro section.
// Design system: §17 standard section template + §18a matrix grid (border-t/b at 0.06,
// py-8 vertical detach, lg:divide-x for column dividers, step number eyebrow per §18a).
// Icons via Lucide strokeWidth={1.25}, color #e0e0e0. §16 IconBox at md.

import { Phone, Layers, Calculator } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StepIconCell } from "./step-icon-cell";

const STEPS: { icon: LucideIcon; number: string; title: string; description: string }[] = [
  {
    icon: Phone,
    number: "01",
    title: "Confirm The Call",
    description:
      "Two prefilled messages below. Send one to lock the slot. Calls without a confirmation message are released back to the queue.",
  },
  {
    icon: Layers,
    number: "02",
    title: "Watch The Two Pre-Call Assets",
    description:
      "Two timed, tactical resources further down the page. Each is sequenced — together they compress ramp-up so the call moves at full speed.",
  },
  {
    icon: Calculator,
    number: "03",
    title: "Gather Your Numbers",
    description:
      "Current revenue, average deal size, close rate, and runway. The more precise your inputs, the more actionable the diagnostic output.",
  },
];

export function PreCallStepsSection() {
  return (
    <section className="w-full px-6 py-14">
      <div className="max-w-6xl mx-auto w-full">

        {/* §17 section header — no eyebrow (the individual step sections below carry the
            "STEP 0X" labels; this is the overview pane) */}
        <div className="text-center max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}
          >
            <span className="text-[#e0e0e0]">Then Do These Three Things </span>
            <span className="text-burgundy italic">Before Your Call</span>
          </h2>
          <p className="text-base md:text-lg text-[#aaaaaa] leading-relaxed mt-4">
            Three precise actions between now and the call. Complete every one
            — or the slot is released.
          </p>
        </div>

        {/* §18a matrix grid */}
        <div
          className="mt-14 py-8"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:divide-x divide-white/[0.06]">
            {STEPS.map((step) => (
              <div key={step.number} className="flex flex-col px-10 py-10">

                <p className="text-[11px] font-light tracking-[0.25em] text-[#555555] uppercase mb-6">
                  Step {step.number}
                </p>

                <StepIconCell icon={step.icon} size="md" />

                <p className="text-base font-semibold text-[#e0e0e0] tracking-tight leading-snug mt-6">
                  {step.title}
                </p>

                <p className="text-sm text-[#aaaaaa] leading-relaxed mt-3">
                  {step.description}
                </p>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
