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
      {/* Premium UAE Corporate Hero Section - Luxury Redesign */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Deep Navy Base with Luxury Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1929] via-[#0d2847] to-[#071422]" />

        {/* Elegant Geometric Pattern Overlay - UAE Inspired */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23d4af37' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />

        {/* Luxurious Gold Accent Lines - Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-60" />
        
        {/* Decorative Gold Corner Accents */}
        <div className="absolute top-20 left-8 w-24 h-24 border-l-2 border-t-2 border-gold-500/30 rounded-tl-3xl" />
        <div className="absolute top-20 right-8 w-24 h-24 border-r-2 border-t-2 border-gold-500/30 rounded-tr-3xl" />
        <div className="absolute bottom-20 left-8 w-24 h-24 border-l-2 border-b-2 border-gold-500/30 rounded-bl-3xl" />
        <div className="absolute bottom-20 right-8 w-24 h-24 border-r-2 border-b-2 border-gold-500/30 rounded-br-3xl" />

        {/* Floating Gold Particles - Enhanced */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + (i % 4),
                height: 2 + (i % 4),
                background: i % 3 === 0 
                  ? 'linear-gradient(135deg, #d4af37, #f9f3db)' 
                  : i % 3 === 1 
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(212, 175, 55, 0.2)',
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              }}
              initial={{
                y: 0,
                opacity: 0.3 + (i % 5) * 0.1,
              }}
              animate={{
                y: [0, -30 - (i % 40), -60 - (i % 60)],
                opacity: [0.3 + (i % 5) * 0.1, 0.6, 0],
                scale: [1, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + (i % 4),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Ambient Light Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-400/5 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Centered Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Premium Badge with Gold Border */}
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold-500/10 via-gold-500/15 to-gold-500/10 text-gold-300 rounded-full text-sm font-semibold mb-10 backdrop-blur-md border border-gold-500/40 shadow-lg shadow-gold-500/5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-gold-400 to-gold-300"></span>
                </span>
                <span className="tracking-wide">UAE Certified Business Partner</span>
              </motion.div>

              {/* Main Heading with Enhanced Typography */}
              <motion.h1 
                className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold text-white mb-8 leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="block">Trusted UAE Business</span>
                <span className="block mt-2">Setup Specialists</span>
                <span className="block mt-4 text-2xl md:text-3xl font-semibold tracking-wide">
                  <span className="text-gradient-gold">— From Vision to Victory</span>
                </span>
              </motion.h1>

              {/* Decorative Line */}
              <motion.div 
                className="flex items-center justify-center gap-3 mb-8"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/60" />
                <div className="w-2 h-2 bg-gold-500 rounded-full" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/60" />
              </motion.div>

              {/* Description with Better Contrast */}
              <motion.p 
                className="text-lg md:text-xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                We provide premium, reliable, and professional services tailored for businesses and individuals across the UAE. 
                From company formation to visa processing, trust us with your business needs.
              </motion.p>

              {/* Enhanced CTA Buttons */}
              <motion.div 
                className="flex flex-wrap justify-center gap-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link href="/get-quote">
                  <motion.span
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 px-10 py-5 text-base font-bold text-[#0a1929] bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 rounded-xl shadow-xl shadow-gold-500/30 transition-all duration-300 border border-gold-300/50"
                    style={{
                      background: 'linear-gradient(135deg, #f9f3db 0%, #d4af37 25%, #f9f3db 50%, #d4af37 75%, #f9f3db 100%)',
                      backgroundSize: '200% 200%',
                    }}
                  >
                    Start Your Bussiness
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
                        strokeWidth={2.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.span>
                </Link>

                <Link href="/services">
                  <motion.span
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 px-10 py-5 text-base font-semibold text-white bg-white/5 border-2 border-gold-500/40 rounded-xl backdrop-blur-sm hover:bg-gold-500/10 hover:border-gold-500/60 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gold-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                    Our Services
                  </motion.span>
                </Link>
              </motion.div>

              {/* Enhanced Trust Indicators */}
              <motion.div 
                className="mt-20 pt-10 border-t border-gold-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                  {[
                    { number: "10+", label: "Years Experience" },
                    { number: "5000+", label: "Happy Clients" },
                    { number: "100%", label: "Satisfaction" },
                  ].map((item, index) => (
                    <div key={index} className="text-center group">
                      <div className="relative">
                        <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2 transition-transform duration-300 group-hover:scale-105">
                          {item.number}
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="text-sm md:text-base text-slate-300 font-medium tracking-wide">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sand-50 to-transparent" />
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
