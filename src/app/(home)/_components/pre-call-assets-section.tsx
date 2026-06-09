// Three full-viewport pre-call asset embeds.
// Design system: §17 intro fold + 3 sibling min-h-screen blocks, each centered with its own
// eyebrow, split-color H3, subtext, and VSL embed (max-w-4xl).
// Placeholders for titles + subtexts — user fills final copy in next loop.

import { VSLPlayer } from "./vsl-player";
import { WistiaPlayer } from "./wistia-player";

const ASSETS: {
  num: string;
  titleLight: string;
  titleBurgundy: string;
  subtext: string;
  mediaId?: string;
  overlaySize?: { width: number; height: number };
}[] = [
  {
    num: "01",
    titleLight: "[Asset 01 — ",
    titleBurgundy: "Title]",
    subtext: "[Asset 01 subtext — one short Arysn-voice line setting the frame.]",
    mediaId: "kf8r68zh09",
    overlaySize: { width: 84, height: 32 },
  },
  {
    num: "02",
    titleLight: "[Asset 02 — ",
    titleBurgundy: "Title]",
    subtext: "[Asset 02 subtext — one short Arysn-voice line setting the frame.]",
  },
];

export function PreCallAssetsSection() {
  return (
    <>
      {/* Intro fold — tighter bottom padding to close the gap to asset 01 */}
      <section className="w-full px-6 pt-14 pb-4">
        <div className="max-w-2xl mx-auto w-full text-center">
          <p className="text-[11px] font-light tracking-[0.25em] text-[#555555] uppercase mb-4">
            Step 02 — Pre-Call Assets
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}
          >
            <span className="text-[#e0e0e0]">Two Resources </span>
            <span className="text-burgundy italic">To Prepare</span>
          </h2>
          <p className="text-base md:text-lg text-[#aaaaaa] leading-relaxed mt-4">
            Watch in order. Each builds on the last.
          </p>
        </div>
      </section>

      {/* Asset blocks — transparent background so the fixed Starfield shows through.
          zIndex: 1 keeps content above the z-0 particle canvas; text-shadow from
          globals.css masks particles from bleeding through glyphs. */}
      {ASSETS.map((a) => (
        <section
          key={a.num}
          className="relative w-full min-h-screen flex flex-col items-center px-6 pt-12 pb-24"
          style={{ zIndex: 1 }}
        >
          <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center gap-6">

            <p className="text-[11px] font-light tracking-[0.25em] text-[#555555] uppercase">
              Asset {a.num}
            </p>

            <h3
              className="text-3xl md:text-4xl font-semibold leading-[1.1] tracking-tight"
              style={{ textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}
            >
              <span className="text-[#e0e0e0]">{a.titleLight}</span>
              <span className="text-burgundy italic">{a.titleBurgundy}</span>
            </h3>

            <p className="text-base md:text-lg text-[#aaaaaa] leading-relaxed max-w-xl">
              {a.subtext}
            </p>

            <div className="w-full mt-2">
              {a.mediaId
                ? <WistiaPlayer mediaId={a.mediaId} overlaySize={a.overlaySize} />
                : <VSLPlayer videoUrl={undefined} />
              }
            </div>

          </div>
        </section>
      ))}
    </>
  );
}
