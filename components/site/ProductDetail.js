import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/utils.js";
import { site } from "@/data/site.js";

export default function ProductDetail({ product, related = [] }) {
  return (
    <article className="py-28 md:py-36 max-w-6xl mx-auto px-6 md:px-10">
      <nav className="mb-8 md:mb-12">
        <Link
          href="/#menu"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-leaf transition-colors focus-visible:outline-leaf"
        >
          <ArrowLeft className="size-4" />
          <span>Back to menu</span>
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="relative aspect-square md:aspect-4/3 w-full overflow-hidden border border-line bg-milk rounded-none">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted text-sm">
              No image available
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-muted font-medium">
            {product.category}
          </span>

          <h1 className="font-display text-section text-ink mt-2">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 mt-3">
            <span className="font-display text-3xl text-ink tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.isSpecial && (
              <span className="text-xs text-ochre font-medium">
                [special]
              </span>
            )}
          </div>

          <div className="border-b border-line my-6" />

          {product.description && (
            <p className="font-sans text-base text-muted leading-relaxed max-w-[62ch]">
              {product.description}
            </p>
          )}

          <div className="bg-milk border border-line p-6 mt-8 rounded-none">
            <h2 className="font-display text-lg text-ink mb-2">
              Café details
            </h2>
            <ul className="text-sm text-muted flex flex-col gap-2">
              <li>Prepared fresh to order using artisan ingredients</li>
              <li>Available for dine-in and takeaway</li>
              <li>{site.address}</li>
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 md:mt-28 pt-12 border-t border-line">
          <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">
            More from {product.category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item._id}
                href={`/products/${item._id}`}
                className="group border border-line bg-milk p-4 flex flex-col justify-between hover:border-leaf/60 transition-colors focus-visible:outline-leaf rounded-none"
              >
                <div>
                  {item.imageUrl && (
                    <div className="relative aspect-4/3 w-full overflow-hidden border border-line mb-3 bg-paper">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <h3 className="font-display text-lg text-ink group-hover:text-leaf transition-colors">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-muted mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
                  <span className="font-display text-price text-ink tabular-nums">
                    {formatPrice(item.price)}
                  </span>
                  {item.isSpecial && (
                    <span className="text-xs text-ochre font-medium">
                      [special]
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
