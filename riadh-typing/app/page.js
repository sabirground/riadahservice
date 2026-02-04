"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import services from "./data/services.js";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  HoverScale,
  GoldAccentLine,
} from "./components/MicroInteractions";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-sand-gradient">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-100 text-gold-800 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-gold-500 rounded-full" />
                Trusted UAE Business Partner
              </div>

              <h1 className="text-display-xl text-slate-900 mb-6">
                Professional Business Services in{" "}
                <span className="text-gradient-gold">UAE</span>
              </h1>

              <p className="text-body-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                We provide reliable, affordable, and professional services
                tailored for businesses and individuals across the UAE. Quality,
                trust, and timely delivery — guaranteed.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/get-quote">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary to-primary-dark rounded-xl shadow-glow-primary hover:scale-105 transition-transform duration-200">
                    Get Free Quote
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
                  </span>
                </Link>

                <Link href="/services">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary bg-white border-2 border-sand-300 rounded-xl hover:border-gold-400 hover:bg-sand-50 transition-all duration-200">
                    Our Services
                  </span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-sand-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">10+</div>
                  <div className="text-sm text-slate-500">Years Experience</div>
                </div>
                <div className="w-px h-12 bg-sand-300" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">5000+</div>
                  <div className="text-sm text-slate-500">Happy Clients</div>
                </div>
                <div className="w-px h-12 bg-sand-300" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-sm text-slate-500">Satisfaction</div>
                </div>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="glass-card p-8 relative z-10 hover:y-[-2px] transition-transform duration-200">
                  <h3 className="text-display-sm text-slate-900 mb-6 gold-border pb-4">
                    Why Choose Us?
                  </h3>
                  <ul className="space-y-5">
                    {[
                      "Trusted UAE Business Partner",
                      "Experienced & Professional Team",
                      "Fast Response & Support",
                      "Competitive Pricing",
                      "100% Satisfaction Guaranteed",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        className="flex items-center gap-4 text-slate-700"
                      >
                        <span className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-gold-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="font-medium">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-400/30 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-400/20 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/Images/dubaivisachange.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-600/90 to-primary-700/90" />
        </div>

        <div className="container relative z-10">
          <FadeInOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-display-md text-white mb-4">
                Serving Clients Across the UAE
              </h2>
              <p className="text-body-lg text-white/80">
                From Dubai to Abu Dhabi, Sharjah to Ajman — we support
                businesses with dependable services that help you grow with
                confidence.
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-sand-pattern">
        <div className="container">
          <FadeInOnScroll className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="text-display-lg text-slate-900 mb-4">
              Comprehensive Business Solutions
            </h2>
            <GoldAccentLine className="w-24 mx-auto" />
            <p className="text-body-lg text-slate-600 mt-6 max-w-2xl mx-auto">
              We offer a wide range of professional services to help your
              business thrive in the UAE market.
            </p>
          </FadeInOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            staggerDelay={0.1}
          >
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <TiltCard>
                  <Link href={`/services#${service.slug}`} className="block">
                    <HoverScale>
                      <div className="card overflow-hidden group">
                        <div className="relative h-48 overflow-hidden">
                          <motion.img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-primary transition-colors duration-300">
                            {service.title}
                          </h3>
                          <div className="mt-3 flex items-center text-sm text-gold-600 font-medium">
                            Learn More
                            <svg
                              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
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
                          </div>
                        </div>
                      </div>
                    </HoverScale>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInOnScroll delay={0.4} className="text-center mt-12">
            <Link href="/services">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View All Services
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
          </FadeInOnScroll>
        </div>
      </section>

      {/* UAE Trust Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Images/lobby.jpeg')" }}
        >
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>

        <div className="container relative z-10">
          <FadeInOnScroll className="text-center mb-16">
            <h2 className="text-display-md text-white mb-4">
              Trusted Business Partner in the UAE
            </h2>
            <GoldAccentLine className="w-24 mx-auto" />
            <p className="text-body-lg text-white/70 mt-6 max-w-2xl mx-auto">
              We follow UAE regulations and deliver reliable services with
              transparency, professionalism, and commitment.
            </p>
          </FadeInOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.15}
          >
            {[
              {
                icon: "🏢",
                title: "UAE Registered",
                description:
                  "Fully compliant with UAE business and government regulations.",
              },
              {
                icon: "🤝",
                title: "Trusted by Clients",
                description:
                  "Serving individuals and businesses across the UAE with trust.",
              },
              {
                icon: "⏱️",
                title: "Fast Processing",
                description:
                  "Quick response time with accurate and timely service delivery.",
              },
              {
                icon: "⭐",
                title: "Quality Assured",
                description:
                  "High-quality service standards with complete customer satisfaction.",
              },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <TiltCard>
                  <div className="glass-card p-8 text-center h-full group hover:border-gold-400/50 transition-colors duration-300">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 flex items-center justify-center text-3xl"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary to-primary-dark">
        <div className="container">
          <FadeInOnScroll>
            <div className="glass-card-dark p-12 md:p-16 text-center max-w-4xl mx-auto">
              <h2 className="text-display-md text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-body-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Contact us today for a free consultation and quote. Let us help
                you navigate the UAE business landscape with ease.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
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
                <Link href="/services">
                  <motion.span
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Services
                  </motion.span>
                </Link>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
