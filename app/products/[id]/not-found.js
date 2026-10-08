import Link from "next/link";
import Navbar from "@/components/site/Navbar.js";
import Footer from "@/components/site/Footer.js";

export default function NotFound() {
  return (
    <>
      <Navbar solid />
      <main className="py-28 md:py-36 max-w-6xl mx-auto px-6 md:px-10 min-h-[60vh] flex flex-col items-start justify-center">
        <span className="text-xs uppercase tracking-wider text-muted font-medium">
          404 &bull; Item not found
        </span>
        <h1 className="font-display text-section text-ink mt-3">
          This item is not on our menu
        </h1>
        <p className="font-sans text-muted text-base mt-4 max-w-[62ch]">
          The product you are looking for may have been rotated off our seasonal
          selection or the link is incorrect.
        </p>

        <div className="mt-8">
          <Link
            href="/#menu"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-leaf text-milk hover:bg-leaf/90 transition-colors focus-visible:outline-leaf font-medium text-sm"
          >
            Back to menu
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
