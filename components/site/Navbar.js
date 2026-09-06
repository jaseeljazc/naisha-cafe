"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? "bg-paper/95 text-ink border-b border-line shadow-sm backdrop-blur-xs"
          : "bg-transparent text-paper"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-2xl tracking-tight focus-visible:outline-leaf"
        >
          {site.name}
        </a>

        <nav className="hidden md:flex items-center gap-8 text-base font-medium">
          <a
            href="#menu"
            className="hover:opacity-80 transition-opacity focus-visible:outline-leaf"
          >
            Menu
          </a>
          <a
            href="#hours"
            className="hover:opacity-80 transition-opacity focus-visible:outline-leaf"
          >
            Hours
          </a>
          <a
            href="#location"
            className="hover:opacity-80 transition-opacity focus-visible:outline-leaf"
          >
            Find us
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:opacity-80 focus-visible:outline-leaf"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-paper text-ink border-b border-line px-6 py-6 flex flex-col gap-4 shadow-sm">
          <a
            href="#menu"
            onClick={() => setIsOpen(false)}
            className="text-lg py-1 border-b border-line/50 focus-visible:outline-leaf"
          >
            Menu
          </a>
          <a
            href="#hours"
            onClick={() => setIsOpen(false)}
            className="text-lg py-1 border-b border-line/50 focus-visible:outline-leaf"
          >
            Hours
          </a>
          <a
            href="#location"
            onClick={() => setIsOpen(false)}
            className="text-lg py-1 focus-visible:outline-leaf"
          >
            Find us
          </a>
        </div>
      )}
    </header>
  );
}
