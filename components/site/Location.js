import { site } from "@/data/site.js";

export default function Location() {
  return (
    <section id="location" className="py-20 md:py-28 max-w-6xl mx-auto px-6 md:px-10">
      <div className="mb-12 md:mb-16">
        <h2 className="font-display text-section text-ink">
          Location
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Left Column: Contact details */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-xl text-ink">
              Address
            </h3>
            <p className="font-sans text-muted text-base max-w-[62ch]">
              {site.address}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-display text-xl text-ink">
              Contact
            </h3>
            <div className="flex flex-col gap-1 text-base">
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="text-ink hover:text-leaf transition-colors focus-visible:outline-leaf"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-ink hover:text-leaf transition-colors focus-visible:outline-leaf"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div>
            <a
              href={site.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-leaf text-milk hover:bg-leaf/90 transition-colors font-medium text-base focus-visible:outline-leaf"
            >
              Get directions
            </a>
          </div>
        </div>

        {/* Right Column: Embedded Google Map */}
        <div className="w-full">
          <iframe
            src={site.mapsEmbedUrl}
            title="Kettle & Crumb location map"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full aspect-4/3 border border-line rounded-none"
          />
        </div>
      </div>
    </section>
  );
}
