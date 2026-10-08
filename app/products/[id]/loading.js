import Navbar from "@/components/site/Navbar.js";
import Footer from "@/components/site/Footer.js";

export default function Loading() {
  return (
    <>
      <Navbar solid />
      <main className="py-28 md:py-36 max-w-6xl mx-auto px-6 md:px-10">
        <div className="h-4 w-28 bg-line/40 animate-pulse mb-8 md:mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="aspect-square md:aspect-4/3 w-full bg-line/30 animate-pulse border border-line" />

          <div className="flex flex-col gap-4">
            <div className="h-4 w-20 bg-line/40 animate-pulse" />
            <div className="h-10 w-3/4 bg-line/40 animate-pulse" />
            <div className="h-8 w-24 bg-line/40 animate-pulse mt-2" />
            <div className="border-b border-line my-4" />
            <div className="h-4 w-full bg-line/30 animate-pulse" />
            <div className="h-4 w-5/6 bg-line/30 animate-pulse" />
            <div className="h-32 w-full bg-milk border border-line mt-6" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
