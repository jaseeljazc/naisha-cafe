"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/site.js";

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="bg-ink text-paper mt-20 md:mt-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12 border-b border-paper/15">
          {/* Brand */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <span className="font-display text-2xl tracking-tight">
              {site.name}
            </span>
            <p className="text-sm text-paper/70 max-w-[30ch]">
              {site.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <span className="font-medium text-sm text-paper/90">
              Quick links
            </span>
            <div className="flex flex-col gap-2 text-sm text-paper/70">
              <a
                href="#menu"
                className="hover:text-paper transition-colors focus-visible:outline-leaf"
              >
                Menu
              </a>
              <a
                href="#hours"
                className="hover:text-paper transition-colors focus-visible:outline-leaf"
              >
                Opening hours
              </a>
              <a
                href="#location"
                className="hover:text-paper transition-colors focus-visible:outline-leaf"
              >
                Location &amp; directions
              </a>
              <a
                href="#gallery"
                className="hover:text-paper transition-colors focus-visible:outline-leaf"
              >
                Gallery
              </a>
            </div>
          </div>

          {/* Address repeated */}
          <div className="flex flex-col gap-3">
            <span className="font-medium text-sm text-paper/90">
              Visit us
            </span>
            <p className="text-sm text-paper/70 leading-relaxed">
              {site.address}
            </p>
            <p className="text-sm text-paper/70">
              {site.phone}
            </p>
          </div>

          {/* Socials & Back to top */}
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="font-medium text-sm text-paper/90">
                Follow
              </span>
              <div className="flex flex-col gap-2 text-sm text-paper/70">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-paper transition-colors focus-visible:outline-leaf"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-sm font-medium text-paper/80 hover:text-paper transition-colors focus-visible:outline-leaf cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Centered bottom line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper/60">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <Link
            href="/admin"
            className="hover:text-paper transition-colors focus-visible:outline-leaf"
          >
            Admin login
          </Link>
        </div>
      </div>
    </footer>
  );
}
