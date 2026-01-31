"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Set active link based on current path
    setActiveLink(window.location.pathname);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/our-team", label: "Our Team" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-glass border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="/Images/logo.png-removebg-preview.png"
              alt="Riadah Services Logo"
              className="h-12 w-auto transition-all duration-300 group-hover:drop-shadow-lg"
            />
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
            >
              <Link
                href={link.href}
                className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full group ${
                  activeLink === link.href
                    ? "text-primary"
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {activeLink === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-sand-100 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <motion.div
                  className="absolute inset-0 bg-sand-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </Link>
            </motion.div>
          ))}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Link
              href="/get-quote"
              className="ml-4 relative overflow-hidden group"
            >
              <motion.span
                className="relative inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark rounded-full shadow-glow-primary"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span>Get Quote</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.span>
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-sand-100 hover:bg-sand-200 transition-colors duration-300"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-5 h-4 flex flex-col justify-between">
            <motion.span
              className="w-full h-0.5 bg-slate-800 rounded-full origin-left"
              animate={{
                rotate: open ? 45 : 0,
                y: open ? 0 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-full h-0.5 bg-slate-800 rounded-full"
              animate={{
                opacity: open ? 0 : 1,
                scaleX: open ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-full h-0.5 bg-slate-800 rounded-full origin-left"
              animate={{
                rotate: open ? -45 : 0,
                y: open ? 0 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-sand-200 overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    onClick={() => setOpen(false)}
                    href={link.href}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                      activeLink === link.href
                        ? "bg-sand-100 text-primary"
                        : "text-slate-600 hover:bg-sand-50 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-4"
              >
                <Link
                  onClick={() => setOpen(false)}
                  href="/get-quote"
                  className="block w-full text-center px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary to-primary-dark rounded-xl shadow-glow-primary"
                >
                  Get Quote
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
