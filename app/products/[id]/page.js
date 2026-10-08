import { notFound } from "next/navigation";
import Navbar from "@/components/site/Navbar.js";
import Footer from "@/components/site/Footer.js";
import ProductDetail from "@/components/site/ProductDetail.js";
import { getProductById, getRelatedProducts } from "@/lib/products.js";
import { site } from "@/data/site.js";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return { title: `Item not found — ${site.name}` };
    }
    return {
      title: `${product.name} — ${site.name}`,
      description:
        product.description ||
        `Enjoy our freshly prepared ${product.name} at ${site.name}.`,
    };
  } catch {
    return { title: `Menu item — ${site.name}` };
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  // A database failure here is thrown on purpose so error.js shows it;
  // notFound() is only for an id that does not exist.
  const product = await getProductById(id);
  if (!product) notFound();

  // Related items are optional, so the page still renders without them.
  let related = [];
  try {
    related = await getRelatedProducts(product.category, product._id, 3);
  } catch {
    related = [];
  }

  return (
    <>
      <Navbar solid />
      <main>
        <ProductDetail product={product} related={related} />
      </main>
      <Footer />
    </>
  );
}
