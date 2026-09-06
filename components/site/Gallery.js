import Image from "next/image";
import { site } from "@/data/site.js";

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 max-w-6xl mx-auto px-6 md:px-10">
      <div className="mb-12 md:mb-16">
        <h2 className="font-display text-section text-ink">
          Gallery
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {site.gallery.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square w-full overflow-hidden bg-milk border border-line"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover rounded-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
