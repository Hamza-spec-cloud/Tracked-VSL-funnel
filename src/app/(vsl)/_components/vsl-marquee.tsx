import { SmartImage } from "./smart-image";

const LOGOS: { src: string; alt: string; width: number; height: number; maxHeight?: number }[] = [
  { src: "/vsl/marquee/10ft-studio.png",       alt: "10FT Studio",                 width: 480, height: 272 },
  { src: "/vsl/testimonials/galriv-logo.png",  alt: "Galriv Capital",              width: 480, height: 272, maxHeight: 96 },
  { src: "/vsl/marquee/diamond-institute.png", alt: "Diamond Trading Institution", width: 480, height: 272 },
  { src: "/vsl/marquee/byeb.png",              alt: "BYEB",                        width: 480, height: 272 },
  { src: "/vsl/marquee/commission-club.png",   alt: "Commission Club",             width: 480, height: 272 },
];

export function VSLMarquee() {
  return (
    <section
      aria-label="Operators we work with"
      className="relative w-full pt-24 pb-16"
    >
      <div className="flex justify-center mb-3">
        <div style={{ width: 160, borderTop: "1px solid rgba(255,255,255,0.08)" }} />
      </div>

      <div
        className="relative max-w-5xl mx-auto overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="flex items-center w-max marquee-track gap-3">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="shrink-0 flex items-center justify-center"
              style={{ height: logo.height }}
            >
              <SmartImage
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                // Logos render ~480px wide (272px tall, 16:9). sizes must match the real
                // render width so retina desktops get a true-size variant instead of an
                // upscaled 240px one (the cause of the "downgraded" look). quality 85
                // (next.config allow-list) keeps the brand marks crisp under screen blend.
                sizes="480px"
                quality={85}
                style={{
                  mixBlendMode: "screen",
                  objectFit: "contain",
                  height: "100%",
                  width: "auto",
                  ...(logo.maxHeight ? { maxHeight: logo.maxHeight } : {}),
                }}
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-3">
        <div style={{ width: 160, borderTop: "1px solid rgba(255,255,255,0.08)" }} />
      </div>
    </section>
  );
}
