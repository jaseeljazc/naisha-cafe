"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button.jsx";
import Navbar from "@/components/site/Navbar.js";
import Footer from "@/components/site/Footer.js";

export default function Error({ reset }) {
  return (
    <>
      <Navbar solid />
      <main className="py-28 md:py-36 max-w-6xl mx-auto px-6 md:px-10 min-h-[60vh] flex flex-col items-start justify-center">
        <h1 className="font-display text-section text-ink">
          Something went wrong
        </h1>
        <p className="font-sans text-muted text-base mt-4 max-w-[62ch]">
          We could not load the details for this menu item. Please try again or return to the menu.
        </p>

        <div className="flex items-center gap-4 mt-8">
          <Button
            onClick={() => reset()}
            className="bg-leaf text-milk hover:bg-leaf/90 cursor-pointer"
          >
            Try again
          </Button>
          <Link
            href="/#menu"
            className="inline-flex items-center text-sm font-medium text-ink hover:text-leaf transition-colors focus-visible:outline-leaf"
          >
            Back to menu
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
