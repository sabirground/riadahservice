"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
} from "./MicroInteractions";

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/our-team", label: "Our Team" },
    { href: "/get-quote", label: "Get Free Quote" },
  ];

  const services = [
    "Typing Services",
    "PRO Services",
    "Business Setup",
    "Document Clearing",
    "Visa Services",
    "Translation",
  ];

  const socialLinks = [
    {
      href: "https://www.instagram.com/riadah_typing_office/",
      label: "Instagram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12.017 0C8.396 0 7.609.034 6.298.078c-1.31.044-2.204.222-2.988.476A5.96 5.96 0 001.464 1.464a5.96 5.96 0 00-.476 1.31C.222 3.558.044 4.452.044 5.762.034 7.073 0 7.86 0 11.481c0 3.621.034 4.408.078 5.719.044 1.31.222 2.204.476 2.988a5.96 5.96 0 001.31.476c.784.254 1.678.432 2.988.476 1.31.044 2.097.078 5.719.078 3.621 0 4.408-.034 5.719-.078 1.31-.044 2.204-.222 2.988-.476a5.96 5.96 0 001.31-.476c.254-.784.432-1.678.476-2.988.044-1.31.078-2.097.078-5.719 0-3.621-.034-4.408-.078-5.719-.044-1.31-.222-2.204-.476-2.988a5.96 5.96 0 00-.476-1.31A5.96 5.96 0 0020.526.476c-.784-.254-1.678-.432-2.988-.476C16.227.034 15.44 0 11.819 0h-.802zm.034 1.917c3.546 0 3.967.013 5.369.077.698.032 1.088.148 1.345.246.33.128.569.282.818.531.249.249.403.488.531.818.098.257.214.647.246 1.345.064 1.402.077 1.823.077 5.369s-.013 3.967-.077 5.369c-.032.698-.148 1.088-.246 1.345-.128.33-.282.569-.531.818a2.19 2.19 0 01-.818.531c-.257.098-.647.214-1.345.246-1.402.064-1.823.077-5.369.077s-3.967-.013-5.369-.077c-.698-.032-1.088-.148-1.345-.246a2.19 2.19 0 01-.818-.531 2.19 2.19 0 01-.531-.818c-.098-.257-.214-.647-.246-1.345C1.95 15.448 1.937 15.027 1.917 11.481c0-3.546.013-3.967.077-5.369.032-.698.148-1.088.246-1.345.128-.33.282-.569.531-.818.249-.249.488-.403.818-.531.257-.098.647-.214 1.345-.246 1.402-.064 1.823-.077 5.369-.077zm0 1.917a7.564 7.564 0 100 15.128 7.564 7.564 0 000-15.128zm0 12.481a4.917 4.917 0 110-9.834 4.917 4.917 0 010 9.834zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
        </svg>
      ),
    },
    {
      href: "https://www.facebook.com/p/Riadah-Typing-office-100089900881176/",
      label: "Facebook",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500" />

      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 py-16">
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          staggerDelay={0.1}
        >
          {/* Company */}
          <StaggerItem>
            <div>
              <Link href="/" className="inline-block mb-6">
                <img
                  src="/Images/ftviewlog-removebg-preview (1).png"
                  alt="Riadah Services"
                  className="h-12 w-auto brightness-0 invert"
                />
              </Link>
              <p className="text-sm leading-relaxed text-slate-400 mb-6">
                Professional business services in the UAE. We deliver reliable,
                compliant, and high-quality solutions for individuals and
                businesses.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-gold-400 hover:bg-slate-700 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Quick Links */}
          <StaggerItem>
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-gold-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-400 transition-colors duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Services */}
          <StaggerItem>
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-sm text-slate-400 hover:text-gold-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-400 transition-colors duration-300" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Contact */}
          <StaggerItem>
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Khalifa+Street%2C+Behind+Al+Falah+Plaza+Al+Ain+U.A.E"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-gold-400 transition-colors duration-300 flex items-start gap-3"
                  >
                    <span className="text-gold-500 mt-0.5">📍</span>
                    <span>
                      Khalifa Street,
                      <br />
                      Behind Al Falah Plaza
                      <br />
                      Al Ain, U.A.E
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/message/666A6V5SX3VWJ1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-gold-400 transition-colors duration-300 flex items-center gap-3"
                  >
                    <span className="text-gold-500">📱</span>
                    <span>+971 05 800 3934</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:riadahtyping@gmail.com"
                    className="text-sm text-slate-400 hover:text-gold-400 transition-colors duration-300 flex items-center gap-3"
                  >
                    <span className="text-gold-500">✉️</span>
                    <span>riadahtyping@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom */}
        <FadeInOnScroll delay={0.3}>
          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} Riadah Services. All rights
                reserved.
              </p>

              <div className="flex items-center gap-6">
                <Link
                  href="#"
                  className="text-sm text-slate-500 hover:text-gold-400 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-slate-500 hover:text-gold-400 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
                <span className="text-sm text-slate-500 flex items-center gap-2">
                  <span className="text-lg">🇦🇪</span>
                  UAE Business Standards
                </span>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </footer>
  );
}
