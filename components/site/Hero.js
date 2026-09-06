import Image from "next/image";
import { site } from "@/data/site.js";
import { isOpenNow } from "@/lib/utils.js";

export default function Hero() {
  const status = isOpenNow(site.hours);

  return (
    <section className="relative min-h-[85svh] md:h-screen w-full flex items-end overflow-hidden">
      {/* Background photo */}
      <Image
        src={site.heroImage}
        alt="Kettle & Crumb café interior and coffee bar"
        fill
        priority
        className="object-cover -z-20"
      />

      {/* Ink overlay at 55% */}
      <div className="absolute inset-0 bg-[#221A12]/55 -z-10" />

      {/* Hero content */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-32">
        <div className="max-w-3xl flex flex-col gap-6">
          <div className="hero-animate-title">
            <h1 className="font-display text-hero text-paper leading-[0.92] tracking-tight">
              Kettle &amp;
              <br />
              Crumb
            </h1>
          </div>

          <p className="hero-animate-tagline font-sans text-lg md:text-xl text-paper/90 max-w-[62ch]">
            {site.tagline}
          </p>

          <div className="hero-animate-status flex items-center gap-2.5 text-paper text-sm md:text-base font-medium">
            {status.open ? (
              <>
                <span className="inline-block size-2.5 rounded-full bg-[#4ade80]" />
                <span>Open now — until {status.until}</span>
              </>
            ) : (
              <>
                <span className="inline-block size-2.5 rounded-full border border-paper/60" />
                <span>Closed — opens at {status.until}</span>
              </>
            )}
          </div>

          <div className="hero-animate-actions flex flex-wrap items-center gap-6 pt-2">
            <a
              href="#menu"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-leaf text-milk hover:bg-leaf/90 transition-colors font-medium text-base focus-visible:outline-leaf"
            >
              See the menu
            </a>
            <a
              href="#location"
              className="inline-flex items-center justify-center py-3 text-paper hover:text-paper/80 transition-colors font-medium text-base underline underline-offset-4 focus-visible:outline-leaf"
            >
              Find us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
