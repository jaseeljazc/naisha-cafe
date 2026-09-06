import Navbar from "@/components/site/Navbar.js";
import Hero from "@/components/site/Hero.js";
import MenuSection from "@/components/site/MenuSection.js";
import Hours from "@/components/site/Hours.js";
import Location from "@/components/site/Location.js";
import Gallery from "@/components/site/Gallery.js";
import Footer from "@/components/site/Footer.js";
import { getProducts } from "@/lib/products.js";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products = [];
  try {
    products = await getProducts();
  } catch (error) {
    products = [];
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MenuSection products={products} />
        <Hours />
        <Location />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
