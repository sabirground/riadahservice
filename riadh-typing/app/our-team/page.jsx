"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  HoverScale,
  GoldAccentLine,
} from "../components/MicroInteractions";

const owners = [
  {
    name: "Mohammed Hakeem",
    designation: "Chief Executive Officer",
    image: "/team/M Hakeem.jpeg",
  },
  {
    name: "Noorul Ameen",
    designation: "Operations Director",
    image: "/team/Noorul Ameen.jpeg",
  },
  {
    name: "Muhammed Rafeeq",
    designation: "Administrator",
    image: "/team/M rafeeq.jpeg",
  },
];

const employees = [
  {
    name: "Abdul Rashid",
    designation: "Senior Typist",
    image: "/team/Abdul Rashid.jpeg",
  },
  {
    name: "Afsal",
    designation: "Office Administrator",
    image: "/team/Afsal.jpeg",
  },
  {
    name: "Muhammed Hubaib",
    designation: "Typing Specialist",
    image: "/team/M Hubaib.jpeg",
  },
  {
    name: "Muhammed Anas",
    designation: "Accountant",
    image: "/team/M Anas.jpeg",
  },
  {
    name: "Muhammed Jazeel",
    designation: "Typist",
    image: "/team/M Jazeel.jpeg",
  },
  {
    name: "Anas C.P",
    designation: "Typist",
    image: "/team/Anas Cp.jpeg",
  },
];

export default function OurTeamPage() {
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
              Our People
            </motion.span>
            <h1 className="text-display-xl text-slate-900 mb-6">
              Meet Our <span className="text-gradient-gold">Team</span>
            </h1>
            <GoldAccentLine className="w-24 mx-auto mb-6" />
            <p className="text-body-lg text-slate-600">
              Meet the professionals behind our success — experienced,
              dedicated, and committed to delivering high-quality services
              across the UAE.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Owners Section */}
      <section className="section bg-sand-pattern">
        <div className="container">
          <FadeInOnScroll className="text-center mb-16">
            <h2 className="text-display-md text-slate-900 mb-4">
              Leadership Team
            </h2>
            <GoldAccentLine className="w-20 mx-auto" />
            <p className="text-body-lg text-slate-600 mt-6 max-w-2xl mx-auto">
              The founders and leadership who guide our company with vision,
              integrity, and professionalism.
            </p>
          </FadeInOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto"
            staggerDelay={0.15}
          >
            {owners.map((person, index) => (
              <StaggerItem key={index}>
                <TiltCard>
                  <HoverScale>
                    <div className="card text-center p-8 group">
                      <div className="relative w-40 h-40 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-sand-200 group-hover:border-gold-300 transition-colors duration-300">
                          <Image
                            src={person.image}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">
                        {person.name}
                      </h3>
                      <p className="text-gold-600 font-medium">
                        {person.designation}
                      </p>
                      <p className="text-sm text-slate-500 mt-3">
                        Owner & Core Decision Maker
                      </p>
                    </div>
                  </HoverScale>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Employees Section */}
      <section className="section bg-white">
        <div className="container">
          <FadeInOnScroll className="text-center mb-16">
            <h2 className="text-display-md text-slate-900 mb-4">
              Our Professional Team
            </h2>
            <GoldAccentLine className="w-20 mx-auto" />
            <p className="text-body-lg text-slate-600 mt-6 max-w-2xl mx-auto">
              Our skilled employees ensure smooth operations and excellent
              service delivery for all our clients.
            </p>
          </FadeInOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            staggerDelay={0.1}
          >
            {employees.map((person, index) => (
              <StaggerItem key={index}>
                <TiltCard>
                  <HoverScale scale={1.03}>
                    <div className="card text-center p-6 group hover:border-gold-300 transition-colors duration-300">
                      <div className="relative w-32 h-32 mx-auto mb-5">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sand-300 to-sand-400 opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-md" />
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-sand-100 group-hover:border-gold-200 transition-colors duration-300">
                          <Image
                            src={person.image}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-900 text-lg">
                        {person.name}
                      </h3>
                      <p className="text-sm text-gold-600 mt-1 font-medium">
                        {person.designation}
                      </p>
                    </div>
                  </HoverScale>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="container">
          <FadeInOnScroll>
            <div className="glass-card-dark p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-display-md text-white mb-8">
                Our Core Values
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  {
                    icon: "🤝",
                    title: "Integrity",
                    description: "We operate with honesty and transparency",
                  },
                  {
                    icon: "⭐",
                    title: "Excellence",
                    description: "We strive for the highest quality standards",
                  },
                  {
                    icon: "💼",
                    title: "Professionalism",
                    description: "We maintain the utmost professionalism",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
