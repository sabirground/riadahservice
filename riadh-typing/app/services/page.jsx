"use client";

import { rawServices } from "../data/services";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  HoverScale,
  GoldAccentLine,
} from "../components/MicroInteractions";

export default function ServicesPage() {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(
        window.location.hash.substring(1)
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
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
              className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
            >
              What We Offer
            </motion.span>
            <h1 className="text-display-xl text-slate-900 mb-6">
              Our <span className="text-gradient-gold">Services</span>
            </h1>
            <GoldAccentLine className="w-24 mx-auto mb-6" />
            <p className="text-body-lg text-slate-600">
              Comprehensive business solutions tailored for the UAE market. From
              visa services to business setup, we've got you covered.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Services List */}
      <section className="section bg-sand-pattern">
        <div className="container">
          <StaggerContainer staggerDelay={0.15}>
            {rawServices.map((group, index) => (
              <StaggerItem key={index}>
                <div className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white text-xl shadow-glow-gold">
                      {group.category.charAt(0)}
                    </div>
                    <h2
                      id={group.category
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "")}
                      className="text-display-sm text-slate-900"
                    >
                      {group.category}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {group.items.map((item, i) => (
                      <TiltCard key={i}>
                        <HoverScale>
                          <div className="card p-6 h-full flex flex-col justify-between group hover:border-gold-300 transition-colors duration-300">
                            <div>
                              <div className="w-10 h-10 rounded-lg bg-sand-100 flex items-center justify-center mb-4 group-hover:bg-gold-100 transition-colors duration-300">
                                <span className="text-gold-600 font-semibold">
                                  {item.charAt(0)}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">
                                {item}
                              </h3>
                            </div>
                            <Link
                              href={`/services/${item
                                .toLowerCase()
                                .replace(/ /g, "-")}`}
                              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors duration-300"
                            >
                              View Details
                              <svg
                                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Link>
                          </div>
                        </HoverScale>
                      </TiltCard>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="container">
          <FadeInOnScroll>
            <div className="glass-card-dark p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-display-md text-white mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-body-lg text-white/70 mb-8">
                Contact us for personalized services tailored to your specific
                requirements.
              </p>
              <Link href="/get-quote">
                <motion.span
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-slate-900 bg-gradient-to-r from-gold-400 to-gold-500 rounded-xl shadow-glow-gold"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Free Quote
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.span>
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
