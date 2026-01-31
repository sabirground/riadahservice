"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import EnquiryForm from "@/app/components/EnquiryForm";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  HoverScale,
  GoldAccentLine,
} from "../components/MicroInteractions";

const highlights = [
  {
    icon: "⚡",
    title: "Quick Response",
    description: "We usually respond within 24 hours.",
  },
  {
    icon: "💼",
    title: "Professional Team",
    description: "Experienced professionals following UAE regulations.",
  },
  {
    icon: "🔒",
    title: "100% Confidential",
    description: "Your information is safe and secure with us.",
  },
];

export default function GetQuotePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-sand-50 via-sand-100 to-sand-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <FadeInOnScroll className="text-center max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 bg-gold-100 text-gold-800 rounded-full text-sm font-medium mb-6"
            >
              Get Started
            </motion.span>
            <h1 className="text-display-xl text-slate-900 mb-6">
              Get a <span className="text-gradient-gold">Free Quote</span>
            </h1>
            <GoldAccentLine className="w-24 mx-auto mb-6" />
            <p className="text-body-lg text-slate-600">
              Tell us your requirements and our team will get back to you with a
              customized solution tailored for UAE standards.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-gold-600 transition-colors duration-300 group"
              >
                View Our Services
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Trust Highlights */}
      <section className="section bg-white">
        <div className="container">
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            staggerDelay={0.15}
          >
            {highlights.map((item, index) => (
              <StaggerItem key={index}>
                <TiltCard>
                  <HoverScale>
                    <div className="card p-8 text-center h-full group hover:border-gold-300 transition-colors duration-300">
                      <motion.div
                        className="text-4xl mb-4"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </HoverScale>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="section bg-sand-pattern">
        <div className="container">
          <FadeInOnScroll>
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-8 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="text-display-sm text-slate-900 mb-4">
                    Send Us Your Enquiry
                  </h2>
                  <GoldAccentLine className="w-20 mx-auto" />
                  <p className="text-slate-600 mt-4">
                    Fill out the form below and we'll get back to you as
                    soon as possible.
                  </p>
                </div>
                <EnquiryForm />
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="container">
          <FadeInOnScroll>
            <div className="glass-card-dark p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-display-md text-white mb-8">
                Prefer to Call?
              </h2>
              <p className="text-white/70 mb-8 text-lg">
                Our team is available Sunday to Thursday, 8:00 AM to 6:00 PM
                UAE time.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="https://wa.me/message/666A6V5SX3VWJ1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-slate-900 bg-gradient-to-r from-gold-400 to-gold-500 rounded-xl shadow-glow-gold"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </motion.span>
                </a>
                <a href="tel:+971058003934">
                  <motion.span
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call Us
                  </motion.span>
                </a>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
