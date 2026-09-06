import Image from "next/image";
import { formatPrice } from "@/lib/utils.js";

const CATEGORIES = ["Coffee", "Tea", "Pastries", "Food"];

export default function MenuSection({ products = [] }) {
  const hasProducts = products && products.length > 0;

  return (
    <section id="menu" className="py-20 md:py-28 max-w-6xl mx-auto px-6 md:px-10">
      <div className="mb-12 md:mb-16">
        <h2 className="font-display text-section text-ink">
          Menu
        </h2>
      </div>

      {!hasProducts ? (
        <p className="font-sans text-muted text-base">
          No items yet. Add the first one from the admin panel.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16 items-start">
          {CATEGORIES.map((category) => {
            const items = products.filter((p) => p.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} className="flex flex-col gap-5">
                <h3 className="font-display text-2xl md:text-3xl text-ink pb-2 border-b border-line">
                  {category}
                </h3>

                <div className="flex flex-col divide-y divide-line">
                  {items.map((item) => (
                    <article key={item._id} className="py-4 flex items-start gap-4">
                      {item.imageUrl && (
                        <div className="relative size-14 shrink-0 overflow-hidden border border-line bg-milk">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="56px"
                            className="object-cover rounded-none"
                          />
                        </div>
                      )}

                      <div className="flex flex-col gap-1 grow min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-item text-ink shrink-0">
                            {item.name}
                          </span>
                          <span
                            className="grow border-b border-dotted border-line min-w-4 mb-1"
                            aria-hidden="true"
                          />
                          <span className="font-display text-price text-ink tabular-nums shrink-0">
                            {formatPrice(item.price)}
                          </span>
                        </div>

                        <div className="flex items-baseline justify-between gap-4">
                          {item.description ? (
                            <p className="font-sans text-sm text-muted max-w-[62ch]">
                              {item.description}
                            </p>
                          ) : (
                            <span />
                          )}
                          {item.isSpecial && (
                            <span className="font-sans text-xs text-ochre font-medium shrink-0 ml-auto">
                              [special]
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
