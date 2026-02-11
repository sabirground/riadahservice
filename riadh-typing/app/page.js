"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import services from "./data/services.js";
import SimpleEnquiryForm from "./components/SimpleEnquiryForm";
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
      {/* Premium UAE Corporate Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Dubai Skyline Background */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/Images/Background.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/85 to-blue-800/95" />
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              initial={{
                x: (i * 7) % 100,
                y: (i * 11) % 100,
                opacity: 0.2 + (i % 5) * 0.1,
              }}
              animate={{
                y: [null, -50 - (i % 50)],
                opacity: [null, 0.6 + (i % 4) * 0.2, 0],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500/20 text-gold-400 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm border border-gold-500/30">
                <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                UAE Certified Business Partner
              </div>

              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white mb-6 leading-tight">
                Trusted UAE Business Setup Specialists{" "}
                <span className="text-gradient-gold">-From Vision to Victory</span>
              </h1>

              <p className="text-lg text-blue-100 mb-10 max-w-xl leading-relaxed">
                We provide premium, reliable, and professional services tailored for businesses and individuals across the UAE. 
                From company formation to visa processing, trust us with your business needs.
              </p>

              <div className="flex flex-wrap gap-5">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-10 py-5 text-base font-bold text-blue-900 bg-gradient-to-r from-gold-400 to-gold-500 rounded-2xl shadow-lg hover:shadow-gold-500/50 transition-all duration-300"
                  onClick={() => document.getElementById('service-request-form').scrollIntoView({ behavior: 'smooth' })}
                >
                  Service Request
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
                </motion.button>

                <Link href="/services">
                  <motion.span
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-10 py-5 text-base font-semibold text-white bg-white/10 border-2 border-white/30 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                  >
                    Our Services
                  </motion.span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-10 mt-16 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">10+</div>
                  <div className="text-sm text-blue-200 mt-1">Years Experience</div>
                </div>
                <div className="w-px h-14 bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">5000+</div>
                  <div className="text-sm text-blue-200 mt-1">Happy Clients</div>
                </div>
                <div className="w-px h-14 bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">100%</div>
                  <div className="text-sm text-blue-200 mt-1">Satisfaction</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Professional Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative"
            >
              <div className="relative">
                <div id="service-request-form" className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-8 relative z-10 transform hover:scale-[1.02] transition-all duration-300 border border-white/50">
                  {/* Form Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-blue-200/50">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                      </div>
                      <span className="text-sm font-semibold text-blue-900">Service Request</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-300/50" />
                      <div className="w-2 h-2 rounded-full bg-blue-300/50" />
                      <div className="w-2 h-2 rounded-full bg-blue-300/50" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Get a callback</h3>
                  
                  {/* Quick Enquiry Form */}
                  <SimpleEnquiryForm />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-3xl blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gold-400/15 rounded-3xl blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced Grid */}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <TiltCard>
                  <Link href={`/services#${service.slug}`} className="block">
                    <HoverScale>
                      <div className="card overflow-hidden group">
                        <div className="relative h-56 overflow-hidden">
                          <motion.img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-4 left-4 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {service.description.split(', ').length} Services
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-primary transition-colors duration-300 mb-2">
                            {service.title}
                          </h3>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                            {service.description}
                          </p>
                          <div className="flex items-center text-sm text-gold-600 font-medium">
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

          <FadeInOnScroll delay={0.4} className="text-center mt-16">
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
                <a href="tel:+971501234567">
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
                    Prefer to Call
                  </motion.span>
                </a>
              </div>
            </div>
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
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

       {/* Trust Section with Enhanced Content */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-900 via-white/80 to-blue-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/Images/client.avif')" }}
        />

        <div className="container relative z-10">
          <FadeInOnScroll>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-display-md text-blue mb-4">
                Serving Clients Across the UAE
              </h2>
              <p className="text-body-lg text-black/80 mb-12">
                From Dubai to Abu Dhabi, Sharjah to Ajman — we support
                businesses with dependable services that help you grow with
                confidence.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center text-2xl mb-4">
                    📍
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Strategic Locations</h3>
                  <p className="text-black/70 text-sm">Operating across all major UAE emirates with prime business locations</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center text-2xl mb-4">
                    ⏰
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">24/7 Support</h3>
                  <p className="text-black/70 text-sm">Round-the-clock assistance for all your business needs</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center text-2xl mb-4">
                    📊
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Transparent Pricing</h3>
                  <p className="text-black/70 text-sm">Clear, upfront pricing with no hidden costs or surprises</p>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

    </>
  );
}
