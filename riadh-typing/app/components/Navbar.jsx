"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/Images/logo.png.jpeg"
            alt="Riadah Services Logo"
            className="h-10 w-auto hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-[var(--primary)]">
            Home
          </Link>
          <Link href="/services" className="hover:text-[var(--primary)]">
            Services
          </Link>
           <Link href="/our-team" className="hover:text-[var(--primary)]">
          Our Team
          </Link>

          <Link href="/get-quote" className="btn btn-primary">
            Get Quote
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 gap-4 font-medium">
            <Link onClick={() => setOpen(false)} href="/">
              Home
            </Link>
            <Link onClick={() => setOpen(false)} href="/services">
              Services
            </Link>
            <Link onClick={() => setOpen(false)} href="/our-team">
              Our Team
            </Link>
            <Link onClick={() => setOpen(false)} href="/contact">
              Contact
            </Link>

            <Link
              onClick={() => setOpen(false)}
              href="/get-quote"
              className="btn btn-primary text-center"
            >
              Get Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
