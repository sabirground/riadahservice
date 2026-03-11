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
{/* PREMIUM UAE CORPORATE HERO */}

<section className="relative pt-28 pb-24 bg-white overflow-hidden">

{/* subtle gold accent line */}

<div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

<div className="container">

<motion.div
initial={{ opacity:0, y:40 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:0.7 }}
className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center"
>

{/* LEFT CONTENT */}

<div>

<div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 text-gold-700 rounded-full text-sm font-medium mb-6 border border-gold-200">
Trusted UAE Business Consultants
</div>

<h1 className="text-[clamp(2.5rem,4.8vw,3.8rem)] font-bold text-slate-900 leading-tight mb-6">

Start & Grow Your Business

<br/>

<span className="text-gold-600">
In The UAE With Confidence
</span>

</h1>

<p className="text-lg text-slate-600 mb-8 max-w-xl">

We provide reliable company formation, visa processing,
and professional PRO services helping entrepreneurs
and businesses establish themselves successfully in the UAE.

</p>

{/* CTA BUTTONS */}

<div className="flex flex-wrap gap-4">

<Link href="/get-quote">

<motion.span
whileHover={{ y:-2 }}
whileTap={{ scale:0.97 }}
className="px-8 py-4 bg-gold-500 text-white font-semibold rounded-lg shadow-md hover:bg-gold-600 transition"
>

Start Your Business

</motion.span>

</Link>

<Link href="/services">

<motion.span
whileHover={{ y:-2 }}
whileTap={{ scale:0.97 }}
className="px-8 py-4 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-gold-500 hover:text-gold-600 transition"
>

View Services

</motion.span>

</Link>

</div>

{/* TRUST STATS */}

<div className="grid grid-cols-3 gap-8 mt-12 pt-10 border-t border-slate-200">

<div>

<p className="text-3xl font-bold text-slate-900">10+</p>

<p className="text-sm text-slate-500">Years Experience</p>

</div>

<div>

<p className="text-3xl font-bold text-slate-900">5000+</p>

<p className="text-sm text-slate-500">Happy Clients</p>

</div>

<div>

<p className="text-3xl font-bold text-slate-900">100%</p>

<p className="text-sm text-slate-500">Client Focus</p>

</div>

</div>

</div>


{/* RIGHT SIDE BUSINESS CARD */}

<div className="relative">

<div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-xl">

<h3 className="text-xl font-semibold text-slate-900 mb-6">
Why Choose Our Services
</h3>

<ul className="space-y-4 text-slate-600">

<li className="flex gap-3">
<span className="text-gold-500">✔</span>
UAE government compliant business services
</li>

<li className="flex gap-3">
<span className="text-gold-500">✔</span>
Fast company formation & visa processing
</li>

<li className="flex gap-3">
<span className="text-gold-500">✔</span>
Professional support for entrepreneurs
</li>

<li className="flex gap-3">
<span className="text-gold-500">✔</span>
Transparent pricing & trusted consultants
</li>

</ul>

</div>

</div>

</motion.div>

</div>

</section>

      {/* SERVICES SECTION */}

      <section className="section bg-sand-pattern">

        <div className="container">

          <FadeInOnScroll className="text-center mb-16">

            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              Our Professional Services
            </span>

            <h2 className="text-display-lg text-slate-900 mb-4">
              Business & Government Services
            </h2>

            <GoldAccentLine className="w-24 mx-auto"/>

            <p className="text-body-lg text-slate-600 mt-6 max-w-2xl mx-auto">
              Comprehensive support for entrepreneurs, investors and
              businesses looking to operate in the UAE.
            </p>

          </FadeInOnScroll>


          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >

            {services.map((service, index) => (

              <StaggerItem key={index}>

                <TiltCard>

                  <Link href={`/services#${service.slug}`}>

                    <HoverScale>

                      <div className="card overflow-hidden group">

                        <div className="relative h-56 overflow-hidden">

                          <motion.img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale:1.1 }}
                            transition={{ duration:0.6 }}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>

                        </div>

                        <div className="p-6">

                          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-primary transition-colors mb-2">
                            {service.title}
                          </h3>

                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                            {service.description}
                          </p>

                          <div className="flex items-center text-sm text-gold-600 font-medium">
                            Learn More
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
                whileHover={{ scale:1.02 }}
                whileTap={{ scale:0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all"
              >
                View All Services
              </motion.span>

            </Link>

          </FadeInOnScroll>

        </div>

      </section>



      {/* WHY CHOOSE US */}

      <section className="section bg-white">

        <div className="container">

          <FadeInOnScroll className="text-center mb-16">

            <h2 className="text-display-md text-slate-900 mb-4">
              Why Businesses Trust Us
            </h2>

            <GoldAccentLine className="w-24 mx-auto"/>

            <p className="text-body-lg text-slate-600 mt-6 max-w-2xl mx-auto">
              Delivering professional services with reliability,
              transparency and deep understanding of UAE regulations.
            </p>

          </FadeInOnScroll>


          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            staggerDelay={0.15}
          >

            {[
              {
                icon:"🏢",
                title:"UAE Registered",
                description:"Operating according to UAE government regulations.",
              },
              {
                icon:"🤝",
                title:"Trusted Partner",
                description:"Supporting businesses and entrepreneurs across UAE.",
              },
              {
                icon:"⚡",
                title:"Fast Processing",
                description:"Quick turnaround for documentation and approvals.",
              },
              {
                icon:"⭐",
                title:"Quality Service",
                description:"Dedicated team focused on client success.",
              },
            ].map((item,index)=>(

              <StaggerItem key={index}>

                <TiltCard>

                  <div className="glass-card p-8 text-center h-full">

                    <div className="text-3xl mb-4">{item.icon}</div>

                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-sm">
                      {item.description}
                    </p>

                  </div>

                </TiltCard>

              </StaggerItem>

            ))}

          </StaggerContainer>

        </div>

      </section>



      {/* CTA SECTION */}

      <section className="section bg-gradient-to-br from-primary to-primary-dark">

        <div className="container">

          <FadeInOnScroll>

            <div className="glass-card-dark p-12 md:p-16 text-center max-w-4xl mx-auto">

              <h2 className="text-display-md text-white mb-4">
                Ready to Establish Your Business in the UAE?
              </h2>

              <p className="text-body-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Contact our experts today for professional guidance
                and start your UAE business journey with confidence.
              </p>

              <div className="flex flex-wrap justify-center gap-4">

                <Link href="/get-quote">
                  <motion.span
                    whileHover={{ scale:1.02 }}
                    whileTap={{ scale:0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-slate-900 font-semibold rounded-xl shadow-glow-gold"
                  >
                    Get Free Consultation
                  </motion.span>
                </Link>

                <Link href="/services">
                  <motion.span
                    whileHover={{ scale:1.02 }}
                    whileTap={{ scale:0.98 }}
                    className="px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10"
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